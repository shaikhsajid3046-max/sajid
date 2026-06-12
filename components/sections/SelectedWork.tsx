'use client'

import Link from 'next/link'
import { useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import { gsap, registerGsapPlugins } from '@/lib/gsap/gsapConfig'
import { SplitText } from '@/components/ui/SplitText'
import { DISCIPLINE_LABELS } from '@/types/project'
import { urlForImageString } from '@/lib/sanity/image'
import type { Project } from '@/types/project'

interface SelectedWorkProps {
  projects: Project[]
}

export function SelectedWork({ projects }: SelectedWorkProps) {
  const previewRef = useRef<HTMLDivElement>(null)
  const previewImgRef = useRef<HTMLImageElement>(null)
  const [previewSrc, setPreviewSrc] = useState('')
  const sectionRef = useRef<HTMLElement>(null)

  const handleEnter = useCallback((src: string) => {
    registerGsapPlugins()
    setPreviewSrc(src)
    gsap.to(previewRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: 'power2.out',
      overwrite: true,
    })
  }, [])

  const handleLeave = useCallback(() => {
    gsap.to(previewRef.current, {
      opacity: 0,
      scale: 0.96,
      duration: 0.35,
      ease: 'power2.in',
      overwrite: true,
    })
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const xOffset = (e.clientX / window.innerWidth - 0.5) * 30
    const yOffset = (e.clientY / window.innerHeight - 0.5) * 20
    gsap.to(previewRef.current, {
      x: xOffset,
      y: yOffset,
      duration: 0.8,
      ease: 'power1.out',
    })
  }, [])

  return (
    <section
      ref={sectionRef}
      className="section-spacing"
      style={{ padding: '0 var(--margin-page)' }}
      onMouseMove={handleMouseMove}
    >
      {/* Header */}
      <div className="mb-12 flex items-baseline gap-8">
        <span className="section-label">03</span>
        <SplitText as="h2" className="text-display-lg font-display" delay={0}>
          Selected Work
        </SplitText>
      </div>

      {/* Project list */}
      <ul>
        {projects.map((project, i) => {
          const coverSrc = urlForImageString(project.coverImage, 1600)
          const hasCover = Boolean(project.coverImage?.asset?._ref)

          return (
            <li key={project._id}>
              <Link
                href={`/work/${project.slug.current}`}
                className="group flex items-center justify-between py-6 transition-colors"
                style={{ borderTop: '1px solid var(--border)' }}
                onMouseEnter={() => hasCover && handleEnter(coverSrc)}
                onMouseLeave={handleLeave}
                data-cursor-view="true"
              >
                {/* Index + title */}
                <div className="flex items-baseline gap-6">
                  <span className="text-label" style={{ color: 'var(--muted)', minWidth: '2ch' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className="font-display transition-colors duration-300"
                    style={{ fontSize: 'clamp(24px, 3vw, 48px)', color: 'var(--white)' }}
                  >
                    {project.title}
                  </span>
                </div>

                {/* Meta */}
                <div className="hidden items-center gap-8 md:flex">
                  <span className="text-label" style={{ color: 'var(--muted)' }}>
                    {project.discipline.map((d) => DISCIPLINE_LABELS[d] ?? d).join(', ')}
                  </span>
                  <span className="text-label" style={{ color: 'var(--muted)' }}>
                    {project.year}
                  </span>
                  <span className="text-label" style={{ color: 'var(--accent)' }}>
                    →
                  </span>
                </div>
              </Link>
            </li>
          )
        })}
      </ul>

      {/* Full-screen hover preview */}
      <div
        ref={previewRef}
        className="pointer-events-none fixed inset-0 z-[40] flex items-center justify-center opacity-0"
        style={{ scale: '0.96' }}
        aria-hidden="true"
      >
        {previewSrc && (
          <div className="relative h-[60vh] w-[60vw]">
            <Image
              ref={previewImgRef as React.Ref<HTMLImageElement>}
              src={previewSrc}
              alt=""
              fill
              className="object-cover"
              sizes="60vw"
            />
          </div>
        )}
      </div>
    </section>
  )
}
