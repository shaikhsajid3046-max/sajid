'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRef, useEffect } from 'react'
import { gsap, ScrollTrigger, registerGsapPlugins } from '@/lib/gsap/gsapConfig'
import { SplitText } from '@/components/ui/SplitText'
import { DISCIPLINE_LABELS } from '@/types/project'
import type { Project } from '@/types/project'

/* ── Software badge helper ─────────────────────────── */

const TOOL_META: Record<string, { color: string; icon: string }> = {
  'adobe photoshop':   { color: '#31A8FF', icon: 'Ps' },
  'adobe illustrator': { color: '#FF9A00', icon: 'Ai' },
  'adobe premiere pro':{ color: '#9999FF', icon: 'Pr' },
  'adobe after effects':{ color: '#CF96FD', icon: 'Ae' },
}

function ToolBadge({ tool }: { tool: string }) {
  const key = tool.toLowerCase()
  const meta = TOOL_META[key]
  if (!meta) return null

  return (
    <span
      className="text-label inline-flex items-center gap-1.5 px-2 py-1"
      style={{
        backgroundColor: 'rgba(8,8,8,0.6)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        border: `1px solid ${meta.color}30`,
      }}
    >
      <span
        style={{
          backgroundColor: meta.color,
          color: '#000',
          fontWeight: 700,
          fontSize: '9px',
          width: '18px',
          height: '18px',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '3px',
          letterSpacing: 0,
          textTransform: 'none' as const,
        }}
      >
        {meta.icon}
      </span>
      <span style={{ color: meta.color, fontSize: '10px' }}>{tool.replace('Adobe ', '')}</span>
    </span>
  )
}

/* ── Check if a URL is a video ─────────────────────── */

function isVideoUrl(url: string): boolean {
  return /\.(mp4|webm|mov|ogg)$/i.test(url)
}

interface SelectedWorkProps {
  projects: Project[]
}

export function SelectedWork({ projects }: SelectedWorkProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const spacerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    registerGsapPlugins()

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.matchMedia('(max-width: 1023px)').matches
    if (prefersReduced || isMobile || !sectionRef.current || !trackRef.current) return

    const ctx = gsap.context(() => {
      const track = trackRef.current!

      const anim = gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: 'none',
      })

      ScrollTrigger.create({
        trigger: sectionRef.current,
        pin: sectionRef.current,
        pinSpacer: spacerRef.current,
        scrub: 1.2,
        start: 'top top',
        end: () => `+=${track.scrollWidth - window.innerWidth}`,
        animation: anim,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={spacerRef} className="selected-work-spacer">
      <section
        ref={sectionRef}
        className="selected-work-section"
        style={{ height: '100vh', overflow: 'hidden' }}
      >
      {/* Header row */}
      <div
        className="flex items-baseline justify-between"
        style={{ padding: '32px var(--margin-page) 20px' }}
      >
        <div className="flex items-baseline gap-6">
          <span className="section-label" style={{ color: 'var(--muted)' }}>03</span>
          <h2
            className="font-display"
            style={{ fontSize: 'clamp(28px, 4vw, 56px)', color: 'var(--white)', lineHeight: '1' }}
          >
            Selected Work
          </h2>
        </div>
        <span className="hidden text-label md:block" style={{ color: 'var(--muted)' }}>
          scroll →
        </span>
      </div>

      {/* Horizontal card track */}
      <div
        ref={trackRef}
        className="selected-work-track flex gap-4"
        style={{
          height: 'calc(100vh - 88px)',
          paddingLeft: 'var(--margin-page)',
          paddingRight: 'var(--margin-page)',
          paddingBottom: '24px',
          width: 'max-content',
        }}
      >
        {projects.map((project, i) => {
          const isVideo = isVideoUrl(project.coverImageUrl)
          const hasCover = Boolean(project.coverImageUrl)
          const toolName = project.tools?.[0]

          return (
            <Link
              key={project._id}
              href={`/work/${project.slug.current}`}
              className="selected-work-card group relative flex-shrink-0 block overflow-hidden"
              style={{
                width: i === 0 ? 'clamp(300px, 52vw, 760px)' : 'clamp(260px, 36vw, 520px)',
              }}
              data-cursor-view="true"
            >
              {/* Background image or video */}
              <div className="absolute inset-0">
                {isVideo ? (
                  <video
                    src={project.coverImageUrl}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                ) : hasCover ? (
                  <Image
                    src={project.coverImageUrl}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                ) : (
                  <div className="absolute inset-0" style={{ backgroundColor: 'var(--surface)' }} />
                )}

                {/* Gradient overlay — text readable, image still prominent */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(160deg, transparent 40%, rgba(8,8,8,0.75) 75%, rgba(8,8,8,0.95) 100%)',
                  }}
                />
              </div>

              {/* Card number — top left */}
              <div className="absolute top-5 left-5">
                <span className="text-label" style={{ color: 'rgba(240,237,232,0.35)' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Software tool badge — top right */}
              <div className="absolute top-5 right-5" style={{ zIndex: 2 }}>
                {toolName ? (
                  <ToolBadge tool={toolName} />
                ) : (
                  <span
                    className="text-label px-2 py-1"
                    style={{
                      color: 'var(--accent)',
                      border: '1px solid rgba(191,164,109,0.3)',
                      backdropFilter: 'blur(4px)',
                      backgroundColor: 'rgba(8,8,8,0.4)',
                    }}
                  >
                    {project.discipline[0] ? (DISCIPLINE_LABELS[project.discipline[0]] ?? project.discipline[0]) : ''}
                  </span>
                )}
              </div>

              {/* Play icon for video projects */}
              {isVideo && (
                <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 1 }}>
                  <div
                    className="flex items-center justify-center rounded-full opacity-60 group-hover:opacity-90 transition-opacity duration-500"
                    style={{
                      width: '56px',
                      height: '56px',
                      backgroundColor: 'rgba(8,8,8,0.6)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(240,237,232,0.15)',
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--white)">
                      <polygon points="6,3 20,12 6,21" />
                    </svg>
                  </div>
                </div>
              )}

              {/* Title + year — bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3
                  className="font-display mb-1 leading-tight translate-y-2 transition-transform duration-500 group-hover:translate-y-0"
                  style={{
                    fontSize: i === 0 ? 'clamp(24px, 3vw, 48px)' : 'clamp(20px, 2.2vw, 36px)',
                    color: 'var(--white)',
                  }}
                >
                  {project.title}
                </h3>
                <p className="text-label" style={{ color: 'rgba(240,237,232,0.45)' }}>
                  {project.year}
                </p>
              </div>
            </Link>
          )
        })}
      </div>
      </section>
    </div>
  )
}
