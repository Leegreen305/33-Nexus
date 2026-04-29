'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Preloader } from '@/components/marketing/Preloader'
import { Navigation } from '@/components/marketing/Navigation'
import { HeroSection } from '@/components/marketing/HeroSection'
import { AboutSection } from '@/components/marketing/AboutSection'
import { ServicesSection } from '@/components/marketing/ServicesSection'
import { ProcessSection } from '@/components/marketing/ProcessSection'
import { PortalPreviewSection } from '@/components/marketing/PortalPreviewSection'
import { FeaturedWorkSection } from '@/components/marketing/FeaturedWorkSection'
import { ContactSection } from '@/components/marketing/ContactSection'
import { Footer } from '@/components/marketing/Footer'

export default function HomePage() {
  const [preloaderDone, setPreloaderDone] = useState(false)
  const [hasVisited, setHasVisited] = useState(false)

  useEffect(() => {
    const visited = sessionStorage.getItem('nexus-visited')
    if (visited) {
      setPreloaderDone(true)
      setHasVisited(true)
    } else {
      sessionStorage.setItem('nexus-visited', 'true')
    }
  }, [])

  const handlePreloaderComplete = () => {
    setPreloaderDone(true)
  }

  return (
    <>
      <AnimatePresence>
        {!preloaderDone && !hasVisited && (
          <Preloader onComplete={handlePreloaderComplete} />
        )}
      </AnimatePresence>

      <main
        className="bg-sacred bg-nexus-void"
        style={{
          opacity: preloaderDone || hasVisited ? 1 : 0,
          transition: 'opacity 0.33s ease',
        }}
      >
        <Navigation />

        <HeroSection />

        {/* Section divider */}
        <div className="section-divider" />

        <AboutSection />

        <div className="section-divider" />

        <ServicesSection />

        <ProcessSection />

        <PortalPreviewSection />

        <FeaturedWorkSection />

        <ContactSection />

        <Footer />
      </main>
    </>
  )
}
