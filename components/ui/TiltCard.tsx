'use client'

import { useRef, ReactNode, useEffect } from 'react'
import { gsap } from '@/lib/gsap/gsapConfig'

interface TiltCardProps {
  children: ReactNode
  className?: string
  maxDeg?: number
  style?: React.CSSProperties
}

export function TiltCard({ children, className = '', maxDeg = 7, style }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const enabled = useRef(false)

  useEffect(() => {
    enabled.current =
      !window.matchMedia('(hover: none)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enabled.current || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    gsap.to(ref.current, {
      rotateX: (y - 0.5) * -maxDeg,
      rotateY: (x - 0.5) * maxDeg,
      transformPerspective: 1000,
      ease: 'power1.out',
      duration: 0.35,
      overwrite: true,
    })
  }

  const onLeave = () => {
    if (!enabled.current || !ref.current) return
    gsap.to(ref.current, {
      rotateX: 0,
      rotateY: 0,
      ease: 'elastic.out(1, 0.5)',
      duration: 1.0,
      overwrite: true,
    })
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{ ...style, transformStyle: 'preserve-3d', willChange: 'transform' }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  )
}
