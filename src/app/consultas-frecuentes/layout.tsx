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
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "¿Cómo hago mi reserva?", acceptedAnswer: { "@type": "Answer", text: "Contactanos por WhatsApp o teléfono. Te tomamos la reserva provisoria y te enviamos los datos bancarios para confirmar con la seña." }},
    { "@type": "Question", name: "¿Cuánto es la seña?", acceptedAnswer: { "@type": "Answer", text: "30% del total. Para estadías de 2 noches o menos, es el 50%." }},
    { "@type": "Question", name: "¿Check-in y check-out?", acceptedAnswer: { "@type": "Answer", text: "Check-in desde las 13:30 hs. Check-out hasta las 10:00 hs." }},
    { "@type": "Question", name: "¿Qué incluyen las cabañas?", acceptedAnswer: { "@type": "Answer", text: "Cocina equipada, ropa blanca, TV con cable, calefacción y baño privado." }},
    { "@type": "Question", name: "¿Tienen aire acondicionado?", acceptedAnswer: { "@type": "Answer", text: "Sí, con costo adicional. La calefacción está incluida." }},
    { "@type": "Question", name: "¿Hay Wi-Fi?", acceptedAnswer: { "@type": "Answer", text: "Sí, gratis en todo el predio." }},
    { "@type": "Question", name: "¿Aceptan mascotas?", acceptedAnswer: { "@type": "Answer", text: "No, para garantizar la tranquilidad de todos los huéspedes." }},
    { "@type": "Question", name: "¿Están cerca del centro?", acceptedAnswer: { "@type": "Answer", text: "Sí, a 6 cuadras. El río y El Diquecito también están cerca." }},
    { "@type": "Question", name: "¿A cuánto está Villa Carlos Paz?", acceptedAnswer: { "@type": "Answer", text: "A 10 minutos en auto." }},
  ],
};

export default function ConsultasFrecuentesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {children}
    </>
  );
}
