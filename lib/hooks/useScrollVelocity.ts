'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

export function useScrollVelocity(
  lenis: Lenis | null,
  onVelocity: (velocity: number) => void
) {
  const cbRef = useRef(onVelocity)
  cbRef.current = onVelocity

  useEffect(() => {
    if (!lenis) return
    const handler = ({ velocity }: { velocity: number }) => cbRef.current(velocity)
    lenis.on('scroll', handler)
    return () => lenis.off('scroll', handler)
  }, [lenis])
}
