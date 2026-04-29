'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const WORKS = [
  {
    n: '01', title: 'CNSVCS.COM', type: 'Live', year: '2024',
    category: 'Web Platform · AI Architecture',
    desc: 'Fully custom web platform for a professional services client. Complex AI architecture, premium design, enterprise-grade security.',
    tags: ['Next.js', 'AI', 'Full-Stack'],
    url: 'https://cnsvcs.com', live: true,
  },
  {
    n: '02', title: 'Enterprise AI Platform', type: 'NDA', year: '2024',
    category: 'Custom AI Development',
    desc: 'End-to-end AI automation platform with LLM orchestration, custom agent frameworks, and real-time data pipelines.',
    tags: ['AI Agents', 'LLMs', 'Enterprise'],
    url: null, live: false,
  },
  {
    n: '03', title: 'Security Operations Center', type: 'NDA', year: '2023',
    category: 'Cybersecurity',
    desc: 'Full SOC buildout with custom threat detection, incident response workflows, and real-time monitoring infrastructure.',
    tags: ['SOC', 'Threat Detection', 'Security'],
    url: null, live: false,
  },
]

export function FeaturedWorkSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-5%' })

  return (
    <section id="work" ref={ref} style={{ padding: 'clamp(80px, 10vw, 140px) 40px', maxWidth: '1300px', margin: '0 auto' }}>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '64px', flexWrap: 'wrap', gap: '24px' }}>
        <div>
          <div className="label" style={{ marginBottom: '20px' }}>— Selected work</div>
          <h2 className="display" style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', color: 'var(--cream)' }}>
            Built &<br />
            <span style={{ color: 'var(--cream-30)', WebkitTextStroke: '1px rgba(242,237,229,0.25)', WebkitTextFillColor: 'transparent' }}>delivered.</span>
          </h2>
        </div>
        <p style={{ fontFamily: 'DM Sans, sans-serif', fontStyle: 'italic', fontSize: '0.9rem', color: 'var(--cream-30)', maxWidth: '260px', lineHeight: 1.7 }}>
          Most work is under NDA. Contact us for relevant case studies.
        </p>
      </motion.div>

      {/* Work list */}
      <div>
        {WORKS.map((w, i) => (
          <motion.div key={w.n}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            style={{ borderTop: i === 0 ? '1px solid var(--border)' : 'none', borderBottom: '1px solid var(--border)' }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '64px 1fr 1fr auto', gap: '32px', alignItems: 'center', padding: '40px 0', cursor: 'none', flexWrap: 'wrap' }}
              className="work-row"
              onMouseEnter={e => { const r = e.currentTarget; r.style.background = 'rgba(242,237,229,0.02)'; r.style.margin = '0 -24px'; r.style.padding = '40px 24px' }}
              onMouseLeave={e => { const r = e.currentTarget; r.style.background = 'transparent'; r.style.margin = '0'; r.style.padding = '40px 0' }}>

              {/* Number */}
              <div>
                <div className="label">{w.n}</div>
                <div style={{ marginTop: '8px', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.58rem', color: w.live ? 'var(--lime)' : 'var(--cream-30)', border: `1px solid ${w.live ? 'rgba(191,255,0,0.3)' : 'var(--border)'}`, padding: '3px 7px', display: 'inline-block' }}>
                  {w.type}
                </div>
              </div>

              {/* Title */}
              <div>
                <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(1.2rem, 2.5vw, 2rem)', color: 'var(--cream)', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '6px' }}>
                  {w.title}
                </div>
                <div className="label">{w.category} · {w.year}</div>
              </div>

              {/* Desc + tags */}
              <div style={{ display: 'none' }} className="md:block">
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.88rem', color: 'var(--cream-30)', lineHeight: 1.65, marginBottom: '12px' }}>{w.desc}</p>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {w.tags.map(t => (
                    <span key={t} style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.12em', color: 'var(--cream-30)', border: '1px solid var(--border)', padding: '3px 8px', textTransform: 'uppercase' }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Arrow */}
              <div>
                {w.url ? (
                  <a href={w.url} target="_blank" rel="noopener noreferrer" style={{ cursor: 'none', textDecoration: 'none' }}>
                    <button className="btn btn-lime" style={{ padding: '10px 20px', fontSize: '0.78rem' }}>Visit ↗</button>
                  </a>
                ) : (
                  <button className="btn btn-outline" style={{ padding: '10px 20px', fontSize: '0.78rem' }} onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}>
                    Case Study →
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
