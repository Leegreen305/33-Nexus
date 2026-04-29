'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const WORKS = [
  {
    title: 'CNSVCS.COM',
    type: 'Live Product',
    category: 'Web Platform · AI-Driven',
    desc: 'A fully custom web platform for a professional services client. Complex AI architecture, premium design, enterprise-grade security and performance.',
    tags: ['Next.js', 'AI Integration', 'Custom Architecture', 'Enterprise Security'],
    accent: '#7DF9FF',
    live: true,
    url: 'https://cnsvcs.com',
  },
  {
    title: 'Enterprise AI Platform',
    type: 'NDA Protected',
    category: 'Custom AI Development',
    desc: 'End-to-end AI automation platform with LLM orchestration, custom agent frameworks, and real-time data pipelines at enterprise scale.',
    tags: ['AI Agents', 'LLMs', 'Automation', 'Pipeline'],
    accent: '#BF5AF2',
    live: false,
    url: null,
  },
  {
    title: 'Security Operations Center',
    type: 'NDA Protected',
    category: 'Cybersecurity',
    desc: 'Full SOC buildout with custom threat detection, incident response workflows, and real-time security monitoring infrastructure.',
    tags: ['SOC', 'Threat Detection', 'Incident Response'],
    accent: '#7DF9FF',
    live: false,
    url: null,
  },
]

export function FeaturedWorkSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-5%' })

  return (
    <section id="work" ref={ref} style={{ padding: 'clamp(80px, 12vw, 160px) clamp(20px, 4vw, 60px)', maxWidth: '1300px', margin: '0 auto' }}>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '60px', flexWrap: 'wrap', gap: '24px' }}
      >
        <div>
          <div className="label" style={{ marginBottom: '16px' }}>— Selected work</div>
          <h2 className="heading" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#fff' }}>
            Built. Delivered.<br />
            <span className="grad-text">Proven.</span>
          </h2>
        </div>
        <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem', color: 'rgba(255,255,255,0.3)', maxWidth: '280px', lineHeight: 1.7 }}>
          Most work is under NDA. Contact us to discuss relevant case studies for your industry.
        </p>
      </motion.div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {WORKS.map((w, i) => (
          <motion.div
            key={w.title}
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            style={{
              background: '#0D0D0D',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '20px',
              padding: 'clamp(28px, 4vw, 48px)',
              cursor: 'none',
              transition: 'border-color 0.25s, background 0.25s',
              position: 'relative', overflow: 'hidden',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.background = '#111' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.background = '#0D0D0D' }}
          >
            {/* Accent orb */}
            <div style={{ position: 'absolute', top: 0, right: 0, width: '300px', height: '300px', background: `radial-gradient(circle at top right, ${w.accent}08, transparent 70%)`, pointerEvents: 'none' }} />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '32px', alignItems: 'center', position: 'relative', zIndex: 1 }}>
              <div>
                {/* Status */}
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  {w.live && <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#7DF9FF', boxShadow: '0 0 8px #7DF9FF' }} />}
                  <span className="tag" style={{ borderColor: `${w.accent}25`, color: w.accent, background: `${w.accent}08` }}>
                    {w.type}
                  </span>
                </div>

                {/* Title */}
                <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(1.4rem, 3vw, 2rem)', color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '6px' }}>
                  {w.title}
                </h3>
                <div className="label" style={{ marginBottom: '20px' }}>{w.category}</div>

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {w.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>

              <div>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.95rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.75, marginBottom: '24px' }}>
                  {w.desc}
                </p>

                {w.url ? (
                  <a href={w.url} target="_blank" rel="noopener noreferrer" style={{ cursor: 'none', textDecoration: 'none' }}>
                    <button className="btn-ghost" style={{ padding: '10px 22px', fontSize: '0.82rem' }}>
                      Visit Site ↗
                    </button>
                  </a>
                ) : (
                  <button className="btn-ghost" style={{ padding: '10px 22px', fontSize: '0.82rem', opacity: 0.5 }}
                    onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}>
                    Request Case Study
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
