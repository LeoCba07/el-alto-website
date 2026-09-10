'use client'

import Image from 'next/image'
import HeroBookingWidget from './HeroBookingWidget'
import Button from './Button'
import { HiOutlineChevronDown } from 'react-icons/hi2'
import { useState, useEffect, useCallback } from 'react'
import { ANIMATION_TIMING, FOUNDING_YEAR } from '@/lib/constants'

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
  subtitulo = 'Complejo de alojamiento en Tanti, Córdoba',
  titulo = 'El Alto',
  descripcion = 'Tranquilidad serrana con calidez familiar',
  imagenes,
  textoBoton = 'Ver unidades',
  linkBoton = '/unidades',
}: HeroProps) {
  const heroImages = imagenes?.length ? imagenes.map(img => img.url) : defaultImages
  const heroAlts = imagenes?.length ? imagenes.map(img => img.alt || 'El Alto - Alojamiento en las sierras') : defaultImages.map(() => 'El Alto - Alojamiento en las sierras')
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
            sizes="100vw"
            className="object-cover"
            priority={index === 0}
          />
        </div>
      ))}

      {/* Gradient overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />

      {/* Content - Spread across full height */}
      {/* Below sm the hero buttons span wide enough to reach the floating chat
          and WhatsApp stack, which rises 140px from the bottom; pb-38 (152px)
          keeps them 12px clear at any screen height. */}
      <div className="relative z-10 flex h-full flex-col justify-between pt-32 pb-38 sm:pb-32 md:py-40">
        {/* Top - Tagline */}
        <div className="text-center px-6 animate-fade-in-down opacity-0" style={{ animationDelay: `${ANIMATION_TIMING.heroFadeIn.tagline}s`, animationFillMode: 'forwards' }}>
          <p className="font-medium tracking-[0.06em] sm:tracking-[0.3em] uppercase text-[0.8125rem] sm:text-sm md:text-base text-white/90 drop-shadow-lg">
            {subtitulo}
          </p>
        </div>

        {/* Center - Main Title */}
        <div className="text-center px-6">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white font-serif drop-shadow-2xl mb-4 animate-fade-in-up opacity-0" style={{ animationDelay: `${ANIMATION_TIMING.heroFadeIn.title}s`, animationFillMode: 'forwards' }}>
            {titulo}
          </h1>
          <p className="text-2xl md:text-3xl lg:text-4xl font-light text-white text-balance drop-shadow-xl animate-fade-in-up opacity-0" style={{ animationDelay: `${ANIMATION_TIMING.heroFadeIn.subtitle}s`, animationFillMode: 'forwards' }}>
            {descripcion}
          </p>
        </div>

        {/* Bottom - CTA & Info */}
        <div className="text-center px-6 animate-fade-in-up opacity-0" style={{ animationDelay: `${ANIMATION_TIMING.heroFadeIn.cta}s`, animationFillMode: 'forwards' }}>
          {/* Tighter mobile margins here (mb-4, mt-5) give back the 12px the
              larger bottom padding takes, so short phones keep today's spacing. */}
          {/* Normal tracking on phones: at 0.04em the line measured 326px and
              left "PAZ" alone on a second line at 360px (312px available). */}
          <p className="mb-4 sm:mb-5 font-medium tracking-normal sm:tracking-[0.2em] uppercase text-[0.75rem] sm:text-sm text-white drop-shadow-lg">
            Desde {FOUNDING_YEAR} · A 20 minutos de Villa Carlos Paz
          </p>
          <HeroBookingWidget />
          {/* Two buttons share one row even at 375px, so they start at the small
              size and grow back to the usual size from sm up. */}
          <div className="mt-5 sm:mt-8 flex flex-row justify-center gap-3 sm:gap-4">
            <Button href={linkBoton} variant="outline-light" size="sm" className="shadow-xl sm:px-8 sm:py-3 sm:text-base md:py-4 md:text-lg">
              {textoBoton}
            </Button>
            <Button href="/precios" variant="outline-light" size="sm" className="shadow-xl sm:px-8 sm:py-3 sm:text-base md:py-4 md:text-lg">
              Ver precios
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
