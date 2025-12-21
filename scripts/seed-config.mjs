// Seed site configuration to Sanity
// Run with: node scripts/seed-config.mjs

import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'

// Load .env.local manually
const envFile = readFileSync('.env.local', 'utf-8')
envFile.split('\n').forEach(line => {
  const [key, ...valueParts] = line.split('=')
  if (key && valueParts.length) {
    process.env[key.trim()] = valueParts.join('=').trim()
  }
})

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

// Site configuration - matches current constants.ts values
const siteConfig = {
  _id: 'configuracionSitio',
  _type: 'configuracionSitio',
  numeroWhatsapp: '5493572501030',
  email: 'info@complejoelalto.com.ar',
  telefonoFijo: '+5403541498970',
  telefonoMovil: '+5493572501030',
  horarios: {
    checkIn: '13:30',
    checkOut: '10:00',
    lateCheckOut: '18:00',
    lateCheckOutRecargo: 50,
    llegadaMaxima: '20:00',
    pileta: {
      apertura: '9:30',
      cierre: '22:00',
    },
    recepcion: {
      apertura: '9:00',
      cierre: '19:00',
    },
  },
  politicasReserva: {
    senaPorcentaje: 30,
    senaPorcentajeCorta: 50,
    estadiaCortaMaxNoches: 2,
    cancelacionAltaMedia: {
      reembolsoTotalDias: 30,
      reembolsoParcialDias: 15,
    },
    cancelacionBaja: {
      reembolsoTotalHoras: 72,
    },
    mediosDePago: ['Transferencia bancaria', 'Mercado Pago'],
  },
  estadisticas: {
    anosExperiencia: 28,
    tripAdvisorRating: 4.6,
    tripAdvisorMaxRating: 5,
    cantidadResenas: 150,
    rankingEnTanti: 1,
  },
  redesSociales: {
    facebook: 'https://facebook.com/complejoelalto',
    instagram: 'https://instagram.com/complejoelalto',
    tripadvisor: 'https://www.tripadvisor.com.ar/Hotel_Review-g1122037-d3439400-Reviews-Complejo_El_Alto-Tanti_Province_of_Cordoba_Central_Argentina.html',
  },
  direccion: {
    calle: 'Ruta Provincial N°28 y San Martín 1130',
    ciudad: 'Tanti',
    provincia: 'Córdoba',
    codigoPostal: '5155',
    ubicacion: {
      lat: -31.3607,
      lng: -64.5876,
    },
  },
}

async function seed() {
  console.log('Seeding site configuration to Sanity...\n')

  try {
    await client.createOrReplace(siteConfig)
    console.log('✓ Configuración del sitio creada/actualizada')
    console.log('\nDatos guardados:')
    console.log('  - Horarios: check-in, check-out, pileta, recepción')
    console.log('  - Políticas: seña, cancelación, medios de pago')
    console.log('  - Estadísticas: años, rating, reseñas, ranking')
    console.log('  - Contacto: WhatsApp, email, teléfonos')
    console.log('  - Redes sociales y dirección')
  } catch (error) {
    console.error('✗ Error:', error.message)
  }

  console.log('\nDone! Configuration has been seeded to Sanity.')
  console.log('You can now edit it in Sanity Studio under "Configuración del Sitio"')
}

seed().catch(console.error)
