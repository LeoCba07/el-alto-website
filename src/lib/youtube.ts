// Pulls the 11-character video id out of watch, youtu.be, embed and shorts links.
const VIDEO_ID = /(?:[?&]v=|youtu\.be\/|\/embed\/|\/shorts\/)([\w-]{11})/

export function youtubeId(url?: string): string | undefined {
  return url?.match(VIDEO_ID)?.[1]
}

// Picks the sharpest thumbnail that exists. Not every upload has a maxres one,
// and a missing one is a 404 whose body is a valid 120x90 grey image -- the
// browser loads it without erroring, so it can't be caught client-side.
export async function youtubeThumbnail(id: string): Promise<string> {
  const maxres = `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`
  try {
    const res = await fetch(maxres, { method: 'HEAD', signal: AbortSignal.timeout(1500) })
    if (res.ok) return maxres
  } catch {
    // Timed out or unreachable: use the thumbnail every video has.
  }
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
}
