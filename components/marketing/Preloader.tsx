'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface PreloaderProps {
  onComplete: () => void
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [count, setCount] = useState(0)
  const [phase, setPhase] = useState<'counting' | 'assembling' | 'burst' | 'exit'>('counting')

  useEffect(() => {
    // Count to 33 over 600ms
    const countInterval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 33) {
          clearInterval(countInterval)
          setPhase('assembling')
          return 33
        }
        return prev + 1
      })
    }, 18)

    return () => clearInterval(countInterval)
  }, [])

  useEffect(() => {
    if (phase === 'assembling') {
      const timer = setTimeout(() => setPhase('burst'), 400)
      return () => clearTimeout(timer)
    }
    if (phase === 'burst') {
      // Total preloader runs ~888ms
      const timer = setTimeout(() => {
        setPhase('exit')
        setTimeout(onComplete, 330)
      }, 200)
      return () => clearTimeout(timer)
    }
  }, [phase, onComplete])

  return (
    <AnimatePresence>
      {phase !== 'exit' ? (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: '-100%' }}
          transition={{ duration: 0.33, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-333 flex items-center justify-center bg-nexus-void overflow-hidden"
        >
          {/* Sacred geometry background */}
          <div className="absolute inset-0">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-5"
            >
              <svg viewBox="0 0 600 600" fill="none">
                <polygon
                  points="300,50 550,450 50,450"
                  stroke="#D4D4D4"
                  strokeWidth="1"
                  fill="none"
                />
                <rect
                  x="150"
                  y="150"
                  width="300"
                  height="300"
                  stroke="#D4D4D4"
                  strokeWidth="1"
                  fill="none"
                  transform="rotate(33, 300, 300)"
                />
                <polygon
                  points="300,120 470,210 470,390 300,480 130,390 130,210"
                  stroke="#D4D4D4"
                  strokeWidth="1"
                  fill="none"
                />
              </svg>
            </motion.div>
          </div>

          {/* Center assembly */}
          <div className="relative flex flex-col items-center gap-8">
            {/* Logo fragments assembling */}
            <div className="relative w-32 h-32">
              {/* Octagon frame */}
              <motion.div
                initial={{ opacity: 0, scale: 0, rotate: -33 }}
                animate={{
                  opacity: phase === 'counting' ? 0.5 : 1,
                  scale: phase === 'counting' ? 0.7 : 1,
                  rotate: 33,
                }}
                transition={{ duration: 0.66, ease: 'easeOut' }}
                className="absolute inset-0"
              >
                <svg viewBox="0 0 128 128" fill="none" className="w-full h-full">
                  <polygon
                    points="48,8 80,8 120,48 120,80 80,120 48,120 8,80 8,48"
                    stroke="url(#goldGrad)"
                    strokeWidth="1.5"
                    fill="none"
                  />
                  <defs>
                    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#D4D4D4" />
                      <stop offset="33%" stopColor="#F0F0F0" />
                      <stop offset="66%" stopColor="#D4D4D4" />
                      <stop offset="100%" stopColor="#7A7A7A" />
                    </linearGradient>
                  </defs>
                </svg>
              </motion.div>

              {/* Inner triangle */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: phase === 'counting' ? 0 : 1,
                  scale: phase === 'counting' ? 0 : 1,
                }}
                transition={{ duration: 0.33, delay: 0.33, ease: 'easeOut' }}
                className="absolute inset-4"
              >
                <svg viewBox="0 0 96 96" fill="none" className="w-full h-full">
                  <polygon
                    points="48,12 84,72 12,72"
                    stroke="#D4D4D4"
                    strokeWidth="1"
                    fill="rgba(212,212,212,0.05)"
                  />
                </svg>
              </motion.div>

              {/* Center "33" text */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: phase === 'counting' ? 0 : 1 }}
                transition={{ duration: 0.33, delay: 0.5 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <span
                  className="font-heading text-nexus-gold text-xl"
                  style={{ fontSize: '1.1rem', fontFamily: 'Bebas Neue, sans-serif', color: '#D4D4D4' }}
                >
                  33
                </span>
              </motion.div>
            </div>

            {/* Brand name assembling */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.33, delay: 0.2 }}
              className="text-center"
            >
              <div
                style={{
                  fontFamily: 'Bebas Neue, sans-serif',
                  fontSize: '2.2rem',
                  letterSpacing: '0.33em',
                  color: '#D4D4D4',
                }}
              >
                33 NEXUS
              </div>
              <div
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '0.66rem',
                  letterSpacing: '0.3em',
                  color: '#555555',
                  marginTop: '8px',
                  textTransform: 'uppercase',
                }}
              >
                Where Intelligence Converges
              </div>
            </motion.div>

            {/* Sacred counter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3"
            >
              <div
                className="font-mono text-nexus-muted text-xs"
                style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.66rem', color: '#555555' }}
              >
                INITIALIZING
              </div>
              <div
                className="font-heading text-nexus-gold"
                style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.1rem', color: '#D4D4D4', minWidth: '2ch' }}
              >
                {String(count).padStart(2, '0')}
              </div>
              <div
                className="font-mono text-nexus-muted text-xs"
                style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.66rem', color: '#555555' }}
              >
                / 33
              </div>
            </motion.div>

            {/* Loading bar — 33 segments */}
            <div
              style={{
                width: '200px',
                height: '2px',
                background: '#1A1A1A',
                borderRadius: '1px',
                overflow: 'hidden',
              }}
            >
              <motion.div
                animate={{ width: `${(count / 33) * 100}%` }}
                transition={{ duration: 0.05 }}
                style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, #D4D4D4, #F0F0F0)',
                  boxShadow: '0 0 8px rgba(212,212,212,0.6)',
                }}
              />
            </div>
          </div>

          {/* Gold burst on completion */}
          {phase === 'burst' && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 0.6, 0], scale: [0, 3] }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div
                style={{
                  width: '400px',
                  height: '400px',
                  background: 'radial-gradient(circle, rgba(212,212,212,0.4) 0%, transparent 70%)',
                  borderRadius: '50%',
                }}
              />
            </motion.div>
          )}
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
