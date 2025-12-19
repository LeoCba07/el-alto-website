'use client'

import Image from 'next/image'
import Button from './Button'

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/panorama-pileta.jpg"
        alt="Vista panorámica de la pileta en El Alto"
        fill
        className="object-cover"
        priority
        quality={90}
      />

      {/* Gradient overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="max-w-4xl px-6 text-center text-white drop-shadow-lg">
          <p className="mb-2 font-medium tracking-widest uppercase text-sm md:text-base drop-shadow-md">
            Complejo de cabañas
          </p>
          <h1 className="mb-4 text-5xl font-bold leading-tight md:text-6xl lg:text-7xl font-serif drop-shadow-xl">
            El Alto
          </h1>
          <p className="mb-6 text-xl md:text-2xl lg:text-3xl font-normal drop-shadow-md">
            Tu refugio en las sierras
          </p>
          <p className="mb-10 text-sm md:text-base text-amber-light tracking-wide drop-shadow-md font-medium">
            Desde 1996 en Tanti, Córdoba · A 10 minutos de Villa Carlos Paz
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center drop-shadow-lg">
            <Button href="/cabanas" variant="primary" size="lg" className="shadow-xl">
              Ver alojamientos
            </Button>
            <Button href="/contacto" variant="outline-light" size="lg" className="shadow-xl backdrop-blur-sm bg-white/10">
              Consultar disponibilidad
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce cursor-pointer hover:scale-110 transition-transform"
        aria-label="Scroll hacia abajo"
      >
        <svg className="w-6 h-6 text-white/70 hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </button>
    </section>
  )
}
