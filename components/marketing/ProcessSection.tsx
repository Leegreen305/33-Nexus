'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const STEPS = [
  { n: '01', phase: 'I — Discovery', title: 'Strategic Consultation', desc: 'Vision, requirements, and objectives mapped with surgical precision.' },
  { n: '02', phase: 'I — Discovery', title: 'Architecture Design', desc: 'Complete technical blueprint before a single line of code is written.' },
  { n: '03', phase: 'I — Discovery', title: 'Proposal & Agreement', desc: 'Detailed scope, timeline, investment. Transparency before commitment.' },
  { n: '04', phase: 'II — Construction', title: 'Development Sprint', desc: 'Agile cycles with weekly deliverables and continuous communication.' },
  { n: '05', phase: 'II — Construction', title: 'Quality Assurance', desc: 'Rigorous testing across all environments. Security audits every phase.' },
  { n: '06', phase: 'II — Construction', title: 'Client Review', desc: 'You review every element. Your feedback shapes the final product.' },
  { n: '07', phase: 'III — Deployment', title: 'Launch & Integration', desc: 'Zero-downtime deployment with full integration testing.' },
  { n: '08', phase: 'III — Deployment', title: 'Ongoing Support', desc: 'Post-launch monitoring and iteration. The relationship continues.' },
]

export function ProcessSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-5%' })

  return (
    <section id="process" ref={ref} style={{ padding: 'clamp(80px, 10vw, 140px) 40px', maxWidth: '1300px', margin: '0 auto' }}>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '40px', alignItems: 'flex-end', marginBottom: '64px' }}>
        <div>
          <div className="label" style={{ marginBottom: '20px' }}>— The method</div>
          <h2 className="display" style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', color: 'var(--cream)' }}>
            Eight steps.<br />
            <span style={{ color: 'var(--lime)' }}>Zero gaps.</span>
          </h2>
        </div>
        <p style={{ fontFamily: 'DM Sans, sans-serif', fontStyle: 'italic', fontSize: '1rem', color: 'var(--cream-30)', lineHeight: 1.75 }}>
          From first conversation to long-term support — every project follows the same rigorous eight-step method.
        </p>
      </motion.div>

      <div>
        {STEPS.map((step, i) => (
          <motion.div key={step.n}
            initial={{ opacity: 0, x: -12 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.45, delay: i * 0.05 }}
            style={{ display: 'grid', gridTemplateColumns: '64px 200px 1fr', gap: '32px', alignItems: 'baseline', padding: '24px 0', borderBottom: '1px solid var(--border)', cursor: 'none', transition: 'all 0.2s' }}
            onMouseEnter={e => { const t = e.currentTarget; t.style.background = 'rgba(191,255,0,0.02)'; t.style.margin = '0 -16px'; t.style.padding = '24px 16px' }}
            onMouseLeave={e => { const t = e.currentTarget; t.style.background = 'transparent'; t.style.margin = '0'; t.style.padding = '24px 0' }}
          >
            <div className="label" style={{ color: 'var(--lime)', opacity: 0.7 }}>{step.n}</div>
            <div className="label" style={{ color: 'var(--cream-30)' }}>{step.phase}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '24px', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 'clamp(1rem, 1.8vw, 1.3rem)', color: 'var(--cream)', letterSpacing: '-0.02em' }}>
                {step.title}
              </span>
              <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.88rem', color: 'var(--cream-30)', maxWidth: '400px', lineHeight: 1.55 }}>
                {step.desc}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
