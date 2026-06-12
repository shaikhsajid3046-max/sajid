'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap, registerGsapPlugins } from '@/lib/gsap/gsapConfig'
import { useLenis } from '@/lib/lenis/LenisProvider'
import { useScrollVelocity } from '@/lib/hooks/useScrollVelocity'

const ROLES = ['DESIGNER', 'EDITOR', 'DIRECTOR', 'CREATOR']

interface HeroProps {
  philosophy?: string
}

export function Hero({ philosophy }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const roleRef = useRef<HTMLDivElement>(null)
  const { lenis } = useLenis()
  const [roleIndex, setRoleIndex] = useState(0)
  const [animKey, setAnimKey] = useState(0)

  useScrollVelocity(lenis, (velocity) => {
    const isTouch = window.matchMedia('(hover: none)').matches
    if (isTouch || !nameRef.current) return
    gsap.to(nameRef.current, {
      skewY: Math.max(-2.5, Math.min(2.5, velocity * 0.4)),
      duration: 0.4,
      ease: 'power1.out',
      overwrite: true,
    })
  })

  // Cycle roles
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimKey((k) => k + 1)
      setRoleIndex((i) => (i + 1) % ROLES.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  // Hero entrance
  useEffect(() => {
    registerGsapPlugins()
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !nameRef.current) return

    const ctx = gsap.context(() => {
      gsap.from(nameRef.current, {
        opacity: 0,
        yPercent: 8,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.2,
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-screen flex-col justify-end pb-16"
      style={{ padding: '0 var(--margin-page)' }}
    >
      {/* Name */}
      <h1
        ref={nameRef}
        className="text-display-xl font-display will-change-transform"
        style={{ color: 'var(--white)', lineHeight: '0.88' }}
      >
        Sajid
        <br />
        Sheikh
      </h1>

      {/* Role + scroll cue row */}
      <div className="mt-8 flex items-end justify-between">
        <div className="overflow-hidden h-[1.4em]">
          <div
            key={animKey}
            className="text-label"
            style={{
              color: 'var(--muted)',
              animation: 'cycleIn 0.5s cubic-bezier(0.16,1,0.3,1) forwards',
            }}
          >
            {ROLES[roleIndex]}
          </div>
        </div>

        {/* Scroll cue */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-label" style={{ color: 'var(--muted)' }}>Scroll</span>
          <div
            className="h-12 w-px"
            style={{ background: 'linear-gradient(to bottom, var(--muted), transparent)' }}
          />
        </div>
      </div>
    </section>
  )
}
