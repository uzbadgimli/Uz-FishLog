// Hava durumuna gore balik onerisi - SUPER GENISLETILMIS VERSIYON
// 50+ farkli senaryo - Sicaklik, Ruzgar, Mevsim, Saat kombinasyonlari
// Coklu dil destegi (TR/EN)

const translations = {
  tr: {
    // KIS - Cok soguk (< 5°C)
    winterColdNight: {
      fish: "Gece + Soguk: Mezgit derin sularda aktif. Levrek kayalik diplerde avlaniyor. Iskorpit dip canlilarini ariyor.",
      bait: "Fosforlu jig head (21-28gr), turuncu/kirmizi silikon, canli kalamar parcasi, gece icin glow shad"
    },
    winterColdMorning: {
      fish: "Sabah + Soguk: Mezgit ve Levrek sabah aktivitesi basliyor. Kalkan kumlu dip alanlarinda. Dip avi icin ideal.",
      bait: "Agir silikon (motor oil rengi), 18-25gr jig head, canli caca, slow pitch jig"
    },
    winterColdCalm: {
      fish: "Kis gunu sakin: Mezgit suruseri dipte toplanmis. Levrek yavas hareketli. Kalkan aktif olabilir.",
      bait: "Derin minnow (11-14cm), agir metal jig, canli yem tercih edilmeli"
    },
    winterColdWindy: {
      fish: "Soguk + Ruzgarli: Levrek kiyiya yaklasti, yem organizmalari kiyi cercevesinde. Mezgit derin sularda bekliyor.",
      bait: "Agir jig head (21-28gr), buyuk silikon balik, derin calisan minnow, canli yem"
    },
    winterStorm: {
      fish: "Kis firtinasi: Korunakli limanlarda Levrek ve Kefal. Dalgakiranlarin diplerinde Iskorpit.",
      bait: "Agir silikon, canli yem sart, ekmek icli kefal icin, canli caca"
    },
    // KIS - Soguk (5-10°C)
    winterCoolMorning: {
      fish: "Kis sabahi ideal: Levrek sabah avinda, Mezgit aktif, Cipura derin sularda. Altin saat!",
      bait: "11-14cm suspending minnow, silikon shad (motor oil), canli cupra, slow jig"
    },
    winterCoolEvening: {
      fish: "Kis aksami: Levrek aksam aktivitesinde, Sinarit kayaliklarda, Mercan derin resifler.",
      bait: "Minnow (dogal renkler), orta agirlik jig, canli karides, kalamar parcasi"
    },
    winterCoolNight: {
      fish: "Kis gecesi: Levrek gece avi muthis! Mezgit fosforlu yemlere ilgi gosteriyor. Fener isigi etrafi kontrol.",
      bait: "Fosforlu silikon, glow minnow, canli yem, fener/lamba civarini tara"
    },
    winterCoolMid: {
      fish: "Kis gunu orta: Levrek ve Mezgit aktif. Cipura derin alanlarda. Sabir gerekli.",
      bait: "Minnow, silikon shad, canli yem kombinasyonu dene"
    },
    winterCoolWindy: {
      fish: "Ruzgarli kis: Levrek kiyilarda cok aktif! Lodos/Poyraz yemi kiyiya surukluyor. Firsati kacirma!",
      bait: "Derin calisan minnow, agir jig head (14-21gr), buyuk silikon balik"
    },
    winterCoolStorm: {
      fish: "Firtinali kis: Korunakli limanlarda Levrek, Kefal ve Iskorpit. Dalgakiranlar verimli.",
      bait: "Agir silikon, canli yem, ekmek (kefal), dalgakiran dipleri"
    },
    // KIS - Ilik (10-15°C)
    winterMildCalm: {
      fish: "Ilik kis gunu: Levrek, Cipura, Sinarit cok aktif! Lufer arada goruluyor. Kis ortasi surprizi!",
      bait: "11-14cm minnow (dogal renkler), stick bait, popper, canli kolyoz"
    },
    winterMildWindy: {
      fish: "Ilik ve ruzgarli kis: Levrek kayaliklarda, Cipura akintili noktalarda, Kefal kiyilarda.",
      bait: "Minnow, silikon, kefal icin ekmek, akintili bolgeleri hedefle"
    },
    // ILKBAHAR - Serin (8-14°C)
    springCoolMorning: {
      fish: "Ilkbahar sabahi: Levrek uyanis doneminde, Cipura sicak su ariyor, Lufer kiyilara yaklasti!",
      bait: "Minnow (parlak renkler), silikon shad, popper, canli caca"
    },
    springCoolEvening: {
      fish: "Ilkbahar aksami: Levrek aksam avinda aktif, Lufer suru halinde, Sinarit kayaliklarda.",
      bait: "Stick bait, popper, metal jig 20-30gr, canli kolyoz"
    },
    springCoolMid: {
      fish: "Ilkbahar ortasi: Levrek, Cipura aktif. Lufer gorulmeye basliyor. Sezon aciliyor!",
      bait: "Minnow, silikon, popper dene, canli yem her zaman ise yarar"
    },
    springCoolWindy: {
      fish: "Ruzgarli ilkbahar: Levrek ve Lufer kiyilarda cok aktif! Ruzgar yemi getiriyor.",
      bait: "Agir minnow, metal jig, buyuk silikon, yuzey yemleri dene"
    },
    springCoolStorm: {
      fish: "Firtinali ilkbahar: Korunakli alanlarda Levrek, Kefal. Firtina sonrasi altin!",
      bait: "Agir jig, canli yem, firtina sonrasini bekle"
    },
    // ILKBAHAR - Ideal (14-20°C)
    springIdealMorning: {
      fish: "ALTIN SABAH! Levrek, Cipura, Lufer, Palamut hepsi aktif! Sezonun en iyi zamani!",
      bait: "Her tur yem calisir: minnow, popper, jig, canli yem. Aksiyon garantili!"
    },
    springIdealEvening: {
      fish: "ALTIN AKSAM! Lufer suru halinde saldiriyor, Levrek kayaliklarda, Palamut yuzey de!",
      bait: "Popper, stick bait, metal jig, sabiki takimi, canli kolyoz"
    },
    springIdealNight: {
      fish: "Ilkbahar gecesi: Levrek gece avi muhtesem, Kalamar sezonu acildi, Barbun aktif.",
      bait: "Fosforlu minnow, kalamar yemi (egi), canli karides, gece jig"
    },
    springIdealMid: {
      fish: "Mukemmel ilkbahar: TUM BALIKLAR AKTIF! Levrek, Cipura, Lufer, Sinarit, Mercan...",
      bait: "Minnow, popper, jig, canli yem - hepsini dene!"
    },
    springIdealWindy: {
      fish: "Ruzgarli ama verimli: Lufer deli gibi! Levrek sahile yanasti. Palamut suru halinde.",
      bait: "Metal jig 30-50gr, buyuk popper, trolling lure, sabiki"
    },
    springIdealStorm: {
      fish: "Sert ruzgar: Lufer ve Palamut icin harika! Kiyida Levrek cok aktif!",
      bait: "Agir metal jig, buyuk silikon, derin minnow"
    },
    // ILKBAHAR - Sicak (20-25°C)
    springWarmCalm: {
      fish: "Yaz oncesi: Cipura, Istavrit, Kolyoz aktif. Lufer gece daha iyi. Mercan derinlerde.",
      bait: "Kucuk minnow (7-9cm), micro jig, sabiki, canli karides"
    },
    springWarmWindy: {
      fish: "Sicak ve ruzgarli: Yuzey baliklari (Lufer, Istavrit, Kolyoz) aktif. Sabah/aksam avla.",
      bait: "Popper, kucuk metal jig, sabiki takimi, stick bait"
    },
    // YAZ - Ilik (18-24°C)
    summerMildNight: {
      fish: "Yaz gecesi altin: Levrek gece aktif, Kalamar avciligi ideal, Mercan ve Fangri dipte.",
      bait: "Fosforlu silikon, kalamar yemi (egi), gece minnow, canli karides"
    },
    summerMildMorning: {
      fish: "Erken yaz sabahi: Gun dogumunda Levrek, Cipura sicak sevmiyor - erken avla!",
      bait: "Minnow, silikon, popper - gunes yukselmeden bitir"
    },
    summerMildEvening: {
      fish: "Yaz aksami: Sicak dususu ile Levrek, Lufer, Istavrit aktiflesir. Aksam avla!",
      bait: "Popper, stick bait, minnow, canli yem"
    },
    summerMildMidday: {
      fish: "Sicak ogle: Baliklar derin ve serin sulara cekiliyor. Oglen avi zor.",
      bait: "Derin jig, canli yem, golge alanlari hedefle"
    },
    summerMildWindy: {
      fish: "Ruzgarli yaz: Istavrit, Kolyoz, Lufer yuzey de! Meltem zamani!",
      bait: "Sabiki, popper, metal jig, canli ciroz"
    },
    // YAZ - Sicak (24-30°C)
    summerHotNight: {
      fish: "Sicak yaz gecesi: GECE AVI SART! Levrek, Kalamar, Barbun, Mercan gece aktif.",
      bait: "Fosforlu her tur yem, kalamar egi, canli karides, gece jig"
    },
    summerHotMorning: {
      fish: "Sicak sabah: Sadece gunes dogmadan 1-2 saat! Sonra baliklar deriner gider.",
      bait: "Hizli avla - minnow, popper, canli yem"
    },
    summerHotMidday: {
      fish: "Cok sicak gun: Oglen avi cok zor. Gece veya cok erken sabah tek sans.",
      bait: "Derin su yemleri, canli yem, gece avini planla"
    },
    summerHotWindy: {
      fish: "Sicak ama ruzgarli: Istavrit, Kolyoz surusteri yuzey de. Aksam Lufer cikabilir.",
      bait: "Sabiki, micro jig, popper, aksam cikisi bekle"
    },
    // YAZ - Cok sicak (> 30°C)
    summerVeryHotNight: {
      fish: "Kavurucu gece: Gece avi tek secenek! Levrek, Kalamar, dip baliklari aktif.",
      bait: "Tamamen fosforlu donanim, kalamar egi, canli yem"
    },
    summerVeryHotDay: {
      fish: "Asiri sicak: Balik avlamak cok zor. Gece avini tercih et veya cok derin sulara git.",
      bait: "Derin su jig, canli yem, gece bekle"
    },
    // SONBAHAR - Erken (18-24°C)
    autumnEarlyMorning: {
      fish: "Sonbahar sabahi altin: Lufer cosku halinde! Palamut surusteri! Levrek kayaliklarda!",
      bait: "Metal jig, popper, minnow, sabiki - her sey calisir!"
    },
    autumnEarlyEvening: {
      fish: "Sonbahar aksami muhtesem: Lufer saldiri modunda, Palamut trolling icin ideal, Levrek aktif!",
      bait: "Popper, stick bait, trolling lure, metal jig 30-50gr"
    },
    autumnEarlyMid: {
      fish: "SONBAHAR SEZONU! Lufer, Palamut, Levrek, Cipura - yilin en verimli zamani!",
      bait: "Her tur sahte yem, canli kolyoz, sabiki, trolling lure"
    },
    autumnEarlyWindy: {
      fish: "Ruzgarli sonbahar: Lufer ve Palamut deli gibi! Sahilde Levrek cildirmis durumda!",
      bait: "Agir jig, buyuk popper, trolling, buyuk minnow"
    },
    // SONBAHAR - Serin (12-18°C)
    autumnCoolMorning: {
      fish: "Serin sonbahar sabahi: Levrek, Cipura ana aktivite saati. Lufer hala var. Mezgit geliyor!",
      bait: "Minnow (11-14cm), silikon shad, canli caca, jig"
    },
    autumnCoolEvening: {
      fish: "Sonbahar aksami: Levrek aksam cikisi muthis, Lufer son saldirilar, Sinarit kayaliklarda.",
      bait: "Stick bait, popper, minnow, canli kolyoz"
    },
    autumnCoolMid: {
      fish: "Serin sonbahar gunu: Levrek ve Cipura cok aktif. Lufer azaliyor. Mezgit artiyor.",
      bait: "Minnow, silikon, canli yem - klasik donanim"
    },
    autumnCoolWindy: {
      fish: "Ruzgarli sonbahar: Levrek sahile yapisti! Kipurdayan her seye saldirir!",
      bait: "Buyuk silikon, agir minnow, canli yem"
    },
    // SONBAHAR - Soguk (< 12°C)
    autumnColdCalm: {
      fish: "Gec sonbahar: Mezgit sezonu acildi! Levrek derin sulara cekiliyor. Kalkan aktif.",
      bait: "Agir jig, derin minnow, canli yem, slow pitch jig"
    },
    autumnColdWindy: {
      fish: "Soguk ve ruzgarli sonbahar: Mezgit ve Levrek icin iyi! Kis hazirligi basladi.",
      bait: "Agir silikon, jig head 18-25gr, canli caca"
    },
    // GENEL
    lowPressure: {
      fish: "Dusuk basinc: Baliklar aktif! Firtina oncesi avlanma icguduleri tetiklendi. Firsati kacirma!",
      bait: "Agresif yemler - popper, jerkbait, buyuk silikon, hizli retrieve"
    },
    highPressure: {
      fish: "Yuksek basinc: Baliklar durgun olabilir. Sabir gerekli. Yavas ve dikkatli avla.",
      bait: "Finesse teknikleri - kucuk silikon, yavas minnow, canli yem tercih"
    },
    morning: {
      fish: "Sabah saatleri: Levrek, Cipura, Lufer aktif olmasi beklenir. Altin saat dilimi!",
      bait: "Minnow, silikon, popper - klasik sabah donanimi"
    },
    evening: {
      fish: "Aksam saatleri: Baliklar aksam yemegine cikiyor. Levrek, Lufer, Istavrit aktif.",
      bait: "Popper, stick bait, minnow - aksam cikisi icin ideal"
    },
    night: {
      fish: "Gece avi: Levrek, Kalamar, Barbun gece aktif. Fener isiklari civarini kontrol et.",
      bait: "Fosforlu yemler, kalamar egi, canli karides"
    },
    default: {
      fish: "Genel durum: Levrek, Cipura, Lufer, Istavrit aktif olabilir. Kosullara gore avla.",
      bait: "11-14cm minnow, silikon balik, popper, metal jig - cesitlilik onemli"
    }
  },
  en: {
    // WINTER - Very cold (< 5°C)
    winterColdNight: {
      fish: "Night + Cold: Whiting active in deep waters. Sea bass hunting near rocky bottoms. Scorpionfish searching for bottom creatures.",
      bait: "Phosphorescent jig head (21-28gr), orange/red silicone, live squid pieces, glow shad for night"
    },
    winterColdMorning: {
      fish: "Morning + Cold: Whiting and Sea bass starting morning activity. Turbot in sandy bottom areas. Ideal for bottom fishing.",
      bait: "Heavy silicone (motor oil color), 18-25gr jig head, live baitfish, slow pitch jig"
    },
    winterColdCalm: {
      fish: "Calm winter day: Whiting schools gathered at bottom. Sea bass moving slowly. Turbot may be active.",
      bait: "Deep minnow (11-14cm), heavy metal jig, live bait preferred"
    },
    winterColdWindy: {
      fish: "Cold + Windy: Sea bass approaching shore, bait organisms near coastline. Whiting waiting in deep waters.",
      bait: "Heavy jig head (21-28gr), large silicone fish, deep running minnow, live bait"
    },
    winterStorm: {
      fish: "Winter storm: Sea bass and Mullet in sheltered harbors. Scorpionfish at breakwater bottoms.",
      bait: "Heavy silicone, live bait essential, bread for mullet, live baitfish"
    },
    // WINTER - Cool (5-10°C)
    winterCoolMorning: {
      fish: "Ideal winter morning: Sea bass on morning hunt, Whiting active, Sea bream in deep waters. Golden hour!",
      bait: "11-14cm suspending minnow, silicone shad (motor oil), live bream, slow jig"
    },
    winterCoolEvening: {
      fish: "Winter evening: Sea bass in evening activity, Dentex on rocks, Red porgy in deep reefs.",
      bait: "Minnow (natural colors), medium weight jig, live shrimp, squid pieces"
    },
    winterCoolNight: {
      fish: "Winter night: Sea bass night fishing amazing! Whiting showing interest in phosphorescent lures. Check around lights.",
      bait: "Phosphorescent silicone, glow minnow, live bait, scan around lanterns"
    },
    winterCoolMid: {
      fish: "Winter midday: Sea bass and Whiting active. Sea bream in deep areas. Patience required.",
      bait: "Minnow, silicone shad, try live bait combination"
    },
    winterCoolWindy: {
      fish: "Windy winter: Sea bass very active on shores! Wind pushing bait to coast. Don't miss the chance!",
      bait: "Deep running minnow, heavy jig head (14-21gr), large silicone fish"
    },
    winterCoolStorm: {
      fish: "Stormy winter: Sea bass, Mullet and Scorpionfish in sheltered harbors. Breakwaters productive.",
      bait: "Heavy silicone, live bait, bread (for mullet), breakwater bottoms"
    },
    // WINTER - Mild (10-15°C)
    winterMildCalm: {
      fish: "Mild winter day: Sea bass, Sea bream, Dentex very active! Bluefish occasionally seen. Mid-winter surprise!",
      bait: "11-14cm minnow (natural colors), stick bait, popper, live horse mackerel"
    },
    winterMildWindy: {
      fish: "Mild and windy winter: Sea bass on rocks, Sea bream at current spots, Mullet on shores.",
      bait: "Minnow, silicone, bread for mullet, target current areas"
    },
    // SPRING - Cool (8-14°C)
    springCoolMorning: {
      fish: "Spring morning: Sea bass waking up, Sea bream seeking warm water, Bluefish approaching shores!",
      bait: "Minnow (bright colors), silicone shad, popper, live baitfish"
    },
    springCoolEvening: {
      fish: "Spring evening: Sea bass active in evening hunt, Bluefish in schools, Dentex on rocks.",
      bait: "Stick bait, popper, metal jig 20-30gr, live horse mackerel"
    },
    springCoolMid: {
      fish: "Spring midday: Sea bass, Sea bream active. Bluefish starting to appear. Season opening!",
      bait: "Minnow, silicone, try popper, live bait always works"
    },
    springCoolWindy: {
      fish: "Windy spring: Sea bass and Bluefish very active on shores! Wind bringing bait.",
      bait: "Heavy minnow, metal jig, large silicone, try surface lures"
    },
    springCoolStorm: {
      fish: "Stormy spring: Sea bass, Mullet in sheltered areas. After storm is golden!",
      bait: "Heavy jig, live bait, wait for after the storm"
    },
    // SPRING - Ideal (14-20°C)
    springIdealMorning: {
      fish: "GOLDEN MORNING! Sea bass, Sea bream, Bluefish, Bonito all active! Best time of the season!",
      bait: "Any lure works: minnow, popper, jig, live bait. Action guaranteed!"
    },
    springIdealEvening: {
      fish: "GOLDEN EVENING! Bluefish attacking in schools, Sea bass on rocks, Bonito on surface!",
      bait: "Popper, stick bait, metal jig, sabiki rig, live horse mackerel"
    },
    springIdealNight: {
      fish: "Spring night: Sea bass night fishing spectacular, Squid season opened, Red mullet active.",
      bait: "Phosphorescent minnow, squid jig (egi), live shrimp, night jig"
    },
    springIdealMid: {
      fish: "Perfect spring: ALL FISH ACTIVE! Sea bass, Sea bream, Bluefish, Dentex, Red porgy...",
      bait: "Minnow, popper, jig, live bait - try everything!"
    },
    springIdealWindy: {
      fish: "Windy but productive: Bluefish going crazy! Sea bass close to shore. Bonito in schools.",
      bait: "Metal jig 30-50gr, large popper, trolling lure, sabiki"
    },
    springIdealStorm: {
      fish: "Strong wind: Great for Bluefish and Bonito! Sea bass very active on shore!",
      bait: "Heavy metal jig, large silicone, deep minnow"
    },
    // SPRING - Warm (20-25°C)
    springWarmCalm: {
      fish: "Pre-summer: Sea bream, Horse mackerel, Chub mackerel active. Bluefish better at night. Red porgy in depths.",
      bait: "Small minnow (7-9cm), micro jig, sabiki, live shrimp"
    },
    springWarmWindy: {
      fish: "Hot and windy: Surface fish (Bluefish, Horse mackerel, Chub mackerel) active. Fish morning/evening.",
      bait: "Popper, small metal jig, sabiki rig, stick bait"
    },
    // SUMMER - Mild (18-24°C)
    summerMildNight: {
      fish: "Golden summer night: Sea bass active at night, Squid fishing ideal, Red porgy and Comber at bottom.",
      bait: "Phosphorescent silicone, squid jig (egi), night minnow, live shrimp"
    },
    summerMildMorning: {
      fish: "Early summer morning: Sea bass at sunrise, Sea bream doesn't like heat - fish early!",
      bait: "Minnow, silicone, popper - finish before sun rises"
    },
    summerMildEvening: {
      fish: "Summer evening: Sea bass, Bluefish, Horse mackerel activating with temperature drop. Fish evenings!",
      bait: "Popper, stick bait, minnow, live bait"
    },
    summerMildMidday: {
      fish: "Hot midday: Fish retreating to deep, cool waters. Midday fishing difficult.",
      bait: "Deep jig, live bait, target shaded areas"
    },
    summerMildWindy: {
      fish: "Windy summer: Horse mackerel, Chub mackerel, Bluefish on surface! Sea breeze time!",
      bait: "Sabiki, popper, metal jig, live smelt"
    },
    // SUMMER - Hot (24-30°C)
    summerHotNight: {
      fish: "Hot summer night: NIGHT FISHING ESSENTIAL! Sea bass, Squid, Red mullet, Red porgy active at night.",
      bait: "Any phosphorescent lure, squid egi, live shrimp, night jig"
    },
    summerHotMorning: {
      fish: "Hot morning: Only 1-2 hours before sunrise! Fish go deeper after that.",
      bait: "Fish fast - minnow, popper, live bait"
    },
    summerHotMidday: {
      fish: "Very hot day: Midday fishing very difficult. Night or very early morning only chance.",
      bait: "Deep water lures, live bait, plan for night fishing"
    },
    summerHotWindy: {
      fish: "Hot but windy: Horse mackerel, Chub mackerel schools on surface. Bluefish may come out in evening.",
      bait: "Sabiki, micro jig, popper, wait for evening"
    },
    // SUMMER - Very hot (> 30°C)
    summerVeryHotNight: {
      fish: "Scorching night: Night fishing only option! Sea bass, Squid, bottom fish active.",
      bait: "Full phosphorescent gear, squid egi, live bait"
    },
    summerVeryHotDay: {
      fish: "Extreme heat: Fishing very difficult. Prefer night fishing or go to very deep waters.",
      bait: "Deep water jig, live bait, wait for night"
    },
    // AUTUMN - Early (18-24°C)
    autumnEarlyMorning: {
      fish: "Golden autumn morning: Bluefish in frenzy! Bonito schools! Sea bass on rocks!",
      bait: "Metal jig, popper, minnow, sabiki - everything works!"
    },
    autumnEarlyEvening: {
      fish: "Spectacular autumn evening: Bluefish in attack mode, Bonito ideal for trolling, Sea bass active!",
      bait: "Popper, stick bait, trolling lure, metal jig 30-50gr"
    },
    autumnEarlyMid: {
      fish: "AUTUMN SEASON! Bluefish, Bonito, Sea bass, Sea bream - most productive time of year!",
      bait: "Any artificial lure, live horse mackerel, sabiki, trolling lure"
    },
    autumnEarlyWindy: {
      fish: "Windy autumn: Bluefish and Bonito going crazy! Sea bass gone wild on shore!",
      bait: "Heavy jig, large popper, trolling, large minnow"
    },
    // AUTUMN - Cool (12-18°C)
    autumnCoolMorning: {
      fish: "Cool autumn morning: Sea bass, Sea bream main activity time. Bluefish still around. Whiting arriving!",
      bait: "Minnow (11-14cm), silicone shad, live baitfish, jig"
    },
    autumnCoolEvening: {
      fish: "Autumn evening: Sea bass evening exit amazing, Bluefish last attacks, Dentex on rocks.",
      bait: "Stick bait, popper, minnow, live horse mackerel"
    },
    autumnCoolMid: {
      fish: "Cool autumn day: Sea bass and Sea bream very active. Bluefish decreasing. Whiting increasing.",
      bait: "Minnow, silicone, live bait - classic gear"
    },
    autumnCoolWindy: {
      fish: "Windy autumn: Sea bass stuck to shore! Attacks anything that moves!",
      bait: "Large silicone, heavy minnow, live bait"
    },
    // AUTUMN - Cold (< 12°C)
    autumnColdCalm: {
      fish: "Late autumn: Whiting season opened! Sea bass retreating to deep waters. Turbot active.",
      bait: "Heavy jig, deep minnow, live bait, slow pitch jig"
    },
    autumnColdWindy: {
      fish: "Cold and windy autumn: Good for Whiting and Sea bass! Winter preparation started.",
      bait: "Heavy silicone, jig head 18-25gr, live baitfish"
    },
    // GENERAL
    lowPressure: {
      fish: "Low pressure: Fish active! Pre-storm hunting instincts triggered. Don't miss the chance!",
      bait: "Aggressive lures - popper, jerkbait, large silicone, fast retrieve"
    },
    highPressure: {
      fish: "High pressure: Fish may be sluggish. Patience required. Fish slow and careful.",
      bait: "Finesse techniques - small silicone, slow minnow, prefer live bait"
    },
    morning: {
      fish: "Morning hours: Sea bass, Sea bream, Bluefish expected to be active. Golden hour!",
      bait: "Minnow, silicone, popper - classic morning gear"
    },
    evening: {
      fish: "Evening hours: Fish coming out for dinner. Sea bass, Bluefish, Horse mackerel active.",
      bait: "Popper, stick bait, minnow - ideal for evening"
    },
    night: {
      fish: "Night fishing: Sea bass, Squid, Red mullet active at night. Check around lights.",
      bait: "Phosphorescent lures, squid egi, live shrimp"
    },
    default: {
      fish: "General conditions: Sea bass, Sea bream, Bluefish, Horse mackerel may be active. Fish according to conditions.",
      bait: "11-14cm minnow, silicone fish, popper, metal jig - variety is key"
    }
  }
}

export function getFishSuggestion(temp, windSpeed, lang = 'tr') {
  const t = translations[lang] || translations.tr
  const hour = new Date().getHours()
  const month = new Date().getMonth() // 0-11

  // Mevsim belirleme
  const isWinter = month >= 11 || month <= 2  // Aralik-Subat
  const isSpring = month >= 3 && month <= 5   // Mart-Mayis
  const isSummer = month >= 6 && month <= 8   // Haziran-Agustos
  const isAutumn = month >= 9 && month <= 10  // Eylul-Kasim

  // Saat dilimleri
  const isNight = hour >= 22 || hour <= 5
  const isMorning = hour >= 6 && hour <= 9
  const isEvening = hour >= 16 && hour <= 21

  // ==================== KIS SEZONU (Aralik-Subat) ====================
  if (isWinter) {
    if (temp < 5) {
      if (windSpeed < 8) {
        if (isNight) return t.winterColdNight
        if (isMorning) return t.winterColdMorning
        return t.winterColdCalm
      }
      if (windSpeed < 15) return t.winterColdWindy
      return t.winterStorm
    }

    if (temp >= 5 && temp < 10) {
      if (windSpeed < 10) {
        if (isMorning) return t.winterCoolMorning
        if (isEvening) return t.winterCoolEvening
        if (isNight) return t.winterCoolNight
        return t.winterCoolMid
      }
      if (windSpeed < 20) return t.winterCoolWindy
      return t.winterCoolStorm
    }

    if (temp >= 10 && temp < 15) {
      if (windSpeed < 12) return t.winterMildCalm
      return t.winterMildWindy
    }
  }

  // ==================== ILKBAHAR SEZONU (Mart-Mayis) ====================
  if (isSpring) {
    if (temp < 14) {
      if (windSpeed < 10) {
        if (isMorning) return t.springCoolMorning
        if (isEvening) return t.springCoolEvening
        return t.springCoolMid
      }
      if (windSpeed < 18) return t.springCoolWindy
      return t.springCoolStorm
    }

    if (temp >= 14 && temp < 20) {
      if (windSpeed < 10) {
        if (isMorning) return t.springIdealMorning
        if (isEvening) return t.springIdealEvening
        if (isNight) return t.springIdealNight
        return t.springIdealMid
      }
      if (windSpeed < 20) return t.springIdealWindy
      return t.springIdealStorm
    }

    if (temp >= 20) {
      if (windSpeed < 12) return t.springWarmCalm
      return t.springWarmWindy
    }
  }

  // ==================== YAZ SEZONU (Haziran-Agustos) ====================
  if (isSummer) {
    if (temp < 24) {
      if (windSpeed < 10) {
        if (isNight) return t.summerMildNight
        if (isMorning) return t.summerMildMorning
        if (isEvening) return t.summerMildEvening
        return t.summerMildMidday
      }
      return t.summerMildWindy
    }

    if (temp >= 24 && temp < 30) {
      if (windSpeed < 8) {
        if (isNight) return t.summerHotNight
        if (isMorning) return t.summerHotMorning
        return t.summerHotMidday
      }
      return t.summerHotWindy
    }

    if (temp >= 30) {
      if (isNight) return t.summerVeryHotNight
      return t.summerVeryHotDay
    }
  }

  // ==================== SONBAHAR SEZONU (Eylul-Kasim) ====================
  if (isAutumn) {
    if (temp >= 18 && temp < 24) {
      if (windSpeed < 12) {
        if (isMorning) return t.autumnEarlyMorning
        if (isEvening) return t.autumnEarlyEvening
        return t.autumnEarlyMid
      }
      return t.autumnEarlyWindy
    }

    if (temp >= 12 && temp < 18) {
      if (windSpeed < 15) {
        if (isMorning) return t.autumnCoolMorning
        if (isEvening) return t.autumnCoolEvening
        return t.autumnCoolMid
      }
      return t.autumnCoolWindy
    }

    if (temp < 12) {
      if (windSpeed < 10) return t.autumnColdCalm
      return t.autumnColdWindy
    }
  }

  // ==================== GENEL / VARSAYILAN ====================
  if (isMorning) return t.morning
  if (isEvening) return t.evening
  if (isNight) return t.night

  return t.default
}

// Ay fazina gore balik tavsiyesi - GENISLETILMIS
export function getMoonFishSuggestion(phase, lang = 'tr') {
  const hour = new Date().getHours()
  const isNight = hour >= 20 || hour <= 6

  const suggestions = {
    tr: {
      0: { // Yeni Ay
        title: "Yeni Ay - EN IYI DONEM!",
        fish: isNight
          ? "GECE AVI ALTIN! Levrek, Cipura, Lufer karanlikta avlaniyor. Kalamar cok aktif!"
          : "Yeni ay gunduz: Levrek, Cipura derin sularda. Aksami ve geceyi bekle!",
        tip: isNight
          ? "Tam karanlik - baliklar guvende hissedip yuzey e cikiyor. Fosforlu yemler sart!"
          : "Gunduz aktivite dusuk. Gece avini planla. Sabah cok erken veya aksam avla.",
        bait: "Fosforlu silikon, glow minnow, canli yem, kalamar egi"
      },
      1: { // Hilal (buyuyen)
        title: "Buyuyen Hilal - Iyi Donem",
        fish: isNight
          ? "Gece aktivitesi yuksek: Levrek, Mezgit, Cipura aktif. Az isik avantaj!"
          : "Gunduz: Gun dogumu ve batimi en verimli. Levrek kayaliklarda.",
        tip: "Ay isigi az - baliklar hala gece avantajli. Sabah ve aksam da iyi.",
        bait: "Dogal renkli minnow, silikon shad, canli caca, orta agirlik jig"
      },
      2: { // Ilk Dordun
        title: "Ilk Dordun - Orta Aktivite",
        fish: "Cipura, Istavrit, Barbun orta aktivitede. Levrek secici besleniyor.",
        tip: "Sabah erken saatler daha verimli. Aksam aktivite dusebilir. Sabir gerekli.",
        bait: "Kucuk minnow, sabiki, canli karides, dogal renkler tercih"
      },
      3: { // Siskin (dolunaya gidis)
        title: "Dolunaya Gidis - Artan Aktivite",
        fish: "Levrek, Lufer, Kolyoz aktiflesmeye basladi! Dolunay hazirligi.",
        tip: "Her gecen gun daha iyi! Aksam saatleri giderek verimli. Gece avina hazirlan.",
        bait: "Popper, stick bait, metal jig, parlak renkler etkili"
      },
      4: { // Dolunay
        title: "DOLUNAY - ZIRVE AKTIVITE!",
        fish: isNight
          ? "GECE AVI MUHTESEM! Ay isiginda TUM BALIKLAR yuzey de! Suruler gorulur!"
          : "Dolunay gunduz: Aktivite hala yuksek. Tum gun avlanabilir!",
        tip: isNight
          ? "Ay isigi denizi aydinlatiyor - baliklar rahat avlaniyor. Gumus/beyaz yemler!"
          : "Dolunay etkisi gunduz de devam eder. Aksam ve gece daha da iyi!",
        bait: "Yuzey yemler, popper, gumus/beyaz minnow, parlak jig, canli yem"
      },
      5: { // Siskin (azalan)
        title: "Dolunay Sonrasi - Hala Cok Iyi",
        fish: isNight
          ? "Gece hala verimli: Levrek, Cipura, Palamut aktif. Ay isigi azaliyor."
          : "Gunduz iyi: Sabah ozellikle verimli. Aktivite devam ediyor.",
        tip: "Dolunay etkisi 2-3 gun devam eder. Gece avi hala tavsiye edilir.",
        bait: "Minnow, silikon, trolling lure, canli kolyoz"
      },
      6: { // Son Dordun
        title: "Son Dordun - Azalan Aktivite",
        fish: "Mezgit, Barbun, Iskorpit (dip baliklari) one cikiyor. Yuzey aktivitesi dusuk.",
        tip: "Dip avi daha verimli. Sabah erken saatler. Derin sulari hedefle.",
        bait: "Agir jig, canli yem, kalamar parcasi, dip donanimlari"
      },
      7: { // Hilal (azalan)
        title: "Azalan Hilal - Yeni Ay Hazirligi",
        fish: isNight
          ? "Karanlik artiyor: Levrek, Mezgit gece aktiflesmeye basliyor!"
          : "Gunduz durgun: Aktivite dusuk. Yeni Ay'i bekle veya gece avla.",
        tip: "Aktivite artmaya basliyor. Gece avina hazirlan! Yeni Ay yaklasıyor.",
        bait: "Fosforlu yemler, derin minnow, silikon, gece donanimlari"
      }
    },
    en: {
      0: { // New Moon
        title: "New Moon - BEST PERIOD!",
        fish: isNight
          ? "GOLDEN NIGHT FISHING! Sea bass, Sea bream, Bluefish hunting in darkness. Squid very active!"
          : "New moon daytime: Sea bass, Sea bream in deep waters. Wait for evening and night!",
        tip: isNight
          ? "Total darkness - fish feel safe and come to surface. Phosphorescent lures essential!"
          : "Daytime activity low. Plan for night fishing. Fish very early morning or evening.",
        bait: "Phosphorescent silicone, glow minnow, live bait, squid egi"
      },
      1: { // Waxing Crescent
        title: "Waxing Crescent - Good Period",
        fish: isNight
          ? "High night activity: Sea bass, Whiting, Sea bream active. Low light is advantage!"
          : "Daytime: Sunrise and sunset most productive. Sea bass on rocks.",
        tip: "Little moonlight - fish still have night advantage. Morning and evening also good.",
        bait: "Natural color minnow, silicone shad, live baitfish, medium weight jig"
      },
      2: { // First Quarter
        title: "First Quarter - Medium Activity",
        fish: "Sea bream, Horse mackerel, Red mullet at medium activity. Sea bass feeding selectively.",
        tip: "Early morning hours more productive. Evening activity may decrease. Patience required.",
        bait: "Small minnow, sabiki, live shrimp, prefer natural colors"
      },
      3: { // Waxing Gibbous
        title: "Approaching Full Moon - Increasing Activity",
        fish: "Sea bass, Bluefish, Chub mackerel starting to activate! Full moon preparation.",
        tip: "Getting better each day! Evening hours increasingly productive. Prepare for night fishing.",
        bait: "Popper, stick bait, metal jig, bright colors effective"
      },
      4: { // Full Moon
        title: "FULL MOON - PEAK ACTIVITY!",
        fish: isNight
          ? "NIGHT FISHING SPECTACULAR! ALL FISH on surface in moonlight! Schools visible!"
          : "Full moon daytime: Activity still high. Can fish all day!",
        tip: isNight
          ? "Moonlight illuminating the sea - fish feeding comfortably. Silver/white lures!"
          : "Full moon effect continues during day. Evening and night even better!",
        bait: "Surface lures, popper, silver/white minnow, bright jig, live bait"
      },
      5: { // Waning Gibbous
        title: "After Full Moon - Still Very Good",
        fish: isNight
          ? "Night still productive: Sea bass, Sea bream, Bonito active. Moonlight decreasing."
          : "Daytime good: Morning especially productive. Activity continues.",
        tip: "Full moon effect lasts 2-3 days. Night fishing still recommended.",
        bait: "Minnow, silicone, trolling lure, live horse mackerel"
      },
      6: { // Last Quarter
        title: "Last Quarter - Decreasing Activity",
        fish: "Whiting, Red mullet, Scorpionfish (bottom fish) coming forward. Surface activity low.",
        tip: "Bottom fishing more productive. Early morning hours. Target deep waters.",
        bait: "Heavy jig, live bait, squid pieces, bottom rigs"
      },
      7: { // Waning Crescent
        title: "Waning Crescent - New Moon Preparation",
        fish: isNight
          ? "Darkness increasing: Sea bass, Whiting starting to activate at night!"
          : "Daytime slow: Activity low. Wait for New Moon or fish at night.",
        tip: "Activity starting to increase. Prepare for night fishing! New Moon approaching.",
        bait: "Phosphorescent lures, deep minnow, silicone, night gear"
      }
    }
  }

  const langSuggestions = suggestions[lang] || suggestions.tr
  return langSuggestions[phase] || langSuggestions[0]
}
