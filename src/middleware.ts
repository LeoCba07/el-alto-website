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
    const [inputUser, inputPass] = decoded.split(':')

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
