'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const STEPS = [
  { n: '01', phase: 'Discovery', title: 'Strategic Consultation', desc: 'We map your vision, technical requirements, and business objectives with surgical precision.' },
  { n: '02', phase: 'Discovery', title: 'Architecture Design', desc: 'Complete technical blueprint before a single line of code is written.' },
  { n: '03', phase: 'Discovery', title: 'Proposal & Agreement', desc: 'Detailed scope, timeline, and investment. Full transparency before commitment.' },
  { n: '04', phase: 'Construction', title: 'Development Sprint', desc: 'Agile cycles with weekly deliverables and continuous communication.' },
  { n: '05', phase: 'Construction', title: 'Quality Assurance', desc: 'Rigorous testing across all environments. Security audits in every phase.' },
  { n: '06', phase: 'Construction', title: 'Client Review', desc: 'You review every element. Your feedback shapes the final product.' },
  { n: '07', phase: 'Deployment', title: 'Launch & Integration', desc: 'Zero-downtime deployment with full integration testing.' },
  { n: '08', phase: 'Deployment', title: 'Ongoing Support', desc: 'Post-launch monitoring, maintenance, and iteration. The relationship continues.' },
]

const PHASE_ACCENT: Record<string, string> = {
  Discovery: '#7DF9FF',
  Construction: '#BF5AF2',
  Deployment: 'rgba(255,255,255,0.6)',
}

export function ProcessSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-5%' })

  return (
    <section id="process" ref={ref} style={{ padding: 'clamp(80px, 12vw, 160px) clamp(20px, 4vw, 60px)', maxWidth: '1300px', margin: '0 auto' }}>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: '72px' }}
      >
        <div className="label" style={{ marginBottom: '16px' }}>— How we work</div>
        <h2 className="heading" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#fff' }}>
          Eight steps.{' '}
          <span className="grad-text">Zero ambiguity.</span>
        </h2>
      </motion.div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
        {STEPS.map((step, i) => (
          <motion.div
            key={step.n}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            style={{
              display: 'grid',
              gridTemplateColumns: '80px 1fr 1fr',
              gap: '32px',
              padding: '28px 0',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              alignItems: 'center',
              cursor: 'none',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; e.currentTarget.style.paddingLeft = '12px'; e.currentTarget.style.paddingRight = '12px'; e.currentTarget.style.borderRadius = '12px'; e.currentTarget.style.margin = '0 -12px' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.paddingLeft = '0'; e.currentTarget.style.paddingRight = '0'; e.currentTarget.style.margin = '0' }}
          >
            {/* Number */}
            <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1rem', color: 'rgba(255,255,255,0.15)', letterSpacing: '-0.02em' }}>
              {step.n}
            </div>

            {/* Title + phase */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 'clamp(0.95rem, 1.5vw, 1.2rem)', color: '#fff', letterSpacing: '-0.01em' }}>
                  {step.title}
                </span>
              </div>
              <span className="tag" style={{ borderColor: `${PHASE_ACCENT[step.phase]}20`, color: PHASE_ACCENT[step.phase], background: `${PHASE_ACCENT[step.phase]}08` }}>
                Phase {step.phase}
              </span>
            </div>

            {/* Desc */}
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem', color: 'rgba(255,255,255,0.35)', lineHeight: 1.65 }}>
              {step.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
