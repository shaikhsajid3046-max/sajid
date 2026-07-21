'use client'

import { useEffect, useRef } from 'react'
import { gsap, registerGsapPlugins } from '@/lib/gsap/gsapConfig'
import { SplitText } from '@/components/ui/SplitText'

interface AssetsPageHeaderProps {
  assetCount: number
}

export function AssetsPageHeader({ assetCount }: AssetsPageHeaderProps) {
  const headerRef = useRef<HTMLElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const countRef = useRef<HTMLDivElement>(null)
  const dividerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    registerGsapPlugins()
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !headerRef.current) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from(labelRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.7,
        delay: 0.1,
      })
        .from(
          countRef.current,
          {
            opacity: 0,
            y: 16,
            duration: 0.6,
          },
          '-=0.3'
        )
        .from(
          dividerRef.current,
          {
            scaleX: 0,
            duration: 0.8,
            ease: 'power2.out',
          },
          '-=0.2'
        )
    }, headerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={headerRef}
      style={{
        padding: 'calc(var(--nav-height) + 80px) var(--margin-page) 0',
      }}
    >
      {/* Section label */}
      <div ref={labelRef} className="flex items-center gap-3 mb-6">
        <span className="dot-icon" />
        <span className="section-label">Creative Assets</span>
      </div>

      {/* Main heading */}
      <div className="flex items-end justify-between flex-wrap gap-6">
        <SplitText as="h1" className="text-display-lg font-display">
          Assets
        </SplitText>

        {/* Asset count badge */}
        <div ref={countRef} className="mb-4">
          <span className="project-count-badge">
            <span className="dot-icon dot-icon--sm" />
            {assetCount} {assetCount === 1 ? 'Asset' : 'Assets'}
          </span>
        </div>
      </div>

      {/* Subtitle */}
      <p
        className="text-body-lg mt-4 max-w-xl"
        style={{ color: 'var(--muted)' }}
      >
        Original project files crafted across Photoshop, Illustrator, Premiere Pro &amp; After Effects.
      </p>

      {/* Gradient divider */}
      <div
        ref={dividerRef}
        className="gradient-divider mt-10"
        style={{ transformOrigin: 'left center' }}
      />
    </section>
  )
}
