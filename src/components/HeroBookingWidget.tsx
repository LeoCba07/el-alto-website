'use client'

import { useState } from 'react'
import { SiWhatsapp } from 'react-icons/si'
import { SITE_CONFIG, formatDateAR } from '@/lib/constants'
import { trackEvent } from '@/lib/analytics'

const MAX_GUESTS = 6

/**
 * Availability enquiry bar for the hero. Collects the three things every
 * enquiry starts with and hands them to WhatsApp already written out, so the
 * guest sends a complete message instead of "hola, tienen lugar?".
 */
export default function HeroBookingWidget() {
  const today = new Date().toISOString().split('T')[0]
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState(2)
  const [error, setError] = useState('')

  // Check-out must land after check-in, so the picker starts the day after.
  const minCheckOut = checkIn
    ? new Date(new Date(checkIn).getTime() + 86400000).toISOString().split('T')[0]
    : today

  const handleSubmit = () => {
    if (!checkIn || !checkOut) {
      setError('Elegí las fechas de entrada y salida')
      return
    }
    if (checkIn < today) {
      setError('La fecha de entrada no puede ser en el pasado')
      return
    }
    if (checkOut <= checkIn) {
      setError('La salida tiene que ser posterior a la entrada')
      return
    }
    setError('')

    const msg =
      `¡Hola!\n\nQuisiera consultar disponibilidad en El Alto:\n\n` +
      `Entrada: ${formatDateAR(checkIn)}\n` +
      `Salida: ${formatDateAR(checkOut)}\n` +
      `Personas: ${guests}\n\n` +
      `¿Tienen disponibilidad? ¡Gracias!`

    trackEvent('whatsapp_click', { source: 'hero_widget' })
    window.open(
      `https://wa.me/${SITE_CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,
      '_blank',
      'noopener,noreferrer'
    )
  }

  const fieldClass =
    'w-full rounded-xl border border-white/30 bg-white/95 px-2.5 py-2 text-text-dark text-sm focus:outline-none focus:ring-2 focus:ring-amber'

  return (
    <div className="mx-auto w-full max-w-3xl rounded-2xl bg-black/45 backdrop-blur-md p-3 sm:p-4 border border-white/20 shadow-xl">
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-[1fr_1fr_auto_auto] sm:gap-3">
        <label className="text-left">
          <span className="block text-xs font-medium text-white/90 mb-1">Entrada</span>
          <input
            type="date"
            value={checkIn}
            min={today}
            onChange={(e) => setCheckIn(e.target.value)}
            className={fieldClass}
          />
        </label>

        <label className="text-left">
          <span className="block text-xs font-medium text-white/90 mb-1">Salida</span>
          <input
            type="date"
            value={checkOut}
            min={minCheckOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className={fieldClass}
          />
        </label>

        <label className="text-left">
          <span className="block text-xs font-medium text-white/90 mb-1">Personas</span>
          <select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className={`${fieldClass} sm:w-20`}
          >
            {Array.from({ length: MAX_GUESTS }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>

        <button
          type="button"
          onClick={handleSubmit}
          className="mt-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-2.5 font-semibold text-white text-sm transition-transform hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <SiWhatsapp className="w-4 h-4" aria-hidden="true" />
          Consultar
        </button>
      </div>

      {error && (
        <p role="alert" className="mt-2 text-left text-sm text-amber-light">
          {error}
        </p>
      )}
    </div>
  )
}
