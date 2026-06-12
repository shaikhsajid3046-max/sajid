'use client'

import { useEffect, useRef, useState } from 'react'
import { SplitText } from '@/components/ui/SplitText'
import { Magnetic } from '@/components/ui/Magnetic'

const CYCLE_WORDS = ['great', 'real', 'different', 'yours']

interface FooterCTAProps {
  email: string
}

export function FooterCTA({ email }: FooterCTAProps) {
  const [wordIndex, setWordIndex] = useState(0)
  const [key, setKey] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setKey((k) => k + 1)
      setWordIndex((i) => (i + 1) % CYCLE_WORDS.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      className="section-spacing pb-16"
      style={{ padding: 'var(--space-section) var(--margin-page) 64px' }}
    >
      {/* Headline */}
      <h2
        className="font-display mb-10"
        style={{ fontSize: 'clamp(40px, 6vw, 100px)', lineHeight: '1.0', color: 'var(--white)' }}
      >
        Let&apos;s make something{' '}
        <span className="cycle-word overflow-hidden inline-block">
          <span
            key={key}
            className="inline-block"
            style={{
              color: 'var(--accent)',
              animation: 'cycleIn 0.5s cubic-bezier(0.16,1,0.3,1) forwards',
            }}
          >
            {CYCLE_WORDS[wordIndex]}
          </span>
        </span>
      </h2>

      {/* Email */}
      <Magnetic strength={0.2}>
        <a
          href={`mailto:${email}`}
          className="text-body-xl transition-colors duration-300 hover:opacity-70"
          style={{ color: 'var(--white)', textDecoration: 'underline', textUnderlineOffset: '6px' }}
          data-cursor="Mail"
        >
          {email}
        </a>
      </Magnetic>
    </section>
  )
}
