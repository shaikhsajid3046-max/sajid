'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, registerGsapPlugins } from '@/lib/gsap/gsapConfig'
import { urlForImageString } from '@/lib/sanity/image'
import type { SanityImage } from '@/types/project'

interface ProjectGalleryProps {
  images: SanityImage[]
}

export function ProjectGallery({ images }: ProjectGalleryProps) {
  const galleryRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    registerGsapPlugins()
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !galleryRef.current) return

    const ctx = gsap.context(() => {
      const items = galleryRef.current!.querySelectorAll<HTMLElement>('.gallery-item')
      items.forEach((item) => {
        gsap.from(item, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 88%',
            once: true,
          },
        })
      })
    }, galleryRef)

    return () => ctx.revert()
  }, [images])

  if (!images?.length) return null

  // Interleave: first image full-width, rest in 2-col pairs
  return (
    <div ref={galleryRef} className="space-y-4">
      {images.map((img, i) => {
        const src = urlForImageString(img, 2000)
        const isFullWidth = i === 0 || i % 5 === 0
        const hasSrc = Boolean(img?.asset?._ref)

        if (!hasSrc) return null

        return (
          <div
            key={i}
            className={`gallery-item relative overflow-hidden ${isFullWidth ? 'w-full' : ''}`}
            style={{ aspectRatio: isFullWidth ? '16/9' : '4/3' }}
          >
            <Image
              src={src}
              alt={(img as { alt?: string }).alt ?? `Project image ${i + 1}`}
              fill
              sizes={isFullWidth ? '100vw' : '50vw'}
              className="object-cover"
            />
          </div>
        )
      })}
    </div>
  )
}
