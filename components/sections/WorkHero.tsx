'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { gsap, registerGsapPlugins } from '@/lib/gsap/gsapConfig'
import { SplitText } from '@/components/ui/SplitText'
import type { Project } from '@/types/project'

interface WorkHeroProps {
  projectCount: number
  featuredReel?: Project | null
}

export function WorkHero({ projectCount, featuredReel }: WorkHeroProps) {
  const containerRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)

  const togglePlay = () => {
    if (!videoRef.current) return
    if (isPlaying) {
      videoRef.current.pause()
      setIsPlaying(false)
    } else {
      videoRef.current.play()
      setIsPlaying(true)
    }
  }

  const toggleMute = () => {
    if (!videoRef.current) return
    videoRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  useEffect(() => {
    registerGsapPlugins()
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !containerRef.current) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from('.work-hero-badge', {
        opacity: 0,
        y: 20,
        duration: 0.7,
        delay: 0.1,
      })
        .from(
          '.work-hero-video-card',
          {
            opacity: 0,
            y: 40,
            scale: 0.98,
            duration: 1.0,
            ease: 'power3.out',
          },
          '-=0.4'
        )
        .from(
          '.work-hero-scroll-cue',
          {
            opacity: 0,
            y: 16,
            duration: 0.6,
          },
          '-=0.3'
        )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative flex flex-col justify-between"
      style={{
        padding: 'calc(var(--nav-height) + 40px) var(--margin-page) 32px',
        minHeight: '85vh',
      }}
    >
      {/* Top Header Row */}
      <div className="work-hero-badge flex items-end justify-between flex-wrap gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="dot-icon" />
            <span className="section-label">Selected Portfolio</span>
          </div>
          <SplitText as="h1" className="text-display-lg font-display">
            Works
          </SplitText>
        </div>

        <div className="flex items-center gap-4 mb-2">
          <span className="project-count-badge">
            <span className="dot-icon dot-icon--sm" />
            {projectCount} {projectCount === 1 ? 'Project' : 'Projects'}
          </span>
        </div>
      </div>

      {/* Featured Anime Reframing Reel Card */}
      {featuredReel && (
        <div className="work-hero-video-card relative w-full overflow-hidden group rounded-sm" style={{ border: '1px solid var(--border)' }}>
          {/* 16:9 Video Container */}
          <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16/9', maxHeight: '68vh', backgroundColor: 'var(--surface)' }}>
            <video
              ref={videoRef}
              src={featuredReel.heroVideoUrl || featuredReel.coverImageUrl}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              aria-label={`${featuredReel.title} video showcase`}
            />

            {/* Gradient Overlays for readable typography */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(180deg, rgba(8,8,8,0.4) 0%, transparent 35%, rgba(8,8,8,0.3) 65%, rgba(8,8,8,0.92) 100%)',
              }}
            />

            {/* Top Bar Badges */}
            <div className="absolute top-5 left-5 right-5 flex items-center justify-between pointer-events-none z-10">
              <div className="flex items-center gap-2 pointer-events-auto">
                <span
                  className="text-label inline-flex items-center gap-1.5 px-2.5 py-1"
                  style={{
                    backgroundColor: 'rgba(8,8,8,0.7)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(153,153,255,0.4)',
                    color: '#9999FF',
                  }}
                >
                  <span
                    style={{
                      backgroundColor: '#9999FF',
                      color: '#000',
                      fontWeight: 700,
                      fontSize: '9px',
                      width: '18px',
                      height: '18px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '3px',
                      textTransform: 'none',
                    }}
                  >
                    Pr
                  </span>
                  <span>Premiere Pro</span>
                </span>

                <span
                  className="text-label px-2.5 py-1 hidden sm:inline-block"
                  style={{
                    backgroundColor: 'rgba(8,8,8,0.6)',
                    backdropFilter: 'blur(6px)',
                    border: '1px solid rgba(240,237,232,0.15)',
                    color: 'var(--accent)',
                  }}
                >
                  Featured Reel
                </span>
              </div>

              {/* Interactive Video Controls (Sound + Play/Pause) */}
              <div className="flex items-center gap-2 pointer-events-auto">
                <button
                  onClick={toggleMute}
                  aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                  className="flex items-center justify-center w-10 h-10 rounded-full transition-colors hover:bg-white/10 active:bg-white/20"
                  style={{
                    backgroundColor: 'rgba(8,8,8,0.6)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(240,237,232,0.2)',
                    color: 'var(--white)',
                  }}
                >
                  {isMuted ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <line x1="23" y1="9" x2="17" y2="15" />
                      <line x1="17" y1="9" x2="23" y2="15" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                    </svg>
                  )}
                </button>

                <button
                  onClick={togglePlay}
                  aria-label={isPlaying ? 'Pause video' : 'Play video'}
                  className="flex items-center justify-center w-10 h-10 rounded-full transition-colors hover:bg-white/10 active:bg-white/20"
                  style={{
                    backgroundColor: 'rgba(8,8,8,0.6)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(240,237,232,0.2)',
                    color: 'var(--white)',
                  }}
                >
                  {isPlaying ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="6" y="4" width="4" height="16" />
                      <rect x="14" y="4" width="4" height="16" />
                    </svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Bottom Content / Info Bar */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 flex flex-col md:flex-row md:items-end justify-between gap-4 z-10">
              <div className="max-w-xl">
                <span className="text-label block mb-1 text-[var(--accent)]">
                  Video Editing &amp; Pacing
                </span>
                <h2
                  className="font-display leading-tight"
                  style={{
                    fontSize: 'clamp(24px, 3.2vw, 44px)',
                    color: 'var(--white)',
                  }}
                >
                  {featuredReel.title}
                </h2>
                <p className="text-body-sm mt-2 line-clamp-2" style={{ color: 'rgba(240,237,232,0.7)' }}>
                  {featuredReel.overview}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <Link
                  href={`/work/${featuredReel.slug.current}`}
                  className="text-label inline-flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-300 hover:scale-105 active:scale-95"
                  style={{
                    backgroundColor: 'var(--white)',
                    color: 'var(--black)',
                    fontWeight: 600,
                  }}
                >
                  <span>View Project</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scroll Down Indicator */}
      <div className="work-hero-scroll-cue mt-10 flex items-center justify-between border-t border-[var(--border)] pt-6">
        <span className="text-label" style={{ color: 'var(--muted)' }}>
          Scroll through for full archive ↓
        </span>
        <div className="flex items-center gap-2">
          <span className="text-label" style={{ color: 'var(--muted)' }}>
            Photoshop &bull; Illustrator &bull; Premiere Pro &bull; After Effects
          </span>
        </div>
      </div>
    </section>
  )
}
