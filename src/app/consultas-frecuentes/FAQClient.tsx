'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  HiOutlineChatBubbleLeftRight,
  HiOutlineChevronDown,
  HiOutlineCreditCard,
  HiOutlineClock,
  HiOutlineSquares2X2,
  HiOutlineClipboardDocumentList,
  HiOutlineMapPin,
} from 'react-icons/hi2'
import { IconType } from 'react-icons'

export interface FAQQuestion {
  pregunta: string
  respuesta: string
}

export interface FAQCategory {
  id: string
  label: string
  questions: FAQQuestion[]
}

export interface FAQClientProps {
  categories?: FAQCategory[]
}

const iconMap: Record<string, IconType> = {
  reservas: HiOutlineCreditCard,
  horarios: HiOutlineClock,
  servicios: HiOutlineSquares2X2,
  normas: HiOutlineClipboardDocumentList,
  ubicacion: HiOutlineMapPin,
}

const defaultCategories: FAQCategory[] = [
  {
    id: 'reservas',
    label: 'Reservas',
    questions: [
      { pregunta: '¿Cómo hago mi reserva?', respuesta: 'Contactanos por WhatsApp o teléfono. Te tomamos la reserva provisoria y te enviamos los datos bancarios para confirmar con la seña.' },
      { pregunta: '¿Cuánto es la seña?', respuesta: '30% del total. Para estadías de 2 noches o menos, es el 50%.' },
      { pregunta: '¿Hay estadía mínima?', respuesta: 'En temporada alta/media sí. En temporada baja podés reservar una sola noche.' },
      { pregunta: '¿Aceptan tarjeta?', respuesta: 'Sí, todas las tarjetas vía Mercado Pago.' },
      { pregunta: '¿Puedo cancelar mi reserva?', respuesta: 'Depende de la temporada. En alta/media, hasta 30 días antes para reembolso total (entre 15-29 días se cobra 1 noche). En baja, hasta 72hs antes.' },
      { pregunta: '¿Puedo modificar las fechas?', respuesta: 'Una vez confirmada la reserva, no es posible modificar las fechas.' },
    ],
  },
  {
    id: 'horarios',
    label: 'Horarios',
    questions: [
      { pregunta: '¿Check-in y check-out?', respuesta: 'Check-in desde las 13:30 hs. Check-out hasta las 10:00 hs.' },
      { pregunta: '¿Puedo llegar tarde?', respuesta: 'Hasta las 20:00 sin aviso. Más tarde avisanos porque no hay sereno nocturno.' },
      { pregunta: '¿Late check-out?', respuesta: 'Sí, hasta las 18:00 con 50% de recargo, sujeto a disponibilidad.' },
      { pregunta: '¿Dónde dejo el equipaje si me voy tarde?', respuesta: 'En administración, sin cargo, hasta tu partida.' },
      { pregunta: '¿Horario de la pileta?', respuesta: 'De 9:30 a 22:00 hs. Niños siempre acompañados por un adulto.' },
    ],
  },
  {
    id: 'servicios',
    label: 'Servicios',
    questions: [
      { pregunta: '¿Qué incluyen las cabañas?', respuesta: 'Cocina equipada, ropa blanca, TV con cable, calefacción y baño privado.' },
      { pregunta: '¿Tienen aire acondicionado?', respuesta: 'Sí, con costo adicional. La calefacción está incluida.' },
      { pregunta: '¿Incluye servicio de mucama?', respuesta: 'No, así mantenemos precios competitivos.' },
      { pregunta: '¿Tienen silla alta para bebé?', respuesta: 'Sí, consultá disponibilidad al reservar.' },
      { pregunta: '¿Hay Wi-Fi?', respuesta: 'Sí, gratis en todo el predio.' },
      { pregunta: '¿Hay cochera?', respuesta: 'Sí, una cubierta por unidad.' },
    ],
  },
  {
    id: 'normas',
    label: 'Normas',
    questions: [
      { pregunta: '¿Aceptan mascotas?', respuesta: 'No, para garantizar la tranquilidad de todos los huéspedes.' },
      { pregunta: '¿Se permiten visitas?', respuesta: 'No, el complejo es de uso exclusivo para huéspedes.' },
      { pregunta: '¿Hay límite de personas?', respuesta: 'Sí, no podemos exceder la capacidad indicada (bebés incluidos).' },
      { pregunta: '¿Seguro de viajero?', respuesta: 'No es obligatorio, pero la provincia lo recomienda.' },
    ],
  },
  {
    id: 'ubicacion',
    label: 'Ubicación',
    questions: [
      { pregunta: '¿Están cerca del centro?', respuesta: 'Sí, a 6 cuadras. El río y El Diquecito también están cerca.' },
      { pregunta: '¿Hay supermercados?', respuesta: 'Despensas a 100m, supermercado grande a 3 cuadras.' },
      { pregunta: '¿Cómo llego en colectivo?', respuesta: 'Terminal a 6 cuadras. Parada más cercana a 150m.' },
      { pregunta: '¿A cuánto está Villa Carlos Paz?', respuesta: 'A 10 minutos en auto.' },
    ],
  },
]

function QuestionItem({ q, a }: { q: string; a: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-sand last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 text-left group focus:outline-none focus:ring-2 focus:ring-forest focus:ring-inset rounded-lg"
      >
        <span className="font-medium text-forest-dark group-hover:text-forest pr-4">{q}</span>
        <HiOutlineChevronDown
          className={`w-5 h-5 text-amber flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <div className={`overflow-hidden transition-all ${isOpen ? 'max-h-96 pb-4' : 'max-h-0'}`}>
        <p className="text-text-medium">{a}</p>
      </div>
    </div>
  )
}

export default function FAQClient({ categories }: FAQClientProps) {
  const faqCategories = categories?.length ? categories : defaultCategories
  const [activeCategory, setActiveCategory] = useState(faqCategories[0].id)
  const active = faqCategories.find((c) => c.id === activeCategory)!

  return (
    <div className="bg-cream min-h-screen flex flex-col">
      {/* Header Section */}
      <section className="bg-forest-dark text-white py-12 md:py-16 mt-14 md:mt-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-amber font-medium mb-2 tracking-wide uppercase text-sm">
            Resolvé tus dudas
          </p>
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-3">
            Preguntas Frecuentes
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto">
            Todo lo que necesitás saber antes de tu viaje
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-12 md:py-16 flex-1">
        <div className="max-w-3xl mx-auto px-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {faqCategories.map((cat) => {
              const Icon = iconMap[cat.id] || HiOutlineChatBubbleLeftRight
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === cat.id
                      ? 'bg-forest-dark text-white'
                      : 'bg-white text-forest-dark border border-sand hover:border-forest'
                  }`}
                >
                  <Icon className="w-4 h-4 hidden sm:block" />
                  <span>{cat.label}</span>
                </button>
              )
            })}
          </div>

          {/* Questions */}
          <div className="bg-white rounded-2xl border border-sand p-6">
            {active.questions.map((item, idx) => (
              <QuestionItem key={`${activeCategory}-${idx}`} q={item.pregunta} a={item.respuesta} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-forest">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white font-serif mb-4">
            ¿Tenés otra consulta?
          </h2>
          <p className="text-white/80 mb-8">
            Estamos para ayudarte
          </p>
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 bg-amber text-white px-8 py-4 rounded-full font-semibold hover:bg-amber-dark transition-all hover:shadow-lg hover:shadow-amber/25"
          >
            <HiOutlineChatBubbleLeftRight className="w-5 h-5" />
            Contactanos
          </Link>
        </div>
      </section>
    </div>
  )
}
