'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import dynamic from 'next/dynamic'

const ConstellationBackground = dynamic(
  () => import('@/components/three/ConstellationBackground').then(m => m.ConstellationBackground),
  { ssr: false }
)

const STATS = [
  { value: '88+', label: 'Projects Delivered' },
  { value: '888+', label: 'Hours of Engineering' },
  { value: '33+', label: 'Enterprise Clients' },
]

// 33-word tagline (precisely counted):
// "Where intelligence converges with craft. Elite systems built for the demands of tomorrow.
// Secure. Scalable. Extraordinary. Engineered to the 33rd degree of absolute precision."
const TAGLINE =
  'Where intelligence converges with craft. Elite systems built for the demands of tomorrow. Secure. Scalable. Extraordinary. Engineered to the 33rd degree of absolute precision.'

function CountUpNumber({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const duration = 1320
          const steps = 33
          const increment = target / steps
          let current = 0
          const timer = setInterval(() => {
            current += increment
            if (current >= target) {
              setCount(target)
              clearInterval(timer)
            } else {
              setCount(Math.floor(current))
            }
          }, duration / steps)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative flex flex-col items-center justify-center overflow-hidden"
      style={{ height: '88vh', minHeight: '700px' }}
    >
      {/* Three.js Constellation Background */}
      <div className="absolute inset-0">
        <ConstellationBackground />
      </div>

      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(8,8,8,0) 0%, rgba(8,8,8,0.4) 50%, rgba(8,8,8,0.8) 100%)',
        }}
      />

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: '33%',
          background: 'linear-gradient(to top, #080808, transparent)',
        }}
      />

      {/* Main content with parallax */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-33 flex flex-col items-center text-center px-6 max-w-6xl mx-auto"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.66, delay: 0.33 }}
          className="flex items-center gap-3 mb-8"
        >
          <div
            style={{
              width: '33px',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, #D4D4D4)',
            }}
          />
          <span
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.66rem',
              letterSpacing: '0.3em',
              color: '#D4D4D4',
              textTransform: 'uppercase',
            }}
          >
            33 NEXUS — EST. 888
          </span>
          <div
            style={{
              width: '33px',
              height: '1px',
              background: 'linear-gradient(90deg, #D4D4D4, transparent)',
            }}
          />
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.99, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'Bebas Neue, sans-serif',
            fontSize: 'clamp(3.3rem, 9vw, 9.9rem)',
            lineHeight: '0.95',
            letterSpacing: '-0.02em',
            color: '#FFFFFF',
            marginBottom: '0.5rem',
          }}
        >
          WHERE
          <br />
          <span className="text-gold-gradient">INTELLIGENCE</span>
          <br />
          CONVERGES
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.66, delay: 0.88 }}
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(1.1rem, 2vw, 1.65rem)',
            fontStyle: 'italic',
            color: '#555555',
            marginTop: '1.5rem',
            maxWidth: '600px',
            lineHeight: 1.4,
          }}
        >
          Elite Software. Impenetrable Security. Infinite Possibility.
        </motion.p>

        {/* Tagline — 33 words */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.66, delay: 1.1 }}
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '0.88rem',
            color: '#555555',
            maxWidth: '520px',
            lineHeight: 1.7,
            marginTop: '1rem',
          }}
        >
          {TAGLINE}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.66, delay: 1.32 }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-10"
        >
          <a href="#contact">
            <button className="btn-gold font-heading tracking-widest">
              BEGIN YOUR PROJECT
            </button>
          </a>
          <a href="/portal/login">
            <button className="btn-outline font-heading tracking-widest">
              ENTER CLIENT PORTAL
            </button>
          </a>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.66, delay: 1.65 }}
          className="flex items-center gap-0 mt-16"
          style={{
            background: 'rgba(13,13,13,0.6)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(31,31,31,0.8)',
            borderRadius: '1.1rem',
            overflow: 'hidden',
          }}
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center px-8 py-5"
              style={{
                borderRight: i < STATS.length - 1 ? '1px solid #1A1A1A' : 'none',
                minWidth: '160px',
              }}
            >
              <span
                style={{
                  fontFamily: 'Bebas Neue, sans-serif',
                  fontSize: '2.2rem',
                  color: '#D4D4D4',
                  lineHeight: 1,
                  letterSpacing: '0.05em',
                }}
              >
                {stat.value}
              </span>
              <span
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '0.66rem',
                  color: '#555555',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  marginTop: '4px',
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.66, delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.55rem',
            letterSpacing: '0.25em',
            color: '#555555',
            textTransform: 'uppercase',
          }}
        >
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.32, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: '1px',
            height: '40px',
            background: 'linear-gradient(to bottom, #D4D4D4, transparent)',
          }}
        />
      </motion.div>
    </section>
  )
}
