'use client'

import { useState } from 'react'
import Link from 'next/link'
import Button from './Button'

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/cabanas', label: 'Cabañas' },
  { href: '/preguntas-frecuentes', label: 'Preguntas Frecuentes' },
  { href: '/contacto', label: 'Contacto' },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl md:text-2xl font-bold text-forest font-serif hover:text-forest-light transition-colors"
          >
            El Alto
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-text-dark hover:text-forest transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA - Links to contact form, NOT direct WhatsApp */}
          <div className="hidden md:block">
            <Button
              href="/contacto"
              variant="primary"
              size="sm"
            >
              Consultar disponibilidad
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-text-dark hover:text-forest transition-colors"
            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {isMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-cream border-t border-sand">
          <nav className="flex flex-col px-4 py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-text-dark hover:text-forest transition-colors font-medium py-2"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2">
              <Button
                href="/contacto"
                variant="primary"
                size="md"
                className="w-full"
              >
                Consultar disponibilidad
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
