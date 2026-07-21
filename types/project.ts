export interface ImageAsset {
  src: string
  alt?: string
}

export type Discipline =
  | 'graphic'
  | 'uiux'
  | 'video'
  | 'motion'
  | 'brand'
  | 'creative-direction'
  | 'media'

export const DISCIPLINE_LABELS: Record<Discipline, string> = {
  graphic: 'Graphic Design',
  uiux: 'UI/UX',
  video: 'Video Editing',
  motion: 'Motion Design',
  brand: 'Brand Identity',
  'creative-direction': 'Creative Direction',
  media: 'Media Design',
}

export interface Project {
  _id: string
  title: string
  slug: { current: string }
  year: number
  discipline: Discipline[]
  client?: string
  coverImageUrl: string   // Direct local or external image URL
  heroVideoUrl?: string
  overview: string
  gallery: string[]       // Direct array of image URLs
  featured: boolean
  featuredOrder?: number
  credits?: string
  seoDescription?: string
  tools?: string[]
}

export interface SiteSettings {
  heroPhilosophy?: string
  aboutBio?: string       // Direct text bio
  portraitImageUrl?: string
  cvFileUrl?: string
  email?: string
  instagramUrl?: string
  behanceUrl?: string
  linkedinUrl?: string
  clientLogos?: { name: string; logoUrl: string }[]
}
