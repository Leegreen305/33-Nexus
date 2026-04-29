'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isOnMedia, setIsOnMedia] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 700, mass: 0.5 }
  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)

  useEffect(() => {
    setMounted(true)
    const checkMobile = () => setIsMobile(window.innerWidth <= 833)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (!mounted || isMobile) return

    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const handleDown = () => setIsClicking(true)
    const handleUp = () => setIsClicking(false)

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') !== null ||
        target.closest('button') !== null ||
        target.closest('[data-cursor="hover"]') !== null
      const isMedia =
        target.tagName === 'IMG' ||
        target.tagName === 'VIDEO' ||
        target.closest('[data-cursor="media"]') !== null

      setIsHovering(isInteractive)
      setIsOnMedia(isMedia)
    }

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mousemove', handleHover)
    window.addEventListener('mousedown', handleDown)
    window.addEventListener('mouseup', handleUp)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mousemove', handleHover)
      window.removeEventListener('mousedown', handleDown)
      window.removeEventListener('mouseup', handleUp)
    }
  }, [mounted, isMobile, mouseX, mouseY])

  if (!mounted || isMobile) return null

  const size = isOnMedia ? 88 : isHovering ? 44 : 33

  return (
    <>
      {/* Outer ring */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          width: size,
          height: size,
          borderRadius: '50%',
          border: `${isHovering ? '2px' : '1.5px'} solid #C9A84C`,
          background: isHovering ? 'rgba(201,168,76,0.12)' : 'transparent',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'width 0.33s ease, height 0.33s ease, background 0.33s ease',
        }}
        animate={{ scale: isClicking ? 0.8 : 1 }}
        transition={{ duration: 0.1 }}
      />

      {/* Inner dot */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          width: 4,
          height: 4,
          borderRadius: '50%',
          background: '#C9A84C',
          pointerEvents: 'none',
          zIndex: 9999,
        }}
      />
    </>
  )
}
