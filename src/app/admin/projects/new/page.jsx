'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const CATS = { flex:'Flex Banners', bcard:'Visiting Cards', logo:'Logo Design', shadi:'Shadi Cards', print4:'4-Colour Printing', other:'Other Works' }

export default function NewProject() {
  const router = useRouter()
  const [form, setForm] = useState({ title:'', category:'flex', description:'', image:'', featured:false })
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState('')
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [uploadProgress, setUploadProgress] = useState('')

  const handleFile = (e) => {
    const f = e.target.files[0]
    if (!f) return
    if (f.size > 10 * 1024 * 1024) { setError('File too large. Max 10MB.'); return }
    setFile(f)
    setPreview(URL.createObjectURL(f))
    setError('')
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const f = e.dataTransfer.files[0]
    if (f) { setFile(f); setPreview(URL.createObjectURL(f)); setError('') }
  }

  const uploadFile = async () => {
    if (!file) return form.image
    setUploading(true)
    setUploadProgress('Uploading image...')
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setUploadProgress('Image uploaded ✓')
      return data.url
    } catch (err) {
      throw new Error('Upload failed: ' + err.message)
    } finally {
      setUploading(false)
    }
  }

  const save = async (e) => {
    e.preventDefault()
    if (!form.title.trim()) { setError('Title is required'); return }
    if (!file && !form.image) { setError('Please upload an image'); return }

    setSaving(true)
    setError('')
    try {
      const imageUrl = file ? await uploadFile() : form.image
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, image: imageUrl }),
      })
      if (!res.ok) {
        const d = await res.json()
        if (res.status === 401) { router.push('/admin/login'); return }
        throw new Error(d.error)
      }
      router.push('/admin/dashboard')
    } catch (err) {
      setError(err.message)
    }
    setSaving(false)
  }

  return (
    <div className="flex min-h-screen" style={{background:'#f4f4f2'}}>
      {/* Sidebar */}
      <div className="admin-sidebar flex flex-col hidden lg:flex">
        <div className="p-5 border-b border-white/10">
          <div className="sf text-lg text-or">Wahid Graphics</div>
          <div className="text-white/40 text-[10px] tracking-widest uppercase mt-0.5">Admin Panel</div>
        </div>
        <nav className="flex-1 py-4">
          <Link href="/admin/dashboard" className="admin-nav-link">
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
            Dashboard
          </Link>
          <Link href="/admin/projects/new" className="admin-nav-link active">
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
            Add New Project
          </Link>
          <Link href="/" target="_blank" className="admin-nav-link">
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            View Website
          </Link>
        </nav>
      </div>

      <div className="admin-main flex-1 p-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Link href="/admin/dashboard" className="text-ink-muted hover:text-ink transition-colors">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            </Link>
            <div>
              <h1 className="sf text-3xl text-ink">Add New Project</h1>
              <p className="text-ink-muted text-sm">Upload a new portfolio project</p>
            </div>
          </div>

          {error && (
            <div className="mb-5 p-3 bg-red-50 border border-red-200 rounded-sm text-red-700 text-sm">{error}</div>
          )}

          <form onSubmit={save} className="space-y-5">
            {/* Image upload */}
            <div className="admin-card">
              <label className="text-[10px] font-bold tracking-widest uppercase text-ink-muted block mb-3">Project Image *</label>
              <div
                onDrop={handleDrop}
                onDragOver={e => e.preventDefault()}
                className="border-2 border-dashed border-bd rounded-sm overflow-hidden"
                style={{minHeight:'200px'}}>
                {preview ? (
                  <div className="relative">
                    <img src={preview} alt="Preview" className="w-full max-h-64 object-cover"/>
                    <button type="button" onClick={() => { setFile(null); setPreview('') }}
                      className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-sm">
                      Remove
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center h-48 cursor-pointer hover:bg-cr transition-colors">
                    <svg width="32" height="32" fill="none" stroke="#9a9590" strokeWidth="1.5" viewBox="0 0 24 24" className="mb-3"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                    <div className="text-sm font-semibold text-ink-muted mb-1">Click to upload or drag & drop</div>
                    <div className="text-xs text-ink-faint">JPG, PNG, WebP up to 10MB</div>
                    <input type="file" accept="image/*" onChange={handleFile} className="hidden"/>
                  </label>
                )}
              </div>
              {uploadProgress && <p className="text-xs text-or mt-2">{uploadProgress}</p>}

              {/* OR paste URL */}
              <div className="mt-3">
                <label className="text-[10px] font-bold tracking-widest uppercase text-ink-muted block mb-1.5">Or enter image URL / path</label>
                <input
                  type="text"
                  value={form.image}
                  onChange={e => setForm({...form, image: e.target.value})}
                  placeholder="/images/my-project.jpg or https://..."
                  className="admin-input text-sm"
                />
              </div>
            </div>

            {/* Details */}
            <div className="admin-card space-y-4">
              <div>
                <label className="text-[10px] font-bold tracking-widest uppercase text-ink-muted block mb-2">Project Title *</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={e => setForm({...form, title: e.target.value})}
                  placeholder="e.g. Outdoor Flex Banner for Ali Shop"
                  className="admin-input"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold tracking-widest uppercase text-ink-muted block mb-2">Category *</label>
                <select
                  value={form.category}
                  onChange={e => setForm({...form, category: e.target.value})}
                  className="admin-input">
                  {Object.entries(CATS).map(([k, v]) => (
                    <option key={k} value={k}>{v}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold tracking-widest uppercase text-ink-muted block mb-2">Description</label>
                <textarea
                  value={form.description}
                  onChange={e => setForm({...form, description: e.target.value})}
                  placeholder="Brief description of this project..."
                  rows={3}
                  className="admin-input resize-none"
                />
              </div>

              <div className="flex items-center gap-3">
                <button type="button"
                  onClick={() => setForm({...form, featured: !form.featured})}
                  className={`w-10 h-6 rounded-full transition-colors relative ${form.featured ? 'bg-or' : 'bg-bd'}`}>
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${form.featured ? 'left-5' : 'left-1'}`}/>
                </button>
                <label className="text-sm font-medium text-ink cursor-pointer" onClick={() => setForm({...form, featured: !form.featured})}>
                  Mark as Featured (shows prominently on portfolio)
                </label>
              </div>
            </div>

            <div className="flex gap-3">
              <button type="submit" disabled={saving || uploading}
                className="btn-p flex-1 justify-center disabled:opacity-60">
                {saving ? 'Saving...' : uploading ? 'Uploading...' : '+ Add to Portfolio'}
              </button>
              <Link href="/admin/dashboard" className="btn-o">Cancel</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
