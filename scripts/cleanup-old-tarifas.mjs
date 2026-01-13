// Clean up old tarifa documents
// Run with: node scripts/cleanup-old-tarifas.mjs

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

const oldDocumentIds = ['tarifa-alta', 'tarifa-media', 'tarifa-baja']

async function cleanup() {
  console.log('Cleaning up old tarifa documents...\n')

  for (const docId of oldDocumentIds) {
    try {
      await client.delete(docId)
      console.log(`✓ Deleted ${docId}`)
    } catch (error) {
      if (error.statusCode === 404) {
        console.log(`⊘ ${docId} not found (already deleted or never existed)`)
      } else {
        console.error(`✗ Error deleting ${docId}:`, error.message)
      }
    }
  }

  console.log('\nDone! Old tarifa documents cleaned up.')
}

cleanup().catch(console.error)
