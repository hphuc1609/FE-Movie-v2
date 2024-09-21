import { NextRequest, NextResponse } from 'next/server'

const authPaths = ['/login', '/register']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const userInfo = request.cookies.get('userVerify')?.value as string
  const token = typeof userInfo !== 'undefined' ? JSON.parse(userInfo)?.token : null

  // Redirect to home page if authenticated
  if (authPaths.includes(pathname) && token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/:path*'],
}
