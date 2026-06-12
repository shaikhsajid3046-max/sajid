import { MarqueeRow } from '@/components/ui/MarqueeRow'
import Image from 'next/image'
import { urlForImageString } from '@/lib/sanity/image'
import type { SanityImage } from '@/types/project'

interface RecognitionProps {
  logos?: { name: string; logo: SanityImage }[]
}

export function Recognition({ logos }: RecognitionProps) {
  if (!logos || logos.length === 0) return null

  const items = logos.map((l) => ({
    name: l.name,
    src: urlForImageString(l.logo, 200),
  }))

  return (
    <section className="section-spacing overflow-hidden">
      <div className="mb-10 flex items-baseline gap-8" style={{ padding: '0 var(--margin-page)' }}>
        <span className="section-label">05</span>
        <span className="text-label" style={{ color: 'var(--muted)' }}>
          Clients &amp; Recognition
        </span>
      </div>

      <MarqueeRow speed={25}>
        {items.map((item) => (
          <div
            key={item.name}
            className="mx-12 flex items-center"
            style={{ filter: 'grayscale(1)', opacity: 0.5 }}
          >
            {item.src !== '/images/placeholder.jpg' ? (
              <Image
                src={item.src}
                alt={item.name}
                width={120}
                height={40}
                className="object-contain"
              />
            ) : (
              <span className="text-label whitespace-nowrap" style={{ color: 'var(--muted)' }}>
                {item.name}
              </span>
            )}
          </div>
        ))}
      </MarqueeRow>
    </section>
  )
}
