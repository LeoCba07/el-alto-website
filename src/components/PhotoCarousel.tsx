'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import Image from 'next/image'
import { HiOutlineChevronLeft, HiOutlineChevronRight, HiOutlineArrowsRightLeft } from 'react-icons/hi2'

interface PhotoCarouselProps {
  photos: string[]
  altPrefix?: string
  aspectRatio?: string
  enableKeyboard?: boolean
  autoPlayInterval?: number
}

export default function PhotoCarousel({
  photos,
  altPrefix = 'Foto',
  aspectRatio = 'aspect-[16/10]',
  enableKeyboard = true,
  autoPlayInterval = 5000,
}: PhotoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [showSwipeHint, setShowSwipeHint] = useState(true)
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  // Hide swipe hint after first interaction or timeout
  useEffect(() => {
    const timer = setTimeout(() => setShowSwipeHint(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  // Filter out empty strings and handle empty array
  const validPhotos = photos.filter(p => p && p.trim() !== '')

  const goToPhoto = useCallback((index: number) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex(index)
    setTimeout(() => setIsTransitioning(false), 300)
  }, [isTransitioning])

  const nextPhoto = useCallback(() => {
    goToPhoto((currentIndex + 1) % validPhotos.length)
  }, [currentIndex, validPhotos.length, goToPhoto])

  const prevPhoto = useCallback(() => {
    goToPhoto((currentIndex - 1 + validPhotos.length) % validPhotos.length)
  }, [currentIndex, validPhotos.length, goToPhoto])

  // Auto-advance
  useEffect(() => {
    if (validPhotos.length <= 1 || isPaused) return

    const interval = setInterval(() => {
      nextPhoto()
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [validPhotos.length, isPaused, autoPlayInterval, nextPhoto])

  // Keyboard navigation
  useEffect(() => {
    if (!enableKeyboard) return

    const handleKeyDown = (e: KeyboardEvent) => {
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

  // Touch/swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    setIsPaused(true)
    setShowSwipeHint(false)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) {
      setIsPaused(false)
      return
    }

    const diff = touchStartX.current - touchEndX.current
    const minSwipeDistance = 50

    if (Math.abs(diff) > minSwipeDistance) {
      if (diff > 0) {
        nextPhoto()
      } else {
        prevPhoto()
      }
    }

    touchStartX.current = null
    touchEndX.current = null
    setIsPaused(false)
  }

  if (validPhotos.length === 0) {
    return (
      <div className={`relative ${aspectRatio} rounded-xl overflow-hidden bg-sand flex items-center justify-center`}>
        <span className="text-text-light">Sin fotos</span>
      </div>
    )
  }

  return (
    <div
      className={`relative ${aspectRatio} rounded-xl overflow-hidden group`}
      role="region"
      aria-label="Galería de fotos"
      aria-roledescription="carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Images with fade transition */}
      {validPhotos.map((photo, index) => (
        <div
          key={photo}
          className={`absolute inset-0 transition-opacity duration-300 ease-in-out ${
            index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <Image
            src={photo}
            alt={`${altPrefix} - foto ${index + 1} de ${validPhotos.length}`}
            fill
            sizes="(max-width: 768px) 100vw, 60vw"
            className="object-cover"
            priority={index === 0}
          />
        </div>
      ))}

      {validPhotos.length > 1 && (
        <>
          {/* Swipe hint - mobile only */}
          <div
            className={`absolute inset-0 flex items-center justify-center z-20 pointer-events-none md:hidden transition-opacity duration-500 ${
              showSwipeHint ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2">
              <HiOutlineArrowsRightLeft className="w-5 h-5 text-white animate-pulse" />
              <span className="text-white text-sm font-medium">Deslizá</span>
            </div>
          </div>

          {/* Arrows - hidden on mobile, visible on desktop */}
          <button
            onClick={prevPhoto}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full items-center justify-center shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2 z-20 hidden md:flex"
            aria-label="Foto anterior"
          >
            <HiOutlineChevronLeft className="w-5 h-5 text-forest-dark" />
          </button>
          <button
            onClick={nextPhoto}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full items-center justify-center shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2 z-20 hidden md:flex"
            aria-label="Foto siguiente"
          >
            <HiOutlineChevronRight className="w-5 h-5 text-forest-dark" />
          </button>

          {/* Dots indicator */}
          <div
            className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20"
            role="tablist"
            aria-label="Indicadores de foto"
          >
            {validPhotos.map((_, index) => (
              <button
                key={index}
                onClick={() => goToPhoto(index)}
                role="tab"
                aria-selected={index === currentIndex}
                aria-label={`Ir a foto ${index + 1}`}
                className="p-2 -m-1 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-1 rounded-full"
              >
                <span className={`block w-2.5 h-2.5 rounded-full transition-all ${
                  index === currentIndex ? 'bg-white scale-110' : 'bg-white/50 hover:bg-white/70'
                }`} />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
