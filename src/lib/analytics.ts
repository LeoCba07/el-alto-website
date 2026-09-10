import { track } from '@vercel/analytics'

type EventProps = Record<string, string | number | boolean>

/**
 * Send a custom event to whichever analytics backends are live.
 *
 * The site runs Vercel Analytics and, when NEXT_PUBLIC_GA_ID is set, GA4.
 * Either may be absent, so both calls are guarded and failures stay silent --
 * analytics must never take a page down.
 */
export function trackEvent(name: string, props?: EventProps) {
  try {
    track(name, props)
  } catch {
    // Vercel Analytics not initialised
  }

  try {
    const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag
    gtag?.('event', name, props)
  } catch {
    // GA not configured
  }
}
