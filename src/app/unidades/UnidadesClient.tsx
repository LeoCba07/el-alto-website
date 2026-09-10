'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  HiOutlineUserGroup,
  HiOutlineHome,
  HiOutlineHeart,
  HiOutlineBuildingOffice,
  HiOutlineSquare3Stack3D,
} from 'react-icons/hi2'
import {
  MdOutlineWifi,
  MdOutlineKitchen,
  MdOutlineLocalParking,
  MdOutlineOutdoorGrill,
  MdOutlineAcUnit,
  MdOutlineTv,
} from 'react-icons/md'
import { SiWhatsapp } from 'react-icons/si'
import { IconType } from 'react-icons'
import PhotoCarousel, { CarouselPhoto } from '@/components/PhotoCarousel'
import ComoReservar from '@/components/ComoReservar'
import PageCTA from '@/components/PageCTA'
import { DEFAULT_AMENITIES, AMENITY_LABELS } from '@/lib/constants'

export interface UnidadType {
  id: string
  tipo: string
  nombre: string
  capacidad: string
  cantidad: number
  descripcion: string
  destacado: string
  amenities: string[]
  photos: CarouselPhoto[]
}

// Tarifas types live in lib/types so /precios can use them without importing
// from this page's client component.
export type { TarifaTemporada, TarifasData } from '@/lib/types'

export interface UnidadesClientProps {
  unidades?: UnidadType[]
}

const amenityIcons: Record<string, IconType> = {
  wifi: MdOutlineWifi,
  cocina: MdOutlineKitchen,
  cochera: MdOutlineLocalParking,
  asador: MdOutlineOutdoorGrill,
  aire: MdOutlineAcUnit,
  tv: MdOutlineTv,
}

const iconMap: Record<string, IconType> = {
  duplex: HiOutlineSquare3Stack3D,
  standard: HiOutlineHome,
  compact: HiOutlineBuildingOffice,
  couple: HiOutlineHeart,
}

const defaultUnidades: UnidadType[] = [
  {
    id: 'duplex',
    tipo: 'duplex',
    nombre: 'Dúplex',
    capacidad: 'Hasta 6',
    amenities: [...DEFAULT_AMENITIES],
    cantidad: 2,
    descripcion: 'Dos plantas amplias con living-comedor abajo y dormitorios arriba. Ideales para familias o grupos.',
    destacado: 'Máxima capacidad',
    photos: [
      '/images/cabana1-interior.jpg',
      '/images/cabana2-interior.jpg',
      '/images/cabana2-habitacion.jpg',
    ],
  },
  {
    id: 'standard',
    tipo: 'standard',
    nombre: 'Estándar',
    capacidad: '2 a 4',
    amenities: [...DEFAULT_AMENITIES],
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
    amenities: [...DEFAULT_AMENITIES],
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
    amenities: [...DEFAULT_AMENITIES],
    cantidad: 2,
    descripcion: 'Íntimas y románticas, perfectas para una escapada en pareja.',
    destacado: 'Románticas',
    photos: [
      '/images/vista-desde-cabana.jpg',
      '/images/cabana-con-vista.jpg',
    ],
  },
]

export default function UnidadesClient({ unidades }: UnidadesClientProps) {
  const unitTypes = unidades?.length ? unidades : defaultUnidades
  const [activeUnit, setActiveUnit] = useState(unitTypes[0])
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [displayedUnit, setDisplayedUnit] = useState(unitTypes[0])

  // Handle unit change with animation
  const handleUnitChange = (unit: UnidadType) => {
    if (unit.id === activeUnit.id || isTransitioning) return
    setIsTransitioning(true)
    setActiveUnit(unit)
  }

  // Update displayed content after fade out
  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setDisplayedUnit(activeUnit)
        setIsTransitioning(false)
      }, 150)
      return () => clearTimeout(timer)
    }
  }, [isTransitioning, activeUnit])

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Header */}
      <section className="relative h-[50vh] min-h-[400px] mt-14 md:mt-16">
        <Image
          src="/images/panorama-pileta.jpg"
          alt="Vista del complejo El Alto"
          fill
          sizes="100vw"
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
              Nuestras Unidades
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
                  onClick={() => handleUnitChange(unit)}
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
          <div
            className={`grid lg:grid-cols-5 gap-8 items-start transition-all duration-200 ${
              isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
            }`}
          >
            {/* Photo Gallery - Takes more space */}
            <div className="lg:col-span-3">
              <PhotoCarousel key={displayedUnit.id} photos={displayedUnit.photos} altPrefix={`Unidad ${displayedUnit.nombre}`} />
            </div>

            {/* Unit Info */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-sand p-6 md:p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="text-xs font-medium text-amber-dark bg-amber/20 px-3 py-1 rounded-full">
                    {displayedUnit.destacado}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold text-forest-dark font-serif mt-3">
                    {displayedUnit.nombre}
                  </h2>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 mb-6 pb-6 border-b border-sand">
                <div className="flex items-center gap-2.5 bg-amber/15 border border-amber/40 px-4 py-2.5 rounded-xl">
                  <HiOutlineUserGroup className="w-6 h-6 text-amber-dark shrink-0" aria-hidden="true" />
                  <span className="text-lg font-bold text-forest-dark leading-none">
                    {displayedUnit.capacidad}
                    <span className="font-medium text-text-medium text-sm"> personas</span>
                  </span>
                </div>
                <div className="text-sm text-text-medium">
                  {displayedUnit.cantidad} {displayedUnit.cantidad === 1 ? 'unidad disponible' : 'unidades disponibles'}
                </div>
              </div>

              <p className="text-text-medium mb-6 leading-relaxed">
                {displayedUnit.descripcion}
              </p>

              {displayedUnit.amenities.length > 0 && (
                <div className="mb-6 pb-6 border-b border-sand">
                  <p className="text-xs font-semibold uppercase tracking-wide text-text-light mb-3">
                    Qué incluye
                  </p>
                  <ul className="grid grid-cols-2 gap-y-2.5 gap-x-3">
                    {displayedUnit.amenities.map((key) => {
                      const Icon = amenityIcons[key]
                      const label = AMENITY_LABELS[key]
                      if (!Icon || !label) return null
                      return (
                        <li key={key} className="flex items-center gap-2 text-sm text-text-medium">
                          <Icon className="w-4 h-4 text-forest shrink-0" aria-hidden="true" />
                          <span>{label}</span>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )}

              <Link
                href="/contacto"
                className="flex items-center justify-center gap-2 w-full bg-amber text-text-dark py-4 rounded-full font-semibold hover:bg-amber-dark transition-colors"
              >
                <SiWhatsapp className="w-5 h-5" />
                Consultar disponibilidad
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ComoReservar />

      <PageCTA />
    </div>
  )
}
