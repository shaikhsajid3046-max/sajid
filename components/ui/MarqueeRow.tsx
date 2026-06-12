import { ReactNode } from 'react'

interface MarqueeRowProps {
  children: ReactNode
  className?: string
  speed?: number
}

export function MarqueeRow({ children, className = '', speed = 20 }: MarqueeRowProps) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        className="marquee-track"
        style={{ animationDuration: `${speed}s` }}
        aria-hidden="true"
      >
        {/* Duplicate for seamless loop */}
        {children}
        {children}
      </div>
    </div>
  )
}
