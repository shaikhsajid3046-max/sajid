'use client'

import { useRef, useEffect, ReactNode, Children, isValidElement } from 'react'
import { gsap, ScrollTrigger, registerGsapPlugins } from '@/lib/gsap/gsapConfig'

interface SplitTextProps {
  children: ReactNode
  as?: keyof JSX.IntrinsicElements
  className?: string
  style?: React.CSSProperties
  delay?: number
  once?: boolean
}

/** Recursively extracts plain text from React children to avoid child-node tracking conflicts */
function getTextFromChildren(children: ReactNode): string {
  let text = ''
  Children.forEach(children, (child) => {
    if (typeof child === 'string' || typeof child === 'number') {
      text += child
    } else if (isValidElement(child) && child.props && 'children' in child.props) {
      text += getTextFromChildren(child.props.children as ReactNode)
    }
  })
  return text
}

export function SplitText({
  children,
  as: Tag = 'div',
  className = '',
  style,
  delay = 0,
  once = true,
}: SplitTextProps) {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    registerGsapPlugins()

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !containerRef.current) return

    const el = containerRef.current

    // Measure natural layout to find line breaks
    const originalHTML = el.innerHTML
    const text = el.innerText
    const words = text.split(/\s+/).filter(Boolean)

    // Wrap each word in a span
    el.innerHTML = words
      .map((w) => `<span class="split-word" style="display:inline-block;white-space:nowrap">${w}&nbsp;</span>`)
      .join('')

    const wordEls = Array.from(el.querySelectorAll<HTMLElement>('.split-word'))

    // Group words into lines by their top offset
    const lines: HTMLElement[][] = []
    let currentLineTop = -1
    let currentLine: HTMLElement[] = []

    wordEls.forEach((word) => {
      const top = word.getBoundingClientRect().top
      if (top !== currentLineTop) {
        if (currentLine.length) lines.push(currentLine)
        currentLine = [word]
        currentLineTop = top
      } else {
        currentLine.push(word)
      }
    })
    if (currentLine.length) lines.push(currentLine)

    // Wrap each line in an overflow:hidden parent
    lines.forEach((lineWords) => {
      const wrapper = document.createElement('div')
      wrapper.style.overflow = 'hidden'
      wrapper.style.display = 'block'
      lineWords[0].parentNode?.insertBefore(wrapper, lineWords[0])
      lineWords.forEach((w) => wrapper.appendChild(w))
    })

    const lineEls = el.querySelectorAll<HTMLElement>('div[style*="overflow: hidden"]')

    const anim = gsap.from(lineEls, {
      yPercent: 110,
      opacity: 0,
      stagger: 0.08,
      duration: 0.8,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once,
      },
    })

    return () => {
      anim.kill()
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill()
      })
      el.innerHTML = originalHTML
    }
  }, [delay, once])

  const textContent = getTextFromChildren(children)
  const CustomTag = Tag as any

  return (
    <CustomTag
      ref={containerRef}
      className={className}
      style={style}
      dangerouslySetInnerHTML={{ __html: textContent }}
    />
  )
}
