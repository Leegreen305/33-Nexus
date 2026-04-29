'use client'

import Link from 'next/link'

const NAV = [{ l: 'Services', h: '#services' }, { l: 'Work', h: '#work' }, { l: 'Process', h: '#process' }, { l: 'About', h: '#about' }]
const SERVICES = ['Software Development', 'Web Development', 'AI Development', 'Mobile Apps', 'AI Voice Agents', 'AI Automation', 'Custom AI Agents', 'Cybersecurity']

const go = (h: string) => { if (h.startsWith('#')) document.querySelector(h)?.scrollIntoView({ behavior: 'smooth' }) }

export function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', background: 'var(--ink)' }}>

      {/* CTA strip — lime background */}
      <div style={{ background: 'var(--lime)', padding: 'clamp(48px, 6vw, 80px) 40px' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '32px' }}>
          <div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(8,8,8,0.4)', marginBottom: '12px' }}>
              — Ready to build?
            </div>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 4rem)', color: 'var(--ink)', letterSpacing: '-0.04em', lineHeight: 0.95 }}>
              Let's create something<br />
              <em style={{ fontStyle: 'italic', fontWeight: 300 }}>extraordinary.</em>
            </h2>
          </div>
          <button
            className="btn"
            onClick={() => go('#contact')}
            style={{ background: 'var(--ink)', color: 'var(--lime)', padding: '16px 36px', fontSize: '0.9rem', fontFamily: 'Syne, sans-serif', fontWeight: 700, border: 'none', cursor: 'none', transition: 'all 0.2s', letterSpacing: '0.04em' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#111')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--ink)')}
          >
            Start a Project →
          </button>
        </div>
      </div>

      {/* Main footer */}
      <div style={{ padding: 'clamp(48px, 6vw, 80px) 40px 40px', maxWidth: '1300px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '48px', marginBottom: '60px' }}>

          {/* Brand */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-0.03em', color: 'var(--cream)' }}>33 Nexus</span>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--lime)', display: 'inline-block' }} />
            </div>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontStyle: 'italic', fontSize: '0.85rem', color: 'var(--cream-30)', lineHeight: 1.6, marginBottom: '20px' }}>
              Where intelligence converges.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <a href="https://github.com/Leegreen305" target="_blank" rel="noopener noreferrer" style={{ cursor: 'none' }}>
                <div style={{ width: '32px', height: '32px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'border-color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--cream-30)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--cream-30)"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" /></svg>
                </div>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <div className="label" style={{ marginBottom: '20px' }}>Services</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {SERVICES.map(s => (
                <button key={s} onClick={() => go('#services')} style={{ background: 'none', border: 'none', cursor: 'none', textAlign: 'left', fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem', color: 'var(--cream-30)', transition: 'color 0.15s', padding: 0 }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--cream)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--cream-30)')}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <div className="label" style={{ marginBottom: '20px' }}>Navigation</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[...NAV, { l: 'Contact', h: '#contact' }, { l: 'Client Portal', h: '/portal' }].map(n => (
                n.h.startsWith('#')
                  ? <button key={n.h} onClick={() => go(n.h)} style={{ background: 'none', border: 'none', cursor: 'none', textAlign: 'left', fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem', color: 'var(--cream-30)', transition: 'color 0.15s', padding: 0 }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--cream)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--cream-30)')}>
                    {n.l}
                  </button>
                  : <Link key={n.h} href={n.h} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem', color: 'var(--cream-30)', textDecoration: 'none', transition: 'color 0.15s', cursor: 'none' }}
                    onMouseEnter={e => ((e.target as HTMLElement).style.color = 'var(--cream)')}
                    onMouseLeave={e => ((e.target as HTMLElement).style.color = 'var(--cream-30)')}>
                    {n.l}
                  </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: 'var(--cream-30)', letterSpacing: '0.1em' }}>
            © 2024 33 Nexus. Engineered to the 33rd Degree.
          </span>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: 'rgba(242,237,229,0.08)', letterSpacing: '0.3em' }}>888</span>
        </div>
      </div>
    </footer>
  )
}
