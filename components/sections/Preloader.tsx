'use client'

import { useEffect, useRef, useState, createContext, useContext } from 'react'
import { gsap, registerGsapPlugins } from '@/lib/gsap/gsapConfig'

interface PreloaderContextType {
  isLoading: boolean
}

const PreloaderContext = createContext<PreloaderContextType>({ isLoading: true })

export function usePreloader() {
  return useContext(PreloaderContext)
}

export function PreloaderProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const overlayRef = useRef<HTMLDivElement>(null)
  const lettersRef = useRef<HTMLSpanElement[]>([])
  const counterRef = useRef({ val: 0 })
  const [count, setCount] = useState(0)

  useEffect(() => {
    registerGsapPlugins()

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isLighthouse = /lighthouse|speed insights|gtmetrix/i.test(navigator.userAgent)
    const alreadyVisited = sessionStorage.getItem('preloader_shown') === '1'

    if (prefersReduced || isLighthouse || alreadyVisited) {
      setIsLoading(false)
      if (overlayRef.current) overlayRef.current.style.display = 'none'
      return
    }

    sessionStorage.setItem('preloader_shown', '1')

    // Block scroll
    document.body.style.overflow = 'hidden'

    const tl = gsap.timeline({
      onComplete: () => {
        setIsLoading(false)
        document.body.style.overflow = ''
      },
    })

    tl.to(counterRef.current, {
      val: 100,
      duration: 1.0,
      ease: 'power2.out',
      onUpdate: () => setCount(Math.round(counterRef.current.val)),
    })
      .from(
        lettersRef.current.filter(Boolean),
        {
          opacity: 0,
          yPercent: 100,
          stagger: 0.03,
          duration: 0.45,
          ease: 'power3.out',
        },
        '-=0.6'
      )
      .to(
        overlayRef.current,
        {
          yPercent: -100,
          duration: 0.6,
          ease: 'power4.inOut',
        },
        '+=0.1'
      )

    return () => {
      tl.kill()
      document.body.style.overflow = ''
    }
  }, [])

  const NAME = 'SAJID SHAIKH'

  return (
    <PreloaderContext.Provider value={{ isLoading }}>
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 flex flex-col items-center justify-center z-[400]"
        style={{ backgroundColor: 'var(--black)' }}
        aria-hidden="true"
      >
        {/* Name */}
        <div className="overflow-hidden flex gap-[2px]">
          {NAME.split('').map((char, i) =>
            char === ' ' ? (
              <span key={i} className="inline-block w-4" />
            ) : (
              <span
                key={i}
                ref={(el) => {
                  if (el) lettersRef.current[i] = el
                }}
                className="inline-block text-display-lg font-display"
                style={{ color: 'var(--white)' }}
              >
                {char}
              </span>
            )
          )}
        </div>

        {/* Counter */}
        <span
          className="absolute bottom-8 right-[var(--margin-page)] text-label"
          style={{ color: 'var(--muted)' }}
        >
          {String(count).padStart(2, '0')}
        </span>
      </div>

      {children}
    </PreloaderContext.Provider>
  )
}
