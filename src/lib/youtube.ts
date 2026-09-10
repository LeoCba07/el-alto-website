// Pulls the 11-character video id out of watch, youtu.be, embed and shorts links.
const VIDEO_ID = /(?:[?&]v=|youtu\.be\/|\/embed\/|\/shorts\/)([\w-]{11})/

export function youtubeId(url?: string): string | undefined {
  return url?.match(VIDEO_ID)?.[1]
}
