'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const go = (href: string) => {
    setOpen(false)
    if (href.startsWith('#')) document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 99,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 40px', height: '64px',
          background: scrolled ? 'rgba(8,8,8,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(242,237,229,0.06)' : '1px solid transparent',
          transition: 'all 0.3s ease',
        }}
      >
        {/* Wordmark */}
        <Link href="/" style={{ textDecoration: 'none', cursor: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-0.03em', color: 'var(--cream)' }}>
            33 Nexus
          </span>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--lime)', display: 'inline-block' }} />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex" style={{ gap: '40px', alignItems: 'center' }}>
          {LINKS.map(l => (
            <button key={l.href} onClick={() => go(l.href)} style={{ background: 'none', border: 'none', cursor: 'none', fontFamily: 'DM Sans, sans-serif', fontSize: '0.875rem', color: 'var(--cream-30)', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--cream)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--cream-30)')}>
              {l.label}
            </button>
          ))}
        </nav>

        <div className="hidden md:flex" style={{ gap: '12px', alignItems: 'center' }}>
          <Link href="/portal/login" style={{ textDecoration: 'none', cursor: 'none' }}>
            <button className="btn btn-outline" style={{ padding: '8px 20px', fontSize: '0.78rem' }}>Portal</button>
          </Link>
          <button className="btn btn-lime" style={{ padding: '8px 20px', fontSize: '0.78rem' }} onClick={() => go('#contact')}>
            Start a Project
          </button>
        </div>

        {/* Hamburger */}
        <button className="md:hidden" onClick={() => setOpen(!open)} style={{ background: 'none', border: 'none', cursor: 'none', padding: '8px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <motion.div animate={{ rotate: open ? 45 : 0, y: open ? 7 : 0 }} style={{ width: '22px', height: '1.5px', background: 'var(--cream)', borderRadius: '1px' }} />
          <motion.div animate={{ opacity: open ? 0 : 1 }} style={{ width: '22px', height: '1.5px', background: 'var(--cream)', borderRadius: '1px' }} />
          <motion.div animate={{ rotate: open ? -45 : 0, y: open ? -7 : 0 }} style={{ width: '22px', height: '1.5px', background: 'var(--cream)', borderRadius: '1px' }} />
        </button>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, zIndex: 98, background: 'rgba(8,8,8,0.98)', backdropFilter: 'blur(20px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 40px' }}>
            {[...LINKS, { label: 'Client Portal', href: '/portal' }].map((l, i) => (
              <motion.button key={l.href}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => go(l.href)}
                style={{ background: 'none', border: 'none', borderBottom: '1px solid var(--border)', padding: '22px 0', textAlign: 'left', cursor: 'none', fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(2rem, 7vw, 3.5rem)', color: 'var(--cream-30)', letterSpacing: '-0.03em', transition: 'color 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--cream)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--cream-30)')}>
                {l.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
