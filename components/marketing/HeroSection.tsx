'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import dynamic from 'next/dynamic'

const FrequencyAnimation = dynamic(
  () => import('@/components/animations/FrequencyAnimation').then(m => m.FrequencyAnimation),
  { ssr: false }
)

function RotatingBadge() {
  const text = 'AVAILABLE FOR NEW PROJECTS · 2024 · 33 NEXUS · '
  return (
    <div style={{ position: 'relative', width: '110px', height: '110px', flexShrink: 0 }}>
      <div className="spin" style={{ position: 'absolute', inset: 0 }}>
        <svg viewBox="0 0 110 110" style={{ width: '100%', height: '100%' }}>
          <defs><path id="rp" d="M 55,55 m -40,0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" /></defs>
          <text style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '8.5', fill: 'rgba(242,237,229,0.5)', letterSpacing: '0.4' }}>
            <textPath href="#rp">{text}</textPath>
          </text>
        </svg>
      </div>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--lime)', boxShadow: '0 0 12px var(--lime)' }} />
      </div>
    </div>
  )
}

export function HeroSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0])

  return (
    <section ref={ref} id="hero" style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 40px 56px' }}>

      {/* Frequency animation — full bleed background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <FrequencyAnimation />
      </div>

      {/* Strong gradient: bottom half solid → animation visible top 50% only */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(to top, rgba(3,3,2,1) 0%, rgba(3,3,2,0.97) 28%, rgba(3,3,2,0.7) 45%, rgba(3,3,2,0.2) 62%, transparent 80%)' }} />

      {/* Hero content — bottom-left editorial, on top of animation */}
      <motion.div style={{ y, opacity, position: 'relative', zIndex: 2, maxWidth: '1300px', width: '100%', margin: '0 auto' }}>

        {/* Top label row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}
        >
          <div className="label">— Full-service technology & AI consultancy</div>
          <RotatingBadge />
        </motion.div>

        {/* Headline — left-aligned, massive, 3 lines */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="display" style={{ fontSize: 'clamp(3rem, 9.5vw, 9.2rem)', color: 'var(--cream)' }}>
            WHERE
          </h1>
          <h1 className="display" style={{ fontSize: 'clamp(3rem, 9.5vw, 9.2rem)', color: 'transparent', WebkitTextStroke: '1.5px rgba(242,237,229,0.22)' }}>
            INTELLIGENCE
          </h1>
          <h1 className="display" style={{ fontSize: 'clamp(3rem, 9.5vw, 9.2rem)', color: 'var(--lime)' }}>
            CONVERGES
          </h1>
        </motion.div>

        {/* Bottom row — descriptor + CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.7 }}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '36px', flexWrap: 'wrap', gap: '24px' }}
        >
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(0.88rem, 1.2vw, 1rem)', color: 'var(--cream-60)', maxWidth: '400px', lineHeight: 1.75 }}>
            Elite software, AI systems, and cybersecurity — built by an engineer who holds Security+, Network+, and A+ certifications and thinks in systems.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button className="btn btn-lime" onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}>
              Start a Project →
            </button>
            <button className="btn btn-outline" onClick={() => document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' })}>
              View Work
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        style={{ position: 'absolute', right: '40px', top: '50%', transform: 'translateY(-50%)', zIndex: 2 }}
      >
        <motion.div
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: 1, height: '80px', background: 'linear-gradient(to bottom, transparent, var(--lime), transparent)', transformOrigin: 'top', margin: '0 auto' }}
        />
      </motion.div>
    </section>
  )
}
