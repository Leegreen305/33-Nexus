import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { AdminDashboard } from '@/components/portal/AdminDashboard'

export const metadata = {
  title: 'Admin | 33 Nexus Portal',
}

export default async function AdminPage() {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== 'ADMIN') {
    redirect('/portal')
  }

  let clients: { id: string; name: string | null; email: string; createdAt: Date }[] = []
  let projects: {
    id: string
    name: string
    status: string
    currentPhase: number
    client: { name: string | null; email: string }
    startDate: Date
  }[] = []
  let recentMilestones: {
    id: string
    title: string
    createdAt: Date
    project: { name: string }
  }[] = []

  try {
    clients = await db.user.findMany({
      where: { role: 'CLIENT' },
      orderBy: { createdAt: 'desc' },
      select: { id: true, name: true, email: true, createdAt: true },
    })

    projects = await db.project.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        client: { select: { name: true, email: true } },
      },
      select: {
        id: true,
        name: true,
        status: true,
        currentPhase: true,
        startDate: true,
        client: { select: { name: true, email: true } },
      },
    })

    recentMilestones = await db.milestone.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
      include: { project: { select: { name: true } } },
    })
  } catch {
    // DB not configured
  }

  return (
    <AdminDashboard
      adminName={session.user.name ?? session.user.email}
      clients={clients}
      projects={projects}
      recentMilestones={recentMilestones}
    />
  )
}
