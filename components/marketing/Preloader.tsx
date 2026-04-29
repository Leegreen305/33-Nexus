'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [pct, setPct] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const start = Date.now()
    const duration = 888
    const frame = () => {
      const elapsed = Date.now() - start
      const p = Math.min(elapsed / duration, 1)
      setPct(Math.floor(p * 100))
      if (p < 1) {
        requestAnimationFrame(frame)
      } else {
        setTimeout(() => {
          setDone(true)
          setTimeout(onComplete, 500)
        }, 100)
      }
    }
    requestAnimationFrame(frame)
  }, [onComplete])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0, y: '-8px' }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: '#000',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: '32px',
          }}
        >
          {/* Logo mark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div style={{ width: '56px', height: '56px', background: 'linear-gradient(135deg, #7DF9FF, #BF5AF2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '18px', color: '#000', letterSpacing: '-0.02em' }}>33</span>
            </div>
          </motion.div>

          {/* Brand */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.4rem', color: '#fff', letterSpacing: '-0.03em', marginBottom: '4px' }}>33 Nexus</div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Where intelligence converges</div>
          </motion.div>

          {/* Progress bar */}
          <div style={{ width: '180px', height: '1px', background: 'rgba(255,255,255,0.08)', borderRadius: '1px', overflow: 'hidden' }}>
            <motion.div
              style={{ height: '100%', background: 'linear-gradient(90deg, #7DF9FF, #BF5AF2)', borderRadius: '1px' }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.05 }}
            />
          </div>

          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.15em' }}>
            {pct}%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
