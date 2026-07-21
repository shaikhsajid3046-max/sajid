import type { Metadata } from 'next'
import { getAllProjects, getFeaturedProjects, getSiteSettings } from '@/lib/data/queries'
import { WorkPageHeader } from '@/components/sections/WorkPageHeader'
import { SelectedWork } from '@/components/sections/SelectedWork'
import { ProjectCard } from '@/components/project/ProjectCard'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Works',
  description: 'Full portfolio of graphic design, UI/UX, video editing, motion design, and brand identity work by Sajid Shaikh.',
}

export default async function WorkPage() {
  const [allProjects, featuredProjects, settings] = await Promise.all([
    getAllProjects(),
    getFeaturedProjects(),
    getSiteSettings(),
  ])

  // Filter projects by their software folder (tools)
  const photoshopProjects = allProjects.filter(p => p.tools?.some(t => t.toLowerCase().includes('photoshop')))
  const illustratorProjects = allProjects.filter(p => p.tools?.some(t => t.toLowerCase().includes('illustrator')))
  const premiereProjects = allProjects.filter(p => p.tools?.some(t => t.toLowerCase().includes('premiere')))
  const afterEffectsProjects = allProjects.filter(p => p.tools?.some(t => t.toLowerCase().includes('after effects')))

  return (
    <>
      {/* Header */}
      <WorkPageHeader projectCount={allProjects.length} />

      {/* Featured / Selected Work (horizontal scroll) */}
      {featuredProjects.length > 0 && (
        <div className="mt-8">
          <SelectedWork projects={featuredProjects} />
        </div>
      )}

      {/* Photoshop Section */}
      {photoshopProjects.length > 0 && (
        <section
          className="mt-16"
          style={{ padding: '0 var(--margin-page)' }}
        >
          <div className="flex items-center gap-3 mb-8">
            <span className="dot-icon" />
            <span className="section-label">Photoshop Work</span>
            <span className="text-label" style={{ opacity: 0.5 }}>({photoshopProjects.length})</span>
          </div>
          <div className="grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2">
            {photoshopProjects.map((project, i) => (
              <ProjectCard key={project._id} project={project} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* Illustrator Section */}
      {illustratorProjects.length > 0 && (
        <section
          className="mt-24"
          style={{ padding: '0 var(--margin-page)' }}
        >
          <div className="flex items-center gap-3 mb-8">
            <span className="dot-icon" />
            <span className="section-label">Illustrator Branding</span>
            <span className="text-label" style={{ opacity: 0.5 }}>({illustratorProjects.length})</span>
          </div>
          <div className="grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2">
            {illustratorProjects.map((project, i) => (
              <ProjectCard key={project._id} project={project} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* Premiere Pro Section */}
      {premiereProjects.length > 0 && (
        <section
          className="mt-24"
          style={{ padding: '0 var(--margin-page)' }}
        >
          <div className="flex items-center gap-3 mb-8">
            <span className="dot-icon" />
            <span className="section-label">Premiere Pro Video</span>
            <span className="text-label" style={{ opacity: 0.5 }}>({premiereProjects.length})</span>
          </div>
          <div className="grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2">
            {premiereProjects.map((project, i) => (
              <ProjectCard key={project._id} project={project} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* After Effects Section (Empty by default, hidden) */}
      {afterEffectsProjects.length > 0 && (
        <section
          className="mt-24"
          style={{ padding: '0 var(--margin-page)' }}
        >
          <div className="flex items-center gap-3 mb-8">
            <span className="dot-icon" />
            <span className="section-label">After Effects Motion</span>
            <span className="text-label" style={{ opacity: 0.5 }}>({afterEffectsProjects.length})</span>
          </div>
          <div className="grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2">
            {afterEffectsProjects.map((project, i) => (
              <ProjectCard key={project._id} project={project} index={i} />
            ))}
          </div>
        </section>
      )}

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
