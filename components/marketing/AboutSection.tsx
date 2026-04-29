'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CERTIFICATIONS } from '@/lib/constants'

const BIO = `Lee is a cybersecurity professional and full-stack AI engineer holding a Bachelor of Science in Information Technology and professional certifications including CompTIA Security+, Network+, A+, and Certified Cybersecurity Specialist. With deep expertise spanning secure software architecture, artificial intelligence, and enterprise-grade development, Lee founded 33 Nexus to deliver technology solutions that operate at the highest possible frequency — where elite engineering meets impenetrable security.`

export function AboutSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section id="about" ref={ref} className="relative py-40 px-6 overflow-hidden">
      {/* Background geometry */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
        <svg viewBox="0 0 600 800" fill="none" className="w-full h-full">
          <polygon
            points="300,50 580,450 300,750 20,450"
            stroke="#C9A84C"
            strokeWidth="1"
            fill="none"
          />
          <polygon
            points="300,150 480,400 300,650 120,400"
            stroke="#C9A84C"
            strokeWidth="0.5"
            fill="none"
          />
          <circle cx="300" cy="400" r="200" stroke="#C9A84C" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.66 }}
          className="flex items-center gap-4 mb-16"
        >
          <div
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.66rem',
              letterSpacing: '0.3em',
              color: '#C9A84C',
              textTransform: 'uppercase',
            }}
          >
            — THE ARCHITECT
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left — photo + frame */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.99, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Gold geometric octagonal frame */}
            <div className="relative w-full max-w-md mx-auto aspect-square">
              {/* Outer octagon SVG frame */}
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 400 400"
                fill="none"
                style={{ zIndex: 2 }}
              >
                <polygon
                  points="120,10 280,10 390,120 390,280 280,390 120,390 10,280 10,120"
                  stroke="url(#aboutGold)"
                  strokeWidth="1.5"
                  fill="none"
                />
                <polygon
                  points="130,20 270,20 380,130 380,270 270,380 130,380 20,270 20,130"
                  stroke="rgba(201,168,76,0.15)"
                  strokeWidth="0.5"
                  fill="none"
                />
                {/* Corner decorations */}
                <circle cx="120" cy="10" r="3" fill="#C9A84C" />
                <circle cx="280" cy="10" r="3" fill="#C9A84C" />
                <circle cx="390" cy="120" r="3" fill="#C9A84C" />
                <circle cx="390" cy="280" r="3" fill="#C9A84C" />
                <circle cx="280" cy="390" r="3" fill="#C9A84C" />
                <circle cx="120" cy="390" r="3" fill="#C9A84C" />
                <circle cx="10" cy="280" r="3" fill="#C9A84C" />
                <circle cx="10" cy="120" r="3" fill="#C9A84C" />
                {/* 33-degree angle decorative lines */}
                <line x1="200" y1="10" x2="220" y2="40" stroke="rgba(201,168,76,0.3)" strokeWidth="0.5" />
                <line x1="200" y1="390" x2="180" y2="360" stroke="rgba(201,168,76,0.3)" strokeWidth="0.5" />
                <defs>
                  <linearGradient id="aboutGold" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#C9A84C" />
                    <stop offset="33%" stopColor="#E8C97A" />
                    <stop offset="66%" stopColor="#C9A84C" />
                    <stop offset="100%" stopColor="#8B6914" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Photo placeholder */}
              <div
                className="absolute"
                style={{
                  inset: '12%',
                  background: 'linear-gradient(135deg, #141414 0%, #0D0D0D 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}
              >
                {/* Placeholder silhouette */}
                <div className="flex flex-col items-center gap-4 opacity-30">
                  <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                    <circle cx="40" cy="30" r="18" fill="#C9A84C" />
                    <ellipse cx="40" cy="72" rx="28" ry="16" fill="#C9A84C" />
                  </svg>
                  <span
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.55rem',
                      color: '#6B6560',
                      letterSpacing: '0.2em',
                    }}
                  >
                    LEE
                  </span>
                </div>
              </div>

              {/* Gold glow effect */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle at 50% 50%, rgba(201,168,76,0.05) 0%, transparent 70%)',
                  zIndex: 1,
                }}
              />
            </div>

            {/* Certification badges */}
            <div className="flex flex-wrap gap-2 mt-8 justify-center">
              {CERTIFICATIONS.map((cert) => (
                <motion.div
                  key={cert.abbr}
                  whileHover={{ scale: 1.05, borderColor: '#C9A84C' }}
                  className="cert-badge"
                >
                  {cert.abbr}
                </motion.div>
              ))}
            </div>

            {/* Social links */}
            <div className="flex items-center justify-center gap-6 mt-6">
              <a
                href="https://github.com/Leegreen305"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 group"
                style={{ cursor: 'none' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#6B6560" className="group-hover:fill-nexus-gold transition-all duration-330">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                <span
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.66rem',
                    color: '#6B6560',
                    letterSpacing: '0.1em',
                  }}
                  className="group-hover:text-nexus-gold transition-colors duration-330"
                >
                  github.com/Leegreen305
                </span>
              </a>
            </div>
          </motion.div>

          {/* Right — content */}
          <div className="space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.99, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: 'clamp(2.2rem, 4vw, 3.3rem)',
                  fontWeight: 300,
                  lineHeight: 1.15,
                  color: '#F5F0E8',
                }}
              >
                The Architect
                <br />
                <span className="text-gold-gradient" style={{ fontStyle: 'italic' }}>
                  Behind 33 Nexus
                </span>
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.66, delay: 0.4 }}
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '1.1rem',
                lineHeight: 1.8,
                color: '#6B6560',
              }}
            >
              {BIO}
            </motion.p>

            {/* Credential highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.66, delay: 0.55 }}
              className="space-y-4"
            >
              {[
                { label: 'Specialization', value: 'Cybersecurity & AI Engineering' },
                { label: 'Architecture', value: 'Secure Full-Stack Systems' },
                { label: 'Education', value: 'B.S. Information Technology' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-4"
                  style={{
                    padding: '1rem 1.5rem',
                    background: '#0D0D0D',
                    borderLeft: '2px solid #C9A84C',
                    borderRadius: '0 0.66rem 0.66rem 0',
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '0.55rem',
                        color: '#C9A84C',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        marginBottom: '4px',
                      }}
                    >
                      {item.label}
                    </div>
                    <div
                      style={{
                        fontFamily: 'DM Sans, sans-serif',
                        fontSize: '1rem',
                        color: '#F5F0E8',
                      }}
                    >
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Featured case study */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.66, delay: 0.7 }}
              whileHover={{ borderColor: 'rgba(201,168,76,0.5)', boxShadow: '0 0 33px rgba(201,168,76,0.1)' }}
              style={{
                background: '#0D0D0D',
                border: '1px solid #1F1F1F',
                borderRadius: '1.1rem',
                padding: '1.5rem',
                transition: 'all 0.33s ease',
              }}
            >
              <div
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.55rem',
                  letterSpacing: '0.2em',
                  color: '#C9A84C',
                  textTransform: 'uppercase',
                  marginBottom: '8px',
                }}
              >
                Featured Work
              </div>
              <div
                style={{
                  fontFamily: 'Bebas Neue, sans-serif',
                  fontSize: '1.65rem',
                  letterSpacing: '0.1em',
                  color: '#F5F0E8',
                  marginBottom: '8px',
                }}
              >
                CNSVCS.COM
              </div>
              <p
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '0.88rem',
                  color: '#6B6560',
                  lineHeight: 1.6,
                }}
              >
                Complex AI-driven platforms delivered at enterprise grade. A fully custom web platform
                built for a professional services client — secure architecture, premium design.
              </p>
              <a
                href="https://cnsvcs.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 group"
                style={{ cursor: 'none' }}
              >
                <span
                  style={{
                    fontFamily: 'Bebas Neue, sans-serif',
                    fontSize: '0.88rem',
                    letterSpacing: '0.15em',
                    color: '#C9A84C',
                  }}
                >
                  VIEW CASE STUDY
                </span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="transition-transform duration-330 group-hover:translate-x-1"
                >
                  <path
                    d="M3 8H13M13 8L8 3M13 8L8 13"
                    stroke="#C9A84C"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
