'use client'

import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const [segments, setSegments] = useState(0)

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      // 33 increments for the sacred number
      setSegments(Math.floor(v * 33))
    })
    return unsubscribe
  }, [scrollYProgress])

  const width = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <div className="fixed top-0 left-0 right-0 z-333 h-[2px] bg-nexus-border">
      <motion.div
        style={{ width }}
        className="h-full"
        style={{
          width,
          height: '2px',
          background: 'linear-gradient(90deg, #C9A84C 0%, #E8C97A 33%, #C9A84C 66%, #8B6914 100%)',
          boxShadow: '0 0 8px rgba(201,168,76,0.6)',
        }}
      />
      {/* Sacred 33 segment markers */}
      <div className="absolute top-0 left-0 right-0 flex justify-between">
        {Array.from({ length: 33 }).map((_, i) => (
          <div
            key={i}
            className="w-px h-full transition-opacity duration-330"
            style={{
              background: 'rgba(201,168,76,0.2)',
              opacity: i < segments ? 1 : 0,
            }}
          />
        ))}
      </div>
    </div>
  )
}
