'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { gsap, ScrollTrigger, registerGsapPlugins } from '@/lib/gsap/gsapConfig'
import { useLenis } from '@/lib/lenis/LenisProvider'
import { useScrollVelocity } from '@/lib/hooks/useScrollVelocity'

// Loaded client-side only — keeps Three.js out of SSR bundle
const WebGLHero = dynamic(
  () => import('@/components/ui/WebGLHero').then((m) => ({ default: m.WebGLHero })),
  { ssr: false }
)

const ROLES = ['DESIGNER', 'EDITOR', 'DIRECTOR', 'CREATOR']

interface HeroProps {
  philosophy?: string
}

export function Hero({ philosophy }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const firstLineRef = useRef<HTMLSpanElement>(null)
  const secondLineRef = useRef<HTMLSpanElement>(null)
  const { lenis } = useLenis()
  const [roleIndex, setRoleIndex] = useState(0)
  const [animKey, setAnimKey] = useState(0)

  // Scroll velocity skew on hero name
  useScrollVelocity(lenis, (velocity) => {
    if (window.matchMedia('(hover: none)').matches || !nameRef.current) return
    gsap.to(nameRef.current, {
      skewY: Math.max(-2.5, Math.min(2.5, velocity * 0.4)),
      duration: 0.4,
      ease: 'power1.out',
      overwrite: true,
    })
  })

  // Cycle role text
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimKey((k) => k + 1)
      setRoleIndex((i) => (i + 1) % ROLES.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  // Entrance + 3D parallax depth on name lines
  useEffect(() => {
    registerGsapPlugins()
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !nameRef.current || !heroRef.current) return

    const ctx = gsap.context(() => {
      // Entrance — lines slide up
      gsap.from([firstLineRef.current, secondLineRef.current], {
        opacity: 0,
        yPercent: 12,
        stagger: 0.12,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.1,
      })

      // Parallax — first name moves slower (appears closer)
      gsap.to(firstLineRef.current, {
        yPercent: -12,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Second name moves at different rate (depth separation)
      gsap.to(secondLineRef.current, {
        yPercent: -22,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-screen flex-col justify-end overflow-hidden"
      style={{ padding: '0 var(--margin-page) 64px' }}
    >
      {/* Three.js ambient scene */}
      <WebGLHero />

      {/* Content sits above canvas */}
      <div className="relative" style={{ zIndex: 10 }}>
        <h1
          ref={nameRef}
          className="font-display will-change-transform"
          style={{
            fontSize: 'var(--text-xl)',
            lineHeight: '0.88',
            color: 'var(--white)',
          }}
        >
          <span
            ref={firstLineRef}
            className="block will-change-transform"
            style={{
              // Subtle Z-depth via scale — first name feels "closer"
              transformStyle: 'preserve-3d',
            }}
          >
            SAJID
          </span>
          <span
            ref={secondLineRef}
            className="block will-change-transform"
            style={{ transformStyle: 'preserve-3d' }}
          >
            SHAIKH
          </span>
        </h1>

        {/* Role + scroll cue */}
        <div className="mt-8 flex items-end justify-between">
          <div className="overflow-hidden" style={{ height: '1.4em' }}>
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

          <div className="flex flex-col items-center gap-2">
            <span className="text-label" style={{ color: 'var(--muted)' }}>Scroll</span>
            <div
              className="h-12 w-px"
              style={{ background: 'linear-gradient(to bottom, var(--muted), transparent)' }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
