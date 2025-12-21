import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cabañas y Tarifas",
  description:
    "12 cabañas con capacidad de 2 a 6 personas. Dúplex, estándar, compactas y para parejas. Tarifas actualizadas temporada 2025/26.",
  alternates: {
    canonical: "/cabanas",
  },
  openGraph: {
    title: "Cabañas y Tarifas | Complejo El Alto",
    description:
      "12 cabañas con capacidad de 2 a 6 personas en Tanti, Córdoba. Consulta disponibilidad y tarifas.",
  },
};

export default function CabanasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
