'use client'

import Link from 'next/link'

const SERVICES = ['Software Development', 'Web Development', 'Mobile Apps', 'AI Development', 'AI Voice Agents', 'AI Automation', 'Custom AI Agents', 'Cybersecurity']
const NAV = [{ l: 'Services', h: '#services' }, { l: 'Work', h: '#work' }, { l: 'Process', h: '#process' }, { l: 'About', h: '#about' }, { l: 'Contact', h: '#contact' }, { l: 'Portal', h: '/portal' }]

export function Footer() {
  const scrollTo = (h: string) => {
    if (h.startsWith('#')) document.querySelector(h)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: 'clamp(60px, 8vw, 100px) clamp(20px, 4vw, 60px) 40px', position: 'relative', overflow: 'hidden' }}>

      {/* 888 watermark */}
      <div style={{ position: 'absolute', bottom: '-40px', right: '-20px', fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(8rem, 20vw, 18rem)', color: 'rgba(255,255,255,0.015)', lineHeight: 1, pointerEvents: 'none', userSelect: 'none', letterSpacing: '-0.05em' }}>
        888
      </div>

      <div style={{ maxWidth: '1300px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Top — CTA */}
        <div style={{ marginBottom: '80px' }}>
          <div className="label" style={{ marginBottom: '20px' }}>— Ready to build?</div>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(2rem, 6vw, 5rem)', color: '#fff', letterSpacing: '-0.04em', lineHeight: 0.95, marginBottom: '32px' }}>
            Let's create something
            <br />
            <span style={{ background: 'linear-gradient(135deg, #7DF9FF, #BF5AF2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              extraordinary.
            </span>
          </h2>
          <button className="btn-accent" onClick={() => scrollTo('#contact')}>
            Start a Project
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>

        {/* Links grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '40px', marginBottom: '60px' }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <div style={{ width: '28px', height: '28px', background: 'linear-gradient(135deg, #7DF9FF, #BF5AF2)', borderRadius: '7px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '9px', color: '#000' }}>33</span>
              </div>
              <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '0.9rem', color: '#fff' }}>Nexus</span>
            </div>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.82rem', color: 'rgba(255,255,255,0.3)', lineHeight: 1.6 }}>
              Where intelligence converges.
            </p>
            <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
              <a href="https://github.com/Leegreen305" target="_blank" rel="noopener noreferrer" style={{ cursor: 'none' }}>
                <div style={{ width: '32px', height: '32px', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'border-color 0.2s, background 0.2s' }}
                  onMouseEnter={e => { const t = e.currentTarget; t.style.borderColor = 'rgba(255,255,255,0.2)'; t.style.background = 'rgba(255,255,255,0.04)' }}
                  onMouseLeave={e => { const t = e.currentTarget; t.style.borderColor = 'rgba(255,255,255,0.08)'; t.style.background = 'transparent' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="rgba(255,255,255,0.4)"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" /></svg>
                </div>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <div className="label" style={{ marginBottom: '16px' }}>Services</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {SERVICES.map(s => (
                <button key={s} onClick={() => scrollTo('#services')} style={{ background: 'none', border: 'none', cursor: 'none', textAlign: 'left', fontFamily: 'DM Sans, sans-serif', fontSize: '0.82rem', color: 'rgba(255,255,255,0.3)', transition: 'color 0.2s', padding: 0 }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <div className="label" style={{ marginBottom: '16px' }}>Navigation</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {NAV.map(n => (
                n.h.startsWith('#')
                  ? <button key={n.h} onClick={() => scrollTo(n.h)} style={{ background: 'none', border: 'none', cursor: 'none', textAlign: 'left', fontFamily: 'DM Sans, sans-serif', fontSize: '0.82rem', color: 'rgba(255,255,255,0.3)', transition: 'color 0.2s', padding: 0 }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}>
                    {n.l}
                  </button>
                  : <Link key={n.h} href={n.h} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.82rem', color: 'rgba(255,255,255,0.3)', textDecoration: 'none', transition: 'color 0.2s', cursor: 'none' }}
                    onMouseEnter={e => ((e.target as HTMLElement).style.color = 'rgba(255,255,255,0.7)')}
                    onMouseLeave={e => ((e.target as HTMLElement).style.color = 'rgba(255,255,255,0.3)')}>
                    {n.l}
                  </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.1em' }}>
            © 2024 33 Nexus. Engineered to the 33rd Degree.
          </span>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: 'rgba(255,255,255,0.08)', letterSpacing: '0.3em' }}>888</span>
        </div>
      </div>
    </footer>
  )
}
