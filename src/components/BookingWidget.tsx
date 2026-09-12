'use client'

import { useState, useSyncExternalStore, type MouseEvent } from 'react'
import { SiWhatsapp } from 'react-icons/si'
import { formatDateAR } from '@/lib/constants'
import { trackEvent } from '@/lib/analytics'
import { DEFAULT_MESSAGE as GENERIC_ENQUIRY } from './WhatsAppButton'
import { useWhatsAppNumber } from './WhatsAppNumber'

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

// The guest's local calendar date as YYYY-MM-DD. toISOString() is UTC, which
// in Argentina (UTC-3) turns 21:00 into tomorrow and blocks today's date.
function localISODate(date: Date) {
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

// The date never needs re-subscribing to; see `today` below.
const subscribeNever = () => () => {}

/**
 * Availability enquiry bar, on the homepage just below the hero. Collects the
 * three things every enquiry starts with and hands them to WhatsApp already
 * written out, so the guest sends a complete question instead of "hola, tienen
 * lugar?".
 */
export default function BookingWidget() {
  // Read in the browser only (empty on the server): the server's clock is UTC,
  // and a `min` rendered from it would stay in place after hydration.
  const today = useSyncExternalStore(subscribeNever, () => localISODate(new Date()), () => '')
  const whatsappNumber = useWhatsAppNumber()
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState(2)
  const [error, setError] = useState('')
  const [shaking, setShaking] = useState(false)

  // Check-out must land after check-in, so its picker starts the day after.
  const minCheckOut = checkIn
    ? (() => {
        const next = new Date(`${checkIn}T00:00:00`)
        next.setDate(next.getDate() + 1)
        return localISODate(next)
      })()
    : today

  // Some guests, often older ones, press Consultar without picking dates.
  // Rather than stop them, the enquiry goes out with whatever is there: no
  // dates sends the floating button's generic message, a single date goes in
  // as it is. Only dates that can't be right are stopped, since they would
  // reach the owner as a wrong enquiry. Those shake the card (skipped under
  // reduced motion); resetting first lets a repeated error shake again.
  const fail = (message: string) => {
    setError(message)
    setShaking(false)
    requestAnimationFrame(() => setShaking(true))
  }

  const handleSubmit = () => {
    if (checkIn && checkIn < today) {
      fail('La fecha de entrada no puede ser en el pasado')
      return
    }
    if (checkIn && checkOut && checkOut <= checkIn) {
      fail('La salida tiene que ser posterior a la entrada')
      return
    }
    setError('')

    const dates = [
      checkIn && `Entrada: ${formatDateAR(checkIn)}`,
      checkOut && `Salida: ${formatDateAR(checkOut)}`,
    ].filter(Boolean)
    const msg = dates.length
      ? `¡Hola! Quisiera consultar disponibilidad en El Alto:\n\n` +
        `${dates.join('\n')}\n` +
        `Personas: ${guests}\n\n` +
        `¡Gracias!`
      : GENERIC_ENQUIRY

    // fechas shows in GA4 how many enquiries skip the dates.
    trackEvent('whatsapp_click', {
      source: 'home_widget',
      fechas: dates.length === 2 ? 'ambas' : dates.length === 1 ? 'una' : 'ninguna',
    })
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`,
      '_blank',
      'noopener,noreferrer'
    )
  }

  // Phones fit all three fields in one row (down to 360px), so labels shrink
  // and track tighter and the date text drops to 13px there; a wider
  // "Personas" squeezed the dates until "Elegir fecha" clipped. Labels carry
  // no icons: the date inputs already draw their own calendar glyph, and two
  // per cell read as clutter.
  const cellClass = 'min-w-0 text-left px-2 sm:px-4 py-3'
  const labelClass =
    'block text-[0.65rem] sm:text-[0.6875rem] font-semibold uppercase tracking-[0.06em] sm:tracking-[0.1em] text-forest mb-0.5'
  const fieldBase =
    'min-w-0 w-full bg-transparent font-medium rounded-md px-1 py-0.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber'
  const inputClass = `${fieldBase} text-sm text-text-dark`
  // iOS Safari draws an empty date input as a blank box with no dd/mm/aaaa
  // hint, so the fields looked broken. While a date is empty and unfocused,
  // hide the browser's own mask (where it has one) and show a single hint
  // everywhere; focusing brings the mask back for typing on desktop.
  const dateClass = (value: string) =>
    `peer ${fieldBase} text-[0.8125rem] sm:text-sm ${value ? 'text-text-dark' : 'text-transparent focus:text-text-dark'}`
  const dateHintClass =
    'pointer-events-none absolute inset-y-0 left-1 flex items-center text-[0.8125rem] sm:text-sm font-medium text-text-light peer-focus:hidden'

  return (
    <div className="mx-auto w-full max-w-2xl">
      {/* Solid cream: at 90% with a blur the photo tinted it a little
          differently on every slide, which read as grey rather than glass. */}
      <div
        className={`rounded-2xl bg-cream shadow-2xl ring-1 ring-text-dark/10 overflow-hidden ${shaking ? 'motion-safe:animate-shake' : ''}`}
        onAnimationEnd={() => setShaking(false)}
      >
        {/* Phones: Entrada, Salida and Personas share the first row and
            Consultar spans the second. From sm up it is all one row. */}
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] sm:grid-cols-[1fr_1fr_auto_auto]">
          <div className={cellClass}>
            <label className={labelClass} htmlFor="consulta-checkin">
              Entrada
            </label>
            <div className="relative">
              <input
                id="consulta-checkin"
                type="date"
                value={checkIn}
                min={today || undefined}
                onChange={(e) => setCheckIn(e.target.value)}
                onClick={openPicker}
                className={dateClass(checkIn)}
              />
              {!checkIn && <span aria-hidden="true" className={dateHintClass}>Elegir fecha</span>}
            </div>
          </div>

          <div className={`${cellClass} border-l border-sand`}>
            <label className={labelClass} htmlFor="consulta-checkout">
              Salida
            </label>
            <div className="relative">
              <input
                id="consulta-checkout"
                type="date"
                value={checkOut}
                min={minCheckOut || undefined}
                onChange={(e) => setCheckOut(e.target.value)}
                onClick={openPicker}
                className={dateClass(checkOut)}
              />
              {!checkOut && <span aria-hidden="true" className={dateHintClass}>Elegir fecha</span>}
            </div>
          </div>

          <div className={`${cellClass} border-l border-sand`}>
            <label className={labelClass} htmlFor="consulta-guests">
              Personas
            </label>
            <select
              id="consulta-guests"
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className={`${inputClass} sm:w-16`}
            >
              {Array.from({ length: MAX_GUESTS }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>

          <div className="col-span-3 sm:col-span-1 border-t sm:border-t-0 border-sand p-2 sm:p-2.5 flex">
            {/* Brand forest rather than WhatsApp green: white on #25D366 is
                about 2:1. The green stays on the glyph, which is the cue. */}
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-forest-dark px-5 text-white font-semibold text-sm py-3 sm:py-0 shadow-sm transition-all hover:bg-forest hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber"
            >
              <SiWhatsapp className="w-4 h-4 text-[#25D366]" aria-hidden="true" />
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
