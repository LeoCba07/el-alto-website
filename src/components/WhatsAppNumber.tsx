'use client'

import { createContext, useContext, type ReactNode } from 'react'
import { SITE_CONFIG } from '@/lib/constants'

// The number every WhatsApp link on the site opens. The layout provides the
// one set in the Studio (Configuración del Sitio), so changing it there moves
// all of them at once; the constant is only the fallback.
const WhatsAppNumberContext = createContext<string>(SITE_CONFIG.WHATSAPP_NUMBER)

export function WhatsAppNumberProvider({ number, children }: { number?: string; children: ReactNode }) {
  return (
    <WhatsAppNumberContext.Provider value={number || SITE_CONFIG.WHATSAPP_NUMBER}>
      {children}
    </WhatsAppNumberContext.Provider>
  )
}

export function useWhatsAppNumber() {
  return useContext(WhatsAppNumberContext)
}
