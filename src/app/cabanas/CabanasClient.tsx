'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  HiOutlineUserGroup,
  HiOutlineChevronRight,
  HiOutlineHome,
  HiOutlineHeart,
  HiOutlineBuildingOffice,
  HiOutlineSquare3Stack3D,
  HiOutlineClipboardDocumentList,
  HiOutlineChatBubbleLeftRight,
} from 'react-icons/hi2'
import { MdOutlinePool } from 'react-icons/md'
import { SiWhatsapp } from 'react-icons/si'
import { IconType } from 'react-icons'
import PhotoCarousel from '@/components/PhotoCarousel'

export interface CabanaType {
  id: string
  tipo: string
  nombre: string
  capacidad: string
  cantidad: number
  descripcion: string
  destacado: string
  photos: string[]
}

export interface TarifaTemporada {
  nombre: string
  periodo: string
  precios: { capacidad: string; precio: number }[]
}

export interface CabanasClientProps {
  cabanas?: CabanaType[]
  tarifas?: {
    alta: TarifaTemporada
    media: TarifaTemporada
    baja: TarifaTemporada
  }
}

const iconMap: Record<string, IconType> = {
  duplex: HiOutlineSquare3Stack3D,
  standard: HiOutlineHome,
  compact: HiOutlineBuildingOffice,
  couple: HiOutlineHeart,
}

const defaultCabanas: CabanaType[] = [
  {
    id: 'duplex',
    tipo: 'duplex',
    nombre: 'Dúplex',
    capacidad: 'Hasta 6',
    cantidad: 2,
    descripcion: 'Dos plantas amplias con living-comedor abajo y dormitorios arriba. Ideales para familias o grupos.',
    destacado: 'Máxima capacidad',
    photos: [
      '/images/cabana1-interior.jpg',
      '/images/cabana1-cocina.jpg',
      '/images/cabana2-habitacion.jpg',
    ],
  },
  {
    id: 'standard',
    tipo: 'standard',
    nombre: 'Estándar',
    capacidad: '2 a 4',
    cantidad: 4,
    descripcion: 'Amplias y completas, con todo lo necesario para una estadía confortable.',
    destacado: 'Las más populares',
    photos: [
      '/images/cabana2-interior.jpg',
      '/images/cabana2-cocina.jpg',
      '/images/cabana2-habitacion.jpg',
    ],
  },
  {
    id: 'compact',
    tipo: 'compact',
    nombre: 'Compactas',
    capacidad: '2 a 3',
    cantidad: 4,
    descripcion: 'Funcionales y acogedoras, con excelente relación precio-calidad.',
    destacado: 'Mejor precio',
    photos: [
      '/images/cabana3-interior.jpg',
      '/images/cabana-con-vista.jpg',
    ],
  },
  {
    id: 'couple',
    tipo: 'couple',
    nombre: 'Parejas',
    capacidad: '2',
    cantidad: 2,
    descripcion: 'Íntimas y románticas, perfectas para una escapada en pareja.',
    destacado: 'Románticas',
    photos: [
      '/images/vista-desde-cabana.jpg',
      '/images/cabana-con-vista.jpg',
    ],
  },
]

const defaultTarifas = {
  alta: {
    nombre: 'Temporada Alta',
    periodo: 'Dic 28 - Feb, Carnaval, Semana Santa',
    precios: [
      { capacidad: '2 personas', precio: 60000 },
      { capacidad: '2 + 1 menor', precio: 75000 },
      { capacidad: '2 a 4 personas', precio: 90000 },
      { capacidad: '4 a 5 personas', precio: 110000 },
      { capacidad: '5 a 6 personas', precio: 129000 },
    ],
  },
  media: {
    nombre: 'Temporada Media',
    periodo: 'Marzo, Diciembre, fines de semana largos, vacaciones de Julio',
    precios: [
      { capacidad: '2 personas', precio: 55000 },
      { capacidad: '2 + 1 menor', precio: 68000 },
      { capacidad: '2 a 4 personas', precio: 85000 },
      { capacidad: '4 a 5 personas', precio: 90000 },
      { capacidad: '5 a 6 personas', precio: 99000 },
    ],
  },
  baja: {
    nombre: 'Temporada Baja',
    periodo: 'Resto del año',
    precios: [
      { capacidad: '2 personas', precio: 49000 },
      { capacidad: '2 + 1 menor', precio: 60000 },
      { capacidad: '2 a 4 personas', precio: 75000 },
      { capacidad: '5 a 6 personas', precio: 89000 },
    ],
  },
}

export default function CabanasClient({ cabanas, tarifas }: CabanasClientProps) {
  const unitTypes = cabanas?.length ? cabanas : defaultCabanas
  const tarifasData = tarifas || defaultTarifas
  const [activeUnit, setActiveUnit] = useState(unitTypes[0])

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Header */}
      <section className="relative h-[50vh] min-h-[400px] mt-14 md:mt-16">
        <Image
          src="/images/panorama-pileta.jpg"
          alt="Vista del complejo El Alto"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/40" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-6xl mx-auto px-4 pb-10 md:pb-14 w-full">
            <p className="text-amber font-medium mb-2 tracking-wide uppercase text-sm">
              Alojamiento
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-3">
              Nuestras Cabañas
            </h1>
            <p className="text-white/90 text-lg md:text-xl max-w-xl">
              12 unidades con distintas capacidades para tu estadía ideal
            </p>
          </div>
        </div>
      </section>

      {/* Unit Type Selector + Gallery */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          {/* Type Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {unitTypes.map((unit) => {
              const Icon = iconMap[unit.tipo] || HiOutlineHome
              return (
                <button
                  key={unit.id}
                  onClick={() => setActiveUnit(unit)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-full font-medium transition-all ${
                    activeUnit.id === unit.id
                      ? 'bg-forest-dark text-white shadow-lg'
                      : 'bg-white text-forest-dark border border-sand hover:border-forest hover:shadow-md'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{unit.nombre}</span>
                </button>
              )
            })}
          </div>

          {/* Selected Unit Display */}
          <div className="grid lg:grid-cols-5 gap-8 items-start">
            {/* Photo Gallery - Takes more space */}
            <div className="lg:col-span-3">
              <PhotoCarousel photos={activeUnit.photos} altPrefix={`Cabaña ${activeUnit.nombre}`} />
            </div>

            {/* Unit Info */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-sand p-6 md:p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="text-xs font-medium text-amber bg-amber/10 px-3 py-1 rounded-full">
                    {activeUnit.destacado}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold text-forest-dark font-serif mt-3">
                    Cabañas {activeUnit.nombre}
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-sand">
                <div className="flex items-center gap-2 bg-forest-dark/5 px-4 py-2 rounded-full">
                  <HiOutlineUserGroup className="w-5 h-5 text-forest" />
                  <span className="font-semibold text-forest-dark">{activeUnit.capacidad} personas</span>
                </div>
                <div className="text-sm text-text-medium">
                  {activeUnit.cantidad} {activeUnit.cantidad === 1 ? 'unidad disponible' : 'unidades disponibles'}
                </div>
              </div>

              <p className="text-text-medium mb-6 leading-relaxed">
                {activeUnit.descripcion}
              </p>

              <Link
                href="/contacto"
                className="flex items-center justify-center gap-2 w-full bg-amber text-white py-4 rounded-full font-semibold hover:bg-amber-dark transition-colors"
              >
                <SiWhatsapp className="w-5 h-5" />
                Consultar disponibilidad
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tarifas */}
      <section className="py-12 md:py-16 bg-cream-dark">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-forest-dark font-serif text-center mb-3">
            Tarifas por noche
          </h2>
          <p className="text-text-medium text-center mb-8 text-sm">
            Temporada 2025/26 · Precios en pesos argentinos · No incluye desayuno
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {Object.values(tarifasData).map((temporada) => (
              <div
                key={temporada.nombre}
                className="bg-white rounded-2xl border border-sand overflow-hidden"
              >
                <div className={`px-5 py-4 ${
                  temporada.nombre === 'Temporada Alta'
                    ? 'bg-amber text-white'
                    : temporada.nombre === 'Temporada Media'
                    ? 'bg-forest text-white'
                    : 'bg-forest-dark text-white'
                }`}>
                  <h3 className="font-bold font-serif">{temporada.nombre}</h3>
                  <p className="text-xs mt-1 opacity-90">
                    {temporada.periodo}
                  </p>
                </div>
                <div className="p-5 space-y-3">
                  {temporada.precios.map((item) => (
                    <div key={item.capacidad} className="flex justify-between items-center">
                      <span className="text-sm text-text-medium">{item.capacidad}</span>
                      <span className="font-semibold text-forest-dark">
                        ${item.precio.toLocaleString('es-AR')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center space-y-2">
            <p className="text-sm text-text-medium">
              <span className="font-medium text-forest-dark">Aire acondicionado:</span> $2.500/día
            </p>
            <p className="text-sm text-text-light">
              Pileta, quincho y cochera incluidos · Descuentos por pago en efectivo
            </p>
            <p className="text-xs text-text-light mt-4 italic">
              * Precios de referencia, sujetos a confirmación al momento de reservar
            </p>
          </div>
        </div>
      </section>

      {/* Booking, Cancellation & Links */}
      <section className="py-12 md:py-16 bg-cream border-t border-sand">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-6">
            {/* Left: Booking + Cancellation */}
            <div className="lg:col-span-3 bg-white rounded-2xl border border-sand p-6 md:p-8">
              {/* Booking Steps */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-forest-dark font-serif mb-2">
                  Cómo reservar
                </h2>
                <p className="text-text-medium text-sm mb-5">
                  Reservá tu estadía en 3 simples pasos
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <span className="w-8 h-8 bg-amber text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">1</span>
                    <div className="pt-0.5">
                      <p className="font-semibold text-forest-dark">Consultá disponibilidad</p>
                      <p className="text-sm text-text-medium">Contactanos por WhatsApp o teléfono con tus fechas y cantidad de personas</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="w-8 h-8 bg-amber text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">2</span>
                    <div className="pt-0.5">
                      <p className="font-semibold text-forest-dark">Confirmá con seña</p>
                      <p className="text-sm text-text-medium">30% del total (50% para estadías de 2 noches o menos). Transferencia o Mercado Pago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="w-8 h-8 bg-amber text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">3</span>
                    <div className="pt-0.5">
                      <p className="font-semibold text-forest-dark">¡Listo para disfrutar!</p>
                      <p className="text-sm text-text-medium">El saldo restante lo abonás al momento del check-in</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cancellation */}
              <div className="border-t border-sand pt-6">
                <h3 className="text-lg font-bold text-forest-dark font-serif mb-2">Política de cancelación</h3>
                <p className="text-text-medium text-sm mb-4">
                  Cancelá sin cargo dentro de los siguientes plazos para recibir reembolso completo de tu seña
                </p>
                <div className="space-y-3">
                  <div className="bg-cream rounded-xl px-4 py-3">
                    <div className="flex items-center justify-between">
                      <span className="text-text-dark font-medium">Temporada Alta/Media</span>
                      <span className="text-forest-dark font-bold">30 días antes del check-in</span>
                    </div>
                    <p className="text-text-medium text-sm mt-1">Entre 15-29 días antes se cobra 1 noche</p>
                  </div>
                  <div className="flex items-center justify-between bg-cream rounded-xl px-4 py-3">
                    <span className="text-text-dark font-medium">Temporada Baja</span>
                    <span className="text-forest-dark font-bold">72 hs antes del check-in</span>
                  </div>
                  <div className="flex items-center justify-between bg-cream rounded-xl px-4 py-3">
                    <span className="text-text-dark font-medium">Promociones</span>
                    <span className="text-forest-dark font-bold">No reembolsable</span>
                  </div>
                </div>
                <p className="text-text-light text-sm text-center mt-4">Una vez confirmada la reserva, no es posible modificar las fechas de estadía.</p>
              </div>
            </div>

            {/* Right: Links stacked */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              <Link
                href="/servicios"
                className="group bg-white rounded-2xl border border-sand p-6 hover:border-forest hover:shadow-lg transition-all flex-1 flex items-center"
              >
                <div className="flex items-center gap-4 w-full">
                  <div className="w-14 h-14 bg-forest/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-forest/20 transition-colors">
                    <MdOutlinePool className="w-7 h-7 text-forest" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-forest-dark group-hover:text-forest transition-colors">
                      Servicios e instalaciones
                    </h3>
                    <p className="text-text-medium">Pileta, quincho, cochera y más</p>
                  </div>
                  <HiOutlineChevronRight className="w-6 h-6 text-forest/50 group-hover:text-forest group-hover:translate-x-1 transition-all" />
                </div>
              </Link>

              <Link
                href="/normas"
                className="group bg-white rounded-2xl border border-sand p-6 hover:border-forest hover:shadow-lg transition-all flex-1 flex items-center"
              >
                <div className="flex items-center gap-4 w-full">
                  <div className="w-14 h-14 bg-forest/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-forest/20 transition-colors">
                    <HiOutlineClipboardDocumentList className="w-7 h-7 text-forest" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-forest-dark group-hover:text-forest transition-colors">
                      Horarios y normas
                    </h3>
                    <p className="text-text-medium">Check-in, check-out y reglas</p>
                  </div>
                  <HiOutlineChevronRight className="w-6 h-6 text-forest/50 group-hover:text-forest group-hover:translate-x-1 transition-all" />
                </div>
              </Link>

              <Link
                href="/consultas-frecuentes"
                className="group bg-white rounded-2xl border border-sand p-6 hover:border-forest hover:shadow-lg transition-all flex-1 flex items-center"
              >
                <div className="flex items-center gap-4 w-full">
                  <div className="w-14 h-14 bg-forest/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-forest/20 transition-colors">
                    <HiOutlineChatBubbleLeftRight className="w-7 h-7 text-forest" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-forest-dark group-hover:text-forest transition-colors">
                      Preguntas frecuentes
                    </h3>
                    <p className="text-text-medium">Dudas comunes resueltas</p>
                  </div>
                  <HiOutlineChevronRight className="w-6 h-6 text-forest/50 group-hover:text-forest group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 bg-forest">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white font-serif mb-4">
            ¿Listo para tu escapada?
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Consultanos disponibilidad y te respondemos a la brevedad
          </p>
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 bg-amber text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-amber-dark transition-colors shadow-lg"
          >
            <SiWhatsapp className="w-5 h-5" />
            Consultar disponibilidad
          </Link>
        </div>
      </section>
    </div>
  )
}
