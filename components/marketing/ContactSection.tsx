'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { SERVICES } from '@/lib/constants'

interface FormData {
  name: string
  company: string
  service: string
  description: string
  budget: string
  timeline: string
}

const BUDGET_OPTIONS = [
  'Under $5,000',
  '$5,000 – $15,000',
  '$15,000 – $50,000',
  '$50,000 – $150,000',
  '$150,000+',
  'To be discussed',
]

const TIMELINE_OPTIONS = [
  'ASAP',
  '1–3 months',
  '3–6 months',
  '6–12 months',
  '12+ months',
  'Ongoing / Retainer',
]

export function ContactSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-5%' })

  const [formData, setFormData] = useState<FormData>({
    name: '',
    company: '',
    service: '',
    description: '',
    budget: '',
    timeline: '',
  })

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setStatus('success')
        setFormData({ name: '', company: '', service: '', description: '', budget: '', timeline: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <section id="contact" ref={ref} className="relative py-40 px-6 overflow-hidden">
      {/* Background geometry */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 33% 50%, rgba(201,168,76,0.03) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-5xl mx-auto">
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
            — BEGIN
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.99, delay: 0.1 }}
            style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: 'clamp(2.2rem, 6vw, 3.3rem)',
              letterSpacing: '0.05em',
              color: '#F5F0E8',
              marginBottom: '1rem',
            }}
          >
            Begin at the{' '}
            <span className="text-gold-gradient">33rd Degree</span>
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
            }}
          >
            Every great structure begins with a single conversation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.66, delay: 0.35 }}
            className="flex items-center justify-center gap-3 mt-6"
          >
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#C9A84C',
                boxShadow: '0 0 8px rgba(201,168,76,0.6)',
                animation: 'pulse-indicator 1.32s ease-in-out infinite',
              }}
            />
            <span
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.66rem',
                color: '#6B6560',
                letterSpacing: '0.15em',
              }}
            >
              Response within 8 hours
            </span>
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.33 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              {/* Gold particle burst */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 2, 1.5], opacity: [0, 0.4, 0] }}
                transition={{ duration: 0.66 }}
                style={{
                  position: 'absolute',
                  width: '300px',
                  height: '300px',
                  background: 'radial-gradient(circle, rgba(201,168,76,0.4) 0%, transparent 70%)',
                  borderRadius: '50%',
                }}
              />

              <div
                style={{
                  width: '66px',
                  height: '66px',
                  border: '2px solid #C9A84C',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '2rem',
                  boxShadow: '0 0 33px rgba(201,168,76,0.3)',
                }}
              >
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <polyline
                    points="5,14 11,20 23,8"
                    stroke="#C9A84C"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <h3
                style={{
                  fontFamily: 'Bebas Neue, sans-serif',
                  fontSize: '2.2rem',
                  letterSpacing: '0.1em',
                  color: '#F5F0E8',
                  marginBottom: '1rem',
                }}
              >
                MESSAGE RECEIVED
              </h3>
              <p
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '1rem',
                  color: '#6B6560',
                  lineHeight: 1.7,
                  maxWidth: '400px',
                }}
              >
                We&apos;ll review your project and respond within 8 hours.
                The 33 Nexus method begins with precision — including our response.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.99, delay: 0.3 }}
              onSubmit={handleSubmit}
              style={{
                background: '#0D0D0D',
                border: '1px solid #1F1F1F',
                borderRadius: '1.1rem',
                padding: 'clamp(2rem, 5vw, 4rem)',
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <label
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.55rem',
                      letterSpacing: '0.2em',
                      color: '#6B6560',
                      textTransform: 'uppercase',
                      display: 'block',
                    }}
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    className="nexus-input"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => updateField('name', e.target.value)}
                  />
                </div>

                {/* Company */}
                <div className="space-y-2">
                  <label
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.55rem',
                      letterSpacing: '0.2em',
                      color: '#6B6560',
                      textTransform: 'uppercase',
                      display: 'block',
                    }}
                  >
                    Company (Optional)
                  </label>
                  <input
                    type="text"
                    className="nexus-input"
                    placeholder="Your company"
                    value={formData.company}
                    onChange={(e) => updateField('company', e.target.value)}
                  />
                </div>

                {/* Service */}
                <div className="space-y-2">
                  <label
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.55rem',
                      letterSpacing: '0.2em',
                      color: '#6B6560',
                      textTransform: 'uppercase',
                      display: 'block',
                    }}
                  >
                    Service Needed
                  </label>
                  <select
                    required
                    className="nexus-input"
                    value={formData.service}
                    onChange={(e) => updateField('service', e.target.value)}
                    style={{ background: '#141414' }}
                  >
                    <option value="">Select a service</option>
                    {SERVICES.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                    <option value="Multiple / Not Sure">Multiple / Not Sure</option>
                  </select>
                </div>

                {/* Budget */}
                <div className="space-y-2">
                  <label
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.55rem',
                      letterSpacing: '0.2em',
                      color: '#6B6560',
                      textTransform: 'uppercase',
                      display: 'block',
                    }}
                  >
                    Budget Range
                  </label>
                  <select
                    className="nexus-input"
                    value={formData.budget}
                    onChange={(e) => updateField('budget', e.target.value)}
                    style={{ background: '#141414' }}
                  >
                    <option value="">Select a range</option>
                    {BUDGET_OPTIONS.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Timeline */}
                <div className="space-y-2">
                  <label
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.55rem',
                      letterSpacing: '0.2em',
                      color: '#6B6560',
                      textTransform: 'uppercase',
                      display: 'block',
                    }}
                  >
                    Desired Timeline
                  </label>
                  <select
                    className="nexus-input"
                    value={formData.timeline}
                    onChange={(e) => updateField('timeline', e.target.value)}
                    style={{ background: '#141414' }}
                  >
                    <option value="">Select timeline</option>
                    {TIMELINE_OPTIONS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Description — full width */}
                <div className="space-y-2 md:col-span-2">
                  <label
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.55rem',
                      letterSpacing: '0.2em',
                      color: '#6B6560',
                      textTransform: 'uppercase',
                      display: 'block',
                    }}
                  >
                    Project Description
                  </label>
                  <textarea
                    required
                    className="nexus-input"
                    placeholder="Describe your project, goals, and what success looks like to you..."
                    rows={5}
                    value={formData.description}
                    onChange={(e) => updateField('description', e.target.value)}
                    style={{ resize: 'vertical', minHeight: '120px' }}
                  />
                </div>
              </div>

              {/* Pricing note */}
              <div
                className="flex items-center gap-3 mt-6 mb-8"
                style={{
                  padding: '0.88rem 1.1rem',
                  background: '#141414',
                  border: '1px solid #1F1F1F',
                  borderRadius: '0.66rem',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="7" stroke="#6B6560" strokeWidth="1" />
                  <line x1="8" y1="6" x2="8" y2="10" stroke="#6B6560" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="8" cy="4.5" r="0.75" fill="#6B6560" />
                </svg>
                <span
                  style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '0.77rem',
                    color: '#6B6560',
                  }}
                >
                  Investment is discussed during consultation — no pricing is published. Every engagement is scoped to your specific needs.
                </span>
              </div>

              {/* Submit */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-gold"
                  style={{ opacity: status === 'loading' ? 0.7 : 1 }}
                >
                  {status === 'loading' ? 'TRANSMITTING...' : 'SEND MESSAGE'}
                </button>
              </div>

              {status === 'error' && (
                <p
                  className="text-center mt-4"
                  style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '0.88rem',
                    color: '#8B0000',
                  }}
                >
                  Something went wrong. Please email us directly.
                </p>
              )}
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
