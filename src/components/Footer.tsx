'use client'

import Link from 'next/link'
import Image from 'next/image'
import { HiOutlineMapPin, HiOutlinePhone, HiOutlineEnvelope, HiOutlineDevicePhoneMobile } from 'react-icons/hi2'
import { SiInstagram, SiFacebook, SiTripadvisor } from 'react-icons/si'

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/cabanas', label: 'Cabañas' },
  { href: '/servicios', label: 'Servicios' },
  { href: '/normas', label: 'Normas' },
  { href: '/consultas-frecuentes', label: 'Preguntas' },
  { href: '/contacto', label: 'Contacto' },
]

const socialLinks = [
  { href: 'https://instagram.com/complejoelalto', label: 'Instagram', Icon: SiInstagram },
  { href: 'https://facebook.com/complejoelalto', label: 'Facebook', Icon: SiFacebook },
  { href: 'https://www.tripadvisor.com.ar/Hotel_Review-g1122037-d3439400-Reviews-Complejo_El_Alto-Tanti_Province_of_Cordoba_Central_Argentina.html', label: 'TripAdvisor', Icon: SiTripadvisor },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-forest-dark text-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Top row: Brand + Nav + Social */}
        <div className="flex flex-col items-center lg:flex-row lg:justify-between gap-6 pb-6 border-b border-cream/10">
          {/* Brand */}
          <Link href="/" className="group flex items-center gap-2.5">
            <Image
              src="/icon-512.png"
              alt="Complejo El Alto"
              width={44}
              height={44}
              className="rounded-full ring-2 ring-white/20 group-hover:ring-amber group-hover:scale-110 transition-all duration-300"
            />
            <span className="text-xl font-bold text-white font-serif group-hover:text-amber transition-colors">
              El Alto
            </span>
          </Link>

          {/* Nav links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-cream/70 hover:text-amber transition-colors text-sm"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Social icons */}
          <div className="flex justify-center lg:justify-start gap-2">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-amber hover:scale-110 transition-all duration-300"
                aria-label={social.label}
              >
                <social.Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Middle row: Contact info */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 py-5 text-sm text-cream/70">
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=-31.3607,-64.5876"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-amber transition-colors"
          >
            <HiOutlineMapPin className="w-4 h-4 text-amber flex-shrink-0" />
            Ruta Provincial N°28 y San Martín 1130, Tanti, Córdoba
          </a>
          <a href="tel:+5493572501030" className="flex items-center gap-2 hover:text-amber transition-colors">
            <HiOutlineDevicePhoneMobile className="w-4 h-4 text-amber" />
            (3572) 501030
          </a>
          <a href="mailto:info@complejoelalto.com.ar" className="flex items-center gap-2 hover:text-amber transition-colors">
            <HiOutlineEnvelope className="w-4 h-4 text-amber" />
            info@complejoelalto.com.ar
          </a>
        </div>

        {/* Bottom row: Copyright + Legajo + Dev credit */}
        <div className="pt-4 border-t border-cream/10 flex flex-col sm:flex-row justify-center items-center gap-x-6 gap-y-1 text-xs text-cream/70">
          <p>© {currentYear} Complejo El Alto</p>
          <span className="hidden sm:inline">·</span>
          <p>Legajo N°272/07 — Agencia Córdoba Turismo</p>
          <span className="hidden sm:inline">·</span>
          <p>
            Desarrollado por{' '}
            <a
              href="https://www.linkedin.com/in/leandro-trabucco"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber transition-colors"
            >
              Leandro Trabucco
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
