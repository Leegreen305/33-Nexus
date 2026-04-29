'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const scrollTo = (href: string) => {
    setOpen(false)
    if (href.startsWith('#')) {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 1, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 99,
          padding: '0 32px',
          height: '64px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: scrolled ? 'rgba(0,0,0,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(24px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.04)' : '1px solid transparent',
          transition: 'all 0.3s ease',
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', cursor: 'none' }}>
          <div style={{
            width: '32px', height: '32px',
            background: 'linear-gradient(135deg, #7DF9FF, #BF5AF2)',
            borderRadius: '8px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '11px', color: '#000', letterSpacing: '-0.02em' }}>33</span>
          </div>
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1rem', letterSpacing: '-0.02em', color: '#fff' }}>
            Nexus
          </span>
        </Link>

        {/* Desktop links */}
        <nav style={{ display: 'flex', gap: '32px', alignItems: 'center' }} className="hidden md:flex">
          {LINKS.map((l) => (
            <button key={l.href} onClick={() => scrollTo(l.href)} style={{
              background: 'none', border: 'none', cursor: 'none',
              fontFamily: 'DM Sans, sans-serif', fontSize: '0.875rem',
              color: 'rgba(255,255,255,0.5)',
              transition: 'color 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
            >
              {l.label}
            </button>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex" style={{ gap: '12px', alignItems: 'center' }}>
          <Link href="/portal/login" style={{ cursor: 'none', textDecoration: 'none' }}>
            <button className="btn-ghost" style={{ padding: '9px 22px', fontSize: '0.82rem' }}>Portal</button>
          </Link>
          <button className="btn-primary" style={{ padding: '9px 22px', fontSize: '0.82rem' }} onClick={() => scrollTo('#contact')}>
            Start a Project
          </button>
        </div>

        {/* Hamburger */}
        <button className="md:hidden" onClick={() => setOpen(!open)} style={{ background: 'none', border: 'none', cursor: 'none', padding: '8px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '22px' }}>
            <motion.div animate={{ rotate: open ? 45 : 0, y: open ? 7 : 0 }} style={{ height: '1.5px', background: '#fff', borderRadius: '2px' }} />
            <motion.div animate={{ opacity: open ? 0 : 1 }} style={{ height: '1.5px', background: '#fff', borderRadius: '2px' }} />
            <motion.div animate={{ rotate: open ? -45 : 0, y: open ? -7 : 0 }} style={{ height: '1.5px', background: '#fff', borderRadius: '2px' }} />
          </div>
        </button>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, zIndex: 98, background: 'rgba(0,0,0,0.97)', backdropFilter: 'blur(24px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 32px' }}>
            {LINKS.map((l, i) => (
              <motion.button key={l.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => scrollTo(l.href)}
                style={{
                  background: 'none', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.06)',
                  padding: '24px 0', textAlign: 'left', cursor: 'none',
                  fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '2.5rem',
                  color: 'rgba(255,255,255,0.4)', letterSpacing: '-0.03em',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
              >
                {l.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
