'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function PortalLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      setStatus('error')
      setErrorMsg('Invalid credentials. Please check your email and password.')
    } else {
      router.push('/portal')
      router.refresh()
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{
        background: '#080808',
        backgroundImage: 'radial-gradient(ellipse at 33% 33%, rgba(212,212,212,0.03) 0%, transparent 70%)',
      }}
    >
      {/* Background geometry */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-[0.03]"
        >
          <svg viewBox="0 0 800 800" fill="none">
            <polygon points="400,50 730,225 730,575 400,750 70,575 70,225" stroke="#D4D4D4" strokeWidth="1" fill="none" />
            <polygon points="400,120 670,270 670,530 400,680 130,530 130,270" stroke="#D4D4D4" strokeWidth="0.5" fill="none" />
            <rect x="200" y="200" width="400" height="400" stroke="#D4D4D4" strokeWidth="0.5" fill="none" transform="rotate(33, 400, 400)" />
          </svg>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.66, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: '100%',
          maxWidth: '420px',
          background: '#080808',
          border: '1px solid #1A1A1A',
          borderRadius: '1.1rem',
          padding: '3rem',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* Back link */}
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.55rem',
            letterSpacing: '0.2em',
            color: '#555555',
            textDecoration: 'none',
            marginBottom: '2rem',
            cursor: 'none',
            transition: 'color 0.33s ease',
          }}
          onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#D4D4D4')}
          onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#555555')}
        >
          ← BACK TO SITE
        </Link>

        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <div className="relative mb-4">
            <svg viewBox="0 0 60 60" fill="none" width="60" height="60">
              <polygon
                points="22,3 38,3 57,22 57,38 38,57 22,57 3,38 3,22"
                stroke="url(#loginGold)"
                strokeWidth="1.5"
                fill="none"
              />
              <rect
                x="18" y="18" width="24" height="24"
                stroke="url(#loginGold)"
                strokeWidth="1"
                fill="rgba(212,212,212,0.05)"
                transform="rotate(33, 30, 30)"
              />
              <text x="30" y="36" textAnchor="middle" fill="#D4D4D4" fontSize="12" fontFamily="Bebas Neue, sans-serif">33</text>
              <defs>
                <linearGradient id="loginGold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#D4D4D4" />
                  <stop offset="50%" stopColor="#F0F0F0" />
                  <stop offset="100%" stopColor="#7A7A7A" />
                </linearGradient>
              </defs>
            </svg>

            {/* Gold glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(212,212,212,0.2) 0%, transparent 70%)',
                animation: 'glowPulse 3.3s ease-in-out infinite',
              }}
            />
          </div>

          <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.32rem', letterSpacing: '0.2em', color: '#D4D4D4' }}>
            33 NEXUS
          </div>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.25em', color: '#555555', marginTop: '4px' }}>
            CLIENT PORTAL
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.2em', color: '#555555', textTransform: 'uppercase', display: 'block' }}>
              Email Address
            </label>
            <input
              type="email"
              required
              className="nexus-input"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className="space-y-2">
            <label style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.2em', color: '#555555', textTransform: 'uppercase', display: 'block' }}>
              Password
            </label>
            <input
              type="password"
              required
              className="nexus-input"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          {status === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                padding: '0.75rem 1rem',
                background: 'rgba(139,0,0,0.15)',
                border: '1px solid rgba(139,0,0,0.3)',
                borderRadius: '0.66rem',
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '0.77rem',
                color: '#ff4444',
              }}
            >
              {errorMsg}
            </motion.div>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full btn-gold"
            style={{
              opacity: status === 'loading' ? 0.7 : 1,
              marginTop: '0.5rem',
            }}
          >
            {status === 'loading' ? 'AUTHENTICATING...' : 'ACCESS YOUR PROJECT'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.77rem', color: '#555555' }}>
            Not a client yet?{' '}
            <a
              href="/#contact"
              style={{ color: '#D4D4D4', textDecoration: 'none', cursor: 'none' }}
            >
              Begin a project
            </a>
          </p>
        </div>

        {/* Bottom sacred line */}
        <div
          style={{
            marginTop: '2rem',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(212,212,212,0.2), transparent)',
          }}
        />
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.44rem', letterSpacing: '0.3em', color: 'rgba(212,212,212,0.2)', textAlign: 'center', marginTop: '0.75rem' }}>
          33 NEXUS — 888
        </div>
      </motion.div>
    </div>
  )
}
