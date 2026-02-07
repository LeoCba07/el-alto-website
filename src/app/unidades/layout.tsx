import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unidades y Tarifas",
  description:
    "12 unidades con capacidad de 2 a 6 personas. Dúplex, estándar, compactas y para parejas. Tarifas actualizadas temporada 2025/26.",
  alternates: {
    canonical: "/unidades",
  },
  openGraph: {
    title: "Unidades y Tarifas | Complejo El Alto",
    description:
      "12 unidades con capacidad de 2 a 6 personas en Tanti, Córdoba. Consulta disponibilidad y tarifas.",
  },
};

export default function UnidadesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
