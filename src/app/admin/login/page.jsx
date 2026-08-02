'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function AdminLogin() {
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPw, setShowPw] = useState(false)
  const router = useRouter()

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (res.ok) {
        router.push('/admin/dashboard')
      } else {
        setError(data.error || 'Login failed')
      }
    } catch {
      setError('Network error. Please try again.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left branding */}
      <div className="hidden lg:flex flex-col justify-between bg-ink p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage:'radial-gradient(circle at 20% 80%, #F97316 0%, transparent 50%), radial-gradient(circle at 80% 20%, #F97316 0%, transparent 50%)'}}/>
        <div className="relative">
          <div className="sf text-3xl text-white mb-1">Wahid Graphics</div>
          <div className="text-white/40 text-xs tracking-[.18em] uppercase">Admin Portal</div>
        </div>
        <div className="relative">
          <div className="text-6xl text-or font-black leading-none mb-4">Admin<br/>Portal</div>
          <p className="text-white/50 text-sm leading-relaxed max-w-xs">Manage your portfolio projects, add new work, and update your website content from one place.</p>
        </div>
        <div className="relative text-white/30 text-xs">
          © 2025 Wahid Graphics. Secure Admin Area.
        </div>
      </div>

      {/* Right form */}
      <div className="flex items-center justify-center bg-[#FAFAF8] p-8">
        <div className="w-full max-w-sm">
          <div className="mb-10 text-center lg:text-left">
            <div className="sf text-3xl text-ink mb-1 lg:hidden">Wahid Graphics</div>
            <h1 className="sf text-2xl text-ink mb-1">Welcome Back</h1>
            <p className="text-ink-muted text-sm">Sign in to your admin panel</p>
          </div>

          {error && (
            <div className="mb-5 p-3 bg-red-50 border border-red-200 rounded-sm text-red-700 text-sm flex items-center gap-2">
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/></svg>
              {error}
            </div>
          )}

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="text-[10px] font-bold tracking-[.12em] uppercase text-ink-muted block mb-2">Username</label>
              <input
                type="text"
                required
                autoComplete="username"
                value={form.username}
                onChange={e => setForm({...form, username: e.target.value})}
                placeholder="wahidgraphics"
                className="admin-input"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold tracking-[.12em] uppercase text-ink-muted block mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  value={form.password}
                  onChange={e => setForm({...form, password: e.target.value})}
                  placeholder="••••••••••"
                  className="admin-input pr-10"
                />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-faint hover:text-ink transition-colors">
                  {showPw
                    ? <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    : <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  }
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading}
              className="btn-p w-full justify-center mt-2 disabled:opacity-60 disabled:cursor-not-allowed">
              {loading ? (
                <><svg className="animate-spin" width="14" height="14" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg> Signing In...</>
              ) : 'Sign In to Admin Panel'}
            </button>
          </form>

          <div className="mt-8 p-4 bg-or/5 border border-or/20 rounded-sm">
            <p className="text-[10px] font-bold text-ink-muted uppercase tracking-wider mb-2">Default Credentials</p>
            <p className="text-xs text-ink-soft font-mono">Username: <span className="text-or font-bold">wahidgraphics</span></p>
            <p className="text-xs text-ink-soft font-mono mt-1">Password: <span className="text-or font-bold">WahidAdmin@2025</span></p>
            <p className="text-[10px] text-ink-faint mt-3">⚠️ Change these in Vercel Environment Variables before going live.</p>
          </div>

          <p className="text-center mt-6">
            <a href="/" className="text-xs text-ink-muted hover:text-or transition-colors">← Back to Website</a>
          </p>
        </div>
      </div>
    </div>
  )
}
