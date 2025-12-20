'use client'

import { useState } from 'react'
import Link from 'next/link'
import { HiOutlineHomeModern, HiOutlineSquares2X2, HiOutlineChatBubbleBottomCenterText, HiOutlineClipboardDocumentList, HiBars3, HiXMark } from 'react-icons/hi2'

const navLinks = [
  {
    href: '/cabanas',
    label: 'Cabañas',
    Icon: HiOutlineHomeModern,
  },
  {
    href: '/servicios',
    label: 'Servicios',
    Icon: HiOutlineSquares2X2,
  },
  {
    href: '/normas',
    label: 'Normas',
    Icon: HiOutlineClipboardDocumentList,
  },
  {
    href: '/consultas-frecuentes',
    label: 'FAQ',
    Icon: HiOutlineChatBubbleBottomCenterText,
  },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl md:text-2xl font-bold text-forest font-serif hover:text-forest-dark transition-colors"
          >
            El Alto
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-1.5 text-text-dark hover:text-forest transition-colors font-medium text-sm"
              >
                <link.Icon className="w-4 h-4" />
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 bg-amber hover:bg-amber-dark text-white px-5 py-2.5 rounded-full font-semibold transition-colors"
            >
              Consultar disponibilidad
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-text-dark hover:text-forest transition-colors"
            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {isMenuOpen ? (
              <HiXMark className="w-6 h-6" />
            ) : (
              <HiBars3 className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-cream border-t border-sand">
          <nav className="flex flex-col px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 text-text-dark hover:text-forest hover:bg-sand/50 transition-colors font-medium py-2.5 px-2 rounded-lg"
              >
                <link.Icon className="w-5 h-5" />
                {link.label}
              </Link>
            ))}
            <div className="pt-3">
              <Link
                href="/contacto"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-center gap-2 bg-amber hover:bg-amber-dark text-white px-5 py-3 rounded-full font-semibold transition-colors w-full"
              >
                Consultar disponibilidad
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
