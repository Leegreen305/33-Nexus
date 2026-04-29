'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'

const PHASES = [
  { n: 1, name: 'Discovery', done: true },
  { n: 2, name: 'Architecture', done: true },
  { n: 3, name: 'Proposal', done: true },
  { n: 4, name: 'Development', active: true },
  { n: 5, name: 'QA', done: false },
  { n: 6, name: 'Review', done: false },
  { n: 7, name: 'Launch', done: false },
  { n: 8, name: 'Support', done: false },
]

export function PortalPreviewSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section ref={ref} style={{ padding: 'clamp(80px, 12vw, 160px) clamp(20px, 4vw, 60px)', maxWidth: '1300px', margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(48px, 6vw, 80px)', alignItems: 'center' }}>

        {/* Left */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7 }}>
          <div className="label" style={{ marginBottom: '16px', color: '#7DF9FF', opacity: 0.8 }}>— Client Portal</div>
          <h2 className="heading" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#fff', marginBottom: '20px' }}>
            Your project.<br />
            <span style={{ color: '#7DF9FF' }}>Full visibility.</span>
          </h2>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.75, marginBottom: '32px' }}>
            Every client gets a dedicated portal — real-time phase tracking, milestones, file center, direct messaging, and invoice history. Nothing is ever a mystery.
          </p>
          <Link href="/portal/login" style={{ textDecoration: 'none', cursor: 'none' }}>
            <button className="btn-ghost">Access Portal →</button>
          </Link>
        </motion.div>

        {/* Portal mockup */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.15 }}>
          <div style={{ background: '#0D0D0D', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 40px 80px rgba(0,0,0,0.6)' }}>
            {/* Browser bar */}
            <div style={{ padding: '14px 20px', background: '#111', borderBottom: '1px solid rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              {['#FF5F57','#FEBC2E','#28C840'].map(c => <div key={c} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c }} />)}
              <div style={{ flex: 1, margin: '0 12px', background: 'rgba(255,255,255,0.04)', borderRadius: '6px', padding: '4px 12px', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: 'rgba(255,255,255,0.25)', textAlign: 'center' }}>33nexus.com/portal</div>
            </div>

            <div style={{ display: 'flex', height: '360px' }}>
              {/* Sidebar */}
              <div style={{ width: '140px', background: '#0A0A0A', borderRight: '1px solid rgba(255,255,255,0.04)', padding: '20px 12px', flexShrink: 0 }}>
                <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '0.7rem', color: '#7DF9FF', marginBottom: '20px', letterSpacing: '0.05em' }}>33 NEXUS</div>
                {['Dashboard','Phases','Files','Messages','Invoices'].map((item, i) => (
                  <div key={item} style={{ padding: '7px 10px', borderRadius: '8px', background: i === 0 ? 'rgba(125,249,255,0.08)' : 'transparent', fontFamily: 'DM Sans, sans-serif', fontSize: '0.72rem', color: i === 0 ? '#7DF9FF' : 'rgba(255,255,255,0.3)', marginBottom: '3px' }}>
                    {item}
                  </div>
                ))}
              </div>

              {/* Content */}
              <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
                <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.9rem', color: '#fff', marginBottom: '4px' }}>Enterprise Platform Build</div>
                <div className="label" style={{ marginBottom: '20px' }}>Phase 4 of 8 — Development</div>

                {/* Progress bar */}
                <div style={{ height: '3px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', marginBottom: '20px', overflow: 'hidden' }}>
                  <div style={{ width: '50%', height: '100%', background: 'linear-gradient(90deg, #7DF9FF, #BF5AF2)', borderRadius: '2px' }} />
                </div>

                {/* Phases */}
                {PHASES.map(p => (
                  <div key={p.n} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '7px 0', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                    <div style={{
                      width: '8px', height: '8px', borderRadius: '50%', flexShrink: 0,
                      background: p.done ? '#7DF9FF' : (p as { active?: boolean }).active ? '#BF5AF2' : 'rgba(255,255,255,0.08)',
                      boxShadow: p.done ? '0 0 6px rgba(125,249,255,0.5)' : (p as { active?: boolean }).active ? '0 0 6px rgba(191,90,242,0.5)' : 'none',
                      animation: (p as { active?: boolean }).active ? 'pulse-dot 2s infinite' : 'none',
                    }} />
                    <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.72rem', color: p.done ? 'rgba(255,255,255,0.7)' : (p as { active?: boolean }).active ? '#BF5AF2' : 'rgba(255,255,255,0.2)' }}>
                      {p.name}
                    </div>
                    {p.done && <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ marginLeft: 'auto' }}><polyline points="1,5 3.5,7.5 9,2" stroke="#7DF9FF" strokeWidth="1.5" strokeLinecap="round" /></svg>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
