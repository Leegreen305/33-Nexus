'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'

const PHASES_PREVIEW = [
  { num: 1, name: 'DISCOVERY', status: 'complete' },
  { num: 2, name: 'ARCHITECTURE', status: 'complete' },
  { num: 3, name: 'PROPOSAL SIGNED', status: 'complete' },
  { num: 4, name: 'DEVELOPMENT', status: 'in-progress' },
  { num: 5, name: 'QUALITY ASSURANCE', status: 'pending' },
  { num: 6, name: 'CLIENT REVIEW', status: 'pending' },
  { num: 7, name: 'LAUNCH', status: 'pending' },
  { num: 8, name: 'SUPPORT ACTIVE', status: 'pending' },
]

export function PortalPreviewSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section id="portal-preview" ref={ref} className="relative py-40 px-6 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 66% 50%, rgba(0,212,255,0.02) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.66 }}
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.66rem',
                letterSpacing: '0.3em',
                color: '#00D4FF',
                textTransform: 'uppercase',
                marginBottom: '1.5rem',
              }}
            >
              — CLIENT PORTAL
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
                lineHeight: 1.1,
                marginBottom: '1.5rem',
              }}
            >
              Your Project.
              <br />
              <span style={{ color: '#00D4FF' }}>Full Visibility.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.66, delay: 0.2 }}
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '1.1rem',
                color: '#6B6560',
                lineHeight: 1.8,
                marginBottom: '2rem',
              }}
            >
              Every 33 Nexus client receives access to a dedicated project portal with
              real-time phase tracking, milestone updates, file sharing, and direct
              communication with the team.
            </motion.p>

            {/* Feature list */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.66, delay: 0.35 }}
              className="space-y-3 mb-8"
            >
              {[
                'Real-time phase tracking across all 8 stages',
                'Milestone updates with chronological feed',
                'Secure file center organized by phase',
                'Direct messaging with the 33 Nexus team',
                'Invoice history and payment status',
                'Client approval workflows built in',
              ].map((feature) => (
                <div key={feature} className="flex items-start gap-3">
                  <div
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: '#00D4FF',
                      boxShadow: '0 0 8px rgba(0,212,255,0.5)',
                      flexShrink: 0,
                      marginTop: '7px',
                    }}
                  />
                  <span
                    style={{
                      fontFamily: 'DM Sans, sans-serif',
                      fontSize: '0.88rem',
                      color: '#6B6560',
                    }}
                  >
                    {feature}
                  </span>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.66, delay: 0.5 }}
            >
              <Link href="/portal/login">
                <button
                  style={{
                    background: 'transparent',
                    border: '1px solid #00D4FF',
                    borderRadius: '33px',
                    padding: '8px 88px',
                    fontFamily: 'Bebas Neue, sans-serif',
                    fontSize: '1rem',
                    letterSpacing: '0.15em',
                    color: '#00D4FF',
                    cursor: 'none',
                    transition: 'all 0.33s ease',
                  }}
                  onMouseEnter={(e) => {
                    const t = e.target as HTMLButtonElement
                    t.style.background = 'rgba(0,212,255,0.1)'
                    t.style.boxShadow = '0 0 33px rgba(0,212,255,0.2)'
                  }}
                  onMouseLeave={(e) => {
                    const t = e.target as HTMLButtonElement
                    t.style.background = 'transparent'
                    t.style.boxShadow = 'none'
                  }}
                >
                  ENTER PORTAL
                </button>
              </Link>
            </motion.div>
          </div>

          {/* Right — portal mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.99, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              style={{
                background: '#0D0D0D',
                border: '1px solid #1F1F1F',
                borderRadius: '1.1rem',
                overflow: 'hidden',
                boxShadow: '0 32px 80px rgba(0,0,0,0.8)',
              }}
            >
              {/* Mockup header */}
              <div
                style={{
                  padding: '1rem 1.5rem',
                  background: '#141414',
                  borderBottom: '1px solid #1F1F1F',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ display: 'flex', gap: '8px' }}>
                  {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
                    <div key={c} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c }} />
                  ))}
                </div>
                <div
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.55rem',
                    color: '#6B6560',
                    letterSpacing: '0.1em',
                  }}
                >
                  33nexus.com/portal
                </div>
                <div style={{ width: '50px' }} />
              </div>

              <div style={{ display: 'flex', height: '400px' }}>
                {/* Sidebar mockup */}
                <div
                  style={{
                    width: '160px',
                    background: '#0D0D0D',
                    borderRight: '1px solid #1F1F1F',
                    padding: '1.5rem 1rem',
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'Bebas Neue, sans-serif',
                      fontSize: '0.88rem',
                      letterSpacing: '0.1em',
                      color: '#C9A84C',
                      marginBottom: '1.5rem',
                    }}
                  >
                    33 NEXUS
                  </div>
                  {['Dashboard', 'Phases', 'Milestones', 'Files', 'Messages', 'Invoices'].map((item, i) => (
                    <div
                      key={item}
                      style={{
                        fontFamily: 'DM Sans, sans-serif',
                        fontSize: '0.77rem',
                        color: i === 0 ? '#C9A84C' : '#6B6560',
                        padding: '0.5rem 0.66rem',
                        borderRadius: '0.44rem',
                        background: i === 0 ? 'rgba(201,168,76,0.08)' : 'transparent',
                        marginBottom: '4px',
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>

                {/* Main content mockup */}
                <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto' }}>
                  <div
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.55rem',
                      color: '#6B6560',
                      letterSpacing: '0.2em',
                      marginBottom: '8px',
                    }}
                  >
                    PROJECT STATUS
                  </div>
                  <div
                    style={{
                      fontFamily: 'Bebas Neue, sans-serif',
                      fontSize: '1.32rem',
                      color: '#F5F0E8',
                      marginBottom: '1.5rem',
                    }}
                  >
                    Enterprise Platform Build
                  </div>

                  {/* Phase tracker */}
                  <div className="space-y-2">
                    {PHASES_PREVIEW.map((phase) => (
                      <div
                        key={phase.num}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '0.5rem 0.75rem',
                          background: phase.status === 'in-progress' ? 'rgba(0,212,255,0.05)' : 'transparent',
                          borderRadius: '0.44rem',
                          border: phase.status === 'in-progress' ? '1px solid rgba(0,212,255,0.15)' : '1px solid transparent',
                        }}
                      >
                        <div
                          className="phase-indicator"
                          style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background:
                              phase.status === 'complete'
                                ? '#C9A84C'
                                : phase.status === 'in-progress'
                                ? '#00D4FF'
                                : '#1F1F1F',
                            boxShadow:
                              phase.status === 'complete'
                                ? '0 0 8px rgba(201,168,76,0.5)'
                                : phase.status === 'in-progress'
                                ? '0 0 8px rgba(0,212,255,0.5)'
                                : 'none',
                            animation: phase.status === 'in-progress' ? 'pulse-indicator 1.32s infinite' : 'none',
                            flexShrink: 0,
                          }}
                        />
                        <div
                          style={{
                            fontFamily: 'DM Sans, sans-serif',
                            fontSize: '0.66rem',
                            color:
                              phase.status === 'complete'
                                ? '#F5F0E8'
                                : phase.status === 'in-progress'
                                ? '#00D4FF'
                                : '#6B6560',
                          }}
                        >
                          {phase.name}
                        </div>
                        {phase.status === 'complete' && (
                          <svg
                            width="10"
                            height="10"
                            viewBox="0 0 10 10"
                            fill="none"
                            style={{ marginLeft: 'auto' }}
                          >
                            <polyline
                              points="2,5 4,7 8,3"
                              stroke="#C9A84C"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                          </svg>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
