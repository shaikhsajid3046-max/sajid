import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getProject, getAllProjects, getSiteSettings } from '@/lib/data/queries'
import { ProjectHero } from '@/components/project/ProjectHero'
import { ProjectGallery } from '@/components/project/ProjectGallery'
import { Footer } from '@/components/layout/Footer'
import { DISCIPLINE_LABELS } from '@/types/project'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProject(params.slug)
  if (!project) return {}
  return {
    title: project.title,
    description: project.seoDescription ?? project.overview,
  }
}

export async function generateStaticParams() {
  const projects = await getAllProjects()
  return projects.map((p) => ({ slug: p.slug.current }))
}

/** Wrench/tool SVG icon */
function ToolIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  )
}

/** Arrow right SVG icon */
function ArrowRightIcon() {
  return (
    <svg
      width="16"
      height="16"
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
  )
}

/** SVG Logo Resolver for Design & Editing Tools */
function ToolLogo({ name }: { name: string }) {
  const norm = name.toLowerCase().replace(/[^a-z0-9]/g, '')
  switch (norm) {
    case 'figma':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M6 5.5A2.5 2.5 0 0 1 8.5 3h2.5v5H8.5A2.5 2.5 0 0 1 6 5.5z" fill="#F24E1E" />
          <path d="M11 3h2.5A2.5 2.5 0 0 1 16 5.5 2.5 2.5 0 0 1 13.5 8H11V3z" fill="#FF7262" />
          <path d="M6 11a2.5 2.5 0 0 1 2.5-2.5H11v5H8.5A2.5 2.5 0 0 1 6 11z" fill="#A259FF" />
          <path d="M11 8.5h2.5A2.5 2.5 0 0 1 16 11a2.5 2.5 0 0 1-2.5 2.5H11v-5z" fill="#1ABC9C" />
          <path d="M6 16.5A2.5 2.5 0 0 1 8.5 14H11v2.5a2.5 2.5 0 0 1-2.5 2.5A2.5 2.5 0 0 1 6 16.5z" fill="#18A0FB" />
        </svg>
      )
    case 'adobeillustrator':
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <rect width="28" height="28" rx="5" fill="#261300" />
          <rect x="1" y="1" width="26" height="26" rx="4" stroke="#FF9A00" strokeWidth="1.5" />
          <text x="6" y="18" fill="#FF9A00" fontFamily="sans-serif" fontSize="12" fontWeight="bold">Ai</text>
        </svg>
      )
    case 'adobephotoshop':
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <rect width="28" height="28" rx="5" fill="#001C26" />
          <rect x="1" y="1" width="26" height="26" rx="4" stroke="#00C8FF" strokeWidth="1.5" />
          <text x="6" y="18" fill="#00C8FF" fontFamily="sans-serif" fontSize="12" fontWeight="bold">Ps</text>
        </svg>
      )
    case 'adobeindesign':
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <rect width="28" height="28" rx="5" fill="#260017" />
          <rect x="1" y="1" width="26" height="26" rx="4" stroke="#FF00A0" strokeWidth="1.5" />
          <text x="7" y="18" fill="#FF00A0" fontFamily="sans-serif" fontSize="12" fontWeight="bold">Id</text>
        </svg>
      )
    case 'framer':
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <rect width="28" height="28" rx="5" fill="#0E0E0E" />
          <path d="M7 6h14l-7 7H7V6zm7 7h7l-7 7H7v-7zm7 7v4l-7-4h7z" fill="#0055FF" />
        </svg>
      )
    case 'adobeaftereffects':
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <rect width="28" height="28" rx="5" fill="#1D0026" />
          <rect x="1" y="1" width="26" height="26" rx="4" stroke="#D199FF" strokeWidth="1.5" />
          <text x="6" y="18" fill="#D199FF" fontFamily="sans-serif" fontSize="12" fontWeight="bold">Ae</text>
        </svg>
      )
    case 'adobepremierepro':
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <rect width="28" height="28" rx="5" fill="#130026" />
          <rect x="1" y="1" width="26" height="26" rx="4" stroke="#EA76FF" strokeWidth="1.5" />
          <text x="6" y="18" fill="#EA76FF" fontFamily="sans-serif" fontSize="12" fontWeight="bold">Pr</text>
        </svg>
      )
    case 'adobelightroom':
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <rect width="28" height="28" rx="5" fill="#002621" />
          <rect x="1" y="1" width="26" height="26" rx="4" stroke="#31FFEB" strokeWidth="1.5" />
          <text x="6" y="18" fill="#31FFEB" fontFamily="sans-serif" fontSize="12" fontWeight="bold">Lr</text>
        </svg>
      )
    case 'cinema4d':
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <rect width="28" height="28" rx="5" fill="#0A0A0A" />
          <path d="M6 14l8-8 8 8-8 8-8-8z" stroke="#0055FF" strokeWidth="1.5" fill="none" />
          <path d="M14 6v16M6 14h16" stroke="#0055FF" strokeWidth="0.5" />
          <circle cx="14" cy="14" r="3" fill="#0055FF" />
        </svg>
      )
    case 'davinciresolve':
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <rect width="28" height="28" rx="5" fill="#111" />
          <circle cx="14" cy="10" r="4" fill="#FF3B30" />
          <circle cx="10" cy="17" r="4" fill="#4CD964" />
          <circle cx="18" cy="17" r="4" fill="#007AFF" />
        </svg>
      )
    case 'blender':
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <rect width="28" height="28" rx="5" fill="#2B1A0A" />
          <circle cx="14" cy="14" r="5" fill="#EA7600" />
          <circle cx="14" cy="14" r="2.5" fill="#ffffff" />
          <path d="M16 8l4-4M19 12h5M18 16l4 4" stroke="#FF5E00" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    case 'maze':
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <rect width="28" height="28" rx="5" fill="#2E0854" />
          <path d="M8 8h12v4H12v4h8v4H8V8z" stroke="#ffffff" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'captureone':
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <rect width="28" height="28" rx="5" fill="#0E1E24" />
          <circle cx="14" cy="14" r="7" stroke="#00C5FF" strokeWidth="1.5" />
          <path d="M14 7v14M7 14h14" stroke="#00C5FF" strokeWidth="1.5" />
        </svg>
      )
    case 'glyphs':
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <rect width="28" height="28" rx="5" fill="#1C1A17" />
          <path d="M9 19c0-5 3-9 7-9 2 0 4 1 4 3s-1 3-3 3-3-1-3-2c0-.5.5-.5.5-.5s-1.5-.5-2 1c-1 3-2 4-3 4z" fill="#FF5E00" />
        </svg>
      )
    default:
      return (
        <span className="text-[10px] tracking-wider text-muted font-body font-medium uppercase px-2">{name}</span>
      )
  }
}

export default async function ProjectPage({ params }: Props) {
  const [project, allProjects, settings] = await Promise.all([
    getProject(params.slug),
    getAllProjects(),
    getSiteSettings(),
  ])

  if (!project) notFound()

  // Next project
  const currentIndex = allProjects.findIndex((p) => p.slug.current === params.slug)
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length]

  return (
    <>
      {/* Hero */}
      <div className="pt-[var(--nav-height)]">
        <ProjectHero project={project} />
      </div>

      {/* Header info */}
      <section
        className="py-16"
        style={{ padding: '64px var(--margin-page)' }}
      >
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          {/* Title */}
          <div>
            <h1
              className="font-display mb-4"
              style={{ fontSize: 'var(--text-md)', color: 'var(--white)', lineHeight: '1.0' }}
            >
              {project.title}
            </h1>
            <p className="text-label" style={{ color: 'var(--muted)' }}>
              {project.discipline.map((d) => DISCIPLINE_LABELS[d] ?? d).join(' / ')}
              {' / '}
              {project.year}
            </p>
          </div>

          {/* Overview */}
          <div>
            {project.client && (
              <p className="text-label mb-3" style={{ color: 'var(--muted)' }}>
                Client: {project.client}
              </p>
            )}
            <p className="text-body-lg" style={{ color: 'var(--white)' }}>
              {project.overview}
            </p>
          </div>
        </div>
      </section>

      {/* Tools used */}
      {project.tools && project.tools.length > 0 && (
        <section
          style={{ padding: '0 var(--margin-page)' }}
        >
          <div
            className="py-10"
            style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}
          >
            <div className="flex items-center gap-2 mb-6">
              <ToolIcon />
              <p className="text-label" style={{ color: 'var(--muted)' }}>
                Tools & Software
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              {project.tools.map((tool) => (
                <div
                  key={tool}
                  className="relative group cursor-help transition-transform duration-300 hover:scale-105"
                  title={tool}
                  aria-label={tool}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '44px',
                    height: '44px',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    backgroundColor: 'var(--surface)',
                  }}
                >
                  <ToolLogo name={tool} />
                  
                  {/* Tooltip */}
                  <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 transition-opacity duration-200 group-hover:opacity-100 bg-[var(--black)] text-[var(--white)] text-[10px] uppercase tracking-wider px-2.5 py-1.5 rounded border border-[var(--border)] whitespace-nowrap z-[10] shadow-xl">
                    {tool}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery */}
      <section className="mt-12" style={{ padding: '0 var(--margin-page)' }}>
        <ProjectGallery images={project.gallery} />
      </section>

      {/* Credits */}
      {project.credits && (
        <section
          className="mt-16"
          style={{ padding: '0 var(--margin-page)' }}
        >
          <p className="text-label mb-2" style={{ color: 'var(--muted)' }}>Credits</p>
          <p className="text-body-sm" style={{ color: 'var(--white)', whiteSpace: 'pre-line' }}>
            {project.credits}
          </p>
        </section>
      )}

      {/* Next project */}
      {nextProject && (
        <section
          className="mt-24 py-16"
          style={{
            padding: '64px var(--margin-page)',
            borderTop: '1px solid var(--border)',
          }}
        >
          <p className="text-label mb-4" style={{ color: 'var(--muted)' }}>Next Project</p>
          <Link
            href={`/work/${nextProject.slug.current}`}
            className="font-display transition-opacity hover:opacity-60 inline-flex flex-wrap items-center gap-x-4 gap-y-2"
            style={{ fontSize: 'var(--text-md)', color: 'var(--white)', lineHeight: '1.0' }}
            data-cursor-view="true"
          >
            <span>{nextProject.title}</span>
            <ArrowRightIcon />
          </Link>
        </section>
      )}

      <Footer
        email={settings.email}
        instagramUrl={settings.instagramUrl}
        behanceUrl={settings.behanceUrl}
        linkedinUrl={settings.linkedinUrl}
      />
    </>
  )
}
