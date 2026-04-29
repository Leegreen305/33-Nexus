'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const SERVICES = ['Software Development','Web Development','Mobile App Development','AI Software Development','AI Voice Agents','AI Automation','Custom AI Agents','Cybersecurity Services','Multiple / Not Sure']
const BUDGETS = ['Under $5,000','$5,000 – $15,000','$15,000 – $50,000','$50,000 – $150,000','$150,000+','To be discussed']
const TIMELINES = ['ASAP','1–3 months','3–6 months','6–12 months','12+ months','Ongoing retainer']

export function ContactSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-5%' })
  const [form, setForm] = useState({ name: '', company: '', service: '', description: '', budget: '', timeline: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const up = (k: keyof typeof form, v: string) => setForm(p => ({ ...p, [k]: v }))

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
    <section id="contact" ref={ref} style={{ overflow: 'hidden' }}>

      {/* Split — left info dark, right form */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', minHeight: '600px' }}>

        {/* Left — info */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7 }}
          style={{ background: 'var(--ink-2)', padding: 'clamp(60px, 8vw, 100px) 40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div className="label" style={{ marginBottom: '24px' }}>— Get in touch</div>
            <h2 className="display" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', color: 'var(--cream)', marginBottom: '32px', lineHeight: 0.95 }}>
              Let's build<br />
              <span style={{ color: 'var(--lime)' }}>something<br />great.</span>
            </h2>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1rem', color: 'var(--cream-30)', lineHeight: 1.75, maxWidth: '380px' }}>
              Every project starts with a conversation. Tell us what you're building and we'll tell you exactly how we'd approach it.
            </p>
          </div>

          <div style={{ marginTop: '48px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--lime)', animation: 'pulse-dot 2s infinite' }} />
              <span className="label">Response within 8 hours</span>
            </div>
            <div style={{ fontFamily: 'DM Sans, sans-serif', fontStyle: 'italic', fontSize: '0.9rem', color: 'var(--cream-30)' }}>
              Investment is discussed in consultation — not listed online.
            </div>
          </div>
        </motion.div>

        {/* Right — form */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.15 }}
          style={{ background: 'var(--ink-3)', padding: 'clamp(60px, 8vw, 100px) 40px' }}>

          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div key="ok" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', height: '100%', gap: '16px' }}>
                <div style={{ width: '48px', height: '48px', border: '1px solid var(--lime)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><polyline points="3,10 8,15 17,5" stroke="var(--lime)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '2rem', color: 'var(--cream)', letterSpacing: '-0.03em' }}>Message received.</h3>
                <p style={{ fontFamily: 'DM Sans, sans-serif', color: 'var(--cream-30)', fontSize: '0.95rem' }}>We'll be in touch within 8 hours.</p>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 32px' }}>
                  <div>
                    <label className="label" style={{ display: 'block', marginBottom: '8px' }}>Name *</label>
                    <input className="field" type="text" required placeholder="Your name" value={form.name} onChange={e => up('name', e.target.value)} />
                  </div>
                  <div>
                    <label className="label" style={{ display: 'block', marginBottom: '8px' }}>Company</label>
                    <input className="field" type="text" placeholder="Optional" value={form.company} onChange={e => up('company', e.target.value)} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 32px' }}>
                  <div>
                    <label className="label" style={{ display: 'block', marginBottom: '8px' }}>Service *</label>
                    <select className="field" required value={form.service} onChange={e => up('service', e.target.value)}>
                      <option value="">Select</option>
                      {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="label" style={{ display: 'block', marginBottom: '8px' }}>Budget</label>
                    <select className="field" value={form.budget} onChange={e => up('budget', e.target.value)}>
                      <option value="">Select</option>
                      {BUDGETS.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="label" style={{ display: 'block', marginBottom: '8px' }}>Timeline</label>
                  <select className="field" value={form.timeline} onChange={e => up('timeline', e.target.value)}>
                    <option value="">Select</option>
                    {TIMELINES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                <div>
                  <label className="label" style={{ display: 'block', marginBottom: '8px' }}>Project description *</label>
                  <textarea className="field" required placeholder="Tell us about your project..." value={form.description} onChange={e => up('description', e.target.value)} style={{ minHeight: '100px', resize: 'vertical' }} />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', paddingTop: '8px' }}>
                  <button type="submit" className="btn btn-lime" disabled={status === 'loading'} style={{ opacity: status === 'loading' ? 0.6 : 1 }}>
                    {status === 'loading' ? 'Sending...' : 'Send Message →'}
                  </button>
                  {status === 'error' && <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.82rem', color: 'var(--red)' }}>Failed. Please try again.</span>}
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
