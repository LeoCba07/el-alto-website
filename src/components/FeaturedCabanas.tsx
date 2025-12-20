'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import {
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineUserGroup,
  HiOutlineHome,
  HiOutlineHeart,
  HiOutlineBuildingOffice,
  HiOutlineSquare3Stack3D,
  HiOutlineArrowRight,
} from 'react-icons/hi2'
import { SiWhatsapp } from 'react-icons/si'
import { IconType } from 'react-icons'
import { FadeUp } from './ScrollAnimations'

const unitTypes: {
  id: string
  tipo: string
  capacidad: string
  cantidad: number
  descripcion: string
  destacado: string
  icon: IconType
  photos: string[]
}[] = [
  {
    id: 'duplex',
    tipo: 'Dúplex',
    capacidad: 'Hasta 6',
    cantidad: 2,
    descripcion: 'Dos plantas amplias con living-comedor abajo y dormitorios arriba. Ideales para familias o grupos.',
    destacado: 'Máxima capacidad',
    icon: HiOutlineSquare3Stack3D,
    photos: [
      '/images/cabana1-interior.JPG',
      '/images/cabana1-cocina.JPG',
      '/images/cabana1-habitacion.JPG',
    ],
  },
  {
    id: 'standard',
    tipo: 'Estándar',
    capacidad: '2 a 4',
    cantidad: 4,
    descripcion: 'Amplias y completas, con todo lo necesario para una estadía confortable.',
    destacado: 'Las más populares',
    icon: HiOutlineHome,
    photos: [
      '/images/cabana2-interior.JPG',
      '/images/cabana2-cocina.JPG',
      '/images/cabana2-habitacion.JPG',
    ],
  },
  {
    id: 'compact',
    tipo: 'Compactas',
    capacidad: '2 a 3',
    cantidad: 4,
    descripcion: 'Funcionales y acogedoras, con excelente relación precio-calidad.',
    destacado: 'Mejor precio',
    icon: HiOutlineBuildingOffice,
    photos: [
      '/images/cabana3-interior.JPG',
      '/images/cabana-con-vista.JPG',
    ],
  },
  {
    id: 'couple',
    tipo: 'Parejas',
    capacidad: '2',
    cantidad: 2,
    descripcion: 'Íntimas y románticas, perfectas para una escapada en pareja.',
    destacado: 'Románticas',
    icon: HiOutlineHeart,
    photos: [
      '/images/vista-desde-cabana.JPG',
      '/images/cabana-con-vista.JPG',
    ],
  },
]

function PhotoCarousel({ photos, unitName }: { photos: string[]; unitName: string }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextPhoto = () => setCurrentIndex((prev) => (prev + 1) % photos.length)
  const prevPhoto = () => setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length)

  return (
    <div className="relative aspect-[16/10] rounded-xl overflow-hidden">
      <Image
        src={photos[currentIndex]}
        alt={`${unitName} - foto ${currentIndex + 1}`}
        fill
        className="object-cover"
      />
      {photos.length > 1 && (
        <>
          <button
            onClick={prevPhoto}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-colors"
            aria-label="Foto anterior"
          >
            <HiOutlineChevronLeft className="w-5 h-5 text-forest-dark" />
          </button>
          <button
            onClick={nextPhoto}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-colors"
            aria-label="Foto siguiente"
          >
            <HiOutlineChevronRight className="w-5 h-5 text-forest-dark" />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {photos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-white' : 'bg-white/50'
                }`}
                aria-label={`Ir a foto ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default function FeaturedCabanas() {
  const [activeUnit, setActiveUnit] = useState(unitTypes[0])

  return (
    <section id="cabanas" className="bg-cream py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <FadeUp>
          <div className="text-center mb-10">
            <p className="text-forest font-medium mb-2 tracking-wide uppercase text-sm">
              Alojamiento
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-forest-dark font-serif mb-3">
              Nuestras Cabañas
            </h2>
            <p className="text-text-medium max-w-xl mx-auto">
              12 unidades con distintas capacidades para tu estadía ideal
            </p>
          </div>
        </FadeUp>

        {/* Type Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {unitTypes.map((unit) => {
            const Icon = unit.icon
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
                <span>{unit.tipo}</span>
              </button>
            )
          })}
        </div>

        {/* Selected Unit Display */}
        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Photo Gallery */}
          <div className="lg:col-span-3">
            <PhotoCarousel photos={activeUnit.photos} unitName={activeUnit.tipo} />
          </div>

          {/* Unit Info */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-sand p-6 md:p-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-xs font-medium text-amber bg-amber/10 px-3 py-1 rounded-full">
                  {activeUnit.destacado}
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-forest-dark font-serif mt-3">
                  Cabañas {activeUnit.tipo}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-sand">
              <div className="flex items-center gap-2 bg-forest-dark/5 px-4 py-2 rounded-full">
                <HiOutlineUserGroup className="w-5 h-5 text-forest" />
                <span className="font-semibold text-forest-dark">{activeUnit.capacidad} personas</span>
              </div>
              <div className="text-sm text-text-medium">
                {activeUnit.cantidad} {activeUnit.cantidad === 1 ? 'unidad' : 'unidades'}
              </div>
            </div>

            <p className="text-text-medium mb-6 leading-relaxed">
              {activeUnit.descripcion}
            </p>

            <Link
              href="/contacto"
              className="flex items-center justify-center gap-2 w-full bg-amber text-white py-4 rounded-full font-semibold hover:bg-amber-dark transition-all hover:shadow-lg hover:shadow-amber/25"
            >
              <SiWhatsapp className="w-5 h-5" />
              Consultar disponibilidad
            </Link>
          </div>
        </div>

        {/* Link to full cabanas page */}
        <div className="text-center mt-10">
          <Link
            href="/cabanas"
            className="inline-flex items-center gap-2 text-forest font-medium hover:text-forest-dark transition-colors group"
          >
            Ver todas las cabañas y tarifas
            <HiOutlineArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}
