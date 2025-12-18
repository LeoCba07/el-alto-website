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

      {/* Overlay - slightly darker for better text readability */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="max-w-4xl px-6 text-center text-white">
          <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl">
            Bienvenidos a El Alto
          </h1>
          <p className="mb-10 text-xl font-light md:text-2xl">
            Cabañas con vista panorámica en las sierras de Córdoba
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button href="#cabanas" variant="primary" size="lg">
              Ver Cabañas
            </Button>
            <Button
              href="https://wa.me/5491112345678"
              variant="outline"
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              Consultar por WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
