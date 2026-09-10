import Link from 'next/link'
import { SiWhatsapp } from 'react-icons/si'

/** Closing call to action shared by the units and rates pages. */
export default function PageCTA() {
  return (
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
        className="inline-flex items-center gap-2 bg-amber text-text-dark px-8 py-4 rounded-full font-semibold text-lg hover:bg-amber-dark transition-colors shadow-lg"
      >
        <SiWhatsapp className="w-5 h-5" />
        Consultar disponibilidad
      </Link>
    </div>
  </section>
  )
}
