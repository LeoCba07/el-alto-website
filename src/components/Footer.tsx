import Link from 'next/link'
import { HiOutlineMapPin, HiOutlinePhone, HiOutlineEnvelope } from 'react-icons/hi2'
import { SiInstagram, SiFacebook, SiTripadvisor } from 'react-icons/si'

const navLinksLeft = [
  { href: '/', label: 'Inicio' },
  { href: '/cabanas', label: 'Cabañas' },
  { href: '/servicios', label: 'Servicios' },
]

const navLinksRight = [
  { href: '/consultas-frecuentes', label: 'FAQ' },
  { href: '/normas', label: 'Normas' },
  { href: '/contacto', label: 'Contacto' },
]

const socialLinks = [
  {
    href: 'https://instagram.com/complejoelalto',
    label: 'Instagram',
    Icon: SiInstagram,
  },
  {
    href: 'https://facebook.com/complejoelalto',
    label: 'Facebook',
    Icon: SiFacebook,
  },
  {
    href: 'https://www.tripadvisor.com.ar/Hotel_Review-g1122037-d3439400-Reviews-Complejo_El_Alto-Tanti_Province_of_Cordoba_Central_Argentina.html',
    label: 'TripAdvisor',
    Icon: SiTripadvisor,
  },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-forest-dark text-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* Brand */}
          <div>
            <Link href="/" className="text-xl font-bold text-cream font-serif hover:text-amber transition-colors">
              El Alto
            </Link>
            <p className="mt-2 text-cream/70 text-sm">
              Cabañas en las sierras de Córdoba desde 1996.
            </p>
          </div>

          {/* Navigation - 2 columns */}
          <div className="flex gap-8">
            <ul className="space-y-1.5">
              {navLinksLeft.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-cream/70 hover:text-amber transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="space-y-1.5">
              {navLinksRight.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-cream/70 hover:text-amber transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="text-sm text-cream/70 space-y-1.5">
            <p className="flex items-center gap-2">
              <HiOutlinePhone className="w-4 h-4 text-amber" />
              (03541) 498970
            </p>
            <p className="flex items-center gap-2">
              <HiOutlineEnvelope className="w-4 h-4 text-amber" />
              <a href="mailto:info@complejoelalto.com.ar" className="hover:text-amber transition-colors">
                info@complejoelalto.com.ar
              </a>
            </p>
            <p className="flex items-start gap-2">
              <HiOutlineMapPin className="w-4 h-4 text-amber mt-0.5" />
              <span>Tanti, Córdoba</span>
            </p>
          </div>

          {/* Social & Hours */}
          <div>
            <div className="flex gap-2 mb-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-amber transition-colors"
                  aria-label={social.label}
                >
                  <social.Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            <p className="text-xs text-cream/60">
              Check-in 13:30 · Check-out 10:00
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-6 pt-4 border-t border-cream/10 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-cream/50">
          <p>© {currentYear} Complejo El Alto</p>
          <p>Legajo N°272/07 — Agencia Córdoba Turismo</p>
        </div>
      </div>
    </footer>
  )
}
