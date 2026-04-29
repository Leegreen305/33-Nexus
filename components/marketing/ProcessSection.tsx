'use client'

import { useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { PROCESS_STEPS } from '@/lib/constants'

const PHASE_COLORS = {
  'I': { main: '#D4D4D4', dim: 'rgba(212,212,212,0.3)', label: 'DISCOVERY' },
  'II': { main: '#F0F0F0', dim: 'rgba(232,201,122,0.3)', label: 'CONSTRUCTION' },
  'III': { main: '#7A7A7A', dim: 'rgba(139,105,20,0.3)', label: 'DEPLOYMENT' },
}

export function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-5%' })
  const [activeStep, setActiveStep] = useState<number | null>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const lineProgress = useTransform(scrollYProgress, [0.1, 0.9], [0, 1])

  return (
    <section id="process" ref={ref} className="relative py-40 px-6 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(212,212,212,0.02) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.66 }}
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.66rem',
              letterSpacing: '0.3em',
              color: '#D4D4D4',
              textTransform: 'uppercase',
              marginBottom: '1.5rem',
            }}
          >
            — THE METHOD
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.99, delay: 0.1 }}
            style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: 'clamp(2.2rem, 5vw, 3.3rem)',
              letterSpacing: '0.05em',
              color: '#FFFFFF',
              marginBottom: '1rem',
            }}
          >
            The 33 Nexus{' '}
            <span className="text-gold-gradient">Method</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.66, delay: 0.2 }}
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '1.32rem',
              fontStyle: 'italic',
              color: '#555555',
              maxWidth: '500px',
              margin: '0 auto',
            }}
          >
            Eight steps. Zero ambiguity. Infinite precision.
          </motion.p>
        </div>

        {/* 3 Phases */}
        <div className="space-y-20">
          {(['I', 'II', 'III'] as const).map((phaseId, phaseIndex) => {
            const phaseSteps = PROCESS_STEPS.filter((s) => s.phase === phaseId)
            const phaseColor = PHASE_COLORS[phaseId]

            return (
              <motion.div
                key={phaseId}
                initial={{ opacity: 0, x: phaseIndex % 2 === 0 ? -40 : 40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.99, delay: phaseIndex * 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                {/* Phase label */}
                <div className="flex items-center gap-6 mb-10">
                  <div
                    style={{
                      fontFamily: 'Cormorant Garamond, serif',
                      fontSize: '3.3rem',
                      fontStyle: 'italic',
                      color: 'rgba(212,212,212,0.1)',
                      lineHeight: 1,
                    }}
                  >
                    PHASE {phaseId}
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '0.55rem',
                        letterSpacing: '0.3em',
                        color: phaseColor.main,
                        textTransform: 'uppercase',
                        marginBottom: '4px',
                      }}
                    >
                      PHASE {phaseId}
                    </div>
                    <div
                      style={{
                        fontFamily: 'Bebas Neue, sans-serif',
                        fontSize: '1.65rem',
                        letterSpacing: '0.1em',
                        color: '#FFFFFF',
                      }}
                    >
                      {phaseColor.label}
                    </div>
                  </div>
                  {/* Phase connecting line */}
                  <div
                    style={{
                      flex: 1,
                      height: '1px',
                      background: `linear-gradient(90deg, ${phaseColor.dim}, transparent)`,
                    }}
                  />
                </div>

                {/* Steps in phase */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '33px',
                  }}
                >
                  {phaseSteps.map((step, stepIndex) => (
                    <motion.div
                      key={step.number}
                      whileHover={{ y: -4 }}
                      onClick={() => setActiveStep(activeStep === step.number ? null : step.number)}
                      style={{
                        background: activeStep === step.number ? 'rgba(212,212,212,0.05)' : '#080808',
                        border: `1px solid ${activeStep === step.number ? phaseColor.main : '#1A1A1A'}`,
                        borderRadius: '1.1rem',
                        padding: '2rem',
                        cursor: 'none',
                        transition: 'all 0.33s ease',
                        boxShadow:
                          activeStep === step.number
                            ? `0 0 33px ${phaseColor.dim}`
                            : 'none',
                      }}
                    >
                      {/* Step number */}
                      <div className="flex items-center gap-4 mb-4">
                        <div
                          className="timeline-node"
                          style={{
                            width: '33px',
                            height: '33px',
                            borderRadius: '50%',
                            border: `2px solid ${phaseColor.main}`,
                            background: activeStep === step.number ? phaseColor.main : 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontFamily: 'Bebas Neue, sans-serif',
                            fontSize: '0.88rem',
                            color: activeStep === step.number ? '#080808' : phaseColor.main,
                            flexShrink: 0,
                          }}
                        >
                          {step.number}
                        </div>
                        <div
                          style={{
                            fontFamily: 'JetBrains Mono, monospace',
                            fontSize: '0.55rem',
                            letterSpacing: '0.2em',
                            color: phaseColor.dim,
                            textTransform: 'uppercase',
                          }}
                        >
                          STEP {step.number} OF 8
                        </div>
                      </div>

                      <h3
                        style={{
                          fontFamily: 'Bebas Neue, sans-serif',
                          fontSize: '1.32rem',
                          letterSpacing: '0.08em',
                          color: '#FFFFFF',
                          marginBottom: '0.75rem',
                        }}
                      >
                        {step.title}
                      </h3>

                      <p
                        style={{
                          fontFamily: 'DM Sans, sans-serif',
                          fontSize: '0.88rem',
                          color: '#555555',
                          lineHeight: 1.7,
                        }}
                      >
                        {step.description}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Connecting arrow to next phase */}
                {phaseIndex < 2 && (
                  <div className="flex justify-center mt-10">
                    <motion.div
                      animate={{ y: [0, 8, 0] }}
                      transition={{ duration: 1.32, repeat: Infinity }}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <div
                        style={{ width: '1px', height: '33px', background: 'linear-gradient(to bottom, transparent, #D4D4D4)' }}
                      />
                      <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                        <path d="M1 1L6 7L11 1" stroke="#D4D4D4" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </motion.div>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Bottom stat */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.66, delay: 0.8 }}
          className="text-center mt-20"
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '1.5rem',
              padding: '1.5rem 3rem',
              background: '#080808',
              border: '1px solid #1A1A1A',
              borderRadius: '1.1rem',
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: 'Bebas Neue, sans-serif',
                  fontSize: '3.3rem',
                  color: '#D4D4D4',
                  lineHeight: 1,
                }}
              >
                8
              </div>
              <div
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.55rem',
                  color: '#555555',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                }}
              >
                STEPS
              </div>
            </div>
            <div style={{ width: '1px', height: '40px', background: '#1A1A1A' }} />
            <div>
              <div
                style={{
                  fontFamily: 'Bebas Neue, sans-serif',
                  fontSize: '3.3rem',
                  color: '#D4D4D4',
                  lineHeight: 1,
                }}
              >
                3
              </div>
              <div
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.55rem',
                  color: '#555555',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                }}
              >
                PHASES
              </div>
            </div>
            <div style={{ width: '1px', height: '40px', background: '#1A1A1A' }} />
            <div>
              <div
                style={{
                  fontFamily: 'Bebas Neue, sans-serif',
                  fontSize: '3.3rem',
                  color: '#D4D4D4',
                  lineHeight: 1,
                }}
              >
                0
              </div>
              <div
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.55rem',
                  color: '#555555',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                }}
              >
                AMBIGUITY
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
