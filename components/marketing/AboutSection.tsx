'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

const CERTS = ['CompTIA Security+', 'CompTIA Network+', 'CompTIA A+', 'Certified Cybersecurity Specialist', 'B.S. Information Technology']

export function AboutSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-8%' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section id="about" ref={ref} style={{ position: 'relative', overflow: 'hidden' }}>

      {/* Top split — lime background statement */}
      <div style={{ background: 'var(--lime)', padding: 'clamp(60px, 8vw, 100px) 40px' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
            <div className="label" style={{ color: 'rgba(8,8,8,0.4)', marginBottom: '24px' }}>— The architect</div>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(2rem, 5.5vw, 4.8rem)', color: 'var(--ink)', letterSpacing: '-0.04em', lineHeight: 1.0, maxWidth: '900px' }}>
              An engineer who speaks both languages: code and security.
            </h2>
          </motion.div>
        </div>
      </div>

      {/* Bottom — dark bio */}
      <div style={{ background: 'var(--ink)', padding: 'clamp(60px, 8vw, 100px) 40px' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(40px, 6vw, 80px)' }}>

          {/* Left */}
          <motion.div initial={{ opacity: 0, x: -16 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(1rem, 1.4vw, 1.15rem)', color: 'var(--cream-60)', lineHeight: 1.85, marginBottom: '28px' }}>
              Lee is a cybersecurity professional and full-stack AI engineer with a Bachelor of Science in Information Technology and multiple CompTIA certifications — Security+, Network+, and A+.
            </p>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(1rem, 1.4vw, 1.15rem)', color: 'var(--cream-60)', lineHeight: 1.85, marginBottom: '40px' }}>
              33 Nexus exists because most agencies can build software <em>or</em> secure it. Lee does both — at enterprise grade, with the rigor of a specialist and the range of a generalist.
            </p>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a href="https://github.com/Leegreen305" target="_blank" rel="noopener noreferrer" style={{ cursor: 'none', textDecoration: 'none' }}>
                <button className="btn btn-outline" style={{ padding: '10px 22px', fontSize: '0.82rem' }}>
                  GitHub ↗
                </button>
              </a>
              <a href="https://cnsvcs.com" target="_blank" rel="noopener noreferrer" style={{ cursor: 'none', textDecoration: 'none' }}>
                <button className="btn btn-outline" style={{ padding: '10px 22px', fontSize: '0.82rem' }}>
                  CNSVCS.com ↗
                </button>
              </a>
            </div>
          </motion.div>

          {/* Right — credentials */}
          <motion.div initial={{ opacity: 0, x: 16 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.35 }}>
            <div className="label" style={{ marginBottom: '24px' }}>Credentials</div>
            <div>
              {CERTS.map((c, i) => (
                <div key={c} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 0', borderBottom: '1px solid var(--border)', transition: 'background 0.2s' }}>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: 'var(--lime)', minWidth: '24px' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.95rem', color: 'var(--cream-60)' }}>{c}</span>
                </div>
              ))}
            </div>

            {/* Stats row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0', marginTop: '40px', borderTop: '1px solid var(--border)' }}>
              {[{ n: '88+', l: 'Projects' }, { n: '8+', l: 'Years' }, { n: '33+', l: 'Clients' }].map(({ n, l }, i) => (
                <div key={l} style={{ padding: '24px 0', borderRight: i < 2 ? '1px solid var(--border)' : 'none', paddingLeft: i > 0 ? '24px' : '0' }}>
                  <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', color: 'var(--cream)', letterSpacing: '-0.04em', lineHeight: 1 }}>{n}</div>
                  <div className="label" style={{ marginTop: '6px' }}>{l}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
