'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Preloader } from '@/components/marketing/Preloader'
import { Navigation } from '@/components/marketing/Navigation'
import { HeroSection } from '@/components/marketing/HeroSection'
import { MarqueeStrip } from '@/components/marketing/MarqueeStrip'
import { ServicesSection } from '@/components/marketing/ServicesSection'
import { FeaturedWorkSection } from '@/components/marketing/FeaturedWorkSection'
import { ProcessSection } from '@/components/marketing/ProcessSection'
import { AboutSection } from '@/components/marketing/AboutSection'
import { PortalPreviewSection } from '@/components/marketing/PortalPreviewSection'
import { ContactSection } from '@/components/marketing/ContactSection'
import { Footer } from '@/components/marketing/Footer'

export default function HomePage() {
  const [ready, setReady] = useState(false)
  const [visited, setVisited] = useState(false)

  useEffect(() => {
    const v = sessionStorage.getItem('nx-v')
    if (v) { setReady(true); setVisited(true) }
    else sessionStorage.setItem('nx-v', '1')
  }, [])

  return (
    <>
      <AnimatePresence>
        {!ready && !visited && <Preloader onComplete={() => setReady(true)} />}
      </AnimatePresence>

      <main style={{ opacity: ready || visited ? 1 : 0, transition: 'opacity 0.4s ease', background: 'var(--ink)' }}>
        <Navigation />
        <HeroSection />
        <MarqueeStrip />
        <ServicesSection />
        <MarqueeStrip inverted />
        <FeaturedWorkSection />
        <ProcessSection />
        <AboutSection />
        <PortalPreviewSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  )
}
