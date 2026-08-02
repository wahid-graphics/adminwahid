import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'wahid-graphics-super-secret-key-2025-change-me'
)

export async function createToken(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET)
}

export async function verifyToken(token) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload
  } catch {
    return null
  }
}

export async function getSession() {
  const cookieStore = cookies()
  const token = cookieStore.get('admin_token')?.value
  if (!token) return null
  return await verifyToken(token)
}

export function checkCredentials(username, password) {
  const adminUser = process.env.ADMIN_USERNAME || 'wahidgraphics'
  const adminPass = process.env.ADMIN_PASSWORD || 'WahidAdmin@2025'
  return username === adminUser && password === adminPass
}
