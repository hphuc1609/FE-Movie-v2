import { NextRequest, NextResponse } from 'next/server'

const authPaths = ['/login', '/register']
const privatePaths = ['/phim-yeu-thich']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const userInfo = request.cookies.get('userVerify')?.value || ''
  const token = userInfo ? JSON.parse(userInfo).token : null

  // Redirect to home page if authenticated
  if (authPaths.includes(pathname) && token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Redirect to home page if not authenticated
  if (privatePaths.includes(pathname) && !token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/:path*'],
}
