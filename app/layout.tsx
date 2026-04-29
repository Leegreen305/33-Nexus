import type { Metadata, Viewport } from 'next'
import './globals.css'
import { CustomCursor } from '@/components/animations/CustomCursor'
import { ScrollProgress } from '@/components/animations/ScrollProgress'

export const metadata: Metadata = {
  title: {
    default: '33 Nexus — Where Intelligence Converges',
    template: '%s | 33 Nexus',
  },
  description:
    'Elite software development, AI engineering, and cybersecurity services. Custom software, web development, mobile apps, AI voice agents, AI automation, and enterprise-grade security.',
  keywords: [
    'software development',
    'web development',
    'mobile app development',
    'AI development',
    'AI voice agents',
    'AI automation',
    'custom AI agents',
    'cybersecurity',
    'enterprise software',
    '33 Nexus',
  ],
  authors: [{ name: 'Lee', url: 'https://github.com/Leegreen305' }],
  creator: '33 Nexus',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://33nexus.com',
    title: '33 Nexus — Where Intelligence Converges',
    description:
      'Elite software development, AI engineering, and cybersecurity services engineered to the 33rd degree of excellence.',
    siteName: '33 Nexus',
  },
  twitter: {
    card: 'summary_large_image',
    title: '33 Nexus — Where Intelligence Converges',
    description: 'Elite software, AI, and cybersecurity services.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#080808',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-nexus-void text-nexus-text antialiased overflow-x-hidden">
        <div className="noise-overlay" aria-hidden="true" />
        <CustomCursor />
        <ScrollProgress />
        {children}
      </body>
    </html>
  )
}
