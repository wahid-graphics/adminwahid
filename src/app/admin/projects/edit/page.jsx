'use client'
import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

const CATS = { flex:'Flex Banners', bcard:'Visiting Cards', logo:'Logo Design', shadi:'Shadi Cards', print4:'4-Colour Printing', other:'Other Works' }

function EditForm() {
  const router = useRouter()
  const params = useSearchParams()
  const id = params.get('id')
  const [form, setForm] = useState({ title:'', category:'flex', description:'', image:'', featured:false })
  const [preview, setPreview] = useState('')
  const [file, setFile] = useState(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) { router.push('/admin/dashboard'); return }
    fetchProject()
  }, [id])

  const fetchProject = async () => {
    const res = await fetch('/api/projects')
    const projects = await res.json()
    const p = projects.find(x => x.id === id)
    if (!p) { router.push('/admin/dashboard'); return }
    setForm(p)
    setPreview(p.image)
    setLoading(false)
  }

  const handleFile = (e) => {
    const f = e.target.files[0]
    if (!f) return
    setFile(f)
    setPreview(URL.createObjectURL(f))
  }

  const save = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      let imageUrl = form.image
      if (file) {
        const fd = new FormData()
        fd.append('file', file)
        const uploadRes = await fetch('/api/upload', { method: 'POST', body: fd })
        const uploadData = await uploadRes.json()
        if (!uploadRes.ok) throw new Error(uploadData.error)
        imageUrl = uploadData.url
      }
      const res = await fetch('/api/projects', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, image: imageUrl }),
      })
      if (!res.ok) {
        const d = await res.json()
        if (res.status === 401) { router.push('/admin/login'); return }
        throw new Error(d.error)
      }
      router.push('/admin/dashboard')
    } catch (err) { setError(err.message) }
    setSaving(false)
  }

  if (loading) return <div className="p-8 text-ink-muted">Loading project...</div>

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/dashboard" className="text-ink-muted hover:text-ink transition-colors">
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </Link>
        <div>
          <h1 className="sf text-3xl text-ink">Edit Project</h1>
          <p className="text-ink-muted text-sm">Update portfolio project details</p>
        </div>
      </div>
      {error && <div className="mb-5 p-3 bg-red-50 border border-red-200 rounded-sm text-red-700 text-sm">{error}</div>}
      <form onSubmit={save} className="space-y-5">
        <div className="admin-card">
          <label className="text-[10px] font-bold tracking-widest uppercase text-ink-muted block mb-3">Project Image</label>
          {preview && <img src={preview} alt="Preview" className="w-full max-h-56 object-cover rounded-sm mb-3"/>}
          <label className="btn-o text-xs cursor-pointer">
            Change Image
            <input type="file" accept="image/*" onChange={handleFile} className="hidden"/>
          </label>
          <div className="mt-3">
            <label className="text-[10px] font-bold tracking-widest uppercase text-ink-muted block mb-1.5">Or image path/URL</label>
            <input type="text" value={form.image} onChange={e => setForm({...form, image: e.target.value})} className="admin-input text-sm" placeholder="/images/..."/>
          </div>
        </div>
        <div className="admin-card space-y-4">
          <div>
            <label className="text-[10px] font-bold tracking-widest uppercase text-ink-muted block mb-2">Title *</label>
            <input type="text" required value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="admin-input"/>
          </div>
          <div>
            <label className="text-[10px] font-bold tracking-widest uppercase text-ink-muted block mb-2">Category *</label>
            <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="admin-input">
              {Object.entries(CATS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </div>
          <div>
            <label className="text-[10px] font-bold tracking-widest uppercase text-ink-muted block mb-2">Description</label>
            <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={3} className="admin-input resize-none"/>
          </div>
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => setForm({...form, featured: !form.featured})}
              className={`w-10 h-6 rounded-full transition-colors relative ${form.featured ? 'bg-or' : 'bg-bd'}`}>
              <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${form.featured ? 'left-5' : 'left-1'}`}/>
            </button>
            <label className="text-sm font-medium text-ink cursor-pointer" onClick={() => setForm({...form, featured: !form.featured})}>
              Featured Project
            </label>
          </div>
        </div>
        <div className="flex gap-3">
          <button type="submit" disabled={saving} className="btn-p flex-1 justify-center disabled:opacity-60">
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          <Link href="/admin/dashboard" className="btn-o">Cancel</Link>
        </div>
      </form>
    </div>
  )
}

export default function EditProject() {
  return (
    <div className="flex min-h-screen" style={{background:'#f4f4f2'}}>
      <div className="admin-sidebar hidden lg:flex flex-col">
        <div className="p-5 border-b border-white/10">
          <div className="sf text-lg text-or">Wahid Graphics</div>
          <div className="text-white/40 text-[10px] tracking-widest uppercase mt-0.5">Admin Panel</div>
        </div>
        <nav className="flex-1 py-4">
          <Link href="/admin/dashboard" className="admin-nav-link">Dashboard</Link>
          <Link href="/admin/projects/new" className="admin-nav-link">Add New Project</Link>
          <Link href="/" target="_blank" className="admin-nav-link">View Website</Link>
        </nav>
      </div>
      <div className="admin-main flex-1 p-6">
        <Suspense fallback={<div className="text-ink-muted">Loading...</div>}>
          <EditForm />
        </Suspense>
      </div>
    </div>
  )
}
