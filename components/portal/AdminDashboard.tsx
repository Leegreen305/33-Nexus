'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface Client {
  id: string
  name: string | null
  email: string
  createdAt: Date
}

interface Project {
  id: string
  name: string
  status: string
  currentPhase: number
  startDate: Date
  client: { name: string | null; email: string }
}

interface Milestone {
  id: string
  title: string
  createdAt: Date
  project: { name: string }
}

interface AdminDashboardProps {
  adminName: string
  clients: Client[]
  projects: Project[]
  recentMilestones: Milestone[]
}

type Tab = 'overview' | 'clients' | 'projects' | 'milestones'

const STATUS_COLORS: Record<string, string> = {
  ACTIVE: '#D4D4D4',
  COMPLETE: '#00D4FF',
  PAUSED: '#555555',
}

export function AdminDashboard({ adminName, clients, projects, recentMilestones }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<Tab>('overview')

  const TABS: { id: Tab; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'clients', label: `Clients (${clients.length})` },
    { id: 'projects', label: `Projects (${projects.length})` },
    { id: 'milestones', label: 'Milestones' },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.66 }}
        style={{ borderBottom: '1px solid #1A1A1A', paddingBottom: '2rem' }}
      >
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.2em', color: '#8B0000', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
          ADMIN ACCESS
        </div>
        <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '2.2rem', letterSpacing: '0.05em', color: '#FFFFFF', marginBottom: '0.25rem' }}>
          COMMAND CENTER
        </h1>
        <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.88rem', color: '#555555' }}>
          Logged in as {adminName} — Full administrative access
        </div>
      </motion.div>

      {/* Stats overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.66, delay: 0.1 }}
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px' }}
      >
        {[
          { label: 'Total Clients', value: String(clients.length), color: '#D4D4D4' },
          { label: 'Active Projects', value: String(projects.filter(p => p.status === 'ACTIVE').length), color: '#D4D4D4' },
          { label: 'Completed', value: String(projects.filter(p => p.status === 'COMPLETE').length), color: '#00D4FF' },
          { label: 'Milestones', value: String(recentMilestones.length), color: '#D4D4D4' },
        ].map((stat) => (
          <div key={stat.label} style={{ background: '#080808', border: '1px solid #1A1A1A', borderRadius: '0.88rem', padding: '1.25rem' }}>
            <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '2rem', color: stat.color, lineHeight: 1 }}>
              {stat.value}
            </div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', color: '#555555', letterSpacing: '0.1em', marginTop: '4px', textTransform: 'uppercase' }}>
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.66, delay: 0.2 }}
      >
        <div className="flex gap-2 mb-6 flex-wrap">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: '99px',
                fontFamily: 'Bebas Neue, sans-serif',
                fontSize: '0.88rem',
                letterSpacing: '0.1em',
                background: activeTab === tab.id ? 'rgba(212,212,212,0.1)' : 'transparent',
                border: `1px solid ${activeTab === tab.id ? 'rgba(212,212,212,0.3)' : '#1A1A1A'}`,
                color: activeTab === tab.id ? '#D4D4D4' : '#555555',
                cursor: 'none',
                transition: 'all 0.33s ease',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview */}
        {activeTab === 'overview' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {/* Recent projects */}
            <div style={{ background: '#080808', border: '1px solid #1A1A1A', borderRadius: '1.1rem', padding: '2rem' }}>
              <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.1rem', letterSpacing: '0.08em', color: '#FFFFFF', marginBottom: '1.5rem' }}>
                RECENT PROJECTS
              </div>
              <div className="space-y-3">
                {projects.slice(0, 5).map((p) => (
                  <div key={p.id} className="flex items-center justify-between">
                    <div>
                      <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.88rem', color: '#FFFFFF' }}>{p.name}</div>
                      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', color: '#555555' }}>
                        {p.client.name ?? p.client.email} · Phase {p.currentPhase}/8
                      </div>
                    </div>
                    <div style={{
                      padding: '3px 10px', borderRadius: '99px',
                      fontFamily: 'JetBrains Mono, monospace', fontSize: '0.44rem', letterSpacing: '0.1em',
                      color: STATUS_COLORS[p.status] ?? '#555555',
                      border: `1px solid ${STATUS_COLORS[p.status] ? STATUS_COLORS[p.status] + '40' : '#1A1A1A'}`,
                      background: STATUS_COLORS[p.status] ? STATUS_COLORS[p.status] + '15' : 'transparent',
                    }}>
                      {p.status}
                    </div>
                  </div>
                ))}
                {projects.length === 0 && (
                  <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.88rem', color: '#555555' }}>No projects yet.</p>
                )}
              </div>
            </div>

            {/* Recent milestones */}
            <div style={{ background: '#080808', border: '1px solid #1A1A1A', borderRadius: '1.1rem', padding: '2rem' }}>
              <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.1rem', letterSpacing: '0.08em', color: '#FFFFFF', marginBottom: '1.5rem' }}>
                RECENT MILESTONES
              </div>
              <div className="space-y-4">
                {recentMilestones.slice(0, 5).map((m) => (
                  <div key={m.id} className="flex gap-3">
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#D4D4D4', flexShrink: 0, marginTop: '6px' }} />
                    <div>
                      <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.88rem', color: '#FFFFFF' }}>{m.title}</div>
                      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', color: '#555555' }}>
                        {m.project.name} · {new Date(m.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
                {recentMilestones.length === 0 && (
                  <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.88rem', color: '#555555' }}>No milestones yet.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Clients tab */}
        {activeTab === 'clients' && (
          <div style={{ background: '#080808', border: '1px solid #1A1A1A', borderRadius: '1.1rem', overflow: 'hidden' }}>
            <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid #1A1A1A' }}>
              <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.1rem', letterSpacing: '0.08em', color: '#FFFFFF' }}>
                CLIENT ROSTER — {clients.length} TOTAL
              </div>
            </div>
            <div className="divide-y divide-nexus-border">
              {clients.map((client) => (
                <div key={client.id} className="flex items-center justify-between" style={{ padding: '1rem 2rem' }}>
                  <div>
                    <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.99rem', color: '#FFFFFF' }}>
                      {client.name ?? 'Unnamed Client'}
                    </div>
                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', color: '#555555', letterSpacing: '0.1em' }}>
                      {client.email}
                    </div>
                  </div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', color: '#555555' }}>
                    Since {new Date(client.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
              {clients.length === 0 && (
                <div style={{ padding: '2rem', fontFamily: 'DM Sans, sans-serif', fontSize: '0.88rem', color: '#555555' }}>
                  No clients yet.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Projects tab */}
        {activeTab === 'projects' && (
          <div style={{ background: '#080808', border: '1px solid #1A1A1A', borderRadius: '1.1rem', overflow: 'hidden' }}>
            <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid #1A1A1A' }}>
              <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.1rem', letterSpacing: '0.08em', color: '#FFFFFF' }}>
                ALL PROJECTS
              </div>
            </div>
            <div className="divide-y" style={{ borderColor: '#1A1A1A' }}>
              {projects.map((p) => (
                <div key={p.id} style={{ padding: '1rem 2rem' }}>
                  <div className="flex items-center justify-between mb-2">
                    <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1rem', letterSpacing: '0.08em', color: '#FFFFFF' }}>
                      {p.name}
                    </div>
                    <div style={{
                      padding: '3px 10px', borderRadius: '99px',
                      fontFamily: 'JetBrains Mono, monospace', fontSize: '0.44rem', letterSpacing: '0.1em',
                      color: STATUS_COLORS[p.status] ?? '#555555',
                    }}>
                      {p.status}
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', color: '#555555' }}>
                      Client: {p.client.name ?? p.client.email}
                    </span>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', color: '#D4D4D4' }}>
                      Phase {p.currentPhase}/8
                    </span>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', color: '#555555' }}>
                      Started {new Date(p.startDate).toLocaleDateString()}
                    </span>
                  </div>
                  {/* Phase progress bar */}
                  <div style={{ marginTop: '0.75rem', height: '3px', background: '#1A1A1A', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ width: `${(p.currentPhase / 8) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #D4D4D4, #F0F0F0)' }} />
                  </div>
                </div>
              ))}
              {projects.length === 0 && (
                <div style={{ padding: '2rem', fontFamily: 'DM Sans, sans-serif', fontSize: '0.88rem', color: '#555555' }}>
                  No projects yet.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Milestones tab */}
        {activeTab === 'milestones' && (
          <div style={{ background: '#080808', border: '1px solid #1A1A1A', borderRadius: '1.1rem', padding: '2rem' }}>
            <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.1rem', letterSpacing: '0.08em', color: '#FFFFFF', marginBottom: '1.5rem' }}>
              ALL MILESTONES
            </div>
            <div className="space-y-4">
              {recentMilestones.map((m) => (
                <div
                  key={m.id}
                  style={{ padding: '1rem', background: '#0C0C0C', border: '1px solid #1A1A1A', borderRadius: '0.66rem' }}
                >
                  <div className="flex items-start justify-between mb-1">
                    <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.99rem', color: '#FFFFFF' }}>
                      {m.title}
                    </div>
                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', color: '#555555', flexShrink: 0, marginLeft: '1rem' }}>
                      {new Date(m.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', color: '#D4D4D4', letterSpacing: '0.1em' }}>
                    {m.project.name}
                  </div>
                </div>
              ))}
              {recentMilestones.length === 0 && (
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.88rem', color: '#555555' }}>No milestones yet.</p>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}
