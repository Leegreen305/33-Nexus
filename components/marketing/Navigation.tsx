'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { NAV_ITEMS } from '@/lib/constants'

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 66)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setMobileOpen(false)
    if (href.startsWith('#')) {
      const el = document.querySelector(href)
      el?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.66, delay: 0.88, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-99 flex items-center justify-between px-8 py-6 transition-all duration-330"
        style={{
          background: scrolled
            ? 'rgba(8,8,8,0.95)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(31,31,31,0.8)' : '1px solid transparent',
        }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10">
            <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
              {/* Octagon — 8-sided element */}
              <polygon
                points="14,2 26,2 38,14 38,26 26,38 14,38 2,26 2,14"
                stroke="url(#navGold)"
                strokeWidth="1.5"
                fill="none"
              />
              {/* 33-degree angled inner element */}
              <rect
                x="13"
                y="13"
                width="14"
                height="14"
                stroke="url(#navGold)"
                strokeWidth="1"
                fill="rgba(212,212,212,0.08)"
                transform="rotate(33, 20, 20)"
              />
              <text
                x="20"
                y="24"
                textAnchor="middle"
                fill="#D4D4D4"
                fontSize="8"
                fontFamily="Bebas Neue, sans-serif"
                letterSpacing="0.5"
              >
                33
              </text>
              <defs>
                <linearGradient id="navGold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#D4D4D4" />
                  <stop offset="50%" stopColor="#F0F0F0" />
                  <stop offset="100%" stopColor="#7A7A7A" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div>
            <div
              style={{
                fontFamily: 'Bebas Neue, sans-serif',
                fontSize: '1.32rem',
                letterSpacing: '0.15em',
                color: '#D4D4D4',
                lineHeight: 1,
              }}
            >
              33 NEXUS
            </div>
            <div
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.44rem',
                letterSpacing: '0.25em',
                color: '#555555',
                textTransform: 'uppercase',
                lineHeight: 1,
                marginTop: '2px',
              }}
            >
              ENGINEERED TO THE 33RD DEGREE
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className="nav-link group relative"
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '0.88rem',
                letterSpacing: '0.08em',
                color: '#555555',
                background: 'none',
                border: 'none',
                cursor: 'none',
                transition: 'color 0.33s ease',
              }}
              onMouseEnter={(e) => {
                ;(e.target as HTMLElement).style.color = '#D4D4D4'
                ;(e.target as HTMLElement).style.letterSpacing = '0.12em'
              }}
              onMouseLeave={(e) => {
                ;(e.target as HTMLElement).style.color = '#555555'
                ;(e.target as HTMLElement).style.letterSpacing = '0.08em'
              }}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/portal/login">
            <button className="btn-outline text-sm">
              CLIENT PORTAL
            </button>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-[6px] p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          style={{ cursor: 'none' }}
        >
          <motion.span
            animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 8 : 0 }}
            className="block w-6 h-px bg-nexus-gold"
          />
          <motion.span
            animate={{ opacity: mobileOpen ? 0 : 1 }}
            className="block w-6 h-px bg-nexus-gold"
          />
          <motion.span
            animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -8 : 0 }}
            className="block w-6 h-px bg-nexus-gold"
          />
        </button>
      </motion.nav>

      {/* Mobile menu — 8 items */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.33, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-66 flex flex-col"
            style={{
              background: 'rgba(8,8,8,0.98)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <div className="flex items-center justify-between px-8 py-6 border-b border-nexus-border">
              <span
                style={{
                  fontFamily: 'Bebas Neue, sans-serif',
                  fontSize: '1.32rem',
                  letterSpacing: '0.15em',
                  color: '#D4D4D4',
                }}
              >
                33 NEXUS
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                style={{ cursor: 'none', background: 'none', border: 'none' }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <line x1="3" y1="3" x2="21" y2="21" stroke="#D4D4D4" strokeWidth="1.5" />
                  <line x1="21" y1="3" x2="3" y2="21" stroke="#D4D4D4" strokeWidth="1.5" />
                </svg>
              </button>
            </div>

            <div className="flex flex-col gap-0 mt-8 px-8">
              {[...NAV_ITEMS, { label: 'Begin Project', href: '#contact' }].map((item, i) => (
                <motion.button
                  key={item.href}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.33, delay: i * 0.066 }}
                  onClick={() => handleNavClick(item.href)}
                  className="text-left py-5 border-b border-nexus-border"
                  style={{
                    fontFamily: 'Bebas Neue, sans-serif',
                    fontSize: '2.2rem',
                    letterSpacing: '0.1em',
                    color: '#555555',
                    background: 'none',
                    border: 'none',
                    borderBottom: '1px solid #1A1A1A',
                    cursor: 'none',
                  }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#D4D4D4')}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#555555')}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>

            <div className="mt-auto px-8 pb-12">
              <div
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.66rem',
                  letterSpacing: '0.2em',
                  color: '#555555',
                  textAlign: 'center',
                }}
              >
                © 2024 33 NEXUS — 888
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
