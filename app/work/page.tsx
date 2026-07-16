import type { Metadata } from 'next'
import { getAllProjects, getFeaturedProjects, getSiteSettings } from '@/lib/sanity/queries'
import { WorkPageHeader } from '@/components/sections/WorkPageHeader'
import { SelectedWork } from '@/components/sections/SelectedWork'
import { ProjectGrid } from '@/components/project/ProjectGrid'
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

      {/* All projects grid */}
      <section
        className="mt-16"
        style={{ padding: '0 var(--margin-page)' }}
      >
        <div className="flex items-center gap-3 mb-8">
          <span className="dot-icon" />
          <span className="section-label">All Projects</span>
        </div>
        <ProjectGrid projects={allProjects} />
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
