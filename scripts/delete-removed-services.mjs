// Delete removed services from Sanity
// Run with: node scripts/delete-removed-services.mjs

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

// Services to delete (no longer offered)
const servicesToDelete = [
  'Gimnasio',
  'Restaurant en el predio',
  'Masajes',
]

async function deleteServices() {
  console.log('Searching for services to delete...\n')

  for (const nombre of servicesToDelete) {
    try {
      // Find the service by name
      const services = await client.fetch(
        '*[_type == "servicio" && nombre == $nombre]._id',
        { nombre }
      )

      if (services.length === 0) {
        console.log(`✓ "${nombre}" not found (already deleted or never existed)`)
        continue
      }

      // Delete each matching service
      for (const id of services) {
        await client.delete(id)
        console.log(`✓ Deleted "${nombre}" (ID: ${id})`)
      }
    } catch (error) {
      console.error(`✗ Error deleting "${nombre}":`, error.message)
    }
  }

  console.log('\nDone! Removed services that are no longer offered.')
}

deleteServices().catch(console.error)
