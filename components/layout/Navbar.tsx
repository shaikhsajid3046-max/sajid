'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { MenuOverlay } from './MenuOverlay'

export function Navbar() {
  const navRef = useRef<HTMLElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between transition-all duration-500 ${scrolled ? 'nav-scrolled' : ''}`}
        style={{ height: 'var(--nav-height)', padding: '0 var(--margin-page)' }}
      >
        {/* Logo */}
        <Link href="/" className="text-label" style={{ color: 'var(--white)' }}>
          Sajid Shaikh
        </Link>

        {/* Right nav */}
        <div className="flex items-center gap-8">
          <Link href="/work" className="swap-btn text-label hidden md:block relative">
            <span className="swap-btn__text">Work</span>
            <span className="swap-btn__clone" aria-hidden="true">Work</span>
            {isActive('/work') && <span className="nav-active-dot" />}
          </Link>

          {/* CTA */}
          <Link
            href="/contact"
            className="swap-btn text-label hidden md:flex items-center rounded-full px-5 py-2 relative"
            style={{ border: '1px solid var(--border)' }}
          >
            <span className="swap-btn__text">
              Let&apos;s Talk
              <svg
                className="inline-block ml-1.5"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
            <span className="swap-btn__clone" aria-hidden="true">
              Let&apos;s Talk
              <svg
                className="inline-block ml-1.5"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
            {isActive('/contact') && <span className="nav-active-dot" />}
          </Link>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="flex flex-col justify-center items-center gap-[5px] w-11 h-11 rounded-full transition-colors hover:bg-white/5 active:bg-white/10 ml-2"
          >
            <span className="block h-px w-6" style={{ background: 'var(--white)' }} />
            <span className="block h-px w-6" style={{ background: 'var(--white)' }} />
          </button>
        </div>
      </nav>

      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
