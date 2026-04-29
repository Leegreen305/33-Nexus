'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

// Footer has exactly 33 links/elements total
// Services: 8, Navigation: 6, Legal: 3, Social: 2, Stats: 3, Certs: 5, Misc: 6 = 33
const FOOTER_SERVICES = [
  'Software Development',
  'Web Development',
  'Mobile App Development',
  'AI Software Development',
  'AI Voice Agents',
  'AI Automation',
  'Custom AI Agents',
  'Cybersecurity Services',
]

const FOOTER_NAV = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/#services' },
  { label: 'About', href: '/#about' },
  { label: 'Process', href: '/#process' },
  { label: 'Work', href: '/#work' },
  { label: 'Contact', href: '/#contact' },
]

const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Client Portal', href: '/portal' },
]

export function Footer() {
  return (
    <footer className="relative pt-20 pb-12 px-6 overflow-hidden">
      {/* Sacred 888 watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        style={{ zIndex: 0 }}
      >
        <span
          style={{
            fontFamily: 'Bebas Neue, sans-serif',
            fontSize: 'clamp(8rem, 20vw, 20rem)',
            color: 'rgba(201,168,76,0.018)',
            letterSpacing: '-0.05em',
            lineHeight: 1,
            userSelect: 'none',
          }}
        >
          888
        </span>
      </div>

      {/* Top border */}
      <div
        style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.3) 33%, rgba(232,201,122,0.5) 50%, rgba(201,168,76,0.3) 66%, transparent 100%)',
          marginBottom: '3rem',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Main footer grid */}
        <div
          className="grid gap-12"
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            marginBottom: '4rem',
          }}
        >
          {/* Brand column */}
          <div className="col-span-full lg:col-span-1">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-4">
              <svg viewBox="0 0 40 40" fill="none" width="36" height="36">
                <polygon
                  points="14,2 26,2 38,14 38,26 26,38 14,38 2,26 2,14"
                  stroke="url(#ftGold)"
                  strokeWidth="1.5"
                  fill="none"
                />
                <rect
                  x="13" y="13" width="14" height="14"
                  stroke="url(#ftGold)"
                  strokeWidth="1"
                  fill="rgba(201,168,76,0.08)"
                  transform="rotate(33, 20, 20)"
                />
                <text x="20" y="24" textAnchor="middle" fill="#C9A84C" fontSize="8" fontFamily="Bebas Neue">33</text>
                <defs>
                  <linearGradient id="ftGold" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#C9A84C" />
                    <stop offset="50%" stopColor="#E8C97A" />
                    <stop offset="100%" stopColor="#8B6914" />
                  </linearGradient>
                </defs>
              </svg>
              <div>
                <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.32rem', letterSpacing: '0.15em', color: '#C9A84C' }}>
                  33 NEXUS
                </div>
              </div>
            </div>

            <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '0.99rem', fontStyle: 'italic', color: '#6B6560', lineHeight: 1.6, marginBottom: '1.5rem', maxWidth: '240px' }}>
              Where Intelligence Converges
            </p>

            {/* Social links — 2 elements */}
            <div className="flex gap-4">
              <a
                href="https://github.com/Leegreen305"
                target="_blank"
                rel="noopener noreferrer"
                style={{ cursor: 'none' }}
                className="group"
              >
                <div style={{
                  width: '36px', height: '36px', border: '1px solid #1F1F1F',
                  borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.33s ease',
                }}
                  onMouseEnter={(e) => { const t = e.currentTarget; t.style.borderColor = '#C9A84C'; t.style.background = 'rgba(201,168,76,0.08)' }}
                  onMouseLeave={(e) => { const t = e.currentTarget; t.style.borderColor = '#1F1F1F'; t.style.background = 'transparent' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#6B6560">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                </div>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ cursor: 'none' }}
              >
                <div style={{
                  width: '36px', height: '36px', border: '1px solid #1F1F1F',
                  borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.33s ease',
                }}
                  onMouseEnter={(e) => { const t = e.currentTarget; t.style.borderColor = '#C9A84C'; t.style.background = 'rgba(201,168,76,0.08)' }}
                  onMouseLeave={(e) => { const t = e.currentTarget; t.style.borderColor = '#1F1F1F'; t.style.background = 'transparent' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#6B6560">
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </div>
              </a>
            </div>
          </div>

          {/* Services column — 8 links */}
          <div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.2em', color: '#C9A84C', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
              Services
            </div>
            <div className="space-y-3">
              {FOOTER_SERVICES.map((service) => (
                <a
                  key={service}
                  href="#services"
                  onClick={(e) => { e.preventDefault(); document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' }) }}
                  className="block group"
                  style={{ cursor: 'none' }}
                >
                  <span style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '0.77rem',
                    color: '#6B6560',
                    transition: 'color 0.33s ease',
                  }}
                    onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#C9A84C' }}
                    onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '#6B6560' }}
                  >
                    {service}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Navigation column — 6 links */}
          <div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.2em', color: '#C9A84C', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
              Navigation
            </div>
            <div className="space-y-3">
              {FOOTER_NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block"
                  style={{ cursor: 'none' }}
                >
                  <span style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '0.77rem',
                    color: '#6B6560',
                    transition: 'color 0.33s ease',
                  }}
                    onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#C9A84C' }}
                    onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '#6B6560' }}
                  >
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Info column — Stats: 3, Certs: 5 = 8 */}
          <div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.2em', color: '#C9A84C', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
              Credentials
            </div>
            <div className="space-y-2 mb-6">
              {['CompTIA Security+', 'CompTIA Network+', 'CompTIA A+', 'Certified Cybersecurity Specialist', 'B.S. Information Technology'].map((cert) => (
                <div key={cert} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.77rem', color: '#6B6560' }}>
                  {cert}
                </div>
              ))}
            </div>

            {/* Stats — 3 elements */}
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.2em', color: '#C9A84C', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              By the Numbers
            </div>
            <div className="space-y-1">
              {[{ v: '88+', l: 'Projects' }, { v: '888+', l: 'Engineering Hours' }, { v: '33+', l: 'Enterprise Clients' }].map(({ v, l }) => (
                <div key={l} className="flex gap-3">
                  <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '0.88rem', color: '#C9A84C', minWidth: '44px' }}>{v}</span>
                  <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.77rem', color: '#6B6560' }}>{l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid #1F1F1F',
            paddingTop: '1.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', color: '#6B6560', letterSpacing: '0.15em' }}>
            © 2024 33 Nexus. Engineered to the 33rd Degree.
          </div>

          {/* Legal links — 3 */}
          <div className="flex gap-6">
            {LEGAL_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.55rem',
                  color: '#6B6560',
                  letterSpacing: '0.1em',
                  textDecoration: 'none',
                  cursor: 'none',
                  transition: 'color 0.33s ease',
                }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#C9A84C' }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '#6B6560' }}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Sacred marker */}
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', color: 'rgba(201,168,76,0.3)', letterSpacing: '0.3em' }}>
            888
          </div>
        </div>
      </div>
    </footer>
  )
}
