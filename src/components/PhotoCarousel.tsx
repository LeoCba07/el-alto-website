'use client'

import { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi2'

interface PhotoCarouselProps {
  photos: string[]
  altPrefix?: string
  aspectRatio?: string
  enableKeyboard?: boolean
}

export default function PhotoCarousel({
  photos,
  altPrefix = 'Foto',
  aspectRatio = 'aspect-[16/10]',
  enableKeyboard = true,
}: PhotoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Filter out empty strings and handle empty array
  const validPhotos = photos.filter(p => p && p.trim() !== '')

  if (validPhotos.length === 0) {
    return (
      <div className={`relative ${aspectRatio} rounded-xl overflow-hidden bg-sand flex items-center justify-center`}>
        <span className="text-text-light">Sin fotos</span>
      </div>
    )
  }

  const nextPhoto = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % validPhotos.length)
  }, [validPhotos.length])

  const prevPhoto = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + validPhotos.length) % validPhotos.length)
  }, [validPhotos.length])

  // Keyboard navigation
  useEffect(() => {
    if (!enableKeyboard) return

    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle if carousel is focused or no other input is focused
      const activeElement = document.activeElement
      const isInputFocused = activeElement?.tagName === 'INPUT' ||
                             activeElement?.tagName === 'TEXTAREA' ||
                             activeElement?.tagName === 'SELECT'

      if (isInputFocused) return

      if (e.key === 'ArrowLeft') {
        prevPhoto()
      } else if (e.key === 'ArrowRight') {
        nextPhoto()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [enableKeyboard, nextPhoto, prevPhoto])

  return (
    <div
      className={`relative ${aspectRatio} rounded-xl overflow-hidden group`}
      role="region"
      aria-label="Galería de fotos"
      aria-roledescription="carousel"
    >
      <Image
        src={validPhotos[currentIndex]}
        alt={`${altPrefix} - foto ${currentIndex + 1} de ${validPhotos.length}`}
        fill
        className="object-cover"
      />
      {validPhotos.length > 1 && (
        <>
          <button
            onClick={prevPhoto}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2"
            aria-label="Foto anterior"
          >
            <HiOutlineChevronLeft className="w-5 h-5 text-forest-dark" />
          </button>
          <button
            onClick={nextPhoto}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2"
            aria-label="Foto siguiente"
          >
            <HiOutlineChevronRight className="w-5 h-5 text-forest-dark" />
          </button>
          <div
            className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2"
            role="tablist"
            aria-label="Indicadores de foto"
          >
            {validPhotos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                role="tab"
                aria-selected={index === currentIndex}
                aria-label={`Ir a foto ${index + 1}`}
                className={`w-2.5 h-2.5 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-1 ${
                  index === currentIndex ? 'bg-white scale-110' : 'bg-white/50 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
