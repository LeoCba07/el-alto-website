import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unidades",
  description:
    "12 unidades con capacidad de 2 a 6 personas en Tanti, Córdoba. Monoambientes para parejas, unidades familiares y de dos plantas para grupos.",
  alternates: {
    canonical: "/unidades",
  },
  openGraph: {
    title: "Unidades | Complejo El Alto",
    description:
      "12 unidades con capacidad de 2 a 6 personas en Tanti, Córdoba. Consultá disponibilidad.",
    url: "/unidades",
    images: ["/og-image.jpg"],
  },
};

export default function UnidadesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
