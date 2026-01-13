// Shared types for site configuration from Sanity

export interface SiteConfig {
  numeroWhatsapp?: string
  email?: string
  telefonoMovil?: string
  horarios?: {
    checkIn?: string
    checkOut?: string
    lateCheckOut?: string
    lateCheckOutRecargo?: number
    llegadaMaxima?: string
    pileta?: {
      apertura?: string
      cierre?: string
    }
    recepcion?: {
      apertura?: string
      cierre?: string
    }
  }
  politicasReserva?: {
    senaPorcentaje?: number
    senaPorcentajeCorta?: number
    estadiaCortaMaxNoches?: number
    cancelacionAltaMedia?: {
      reembolsoTotalDias?: number
      reembolsoParcialDias?: number
    }
    cancelacionBaja?: {
      reembolsoTotalHoras?: number
    }
  }
  estadisticas?: {
    anosExperiencia?: number
    tripAdvisorRating?: number
    tripAdvisorMaxRating?: number
    cantidadResenas?: number
    rankingEnTanti?: number
  }
  redesSociales?: {
    facebook?: string
    instagram?: string
    youtube?: string
    tripadvisor?: string
  }
}

// Helper to get value with fallback
export function getConfigValue<T>(value: T | undefined, fallback: T): T {
  return value !== undefined ? value : fallback
}
