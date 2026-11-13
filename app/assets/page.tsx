import type { Metadata } from 'next'
import { getSiteSettings } from '@/lib/data/queries'
import { ASSETS } from '@/lib/data/assetsData'
import { AssetsPageHeader } from '@/components/sections/AssetsPageHeader'
import { AssetsGallery } from '@/components/sections/AssetsGallery'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Assets',
  description: 'Browse original creative assets — project files crafted across Photoshop, Illustrator, Premiere Pro & After Effects by Sajid Shaikh.',
}

export default async function AssetsPage() {
  const settings = await getSiteSettings()

  return (
    <>
      <AssetsPageHeader assetCount={ASSETS.length} />

      <section style={{ padding: '0 var(--margin-page)' }} className="mt-12 pb-24">
        <AssetsGallery />
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
