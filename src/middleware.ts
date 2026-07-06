import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const user = process.env.STUDIO_USER
  const pass = process.env.STUDIO_PASS

  // Only enforce basic auth if both env vars are configured
  if (!user || !pass) {
    return NextResponse.next()
  }

  const authHeader = request.headers.get('authorization')

  if (authHeader?.startsWith('Basic ')) {
    const decoded = Buffer.from(authHeader.slice(6), 'base64').toString('utf-8')
    // Split on the first ":" only — passwords may contain colons
    const separator = decoded.indexOf(':')
    const inputUser = separator === -1 ? decoded : decoded.slice(0, separator)
    const inputPass = separator === -1 ? '' : decoded.slice(separator + 1)

    if (inputUser === user && inputPass === pass) {
      return NextResponse.next()
    }
  }

  return new NextResponse('Unauthorized', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Sanity Studio"' },
  })
}

export const config = {
  matcher: ['/studio/:path*'],
}
