'use client'

import { SiWhatsapp } from 'react-icons/si'
import { SITE_CONFIG } from '@/lib/constants'

const DEFAULT_MESSAGE = '¡Hola! Quisiera consultar disponibilidad en Complejo El Alto.'

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
  const href = `https://wa.me/${SITE_CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Consultar por WhatsApp"
      className="fixed bottom-4 right-4 md:right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] shadow-xl ring-2 ring-white/50 flex items-center justify-center transition-transform duration-300 hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      <SiWhatsapp className="w-7 h-7 text-white" aria-hidden="true" />
    </a>
  )
}
