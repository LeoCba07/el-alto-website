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

interface Category {
  id: string
  label: string
  Icon: IconType
  questions: { q: string; a: string }[]
}

const categories: Category[] = [
  {
    id: 'reservas',
    label: 'Reservas',
    Icon: HiOutlineCreditCard,
    questions: [
      { q: '¿Cómo hago mi reserva?', a: 'Contactanos por WhatsApp o teléfono. Te tomamos la reserva provisoria y te enviamos los datos bancarios para confirmar con la seña.' },
      { q: '¿Cuánto es la seña?', a: '30% del total. Para estadías de 2 noches o menos, es el 50%.' },
      { q: '¿Hay estadía mínima?', a: 'En temporada alta/media sí. En temporada baja podés reservar una sola noche.' },
      { q: '¿Aceptan tarjeta?', a: 'Sí, todas las tarjetas vía Mercado Pago.' },
      { q: '¿Puedo cancelar mi reserva?', a: 'Depende de la temporada. En baja, hasta 72hs antes. En alta/media, hasta 30 días antes para reembolso total.' },
      { q: '¿Puedo modificar las fechas?', a: 'Una vez confirmada la reserva, no es posible modificar las fechas.' },
    ],
  },
  {
    id: 'horarios',
    label: 'Horarios',
    Icon: HiOutlineClock,
    questions: [
      { q: '¿Check-in y check-out?', a: 'Check-in desde las 13:30 hs. Check-out hasta las 10:00 hs.' },
      { q: '¿Puedo llegar tarde?', a: 'Hasta las 20:00 sin aviso. Más tarde avisanos porque no hay sereno nocturno.' },
      { q: '¿Late check-out?', a: 'Sí, hasta las 18:00 con 50% de recargo, sujeto a disponibilidad.' },
      { q: '¿Dónde dejo el equipaje si me voy tarde?', a: 'En administración, sin cargo, hasta tu partida.' },
      { q: '¿Horario de la pileta?', a: 'De 9:30 a 22:00 hs. Niños siempre acompañados por un adulto.' },
    ],
  },
  {
    id: 'servicios',
    label: 'Servicios',
    Icon: HiOutlineSquares2X2,
    questions: [
      { q: '¿Qué incluyen las cabañas?', a: 'Cocina equipada, ropa blanca, TV con cable, calefacción y baño privado.' },
      { q: '¿Tienen aire acondicionado?', a: 'Sí, con costo adicional. La calefacción está incluida.' },
      { q: '¿Incluye servicio de mucama?', a: 'No, así mantenemos precios competitivos.' },
      { q: '¿Tienen silla alta para bebé?', a: 'Sí, consultá disponibilidad al reservar.' },
      { q: '¿Hay Wi-Fi?', a: 'Sí, gratis en todo el predio.' },
      { q: '¿Hay cochera?', a: 'Sí, una cubierta por unidad.' },
    ],
  },
  {
    id: 'normas',
    label: 'Normas',
    Icon: HiOutlineClipboardDocumentList,
    questions: [
      { q: '¿Aceptan mascotas?', a: 'No, para garantizar la tranquilidad de todos los huéspedes.' },
      { q: '¿Se permiten visitas?', a: 'No, el complejo es de uso exclusivo para huéspedes.' },
      { q: '¿Hay límite de personas?', a: 'Sí, no podemos exceder la capacidad indicada (bebés incluidos).' },
      { q: '¿Seguro de viajero?', a: 'No es obligatorio, pero la provincia lo recomienda.' },
    ],
  },
  {
    id: 'ubicacion',
    label: 'Ubicación',
    Icon: HiOutlineMapPin,
    questions: [
      { q: '¿Están cerca del centro?', a: 'Sí, a 6 cuadras. El río y El Diquecito también están cerca.' },
      { q: '¿Hay supermercados?', a: 'Despensas a 100m, supermercado grande a 3 cuadras.' },
      { q: '¿Cómo llego en colectivo?', a: 'Terminal a 6 cuadras. Parada más cercana a 150m.' },
      { q: '¿A cuánto está Villa Carlos Paz?', a: 'A 10 minutos en auto.' },
    ],
  },
]

function QuestionItem({ q, a }: { q: string; a: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-sand last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 text-left group"
      >
        <span className="font-medium text-forest-dark group-hover:text-forest pr-4">{q}</span>
        <HiOutlineChevronDown
          className={`w-5 h-5 text-amber flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <div className={`overflow-hidden transition-all ${isOpen ? 'max-h-40 pb-4' : 'max-h-0'}`}>
        <p className="text-text-medium">{a}</p>
      </div>
    </div>
  )
}

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState(categories[0].id)
  const active = categories.find((c) => c.id === activeCategory)!

  return (
    <div className="min-h-screen bg-cream">
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
      <section className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-colors ${
                  activeCategory === cat.id
                    ? 'bg-forest-dark text-white'
                    : 'bg-white text-forest-dark border border-sand hover:border-forest'
                }`}
              >
                <cat.Icon className="w-4 h-4" />
                <span className="text-sm">{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Questions */}
          <div className="bg-white rounded-2xl border border-sand p-6">
            {active.questions.map((item, idx) => (
              <QuestionItem key={idx} q={item.q} a={item.a} />
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
