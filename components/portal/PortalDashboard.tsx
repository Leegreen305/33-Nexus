'use client'

import { motion } from 'framer-motion'
import { PORTAL_PHASES } from '@/lib/constants'

interface Phase {
  id: string
  phaseNumber: number
  phaseName: string
  status: string
  completionPercentage: number
  notes: string | null
  startDate: Date | null
  completionDate: Date | null
}

interface Milestone {
  id: string
  title: string
  description: string | null
  createdAt: Date
  phase: { phaseName: string } | null
}

interface Message {
  id: string
  content: string
  createdAt: Date
  read: boolean
  sender: { name: string | null; email: string }
}

interface Invoice {
  id: string
  amount: number
  status: string
  dueDate: Date
}

interface Project {
  id: string
  name: string
  currentPhase: number
  status: string
  startDate: Date
  estimatedCompletion: Date | null
  description: string | null
}

interface PortalDashboardProps {
  userName: string
  project: Project | null
  phases: Phase[]
  milestones: Milestone[]
  messages: Message[]
  invoices: Invoice[]
}

function PhaseCard({ phase, portalPhase }: { phase: Phase | undefined; portalPhase: typeof PORTAL_PHASES[number] }) {
  const status = phase?.status ?? 'PENDING'
  const pct = phase?.completionPercentage ?? 0

  return (
    <div
      style={{
        background: '#0D0D0D',
        border: `1px solid ${status === 'COMPLETE' ? 'rgba(201,168,76,0.2)' : status === 'IN_PROGRESS' ? 'rgba(0,212,255,0.2)' : '#1F1F1F'}`,
        borderRadius: '0.88rem',
        padding: '1.25rem',
        transition: 'all 0.33s ease',
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background:
                status === 'COMPLETE'
                  ? '#C9A84C'
                  : status === 'IN_PROGRESS'
                  ? '#00D4FF'
                  : '#1F1F1F',
              boxShadow:
                status === 'COMPLETE'
                  ? '0 0 8px rgba(201,168,76,0.5)'
                  : status === 'IN_PROGRESS'
                  ? '0 0 8px rgba(0,212,255,0.5)'
                  : 'none',
              animation: status === 'IN_PROGRESS' ? 'pulse-indicator 1.32s ease-in-out infinite' : 'none',
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.55rem',
              letterSpacing: '0.15em',
              color: '#6B6560',
              textTransform: 'uppercase',
            }}
          >
            Phase {portalPhase.number}
          </span>
        </div>
        <span
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.55rem',
            color: status === 'COMPLETE' ? '#C9A84C' : '#6B6560',
          }}
        >
          {pct}%
        </span>
      </div>

      <div
        style={{
          fontFamily: 'Bebas Neue, sans-serif',
          fontSize: '0.88rem',
          letterSpacing: '0.08em',
          color: status === 'PENDING' ? '#6B6560' : '#F5F0E8',
          marginBottom: '0.75rem',
        }}
      >
        {portalPhase.name}
      </div>

      {/* Progress bar */}
      <div style={{ height: '2px', background: '#1F1F1F', borderRadius: '1px', overflow: 'hidden' }}>
        <div
          style={{
            width: `${pct}%`,
            height: '100%',
            background: status === 'IN_PROGRESS'
              ? 'linear-gradient(90deg, #00D4FF, #00D4FF88)'
              : 'linear-gradient(90deg, #C9A84C, #E8C97A)',
            transition: 'width 0.99s ease',
          }}
        />
      </div>
    </div>
  )
}

export function PortalDashboard({
  userName,
  project,
  phases,
  milestones,
  messages,
  invoices,
}: PortalDashboardProps) {
  const firstName = userName.split(' ')[0] ?? userName

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div style={{
          width: '66px', height: '66px', border: '2px solid #1F1F1F',
          borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem',
        }}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="14" r="12" stroke="#6B6560" strokeWidth="1.5" />
            <line x1="14" y1="8" x2="14" y2="16" stroke="#6B6560" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="14" cy="20" r="1" fill="#6B6560" />
          </svg>
        </div>
        <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '2.2rem', color: '#F5F0E8', marginBottom: '1rem' }}>
          No Active Project
        </h2>
        <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1rem', color: '#6B6560', maxWidth: '400px' }}>
          You don&apos;t have an active project yet. Contact your 33 Nexus account manager to get started.
        </p>
        <a href="/#contact" style={{ cursor: 'none', marginTop: '2rem' }}>
          <button className="btn-gold">BEGIN A PROJECT</button>
        </a>
      </div>
    )
  }

  const pendingInvoices = invoices.filter((i) => i.status === 'PENDING' || i.status === 'OVERDUE')
  const unreadMessages = messages.length

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.66 }}
        style={{ borderBottom: '1px solid #1F1F1F', paddingBottom: '2rem' }}
      >
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.2em', color: '#6B6560', marginBottom: '0.5rem' }}>
          WELCOME BACK
        </div>
        <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '2.2rem', letterSpacing: '0.05em', color: '#F5F0E8', marginBottom: '0.25rem' }}>
          {firstName}
        </h1>
        <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.88rem', color: '#6B6560' }}>
          {project.name} — Phase {project.currentPhase} of 8
        </div>
      </motion.div>

      {/* Quick stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.66, delay: 0.1 }}
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px' }}
      >
        {[
          { label: 'Current Phase', value: `${project.currentPhase}/8`, color: '#C9A84C' },
          { label: 'Unread Messages', value: String(unreadMessages), color: unreadMessages > 0 ? '#00D4FF' : '#6B6560' },
          { label: 'Pending Invoices', value: String(pendingInvoices.length), color: pendingInvoices.length > 0 ? '#8B0000' : '#6B6560' },
          { label: 'Milestones', value: String(milestones.length), color: '#C9A84C' },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{ background: '#0D0D0D', border: '1px solid #1F1F1F', borderRadius: '0.88rem', padding: '1.25rem' }}
          >
            <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '2rem', color: stat.color, lineHeight: 1 }}>
              {stat.value}
            </div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', color: '#6B6560', letterSpacing: '0.1em', marginTop: '4px', textTransform: 'uppercase' }}>
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Phase tracker — 8 phases */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.66, delay: 0.2 }}
        style={{ background: '#0D0D0D', border: '1px solid #1F1F1F', borderRadius: '1.1rem', padding: '2rem' }}
      >
        <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.32rem', letterSpacing: '0.08em', color: '#F5F0E8', marginBottom: '1.5rem' }}>
          PROJECT PHASES
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
          {PORTAL_PHASES.map((portalPhase) => {
            const dbPhase = phases.find((p) => p.phaseNumber === portalPhase.number)
            return (
              <PhaseCard key={portalPhase.number} phase={dbPhase} portalPhase={portalPhase} />
            )
          })}
        </div>
      </motion.div>

      {/* Two-column: Milestones + Messages */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        {/* Milestones */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.66, delay: 0.3 }}
          style={{ background: '#0D0D0D', border: '1px solid #1F1F1F', borderRadius: '1.1rem', padding: '2rem' }}
        >
          <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.32rem', letterSpacing: '0.08em', color: '#F5F0E8', marginBottom: '1.5rem' }}>
            RECENT MILESTONES
          </div>

          {milestones.length === 0 ? (
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.88rem', color: '#6B6560' }}>
              No milestones recorded yet.
            </p>
          ) : (
            <div className="space-y-4">
              {milestones.slice(0, 5).map((m, i) => (
                <div key={m.id} className="flex gap-3">
                  <div
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: '#C9A84C',
                      boxShadow: '0 0 8px rgba(201,168,76,0.5)',
                      flexShrink: 0,
                      marginTop: '6px',
                    }}
                  />
                  <div>
                    <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.88rem', color: '#F5F0E8', marginBottom: '2px' }}>
                      {m.title}
                    </div>
                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', color: '#6B6560', letterSpacing: '0.1em' }}>
                      {m.phase?.phaseName} — {new Date(m.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Messages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.66, delay: 0.4 }}
          style={{ background: '#0D0D0D', border: '1px solid #1F1F1F', borderRadius: '1.1rem', padding: '2rem' }}
        >
          <div className="flex items-center justify-between mb-6">
            <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.32rem', letterSpacing: '0.08em', color: '#F5F0E8' }}>
              MESSAGES
            </div>
            {unreadMessages > 0 && (
              <div style={{
                background: 'rgba(0,212,255,0.15)',
                border: '1px solid rgba(0,212,255,0.2)',
                borderRadius: '99px',
                padding: '2px 10px',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.55rem',
                color: '#00D4FF',
                letterSpacing: '0.1em',
              }}>
                {unreadMessages} NEW
              </div>
            )}
          </div>

          {messages.length === 0 ? (
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.88rem', color: '#6B6560' }}>
              No unread messages.
            </p>
          ) : (
            <div className="space-y-3">
              {messages.slice(0, 5).map((msg) => (
                <div
                  key={msg.id}
                  style={{
                    padding: '0.88rem',
                    background: '#141414',
                    borderRadius: '0.66rem',
                    border: '1px solid #1F1F1F',
                  }}
                >
                  <div className="flex justify-between mb-1">
                    <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.77rem', color: '#C9A84C' }}>
                      {msg.sender.name ?? msg.sender.email}
                    </span>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', color: '#6B6560' }}>
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.77rem', color: '#6B6560', lineHeight: 1.5 }}>
                    {msg.content.slice(0, 100)}{msg.content.length > 100 ? '...' : ''}
                  </p>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Invoices */}
      {invoices.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.66, delay: 0.5 }}
          style={{ background: '#0D0D0D', border: '1px solid #1F1F1F', borderRadius: '1.1rem', padding: '2rem' }}
        >
          <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.32rem', letterSpacing: '0.08em', color: '#F5F0E8', marginBottom: '1.5rem' }}>
            INVOICES
          </div>
          <div className="space-y-3">
            {invoices.map((inv) => (
              <div
                key={inv.id}
                className="flex items-center justify-between"
                style={{ padding: '0.88rem 1rem', background: '#141414', borderRadius: '0.66rem', border: '1px solid #1F1F1F' }}
              >
                <div>
                  <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.88rem', color: '#F5F0E8' }}>
                    ${inv.amount.toLocaleString()}
                  </div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', color: '#6B6560', letterSpacing: '0.1em' }}>
                    Due {new Date(inv.dueDate).toLocaleDateString()}
                  </div>
                </div>
                <div style={{
                  padding: '4px 12px',
                  borderRadius: '99px',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.55rem',
                  letterSpacing: '0.1em',
                  background: inv.status === 'PAID' ? 'rgba(201,168,76,0.1)' : inv.status === 'OVERDUE' ? 'rgba(139,0,0,0.2)' : 'rgba(100,100,100,0.15)',
                  color: inv.status === 'PAID' ? '#C9A84C' : inv.status === 'OVERDUE' ? '#ff4444' : '#6B6560',
                  border: `1px solid ${inv.status === 'PAID' ? 'rgba(201,168,76,0.2)' : inv.status === 'OVERDUE' ? 'rgba(139,0,0,0.3)' : '#1F1F1F'}`,
                }}>
                  {inv.status}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}
