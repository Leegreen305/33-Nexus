'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const SERVICES = [
  { id: '01', title: 'Software Development', desc: 'Custom software architecture built for scale, performance, and longevity. Enterprise systems to lean SaaS.', span: 'col-span-12 md:col-span-5', tall: false, accent: '#7DF9FF' },
  { id: '02', title: 'Web Development', desc: 'Premium web experiences that convert. Every pixel intentional, every interaction purposeful.', span: 'col-span-12 md:col-span-7', tall: false, accent: '#BF5AF2' },
  { id: '03', title: 'AI Software Development', desc: 'Intelligent systems powered by large language models, custom ML pipelines, and proprietary architectures.', span: 'col-span-12 md:col-span-7', tall: false, accent: '#7DF9FF' },
  { id: '04', title: 'Mobile Apps', desc: 'Native and cross-platform applications — the performance of native code with unified efficiency.', span: 'col-span-12 md:col-span-5', tall: false, accent: '#BF5AF2' },
  { id: '05', title: 'AI Voice Agents', desc: 'Conversational AI that handles calls, qualifies leads, books appointments — at machine scale.', span: 'col-span-12 md:col-span-4', tall: false, accent: '#7DF9FF' },
  { id: '06', title: 'AI Automation', desc: 'End-to-end workflow automation. Eliminate overhead, scale without headcount.', span: 'col-span-12 md:col-span-4', tall: false, accent: '#BF5AF2' },
  { id: '07', title: 'Custom AI Agents', desc: 'Bespoke agents trained on your data, integrated into your stack, operating autonomously.', span: 'col-span-12 md:col-span-4', tall: false, accent: '#7DF9FF' },
  { id: '08', title: 'Cybersecurity', desc: 'Enterprise-grade security assessment, penetration testing, SOC operations, and threat intelligence.', span: 'col-span-12', tall: false, accent: '#BF5AF2', wide: true },
]

function ServiceCard({ svc, index, isInView }: { svc: typeof SERVICES[0]; index: number; isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className={`${svc.span} glow-border`}
      style={{
        background: '#0D0D0D',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '20px',
        padding: svc.wide ? '40px 48px' : '36px',
        cursor: 'none',
        position: 'relative',
        overflow: 'hidden',
        transition: 'border-color 0.25s ease, background 0.25s ease',
        display: 'flex',
        flexDirection: svc.wide ? 'row' : 'column',
        alignItems: svc.wide ? 'center' : 'flex-start',
        justifyContent: svc.wide ? 'space-between' : 'flex-start',
        gap: svc.wide ? '40px' : '0',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = '#111'
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = '#0D0D0D'
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
      }}
    >
      {/* Subtle accent glow */}
      <div style={{
        position: 'absolute', top: '-60px', right: '-60px',
        width: '200px', height: '200px',
        borderRadius: '50%',
        background: `radial-gradient(circle, ${svc.accent}10 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      <div style={{ flex: svc.wide ? '0 1 auto' : 1 }}>
        {/* Number */}
        <div className="label" style={{ marginBottom: '20px', color: svc.accent, opacity: 0.7 }}>{svc.id}</div>

        {/* Title */}
        <h3 style={{
          fontFamily: 'Syne, sans-serif', fontWeight: 700,
          fontSize: svc.wide ? 'clamp(1.6rem, 2.5vw, 2.2rem)' : 'clamp(1.1rem, 2vw, 1.4rem)',
          color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.15,
          marginBottom: '14px',
        }}>
          {svc.title}
        </h3>

        {!svc.wide && (
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.65 }}>
            {svc.desc}
          </p>
        )}
      </div>

      {svc.wide && (
        <div style={{ flex: '0 1 500px' }}>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, marginBottom: '24px' }}>
            {svc.desc}
          </p>
          <button className="btn-ghost" style={{ padding: '10px 24px', fontSize: '0.82rem' }}
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}>
            Discuss Your Project →
          </button>
        </div>
      )}

      {!svc.wide && (
        <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.25)' }}>
          <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.8rem' }}>Inquire</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
      )}
    </motion.div>
  )
}

export function ServicesSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-8%' })

  return (
    <section id="services" ref={ref} style={{ padding: 'clamp(80px, 12vw, 160px) clamp(20px, 4vw, 60px)', maxWidth: '1300px', margin: '0 auto' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '60px', flexWrap: 'wrap', gap: '24px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="label" style={{ marginBottom: '16px' }}>— What we build</div>
          <h2 className="heading" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#fff' }}>
            Eight disciplines.<br />
            <span className="grad-text">One team.</span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.95rem', color: 'rgba(255,255,255,0.35)', maxWidth: '320px', lineHeight: 1.7 }}
        >
          Every engagement is custom-scoped. Investment is discussed during consultation — never published.
        </motion.p>
      </div>

      {/* Bento grid */}
      <div className="bento">
        {SERVICES.map((svc, i) => (
          <ServiceCard key={svc.id} svc={svc} index={i} isInView={isInView} />
        ))}
      </div>
    </section>
  )
}
