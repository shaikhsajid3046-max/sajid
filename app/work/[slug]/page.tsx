import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getProject, getAllProjects, getSiteSettings } from '@/lib/sanity/queries'
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
              {project.discipline.map((d) => DISCIPLINE_LABELS[d] ?? d).join(' · ')}
              {' · '}
              {project.year}
            </p>
          </div>

          {/* Overview */}
          <div>
            {project.client && (
              <p className="text-label mb-3" style={{ color: 'var(--muted)' }}>
                Client — {project.client}
              </p>
            )}
            <p className="text-body-lg" style={{ color: 'var(--white)' }}>
              {project.overview}
            </p>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section style={{ padding: '0 var(--margin-page)' }}>
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
            className="font-display transition-opacity hover:opacity-60"
            style={{ fontSize: 'var(--text-md)', color: 'var(--white)', lineHeight: '1.0' }}
            data-cursor-view="true"
          >
            {nextProject.title} →
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
