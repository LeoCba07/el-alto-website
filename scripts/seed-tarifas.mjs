// Seed tarifas to Sanity
// Run with: node scripts/seed-tarifas.mjs

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

// Current tarifas - these are the source of truth
const tarifas = [
  {
    _id: 'tarifa-alta',
    _type: 'tarifaTemporada',
    temporada: 'alta',
    nombre: 'Temporada Alta',
    periodo: 'Dic 28 - Feb, Carnaval, Semana Santa',
    precios: [
      { capacidad: '2 personas', precio: 60000 },
      { capacidad: '2 + 1 menor', precio: 75000 },
      { capacidad: '2 a 4 personas', precio: 90000 },
      { capacidad: '4 a 5 personas', precio: 110000 },
      { capacidad: '5 a 6 personas', precio: 129000 },
    ],
    orden: 1,
  },
  {
    _id: 'tarifa-media',
    _type: 'tarifaTemporada',
    temporada: 'media',
    nombre: 'Temporada Media',
    periodo: 'Marzo, Diciembre, fines de semana largos, vacaciones de Julio',
    precios: [
      { capacidad: '2 personas', precio: 55000 },
      { capacidad: '2 + 1 menor', precio: 68000 },
      { capacidad: '2 a 4 personas', precio: 85000 },
      { capacidad: '4 a 5 personas', precio: 90000 },
      { capacidad: '5 a 6 personas', precio: 99000 },
    ],
    orden: 2,
  },
  {
    _id: 'tarifa-baja',
    _type: 'tarifaTemporada',
    temporada: 'baja',
    nombre: 'Temporada Baja',
    periodo: 'Resto del año',
    precios: [
      { capacidad: '2 personas', precio: 49000 },
      { capacidad: '2 + 1 menor', precio: 60000 },
      { capacidad: '2 a 4 personas', precio: 75000 },
      { capacidad: '5 a 6 personas', precio: 89000 },
    ],
    orden: 3,
  },
]

async function seed() {
  console.log('Seeding tarifas to Sanity...\n')

  for (const tarifa of tarifas) {
    try {
      // Use createOrReplace to update existing or create new
      await client.createOrReplace(tarifa)
      console.log(`✓ ${tarifa.nombre}`)
    } catch (error) {
      console.error(`✗ Error with ${tarifa.nombre}:`, error.message)
    }
  }

  console.log('\nDone! Tarifas have been seeded to Sanity.')
  console.log('You can now edit them in Sanity Studio under "Tarifas por Temporada"')
}

seed().catch(console.error)
