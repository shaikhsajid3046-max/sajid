import type { Metadata } from 'next'
import { getAllProjects, getSiteSettings } from '@/lib/sanity/queries'
import { ProjectGrid } from '@/components/project/ProjectGrid'
import { Footer } from '@/components/layout/Footer'
import { SplitText } from '@/components/ui/SplitText'

export const metadata: Metadata = {
  title: 'Work',
  description: 'Full portfolio of graphic design, UI/UX, video editing, motion design, and brand identity work by Sajid Sheikh.',
}

export default async function WorkPage() {
  const [projects, settings] = await Promise.all([
    getAllProjects(),
    getSiteSettings(),
  ])

  return (
    <>
      {/* Header */}
      <section
        className="pt-40 pb-16"
        style={{ padding: 'calc(var(--nav-height) + 80px) var(--margin-page) 64px' }}
      >
        <div className="flex items-baseline gap-8 mb-4">
          <span className="section-label">All Work</span>
        </div>
        <SplitText as="h1" className="text-display-lg font-display">
          Projects
        </SplitText>
      </section>

      {/* Grid */}
      <section style={{ padding: '0 var(--margin-page)' }}>
        <ProjectGrid projects={projects} />
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
