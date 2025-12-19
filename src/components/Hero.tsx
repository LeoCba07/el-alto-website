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
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="max-w-4xl px-6 text-center text-white">
          <p className="mb-4 text-amber font-medium tracking-widest uppercase text-sm md:text-base">
            Desde 1996 en Tanti, Córdoba
          </p>
          <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl font-serif">
            Tu refugio en las sierras
          </h1>
          <p className="mb-10 text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Departamentos y cabañas con pileta, parrilla y vista a las montañas.
            A 10 minutos de Villa Carlos Paz.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button href="/cabanas" variant="primary" size="lg">
              Ver alojamientos
            </Button>
            <Button href="/contacto" variant="outline-light" size="lg">
              Consultar disponibilidad
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <svg className="w-6 h-6 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}
