'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap, registerGsapPlugins } from '@/lib/gsap/gsapConfig'

interface ProjectGalleryProps {
  images: string[]
}

export function ProjectGallery({ images }: ProjectGalleryProps) {
  const galleryRef = useRef<HTMLDivElement>(null)
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null)

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

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (lightboxSrc) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [lightboxSrc])

  if (!images?.length) return null

  return (
    <>
      <div ref={galleryRef} className="flex flex-col gap-8">
        {images.map((src, i) => {
          const hasSrc = Boolean(src)
          if (!hasSrc) return null

          return (
            <div
              key={i}
              className="gallery-item w-full flex justify-center bg-[#080808]/40 border border-white/[0.03] overflow-hidden"
              style={{ borderRadius: '6px' }}
            >
              <img
                src={src}
                alt={`Project image ${i + 1}`}
                className="max-w-full h-auto object-contain cursor-zoom-in hover:opacity-90 transition-all duration-300"
                loading="lazy"
                onClick={() => setLightboxSrc(src)}
              />
            </div>
          )
        })}
      </div>

      {/* Lightbox Modal */}
      {lightboxSrc && (
        <div
          className="fixed inset-0 flex items-center justify-center"
          style={{
            zIndex: 9999,
            backgroundColor: 'rgba(8,8,8,0.92)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
          }}
          onClick={() => setLightboxSrc(null)}
          role="dialog"
          aria-modal="true"
        >
          {/* Close button */}
          <button
            onClick={() => setLightboxSrc(null)}
            aria-label="Close image viewer"
            className="absolute top-6 right-6 flex items-center gap-2 px-4 py-2 rounded-full transition-colors hover:bg-white/5"
            style={{
              color: 'var(--white)',
              zIndex: 10000,
              fontSize: '12px',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              border: 'none',
              background: 'none',
              cursor: 'pointer'
            }}
          >
            <span>Close</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Full Screen Image */}
          <div
            className="relative max-w-[95vw] max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxSrc}
              alt="Expanded view"
              className="max-w-full max-h-[85vh] object-contain select-none shadow-2xl"
              style={{ borderRadius: '4px' }}
            />
          </div>
        </div>
      )}
    </>
  )
}
