import { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { configuracionSitioQuery } from '@/sanity/lib/queries'
import { SITE_CONFIG } from '@/lib/constants'
import { SiteConfig } from '@/lib/types'

// Force dynamic rendering so the contact email follows the Studio
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Privacidad',
  description: 'El sitio de Complejo El Alto no guarda tus datos. Solo usa Google Analytics para contar visitas.',
  alternates: {
    canonical: '/privacidad',
  },
}

async function getConfig() {
  try {
    return await client.fetch<SiteConfig | null>(configuracionSitioQuery)
  } catch {
    return null
  }
}

const linkClass = 'text-forest underline underline-offset-2 hover:text-forest-light'

// Google Analytics' terms require disclosing its use and its cookies. The site
// stores nothing else, so this page says only that.
export default async function PrivacidadPage() {
  const config = await getConfig()
  const email = config?.email || SITE_CONFIG.EMAIL

  return (
    <section className="bg-cream pt-24 md:pt-28 pb-12">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-2xl md:text-3xl font-serif font-bold text-forest-dark mb-4">Privacidad</h1>
        <div className="bg-white rounded-2xl border border-sand p-6 md:p-8 space-y-4 text-text-medium leading-relaxed">
          <p>
            Este sitio no guarda tus datos. El formulario y el chat solo arman un mensaje y abren WhatsApp;
            nada se envía hasta que lo mandás vos.
          </p>
          <p>
            Usamos Google Analytics para saber cuántas personas visitan el sitio. Para eso guarda cookies en
            tu navegador. Podés bloquearlas desde la configuración del navegador o con el{' '}
            <a
              href="https://tools.google.com/dlpage/gaoptout?hl=es"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              complemento de Google
            </a>
            , y el sitio funciona igual.
          </p>
          <p>
            ¿Dudas? Escribinos a <a href={`mailto:${email}`} className={linkClass}>{email}</a>.
          </p>
        </div>
      </div>
    </section>
  )
}
