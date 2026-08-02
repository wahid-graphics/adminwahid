import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'

export async function POST(req) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const formData = await req.formData()
    const file = formData.get('file')

    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })

    const allowed = ['image/jpeg','image/png','image/webp','image/gif']
    if (!allowed.includes(file.type)) {
      return NextResponse.json({ error: 'Only images allowed (JPG, PNG, WebP)' }, { status: 400 })
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large. Max 10MB.' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const filename = `upload_${Date.now()}_${file.name.replace(/[^a-z0-9.]/gi,'_')}`

    // On Vercel: use /tmp (ephemeral). For persistence use Cloudinary/S3.
    const { writeFile } = await import('fs/promises')
    const path = `/tmp/${filename}`
    await writeFile(path, buffer)

    // Return a public path — in production, upload to cloud storage instead
    return NextResponse.json({
      url: `/images/${filename}`,
      filename,
      note: 'For production, configure Cloudinary or S3 in .env.local'
    })
  } catch (err) {
    return NextResponse.json({ error: 'Upload failed: ' + err.message }, { status: 500 })
  }
}
