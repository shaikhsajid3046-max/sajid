'use client'

import { useEffect, useRef } from 'react'
import { gsap } from './gsapConfig'

export function useGsapContext(
  scopeRef: React.RefObject<Element | null>,
  cb: (context: gsap.Context) => void,
  deps: React.DependencyList = []
) {
  const cbRef = useRef(cb)
  cbRef.current = cb

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      cbRef.current(ctx)
    }, scopeRef)

    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
