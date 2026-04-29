'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import dynamic from 'next/dynamic'

const HeroAnimationLoop = dynamic(
  () => import('@/components/animations/HeroAnimationLoop').then(m => m.HeroAnimationLoop),
  { ssr: false }
)

const ACCENT = '#7BC5FF'

// Rotating badge component
function RotatingBadge() {
  const text = 'AVAILABLE FOR NEW PROJECTS · 2024 · 33 NEXUS · '
  const chars = text.split('')
  return (
    <div style={{ position: 'relative', width: '120px', height: '120px' }}>
      <div className="spin" style={{ position: 'absolute', inset: 0 }}>
        <svg viewBox="0 0 120 120" style={{ width: '100%', height: '100%' }}>
          <defs>
            <path id="circle-path" d="M 60,60 m -44,0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0" />
          </defs>
          <text style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9.5', fill: 'var(--cream-60)', letterSpacing: '0.5' }}>
            <textPath href="#circle-path">{text}</textPath>
          </text>
        </svg>
      </div>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--lime)', boxShadow: '0 0 12px var(--lime)' }} />
      </div>
    </div>
  )
}

export function HeroSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section ref={ref} id="hero" style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 40px 60px' }}>

      {/* Full-bleed cinematic animation */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <HeroAnimationLoop accent={ACCENT} />
      </div>

      {/* Dark overlay so text reads cleanly */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,8,8,0.9) 0%, rgba(8,8,8,0.3) 40%, rgba(8,8,8,0.1) 100%)', zIndex: 1 }} />

      {/* Content — bottom aligned like a film title card */}
      <motion.div style={{ y, opacity, position: 'relative', zIndex: 2, maxWidth: '1300px', width: '100%', margin: '0 auto' }}>

        {/* Top row — metadata */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}
        >
          <div className="label">— Full-service technology & AI consultancy</div>
          <RotatingBadge />
        </motion.div>

        {/* Main headline — left aligned, massive */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="display" style={{ fontSize: 'clamp(3rem, 10vw, 9.5rem)', color: 'var(--cream)', marginBottom: '0.1em' }}>
            WHERE
          </h1>
          <h1 className="display" style={{ fontSize: 'clamp(3rem, 10vw, 9.5rem)', color: 'transparent', WebkitTextStroke: '1.5px rgba(242,237,229,0.3)', marginBottom: '0.1em' }}>
            INTELLIGENCE
          </h1>
          <h1 className="display" style={{ fontSize: 'clamp(3rem, 10vw, 9.5rem)', color: 'var(--lime)' }}>
            CONVERGES
          </h1>
        </motion.div>

        {/* Bottom row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8 }}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '40px', flexWrap: 'wrap', gap: '24px' }}
        >
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)', color: 'var(--cream-60)', maxWidth: '420px', lineHeight: 1.7 }}>
            Elite software, AI systems, and cybersecurity. Built by an engineer who holds Security+, Network+, and A+ certifications — and thinks in systems.
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button className="btn btn-lime" onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}>
              Start a Project
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button className="btn btn-outline" onClick={() => document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' })}>
              View Work
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll line */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}
        style={{ position: 'absolute', right: '40px', top: '50%', transform: 'translateY(-50%)', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <motion.div animate={{ scaleY: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: '1px', height: '80px', background: 'linear-gradient(to bottom, transparent, var(--lime), transparent)', transformOrigin: 'top' }} />
      </motion.div>
    </section>
  )
}
