import { client } from '@/sanity/lib/client'
import {
  preguntasFrecuentesQuery,
  chatbotRespuestasQuery,
  configuracionSitioQuery,
  tarifasTemporadaQuery,
} from '@/sanity/lib/queries'
import ChatBot, { type ChatbotRespuesta, type TarifasData } from '@/components/ChatBot'
import { SiteConfig } from '@/lib/types'
import FAQClient, { FAQCategory } from './FAQClient'

// Force dynamic rendering to show Sanity updates immediately
export const dynamic = 'force-dynamic'

interface SanityPregunta {
  _id: string
  pregunta: string
  respuesta: string
  categoria: string
}

const categoryLabels: Record<string, string> = {
  reservas: 'Reservas',
  horarios: 'Horarios',
  servicios: 'Servicios',
  normas: 'Normas',
  ubicacion: 'Ubicación',
}

interface SanityTarifasDocument {
  temporadaAlta?: TarifasData['alta']
  temporadaMedia?: TarifasData['media']
  temporadaBaja?: TarifasData['baja']
}

async function getFAQData() {
  try {
    const preguntas = await client.fetch<SanityPregunta[]>(preguntasFrecuentesQuery)
    return preguntas
  } catch {
    return null
  }
}

// The assistant lives on this page only, so its data is fetched here rather
// than in the root layout, where every page paid for it.
async function getChatBotData() {
  try {
    const [respuestas, config, tarifasDoc] = await Promise.all([
      client.fetch<ChatbotRespuesta[]>(chatbotRespuestasQuery),
      client.fetch<SiteConfig | null>(configuracionSitioQuery),
      client.fetch<SanityTarifasDocument | null>(tarifasTemporadaQuery),
    ])

    const tarifas: TarifasData | undefined =
      tarifasDoc?.temporadaAlta && tarifasDoc?.temporadaMedia && tarifasDoc?.temporadaBaja
        ? {
            alta: tarifasDoc.temporadaAlta,
            media: tarifasDoc.temporadaMedia,
            baja: tarifasDoc.temporadaBaja,
          }
        : undefined

    return { respuestas, config, tarifas }
  } catch {
    return { respuestas: undefined, config: null, tarifas: undefined }
  }
}

export default async function FAQPage() {
  const [preguntasData, chatBot] = await Promise.all([getFAQData(), getChatBotData()])

  // Group questions by category
  let categories: FAQCategory[] | undefined

  if (preguntasData?.length) {
    const grouped: Record<string, FAQCategory> = {}

    preguntasData.forEach((p) => {
      if (!grouped[p.categoria]) {
        grouped[p.categoria] = {
          id: p.categoria,
          label: categoryLabels[p.categoria] || p.categoria,
          questions: [],
        }
      }
      grouped[p.categoria].questions.push({
        pregunta: p.pregunta,
        respuesta: p.respuesta,
      })
    })

    // Order categories in a specific order
    const categoryOrder = ['reservas', 'horarios', 'servicios', 'normas', 'ubicacion']
    categories = categoryOrder
      .filter((cat) => grouped[cat])
      .map((cat) => grouped[cat])
  }

  // FAQ structured data built from the same Sanity content the page renders,
  // so the JSON-LD always matches what Google sees on the page
  const faqJsonLd = preguntasData?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: preguntasData.map((p) => ({
          '@type': 'Question',
          name: p.pregunta,
          acceptedAnswer: { '@type': 'Answer', text: p.respuesta },
        })),
      }
    : null

  return (
    <>
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, '\\u003c') }}
        />
      )}
      <FAQClient categories={categories} />
      <ChatBot
        respuestas={chatBot.respuestas}
        siteConfig={chatBot.config}
        tarifas={chatBot.tarifas}
        positionClassName="bottom-24 right-4 md:right-6"
      />
    </>
  )
}
