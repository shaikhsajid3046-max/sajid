import { mockProjects, mockSiteSettings } from './mockData'
import type { Project, SiteSettings } from '@/types/project'

export async function getAllProjects(): Promise<Project[]> {
  // Simulate an async fetch to preserve async/await signatures in routing and components
  return Promise.resolve(mockProjects)
}

export async function getFeaturedProjects(): Promise<Project[]> {
  return Promise.resolve(mockProjects.filter((p) => p.featured))
}

export async function getProject(slug: string): Promise<Project | null> {
  const project = mockProjects.find((p) => p.slug.current === slug) ?? null
  return Promise.resolve(project)
}

export async function getSiteSettings(): Promise<SiteSettings> {
  return Promise.resolve(mockSiteSettings)
}
