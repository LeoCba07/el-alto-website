'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { HiPlay } from 'react-icons/hi2'
import { SiYoutube } from 'react-icons/si'
import { FiExternalLink } from 'react-icons/fi'
import { FadeUp, StaggerGrid } from './ScrollAnimations'
import { trackEvent } from '@/lib/analytics'

export interface Video {
  id: string
  titulo: string
  descripcion?: string
}

export interface VideosSectionProps {
  videos: Video[]
  channelUrl?: string
}

// A standard YouTube embed loads about 1 MB of player per video up front.
// Show the thumbnail instead, and only mount the player once someone asks for it.
function LiteYouTube({ id, titulo }: Video) {
  const [playing, setPlaying] = useState(false)
  // Older uploads have no maxres thumbnail; hqdefault always exists.
  const [thumb, setThumb] = useState(`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`)

  if (playing) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
        title={titulo}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
      />
    )
  }

  return (
    <button
      type="button"
      onClick={() => {
        setPlaying(true)
        trackEvent('video_play', { video: id })
      }}
      aria-label={`Reproducir video: ${titulo}`}
      className="group absolute inset-0 w-full h-full cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-amber"
    >
      <Image
        src={thumb}
        alt=""
        fill
        unoptimized
        className="object-cover"
        onError={() => {
          if (thumb.includes('maxresdefault')) setThumb(`https://i.ytimg.com/vi/${id}/hqdefault.jpg`)
        }}
      />
      <span className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/90 text-forest-dark shadow-lg group-hover:scale-110 transition-transform">
          <HiPlay className="w-8 h-8 md:w-10 md:h-10 ml-1" />
        </span>
      </span>
    </button>
  )
}

export default function VideosSection({ videos, channelUrl }: VideosSectionProps) {
  return (
    <section className="bg-cream py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <FadeUp>
          <div className="text-center mb-12">
            <p className="text-forest font-medium mb-2 tracking-wide uppercase text-sm">
              Videos
            </p>
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-forest-dark mb-3">
              Conocé El Alto
            </h2>
            <p className="text-text-medium max-w-xl mx-auto">
              Recorré el complejo y los alrededores de Tanti antes de venir
            </p>
          </div>
        </FadeUp>

        <StaggerGrid
          className={videos.length === 1 ? 'max-w-4xl mx-auto mb-8' : 'grid md:grid-cols-2 gap-6 mb-8'}
          staggerDelay={150}
        >
          {videos.map((video) => (
            <div key={video.id}>
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-forest-dark shadow-sm">
                <LiteYouTube {...video} />
              </div>
              <h3 className="mt-4 font-semibold text-forest-dark">{video.titulo}</h3>
              {video.descripcion && (
                <p className="mt-1 text-sm text-text-medium">{video.descripcion}</p>
              )}
            </div>
          ))}
        </StaggerGrid>

        {channelUrl && (
          <FadeUp delay={300}>
            <div className="text-center">
              <Link
                href={channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-forest font-medium hover:text-forest-dark transition-colors"
              >
                <SiYoutube className="w-5 h-5" />
                Ver más videos en YouTube
                <FiExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </FadeUp>
        )}
      </div>
    </section>
  )
}
