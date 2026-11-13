'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { gsap, registerGsapPlugins } from '@/lib/gsap/gsapConfig'
import type { Project } from '@/types/project'

interface WorkHeroProps {
  projectCount: number
  featuredReel?: Project | null
}

export function WorkHero({ projectCount, featuredReel }: WorkHeroProps) {
  const heroRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const infoBarRef = useRef<HTMLDivElement>(null)

  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isPortrait, setIsPortrait] = useState(false)

  // Detect orientation for adaptive vertical / landscape video
  useEffect(() => {
    const handleResize = () => {
      const portrait = window.innerWidth < 768 && window.innerHeight > window.innerWidth
      setIsPortrait(portrait)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Fullscreen change listener
  useEffect(() => {
    const onFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement))
    }
    document.addEventListener('fullscreenchange', onFsChange)
    return () => document.removeEventListener('fullscreenchange', onFsChange)
  }, [])

  // Video playback controls
  const togglePlay = useCallback(() => {
    if (!videoRef.current) return
    if (isPlaying) {
      videoRef.current.pause()
      setIsPlaying(false)
    } else {
      videoRef.current.play()
      setIsPlaying(true)
    }
  }, [isPlaying])

  const toggleMute = useCallback(() => {
    if (!videoRef.current) return
    videoRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }, [isMuted])

  const toggleFullscreen = useCallback(() => {
    if (!videoRef.current) return
    if (!document.fullscreenElement) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
  }, [])

  const scrollToOverview = useCallback(() => {
    if (infoBarRef.current) {
      infoBarRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  // GSAP entrance for controls and info
  useEffect(() => {
    registerGsapPlugins()
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !heroRef.current) return

    const ctx = gsap.context(() => {
      gsap.from('.hero-video-controls', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.3,
        ease: 'power3.out',
      })
      gsap.from('.hero-scroll-prompt', {
        opacity: 0,
        y: 15,
        duration: 0.8,
        delay: 0.5,
        ease: 'power3.out',
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  const landscapeVideoSrc = '/assets/premiere-pro/anime-reel-landscape.mp4'
  const portraitVideoSrc = '/assets/premiere-pro/anime-reframing-reel.mp4'
  const landscapePoster = '/assets/premiere-pro/anime-reel-landscape-poster.jpg'
  const portraitPoster = '/assets/premiere-pro/anime-reel-poster.jpg'

  const activeVideoSrc = isPortrait ? portraitVideoSrc : landscapeVideoSrc
  const activePoster = isPortrait ? portraitPoster : landscapePoster

  return (
    <>
      {/* ── 1. Full Screen Cinematic Hero (100vw x 100vh) — Pure video, ZERO text overlap ── */}
      <section
        ref={heroRef}
        className="relative w-full h-[100dvh] min-h-[560px] overflow-hidden bg-black flex flex-col justify-between"
        aria-label="Featured Anime Reel showcase"
      >
        {/* Fullscreen Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <video
            ref={videoRef}
            key={activeVideoSrc}
            src={activeVideoSrc}
            poster={activePoster}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-cover select-none pointer-events-auto"
            aria-label="Featured Anime Reel video"
            onClick={togglePlay}
          />
        </div>

        {/* Minimal top status badge — positioned below navbar */}
        <div className="relative z-20 flex items-center justify-between px-6 md:px-12 pt-[calc(var(--nav-height)+16px)] pointer-events-none">
          <div className="flex items-center gap-2 pointer-events-auto">
            <span
              className="text-label inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] sm:text-xs"
              style={{
                backgroundColor: 'rgba(8,8,8,0.65)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: 'var(--white)',
              }}
            >
              <span className="dot-icon" />
              <span>Featured Anime Reel</span>
              <span style={{ opacity: 0.4 }}>•</span>
              <span style={{ color: '#9999FF', fontWeight: 600 }}>Landscape Full Screen</span>
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 pointer-events-auto">
            <span
              className="text-label px-3 py-1.5 rounded-full text-[10px] sm:text-xs"
              style={{
                backgroundColor: 'rgba(8,8,8,0.65)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: 'var(--muted)',
              }}
            >
              Click video to play / pause
            </span>
          </div>
        </div>

        {/* Floating Interactive Controls (Mute, Play/Pause, Fullscreen) — Bottom Right */}
        <div className="hero-video-controls absolute bottom-8 right-6 sm:bottom-10 sm:right-12 z-20 flex items-center gap-2.5">
          {/* Mute / Unmute Button */}
          <button
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
            className="flex items-center gap-2 px-3.5 h-11 rounded-full text-xs font-medium transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
            style={{
              backgroundColor: 'rgba(8,8,8,0.7)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
              border: '1px solid rgba(255,255,255,0.18)',
              color: 'var(--white)',
            }}
          >
            {isMuted ? (
              <>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </svg>
                <span className="hidden sm:inline text-[11px] uppercase tracking-wider">Unmute</span>
              </>
            ) : (
              <>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--accent)]">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                </svg>
                <span className="hidden sm:inline text-[11px] uppercase tracking-wider text-[var(--accent)]">Sound On</span>
              </>
            )}
          </button>

          {/* Play / Pause Button */}
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
            className="flex items-center justify-center w-11 h-11 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
            style={{
              backgroundColor: 'rgba(8,8,8,0.7)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
              border: '1px solid rgba(255,255,255,0.18)',
              color: 'var(--white)',
            }}
          >
            {isPlaying ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="translate-x-[1px]">
                <polygon points="5 3 19 12 5 21" />
              </svg>
            )}
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? 'Exit fullscreen' : 'View fullscreen'}
            className="hidden sm:flex items-center justify-center w-11 h-11 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
            style={{
              backgroundColor: 'rgba(8,8,8,0.7)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
              border: '1px solid rgba(255,255,255,0.18)',
              color: 'var(--white)',
            }}
          >
            {isFullscreen ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="4 14 10 14 10 20" />
                <polyline points="20 10 14 10 14 4" />
                <line x1="14" y1="10" x2="21" y2="3" />
                <line x1="3" y1="21" x2="10" y2="14" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 3 21 3 21 9" />
                <polyline points="9 21 3 21 3 15" />
                <line x1="21" y1="3" x2="14" y2="10" />
                <line x1="3" y1="21" x2="10" y2="14" />
              </svg>
            )}
          </button>
        </div>

        {/* Scroll Cue Prompt — Bottom Center */}
        <div className="hero-scroll-prompt relative z-20 pb-8 flex flex-col items-center justify-center pointer-events-none">
          <button
            onClick={scrollToOverview}
            aria-label="Scroll to portfolio overview"
            className="pointer-events-auto group flex flex-col items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              backgroundColor: 'rgba(8,8,8,0.5)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <span className="text-label text-[10px] tracking-[0.2em] uppercase text-white/80 group-hover:text-white transition-colors">
              Scroll for details &amp; archive &darr;
            </span>
          </button>
        </div>
      </section>

      {/* ── 2. Dedicated Info Section Directly Below the Video (Zero overlap on video) ── */}
      {featuredReel && (
        <section
          ref={infoBarRef}
          id="work-overview"
          className="w-full bg-[var(--black)] border-b border-[var(--border)] py-12 sm:py-16"
          style={{ padding: '48px var(--margin-page)' }}
        >
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            {/* Left: Project title & details */}
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <span className="dot-icon" />
                <span className="section-label text-[var(--accent)]">Featured Reel</span>
                <span className="text-label" style={{ opacity: 0.3 }}>•</span>
                <span
                  className="text-label inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-[10px]"
                  style={{
                    backgroundColor: 'rgba(153,153,255,0.15)',
                    border: '1px solid rgba(153,153,255,0.3)',
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
                <span className="text-label" style={{ opacity: 0.3 }}>•</span>
                <span className="text-label" style={{ color: 'var(--muted)' }}>Year 2024</span>
              </div>

              <h1
                className="font-display leading-tight mb-4"
                style={{
                  fontSize: 'clamp(28px, 4.5vw, 60px)',
                  color: 'var(--white)',
                }}
              >
                {featuredReel.title}
              </h1>

              <p
                className="text-body-lg text-[var(--muted)] leading-relaxed max-w-2xl"
                style={{ fontSize: 'clamp(14px, 1.4vw, 17px)' }}
              >
                {featuredReel.overview}
              </p>
            </div>

            {/* Right: Actions & Jump to archive */}
            <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-4 shrink-0">
              <Link
                href={`/work/${featuredReel.slug.current}`}
                className="text-label inline-flex items-center gap-2.5 px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 bg-[var(--white)] text-[var(--black)] font-semibold shadow-xl"
              >
                <span>View Project Case</span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>

              <div className="flex items-center gap-2">
                <span className="project-count-badge">
                  <span className="dot-icon dot-icon--sm" />
                  {projectCount} Projects in Archive
                </span>
              </div>
            </div>
          </div>

          {/* Quick jump software tabs for archive */}
          <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-4">
            <span className="text-label text-[var(--muted)]">
              Browse by Software:
            </span>

            <div className="flex flex-wrap items-center gap-2">
              <a
                href="#photoshop"
                className="text-label px-3.5 py-1.5 rounded-full border border-[var(--border)] transition-colors hover:border-[#31A8FF] hover:text-[#31A8FF] text-[var(--muted)]"
              >
                Photoshop
              </a>
              <a
                href="#illustrator"
                className="text-label px-3.5 py-1.5 rounded-full border border-[var(--border)] transition-colors hover:border-[#FF9A00] hover:text-[#FF9A00] text-[var(--muted)]"
              >
                Illustrator
              </a>
              <a
                href="#premiere-pro"
                className="text-label px-3.5 py-1.5 rounded-full border border-[var(--border)] transition-colors hover:border-[#9999FF] hover:text-[#9999FF] text-[var(--muted)]"
              >
                Premiere Pro
              </a>
              <a
                href="#after-effects"
                className="text-label px-3.5 py-1.5 rounded-full border border-[var(--border)] transition-colors hover:border-[#CF96FD] hover:text-[#CF96FD] text-[var(--muted)]"
              >
                After Effects
              </a>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
