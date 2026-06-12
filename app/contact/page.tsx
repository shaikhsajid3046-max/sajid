import type { Metadata } from 'next'
import { getSiteSettings } from '@/lib/sanity/queries'
import { Footer } from '@/components/layout/Footer'
import { SplitText } from '@/components/ui/SplitText'
import { Magnetic } from '@/components/ui/Magnetic'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Sajid Sheikh for design projects and collaborations.',
}

export default async function ContactPage() {
  const settings = await getSiteSettings()
  const email = settings.email ?? 'hello@sajidsheikh.com'

  return (
    <>
      <section
        style={{ padding: 'calc(var(--nav-height) + 80px) var(--margin-page) 64px' }}
        className="min-h-screen flex flex-col justify-center"
      >
        <p className="text-label mb-6" style={{ color: 'var(--muted)' }}>
          Let&apos;s Talk
        </p>

        <SplitText as="h1" className="text-display-lg font-display mb-12">
          Have a project in mind?
        </SplitText>

        <Magnetic strength={0.2}>
          <a
            href={`mailto:${email}`}
            className="text-body-xl block mb-16 transition-opacity hover:opacity-60"
            style={{
              color: 'var(--white)',
              textDecoration: 'underline',
              textUnderlineOffset: '8px',
            }}
            data-cursor="Mail"
          >
            {email}
          </a>
        </Magnetic>

        {/* Social links */}
        <div className="flex gap-8">
          {settings.instagramUrl && (
            <a
              href={settings.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-label swap-btn"
              style={{ color: 'var(--muted)' }}
            >
              <span className="swap-btn__text">Instagram</span>
              <span className="swap-btn__clone" aria-hidden="true">Instagram</span>
            </a>
          )}
          {settings.behanceUrl && (
            <a
              href={settings.behanceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-label swap-btn"
              style={{ color: 'var(--muted)' }}
            >
              <span className="swap-btn__text">Behance</span>
              <span className="swap-btn__clone" aria-hidden="true">Behance</span>
            </a>
          )}
          {settings.linkedinUrl && (
            <a
              href={settings.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-label swap-btn"
              style={{ color: 'var(--muted)' }}
            >
              <span className="swap-btn__text">LinkedIn</span>
              <span className="swap-btn__clone" aria-hidden="true">LinkedIn</span>
            </a>
          )}
        </div>
      </section>

      <Footer
        email={settings.email}
        instagramUrl={settings.instagramUrl}
        behanceUrl={settings.behanceUrl}
        linkedinUrl={settings.linkedinUrl}
      />
    </>
  )
}
