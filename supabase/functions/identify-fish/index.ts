// Supabase Edge Function: AI Fish Identification
// Deploy: supabase functions deploy identify-fish
// Env: ANTHROPIC_API_KEY must be set in Supabase dashboard

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const ANTHROPIC_API_KEY = Deno.env.get("ANTHROPIC_API_KEY")!;
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  // CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // 1. Verify JWT
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "No authorization header" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 2. Check premium status
    const { data: sub } = await supabase
      .from("user_subscriptions")
      .select("tier, expires_at")
      .eq("user_id", user.id)
      .single();

    const isPremium = sub?.tier === "premium" &&
      (!sub.expires_at || new Date(sub.expires_at) > new Date());

    if (!isPremium) {
      return new Response(JSON.stringify({ error: "Premium required" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 3. Check monthly usage (max 20)
    const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM
    const { data: usage } = await supabase
      .from("user_usage")
      .select("ai_identifications_count")
      .eq("user_id", user.id)
      .eq("month", currentMonth)
      .single();

    if (usage && usage.ai_identifications_count >= 20) {
      return new Response(JSON.stringify({ error: "Monthly limit reached (20/20)" }), {
        status: 429,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 4. Get image from request
    const { image_base64, language } = await req.json();
    if (!image_base64) {
      return new Response(JSON.stringify({ error: "No image provided" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 5. Call Claude Vision API
    const lang = language === "en" ? "English" : "Turkish";
    const claudeResponse = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 500,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "image",
                source: {
                  type: "base64",
                  media_type: "image/jpeg",
                  data: image_base64,
                },
              },
              {
                type: "text",
                text: `You are a fish species identification expert. Analyze this fish photo and identify the species.

Respond ONLY with a JSON object (no markdown, no backticks):
{
  "species_tr": "Turkish common name of the fish",
  "species_en": "English common name of the fish",
  "scientific_name": "Latin/scientific name",
  "confidence": 0.85,
  "description_tr": "Brief description in Turkish (1-2 sentences about the fish)",
  "description_en": "Brief description in English (1-2 sentences about the fish)",
  "is_fish": true
}

If the image does not contain a fish, set is_fish to false and leave other fields empty.
Confidence should be between 0 and 1 (0.0 = no idea, 1.0 = certain).
Focus on fish species commonly found in Turkish waters (Mediterranean, Black Sea, Aegean, Marmara) but identify any fish species.`,
              },
            ],
          },
        ],
      }),
    });

    if (!claudeResponse.ok) {
      const errorText = await claudeResponse.text();
      console.error("Claude API error:", errorText);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const claudeData = await claudeResponse.json();
    const rawText = claudeData.content?.[0]?.text || "";

    // Parse the JSON response
    let result;
    try {
      result = JSON.parse(rawText);
    } catch {
      // Try to extract JSON from the response
      const jsonMatch = rawText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        result = JSON.parse(jsonMatch[0]);
      } else {
        return new Response(JSON.stringify({ error: "Could not parse AI response" }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    // 6. Save identification to database
    await supabase.from("fish_identifications").insert({
      user_id: user.id,
      result,
    });

    // 7. Increment usage
    await supabase.rpc("increment_usage", {
      p_user_id: user.id,
      p_field: "ai_identifications_count",
    });

    // 8. Return result
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Function error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
