// Site configuration constants
// These are fallback values - prefer Sanity data when available

export const SITE_CONFIG = {
  // Base URL for the site
  BASE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://complejoelalto.com.ar',

  // Contact information (fallbacks for when Sanity is unavailable)
  WHATSAPP_NUMBER: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5493572501030',
  PHONE_FIXED: '+54 3541 498970',
  PHONE_MOBILE: '+54 9 3572 501030',
  EMAIL: 'info@complejoelalto.com.ar',

  // Address
  ADDRESS: {
    street: 'Ruta Provincial N°28 y San Martín 1130',
    city: 'Tanti',
    province: 'Córdoba',
    postalCode: '5155',
    country: 'AR',
  },

  // Coordinates
  GEO: {
    latitude: -31.3607,
    longitude: -64.5876,
  },

  // Social media
  SOCIAL: {
    instagram: 'https://instagram.com/complejoelalto',
    facebook: 'https://facebook.com/complejoelalto',
    tripadvisor: 'https://www.tripadvisor.com.ar/Hotel_Review-g1122037-d3439400-Reviews-Complejo_El_Alto-Tanti_Province_of_Cordoba_Central_Argentina.html',
  },
} as const

// Business hours (fallbacks - prefer Sanity configuracionSitio when available)
export const BUSINESS_HOURS = {
  checkIn: '13:30',
  checkOut: '10:00',
  lateCheckOut: '18:00',
  lateCheckOutFee: 50, // percentage
  poolOpen: '9:30',
  poolClose: '22:00',
  receptionOpen: '9:00',
  receptionClose: '19:00',
  latestArrival: '20:00',
} as const

// Reservation policies (single source of truth)
export const RESERVATION_POLICIES = {
  // Deposit/Seña
  depositPercent: 30,
  depositPercentShortStay: 50,
  shortStayMaxNights: 2,

  // Cancellation - High/Mid season
  cancellationHighMid: {
    fullRefundDays: 30,
    partialRefundDays: 15, // 15-29 days = 1 night charge
    noRefundDays: 14,
  },

  // Cancellation - Low season
  cancellationLow: {
    fullRefundHours: 72,
  },

  // Payment methods
  paymentMethods: ['Transferencia bancaria', 'Mercado Pago'],
} as const

// Optional services pricing (fallbacks)
export const OPTIONAL_SERVICES = {
  acPricePerDay: '$2.500/día',
} as const

// Trust signals / stats
export const TRUST_STATS = {
  yearsExperience: 28,
  tripAdvisorRating: 4.6,
  tripAdvisorMaxRating: 5,
  reviewCount: 150,
  rankingInTanti: 1,
} as const

// Cache configuration
export const CACHE_CONFIG = {
  // Revalidation time in seconds for Sanity data
  SANITY_REVALIDATE: 60,
} as const

// Animation timing
export const ANIMATION_TIMING = {
  // Delays in milliseconds
  chatBotTransition: 250,
  messageDelay: 500,
  trustSignalsInterval: 2100,

  // CSS animation delays in seconds
  heroFadeIn: {
    tagline: 0.2,
    title: 0.4,
    subtitle: 0.6,
    cta: 0.8,
  },
} as const

// Time constants
export const TIME_CONSTANTS = {
  MS_PER_DAY: 86400000,
} as const

// Date formatting for Argentina
export const formatDateAR = (dateStr: string): string => {
  const date = new Date(dateStr + 'T00:00:00')
  return date.toLocaleDateString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

// Format time string (remove " hs" suffix if present)
export const formatTimeDisplay = (time: string): string => {
  return time.replace(' hs', '').replace('hs', '')
}

// Tarifas are now managed exclusively in Sanity Studio
// See: src/sanity/schemaTypes/tarifaTemporada.ts
// To seed initial data: node scripts/seed-tarifas.mjs
