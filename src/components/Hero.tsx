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

  // The visible height, measured rather than taken from svh: with svh in the
  // page, Chrome for iOS opened from another app painted it offset, with the
  // fixed header and WhatsApp button missing until a reload. innerHeight is the
  // area between the browser bars. The server render falls back to 100vh.
  // Only a width change (rotation) re-measures, so the hero doesn't jump as
  // iOS collapses its bars on scroll.
  useEffect(() => {
    const root = document.documentElement
    let width = window.innerWidth
    const measure = () => root.style.setProperty('--hero-vh', `${window.innerHeight}px`)
    const onResize = () => {
      if (window.innerWidth === width) return
      width = window.innerWidth
      measure()
    }
    measure()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    // The photo spans at least 100vh, which on iOS is the height with the
    // browser bars collapsed, so once iOS shrinks its bars on scroll the next
    // section doesn't peek in under a short hero. (vh rather than lvh: same
    // size on iOS, and Chrome for iOS mispainted the page on a first open from
    // another app with lvh.) On phones it runs 4rem further, because iOS 26
    // floats a translucent bar over the page bottom and the next section
    // showed through it on load. The content box below is the measured visible
    // height (--hero-vh), the area visible on load.
    <section className="relative min-h-[calc(100vh+4rem)] md:min-h-screen w-full overflow-hidden">
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

      {/* Content. Below md the bottom block (Desde line, widget, buttons)
          rests on the floor, and the tagline and title share the height above
          it evenly, never less than 12px apart. From md up the wrapper is
          display: contents, so the three blocks spread across the height as
          before.
          The measured visible height (--hero-vh, see the effect above) rather
          than h-screen: on iOS 100vh includes the area behind the browser
          bars, which hid the bottom of the hero and slid it under the
          floating buttons. pt-18 clears the h-16 header by 8px; pb-38
          (152px) is the floor, keeping the hero buttons 12px above the
          floating chat/WhatsApp stack, which rises 140px. On screens too short
          for all of it, the hero grows and scrolls rather than clipping. */}
      <div className="relative z-10 flex min-h-[var(--hero-vh,100vh)] flex-col justify-evenly gap-3 pt-18 pb-38 sm:pb-32 md:justify-between md:gap-0 md:py-40">
        <div className="flex flex-1 flex-col justify-evenly gap-3 md:contents">
          {/* Top - Tagline */}
          <div className="text-center px-6 animate-fade-in-down opacity-0" style={{ animationDelay: `${ANIMATION_TIMING.heroFadeIn.tagline}s`, animationFillMode: 'forwards' }}>
            <p className="font-medium tracking-[0.02em] sm:tracking-[0.3em] uppercase text-sm md:text-base text-white/90 drop-shadow-lg">
              {subtitulo}
            </p>
          </div>

          {/* Center - Main Title */}
          <div className="text-center px-6">
            <h1 className="text-[4.0625rem] md:text-7xl lg:text-8xl font-bold text-white font-serif drop-shadow-2xl mb-2 sm:mb-4 animate-fade-in-up opacity-0" style={{ animationDelay: `${ANIMATION_TIMING.heroFadeIn.title}s`, animationFillMode: 'forwards' }}>
              {titulo}
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-white text-balance drop-shadow-xl animate-fade-in-up opacity-0" style={{ animationDelay: `${ANIMATION_TIMING.heroFadeIn.subtitle}s`, animationFillMode: 'forwards' }}>
              {descripcion}
            </p>
          </div>
        </div>

        {/* Bottom - CTA & Info */}
        <div className="text-center px-6 animate-fade-in-up opacity-0" style={{ animationDelay: `${ANIMATION_TIMING.heroFadeIn.cta}s`, animationFillMode: 'forwards' }}>
          {/* 13px with normal tracking: one line from 390px (most iPhones);
              narrower phones get two balanced lines instead of a lone "PAZ". */}
          <p className="mb-4 sm:mb-5 font-medium tracking-normal sm:tracking-[0.2em] uppercase text-[0.8125rem] sm:text-sm text-balance text-white drop-shadow-lg">
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

        {/* Scroll indicator. Lives in the content box, which is the measured
            visible height, so it sits at the bottom of the first visible
            screen, not behind the browser bar. */}
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
      </div>
    </section>
  )
}
