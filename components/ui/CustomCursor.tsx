'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap/gsapConfig'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [label, setLabel] = useState('')
  const [enlarged, setEnlarged] = useState(false)
  const [viewMode, setViewMode] = useState(false)

  useEffect(() => {
    const isTouch = window.matchMedia('(hover: none)').matches
    if (isTouch) return

    const cursor = { x: -100, y: -100 }
    const ring = { x: -100, y: -100 }
    let rafId: number

    const onMouseMove = (e: MouseEvent) => {
      cursor.x = e.clientX
      cursor.y = e.clientY
      gsap.to(dotRef.current, { x: cursor.x, y: cursor.y, duration: 0.08, overwrite: true })
    }

    const tick = () => {
      ring.x += (cursor.x - ring.x) * 0.12
      ring.y += (cursor.y - ring.y) * 0.12
      gsap.set(ringRef.current, { x: ring.x, y: ring.y })
      rafId = requestAnimationFrame(tick)
    }

    const onMouseEnterLink = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLElement
      const cursorLabel = target.dataset.cursor ?? ''
      const isProjectPreview = target.dataset.cursorView === 'true'

      setLabel(cursorLabel)
      setViewMode(isProjectPreview)
      setEnlarged(true)

      gsap.to(ringRef.current, {
        scale: isProjectPreview ? 3 : 1.6,
        duration: 0.35,
        ease: 'power2.out',
        overwrite: true,
      })
    }

    const onMouseLeaveLink = () => {
      setLabel('')
      setViewMode(false)
      setEnlarged(false)
      gsap.to(ringRef.current, {
        scale: 1,
        duration: 0.35,
        ease: 'power2.out',
        overwrite: true,
      })
    }

    window.addEventListener('mousemove', onMouseMove)
    rafId = requestAnimationFrame(tick)

    const interactiveSelector = 'a, button, [data-cursor]'
    const elements = document.querySelectorAll<HTMLElement>(interactiveSelector)
    elements.forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnterLink)
      el.addEventListener('mouseleave', onMouseLeaveLink)
    })

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(rafId)
      elements.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterLink)
        el.removeEventListener('mouseleave', onMouseLeaveLink)
      })
    }
  }, [])

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[300] h-[6px] w-[6px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white will-change-transform"
        style={{ backgroundColor: 'var(--white)' }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[300] flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full will-change-transform"
        style={{ border: '1px solid rgba(240,237,232,0.35)' }}
      >
        {viewMode && (
          <span
            className="text-[9px] font-medium tracking-widest"
            style={{ color: 'var(--white)', textTransform: 'uppercase' }}
          >
            View
          </span>
        )}
        {!viewMode && label && (
          <span
            className="text-[9px] font-medium tracking-widest"
            style={{ color: 'var(--white)', textTransform: 'uppercase' }}
          >
            {label}
          </span>
        )}
      </div>
    </>
  )
}
