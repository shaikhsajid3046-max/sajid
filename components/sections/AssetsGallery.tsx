'use client'

import Image from 'next/image'
import { useState, useEffect, useRef, useCallback } from 'react'
import { gsap, ScrollTrigger, registerGsapPlugins } from '@/lib/gsap/gsapConfig'
import { TiltCard } from '@/components/ui/TiltCard'

/* ─── Asset data ──────────────────────────────────── */

interface Asset {
  id: string
  title: string
  src: string
  software: Software
  format: string
}

type Software = 'photoshop' | 'illustrator' | 'premiere-pro' | 'after-effects'

const SOFTWARE_META: Record<Software, { label: string; color: string; icon: string }> = {
  photoshop:      { label: 'Photoshop',     color: '#31A8FF', icon: 'Ps' },
  illustrator:    { label: 'Illustrator',   color: '#FF9A00', icon: 'Ai' },
  'premiere-pro': { label: 'Premiere Pro',  color: '#9999FF', icon: 'Pr' },
  'after-effects':{ label: 'After Effects', color: '#CF96FD', icon: 'Ae' },
}

const ASSETS: Asset[] = [
  // Photoshop
  { id: 'ps-1', title: 'Aldenaire Coffee Shop Poster',      src: '/assets/photoshop/coffee-shop-poster.jpg', software: 'photoshop',   format: 'PSD' },
  { id: 'ps-2', title: 'Coffee Splash Render',       src: '/assets/photoshop/coffee-splash-render.jpg', software: 'photoshop',   format: 'PSD' },
  { id: 'ps-3', title: 'Jasmine Green Tea Banner',        src: '/assets/photoshop/jasmine-tea-banner.jpg', software: 'photoshop',   format: 'PSD' },
  { id: 'ps-4', title: 'World Wildlife Campaign Poster',       src: '/assets/photoshop/wildlife-campaign-poster.jpg', software: 'photoshop',   format: 'PSD' },
  { id: 'ps-5', title: 'Magical Gaze Poster',            src: '/assets/photoshop/magical-gaze-poster.jpg', software: 'photoshop',   format: 'PSD' },
  // Illustrator
  { id: 'ai-1', title: 'Second Rebranding Identity',         src: '/assets/illustrator/rebranding-identity.svg', software: 'illustrator', format: 'AI' },
  { id: 'ai-2', title: 'Tikkha Tales Brand Identity',            src: '/assets/illustrator/tikkha-tales-branding.jpg',    software: 'illustrator', format: 'AI' },
  // Premiere Pro
  { id: 'pr-1', title: 'Anime Reframing Video Reel',     src: '/assets/premiere-pro/anime-reframing-reel.mp4', software: 'premiere-pro', format: 'MP4' },
]

const FILTERS: { label: string; value: Software | 'all' }[] = [
  { label: 'All',           value: 'all' },
  { label: 'Photoshop',     value: 'photoshop' },
  { label: 'Illustrator',   value: 'illustrator' },
  { label: 'Premiere Pro',  value: 'premiere-pro' },
]

/* ─── Software badge icon ─────────────────────────── */

function SoftwareBadge({ software }: { software: Software }) {
  const meta = SOFTWARE_META[software]
  return (
    <span
      className="text-label inline-flex items-center gap-1.5 px-2.5 py-1"
      style={{
        backgroundColor: 'rgba(8,8,8,0.72)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        border: `1px solid ${meta.color}25`,
      }}
    >
      <span
        className="assets-software-icon"
        style={{
          backgroundColor: meta.color,
          color: '#000',
          fontWeight: 700,
          fontSize: '9px',
          width: '20px',
          height: '20px',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '3px',
          letterSpacing: 0,
          textTransform: 'none',
        }}
      >
        {meta.icon}
      </span>
      <span style={{ color: meta.color }}>{meta.label}</span>
    </span>
  )
}

/* ─── Lightbox Modal ──────────────────────────────── */

function Lightbox({
  asset,
  onClose,
  onPrev,
  onNext,
}: {
  asset: Asset
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const isVideo = asset.format === 'MP4'

  useEffect(() => {
    gsap.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: 'power2.out' }
    )
  }, [])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose, onPrev, onNext])

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const closeLightbox = () => {
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: onClose,
    })
  }

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 flex items-center justify-center"
      style={{
        zIndex: 500,
        backgroundColor: 'rgba(8,8,8,0.92)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
      onClick={closeLightbox}
      role="dialog"
      aria-modal="true"
      aria-label={asset.title}
    >
      {/* Close button */}
      <button
        onClick={closeLightbox}
        aria-label="Close lightbox"
        className="absolute top-6 right-6 text-label flex items-center gap-2 px-4 py-2 rounded-full transition-colors hover:bg-white/5"
        style={{ color: 'var(--white)', zIndex: 510 }}
      >
        <span>Close</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Prev/Next navigation */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev() }}
        aria-label="Previous asset"
        className="assets-nav-btn absolute left-4 md:left-8 top-1/2 -translate-y-1/2"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onNext() }}
        aria-label="Next asset"
        className="assets-nav-btn absolute right-4 md:right-8 top-1/2 -translate-y-1/2"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 6 15 12 9 18" />
        </svg>
      </button>

      {/* Content */}
      <div
        className="relative max-w-[90vw] max-h-[85vh] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {isVideo ? (
          <video
            src={asset.src}
            controls
            autoPlay
            className="max-w-full max-h-[75vh] object-contain"
            style={{ borderRadius: '2px' }}
          />
        ) : (
          <div className="relative max-w-full max-h-[75vh]" style={{ overflow: 'hidden' }}>
            <Image
              src={asset.src}
              alt={asset.title}
              width={1200}
              height={800}
              className="object-contain max-h-[75vh]"
              style={{ width: 'auto', height: 'auto', maxHeight: '75vh', maxWidth: '90vw' }}
              priority
            />
          </div>
        )}

        {/* Info bar */}
        <div className="mt-4 flex items-center gap-4 flex-wrap justify-center">
          <SoftwareBadge software={asset.software} />
          <h3 className="font-display" style={{ fontSize: 'clamp(16px, 2vw, 24px)', color: 'var(--white)' }}>
            {asset.title}
          </h3>
          <span className="text-label" style={{ color: 'var(--muted)' }}>
            {asset.format}
          </span>
        </div>
      </div>
    </div>
  )
}

/* ─── Main Gallery ────────────────────────────────── */

export function AssetsGallery() {
  const [active, setActive] = useState<Software | 'all'>('all')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  const filtered = active === 'all'
    ? ASSETS
    : ASSETS.filter((a) => a.software === active)

  const counts = {
    all: ASSETS.length,
    photoshop: ASSETS.filter((a) => a.software === 'photoshop').length,
    illustrator: ASSETS.filter((a) => a.software === 'illustrator').length,
    'premiere-pro': ASSETS.filter((a) => a.software === 'premiere-pro').length,
  }

  // Animate cards on filter change
  useEffect(() => {
    registerGsapPlugins()
    if (!gridRef.current) return

    const cards = gridRef.current.querySelectorAll('.asset-card')
    if (!cards.length) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    gsap.fromTo(
      cards,
      { opacity: 0, y: 40, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.08,
        duration: 0.6,
        ease: 'power3.out',
      }
    )
  }, [active])

  // Scroll-triggered entrance on first load
  useEffect(() => {
    registerGsapPlugins()
    if (!gridRef.current) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const cards = gridRef.current.querySelectorAll('.asset-card')
    cards.forEach((card, i) => {
      gsap.from(card, {
        opacity: 0,
        y: 60,
        duration: 0.9,
        delay: (i % 3) * 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 92%',
          once: true,
        },
      })
    })

    return () => ScrollTrigger.getAll().forEach((t) => t.kill())
  }, [])

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index)
  }, [])

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null)
  }, [])

  const goToNext = useCallback(() => {
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % filtered.length : null))
  }, [filtered.length])

  const goToPrev = useCallback(() => {
    setLightboxIndex((prev) => (prev !== null ? (prev - 1 + filtered.length) % filtered.length : null))
  }, [filtered.length])

  return (
    <>
      {/* Filter bar */}
      <div className="flex items-center justify-between flex-wrap gap-4 mb-12">
        <div
          className="flex gap-1 overflow-x-auto pb-1 no-scrollbar"
          role="tablist"
          aria-label="Filter assets by software"
        >
          {FILTERS.map(({ label, value }) => {
            const isActive = active === value
            const softwareColor = value !== 'all' ? SOFTWARE_META[value].color : 'var(--accent)'

            return (
              <button
                key={value}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(value)}
                data-active={isActive}
                className="filter-underline text-label whitespace-nowrap px-4 py-2 transition-colors duration-200"
                style={{
                  color: isActive ? softwareColor : 'var(--muted)',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  '--filter-accent': softwareColor,
                } as React.CSSProperties}
              >
                {label}
                <span className="ml-1" style={{ opacity: 0.5, fontSize: '10px' }}>
                  ({counts[value as keyof typeof counts] ?? 0})
                </span>
              </button>
            )
          })}
        </div>

        {/* Results count */}
        <span className="text-label" style={{ color: 'var(--muted)' }}>
          {filtered.length} {filtered.length === 1 ? 'asset' : 'assets'}
        </span>
      </div>

      {/* Grid */}
      <div ref={gridRef} className="assets-grid">
        {filtered.map((asset, i) => {
          const isVideo = asset.format === 'MP4'
          const meta = SOFTWARE_META[asset.software]

          return (
            <div key={asset.id} className="asset-card">
              <TiltCard maxDeg={5}>
                <button
                  onClick={() => openLightbox(i)}
                  className="block w-full text-left group"
                  aria-label={`View ${asset.title}`}
                  data-cursor-view="true"
                >
                  {/* Image / Video container */}
                  <div className="asset-card__media relative overflow-hidden">
                    {isVideo ? (
                      <video
                        src={asset.src}
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover"
                        onMouseEnter={(e) => (e.target as HTMLVideoElement).play()}
                        onMouseLeave={(e) => {
                          const v = e.target as HTMLVideoElement
                          v.pause()
                          v.currentTime = 0
                        }}
                      />
                    ) : (
                      <Image
                        src={asset.src}
                        alt={asset.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                      />
                    )}

                    {/* Software badge — top left */}
                    <div className="absolute top-3 left-3" style={{ zIndex: 2 }}>
                      <SoftwareBadge software={asset.software} />
                    </div>

                    {/* Format badge — top right */}
                    <div className="absolute top-3 right-3" style={{ zIndex: 2 }}>
                      <span
                        className="text-label px-2 py-1"
                        style={{
                          backgroundColor: 'rgba(8,8,8,0.6)',
                          backdropFilter: 'blur(4px)',
                          color: 'rgba(240,237,232,0.5)',
                        }}
                      >
                        .{asset.format.toLowerCase()}
                      </span>
                    </div>

                    {/* Gradient overlay for hover */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center"
                      style={{
                        background: 'radial-gradient(circle, rgba(8,8,8,0.3) 0%, rgba(8,8,8,0.6) 100%)',
                        zIndex: 1,
                      }}
                    >
                      <span
                        className="text-label px-4 py-2 rounded-full transition-transform duration-500 translate-y-2 group-hover:translate-y-0"
                        style={{
                          border: '1px solid rgba(240,237,232,0.2)',
                          color: 'var(--white)',
                          backgroundColor: 'rgba(8,8,8,0.5)',
                          backdropFilter: 'blur(8px)',
                        }}
                      >
                        {isVideo ? '▶ Play' : 'View'}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <div className="mt-3 flex items-start justify-between">
                    <h3
                      className="font-display flex items-center gap-2 transition-colors duration-300 group-hover:text-[var(--accent)]"
                      style={{
                        fontSize: 'clamp(15px, 1.8vw, 22px)',
                        color: 'var(--white)',
                      }}
                    >
                      {asset.title}
                      <span className="arrow-slide-icon">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="7" y1="17" x2="17" y2="7" />
                          <polyline points="7 7 17 7 17 17" />
                        </svg>
                      </span>
                    </h3>
                  </div>
                </button>
              </TiltCard>
            </div>
          )
        })}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24" style={{ color: 'var(--muted)' }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
          <p className="text-body-sm mt-4">No assets found in this category.</p>
        </div>
      )}

      {/* Lightbox */}
      {lightboxIndex !== null && filtered[lightboxIndex] && (
        <Lightbox
          asset={filtered[lightboxIndex]}
          onClose={closeLightbox}
          onPrev={goToPrev}
          onNext={goToNext}
        />
      )}
    </>
  )
}
