'use client'

import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  z: number
  vx: number
  vy: number
  size: number
  opacity: number
  pulse: number
  pulseSpeed: number
}

interface Particle {
  x: number
  y: number
  z: number
  vx: number
  vy: number
  size: number
  opacity: number
  type: 'star' | 'ambient'
}

export function ConstellationBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animFrameRef = useRef<number>(0)
  const starsRef = useRef<Star[]>([])
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', handleMouse)

    // 33 constellation stars
    starsRef.current = Array.from({ length: 33 }, (_, i) => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      z: Math.random() * 500 + 100,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      size: Math.random() * 2.5 + 1,
      opacity: Math.random() * 0.6 + 0.3,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.02 + 0.01,
    }))

    // 55 ambient particles (33 + 55 = 88 total)
    particlesRef.current = Array.from({ length: 55 }, (_, i) => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      z: Math.random() * 300 + 50,
      vx: (Math.random() - 0.5) * 0.08,
      vy: (Math.random() - 0.5) * 0.08,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.25 + 0.05,
      type: 'ambient' as const,
    }))

    const GOLD = '#D4D4D4'
    const GOLD_DIM = 'rgba(212,212,212,0.3)'
    const GOLD_ELECTRIC = 'rgba(0,212,255,0.15)'

    let time = 0

    const draw = () => {
      time += 0.01
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const stars = starsRef.current
      const particles = particlesRef.current
      const mouse = mouseRef.current

      // Update and draw ambient particles
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        const scale = 600 / (600 + p.z)
        const px = p.x * scale + (1 - scale) * canvas.width * 0.5
        const py = p.y * scale + (1 - scale) * canvas.height * 0.5
        const size = p.size * scale

        ctx.beginPath()
        ctx.arc(px, py, size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(212,212,212,${p.opacity * 0.5})`
        ctx.fill()
      })

      // Update stars
      stars.forEach((star) => {
        // Subtle mouse parallax
        const distX = (mouse.x - canvas.width / 2) * 0.00005
        const distY = (mouse.y - canvas.height / 2) * 0.00005
        star.x += star.vx + distX
        star.y += star.vy + distY
        star.pulse += star.pulseSpeed

        if (star.x < 0) star.x = canvas.width
        if (star.x > canvas.width) star.x = 0
        if (star.y < 0) star.y = canvas.height
        if (star.y > canvas.height) star.y = 0
      })

      // Draw constellation lines between nearby stars
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x
          const dy = stars[i].y - stars[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 180) {
            const opacity = (1 - dist / 180) * 0.15
            ctx.beginPath()
            ctx.moveTo(stars[i].x, stars[i].y)
            ctx.lineTo(stars[j].x, stars[j].y)
            ctx.strokeStyle = `rgba(212,212,212,${opacity})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      // Draw 33 constellation stars
      stars.forEach((star, index) => {
        const pulseOpacity = star.opacity * (0.7 + 0.3 * Math.sin(star.pulse))
        const pulseSize = star.size * (0.9 + 0.1 * Math.sin(star.pulse * 1.3))

        // Glow
        const gradient = ctx.createRadialGradient(
          star.x, star.y, 0,
          star.x, star.y, pulseSize * 8
        )
        gradient.addColorStop(0, `rgba(212,212,212,${pulseOpacity * 0.6})`)
        gradient.addColorStop(1, 'rgba(212,212,212,0)')
        ctx.beginPath()
        ctx.arc(star.x, star.y, pulseSize * 8, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // Core star
        ctx.beginPath()
        ctx.arc(star.x, star.y, pulseSize, 0, Math.PI * 2)
        ctx.fillStyle = index % 3 === 0
          ? `rgba(232,201,122,${pulseOpacity})`
          : `rgba(212,212,212,${pulseOpacity})`
        ctx.fill()

        // Some stars have cross-hair
        if (index % 8 === 0) {
          ctx.beginPath()
          ctx.moveTo(star.x - pulseSize * 4, star.y)
          ctx.lineTo(star.x + pulseSize * 4, star.y)
          ctx.moveTo(star.x, star.y - pulseSize * 4)
          ctx.lineTo(star.x, star.y + pulseSize * 4)
          ctx.strokeStyle = `rgba(212,212,212,${pulseOpacity * 0.4})`
          ctx.lineWidth = 0.5
          ctx.stroke()
        }
      })

      animFrameRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animFrameRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouse)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.8 }}
    />
  )
}
