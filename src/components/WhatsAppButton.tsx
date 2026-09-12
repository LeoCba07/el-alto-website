'use client'

import { SiWhatsapp } from 'react-icons/si'
import { trackEvent } from '@/lib/analytics'
import { useWhatsAppNumber } from './WhatsAppNumber'

// Also sent by the hero widget when Consultar is pressed without dates.
export const DEFAULT_MESSAGE = '¡Hola! Quisiera consultar disponibilidad en Complejo El Alto.'

export interface WhatsAppButtonProps {
  /** Pre-filled message. Falls back to a generic availability enquiry. */
  message?: string
}

/**
 * Floating contact button. Guests in Córdoba arrange stays over WhatsApp, and
 * the green mark is the cue they look for, so this opens a real WhatsApp chat
 * rather than an on-site widget wearing the same icon.
 */
export default function WhatsAppButton({ message = DEFAULT_MESSAGE }: WhatsAppButtonProps) {
  const whatsappNumber = useWhatsAppNumber()
  const href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent('whatsapp_click', { source: 'floating' })}
      aria-label="Consultar por WhatsApp"
      // transform-gpu: own layer, so Chrome for iOS paints it on a first open
      // from another app (it was missing until reload).
      className="fixed bottom-4 right-4 md:right-6 z-50 transform-gpu w-14 h-14 rounded-full bg-[#25D366] shadow-xl ring-2 ring-white/50 flex items-center justify-center transition-transform duration-300 hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      <SiWhatsapp className="w-7 h-7 text-white" aria-hidden="true" />
    </a>
  )
}
