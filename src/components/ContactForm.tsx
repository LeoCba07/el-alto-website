'use client'

import { useState } from 'react'
import Button from './Button'

const WHATSAPP_NUMBER = '5493572501030'

export default function ContactForm() {
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
    const date = new Date(dateStr + 'T00:00:00')
    return date.toLocaleDateString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}

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
    let msg = `Hola! Quisiera consultar disponibilidad:\n\n`
    msg += `Entrada: ${formatDate(checkIn)}\n`
    msg += `Salida: ${formatDate(checkOut)}\n`
    msg += `Adultos: ${adults}\n`

    if (children > 0) {
      const agesText = childrenAges
        .map((age, i) => `${age} ${age === 1 ? 'año' : 'años'}`)
        .join(', ')
      msg += `Menores: ${children} (${agesText})\n`
    }

    if (message.trim()) {
      msg += `\nConsulta: ${message.trim()}`
    }

    return encodeURIComponent(msg)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${generateWhatsAppMessage()}`
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
      {/* Dates */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="checkIn"
            className="block text-sm font-medium text-earth-dark mb-2"
          >
            Fecha de entrada
          </label>
          <input
            type="date"
            id="checkIn"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            min={today}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.checkIn ? 'border-red-500' : 'border-stone-light'
            } focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent`}
          />
          {errors.checkIn && (
            <p className="mt-1 text-sm text-red-500">{errors.checkIn}</p>
          )}
          <p className="mt-1 text-xs text-stone">Check-in desde las 13:30 hs</p>
        </div>

        <div>
          <label
            htmlFor="checkOut"
            className="block text-sm font-medium text-earth-dark mb-2"
          >
            Fecha de salida
          </label>
          <input
            type="date"
            id="checkOut"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            min={minCheckOut}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.checkOut ? 'border-red-500' : 'border-stone-light'
            } focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent`}
          />
          {errors.checkOut && (
            <p className="mt-1 text-sm text-red-500">{errors.checkOut}</p>
          )}
          <p className="mt-1 text-xs text-stone">Check-out hasta las 10:00 hs</p>
        </div>
      </div>

      {/* Guests */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="adults"
            className="block text-sm font-medium text-earth-dark mb-2"
          >
            Adultos
          </label>
          <select
            id="adults"
            value={adults}
            onChange={(e) => setAdults(Number(e.target.value))}
            className="w-full px-4 py-3 rounded-lg border border-stone-light focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent"
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? 'adulto' : 'adultos'}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="children"
            className="block text-sm font-medium text-earth-dark mb-2"
          >
            Menores
          </label>
          <select
            id="children"
            value={children}
            onChange={(e) => handleChildrenChange(Number(e.target.value))}
            className="w-full px-4 py-3 rounded-lg border border-stone-light focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent"
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
        <div>
          <label className="block text-sm font-medium text-earth-dark mb-2">
            Edad de los menores
          </label>
          <div className="flex flex-wrap gap-3">
            {childrenAges.map((age, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="text-sm text-earth-medium">Menor {index + 1}:</span>
                <select
                  value={age}
                  onChange={(e) => handleChildAgeChange(index, Number(e.target.value))}
                  className="px-3 py-2 rounded-lg border border-stone-light focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent"
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
          <p className="mt-2 text-xs text-stone">
            Los menores (incluidos bebés) cuentan para la capacidad máxima
          </p>
        </div>
      )}

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-earth-dark mb-2"
        >
          Consulta adicional (opcional)
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          placeholder="Ej: ¿Tienen disponibilidad para esas fechas? ¿Aceptan mascotas?"
          className="w-full px-4 py-3 rounded-lg border border-stone-light focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent resize-none"
        />
      </div>

      {/* Submit */}
      <Button type="submit" variant="primary" size="lg" className="w-full">
        <span className="flex items-center justify-center gap-2">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
          Continuar a WhatsApp
        </span>
      </Button>

      <p className="text-center text-sm text-stone">
        Al continuar, se abrirá WhatsApp con tu consulta pre-cargada
      </p>
    </form>
  )
}
