'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { HiOutlineExclamationTriangle, HiOutlineArrowPath, HiOutlineHome } from 'react-icons/hi2'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-amber/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <HiOutlineExclamationTriangle className="w-8 h-8 text-amber" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-forest-dark font-serif mb-3">
          Algo salió mal
        </h1>
        <p className="text-text-medium mb-8">
          Ocurrió un error inesperado. Por favor, intentá de nuevo o volvé al inicio.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 bg-forest-dark text-white px-6 py-3 rounded-full font-semibold hover:bg-forest transition-colors"
          >
            <HiOutlineArrowPath className="w-5 h-5" />
            Intentar de nuevo
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-white text-forest-dark border border-sand px-6 py-3 rounded-full font-semibold hover:border-forest transition-colors"
          >
            <HiOutlineHome className="w-5 h-5" />
            Ir al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}
