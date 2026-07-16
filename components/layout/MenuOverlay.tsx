'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { gsap, registerGsapPlugins } from '@/lib/gsap/gsapConfig'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/work', label: 'Work' },
  { href: '/contact', label: 'Contact' },
]

interface SocialUrls {
  instagramUrl?: string
  behanceUrl?: string
  linkedinUrl?: string
}

interface MenuOverlayProps {
  open: boolean
  onClose: () => void
  socialUrls?: SocialUrls
}

export function MenuOverlay({ open, onClose, socialUrls }: MenuOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    registerGsapPlugins()
  }, [])

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (open) {
      gsap.set(overlayRef.current, { display: 'flex' })
      if (prefersReduced) {
        gsap.set(overlayRef.current, { opacity: 1 })
      } else {
        gsap.fromTo(
          overlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.4, ease: 'power2.out' }
        )
        const items = linksRef.current?.querySelectorAll('li')
        if (items?.length) {
          gsap.fromTo(
            items,
            { yPercent: 100, opacity: 0 },
            { yPercent: 0, opacity: 1, stagger: 0.07, duration: 0.6, ease: 'power3.out', delay: 0.1 }
          )
        }
      }
    } else {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => gsap.set(overlayRef.current, { display: 'none' }),
      })
    }
  }, [open])

  const socials = [
    { label: 'Instagram', url: socialUrls?.instagramUrl ?? 'https://instagram.com' },
    { label: 'Behance', url: socialUrls?.behanceUrl ?? 'https://behance.net' },
    { label: 'LinkedIn', url: socialUrls?.linkedinUrl ?? 'https://linkedin.com' },
  ]

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] hidden flex-col justify-between px-[var(--margin-page)] py-8"
      style={{ backgroundColor: 'var(--surface)' }}
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
    >
      {/* Close */}
      <div className="flex justify-end">
        <button
          onClick={onClose}
          aria-label="Close menu"
          className="text-label flex items-center justify-center gap-2 h-11 px-4 rounded-full transition-colors hover:bg-white/5 active:bg-white/10"
          style={{ color: 'var(--white)' }}
        >
          <span>Close</span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Links */}
      <ul ref={linksRef} className="flex flex-col gap-4 overflow-hidden">
        {NAV_LINKS.map(({ href, label }) => (
          <li key={href} style={{ overflow: 'hidden' }}>
            <Link
              href={href}
              onClick={onClose}
              className="text-display-lg block font-display leading-none"
              style={{ color: 'var(--white)' }}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Social */}
      <div className="flex gap-6">
        {socials.map(({ label, url }) => (
          <a
            key={label}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-label swap-btn"
            style={{ color: 'var(--muted)' }}
          >
            <span className="swap-btn__text">{label}</span>
            <span className="swap-btn__clone" aria-hidden="true">{label}</span>
          </a>
        ))}
      </div>
    </div>
  )
}
