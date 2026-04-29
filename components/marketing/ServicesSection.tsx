'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { SERVICES } from '@/lib/constants'

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  code: (
    <svg viewBox="0 0 48 48" fill="none" width="40" height="40">
      <polyline points="14,18 6,24 14,30" stroke="url(#svcGold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="34,18 42,24 34,30" stroke="url(#svcGold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="28" y1="10" x2="20" y2="38" stroke="url(#svcGold)" strokeWidth="2" strokeLinecap="round" />
      <defs>
        <linearGradient id="svcGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C9A84C" />
          <stop offset="50%" stopColor="#E8C97A" />
          <stop offset="100%" stopColor="#8B6914" />
        </linearGradient>
      </defs>
    </svg>
  ),
  web: (
    <svg viewBox="0 0 48 48" fill="none" width="40" height="40">
      <rect x="4" y="8" width="40" height="32" rx="3" stroke="#C9A84C" strokeWidth="1.5" />
      <line x1="4" y1="18" x2="44" y2="18" stroke="#C9A84C" strokeWidth="1" />
      <circle cx="11" cy="13" r="2" fill="#8B6914" />
      <circle cx="18" cy="13" r="2" fill="#C9A84C" />
      <circle cx="25" cy="13" r="2" fill="#E8C97A" />
      <rect x="10" y="24" width="28" height="4" rx="1" fill="rgba(201,168,76,0.2)" />
      <rect x="10" y="32" width="20" height="3" rx="1" fill="rgba(201,168,76,0.1)" />
    </svg>
  ),
  mobile: (
    <svg viewBox="0 0 48 48" fill="none" width="40" height="40">
      <rect x="14" y="4" width="20" height="40" rx="4" stroke="#C9A84C" strokeWidth="1.5" />
      <line x1="14" y1="12" x2="34" y2="12" stroke="#C9A84C" strokeWidth="1" />
      <line x1="14" y1="36" x2="34" y2="36" stroke="#C9A84C" strokeWidth="1" />
      <circle cx="24" cy="41" r="2" fill="#C9A84C" />
      <rect x="19" y="7" width="10" height="2" rx="1" fill="#8B6914" />
      <rect x="18" y="17" width="12" height="2" rx="1" fill="rgba(201,168,76,0.3)" />
      <rect x="18" y="22" width="12" height="2" rx="1" fill="rgba(201,168,76,0.2)" />
      <rect x="18" y="27" width="8" height="2" rx="1" fill="rgba(201,168,76,0.15)" />
    </svg>
  ),
  ai: (
    <svg viewBox="0 0 48 48" fill="none" width="40" height="40">
      <circle cx="24" cy="24" r="6" stroke="#C9A84C" strokeWidth="1.5" />
      <circle cx="8" cy="10" r="3" stroke="#8B6914" strokeWidth="1" />
      <circle cx="40" cy="10" r="3" stroke="#8B6914" strokeWidth="1" />
      <circle cx="8" cy="38" r="3" stroke="#8B6914" strokeWidth="1" />
      <circle cx="40" cy="38" r="3" stroke="#8B6914" strokeWidth="1" />
      <circle cx="24" cy="5" r="3" stroke="#E8C97A" strokeWidth="1" />
      <circle cx="24" cy="43" r="3" stroke="#E8C97A" strokeWidth="1" />
      <line x1="8" y1="10" x2="20" y2="22" stroke="rgba(201,168,76,0.4)" strokeWidth="1" />
      <line x1="40" y1="10" x2="28" y2="22" stroke="rgba(201,168,76,0.4)" strokeWidth="1" />
      <line x1="8" y1="38" x2="20" y2="26" stroke="rgba(201,168,76,0.4)" strokeWidth="1" />
      <line x1="40" y1="38" x2="28" y2="26" stroke="rgba(201,168,76,0.4)" strokeWidth="1" />
      <line x1="24" y1="5" x2="24" y2="18" stroke="rgba(201,168,76,0.4)" strokeWidth="1" />
      <line x1="24" y1="30" x2="24" y2="43" stroke="rgba(201,168,76,0.4)" strokeWidth="1" />
    </svg>
  ),
  voice: (
    <svg viewBox="0 0 48 48" fill="none" width="40" height="40">
      <rect x="18" y="6" width="12" height="22" rx="6" stroke="#C9A84C" strokeWidth="1.5" />
      <path d="M10 26c0 7.732 6.268 14 14 14s14-6.268 14-14" stroke="#E8C97A" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="24" y1="40" x2="24" y2="45" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="18" y1="45" x2="30" y2="45" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
      {[12, 18, 24, 30, 36].map((x, i) => (
        <rect key={x} x={x - 1} y={28 - [4, 8, 10, 6, 3][i]} width="2" height={[4, 8, 10, 6, 3][i] * 2} rx="1" fill="rgba(201,168,76,0.4)" />
      ))}
    </svg>
  ),
  automation: (
    <svg viewBox="0 0 48 48" fill="none" width="40" height="40">
      <rect x="4" y="10" width="12" height="10" rx="2" stroke="#C9A84C" strokeWidth="1.5" />
      <rect x="18" y="4" width="12" height="10" rx="2" stroke="#E8C97A" strokeWidth="1.5" />
      <rect x="32" y="10" width="12" height="10" rx="2" stroke="#C9A84C" strokeWidth="1.5" />
      <rect x="4" y="28" width="12" height="10" rx="2" stroke="#8B6914" strokeWidth="1.5" />
      <rect x="18" y="34" width="12" height="10" rx="2" stroke="#C9A84C" strokeWidth="1.5" />
      <rect x="32" y="28" width="12" height="10" rx="2" stroke="#8B6914" strokeWidth="1.5" />
      <line x1="16" y1="15" x2="18" y2="9" stroke="rgba(201,168,76,0.6)" strokeWidth="1" />
      <line x1="30" y1="9" x2="32" y2="15" stroke="rgba(201,168,76,0.6)" strokeWidth="1" />
      <line x1="10" y1="20" x2="10" y2="28" stroke="rgba(201,168,76,0.4)" strokeWidth="1" />
      <line x1="24" y1="14" x2="24" y2="34" stroke="rgba(201,168,76,0.4)" strokeWidth="1" />
      <line x1="38" y1="20" x2="38" y2="28" stroke="rgba(201,168,76,0.4)" strokeWidth="1" />
    </svg>
  ),
  agent: (
    <svg viewBox="0 0 48 48" fill="none" width="40" height="40">
      <polygon points="24,4 44,14 44,34 24,44 4,34 4,14" stroke="#C9A84C" strokeWidth="1.5" fill="rgba(201,168,76,0.05)" />
      <circle cx="24" cy="20" r="8" stroke="#E8C97A" strokeWidth="1.5" fill="none" />
      <circle cx="24" cy="24" r="14" stroke="rgba(201,168,76,0.2)" strokeWidth="0.5" fill="none" />
      <circle cx="24" cy="20" r="3" fill="#C9A84C" />
      <line x1="24" y1="12" x2="24" y2="9" stroke="#C9A84C" strokeWidth="1" strokeLinecap="round" />
      <line x1="32" y1="20" x2="35" y2="20" stroke="#C9A84C" strokeWidth="1" strokeLinecap="round" />
      <line x1="16" y1="20" x2="13" y2="20" stroke="#C9A84C" strokeWidth="1" strokeLinecap="round" />
      <line x1="29.6" y1="14.4" x2="32" y2="12" stroke="#C9A84C" strokeWidth="1" strokeLinecap="round" />
    </svg>
  ),
  security: (
    <svg viewBox="0 0 48 48" fill="none" width="40" height="40">
      <path
        d="M24 4L8 12v12c0 10.5 6.8 20.3 16 23.5C33.2 44.3 40 34.5 40 24V12L24 4z"
        stroke="#C9A84C"
        strokeWidth="1.5"
        fill="rgba(201,168,76,0.05)"
      />
      <path
        d="M24 10L13 16v9c0 7.7 5 14.9 11 17.2"
        stroke="rgba(201,168,76,0.3)"
        strokeWidth="0.5"
        fill="none"
      />
      <polyline
        points="16,24 21,29 32,18"
        stroke="#E8C97A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
}

interface ServiceCardProps {
  service: typeof SERVICES[number]
  index: number
  isInView: boolean
}

function ServiceCard({ service, index, isInView }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2)
    const y = -(e.clientX - rect.left - rect.width / 2) / (rect.width / 2)
    setTilt({ x: x * 8, y: y * 8 })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
    setIsHovered(false)
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.66, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.33s ease, border-color 0.33s ease, box-shadow 0.33s ease',
        background: '#0D0D0D',
        border: isHovered ? '1px solid rgba(201,168,76,0.5)' : '1px solid #1F1F1F',
        borderRadius: '1.1rem',
        padding: '2rem',
        cursor: 'none',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: isHovered
          ? '0 16px 66px rgba(0,0,0,0.8), 0 0 33px rgba(201,168,76,0.15)'
          : '0 8px 33px rgba(0,0,0,0.5)',
      }}
    >
      {/* Roman numeral */}
      <div
        style={{
          position: 'absolute',
          top: '1.5rem',
          right: '1.5rem',
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: '2.2rem',
          fontStyle: 'italic',
          color: 'rgba(201,168,76,0.1)',
          lineHeight: 1,
          transition: 'color 0.33s ease',
          ...(isHovered ? { color: 'rgba(201,168,76,0.25)' } : {}),
        }}
      >
        {service.id}
      </div>

      {/* Icon */}
      <div className="mb-5">
        {SERVICE_ICONS[service.icon]}
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: 'Bebas Neue, sans-serif',
          fontSize: '1.32rem',
          letterSpacing: '0.1em',
          color: '#F5F0E8',
          marginBottom: '0.75rem',
          lineHeight: 1.2,
        }}
      >
        {service.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '0.88rem',
          color: '#6B6560',
          lineHeight: 1.7,
          marginBottom: '1.5rem',
        }}
      >
        {service.description}
      </p>

      {/* CTA */}
      <div className="flex items-center gap-2 group">
        <span
          style={{
            fontFamily: 'Bebas Neue, sans-serif',
            fontSize: '0.77rem',
            letterSpacing: '0.2em',
            color: isHovered ? '#C9A84C' : '#6B6560',
            transition: 'color 0.33s ease',
          }}
        >
          CONTACT FOR PRICING
        </span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          style={{
            transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
            transition: 'transform 0.33s ease',
          }}
        >
          <path
            d="M2 7H12M12 7L7 2M12 7L7 12"
            stroke={isHovered ? '#C9A84C' : '#6B6560'}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ transition: 'stroke 0.33s ease' }}
          />
        </svg>
      </div>

      {/* Gold bottom border on hover */}
      <motion.div
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.33 }}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)',
          transformOrigin: 'center',
        }}
      />
    </motion.div>
  )
}

export function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-5%' })

  return (
    <section id="services" ref={ref} className="relative py-40 px-6 overflow-hidden">
      {/* Section divider — 33px */}
      <div className="section-divider mb-0" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.66 }}
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.66rem',
              letterSpacing: '0.3em',
              color: '#C9A84C',
              textTransform: 'uppercase',
              marginBottom: '1.5rem',
            }}
          >
            — 08 DISCIPLINES
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.99, delay: 0.1 }}
            style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: 'clamp(2.2rem, 5vw, 3.3rem)',
              letterSpacing: '0.05em',
              color: '#F5F0E8',
              marginBottom: '1rem',
            }}
          >
            Eight Disciplines.{' '}
            <span className="text-gold-gradient">One Nexus.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.66, delay: 0.2 }}
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '1.32rem',
              fontStyle: 'italic',
              color: '#6B6560',
              maxWidth: '500px',
              margin: '0 auto',
            }}
          >
            Every service engineered to the 33rd degree of excellence.
          </motion.p>
        </div>

        {/* 8 Service cards — asymmetric grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '33px',
          }}
        >
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} isInView={isInView} />
          ))}
        </div>

        {/* Bottom cta */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.66, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '1.1rem',
              fontStyle: 'italic',
              color: '#6B6560',
              marginBottom: '1.5rem',
            }}
          >
            Not seeing exactly what you need? Every engagement is custom.
          </p>
          <a href="#contact">
            <button className="btn-gold">BEGIN CONSULTATION</button>
          </a>
        </motion.div>
      </div>

      {/* Section divider */}
      <div className="section-divider mt-20" />
    </section>
  )
}
