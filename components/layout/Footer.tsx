import Link from 'next/link'
import { FooterCTA } from '@/components/sections/FooterCTA'

interface FooterProps {
  email?: string
  instagramUrl?: string
  behanceUrl?: string
  linkedinUrl?: string
}

/** Instagram SVG icon */
function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

/** Behance SVG icon */
function BehanceIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12h10" />
      <path d="M1 6h9" />
      <path d="M1 18h9" />
      <path d="M14 6h6" />
      <circle cx="17" cy="14" r="4" />
    </svg>
  )
}

/** LinkedIn SVG icon */
function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

/** Mail SVG icon */
function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )
}

export function Footer({ email, instagramUrl, behanceUrl, linkedinUrl }: FooterProps) {
  const contactEmail = email ?? 'shaikhsajid3046@gmail.com'

  return (
    <footer id="contact" style={{ backgroundColor: 'var(--black)' }}>
      <FooterCTA email={contactEmail} />

      {/* Bottom bar */}
      <div
        className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between py-6"
        style={{
          padding: '24px var(--margin-page)',
          borderTop: '1px solid var(--border)',
        }}
      >
        <p className="text-label text-muted">&copy; {new Date().getFullYear()} Sajid Shaikh</p>

        {/* Social links with icons */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          {instagramUrl && (
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-label text-muted swap-btn flex items-center gap-1.5"
              aria-label="Instagram"
            >
              <InstagramIcon />
              <span className="swap-btn__text">Instagram</span>
              <span className="swap-btn__clone" aria-hidden="true">Instagram</span>
            </a>
          )}
          {behanceUrl && (
            <a
              href={behanceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-label text-muted swap-btn flex items-center gap-1.5"
              aria-label="Behance"
            >
              <BehanceIcon />
              <span className="swap-btn__text">Behance</span>
              <span className="swap-btn__clone" aria-hidden="true">Behance</span>
            </a>
          )}
          {linkedinUrl && (
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-label text-muted swap-btn flex items-center gap-1.5"
              aria-label="LinkedIn"
            >
              <LinkedInIcon />
              <span className="swap-btn__text">LinkedIn</span>
              <span className="swap-btn__clone" aria-hidden="true">LinkedIn</span>
            </a>
          )}
          <a
            href={`mailto:${contactEmail}`}
            className="text-label text-muted swap-btn flex items-center gap-1.5"
            aria-label="Email"
          >
            <MailIcon />
            <span className="swap-btn__text">Mail</span>
            <span className="swap-btn__clone" aria-hidden="true">Mail</span>
          </a>
          <Link href="/work" className="text-label text-muted swap-btn">
            <span className="swap-btn__text">Work</span>
            <span className="swap-btn__clone" aria-hidden="true">Work</span>
          </Link>
        </div>
      </div>
    </footer>
  )
}
