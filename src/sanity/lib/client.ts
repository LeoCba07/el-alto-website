import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Pages render with `force-dynamic`, so every request re-fetches from Sanity.
  // The CDN keeps that off the metered API quota (250k/mo) and on the CDN quota
  // (1M/mo). Responses purge on publish, so editor changes still appear within
  // seconds. Set to false only if this client ever gets an auth token, since
  // authenticated requests bypass the CDN anyway.
  useCdn: true,
})
