'use client'

import Link from 'next/link'
import { HiStar } from 'react-icons/hi2'
import { FiExternalLink } from 'react-icons/fi'
import { SiTripadvisor, SiGoogle } from 'react-icons/si'
import { RiDoubleQuotesL } from 'react-icons/ri'
import { FadeUp, StaggerGrid } from './ScrollAnimations'

const testimonials = [
  {
    quote: 'Excelente atención, muy buena relación precio-calidad. Volvemos siempre!',
    author: 'María L.',
    source: 'TripAdvisor',
    Icon: SiTripadvisor,
    rating: 5,
  },
  {
    quote: 'Pileta y quincho espectaculares. La vista a las sierras es hermosa. Muy tranquilo.',
    author: 'Carlos R.',
    source: 'TripAdvisor',
    Icon: SiTripadvisor,
    rating: 5,
  },
  {
    quote: 'Ubicación ideal, cerca del centro pero con toda la tranquilidad. Muy recomendable.',
    author: 'Ana G.',
    source: 'Google',
    Icon: SiGoogle,
    rating: 5,
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <HiStar
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-amber' : 'text-sand'}`}
        />
      ))}
    </div>
  )
}

export default function Testimonials() {
  return (
    <section className="bg-forest-dark py-16 md:py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 overflow-hidden">
        {/* Section Header */}
        <FadeUp>
          <div className="text-center mb-10">
            <p className="text-amber font-medium mb-2 tracking-wide uppercase text-sm">
              Testimonios
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white font-serif mb-4">
              Lo que dicen nuestros huéspedes
            </h2>
            <div className="flex items-center justify-center gap-2 text-white/80">
              <SiTripadvisor className="w-5 h-5 text-amber" />
              <span>4.6/5 en TripAdvisor · Travelers&apos; Choice Top 10%</span>
            </div>
          </div>
        </FadeUp>

        {/* Testimonials Grid */}
        <StaggerGrid className="grid md:grid-cols-3 gap-5 mb-8" staggerDelay={150}>
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative bg-white rounded-2xl shadow-sm border border-sand flex flex-col overflow-hidden"
            >
              {/* Top section - Stars and Source */}
              <div className="flex items-center justify-between p-5 border-b border-sand">
                <StarRating rating={testimonial.rating} />
                <testimonial.Icon className="w-5 h-5 text-forest/40" />
              </div>

              {/* Quote section - grows to fill space */}
              <div className="flex-1 p-5 relative">
                <RiDoubleQuotesL className="absolute top-3 right-3 w-8 h-8 text-forest/10" />
                <blockquote className="text-text-dark leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
              </div>

              {/* Author section */}
              <div className="flex items-center justify-between p-5 border-t border-sand bg-cream/50">
                <p className="font-semibold text-forest-dark">{testimonial.author}</p>
                <span className="text-xs text-text-light">{testimonial.source}</span>
              </div>
            </div>
          ))}
        </StaggerGrid>

        {/* TripAdvisor CTA */}
        <FadeUp delay={300}>
          <div className="text-center">
            <Link
              href="https://www.tripadvisor.com.ar/Hotel_Review-g1122037-d3439400-Reviews-Complejo_El_Alto-Tanti_Province_of_Cordoba_Central_Argentina.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white font-medium hover:text-amber transition-colors"
            >
              <SiTripadvisor className="w-5 h-5" />
              Ver todas las reseñas en TripAdvisor
              <FiExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
