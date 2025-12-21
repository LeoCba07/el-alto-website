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

const servicios = [
  // En tu unidad
  { _id: 'servicio-wifi', nombre: 'Wi-Fi gratis', icono: 'wifi', categoria: 'unidad', orden: 1 },
  { _id: 'servicio-cocina', nombre: 'Cocina equipada', icono: 'kitchen', categoria: 'unidad', detalle: 'horno, microondas, heladera, vajilla', orden: 2 },
  { _id: 'servicio-ropa', nombre: 'Ropa de cama y toallas', icono: 'bed', categoria: 'unidad', orden: 3 },
  { _id: 'servicio-tv', nombre: 'TV con cable', icono: 'tv', categoria: 'unidad', orden: 4 },
  { _id: 'servicio-calefaccion', nombre: 'Calefacción y ventiladores', icono: 'climate', categoria: 'unidad', orden: 5 },
  { _id: 'servicio-caja', nombre: 'Caja de seguridad', icono: 'safe', categoria: 'unidad', orden: 6 },
  { _id: 'servicio-secador', nombre: 'Secador de pelo', icono: 'hairdryer', categoria: 'unidad', orden: 7 },

  // En el complejo
  { _id: 'servicio-cochera', nombre: 'Cochera techada', icono: 'car', categoria: 'complejo', detalle: '1 por unidad', orden: 1 },
  { _id: 'servicio-juegos', nombre: 'Sala de juegos para chicos', icono: 'kids', categoria: 'complejo', orden: 2 },
  { _id: 'servicio-gym', nombre: 'Gimnasio', icono: 'gym', categoria: 'complejo', orden: 3 },
  { _id: 'servicio-restaurant', nombre: 'Restaurant en el predio', icono: 'restaurant', categoria: 'complejo', orden: 4 },
  { _id: 'servicio-turismo', nombre: 'Info turística y excursiones', icono: 'map', categoria: 'complejo', orden: 5 },
  { _id: 'servicio-equipaje', nombre: 'Guardado de equipaje', icono: 'luggage', categoria: 'complejo', orden: 6 },
  { _id: 'servicio-recepcion', nombre: 'Recepción', icono: 'reception', categoria: 'complejo', detalle: '9 a 19 hs', orden: 7 },

  // Servicios opcionales
  { _id: 'servicio-ac', nombre: 'Aire acondicionado', icono: 'ac', categoria: 'opcional', descripcion: 'Opcional para mantener tarifas accesibles.', precio: '$2.500/día', orden: 1 },
  { _id: 'servicio-desayuno', nombre: 'Desayuno', icono: 'breakfast', categoria: 'opcional', descripcion: 'Desayuno seco servido en tu unidad.', detalle: 'Disponibilidad limitada', precio: 'Consultar', orden: 2 },
  { _id: 'servicio-masajes', nombre: 'Masajes', icono: 'spa', categoria: 'opcional', descripcion: 'Facial, reflexología, piedras calientes.', detalle: 'Disponibilidad limitada', precio: 'Consultar', orden: 3 },

  // Destacados (fotos principales)
  { _id: 'servicio-pileta', nombre: 'Pileta al aire libre', categoria: 'destacado', descripcion: 'Vista a las sierras. Climatizada en primavera y otoño.', detalle: 'Horario: 9:30 a 22:00 hs', orden: 1 },
  { _id: 'servicio-quincho', nombre: 'Quincho con asadores', categoria: 'destacado', descripcion: 'Espacio común para disfrutar un asado en familia.', detalle: 'Reservá en recepción', orden: 2 },
  { _id: 'servicio-vistas', nombre: 'Vistas a la montaña', categoria: 'destacado', descripcion: 'Predio escalonado con jardín y panorámicas.', orden: 3 },
]

async function seed() {
  console.log('Deleting existing servicios...')

  // First delete all existing servicios
  const existing = await client.fetch('*[_type == "servicio"]._id')
  if (existing.length > 0) {
    const transaction = client.transaction()
    existing.forEach(id => transaction.delete(id))
    await transaction.commit()
    console.log(`Deleted ${existing.length} existing servicios`)
  }

  console.log('Creating new servicios...')

  const transaction = client.transaction()

  for (const servicio of servicios) {
    transaction.create({
      _type: 'servicio',
      ...servicio,
    })
  }

  await transaction.commit()
  console.log(`Created ${servicios.length} servicios successfully!`)
}

seed().catch(console.error)
