import SporDeneme from "./SporDeneme";

export const metadata = {
  title: "Spor Salonu Üye Takip (Deneme)",
  description: "Üye ve vücut ölçüm takibi - deneme sayfası",
  robots: { index: false, follow: false },
};

export default function SporDenemePage() {
  return <SporDeneme />;
}
