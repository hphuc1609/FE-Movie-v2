import { NextRequest, NextResponse } from 'next/server'

const authPaths = ['/login', '/register']

export function middleware(request: NextRequest) {
  //   const { pathname } = request.nextUrl

  //   // Redirect to home page if authenticated
  //   if (authPaths.includes(pathname)) {
  //     return NextResponse.redirect(new URL('/login', request.url))
  //   }
  //   // Redirect to login page if not authenticated
  //   if (!authPaths.includes(pathname)) {
  //     return NextResponse.redirect(new URL('/', request.url))
  //   }
  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/:path*', '/login', '/register'],
}
