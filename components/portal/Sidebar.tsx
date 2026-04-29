'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { motion, AnimatePresence } from 'framer-motion'

interface SidebarProps {
  userName: string
  userRole: string
  projectName?: string
}

const NAV_ITEMS = [
  { href: '/portal', label: 'Dashboard', icon: 'grid' },
  { href: '/portal/phases', label: 'Phases', icon: 'layers' },
  { href: '/portal/milestones', label: 'Milestones', icon: 'flag' },
  { href: '/portal/files', label: 'File Center', icon: 'folder' },
  { href: '/portal/messages', label: 'Messages', icon: 'message' },
  { href: '/portal/invoices', label: 'Invoices', icon: 'receipt' },
]

const ICONS: Record<string, React.ReactNode> = {
  grid: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.2" /><rect x="9" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.2" /><rect x="1" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.2" /><rect x="9" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.2" /></svg>,
  layers: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M1 6l7-4 7 4-7 4-7-4z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" /><path d="M1 10l7 4 7-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>,
  flag: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 2v12M3 2h8l-2 4h2l-2 4H3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  folder: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M1 4a1 1 0 011-1h4l2 2h6a1 1 0 011 1v7a1 1 0 01-1 1H2a1 1 0 01-1-1V4z" stroke="currentColor" strokeWidth="1.2" /></svg>,
  message: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M14 2H2a1 1 0 00-1 1v8a1 1 0 001 1h10l3 2V3a1 1 0 00-1-1z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" /></svg>,
  receipt: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 1h10a1 1 0 011 1v13l-2-1.5L10 15l-2-1.5L6 15l-2-1.5L2 15V2a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.2" /><line x1="5" y1="6" x2="11" y2="6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /><line x1="5" y1="9" x2="9" y2="9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>,
  shield: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1L2 4v5c0 4.1 2.7 7.9 6 9 3.3-1.1 6-4.9 6-9V4L8 1z" stroke="currentColor" strokeWidth="1.2" /></svg>,
  logout: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3H13a1 1 0 011 1v8a1 1 0 01-1 1H10M7 11l4-4-4-4M11 8H2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>,
}

export function Sidebar({ userName, userRole, projectName }: SidebarProps) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const SidebarContent = () => (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: '#0D0D0D',
        borderRight: '1px solid #1F1F1F',
      }}
    >
      {/* Logo */}
      <div style={{ padding: '1.5rem', borderBottom: '1px solid #1F1F1F' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'none', textDecoration: 'none' }}>
          <svg viewBox="0 0 32 32" fill="none" width="32" height="32">
            <polygon points="10,2 22,2 30,10 30,22 22,30 10,30 2,22 2,10" stroke="url(#sbGold)" strokeWidth="1.5" fill="none" />
            <text x="16" y="20" textAnchor="middle" fill="#C9A84C" fontSize="8" fontFamily="Bebas Neue, sans-serif">33</text>
            <defs>
              <linearGradient id="sbGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C9A84C" />
                <stop offset="100%" stopColor="#8B6914" />
              </linearGradient>
            </defs>
          </svg>
          <div>
            <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '0.99rem', letterSpacing: '0.15em', color: '#C9A84C', lineHeight: 1 }}>33 NEXUS</div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.44rem', letterSpacing: '0.2em', color: '#6B6560', lineHeight: 1, marginTop: '2px' }}>CLIENT PORTAL</div>
          </div>
        </Link>
      </div>

      {/* User info */}
      <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #1F1F1F' }}>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.44rem', letterSpacing: '0.2em', color: '#6B6560', textTransform: 'uppercase', marginBottom: '4px' }}>
          Authenticated
        </div>
        <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.88rem', color: '#F5F0E8', marginBottom: '2px' }}>
          {userName}
        </div>
        {projectName && (
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', color: '#C9A84C', letterSpacing: '0.1em' }}>
            {projectName}
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: '1rem 0', overflowY: 'auto' }}>
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '0.66rem 1.5rem',
                margin: '2px 0.66rem',
                borderRadius: '0.66rem',
                background: isActive ? 'rgba(201,168,76,0.08)' : 'transparent',
                border: isActive ? '1px solid rgba(201,168,76,0.15)' : '1px solid transparent',
                color: isActive ? '#C9A84C' : '#6B6560',
                textDecoration: 'none',
                transition: 'all 0.33s ease',
                cursor: 'none',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  const t = e.currentTarget
                  t.style.background = 'rgba(201,168,76,0.04)'
                  t.style.color = '#F5F0E8'
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  const t = e.currentTarget
                  t.style.background = 'transparent'
                  t.style.color = '#6B6560'
                }
              }}
            >
              <span style={{ color: 'inherit' }}>{ICONS[item.icon]}</span>
              <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.88rem', color: 'inherit' }}>
                {item.label}
              </span>
            </Link>
          )
        })}

        {userRole === 'ADMIN' && (
          <>
            <div style={{ height: '1px', background: '#1F1F1F', margin: '0.75rem 1.5rem' }} />
            <Link
              href="/portal/admin"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '0.66rem 1.5rem',
                margin: '2px 0.66rem',
                borderRadius: '0.66rem',
                color: '#8B0000',
                textDecoration: 'none',
                transition: 'all 0.33s ease',
                cursor: 'none',
              }}
            >
              <span>{ICONS['shield']}</span>
              <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.88rem' }}>Admin Panel</span>
            </Link>
          </>
        )}
      </nav>

      {/* Sign out */}
      <div style={{ padding: '1rem', borderTop: '1px solid #1F1F1F' }}>
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            width: '100%',
            padding: '0.66rem 1rem',
            background: 'none',
            border: 'none',
            color: '#6B6560',
            cursor: 'none',
            borderRadius: '0.66rem',
            transition: 'all 0.33s ease',
          }}
          onMouseEnter={(e) => { const t = e.currentTarget; t.style.background = 'rgba(139,0,0,0.1)'; t.style.color = '#ff4444' }}
          onMouseLeave={(e) => { const t = e.currentTarget; t.style.background = 'none'; t.style.color = '#6B6560' }}
        >
          {ICONS['logout']}
          <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.88rem' }}>Sign Out</span>
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <div className="portal-sidebar hidden md:block">
        <SidebarContent />
      </div>

      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden fixed top-4 left-4 z-333 p-2 rounded-lg"
        style={{ background: '#0D0D0D', border: '1px solid #1F1F1F', cursor: 'none' }}
      >
        <div className="flex flex-col gap-[5px]">
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ width: '20px', height: '1.5px', background: '#C9A84C' }} />
          ))}
        </div>
      </button>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="md:hidden fixed inset-0 bg-black/60 z-66"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.33 }}
              className="md:hidden fixed left-0 top-0 bottom-0 w-72 z-99"
            >
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
