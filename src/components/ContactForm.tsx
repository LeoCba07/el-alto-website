'use client'

import { useState } from 'react'
import Button from './Button'
import { SiWhatsapp } from 'react-icons/si'
import {
  HiOutlineUser,
  HiOutlineCalendarDays,
  HiOutlineUserGroup,
  HiOutlineChatBubbleBottomCenterText
} from 'react-icons/hi2'
import { SITE_CONFIG, formatDateAR } from '@/lib/constants'

export default function ContactForm() {
  const [nombre, setNombre] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)
  const [childrenAges, setChildrenAges] = useState<number[]>([])
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChildrenChange = (count: number) => {
    setChildren(count)
    // Adjust ages array
    if (count > childrenAges.length) {
      setChildrenAges([...childrenAges, ...Array(count - childrenAges.length).fill(0)])
    } else {
      setChildrenAges(childrenAges.slice(0, count))
    }
  }

  const handleChildAgeChange = (index: number, age: number) => {
    const newAges = [...childrenAges]
    newAges[index] = age
    setChildrenAges(newAges)
  }

  const formatDate = (dateStr: string) => {
    if (!dateStr) return ''
    return formatDateAR(dateStr)
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!nombre.trim()) {
      newErrors.nombre = 'Ingresa tu nombre'
    }
    if (!checkIn) {
      newErrors.checkIn = 'Selecciona la fecha de entrada'
    }
    if (!checkOut) {
      newErrors.checkOut = 'Selecciona la fecha de salida'
    }
    if (checkIn && checkOut && new Date(checkIn) >= new Date(checkOut)) {
      newErrors.checkOut = 'La fecha de salida debe ser posterior a la entrada'
    }
    if (adults < 1) {
      newErrors.adults = 'Debe haber al menos 1 adulto'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const generateWhatsAppMessage = () => {
    let msg = `¡Hola! 👋 Soy ${nombre.trim()}\n\nMe interesa reservar en El Alto 🏡\n\n`
    msg += `📅 Entrada: ${formatDate(checkIn)}\n`
    msg += `📅 Salida: ${formatDate(checkOut)}\n`
    msg += `👥 Adultos: ${adults}\n`

    if (children > 0) {
      const agesText = childrenAges
        .map((age) => `${age} ${age === 1 ? 'año' : 'años'}`)
        .join(', ')
      msg += `👶 Menores: ${children} (${agesText})\n`
    }

    if (message.trim()) {
      msg += `\n💬 ${message.trim()}`
    }

    msg += `\n\n¿Tienen disponibilidad? ¡Gracias!`

    return encodeURIComponent(msg)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    const whatsappUrl = `https://wa.me/${SITE_CONFIG.WHATSAPP_NUMBER}?text=${generateWhatsAppMessage()}`
    window.open(whatsappUrl, '_blank')
  }

  // Get today's date in YYYY-MM-DD format for min date
  const today = new Date().toISOString().split('T')[0]
  // Get min checkout date (day after check-in)
  const minCheckOut = checkIn
    ? new Date(new Date(checkIn).getTime() + 86400000).toISOString().split('T')[0]
    : today

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div>
        <label
          htmlFor="nombre"
          className="flex items-center gap-2 text-sm font-medium text-forest-dark mb-2"
        >
          <HiOutlineUser className="w-4 h-4 text-amber" />
          Nombre
        </label>
        <input
          type="text"
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Tu nombre"
          className={`w-full px-4 py-3 rounded-xl border-2 ${
            errors.nombre ? 'border-red-400' : 'border-sand hover:border-stone-light'
          } bg-white focus:outline-none focus:ring-2 focus:ring-amber/30 focus:border-amber transition-colors`}
        />
        {errors.nombre && (
          <p role="alert" className="mt-1.5 text-sm text-red-500">{errors.nombre}</p>
        )}
      </div>

      {/* Dates */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-forest-dark mb-2">
          <HiOutlineCalendarDays className="w-4 h-4 text-amber" />
          Fechas
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <input
              type="date"
              id="checkIn"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              min={today}
              className={`w-full px-4 py-3 rounded-xl border-2 ${
                errors.checkIn ? 'border-red-400' : 'border-sand hover:border-stone-light'
              } bg-white focus:outline-none focus:ring-2 focus:ring-amber/30 focus:border-amber transition-colors`}
            />
            {errors.checkIn && (
              <p role="alert" className="mt-1.5 text-sm text-red-500">{errors.checkIn}</p>
            )}
            <p className="mt-1.5 text-xs text-text-light">
              Entrada · desde 13:30 hs
            </p>
          </div>

          <div>
            <input
              type="date"
              id="checkOut"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              min={minCheckOut}
              className={`w-full px-4 py-3 rounded-xl border-2 ${
                errors.checkOut ? 'border-red-400' : 'border-sand hover:border-stone-light'
              } bg-white focus:outline-none focus:ring-2 focus:ring-amber/30 focus:border-amber transition-colors`}
            />
            {errors.checkOut && (
              <p role="alert" className="mt-1.5 text-sm text-red-500">{errors.checkOut}</p>
            )}
            <p className="mt-1.5 text-xs text-text-light">
              Salida · hasta 10:00 hs
            </p>
          </div>
        </div>
      </div>

      {/* Guests */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-forest-dark mb-2">
          <HiOutlineUserGroup className="w-4 h-4 text-amber" />
          Huéspedes
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <select
            id="adults"
            value={adults}
            onChange={(e) => setAdults(Number(e.target.value))}
            className="w-full px-4 py-3 rounded-xl border-2 border-sand hover:border-stone-light bg-white focus:outline-none focus:ring-2 focus:ring-amber/30 focus:border-amber transition-colors cursor-pointer"
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? 'adulto' : 'adultos'}
              </option>
            ))}
          </select>

          <select
            id="children"
            value={children}
            onChange={(e) => handleChildrenChange(Number(e.target.value))}
            className="w-full px-4 py-3 rounded-xl border-2 border-sand hover:border-stone-light bg-white focus:outline-none focus:ring-2 focus:ring-amber/30 focus:border-amber transition-colors cursor-pointer"
          >
            {[0, 1, 2, 3, 4].map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? 'menor' : 'menores'}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Children Ages */}
      {children > 0 && (
        <div className="bg-cream-dark rounded-xl p-4">
          <label className="block text-sm font-medium text-forest-dark mb-3">
            Edad de los menores
          </label>
          <div className="flex flex-wrap gap-3">
            {childrenAges.map((age, index) => (
              <div key={index} className="flex items-center gap-2 bg-white rounded-lg px-3 py-2">
                <span className="text-sm text-text-medium">Menor {index + 1}:</span>
                <select
                  value={age}
                  onChange={(e) => handleChildAgeChange(index, Number(e.target.value))}
                  className="px-2 py-1 rounded-lg border border-sand bg-white focus:outline-none focus:ring-2 focus:ring-amber/30 focus:border-amber cursor-pointer"
                >
                  {Array.from({ length: 18 }, (_, i) => (
                    <option key={i} value={i}>
                      {i} {i === 1 ? 'año' : 'años'}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-text-light">
            Los menores (incluidos bebés) cuentan para la capacidad máxima
          </p>
        </div>
      )}

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="flex items-center gap-2 text-sm font-medium text-forest-dark mb-2"
        >
          <HiOutlineChatBubbleBottomCenterText className="w-4 h-4 text-amber" />
          Consulta adicional
          <span className="text-text-light font-normal">(opcional)</span>
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          placeholder="Ej: ¿Cuál es la tarifa? ¿Tienen cuna para bebé?"
          className="w-full px-4 py-3 rounded-xl border-2 border-sand hover:border-stone-light bg-white focus:outline-none focus:ring-2 focus:ring-amber/30 focus:border-amber transition-colors resize-none"
        />
      </div>

      {/* Submit */}
      <div className="pt-2">
        <Button type="submit" variant="primary" size="lg" className="w-full shadow-lg hover:shadow-xl">
          <SiWhatsapp className="w-5 h-5" />
          Continuar a WhatsApp
        </Button>
        <p className="text-center text-xs text-text-light mt-3">
          Se abrirá WhatsApp con tu consulta pre-cargada
        </p>
      </div>
    </form>
  )
}
