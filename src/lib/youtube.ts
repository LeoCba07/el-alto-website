// Pulls the 11-character video id out of watch, youtu.be, embed and shorts links.
const VIDEO_ID = /(?:[?&]v=|youtu\.be\/|\/embed\/|\/shorts\/)([\w-]{11})/

export function youtubeId(url?: string): string | undefined {
  return url?.match(VIDEO_ID)?.[1]
}

// Whether a video has a maxres thumbnail doesn't change, and the homepage
// renders on every request, so each answer is kept for a day (per server
// instance) instead of making every visit wait on YouTube.
const DAY_MS = 24 * 60 * 60 * 1000
const known = new Map<string, { url: string; at: number }>()

// Picks the sharpest thumbnail that exists. Not every upload has a maxres one,
// and a missing one is a 404 whose body is a valid 120x90 grey image -- the
// browser loads it without erroring, so it can't be caught client-side.
export async function youtubeThumbnail(id: string): Promise<string> {
  const cached = known.get(id)
  if (cached && Date.now() - cached.at < DAY_MS) return cached.url

  const maxres = `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`
  const hq = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
  try {
    const res = await fetch(maxres, { method: 'HEAD', signal: AbortSignal.timeout(1500) })
    const url = res.ok ? maxres : hq
    // Only a definite answer is kept: a YouTube hiccup is retried next visit.
    if (res.ok || res.status === 404) known.set(id, { url, at: Date.now() })
    return url
  } catch {
    // Timed out or unreachable: use the thumbnail every video has.
    return hq
  }
}
