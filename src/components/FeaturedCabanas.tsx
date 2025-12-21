'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import {
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineUserGroup,
  HiOutlineArrowRight,
  HiOutlineSparkles,
} from 'react-icons/hi2'
import { FadeUp } from './ScrollAnimations'

// Featured photos from our best cabins
const featuredPhotos = [
  '/images/cabana1-interior.JPG',
  '/images/cabana2-interior.JPG',
  '/images/cabana1-cocina.JPG',
  '/images/cabana2-cocina.JPG',
  '/images/cabana1-habitacion.JPG',
  '/images/cabana2-habitacion.JPG',
]

function PhotoCarousel({ photos }: { photos: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextPhoto = () => setCurrentIndex((prev) => (prev + 1) % photos.length)
  const prevPhoto = () => setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length)

  return (
    <div className="relative aspect-[16/10] rounded-xl overflow-hidden">
      <Image
        src={photos[currentIndex]}
        alt={`Interior de cabaña - foto ${currentIndex + 1}`}
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

        {/* Photo Gallery + Info */}
        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Photo Carousel */}
          <div className="lg:col-span-3">
            <PhotoCarousel photos={featuredPhotos} />
          </div>

          {/* Summary Info */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-sand p-6 md:p-8">
            <div className="mb-4">
              <span className="text-xs font-medium text-amber bg-amber/10 px-3 py-1 rounded-full">
                Variedad para todos
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-forest-dark font-serif mt-3">
                Confort en las sierras
              </h3>
            </div>

            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-sand">
              <div className="flex items-center gap-2 bg-forest-dark/5 px-4 py-2 rounded-full">
                <HiOutlineUserGroup className="w-5 h-5 text-forest" />
                <span className="font-semibold text-forest-dark">2 a 6 personas</span>
              </div>
              <div className="flex items-center gap-2 bg-forest-dark/5 px-4 py-2 rounded-full">
                <HiOutlineSparkles className="w-5 h-5 text-forest" />
                <span className="font-semibold text-forest-dark">4 estilos</span>
              </div>
            </div>

            <p className="text-text-medium mb-6 leading-relaxed">
              Cabañas completamente equipadas con cocina, Wi-Fi, cochera cubierta y acceso a pileta y quincho.
              Opciones para parejas, familias y grupos.
            </p>

            <Link
              href="/cabanas"
              className="flex items-center justify-center gap-2 w-full bg-forest-dark text-white py-4 rounded-full font-semibold hover:bg-forest transition-all hover:shadow-lg group"
            >
              Explorar cabañas y tarifas
              <HiOutlineArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
