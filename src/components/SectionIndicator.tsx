'use client'

import { useState, useEffect } from 'react'

interface Section {
  id: string
  label: string
}

const SECTIONS: Section[] = [
  { id: 'hero', label: 'Inicio' },
  { id: 'cabanas', label: 'Alojamiento' },
  { id: 'servicios', label: 'Servicios' },
  { id: 'ubicacion', label: 'Ubicación' },
  { id: 'testimonios', label: 'Testimonios' },
  { id: 'contacto', label: 'Contacto' },
]

export default function SectionIndicator() {
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      const screenMiddle = window.scrollY + window.innerHeight / 2

      // Find which section is currently in the middle of the screen
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const section = document.getElementById(SECTIONS[i].id)
        if (section) {
          const sectionTop = section.offsetTop
          const sectionBottom = sectionTop + section.offsetHeight
          // Section is active when middle of screen is within its bounds
          if (screenMiddle >= sectionTop && screenMiddle < sectionBottom) {
            setActiveSection(SECTIONS[i].id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Check initial position

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav
      className="fixed left-5 top-1/2 -translate-y-1/2 z-40 hidden lg:block"
      aria-label="Navegación de secciones"
    >
      <div className="bg-black/60 backdrop-blur-sm rounded-full py-4 px-2.5 flex flex-col items-center gap-4">
        {SECTIONS.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className="group relative flex items-center"
            aria-label={`Ir a ${section.label}`}
            aria-current={activeSection === section.id ? 'true' : undefined}
          >
            {/* Dot - expands to bar when active */}
            <span
              className={`rounded-full transition-all duration-500 ease-out ${
                activeSection === section.id
                  ? 'w-2.5 h-6 bg-white'
                  : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70'
              }`}
            />
            {/* Label on hover */}
            <span className="absolute left-8 px-3 py-1.5 bg-black/80 text-white text-sm rounded-lg whitespace-nowrap opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 pointer-events-none shadow-lg">
              {section.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  )
}
