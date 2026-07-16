import { sanityClient, isSanityConfigured } from './client'
import { mockProjects, mockSiteSettings } from '@/lib/data/mockData'
import type { Project, SiteSettings } from '@/types/project'

export async function getAllProjects(): Promise<Project[]> {
  if (!isSanityConfigured) return mockProjects

  return sanityClient.fetch<Project[]>(
    `*[_type == "project"] | order(year desc) {
      _id, title, slug, year, discipline, client,
      coverImage, heroVideoUrl, overview, gallery,
      featured, featuredOrder, credits, seoDescription, tools
    }`
  )
}

export async function getFeaturedProjects(): Promise<Project[]> {
  if (!isSanityConfigured) return mockProjects.filter((p) => p.featured)

  return sanityClient.fetch<Project[]>(
    `*[_type == "project" && featured == true] | order(featuredOrder asc) {
      _id, title, slug, year, discipline, client,
      coverImage, heroVideoUrl, overview, gallery,
      featured, featuredOrder, tools
    }`
  )
}

export async function getProject(slug: string): Promise<Project | null> {
  if (!isSanityConfigured) {
    return mockProjects.find((p) => p.slug.current === slug) ?? null
  }

  return sanityClient.fetch<Project | null>(
    `*[_type == "project" && slug.current == $slug][0] {
      _id, title, slug, year, discipline, client,
      coverImage, heroVideoUrl, overview, gallery,
      featured, featuredOrder, credits, seoDescription, tools
    }`,
    { slug }
  )
}

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!isSanityConfigured) return mockSiteSettings

  const settings = await sanityClient.fetch<SiteSettings | null>(
    `*[_type == "siteSettings"][0] {
      heroPhilosophy, aboutBio, portraitImage,
      cvFile, email, instagramUrl, behanceUrl, linkedinUrl,
      clientLogos
    }`
  )

  return settings ?? mockSiteSettings
}
