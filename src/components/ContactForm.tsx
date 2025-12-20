'use client'

import { useState } from 'react'
import Button from './Button'
import { SiWhatsapp } from 'react-icons/si'

const WHATSAPP_NUMBER = '5493572501030'

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
    const date = new Date(dateStr + 'T00:00:00')
    return date.toLocaleDateString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
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
    let msg = `Hola! Soy ${nombre.trim()}. Quisiera consultar disponibilidad:\n\n`
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
      {/* Name */}
      <div>
        <label
          htmlFor="nombre"
          className="block text-sm font-medium text-earth-dark mb-2"
        >
          Nombre
        </label>
        <input
          type="text"
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Tu nombre"
          className={`w-full px-4 py-3 rounded-lg border ${
            errors.nombre ? 'border-red-500' : 'border-sand'
          } bg-cream focus:outline-none focus:ring-2 focus:ring-amber focus:border-transparent`}
        />
        {errors.nombre && (
          <p className="mt-1 text-sm text-red-500">{errors.nombre}</p>
        )}
      </div>

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
              errors.checkIn ? 'border-red-500' : 'border-sand'
            } bg-cream focus:outline-none focus:ring-2 focus:ring-amber focus:border-transparent`}
          />
          {errors.checkIn && (
            <p className="mt-1 text-sm text-red-500">{errors.checkIn}</p>
          )}
          <p className="mt-1 text-xs text-stone">
            {checkIn ? formatDate(checkIn) + ' — ' : ''}Check-in desde las 13:30 hs
          </p>
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
              errors.checkOut ? 'border-red-500' : 'border-sand'
            } bg-cream focus:outline-none focus:ring-2 focus:ring-amber focus:border-transparent`}
          />
          {errors.checkOut && (
            <p className="mt-1 text-sm text-red-500">{errors.checkOut}</p>
          )}
          <p className="mt-1 text-xs text-stone">
            {checkOut ? formatDate(checkOut) + ' — ' : ''}Check-out hasta las 10:00 hs
          </p>
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
            className="w-full px-4 py-3 rounded-lg border border-sand bg-cream focus:outline-none focus:ring-2 focus:ring-amber focus:border-transparent"
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
            className="w-full px-4 py-3 rounded-lg border border-sand bg-cream focus:outline-none focus:ring-2 focus:ring-amber focus:border-transparent"
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
                  className="px-3 py-2 rounded-lg border border-sand bg-cream focus:outline-none focus:ring-2 focus:ring-amber focus:border-transparent"
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
          rows={4}
          placeholder="Ej: ¿Tienen disponibilidad? ¿Cuál es la tarifa? ¿Tienen cuna para bebé?"
          className="w-full px-4 py-3 rounded-lg border border-sand bg-cream focus:outline-none focus:ring-2 focus:ring-amber focus:border-transparent resize-none"
        />
      </div>

      {/* Submit */}
      <Button type="submit" variant="primary" size="lg" className="w-full">
        <SiWhatsapp className="w-5 h-5" />
        Continuar a WhatsApp
      </Button>

      <p className="text-center text-sm text-stone">
        Al continuar, se abrirá WhatsApp con tu consulta pre-cargada
      </p>
    </form>
  )
}
