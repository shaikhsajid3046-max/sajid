import type { Metadata } from 'next'
import Image from 'next/image'
import { getSiteSettings } from '@/lib/sanity/queries'
import { Footer } from '@/components/layout/Footer'
import { SplitText } from '@/components/ui/SplitText'
import { urlForImageString } from '@/lib/sanity/image'

export const metadata: Metadata = {
  title: 'About',
  description: 'Sajid Sheikh — designer, editor, and creative practitioner.',
}

const SKILLS = [
  'Brand Identity',
  'Graphic Design',
  'UI / UX Design',
  'Video Editing',
  'Motion Design',
  'Creative Direction',
  'Art Direction',
  'Media Design',
  'Print Design',
  'Typography',
]

export default async function AboutPage() {
  const settings = await getSiteSettings()
  const hasPortrait = Boolean(settings.portraitImage?.asset?._ref)
  const portraitSrc = urlForImageString(settings.portraitImage, 1200)

  return (
    <>
      {/* Header */}
      <section
        className="pt-40"
        style={{ padding: 'calc(var(--nav-height) + 80px) var(--margin-page) 0' }}
      >
        <SplitText as="h1" className="text-display-lg font-display">
          About
        </SplitText>
      </section>

      {/* Content grid */}
      <section
        className="mt-20"
        style={{ padding: '0 var(--margin-page)' }}
      >
        <div className="grid grid-cols-1 gap-16 md:grid-cols-12">
          {/* Left — text */}
          <div className="md:col-span-6">
            <p className="text-body-xl mb-8" style={{ color: 'var(--white)' }}>
              Sajid Sheikh is a designer and creative practitioner working across brand identity,
              graphic design, UI/UX, video editing, and creative direction.
            </p>
            <p className="text-body-lg mb-12" style={{ color: 'var(--white)', opacity: 0.7 }}>
              He works at the intersection of visual intelligence and editorial clarity — building
              systems that feel inevitable rather than designed. Every project begins with a
              question: what does this need to communicate before anyone reads a word?
            </p>

            {/* Skills */}
            <div>
              <p className="text-label mb-6" style={{ color: 'var(--muted)' }}>Disciplines</p>
              <ul className="grid grid-cols-2 gap-y-3 gap-x-4">
                {SKILLS.map((skill) => (
                  <li
                    key={skill}
                    className="text-body-sm"
                    style={{ color: 'var(--white)', opacity: 0.8 }}
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="mt-12 flex gap-6">
              <a
                href={`mailto:${settings.email ?? 'hello@sajidsheikh.com'}`}
                className="swap-btn text-label"
                style={{ color: 'var(--accent)' }}
              >
                <span className="swap-btn__text">Get in touch →</span>
                <span className="swap-btn__clone" aria-hidden="true">Get in touch →</span>
              </a>
            </div>
          </div>

          {/* Right — portrait */}
          <div className="md:col-span-5 md:col-start-8">
            {hasPortrait ? (
              <div className="relative w-full" style={{ aspectRatio: '3/4' }}>
                <Image
                  src={portraitSrc}
                  alt="Sajid Sheikh"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                  priority
                />
              </div>
            ) : (
              <div
                className="w-full flex items-center justify-center"
                style={{ aspectRatio: '3/4', backgroundColor: 'var(--surface)' }}
              >
                <span className="text-label" style={{ color: 'var(--muted)' }}>
                  Portrait
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="mt-24">
        <Footer
          email={settings.email}
          instagramUrl={settings.instagramUrl}
          behanceUrl={settings.behanceUrl}
          linkedinUrl={settings.linkedinUrl}
        />
      </div>
    </>
  )
}
