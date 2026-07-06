import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Preguntas Frecuentes",
  description:
    "Respuestas a las preguntas más frecuentes sobre reservas, pagos, horarios, servicios y políticas del Complejo El Alto en Tanti.",
  alternates: {
    canonical: "/consultas-frecuentes",
  },
  openGraph: {
    title: "Preguntas Frecuentes | Complejo El Alto",
    description:
      "Todo lo que necesitas saber sobre tu estadía en Complejo El Alto. Reservas, pagos, check-in, servicios y más.",
    url: "/consultas-frecuentes",
    images: ["/og-image.jpg"],
  },
};

export default function ConsultasFrecuentesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
