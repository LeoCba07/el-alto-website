'use client'

import Image from 'next/image'
import Link from 'next/link'
import { HiOutlineChevronDown } from 'react-icons/hi2'
import { Fragment, useState, useEffect, useCallback } from 'react'
import { ANIMATION_TIMING, FOUNDING_YEAR } from '@/lib/constants'

interface HeroImage {
  url: string
  alt?: string
  // Art-directed Sanity crops (see the homepage); local fallbacks have none.
  landscapeSrcSet?: string
  portraitSrcSet?: string
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
  subtitulo = `Tanti · Sierras de Córdoba · Desde ${FOUNDING_YEAR}`,
  titulo = 'El Alto',
  descripcion = 'Tranquilidad serrana, a 20 minutos de Villa Carlos Paz',
  imagenes,
  textoBoton = 'Ver unidades',
  linkBoton = '/unidades',
}: HeroProps) {
  const heroImages: HeroImage[] = imagenes?.length ? imagenes : defaultImages.map((url) => ({ url }))
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

  const secondaryLinks = [
    { href: linkBoton, label: textoBoton },
    { href: '/precios', label: 'Ver precios' },
  ]

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
      {heroImages.map((img, index) => {
        const alt = img.alt || 'El Alto - Alojamiento en las sierras'
        return (
          <div
            key={img.url}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {img.portraitSrcSet && img.landscapeSrcSet ? (
              // Sanity already serves each crop at each width, so this skips
              // next/image, whose 1200px cap and flat 100vw blurred the photos
              // on phones. sizes is the photo's drawn width under object-cover:
              // the hero's height times the crop's aspect where that exceeds
              // the screen width (the hero is 100vh + 4rem tall on phones).
              <picture>
                <source
                  media="(orientation: portrait)"
                  srcSet={img.portraitSrcSet}
                  sizes="(max-aspect-ratio: 9/16) calc(56.25vh + 36px), 100vw"
                />
                <img
                  src={img.url}
                  srcSet={img.landscapeSrcSet}
                  sizes="(max-aspect-ratio: 16/9) 178vh, 100vw"
                  alt={alt}
                  className="absolute inset-0 h-full w-full object-cover"
                  fetchPriority={index === 0 ? 'high' : 'low'}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                />
              </picture>
            ) : (
              <Image src={img.url} alt={alt} fill sizes="100vw" className="object-cover" priority={index === 0} />
            )}
          </div>
        )
      })}

      {/* Gradient overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />

      {/* Content. Below md the bottom block (the links) rests on the
          floor, and the tagline and title share the height above it evenly,
          never less than 12px apart. From md up the wrapper is
          display: contents, so the three blocks spread across the height as
          before.
          The measured visible height (--hero-vh, see the effect above) rather
          than h-screen: on iOS 100vh includes the area behind the browser
          bars, which hid the bottom of the hero and slid it under the
          floating buttons. pt-18 clears the h-16 header by 8px; pb-38
          (152px) is the floor, keeping the hero links 12px above the
          floating chat/WhatsApp stack, which rises 140px (the chat stays
          hidden over the hero, see ChatBot). On screens too short for all of
          it, the hero grows and scrolls rather than clipping. */}
      <div className="relative z-10 flex min-h-[var(--hero-vh,100vh)] flex-col justify-evenly gap-3 pt-18 pb-38 sm:pb-32 md:justify-between md:gap-0 md:py-40">
        <div className="flex flex-1 flex-col justify-evenly gap-3 md:contents">
          {/* Top - Tagline. Carries place and age, so the hero needs no
              second caps line near the widget. */}
          <div className="text-center px-6 animate-fade-in-down opacity-0" style={{ animationDelay: `${ANIMATION_TIMING.heroFadeIn.tagline}s`, animationFillMode: 'forwards' }}>
            <p className="font-medium tracking-[0.08em] sm:tracking-[0.18em] uppercase text-xs sm:text-sm text-balance text-white/85 drop-shadow-lg">
              {subtitulo}
            </p>
          </div>

          {/* Center - Main Title */}
          <div className="text-center px-6">
            <h1 className="text-[4.0625rem] md:text-7xl lg:text-8xl font-bold text-white font-serif drop-shadow-2xl mb-2 sm:mb-4 animate-fade-in-up opacity-0" style={{ animationDelay: `${ANIMATION_TIMING.heroFadeIn.title}s`, animationFillMode: 'forwards' }}>
              {titulo}
            </h1>
            {/* Regular rather than light: thin white type dissolved into the photo. */}
            <p className="max-w-2xl mx-auto text-lg sm:text-xl md:text-2xl font-normal text-white text-balance drop-shadow-xl [text-shadow:_0_1px_12px_rgb(0_0_0_/_45%)] animate-fade-in-up opacity-0" style={{ animationDelay: `${ANIMATION_TIMING.heroFadeIn.subtitle}s`, animationFillMode: 'forwards' }}>
              {/* Each comma-separated clause is an inline-block, so a phone
                  breaks "Tranquilidad serrana, / a 20 minutos…" rather than
                  "…a 20 / minutos". A clause too long for the line still wraps
                  inside itself. */}
              {descripcion.split(', ').map((clause, i, clauses) => (
                <Fragment key={i}>
                  {i > 0 && ' '}
                  <span className="inline-block">{clause}{i < clauses.length - 1 && ','}</span>
                </Fragment>
              ))}
            </p>
          </div>
        </div>

        {/* Bottom - links, as one segmented pill. The enquiry widget sits
            below the hero (see the homepage), so the photos stay clear. */}
        <div className="text-center px-6 animate-fade-in-up opacity-0" style={{ animationDelay: `${ANIMATION_TIMING.heroFadeIn.cta}s`, animationFillMode: 'forwards' }}>
          <div className="flex justify-center">
            <div className="inline-flex divide-x divide-white/40 overflow-hidden rounded-full border border-white/70 bg-black/15">
              {secondaryLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-5 py-2 sm:px-7 sm:py-2.5 text-sm sm:text-base font-medium text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:bg-white/25"
                >
                  {link.label}
                </Link>
              ))}
            </div>
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
