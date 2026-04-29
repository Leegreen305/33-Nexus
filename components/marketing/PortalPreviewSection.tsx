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
    <section ref={ref} style={{ padding: 'clamp(80px, 10vw, 140px) 40px', maxWidth: '1300px', margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(48px, 6vw, 80px)', alignItems: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <div className="label" style={{ marginBottom: '20px' }}>— Client portal</div>
          <h2 className="display" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: 'var(--cream)', marginBottom: '20px' }}>
            Your project.<br />
            <span style={{ color: 'var(--lime)' }}>Full clarity.</span>
          </h2>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1rem', color: 'var(--cream-30)', lineHeight: 1.75, marginBottom: '32px' }}>
            Every client gets a dedicated portal — real-time phase tracking, milestone updates, file center, direct messaging, and invoice history.
          </p>
          <Link href="/portal/login" style={{ textDecoration: 'none', cursor: 'none' }}>
            <button className="btn btn-outline">Access Portal →</button>
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.15 }}>
          <div style={{ background: 'var(--ink-2)', border: '1px solid var(--border)', overflow: 'hidden' }}>
            <div style={{ padding: '14px 20px', background: 'var(--ink-3)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              {['#FF5F57','#FEBC2E','#28C840'].map(c => <div key={c} style={{ width: '9px', height: '9px', borderRadius: '50%', background: c }} />)}
              <div style={{ flex: 1, textAlign: 'center', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.58rem', color: 'var(--cream-30)', letterSpacing: '0.1em' }}>33nexus.com/portal</div>
            </div>
            <div style={{ display: 'flex', height: '340px' }}>
              <div style={{ width: '130px', background: 'var(--ink-3)', borderRight: '1px solid var(--border)', padding: '20px 12px', flexShrink: 0 }}>
                <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '0.75rem', color: 'var(--cream)', marginBottom: '20px', letterSpacing: '-0.02em' }}>33 Nexus</div>
                {['Dashboard','Phases','Files','Messages','Invoices'].map((item, i) => (
                  <div key={item} style={{ padding: '7px 10px', background: i === 0 ? 'var(--lime-dim)' : 'transparent', fontFamily: 'DM Sans, sans-serif', fontSize: '0.72rem', color: i === 0 ? 'var(--lime)' : 'var(--cream-30)', marginBottom: '3px' }}>
                    {item}
                  </div>
                ))}
              </div>
              <div style={{ flex: 1, padding: '20px' }}>
                <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.95rem', color: 'var(--cream)', marginBottom: '4px' }}>Enterprise Build</div>
                <div className="label" style={{ marginBottom: '16px' }}>Phase 4 of 8</div>
                <div style={{ height: '2px', background: 'var(--border)', marginBottom: '16px', overflow: 'hidden' }}>
                  <div style={{ width: '50%', height: '100%', background: 'var(--lime)' }} />
                </div>
                {PHASES.map(p => (
                  <div key={p.n} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 0', borderBottom: '1px solid rgba(242,237,229,0.03)' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: p.done ? 'var(--lime)' : (p as { active?: boolean }).active ? 'var(--cream)' : 'var(--border)', animation: (p as { active?: boolean }).active ? 'pulse-dot 2s infinite' : 'none', flexShrink: 0 }} />
                    <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.72rem', color: p.done ? 'var(--cream-60)' : (p as { active?: boolean }).active ? 'var(--cream)' : 'var(--cream-30)' }}>
                      {p.name}
                    </div>
                    {p.done && <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ marginLeft: 'auto' }}><polyline points="1,5 3.5,7.5 9,2" stroke="var(--lime)" strokeWidth="1.5" strokeLinecap="round" /></svg>}
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
