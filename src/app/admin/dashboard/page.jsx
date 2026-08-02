'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

const CATS = { all:'All', flex:'Flex Banners', bcard:'Visiting Cards', logo:'Logo Design', shadi:'Shadi Cards', print4:'4-Colour Printing', other:'Other Works' }

function Sidebar({ onLogout }) {
  return (
    <div className="admin-sidebar flex flex-col">
      <div className="p-5 border-b border-white/10">
        <div className="sf text-lg text-or">Wahid Graphics</div>
        <div className="text-white/40 text-[10px] tracking-widest uppercase mt-0.5">Admin Panel</div>
      </div>
      <nav className="flex-1 py-4">
        <Link href="/admin/dashboard" className="admin-nav-link active">
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
          Dashboard
        </Link>
        <Link href="/admin/projects/new" className="admin-nav-link">
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
          Add New Project
        </Link>
        <Link href="/" target="_blank" className="admin-nav-link">
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          View Website
        </Link>
      </nav>
      <div className="p-4 border-t border-white/10">
        <button onClick={onLogout} className="admin-nav-link w-full text-red-400 hover:text-red-300 hover:bg-red-500/10 border-none">
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          Logout
        </button>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const [projects, setProjects] = useState([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(null)
  const [toast, setToast] = useState('')
  const router = useRouter()

  useEffect(() => { fetchProjects() }, [])

  const fetchProjects = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/projects')
      if (res.status === 401) { router.push('/admin/login'); return }
      const data = await res.json()
      setProjects(data)
    } catch { showToast('Failed to load projects') }
    setLoading(false)
  }

  const logout = async () => {
    await fetch('/api/auth', { method: 'DELETE' })
    router.push('/admin/login')
  }

  const deleteProject = async (id, title) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return
    setDeleting(id)
    await fetch('/api/projects', { method: 'DELETE', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ id }) })
    await fetchProjects()
    setDeleting(null)
    showToast('Project deleted successfully')
  }

  const toggleFeatured = async (project) => {
    await fetch('/api/projects', {
      method: 'PUT',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ id: project.id, featured: !project.featured })
    })
    await fetchProjects()
    showToast(`${project.featured ? 'Removed from' : 'Added to'} featured`)
  }

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter)
  const stats = {
    total: projects.length,
    featured: projects.filter(p => p.featured).length,
    cats: Object.keys(CATS).length - 1,
  }

  return (
    <div className="flex min-h-screen" style={{background:'#f4f4f2'}}>
      <Sidebar onLogout={logout} />
      <div className="admin-main flex-1 p-6">

        {/* Toast */}
        {toast && (
          <div className="fixed top-5 right-5 z-50 bg-ink text-white text-sm px-5 py-3 rounded-md shadow-lg flex items-center gap-2">
            <svg width="14" height="14" fill="#F97316" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
            {toast}
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="sf text-3xl text-ink">Portfolio Dashboard</h1>
            <p className="text-ink-muted text-sm mt-1">Manage and update your portfolio projects</p>
          </div>
          <Link href="/admin/projects/new" className="btn-p text-xs">
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Add New Project
          </Link>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="admin-card">
            <div className="text-ink-muted text-xs font-bold tracking-wider uppercase mb-2">Total Projects</div>
            <div className="sf text-4xl text-ink">{stats.total}</div>
          </div>
          <div className="admin-card">
            <div className="text-ink-muted text-xs font-bold tracking-wider uppercase mb-2">Featured</div>
            <div className="sf text-4xl text-or">{stats.featured}</div>
          </div>
          <div className="admin-card">
            <div className="text-ink-muted text-xs font-bold tracking-wider uppercase mb-2">Categories</div>
            <div className="sf text-4xl text-ink">{stats.cats}</div>
          </div>
        </div>

        {/* Filter */}
        <div className="flex gap-2 flex-wrap mb-6">
          {Object.entries(CATS).map(([k, v]) => (
            <button key={k} onClick={() => setFilter(k)}
              className={`text-[10px] font-bold tracking-wider uppercase px-4 py-2 rounded-sm border transition-colors ${
                filter === k ? 'bg-ink text-white border-ink' : 'bg-white text-ink-muted border-bd hover:border-ink hover:text-ink'
              }`}>
              {v} {k !== 'all' && `(${projects.filter(p=>p.category===k).length})`}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        {loading ? (
          <div className="text-center py-20 text-ink-muted">Loading projects...</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map(project => (
              <div key={project.id} className="admin-card p-0 overflow-hidden group">
                <div className="relative aspect-[4/3] bg-cr">
                  <img src={project.image} alt={project.title}
                    className="w-full h-full object-cover" />
                  {project.featured && (
                    <div className="absolute top-2 left-2 bg-or text-white text-[9px] font-bold px-2 py-0.5 rounded-sm tracking-wider uppercase">Featured</div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                    <Link href={`/admin/projects/edit?id=${project.id}`}
                      className="bg-white text-ink text-xs font-bold px-3 py-1.5 rounded-sm hover:bg-or hover:text-white transition-colors">
                      Edit
                    </Link>
                    <button onClick={() => deleteProject(project.id, project.title)}
                      disabled={deleting === project.id}
                      className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-sm hover:bg-red-600 transition-colors disabled:opacity-50">
                      {deleting === project.id ? '...' : 'Delete'}
                    </button>
                  </div>
                </div>
                <div className="p-3">
                  <div className="font-semibold text-sm text-ink mb-1 truncate">{project.title}</div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-ink-muted bg-cr px-2 py-0.5 rounded-sm">{CATS[project.category]}</span>
                    <button onClick={() => toggleFeatured(project)}
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-sm transition-colors ${
                        project.featured ? 'text-or border border-or' : 'text-ink-faint border border-bd hover:border-or hover:text-or'
                      }`}>
                      {project.featured ? '★ Featured' : '☆ Feature'}
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Add new card */}
            <Link href="/admin/projects/new"
              className="border-2 border-dashed border-bd hover:border-or rounded-sm flex flex-col items-center justify-center aspect-[4/3] text-ink-faint hover:text-or transition-colors cursor-pointer group"
              style={{minHeight:'200px'}}>
              <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="mb-3"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
              <div className="text-sm font-semibold">Add New Project</div>
              <div className="text-xs mt-1 opacity-60">Upload image & details</div>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
