'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRef, useEffect } from 'react'
import { gsap, registerGsapPlugins } from '@/lib/gsap/gsapConfig'
import { TiltCard } from '@/components/ui/TiltCard'
import { DISCIPLINE_LABELS } from '@/types/project'
import type { Project } from '@/types/project'

interface ProjectCardProps {
  project: Project
  index: number
}

/** Inline SVG arrow icon pointing right */
function ArrowRight() {
  return (
    <span className="arrow-slide-icon">
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
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    </span>
  )
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const coverSrc = project.coverImageUrl
  const hasCover = Boolean(project.coverImageUrl)

  // Scroll entrance animation
  useEffect(() => {
    registerGsapPlugins()
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !cardRef.current) return

    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.9,
        delay: (index % 2) * 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 90%',
          once: true,
        },
      })
    })

    return () => ctx.revert()
  }, [index])

  return (
    <div ref={cardRef}>
      <TiltCard maxDeg={6}>
        <Link href={`/work/${project.slug.current}`} className="block group" data-cursor-view="true">

          {/* Image container */}
          <div
            className="relative overflow-hidden"
            style={{ aspectRatio: '4/3' }}
          >
            {hasCover ? (
              <Image
                src={coverSrc}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                style={{ transform: 'translateZ(20px)' }} /* 3D lift on image */
              />
            ) : (
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ backgroundColor: 'var(--surface)' }}
              >
                <span className="text-label" style={{ color: 'var(--muted)' }}>
                  {project.title}
                </span>
              </div>
            )}

            {/* Discipline tag with dot icon */}
            <div className="absolute top-4 left-4" style={{ transform: 'translateZ(30px)' }}>
              <span
                className="text-label px-2 py-1 inline-flex items-center gap-1.5"
                style={{
                  backgroundColor: 'rgba(8,8,8,0.72)',
                  color: 'var(--accent)',
                  backdropFilter: 'blur(4px)',
                }}
              >
                <span className="dot-icon dot-icon--sm" />
                {project.discipline[0]
                  ? (DISCIPLINE_LABELS[project.discipline[0]] ?? project.discipline[0])
                  : ''}
              </span>
            </div>

            {/* Year */}
            <div className="absolute bottom-4 right-4" style={{ transform: 'translateZ(30px)' }}>
              <span className="text-label" style={{ color: 'rgba(240,237,232,0.5)' }}>
                {project.year}
              </span>
            </div>
          </div>

          {/* Title and meta -- always visible */}
          <div className="mt-4 flex items-start justify-between" style={{ transform: 'translateZ(10px)' }}>
            <div>
              <h3
                className="font-display flex items-center gap-2 transition-colors duration-300 group-hover:text-[var(--accent)]"
                style={{
                  fontSize: 'clamp(18px, 2vw, 28px)',
                  color: 'var(--white)',
                }}
              >
                {project.title}
                <ArrowRight />
              </h3>
              {project.client && (
                <p
                  className="text-body-sm mt-1"
                  style={{ color: 'var(--muted)' }}
                >
                  {project.client}
                </p>
              )}
            </div>
          </div>

        </Link>
      </TiltCard>
    </div>
  )
}
