'use client'

import { useState, type MouseEvent } from 'react'
import { SiWhatsapp } from 'react-icons/si'
import { SITE_CONFIG, formatDateAR } from '@/lib/constants'
import { trackEvent } from '@/lib/analytics'

const MAX_GUESTS = 6

// A native date input only opens its picker from the calendar glyph; clicking
// the digits drops into typing mode, which reads as "type the date by hand".
// showPicker() needs a user gesture and throws where unsupported, hence the try.
function openPicker(e: MouseEvent<HTMLInputElement>) {
  try {
    e.currentTarget.showPicker()
  } catch {
    // Older browsers keep the default behaviour.
  }
}

/**
 * Availability enquiry bar for the hero. Collects the three things every
 * enquiry starts with and hands them to WhatsApp already written out, so the
 * guest sends a complete question instead of "hola, tienen lugar?".
 */
export default function HeroBookingWidget() {
  const today = new Date().toISOString().split('T')[0]
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState(2)
  const [error, setError] = useState('')
  const [shaking, setShaking] = useState(false)

  // Check-out must land after check-in, so its picker starts the day after.
  const minCheckOut = checkIn
    ? new Date(new Date(checkIn).getTime() + 86400000).toISOString().split('T')[0]
    : today

  // Some guests keep pressing Consultar expecting WhatsApp to open and miss
  // the message. Every failed press shakes the card (skipped under reduced
  // motion); resetting first lets a repeated error shake again.
  const fail = (message: string) => {
    setError(message)
    setShaking(false)
    requestAnimationFrame(() => setShaking(true))
  }

  const handleSubmit = () => {
    if (!checkIn || !checkOut) {
      fail('Elegí las fechas de entrada y salida')
      return
    }
    if (checkIn < today) {
      fail('La fecha de entrada no puede ser en el pasado')
      return
    }
    if (checkOut <= checkIn) {
      fail('La salida tiene que ser posterior a la entrada')
      return
    }
    setError('')

    const msg =
      `¡Hola! Quisiera consultar disponibilidad en El Alto:\n\n` +
      `Entrada: ${formatDateAR(checkIn)}\n` +
      `Salida: ${formatDateAR(checkOut)}\n` +
      `Personas: ${guests}\n\n` +
      `¡Gracias!`

    trackEvent('whatsapp_click', { source: 'hero_widget' })
    window.open(
      `https://wa.me/${SITE_CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,
      '_blank',
      'noopener,noreferrer'
    )
  }

  const labelClass =
    'block text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-forest mb-0.5'
  const fieldBase =
    'w-full bg-transparent text-sm font-medium rounded-md px-1 py-0.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber'
  const inputClass = `${fieldBase} text-text-dark`
  // iOS Safari draws an empty date input as a blank box with no dd/mm/aaaa
  // hint, so the fields looked broken. While a date is empty and unfocused,
  // hide the browser's own mask (where it has one) and show a single hint
  // everywhere; focusing brings the mask back for typing on desktop.
  const dateClass = (value: string) =>
    `peer ${fieldBase} ${value ? 'text-text-dark' : 'text-transparent focus:text-text-dark'}`
  const dateHintClass =
    'pointer-events-none absolute inset-y-0 left-1 flex items-center text-sm font-medium text-text-light peer-focus:hidden'

  return (
    <div className="mx-auto w-full max-w-2xl">
      {/* 90%: a touch lighter than the original 95%. 80% read as too see-through,
          though contrast held (labels 5.6:1 over pure black); at 70% it fails AA. */}
      <div
        className={`rounded-2xl bg-cream/90 shadow-2xl ring-1 ring-text-dark/10 backdrop-blur-md overflow-hidden ${shaking ? 'motion-safe:animate-shake' : ''}`}
        onAnimationEnd={() => setShaking(false)}
      >
        <div className="grid grid-cols-2 sm:grid-cols-[1fr_1fr_auto_auto]">
          <div className="text-left px-4 py-3">
            <label className={labelClass} htmlFor="hero-checkin">Entrada</label>
            <div className="relative">
              <input
                id="hero-checkin"
                type="date"
                value={checkIn}
                min={today}
                onChange={(e) => setCheckIn(e.target.value)}
                onClick={openPicker}
                className={dateClass(checkIn)}
              />
              {!checkIn && <span aria-hidden="true" className={dateHintClass}>Elegir fecha</span>}
            </div>
          </div>

          <div className="text-left px-4 py-3 border-l border-sand">
            <label className={labelClass} htmlFor="hero-checkout">Salida</label>
            <div className="relative">
              <input
                id="hero-checkout"
                type="date"
                value={checkOut}
                min={minCheckOut}
                onChange={(e) => setCheckOut(e.target.value)}
                onClick={openPicker}
                className={dateClass(checkOut)}
              />
              {!checkOut && <span aria-hidden="true" className={dateHintClass}>Elegir fecha</span>}
            </div>
          </div>

          <div className="text-left px-4 py-3 border-t sm:border-t-0 sm:border-l border-sand">
            <label className={labelClass} htmlFor="hero-guests">Personas</label>
            <select
              id="hero-guests"
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className={`${inputClass} sm:w-16`}
            >
              {Array.from({ length: MAX_GUESTS }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>

          <div className="border-t sm:border-t-0 border-sand p-2 sm:p-2.5 flex">
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 text-white font-semibold text-sm py-2.5 sm:py-0 shadow-sm transition-all hover:bg-[#1eb257] hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <SiWhatsapp className="w-4 h-4" aria-hidden="true" />
              Consultar
            </button>
          </div>
        </div>
      </div>

      {error && (
        <p role="alert" className="mt-2 text-sm font-medium text-white [text-shadow:_0_1px_4px_rgb(0_0_0_/_80%)]">
          {error}
        </p>
      )}
    </div>
  )
}
