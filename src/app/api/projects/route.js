import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { getProjects, addProject, updateProject, deleteProject } from '@/lib/projects'

export async function GET() {
  const projects = getProjects()
  return NextResponse.json(projects)
}

export async function POST(req) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const project = addProject(body)
  return NextResponse.json(project, { status: 201 })
}

export async function PUT(req) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id, ...updates } = await req.json()
  const project = updateProject(id, updates)
  return NextResponse.json(project)
}

export async function DELETE(req) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await req.json()
  deleteProject(id)
  return NextResponse.json({ success: true })
}
