'use client'

import Image from 'next/image'
import Button from './Button'
import { HiOutlineChevronDown } from 'react-icons/hi2'
import { useState, useEffect, useCallback } from 'react'
import { ANIMATION_TIMING } from '@/lib/constants'

interface HeroImage {
  url: string
  alt?: string
}

interface HeroProps {
  subtitulo?: string
  titulo?: string
  descripcion?: string
  imagenes?: HeroImage[]
  textoBoton?: string
  linkBoton?: string
}

const defaultImages = [
  '/images/panorama-pileta.jpg',
  '/images/vista-desde-cabana.jpg',
  '/images/sierras.jpg',
]

export default function Hero({
  subtitulo = 'Complejo de cabañas en Tanti, Córdoba',
  titulo = 'El Alto',
  descripcion = 'Tranquilidad serrana con calidez familiar',
  imagenes,
  textoBoton = 'Ver alojamientos',
  linkBoton = '/cabanas',
}: HeroProps) {
  const heroImages = imagenes?.length ? imagenes.map(img => img.url) : defaultImages
  const heroAlts = imagenes?.length ? imagenes.map(img => img.alt || 'El Alto - Cabañas en las sierras') : defaultImages.map(() => 'El Alto - Cabañas en las sierras')
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % heroImages.length)
  }, [heroImages.length])

  useEffect(() => {
    const interval = setInterval(nextSlide, 8000) // Slower transition
    return () => clearInterval(interval)
  }, [nextSlide])

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Images with Crossfade */}
      {heroImages.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={src}
            alt={heroAlts[index]}
            fill
            className="object-cover"
            priority={index === 0}
            quality={90}
          />
        </div>
      ))}

      {/* Gradient overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />

      {/* Content - Spread across full height */}
      <div className="relative z-10 flex h-full flex-col justify-between py-32 md:py-40">
        {/* Top - Tagline */}
        <div className="text-center px-6 animate-fade-in-down opacity-0" style={{ animationDelay: `${ANIMATION_TIMING.heroFadeIn.tagline}s`, animationFillMode: 'forwards' }}>
          <p className="font-medium tracking-[0.3em] uppercase text-sm md:text-base text-white/90 drop-shadow-lg">
            {subtitulo}
          </p>
        </div>

        {/* Center - Main Title */}
        <div className="text-center px-6">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white font-serif drop-shadow-2xl mb-4 animate-fade-in-up opacity-0" style={{ animationDelay: `${ANIMATION_TIMING.heroFadeIn.title}s`, animationFillMode: 'forwards' }}>
            {titulo}
          </h1>
          <p className="text-2xl md:text-3xl lg:text-4xl font-light text-white drop-shadow-xl animate-fade-in-up opacity-0" style={{ animationDelay: `${ANIMATION_TIMING.heroFadeIn.subtitle}s`, animationFillMode: 'forwards' }}>
            {descripcion}
          </p>
        </div>

        {/* Bottom - CTA & Info */}
        <div className="text-center px-6 animate-fade-in-up opacity-0" style={{ animationDelay: `${ANIMATION_TIMING.heroFadeIn.cta}s`, animationFillMode: 'forwards' }}>
          <p className="mb-8 text-base md:text-lg text-white tracking-wide font-semibold [text-shadow:_0_2px_8px_rgb(0_0_0_/_90%)]">
            Desde 1996 · A 10 minutos de Villa Carlos Paz
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button href={linkBoton} variant="primary" size="lg" className="shadow-xl hover:shadow-amber/25">
              {textoBoton}
            </Button>
            <Button href="/contacto" variant="secondary" size="lg" className="shadow-xl">
              Consultar disponibilidad
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => {
          // Scroll just enough to reveal the next section (account for fixed header)
          const scrollAmount = window.innerHeight - 100
          window.scrollTo({ top: scrollAmount, behavior: 'smooth' })
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce cursor-pointer hover:scale-110 transition-transform"
        aria-label="Scroll hacia abajo"
      >
        <HiOutlineChevronDown className="w-8 h-8 text-white/70 hover:text-white transition-colors" />
      </button>
    </section>
  )
}
