'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { HiPlay } from 'react-icons/hi2'
import { SiYoutube } from 'react-icons/si'
import { FadeUp, StaggerGrid } from './ScrollAnimations'
import { trackEvent } from '@/lib/analytics'

export interface Video {
  id: string
  titulo: string
  descripcion?: string
  // Resolved on the server by youtubeThumbnail().
  thumb: string
}

export interface VideosSectionProps {
  videos: Video[]
  channelUrl?: string
}

// A standard YouTube embed loads about 1 MB of player per video up front.
// Show the thumbnail instead, and only mount the player once someone asks for it.
function VideoCard({ id, titulo, descripcion, thumb }: Video) {
  const [playing, setPlaying] = useState(false)

  return (
    <div className="relative aspect-video rounded-2xl overflow-hidden bg-forest-dark shadow-lg">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={titulo}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      ) : (
        <>
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
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            {/* The service cards' scrim, so the title reads over any frame. */}
            <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-forest-dark/85 text-white ring-1 ring-white/40 shadow-lg transition-transform group-hover:scale-110">
                <HiPlay className="w-6 h-6 md:w-7 md:h-7 ml-0.5" aria-hidden="true" />
              </span>
            </span>
          </button>
          {/* Beside the button rather than in it: a heading can't sit inside
              a button. It lets clicks through to the button underneath. */}
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 p-4 md:p-5 text-left text-white">
            <h3 className="font-bold text-base md:text-lg">{titulo}</h3>
            {descripcion && (
              <p className="mt-1 text-sm text-white/90 line-clamp-2">{descripcion}</p>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default function VideosSection({ videos, channelUrl }: VideosSectionProps) {
  const single = videos.length === 1

  return (
    <section className="bg-cream py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header: kicker, title and subtitle, like the other homepage sections */}
        <FadeUp>
          <div className="text-center mb-12">
            <p className="text-forest font-medium mb-2 tracking-wide uppercase text-sm">
              Videos
            </p>
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-forest-dark text-balance mb-3">
              Un vistazo antes de llegar
            </h2>
            <p className="text-text-medium max-w-xl mx-auto">
              El complejo y los alrededores de Tanti, en video
            </p>
          </div>
        </FadeUp>

        {/* Phones: one row that scrolls sideways, each card 85% wide so the
            next one peeks in; stacked, the two 16:9 cards ran about 560px
            tall. The vertical padding keeps the cards' shadow from being
            clipped by the scroller. From md up, a two-column grid. */}
        <StaggerGrid
          className={
            single
              ? 'max-w-4xl mx-auto mb-8'
              : '-mx-4 -mt-3 mb-5 px-4 py-3 flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden *:w-[85%] *:shrink-0 *:snap-start md:mx-0 md:mt-0 md:mb-8 md:p-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:*:w-auto'
          }
          staggerDelay={150}
        >
          {videos.map((video) => (
            <VideoCard key={video.id} {...video} />
          ))}
        </StaggerGrid>

        {channelUrl && (
          <FadeUp delay={300}>
            <div className="text-center">
              <Link
                href={channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-forest/30 px-5 py-2.5 text-sm font-medium text-forest transition-colors hover:border-forest hover:bg-forest hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
              >
                <SiYoutube className="w-4 h-4" aria-hidden="true" />
                Ver más videos en YouTube
              </Link>
            </div>
          </FadeUp>
        )}
      </div>
    </section>
  )
}
