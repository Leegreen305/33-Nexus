'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const SERVICES = [
  { n: '01', title: 'Software Development', tags: ['Enterprise', 'SaaS', 'API'], desc: 'Custom software architecture built for scale, performance, and longevity.' },
  { n: '02', title: 'Web Development', tags: ['Next.js', 'React', 'Headless'], desc: 'Premium web experiences engineered to convert. Every pixel, every millisecond.' },
  { n: '03', title: 'AI Software Development', tags: ['LLMs', 'ML Pipelines', 'Custom AI'], desc: 'Intelligent systems powered by large language models and proprietary architectures.' },
  { n: '04', title: 'Mobile App Development', tags: ['iOS', 'Android', 'Cross-Platform'], desc: 'Native and cross-platform applications with zero performance compromise.' },
  { n: '05', title: 'AI Voice Agents', tags: ['Conversational AI', 'NLP', 'Telephony'], desc: 'AI that handles calls, qualifies leads, and books appointments at machine scale.' },
  { n: '06', title: 'AI Automation', tags: ['Workflows', 'RPA', 'Integration'], desc: 'End-to-end automation that eliminates overhead and scales without headcount.' },
  { n: '07', title: 'Custom AI Agents', tags: ['Autonomous', 'Trained on Your Data', 'Integrated'], desc: 'Bespoke agents operating autonomously within your systems and data.' },
  { n: '08', title: 'Cybersecurity Services', tags: ['Pentesting', 'SOC', 'Threat Intel'], desc: 'Enterprise-grade security across the full stack — assessment to operations.' },
]

function ServiceRow({ svc, index, isInView }: { svc: typeof SERVICES[0]; index: number; isInView: boolean }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.055, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'grid',
        gridTemplateColumns: '64px 1fr auto',
        gap: '24px',
        alignItems: 'center',
        padding: '28px 0',
        borderBottom: '1px solid rgba(242,237,229,0.08)',
        cursor: 'none',
        transition: 'background 0.2s',
        margin: hovered ? '0 -24px' : '0',
        padding: hovered ? '28px 24px' : '28px 0',
        borderRadius: hovered ? '4px' : '0',
        background: hovered ? 'rgba(242,237,229,0.02)' : 'transparent',
      }}
    >
      {/* Number */}
      <div className="label" style={{ color: hovered ? 'var(--lime)' : 'var(--cream-30)', transition: 'color 0.2s' }}>
        {svc.n}
      </div>

      {/* Title + desc */}
      <div>
        <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 'clamp(1.1rem, 2vw, 1.6rem)', color: 'var(--cream)', letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: '6px', transition: 'color 0.2s' }}>
          {svc.title}
        </div>
        <AnimatePresence>
          {hovered && (
            <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
              style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.88rem', color: 'var(--cream-60)', lineHeight: 1.6, overflow: 'hidden' }}>
              {svc.desc}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Tags */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
        {svc.tags.map(tag => (
          <span key={tag} style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.12em',
            color: hovered ? 'var(--lime)' : 'var(--cream-30)', border: `1px solid ${hovered ? 'rgba(191,255,0,0.3)' : 'rgba(242,237,229,0.08)'}`,
            padding: '4px 10px', textTransform: 'uppercase', transition: 'all 0.2s',
          }}>
            {tag}
          </span>
        ))}
        <div style={{ display: 'flex', alignItems: 'center', opacity: hovered ? 1 : 0, transition: 'opacity 0.2s', marginLeft: '8px' }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 10h12M10 4l6 6-6 6" stroke="var(--lime)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
      </div>
    </motion.div>
  )
}

export function ServicesSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-5%' })

  return (
    <section id="services" ref={ref} style={{ padding: 'clamp(80px, 10vw, 140px) 40px', maxWidth: '1300px', margin: '0 auto' }}>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
        style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'flex-end', marginBottom: '64px', gap: '40px', flexWrap: 'wrap' }}>
        <div>
          <div className="label" style={{ marginBottom: '20px' }}>— What we build</div>
          <h2 className="display" style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', color: 'var(--cream)' }}>
            Eight disciplines.<br />
            <span style={{ color: 'var(--lime)' }}>One team.</span>
          </h2>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div className="label" style={{ marginBottom: '12px' }}>Investment</div>
          <div style={{ fontFamily: 'DM Sans, sans-serif', fontStyle: 'italic', fontSize: '0.9rem', color: 'var(--cream-30)', maxWidth: '220px' }}>
            Discussed in consultation.<br />Never published online.
          </div>
        </div>
      </motion.div>

      {/* Services index list */}
      <div>
        {SERVICES.map((svc, i) => (
          <ServiceRow key={svc.n} svc={svc} index={i} isInView={isInView} />
        ))}
      </div>

      {/* Footer note */}
      <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.6 }}
        style={{ marginTop: '48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
        <p style={{ fontFamily: 'DM Sans, sans-serif', fontStyle: 'italic', fontSize: '0.88rem', color: 'var(--cream-30)' }}>
          Every engagement is custom-scoped. No off-the-shelf solutions.
        </p>
        <button className="btn btn-lime" onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}>
          Start a Conversation →
        </button>
      </motion.div>
    </section>
  )
}
