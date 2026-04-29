'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'

const ConstellationBackground = dynamic(
  () => import('@/components/three/ConstellationBackground').then(m => m.ConstellationBackground),
  { ssr: false }
)

const WORDS = ['INTELLIGENT', 'IMPENETRABLE', 'INEVITABLE']

export function HeroSection() {
  const ref = useRef<HTMLElement>(null)
  const [wordIndex, setWordIndex] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  useEffect(() => {
    const t = setInterval(() => setWordIndex(i => (i + 1) % WORDS.length), 2200)
    return () => clearInterval(t)
  }, [])

  return (
    <section ref={ref} id="hero" style={{ position: 'relative', height: '100vh', minHeight: '700px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>

      {/* Constellation BG */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.6 }}>
        <ConstellationBackground />
      </div>

      {/* Gradient orbs */}
      <div className="orb" style={{ width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(125,249,255,0.08) 0%, transparent 70%)', top: '10%', left: '-10%' }} />
      <div className="orb" style={{ width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(191,90,242,0.08) 0%, transparent 70%)', bottom: '10%', right: '-5%' }} />

      {/* Vignette */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(to top, #000, transparent)' }} />

      {/* Content */}
      <motion.div style={{ y, opacity, position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 24px', maxWidth: '1100px', width: '100%' }}>

        {/* Status pill */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '40px' }}
        >
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#7DF9FF', boxShadow: '0 0 10px #7DF9FF', animation: 'pulse-dot 2s infinite' }} />
          <span className="label" style={{ color: 'rgba(255,255,255,0.5)' }}>Available for new projects</span>
        </motion.div>

        {/* Main headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="display" style={{ fontSize: 'clamp(52px, 9vw, 120px)', color: '#fff', marginBottom: '0' }}>
            Technology
            <br />
            Built to Be
            <br />
            <span style={{ display: 'inline-flex', alignItems: 'center', height: '1.1em', overflow: 'hidden' }}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={wordIndex}
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: '-100%', opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                  className="grad-text"
                  style={{ display: 'block' }}
                >
                  {WORDS[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>
        </motion.div>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{
            fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
            color: 'rgba(255,255,255,0.45)', maxWidth: '560px', margin: '28px auto 0',
            lineHeight: 1.7, fontStyle: 'italic',
          }}
        >
          Elite software engineering, AI systems, and cybersecurity — delivered by a team that operates at the highest possible frequency.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '48px', flexWrap: 'wrap' }}
        >
          <button className="btn-accent" onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}>
            Start Your Project
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <button className="btn-ghost" onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })}>
            View Services
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          style={{ display: 'flex', justifyContent: 'center', gap: '48px', marginTop: '72px', flexWrap: 'wrap' }}
        >
          {[
            { n: '88+', l: 'Projects delivered' },
            { n: '888+', l: 'Engineering hours' },
            { n: '33+', l: 'Enterprise clients' },
            { n: '8+', l: 'Years expertise' },
          ].map((s) => (
            <div key={s.l} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: '#fff', letterSpacing: '-0.03em', lineHeight: 1 }}>
                {s.n}
              </div>
              <div className="label" style={{ marginTop: '6px' }}>{s.l}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{ position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
          style={{ width: '1px', height: '48px', background: 'linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)' }} />
      </motion.div>
    </section>
  )
}
