import { NextResponse } from 'next/server'
import { createToken, checkCredentials } from '@/lib/auth'
import { cookies } from 'next/headers'

export async function POST(req) {
  try {
    const { username, password } = await req.json()

    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password required' }, { status: 400 })
    }

    if (!checkCredentials(username, password)) {
      // Delay to slow brute force
      await new Promise(r => setTimeout(r, 1000))
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const token = await createToken({ username, role: 'admin' })
    const cookieStore = cookies()
    cookieStore.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function DELETE() {
  const cookieStore = cookies()
  cookieStore.delete('admin_token')
  return NextResponse.json({ success: true })
}
