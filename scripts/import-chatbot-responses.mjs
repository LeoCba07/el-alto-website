// Import Chatbot Responses to Sanity
// Run with: SANITY_API_TOKEN=your_token node scripts/import-chatbot-responses.mjs

const PROJECT_ID = 'tw1o0dkg'
const DATASET = 'production'
const TOKEN = process.env.SANITY_API_TOKEN

if (!TOKEN) {
  console.error('Missing SANITY_API_TOKEN environment variable')
  process.exit(1)
}

const API_URL = `https://${PROJECT_ID}.api.sanity.io/v2024-01-01/data/mutate/${DATASET}`

async function createDocument(doc) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${TOKEN}`
    },
    body: JSON.stringify({
      mutations: [{ create: doc }]
    })
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to create ${doc._type}: ${error}`)
  }

  return response.json()
}

const chatbotResponses = [
  {
    _type: 'chatbotRespuesta',
    clave: 'tarifas',
    respuesta: 'Las tarifas varian segun la temporada y el tipo de cabana. Temporada alta (dic-feb, Semana Santa, vacaciones de invierno): desde $45.000/noche. Temporada media: desde $35.000/noche. Temporada baja: desde $28.000/noche.',
    opcionesSeguimiento: ['ver_tarifas', 'consultar_disponibilidad', 'otra_pregunta']
  },
  {
    _type: 'chatbotRespuesta',
    clave: 'disponibilidad',
    respuesta: 'Genial! Para consultar disponibilidad necesito algunos datos.',
    opcionesSeguimiento: ['iniciar_consulta']
  },
  {
    _type: 'chatbotRespuesta',
    clave: 'servicios',
    respuesta: 'Todas las cabanas incluyen: Wi-Fi gratis, cochera cubierta, ropa de cama y toallas, cocina equipada, y acceso a pileta y quincho con asadores.',
    opcionesSeguimiento: ['mas_servicios', 'consultar_disponibilidad', 'otra_pregunta']
  },
  {
    _type: 'chatbotRespuesta',
    clave: 'mas_servicios',
    respuesta: 'Tambien contamos con: pileta al aire libre (climatizada en primavera/otono), quincho con asadores para uso comun, jardin con vistas a las sierras, y estamos a 500m del centro de Tanti.',
    opcionesSeguimiento: ['consultar_disponibilidad', 'otra_pregunta']
  },
  {
    _type: 'chatbotRespuesta',
    clave: 'ubicacion',
    respuesta: 'Estamos en Ruta Provincial N28 y San Martin 1130, Tanti, Cordoba. A solo 10 minutos de Villa Carlos Paz y 500m del centro de Tanti.',
    opcionesSeguimiento: ['como_llegar', 'consultar_disponibilidad', 'otra_pregunta']
  },
  {
    _type: 'chatbotRespuesta',
    clave: 'como_llegar',
    respuesta: 'Desde Cordoba Capital: tomar Ruta 20 hacia Villa Carlos Paz, luego Ruta 28 hacia Tanti (10 min). Nuestra entrada esta sobre la Ruta 28.',
    opcionesSeguimiento: ['ver_mapa', 'consultar_disponibilidad', 'otra_pregunta']
  },
  {
    _type: 'chatbotRespuesta',
    clave: 'checkin',
    respuesta: 'Check-in: desde las 13:30 hs (llegada maxima 20:00 hs). Check-out: hasta las 10:00 hs. Late check-out hasta 18:00 hs con 50% adicional.',
    opcionesSeguimiento: ['consultar_disponibilidad', 'otra_pregunta']
  },
  {
    _type: 'chatbotRespuesta',
    clave: 'cabanas',
    respuesta: 'Tenemos 12 cabanas de 4 tipos: Duplex (hasta 6 personas), Estandar (2-4 personas), Compactas (2-3 personas) y Parejas (2 personas). Todas equipadas con cocina, bano privado y calefaccion.',
    opcionesSeguimiento: ['ver_cabanas', 'consultar_disponibilidad', 'otra_pregunta']
  },
  {
    _type: 'chatbotRespuesta',
    clave: 'mascotas',
    respuesta: 'Lo sentimos, no aceptamos mascotas en el complejo para mantener la tranquilidad de todos los huespedes.',
    opcionesSeguimiento: ['consultar_disponibilidad', 'otra_pregunta']
  },
  {
    _type: 'chatbotRespuesta',
    clave: 'pago',
    respuesta: 'Para reservar se requiere una sena del 30% (50% para estadias de 2 noches o menos). Aceptamos transferencia bancaria y Mercado Pago.',
    opcionesSeguimiento: ['consultar_disponibilidad', 'otra_pregunta']
  },
]

async function main() {
  console.log('Importing chatbot responses to Sanity...\n')

  for (const response of chatbotResponses) {
    try {
      await createDocument(response)
      console.log(`✓ ${response.clave}`)
    } catch (error) {
      console.error(`✗ ${response.clave}: ${error.message}`)
    }
  }

  console.log('\nDone!')
}

main()
