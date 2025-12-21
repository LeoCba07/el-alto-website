import Link from 'next/link'
import { HiOutlineMapPin, HiOutlineHome, HiOutlineArrowRight } from 'react-icons/hi2'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-forest/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <HiOutlineMapPin className="w-8 h-8 text-forest" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-forest-dark font-serif mb-3">
          Página no encontrada
        </h1>
        <p className="text-text-medium mb-8">
          Parece que te perdiste en las sierras. Esta página no existe o fue movida.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-forest-dark text-white px-6 py-3 rounded-full font-semibold hover:bg-forest transition-colors"
          >
            <HiOutlineHome className="w-5 h-5" />
            Ir al inicio
          </Link>
          <Link
            href="/cabanas"
            className="inline-flex items-center justify-center gap-2 bg-white text-forest-dark border border-sand px-6 py-3 rounded-full font-semibold hover:border-forest transition-colors group"
          >
            Ver cabañas
            <HiOutlineArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  )
}
