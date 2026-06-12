import { Hero } from '@/components/sections/Hero'
import { SelectedWork } from '@/components/sections/SelectedWork'
import { Services } from '@/components/sections/Services'
import { Recognition } from '@/components/sections/Recognition'
import { Footer } from '@/components/layout/Footer'
import { SplitText } from '@/components/ui/SplitText'
import { getFeaturedProjects, getSiteSettings } from '@/lib/sanity/queries'

export default async function Home() {
  const [projects, settings] = await Promise.all([
    getFeaturedProjects(),
    getSiteSettings(),
  ])

  return (
    <>
      {/* Section 1 — Hero */}
      <Hero philosophy={settings.heroPhilosophy} />

      {/* Section 2 — Philosophy */}
      {settings.heroPhilosophy && (
        <section
          className="section-spacing"
          style={{ padding: '0 var(--margin-page)' }}
        >
          <div className="flex items-baseline gap-8 mb-6">
            <span className="section-label">02</span>
          </div>
          <SplitText
            as="p"
            className="text-body-xl max-w-2xl"
            style={{ color: 'var(--white)' } as React.CSSProperties}
          >
            {settings.heroPhilosophy}
          </SplitText>
        </section>
      )}

      {/* Section 3 — Selected Work */}
      <SelectedWork projects={projects} />

      {/* Section 4 — Services */}
      <Services />

      {/* Section 5 — Recognition */}
      <Recognition logos={settings.clientLogos} />

      {/* Footer */}
      <Footer
        email={settings.email}
        instagramUrl={settings.instagramUrl}
        behanceUrl={settings.behanceUrl}
        linkedinUrl={settings.linkedinUrl}
      />
    </>
  )
}
