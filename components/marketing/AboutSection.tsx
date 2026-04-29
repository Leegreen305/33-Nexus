'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const CERTS = ['CompTIA Security+', 'CompTIA Network+', 'CompTIA A+', 'Cybersecurity Specialist', 'B.S. Information Technology']
const SKILLS = ['Secure Architecture', 'AI Engineering', 'Full-Stack Development', 'Penetration Testing', 'LLM Integration', 'SOC Operations', 'DevSecOps', 'Cloud Infrastructure']

export function AboutSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-8%' })

  return (
    <section id="about" ref={ref} style={{ padding: 'clamp(80px, 12vw, 160px) clamp(20px, 4vw, 60px)', maxWidth: '1300px', margin: '0 auto' }}>

      {/* Large editorial statement */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ marginBottom: 'clamp(60px, 8vw, 120px)' }}
      >
        <div className="label" style={{ marginBottom: '32px' }}>— The Architect</div>
        <h2 style={{
          fontFamily: 'Syne, sans-serif', fontWeight: 800,
          fontSize: 'clamp(2rem, 5.5vw, 4.5rem)',
          color: '#fff', letterSpacing: '-0.04em', lineHeight: 1.0,
          maxWidth: '900px',
        }}>
          An engineer who speaks both languages:{' '}
          <span style={{ color: 'rgba(255,255,255,0.25)', fontStyle: 'italic' }}>code</span>
          {' '}and{' '}
          <span className="grad-text">security.</span>
        </h2>
      </motion.div>

      {/* Two-col layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(40px, 6vw, 80px)', alignItems: 'start' }}>

        {/* Left — bio */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1.05rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, marginBottom: '32px' }}>
            Lee is a cybersecurity professional and full-stack AI engineer holding a Bachelor of Science in Information Technology and certifications including CompTIA Security+, Network+, A+, and Certified Cybersecurity Specialist.
          </p>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1.05rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, marginBottom: '40px' }}>
            33 Nexus was founded to deliver technology at the highest possible frequency — where elite engineering meets impenetrable security, and every system is built to outlast the moment it was created.
          </p>

          {/* Links */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <a href="https://github.com/Leegreen305" target="_blank" rel="noopener noreferrer" style={{ cursor: 'none', textDecoration: 'none' }}>
              <button className="btn-ghost" style={{ padding: '10px 20px', fontSize: '0.82rem' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" /></svg>
                GitHub
              </button>
            </a>
            <a href="https://cnsvcs.com" target="_blank" rel="noopener noreferrer" style={{ cursor: 'none', textDecoration: 'none' }}>
              <button className="btn-ghost" style={{ padding: '10px 20px', fontSize: '0.82rem' }}>
                CNSVCS.com ↗
              </button>
            </a>
          </div>
        </motion.div>

        {/* Right — credentials + skills */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
        >
          {/* Certifications */}
          <div style={{ background: '#0D0D0D', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '20px', padding: '32px' }}>
            <div className="label" style={{ marginBottom: '20px' }}>Credentials</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {CERTS.map((c) => (
                <div key={c} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'linear-gradient(135deg, #7DF9FF, #BF5AF2)', flexShrink: 0 }} />
                  <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>{c}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Skill chips */}
          <div>
            <div className="label" style={{ marginBottom: '16px' }}>Specializations</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {SKILLS.map((s) => (
                <span key={s} className="tag">{s}</span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
