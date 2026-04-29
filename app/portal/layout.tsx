import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { Sidebar } from '@/components/portal/Sidebar'
import { db } from '@/lib/db'

export const metadata = {
  title: 'Client Portal | 33 Nexus',
  description: 'Manage your 33 Nexus project with full visibility into every phase.',
}

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/portal/login')
  }

  // Get first active project for display
  let projectName: string | undefined
  try {
    const project = await db.project.findFirst({
      where: { clientId: session.user.id, status: 'ACTIVE' },
      select: { name: true },
    })
    projectName = project?.name ?? undefined
  } catch {
    // Database might not be set up yet
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#080808' }}>
      <Sidebar
        userName={session.user.name ?? session.user.email}
        userRole={session.user.role}
        projectName={projectName}
      />
      <main
        className="flex-1"
        style={{
          marginLeft: '280px',
          padding: '2rem',
          minHeight: '100vh',
          maxWidth: 'calc(100vw - 280px)',
        }}
      >
        {children}
      </main>
    </div>
  )
}
