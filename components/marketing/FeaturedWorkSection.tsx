'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const WORKS = [
  {
    title: 'CNSVCS.COM',
    category: 'Web Platform — AI-Driven',
    description:
      'A fully custom web platform delivered for a professional services client. Complex AI architecture, premium design system, enterprise-grade performance and security.',
    tags: ['Next.js', 'AI Integration', 'Custom Architecture'],
    status: 'live',
    url: 'https://cnsvcs.com',
    featured: true,
  },
  {
    title: 'ENTERPRISE AI PLATFORM',
    category: 'Custom AI Development',
    description:
      'End-to-end AI automation platform integrating LLM orchestration, custom agent frameworks, and real-time data pipelines. NDA protected.',
    tags: ['AI Agents', 'LLM', 'Automation'],
    status: 'nda',
    url: null,
    featured: false,
  },
  {
    title: 'SECURITY OPERATIONS CENTER',
    category: 'Cybersecurity',
    description:
      'Full SOC buildout with custom threat detection, incident response workflows, and real-time security monitoring dashboards. NDA protected.',
    tags: ['SOC', 'Threat Detection', 'Security'],
    status: 'nda',
    url: null,
    featured: false,
  },
]

export function FeaturedWorkSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-5%' })

  return (
    <section id="work" ref={ref} className="relative py-40 px-6 overflow-hidden">
      <div className="section-divider mb-0" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-16 flex-wrap gap-8">
          <div>
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
                marginBottom: '1rem',
              }}
            >
              — SELECTED WORKS
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
              }}
            >
              Built. Delivered.{' '}
              <span className="text-gold-gradient">Proven.</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.66, delay: 0.2 }}
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '1.1rem',
              fontStyle: 'italic',
              color: '#6B6560',
              maxWidth: '300px',
            }}
          >
            Complex AI-driven platforms available — contact for case studies.
          </motion.p>
        </div>

        {/* Works */}
        <div className="space-y-8">
          {/* Featured work — CNSVCS */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.99, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ borderColor: 'rgba(201,168,76,0.4)' }}
            style={{
              background: '#0D0D0D',
              border: '1px solid #1F1F1F',
              borderRadius: '1.1rem',
              padding: '3rem',
              transition: 'border-color 0.33s ease, box-shadow 0.33s ease',
              cursor: 'none',
            }}
            onMouseEnter={(e) => {
              const t = e.currentTarget
              t.style.boxShadow = '0 16px 66px rgba(0,0,0,0.8), 0 0 33px rgba(201,168,76,0.1)'
            }}
            onMouseLeave={(e) => {
              const t = e.currentTarget
              t.style.boxShadow = 'none'
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '4px 12px',
                    background: 'rgba(201,168,76,0.1)',
                    border: '1px solid rgba(201,168,76,0.2)',
                    borderRadius: '99px',
                    marginBottom: '1.5rem',
                  }}
                >
                  <div
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: '#C9A84C',
                      boxShadow: '0 0 6px rgba(201,168,76,0.8)',
                    }}
                  />
                  <span
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.55rem',
                      letterSpacing: '0.2em',
                      color: '#C9A84C',
                      textTransform: 'uppercase',
                    }}
                  >
                    LIVE
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: 'Bebas Neue, sans-serif',
                    fontSize: '3.3rem',
                    letterSpacing: '0.05em',
                    color: '#F5F0E8',
                    lineHeight: 1,
                    marginBottom: '0.5rem',
                  }}
                >
                  CNSVCS.COM
                </h3>

                <div
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.66rem',
                    letterSpacing: '0.15em',
                    color: '#C9A84C',
                    textTransform: 'uppercase',
                    marginBottom: '1.5rem',
                  }}
                >
                  Web Platform — AI-Driven Architecture
                </div>

                <p
                  style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '1rem',
                    color: '#6B6560',
                    lineHeight: 1.8,
                    marginBottom: '1.5rem',
                  }}
                >
                  A fully custom web platform delivered for a professional services client.
                  Complex architecture, premium design, enterprise-grade performance.
                  Complex AI-driven platforms delivered at enterprise grade.
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {['Next.js', 'AI Integration', 'Custom CMS', 'Enterprise Security'].map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '0.55rem',
                        letterSpacing: '0.1em',
                        color: '#6B6560',
                        padding: '4px 10px',
                        background: '#141414',
                        border: '1px solid #1F1F1F',
                        borderRadius: '99px',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href="https://cnsvcs.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 group"
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
                    VISIT SITE
                  </span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8H13M13 8L8 3M13 8L8 13" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>

              {/* Site preview placeholder */}
              <div
                style={{
                  background: '#141414',
                  borderRadius: '0.66rem',
                  aspectRatio: '16/10',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid #1F1F1F',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(circle at 50% 40%, rgba(201,168,76,0.06) 0%, transparent 70%)',
                  }}
                />
                <div className="text-center opacity-40">
                  <div
                    style={{
                      fontFamily: 'Bebas Neue, sans-serif',
                      fontSize: '2.2rem',
                      color: '#C9A84C',
                      letterSpacing: '0.1em',
                    }}
                  >
                    CNSVCS
                  </div>
                  <div
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.55rem',
                      color: '#6B6560',
                      letterSpacing: '0.15em',
                    }}
                  >
                    cnsvcs.com
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* NDA Protected works */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {WORKS.filter((w) => w.status === 'nda').map((work, i) => (
              <motion.div
                key={work.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.66, delay: 0.4 + i * 0.1 }}
                style={{
                  background: '#0D0D0D',
                  border: '1px solid #1F1F1F',
                  borderRadius: '1.1rem',
                  padding: '2rem',
                  cursor: 'none',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* NDA badge */}
                <div
                  style={{
                    position: 'absolute',
                    top: '1.5rem',
                    right: '1.5rem',
                    padding: '4px 10px',
                    background: 'rgba(139,0,0,0.2)',
                    border: '1px solid rgba(139,0,0,0.3)',
                    borderRadius: '99px',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.44rem',
                    letterSpacing: '0.15em',
                    color: '#8B0000',
                    textTransform: 'uppercase',
                  }}
                >
                  NDA PROTECTED
                </div>

                <div
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.55rem',
                    letterSpacing: '0.2em',
                    color: '#C9A84C',
                    textTransform: 'uppercase',
                    marginBottom: '0.75rem',
                  }}
                >
                  {work.category}
                </div>

                <h3
                  style={{
                    fontFamily: 'Bebas Neue, sans-serif',
                    fontSize: '1.65rem',
                    letterSpacing: '0.08em',
                    color: '#F5F0E8',
                    marginBottom: '1rem',
                  }}
                >
                  {work.title}
                </h3>

                <p
                  style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '0.88rem',
                    color: '#6B6560',
                    lineHeight: 1.7,
                    marginBottom: '1.5rem',
                  }}
                >
                  {work.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {work.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '0.55rem',
                        letterSpacing: '0.1em',
                        color: '#6B6560',
                        padding: '4px 10px',
                        background: '#141414',
                        border: '1px solid #1F1F1F',
                        borderRadius: '99px',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="section-divider mt-20" />
    </section>
  )
}
