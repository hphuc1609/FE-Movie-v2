import { NextRequest, NextResponse } from 'next/server'

const authPaths = ['/login', '/register']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const verify = request.cookies.get('userVerify')?.value
  const token = verify ? JSON.parse(verify)?.token : null

  // Redirect to home page if authenticated
  if (authPaths.includes(pathname) && token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/:path*'],
}
