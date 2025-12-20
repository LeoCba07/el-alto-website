'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  HiOutlineUserGroup,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineArrowRight,
  HiOutlineHome,
  HiOutlineHeart,
  HiOutlineBuildingOffice,
  HiOutlineSquare3Stack3D,
  HiOutlineClipboardDocumentList,
} from 'react-icons/hi2'
import { MdOutlinePool } from 'react-icons/md'
import { SiWhatsapp } from 'react-icons/si'
import { IconType } from 'react-icons'

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

const tarifas = {
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

export default function CabanasPage() {
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
            {/* Photo Gallery - Takes more space */}
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
                  <h2 className="text-2xl md:text-3xl font-bold text-forest-dark font-serif mt-3">
                    Cabañas {activeUnit.tipo}
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
            {Object.values(tarifas).map((temporada) => (
              <div
                key={temporada.nombre}
                className="bg-white rounded-2xl border border-sand overflow-hidden"
              >
                <div className={`px-5 py-4 ${
                  temporada.nombre === 'Temporada Alta'
                    ? 'bg-amber text-white'
                    : temporada.nombre === 'Temporada Media'
                    ? 'bg-forest text-white'
                    : 'bg-forest-dark/10 text-forest-dark'
                }`}>
                  <h3 className="font-bold font-serif">{temporada.nombre}</h3>
                  <p className={`text-xs mt-1 ${
                    temporada.nombre === 'Temporada Baja' ? 'text-text-medium' : 'opacity-90'
                  }`}>
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

      {/* Links to Servicios and Normas */}
      <section className="py-10 border-t border-sand bg-cream">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Link
              href="/servicios"
              className="group bg-white rounded-2xl border border-sand p-6 hover:border-forest hover:shadow-lg transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-forest/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-forest/20 transition-colors">
                  <MdOutlinePool className="w-6 h-6 text-forest" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-forest-dark font-serif text-lg group-hover:text-forest transition-colors">
                    Servicios e instalaciones
                  </h3>
                  <p className="text-text-medium text-sm mt-1">
                    Pileta climatizada, quincho, espacios verdes y más
                  </p>
                  <span className="inline-flex items-center gap-1 text-forest font-medium text-sm mt-3 group-hover:gap-2 transition-all">
                    Ver servicios
                    <HiOutlineArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>

            <Link
              href="/normas"
              className="group bg-white rounded-2xl border border-sand p-6 hover:border-forest hover:shadow-lg transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-forest/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-forest/20 transition-colors">
                  <HiOutlineClipboardDocumentList className="w-6 h-6 text-forest" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-forest-dark font-serif text-lg group-hover:text-forest transition-colors">
                    Horarios y normas
                  </h3>
                  <p className="text-text-medium text-sm mt-1">
                    Check-in, check-out, políticas de reserva y más
                  </p>
                  <span className="inline-flex items-center gap-1 text-forest font-medium text-sm mt-3 group-hover:gap-2 transition-all">
                    Ver normas
                    <HiOutlineArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
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
