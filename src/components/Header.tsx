'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { HiOutlineHome, HiOutlineHomeModern, HiOutlineSquares2X2, HiOutlineChatBubbleBottomCenterText, HiOutlineClipboardDocumentList, HiBars3, HiXMark, HiOutlineChevronRight } from 'react-icons/hi2'

const navLinks = [
  {
    href: '/',
    label: 'Inicio',
    Icon: HiOutlineHome,
  },
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
    label: 'Preguntas',
    Icon: HiOutlineChatBubbleBottomCenterText,
  },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-cream/90 backdrop-blur-md border-b border-sand/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2 rounded-lg"
          >
            <Image
              src="/icon-512.png"
              alt="Complejo El Alto"
              width={44}
              height={44}
              className="rounded-full shadow-md group-hover:scale-110 group-hover:shadow-lg transition-all duration-300"
            />
            <span className="text-xl font-bold text-forest-dark font-serif group-hover:text-forest transition-colors duration-300">
              El Alto
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group relative flex items-center gap-1.5 px-3 py-2 rounded-lg font-medium text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2 ${
                    isActive
                      ? 'text-forest bg-forest/10'
                      : 'text-text-dark hover:text-forest hover:bg-forest/5'
                  }`}
                >
                  <link.Icon className={`w-4 h-4 transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-forest' : ''}`} />
                  <span>{link.label}</span>
                  <span className={`absolute bottom-0 left-3 right-3 h-0.5 bg-forest rounded-full transition-all duration-300 ${
                    isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`} />
                </Link>
              )
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Link
              href="/contacto"
              className="group relative inline-flex items-center gap-1.5 bg-amber text-white px-5 py-2.5 rounded-full font-semibold overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-amber/25 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber focus:ring-offset-2"
            >
              <span className="absolute inset-0 bg-amber-dark translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative">Consultar</span>
              <HiOutlineChevronRight className="relative w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-text-dark hover:text-forest hover:bg-forest/10 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2"
            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            <div className="relative w-6 h-6">
              <HiBars3 className={`w-6 h-6 absolute inset-0 transition-all duration-300 ${isMenuOpen ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'}`} />
              <HiXMark className={`w-6 h-6 absolute inset-0 transition-all duration-300 ${isMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-cream/95 backdrop-blur-md border-t border-sand/50">
          <nav className="flex flex-col px-4 py-3 space-y-1">
            {navLinks.map((link, index) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-3 font-medium py-3 px-3 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-forest focus:ring-inset ${
                    isActive
                      ? 'text-forest bg-forest/10'
                      : 'text-text-dark hover:text-forest hover:bg-forest/5'
                  }`}
                  style={{ transitionDelay: isMenuOpen ? `${index * 50}ms` : '0ms' }}
                >
                  <link.Icon className="w-5 h-5" />
                  {link.label}
                </Link>
              )
            })}
            <div className="pt-3">
              <Link
                href="/contacto"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-center gap-2 bg-amber hover:bg-amber-dark text-white px-5 py-3.5 rounded-full font-semibold transition-all duration-300 w-full hover:shadow-lg hover:shadow-amber/25 focus:outline-none focus:ring-2 focus:ring-amber focus:ring-offset-2"
              >
                Consultar
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
