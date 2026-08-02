import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'wahid-graphics-super-secret-key-2025-change-me'
)

const PROTECTED = ['/admin/dashboard', '/admin/projects']

export async function middleware(request) {
  const { pathname } = request.nextUrl

  const isProtected = PROTECTED.some(p => pathname.startsWith(p))
  if (!isProtected) return NextResponse.next()

  const token = request.cookies.get('admin_token')?.value

  if (!token) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  try {
    await jwtVerify(token, JWT_SECRET)
    return NextResponse.next()
  } catch {
    const res = NextResponse.redirect(new URL('/admin/login', request.url))
    res.cookies.delete('admin_token')
    return res
  }
}

export const config = {
  matcher: ['/admin/dashboard/:path*', '/admin/projects/:path*'],
}
