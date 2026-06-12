'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRef, useEffect } from 'react'
import { gsap, ScrollTrigger, registerGsapPlugins } from '@/lib/gsap/gsapConfig'
import { DISCIPLINE_LABELS } from '@/types/project'
import { urlForImageString } from '@/lib/sanity/image'
import type { Project } from '@/types/project'

interface ProjectCardProps {
  project: Project
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const coverSrc = urlForImageString(project.coverImage, 1600)
  const hasCover = Boolean(project.coverImage?.asset?._ref)

  useEffect(() => {
    registerGsapPlugins()
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !cardRef.current) return

    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        delay: (index % 2) * 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 88%',
          once: true,
        },
      })
    })

    return () => ctx.revert()
  }, [index])

  return (
    <div ref={cardRef} className="project-card group">
      <Link href={`/work/${project.slug.current}`} data-cursor-view="true">
        {/* Image */}
        <div className="relative overflow-hidden bg-surface" style={{ aspectRatio: '4/3' }}>
          {hasCover ? (
            <Image
              src={coverSrc}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="project-card__image object-cover"
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

          {/* Discipline tag overlay */}
          <div className="absolute top-4 left-4">
            <span
              className="text-label px-2 py-1"
              style={{
                backgroundColor: 'rgba(8,8,8,0.7)',
                color: 'var(--white)',
                backdropFilter: 'blur(4px)',
              }}
            >
              {project.discipline[0] ? DISCIPLINE_LABELS[project.discipline[0]] ?? project.discipline[0] : ''}
            </span>
          </div>

          {/* Year */}
          <div className="absolute bottom-4 right-4">
            <span className="text-label" style={{ color: 'rgba(240,237,232,0.6)' }}>
              {project.year}
            </span>
          </div>
        </div>

        {/* Title */}
        <div className="mt-4 overflow-hidden">
          <h3
            className="font-display translate-y-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
            style={{ fontSize: 'clamp(18px, 2vw, 28px)', color: 'var(--white)' }}
          >
            {project.title}
          </h3>
        </div>
      </Link>
    </div>
  )
}
