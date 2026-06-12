'use client'

import { useEffect, createContext, useContext, useRef } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, registerGsapPlugins } from '@/lib/gsap/gsapConfig'

const LenisContext = createContext<{ lenis: Lenis | null }>({ lenis: null })

export function useLenis() {
  return useContext(LenisContext)
}

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    registerGsapPlugins()

    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    lenisRef.current = lenis

    const rafCallback = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(rafCallback)
    lenis.on('scroll', ScrollTrigger.update)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(rafCallback)
      lenisRef.current = null
    }
  }, [])

  return (
    <LenisContext.Provider value={{ lenis: lenisRef.current }}>
      {children}
    </LenisContext.Provider>
  )
}
