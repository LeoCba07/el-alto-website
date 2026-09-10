import Link from 'next/link'
import {
  HiOutlineChatBubbleLeftRight,
  HiOutlineChevronRight,
  HiOutlineClipboardDocumentList,
} from 'react-icons/hi2'
import { MdOutlinePool } from 'react-icons/md'
import { RESERVATION_POLICIES } from '@/lib/constants'

/**
 * Booking steps, cancellation policy and links onward. Repeated at the foot of
 * both /unidades and /precios: the two pages answer different questions, and
 * whichever one the reader is on is where they decide to book.
 */
export default function ComoReservar() {
  return (
  <section className="py-12 md:py-16 bg-cream border-t border-sand">
    <div className="max-w-6xl mx-auto px-4">
      <div className="grid lg:grid-cols-5 gap-6">
        {/* Left: Booking + Cancellation */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-sand p-6 md:p-8">
          {/* Booking Steps */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-forest-dark font-serif mb-2">
              Cómo reservar
            </h2>
            <p className="text-text-medium text-sm mb-5">
              Reservá tu estadía en 3 simples pasos
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <span className="w-8 h-8 bg-amber text-text-dark rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">1</span>
                <div className="pt-0.5">
                  <p className="font-semibold text-forest-dark">Consultá disponibilidad</p>
                  <p className="text-sm text-text-medium">Contactanos por WhatsApp o teléfono con tus fechas y cantidad de personas</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="w-8 h-8 bg-amber text-text-dark rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">2</span>
                <div className="pt-0.5">
                  <p className="font-semibold text-forest-dark">Confirmá con seña</p>
                  <p className="text-sm text-text-medium">{RESERVATION_POLICIES.depositPercent}% del total ({RESERVATION_POLICIES.depositPercentShortStay}% para estadías de {RESERVATION_POLICIES.shortStayMaxNights} noches o menos). {RESERVATION_POLICIES.paymentMethods.join(' o ')}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="w-8 h-8 bg-amber text-text-dark rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">3</span>
                <div className="pt-0.5">
                  <p className="font-semibold text-forest-dark">¡Listo para disfrutar!</p>
                  <p className="text-sm text-text-medium">El saldo restante lo abonás al momento del check-in</p>
                </div>
              </div>
            </div>
          </div>

          {/* Cancellation */}
          <div className="border-t border-sand pt-6">
            <h3 className="text-lg font-bold text-forest-dark font-serif mb-2">Política de cancelación</h3>
            <p className="text-text-medium text-sm mb-4">
              Cancelá sin cargo dentro de los siguientes plazos para recibir reembolso completo de tu seña
            </p>
            <div className="space-y-3">
              <div className="bg-cream rounded-xl px-4 py-3">
                <div className="flex items-center justify-between">
                  <span className="text-text-dark font-medium">Temporada Alta/Media</span>
                  <span className="text-forest-dark font-bold">30 días antes del check-in</span>
                </div>
                <p className="text-text-medium text-sm mt-1">Entre 15-29 días antes se cobra 1 noche</p>
              </div>
              <div className="flex items-center justify-between bg-cream rounded-xl px-4 py-3">
                <span className="text-text-dark font-medium">Temporada Baja</span>
                <span className="text-forest-dark font-bold">72 hs antes del check-in</span>
              </div>
              <div className="flex items-center justify-between bg-cream rounded-xl px-4 py-3">
                <span className="text-text-dark font-medium">Promociones</span>
                <span className="text-forest-dark font-bold">No reembolsable</span>
              </div>
            </div>
            <p className="text-text-light text-sm text-center mt-4">Una vez confirmada la reserva, no es posible modificar las fechas de estadía.</p>
          </div>
        </div>

        {/* Right: Links stacked */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <Link
            href="/servicios"
            className="group bg-white rounded-2xl border border-sand p-6 hover:border-forest hover:shadow-lg transition-all flex-1 flex items-center"
          >
            <div className="flex items-center gap-4 w-full">
              <div className="w-14 h-14 bg-forest/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-forest/20 transition-colors">
                <MdOutlinePool className="w-7 h-7 text-forest" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-forest-dark group-hover:text-forest transition-colors">
                  Servicios e instalaciones
                </h3>
                <p className="text-text-medium">Pileta, quincho, cochera y más</p>
              </div>
              <HiOutlineChevronRight className="w-6 h-6 text-forest/50 group-hover:text-forest group-hover:translate-x-1 transition-all" />
            </div>
          </Link>

          <Link
            href="/normas"
            className="group bg-white rounded-2xl border border-sand p-6 hover:border-forest hover:shadow-lg transition-all flex-1 flex items-center"
          >
            <div className="flex items-center gap-4 w-full">
              <div className="w-14 h-14 bg-forest/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-forest/20 transition-colors">
                <HiOutlineClipboardDocumentList className="w-7 h-7 text-forest" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-forest-dark group-hover:text-forest transition-colors">
                  Horarios y normas
                </h3>
                <p className="text-text-medium">Check-in, check-out y reglas</p>
              </div>
              <HiOutlineChevronRight className="w-6 h-6 text-forest/50 group-hover:text-forest group-hover:translate-x-1 transition-all" />
            </div>
          </Link>

          <Link
            href="/consultas-frecuentes"
            className="group bg-white rounded-2xl border border-sand p-6 hover:border-forest hover:shadow-lg transition-all flex-1 flex items-center"
          >
            <div className="flex items-center gap-4 w-full">
              <div className="w-14 h-14 bg-forest/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-forest/20 transition-colors">
                <HiOutlineChatBubbleLeftRight className="w-7 h-7 text-forest" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-forest-dark group-hover:text-forest transition-colors">
                  Preguntas frecuentes
                </h3>
                <p className="text-text-medium">Dudas comunes resueltas</p>
              </div>
              <HiOutlineChevronRight className="w-6 h-6 text-forest/50 group-hover:text-forest group-hover:translate-x-1 transition-all" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  </section>

  )
}
