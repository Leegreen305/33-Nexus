import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { PortalDashboard } from '@/components/portal/PortalDashboard'

export default async function PortalPage() {
  const session = await getServerSession(authOptions)
  if (!session) return null

  let project = null
  let phases: {
    id: string
    phaseNumber: number
    phaseName: string
    status: string
    completionPercentage: number
    notes: string | null
    startDate: Date | null
    completionDate: Date | null
  }[] = []
  let milestones: {
    id: string
    title: string
    description: string | null
    createdAt: Date
    phase: { phaseName: string } | null
  }[] = []
  let messages: {
    id: string
    content: string
    createdAt: Date
    read: boolean
    sender: { name: string | null; email: string }
  }[] = []
  let invoices: {
    id: string
    amount: number
    status: string
    dueDate: Date
  }[] = []

  try {
    project = await db.project.findFirst({
      where: { clientId: session.user.id },
      orderBy: { createdAt: 'desc' },
    })

    if (project) {
      phases = await db.phase.findMany({
        where: { projectId: project.id },
        orderBy: { phaseNumber: 'asc' },
      })

      milestones = await db.milestone.findMany({
        where: { projectId: project.id },
        orderBy: { createdAt: 'desc' },
        take: 8,
        include: { phase: { select: { phaseName: true } } },
      })

      messages = await db.message.findMany({
        where: { projectId: project.id, read: false },
        orderBy: { createdAt: 'desc' },
        take: 8,
        include: { sender: { select: { name: true, email: true } } },
      })

      invoices = await db.invoice.findMany({
        where: { projectId: project.id },
        orderBy: { dueDate: 'desc' },
        take: 8,
        select: { id: true, amount: true, status: true, dueDate: true },
      })
    }
  } catch {
    // DB not configured
  }

  return (
    <PortalDashboard
      userName={session.user.name ?? session.user.email}
      project={project}
      phases={phases}
      milestones={milestones}
      messages={messages}
      invoices={invoices}
    />
  )
}
