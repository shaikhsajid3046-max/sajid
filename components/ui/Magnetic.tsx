'use client'

import { useRef, useEffect, ReactNode } from 'react'
import { gsap } from '@/lib/gsap/gsapConfig'

interface MagneticProps {
  children: ReactNode
  strength?: number
}

export function Magnetic({ children, strength = 0.3 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const isTouch = window.matchMedia('(hover: none)').matches
    if (isTouch || !ref.current) return

    const el = ref.current

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) * strength
      const dy = (e.clientY - cy) * strength
      gsap.to(el, { x: dx, y: dy, duration: 0.4, ease: 'power1.out' })
    }

    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' })
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)

    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [strength])

  return <div ref={ref}>{children}</div>
}
