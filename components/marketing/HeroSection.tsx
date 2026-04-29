'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import dynamic from 'next/dynamic'

const HeroAnimationLoop = dynamic(
  () => import('@/components/animations/HeroAnimationLoop').then(m => m.HeroAnimationLoop),
  { ssr: false }
)

const ACCENT = '#7BC5FF'

export function HeroSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  return (
    <section
      ref={ref}
      id="hero"
      style={{ position: 'relative', height: '100vh', minHeight: '680px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      {/* Full-bleed cinematic animation */}
      <HeroAnimationLoop accent={ACCENT} />

      {/* Bottom fade to site background */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '30%', background: 'linear-gradient(to top, #000, transparent)', pointerEvents: 'none', zIndex: 2 }} />

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        style={{ position: 'absolute', bottom: '28px', left: '50%', transform: 'translateX(-50%)', zIndex: 3 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: 1, height: 44, background: `linear-gradient(to bottom, ${ACCENT}88, transparent)`, margin: '0 auto' }}
        />
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.25em', color: `${ACCENT}66`, textAlign: 'center', marginTop: '8px', textTransform: 'uppercase' }}>
          Scroll
        </div>
      </motion.div>
    </section>
  )
}
