import { client } from '@/sanity/lib/client'
import { preguntasFrecuentesQuery } from '@/sanity/lib/queries'
import FAQClient, { FAQCategory } from './FAQClient'

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

async function getFAQData() {
  try {
    const preguntas = await client.fetch<SanityPregunta[]>(preguntasFrecuentesQuery, {}, {
      next: { revalidate: 60 }
    })
    return preguntas
  } catch {
    return null
  }
}

export default async function FAQPage() {
  const preguntasData = await getFAQData()

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

  return <FAQClient categories={categories} />
}
