'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const SERVICES = ['Software Development', 'Web Development', 'Mobile App Development', 'AI Software Development', 'AI Voice Agents', 'AI Automation', 'Custom AI Agents', 'Cybersecurity Services', 'Multiple / Not Sure']
const BUDGETS = ['Under $5,000', '$5,000 – $15,000', '$15,000 – $50,000', '$50,000 – $150,000', '$150,000+', 'To be discussed']
const TIMELINES = ['ASAP', '1–3 months', '3–6 months', '6–12 months', '12+ months', 'Ongoing retainer']

export function ContactSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-5%' })
  const [form, setForm] = useState({ name: '', company: '', service: '', description: '', budget: '', timeline: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const update = (k: keyof typeof form, v: string) => setForm(p => ({ ...p, [k]: v }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const r = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      setStatus(r.ok ? 'success' : 'error')
      if (r.ok) setForm({ name: '', company: '', service: '', description: '', budget: '', timeline: '' })
    } catch { setStatus('error') }
  }

  return (
    <section id="contact" ref={ref} style={{ padding: 'clamp(80px, 12vw, 160px) clamp(20px, 4vw, 60px)', position: 'relative', overflow: 'hidden' }}>

      {/* Background gradient */}
      <div className="orb" style={{ width: '700px', height: '700px', background: 'radial-gradient(circle, rgba(125,249,255,0.04) 0%, transparent 70%)', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', filter: 'blur(60px)' }} />

      <div style={{ maxWidth: '1300px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header — full-bleed editorial */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center', marginBottom: 'clamp(60px, 8vw, 100px)' }}
        >
          <div className="label" style={{ marginBottom: '24px' }}>— Let's build</div>
          <h2 style={{
            fontFamily: 'Syne, sans-serif', fontWeight: 800,
            fontSize: 'clamp(2.5rem, 8vw, 7rem)',
            color: '#fff', letterSpacing: '-0.04em', lineHeight: 0.95,
            marginBottom: '24px',
          }}>
            Start the
            <br />
            <span className="grad-text">Conversation.</span>
          </h2>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1rem', color: 'rgba(255,255,255,0.35)', maxWidth: '420px', margin: '0 auto', lineHeight: 1.7 }}>
            Response within 8 hours. Investment discussed during consultation — never published.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ textAlign: 'center', padding: '80px 0' }}
            >
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, #7DF9FF20, #BF5AF220)', border: '1px solid rgba(125,249,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><polyline points="20 6 9 17 4 12" stroke="#7DF9FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '2rem', color: '#fff', marginBottom: '12px', letterSpacing: '-0.03em' }}>Message received.</h3>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'DM Sans, sans-serif', fontSize: '0.95rem' }}>We'll be in touch within 8 hours.</p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              onSubmit={submit}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px', maxWidth: '900px', margin: '0 auto' }}
            >
              {/* Name */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label className="label">Name</label>
                <input className="input" type="text" required placeholder="Your name" value={form.name} onChange={e => update('name', e.target.value)} />
              </div>

              {/* Company */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label className="label">Company (optional)</label>
                <input className="input" type="text" placeholder="Your company" value={form.company} onChange={e => update('company', e.target.value)} />
              </div>

              {/* Service */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label className="label">Service needed</label>
                <select className="input" required value={form.service} onChange={e => update('service', e.target.value)}>
                  <option value="">Select</option>
                  {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              {/* Budget */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label className="label">Budget range</label>
                <select className="input" value={form.budget} onChange={e => update('budget', e.target.value)}>
                  <option value="">Select</option>
                  {BUDGETS.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>

              {/* Timeline — full width */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', gridColumn: '1 / -1' }}>
                <label className="label">Timeline</label>
                <select className="input" value={form.timeline} onChange={e => update('timeline', e.target.value)}>
                  <option value="">Select</option>
                  {TIMELINES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              {/* Message — full width */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', gridColumn: '1 / -1' }}>
                <label className="label">Project description</label>
                <textarea className="input" required placeholder="Tell us about your project, goals, and what success looks like..." value={form.description} onChange={e => update('description', e.target.value)} />
              </div>

              {/* Submit */}
              <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'center', paddingTop: '8px', gap: '16px', alignItems: 'center' }}>
                <button type="submit" className="btn-accent" disabled={status === 'loading'} style={{ opacity: status === 'loading' ? 0.6 : 1 }}>
                  {status === 'loading' ? 'Sending...' : 'Send Message'}
                  {status !== 'loading' && <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                </button>
                {status === 'error' && <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem', color: '#ff4444' }}>Failed to send. Please try again.</span>}
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
