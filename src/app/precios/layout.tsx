import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Precios",
  description:
    "Precios por noche en Complejo El Alto, Tanti, Córdoba. Tarifas de temporada alta, media y baja para 2 a 6 personas. Descuentos por pago en efectivo.",
  alternates: {
    canonical: "/precios",
  },
  openGraph: {
    title: "Precios | Complejo El Alto",
    description:
      "Tarifas por noche y por temporada para alojamiento en Tanti, Córdoba.",
    url: "/precios",
    images: ["/og-image.jpg"],
  },
};

export default function PreciosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
