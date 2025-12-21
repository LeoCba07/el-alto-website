'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  HiXMark,
  HiOutlineCalendarDays,
  HiOutlineHomeModern,
  HiOutlineMapPin,
  HiOutlineClock,
  HiOutlineCreditCard,
  HiOutlineArrowPath,
  HiOutlineArrowTopRightOnSquare,
  HiOutlineSquares2X2,
  HiOutlineChatBubbleLeftRight
} from 'react-icons/hi2'
import { SiWhatsapp } from 'react-icons/si'
import { PiPawPrint } from 'react-icons/pi'
import { SITE_CONFIG, formatDateAR } from '@/lib/constants'

export interface ChatbotRespuesta {
  clave: string
  respuesta: string
  opcionesSeguimiento?: string[]
}

export interface ChatBotProps {
  respuestas?: ChatbotRespuesta[]
  whatsappNumber?: string
}

// Default FAQ Data - answers to common questions
const DEFAULT_FAQ_DATA: Record<string, { answer: string; followUp: string[] }> = {
  tarifas: {
    answer: 'Las tarifas varían según la temporada y el tipo de cabaña. Temporada alta (dic-feb, Semana Santa, vacaciones de invierno): desde $45.000/noche. Temporada media: desde $35.000/noche. Temporada baja: desde $28.000/noche.',
    followUp: ['ver_tarifas', 'consultar_disponibilidad', 'otra_pregunta']
  },
  disponibilidad: {
    answer: '¡Genial! Para consultar disponibilidad necesito algunos datos.',
    followUp: ['iniciar_consulta']
  },
  servicios: {
    answer: 'Todas las cabañas incluyen: Wi-Fi gratis, cochera cubierta, ropa de cama y toallas, cocina equipada, y acceso a pileta y quincho con asadores.',
    followUp: ['mas_servicios', 'consultar_disponibilidad', 'otra_pregunta']
  },
  mas_servicios: {
    answer: 'También contamos con: pileta al aire libre (climatizada en primavera/otoño), quincho con asadores para uso común, jardín con vistas a las sierras, y estamos a 500m del centro de Tanti.',
    followUp: ['consultar_disponibilidad', 'otra_pregunta']
  },
  ubicacion: {
    answer: 'Estamos en Ruta Provincial N°28 y San Martín 1130, Tanti, Córdoba. A solo 10 minutos de Villa Carlos Paz y 500m del centro de Tanti.',
    followUp: ['como_llegar', 'consultar_disponibilidad', 'otra_pregunta']
  },
  como_llegar: {
    answer: 'Desde Córdoba Capital: tomar Ruta 20 hacia Villa Carlos Paz, luego Ruta 28 hacia Tanti (10 min). Nuestra entrada está sobre la Ruta 28. ¿Necesitás el link de Google Maps?',
    followUp: ['ver_mapa', 'consultar_disponibilidad', 'otra_pregunta']
  },
  checkin: {
    answer: 'Check-in: desde las 13:30 hs (llegada máxima 20:00 hs). Check-out: hasta las 10:00 hs. Late check-out hasta 18:00 hs con 50% adicional.',
    followUp: ['consultar_disponibilidad', 'otra_pregunta']
  },
  cabanas: {
    answer: 'Tenemos 12 cabañas de 4 tipos: Dúplex (hasta 6 personas), Estándar (2-4 personas), Compactas (2-3 personas) y Parejas (2 personas). Todas equipadas con cocina, baño privado y calefacción.',
    followUp: ['ver_cabanas', 'consultar_disponibilidad', 'otra_pregunta']
  },
  mascotas: {
    answer: 'Lo sentimos, no aceptamos mascotas en el complejo para mantener la tranquilidad de todos los huéspedes.',
    followUp: ['consultar_disponibilidad', 'otra_pregunta']
  },
  pago: {
    answer: 'Para reservar se requiere una seña del 30% (50% para estadías de 2 noches o menos). Aceptamos transferencia bancaria y Mercado Pago.',
    followUp: ['consultar_disponibilidad', 'otra_pregunta']
  },
}

// Main menu options - shown after each answer
const MAIN_MENU_OPTIONS = ['disponibilidad', 'cabanas', 'tarifas', 'servicios', 'ubicacion', 'checkin', 'pago', 'mascotas']

// Quick reply button options with icons (matching site-wide icon usage)
const QUICK_REPLIES: Record<string, { label: string; icon?: React.ComponentType<{ className?: string }> }> = {
  tarifas: { label: 'Tarifas', icon: HiOutlineCreditCard },
  disponibilidad: { label: 'Disponibilidad', icon: HiOutlineCalendarDays },
  servicios: { label: 'Servicios', icon: HiOutlineSquares2X2 },
  ubicacion: { label: 'Ubicación', icon: HiOutlineMapPin },
  cabanas: { label: 'Cabañas', icon: HiOutlineHomeModern },
  checkin: { label: 'Horarios', icon: HiOutlineClock },
  mascotas: { label: 'Mascotas', icon: PiPawPrint },
  pago: { label: 'Formas de pago', icon: HiOutlineCreditCard },
  consultar_disponibilidad: { label: 'Consultar disponibilidad', icon: HiOutlineCalendarDays },
  ver_tarifas: { label: 'Ver tarifas', icon: HiOutlineArrowTopRightOnSquare },
  ver_cabanas: { label: 'Ver cabañas', icon: HiOutlineArrowTopRightOnSquare },
  mas_servicios: { label: 'Más servicios', icon: HiOutlineSquares2X2 },
  como_llegar: { label: 'Cómo llegar', icon: HiOutlineMapPin },
  ver_mapa: { label: 'Ver en Google Maps', icon: HiOutlineArrowTopRightOnSquare },
  iniciar_consulta: { label: 'Continuar' },
  enviar_whatsapp: { label: 'Enviar por WhatsApp', icon: SiWhatsapp },
  volver_inicio: { label: 'Volver al inicio', icon: HiOutlineArrowPath },
}

type Message = {
  id: number
  type: 'bot' | 'user'
  text: string
  options?: string[]
  isInput?: 'dates' | 'guests'
}

type BookingData = {
  checkIn: string
  checkOut: string
  adults: number
  children: number
  childrenAges: number[]
}

export default function ChatBot({ respuestas, whatsappNumber }: ChatBotProps) {
  const router = useRouter()
  const [animationStage, setAnimationStage] = useState<'closed' | 'bar' | 'open'>('closed')
  const [messages, setMessages] = useState<Message[]>([])
  const [bookingData, setBookingData] = useState<BookingData>({
    checkIn: '',
    checkOut: '',
    adults: 2,
    children: 0,
    childrenAges: [],
  })
  const [currentStep, setCurrentStep] = useState<'initial' | 'dates' | 'guests' | 'confirm'>('initial')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const lastMessageRef = useRef<HTMLDivElement>(null)
  const [showPulse, setShowPulse] = useState(true)

  // Build FAQ data from Sanity or use defaults
  const FAQ_DATA = React.useMemo(() => {
    if (!respuestas?.length) return DEFAULT_FAQ_DATA

    const sanityData: Record<string, { answer: string; followUp: string[] }> = {}
    respuestas.forEach((r) => {
      sanityData[r.clave] = {
        answer: r.respuesta,
        followUp: r.opcionesSeguimiento || ['consultar_disponibilidad', 'otra_pregunta']
      }
    })
    // Merge with defaults for any missing keys
    return { ...DEFAULT_FAQ_DATA, ...sanityData }
  }, [respuestas])

  const WHATSAPP_NUMBER = whatsappNumber || SITE_CONFIG.WHATSAPP_NUMBER

  const isOpen = animationStage === 'open'

  // Handle opening animation: closed → bar → open
  const handleOpen = () => {
    setShowPulse(false)
    setAnimationStage('bar')
    setTimeout(() => {
      setAnimationStage('open')
      // Initialize welcome message when opening for first time
      if (messages.length === 0) {
        setMessages([
          {
            id: 1,
            type: 'bot',
            text: 'Bienvenido al Complejo de Cabañas El Alto. ¿En qué podemos ayudarte?',
            options: MAIN_MENU_OPTIONS,
          },
        ])
      }
    }, 250)
  }

  // Handle closing animation: open → bar → closed
  const handleClose = () => {
    setAnimationStage('bar')
    setTimeout(() => setAnimationStage('closed'), 250)
  }

  // Auto-scroll to show the start of the last message (not the bottom)
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [messages])

  const addMessage = (message: Omit<Message, 'id'>) => {
    setMessages((prev) => [...prev, { ...message, id: Date.now() }])
  }

  const handleOptionClick = (option: string) => {
    // Add user's selection as a message
    addMessage({ type: 'user', text: QUICK_REPLIES[option]?.label || option })

    // Handle special actions
    if (option === 'ver_tarifas') {
      router.push('/cabanas#tarifas')
      return
    }
    if (option === 'ver_cabanas') {
      router.push('/cabanas')
      return
    }
    if (option === 'ver_mapa') {
      window.open('https://www.google.com/maps/dir/?api=1&destination=-31.3607,-64.5876', '_blank')
      return
    }
    if (option === 'volver_inicio') {
      setTimeout(() => {
        addMessage({
          type: 'bot',
          text: '¿Qué más te gustaría saber?',
          options: MAIN_MENU_OPTIONS,
        })
      }, 500)
      return
    }
    if (option === 'consultar_disponibilidad' || option === 'disponibilidad' || option === 'iniciar_consulta') {
      setCurrentStep('dates')
      setTimeout(() => {
        addMessage({
          type: 'bot',
          text: '¿Para qué fechas querés consultar?',
          isInput: 'dates',
        })
      }, 500)
      return
    }
    if (option === 'enviar_whatsapp') {
      sendToWhatsApp()
      return
    }

    // Handle FAQ responses
    const faqItem = FAQ_DATA[option as keyof typeof FAQ_DATA]
    if (faqItem) {
      setTimeout(() => {
        // Show answer + follow-up in a single message so the answer stays visible
        addMessage({
          type: 'bot',
          text: faqItem.answer + '\n\n¿Hay algo más en lo que pueda ayudarte?',
          options: MAIN_MENU_OPTIONS,
        })
      }, 500)
    }
  }

  const handleDatesSubmit = () => {
    if (!bookingData.checkIn || !bookingData.checkOut) return

    // Validate: check-in must be today or later
    if (bookingData.checkIn < today) {
      addMessage({
        type: 'bot',
        text: 'La fecha de entrada no puede ser en el pasado. Por favor, seleccioná una fecha válida.',
        isInput: 'dates',
      })
      setBookingData({ ...bookingData, checkIn: '', checkOut: '' })
      return
    }

    // Validate: check-out must be after check-in
    if (bookingData.checkOut <= bookingData.checkIn) {
      addMessage({
        type: 'bot',
        text: 'La fecha de salida debe ser posterior a la de entrada.',
        isInput: 'dates',
      })
      setBookingData({ ...bookingData, checkOut: '' })
      return
    }

    addMessage({
      type: 'user',
      text: `${formatDateAR(bookingData.checkIn)} → ${formatDateAR(bookingData.checkOut)}`,
    })

    setCurrentStep('guests')
    setTimeout(() => {
      addMessage({
        type: 'bot',
        text: '¿Cuántas personas?',
        isInput: 'guests',
      })
    }, 500)
  }

  const handleGuestsSubmit = () => {
    const guestText = `${bookingData.adults} ${bookingData.adults === 1 ? 'adulto' : 'adultos'}${
      bookingData.children > 0 ? `, ${bookingData.children} ${bookingData.children === 1 ? 'menor' : 'menores'}` : ''
    }`

    addMessage({ type: 'user', text: guestText })

    setCurrentStep('confirm')
    setTimeout(() => {
      addMessage({
        type: 'bot',
        text: '¡Perfecto! Tengo todos los datos. Te conecto con WhatsApp para confirmar disponibilidad. Horario de atención: 9 a 19 hs.',
        options: ['enviar_whatsapp', 'volver_inicio'],
      })
    }, 500)
  }

  const sendToWhatsApp = () => {
    let msg = `¡Hola! 👋\n\nMe interesa reservar en El Alto 🏡\n\n`
    msg += `📅 Entrada: ${formatDateAR(bookingData.checkIn)}\n`
    msg += `📅 Salida: ${formatDateAR(bookingData.checkOut)}\n`
    msg += `👥 Adultos: ${bookingData.adults}\n`

    if (bookingData.children > 0) {
      msg += `👶 Menores: ${bookingData.children}\n`
    }

    msg += `\n¿Tienen disponibilidad? ¡Gracias!`

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`
    window.open(whatsappUrl, '_blank')
  }

  const today = new Date().toISOString().split('T')[0]
  const minCheckOut = bookingData.checkIn
    ? new Date(new Date(bookingData.checkIn).getTime() + 86400000).toISOString().split('T')[0]
    : today

  // Handle check-in change and validate checkout
  const handleCheckInChange = (newCheckIn: string) => {
    // If checkout is now invalid (before or equal to new check-in), clear it
    if (bookingData.checkOut && bookingData.checkOut <= newCheckIn) {
      setBookingData({ ...bookingData, checkIn: newCheckIn, checkOut: '' })
    } else {
      setBookingData({ ...bookingData, checkIn: newCheckIn })
    }
  }

  // Get dimensions based on animation stage
  const getDimensions = () => {
    switch (animationStage) {
      case 'closed':
        return 'w-14 h-14 rounded-full'
      case 'bar':
        return 'w-[calc(100vw-2rem)] md:w-96 h-14 rounded-full'
      case 'open':
        return 'w-[calc(100vw-2rem)] md:w-96 h-[min(28rem,calc(100vh-6rem))] rounded-2xl'
    }
  }

  return (
    <div
      className={`fixed bottom-4 right-4 md:right-6 z-50 transition-all duration-300 ease-in-out shadow-xl ${getDimensions()}`}
      style={{
        background: animationStage === 'closed' ? 'var(--color-forest)' : 'white'
      }}
    >
      {/* Closed state - Chat help button */}
      <button
        onClick={() => animationStage === 'closed' && handleOpen()}
        aria-label="Abrir chat de consultas"
        aria-expanded={isOpen}
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-100 cursor-pointer ${
          animationStage === 'closed' ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <HiOutlineChatBubbleLeftRight className="w-7 h-7 text-white" />
        {showPulse && (
          <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-amber rounded-full border-2 border-forest animate-pulse" />
        )}
      </button>

      {/* Open state - Chat window */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Chat de consultas - Complejo El Alto"
        className={`absolute inset-0 flex flex-col overflow-hidden rounded-2xl border border-sand transition-opacity duration-100 ${
          animationStage === 'open' ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="bg-forest-dark text-white p-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
              <SiWhatsapp className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-sm">Complejo de Cabañas El Alto</p>
              <p className="text-xs text-white/60">Tanti, Córdoba</p>
            </div>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); handleClose() }}
            aria-label="Cerrar chat"
            className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
          >
            <HiXMark className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-cream">
          {messages.map((message, index) => (
            <div
              key={message.id}
              ref={index === messages.length - 1 ? lastMessageRef : null}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] ${
                  message.type === 'user'
                    ? 'bg-forest text-white rounded-2xl rounded-br-sm px-4 py-2.5'
                    : 'space-y-3'
                }`}
              >
                {message.type === 'bot' && (
                  <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-2.5 shadow-sm border border-sand">
                    <p className="text-text-dark text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                  </div>
                )}
                {message.type === 'user' && <p className="text-sm">{message.text}</p>}

                {/* Quick Reply Options */}
                {message.options && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {message.options.map((option) => {
                      const Icon = QUICK_REPLIES[option]?.icon
                      return (
                        <button
                          key={option}
                          onClick={() => handleOptionClick(option)}
                          className="bg-white text-forest-dark text-sm px-3 py-1.5 rounded-full border border-sand hover:border-forest hover:bg-forest hover:text-white transition-colors flex items-center gap-1.5"
                        >
                          {Icon && <Icon className="w-4 h-4" />}
                          {QUICK_REPLIES[option]?.label || option}
                        </button>
                      )
                    })}
                  </div>
                )}

                {/* Date Input */}
                {message.isInput === 'dates' && currentStep === 'dates' && (
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-sand space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-text-medium mb-1 block">Entrada</label>
                        <input
                          type="date"
                          min={today}
                          value={bookingData.checkIn}
                          onChange={(e) => handleCheckInChange(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-sand text-sm focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-text-medium mb-1 block">Salida</label>
                        <input
                          type="date"
                          min={minCheckOut}
                          value={bookingData.checkOut}
                          onChange={(e) => setBookingData({ ...bookingData, checkOut: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border border-sand text-sm focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest"
                        />
                      </div>
                    </div>
                    <button
                      onClick={handleDatesSubmit}
                      disabled={!bookingData.checkIn || !bookingData.checkOut}
                      className="w-full bg-forest text-white py-2.5 rounded-lg font-medium text-sm hover:bg-forest-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Continuar
                    </button>
                  </div>
                )}

                {/* Guests Input */}
                {message.isInput === 'guests' && currentStep === 'guests' && (
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-sand space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-text-medium mb-1 block">Adultos</label>
                        <select
                          value={bookingData.adults}
                          onChange={(e) => setBookingData({ ...bookingData, adults: Number(e.target.value) })}
                          className="w-full px-3 py-2 rounded-lg border border-sand text-sm focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest"
                        >
                          {[1, 2, 3, 4, 5, 6].map((n) => (
                            <option key={n} value={n}>{n}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs text-text-medium mb-1 block">Menores</label>
                        <select
                          value={bookingData.children}
                          onChange={(e) => setBookingData({ ...bookingData, children: Number(e.target.value) })}
                          className="w-full px-3 py-2 rounded-lg border border-sand text-sm focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest"
                        >
                          {[0, 1, 2, 3, 4].map((n) => (
                            <option key={n} value={n}>{n}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <button
                      onClick={handleGuestsSubmit}
                      className="w-full bg-forest text-white py-2.5 rounded-lg font-medium text-sm hover:bg-forest-dark transition-colors"
                    >
                      Continuar
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-white border-t border-sand flex-shrink-0">
          <p className="text-xs text-text-light text-center">
            Respuestas automáticas · Reservas por WhatsApp
          </p>
        </div>
      </div>
    </div>
  )
}
