import type { Project, SiteSettings } from '@/types/project'

export const mockProjects: Project[] = [
  {
    _id: 'mock-1',
    title: 'Meridian Brand Identity',
    slug: { current: 'meridian-brand-identity' },
    year: 2024,
    discipline: ['brand', 'graphic'],
    client: 'Meridian Studio',
    coverImage: { _type: 'image', asset: { _ref: '', _type: 'reference' } },
    overview:
      'A comprehensive visual identity system built around typographic tension and a restrained gold-and-black palette. The mark anchors an entire system of print, digital, and environmental applications.',
    gallery: [],
    featured: true,
    featuredOrder: 1,
    seoDescription: 'Brand identity system for Meridian Studio.',
  },
  {
    _id: 'mock-2',
    title: 'Vanta Editorial Campaign',
    slug: { current: 'vanta-editorial-campaign' },
    year: 2024,
    discipline: ['graphic', 'media'],
    client: 'Vanta Magazine',
    coverImage: { _type: 'image', asset: { _ref: '', _type: 'reference' } },
    overview:
      'A six-spread editorial campaign exploring the tension between structure and chaos. Typography as image — each layout constructed so the words themselves form the composition.',
    gallery: [],
    featured: true,
    featuredOrder: 2,
    seoDescription: 'Editorial campaign for Vanta Magazine.',
  },
  {
    _id: 'mock-3',
    title: 'Fader UI Design System',
    slug: { current: 'fader-ui-design-system' },
    year: 2024,
    discipline: ['uiux'],
    client: 'Fader App',
    coverImage: { _type: 'image', asset: { _ref: '', _type: 'reference' } },
    overview:
      'End-to-end UI system for a music production tool. Dark, tactile, and precise — built for professionals who live inside the interface for hours at a stretch.',
    gallery: [],
    featured: true,
    featuredOrder: 3,
    seoDescription: 'UI design system for Fader App.',
  },
  {
    _id: 'mock-4',
    title: 'Contour — Motion Reel',
    slug: { current: 'contour-motion-reel' },
    year: 2023,
    discipline: ['motion', 'video'],
    client: 'Contour Agency',
    coverImage: { _type: 'image', asset: { _ref: '', _type: 'reference' } },
    heroVideoUrl: '',
    overview:
      'Motion reel direction for a creative agency relaunch. Every frame is a considered frame — transitions as transitions, not decoration.',
    gallery: [],
    featured: true,
    featuredOrder: 4,
    seoDescription: 'Motion reel for Contour Agency.',
  },
  {
    _id: 'mock-5',
    title: 'Archive Typeface Specimen',
    slug: { current: 'archive-typeface-specimen' },
    year: 2023,
    discipline: ['graphic'],
    coverImage: { _type: 'image', asset: { _ref: '', _type: 'reference' } },
    overview:
      'Specimen booklet for an independent type foundry. Print-first design with a digital counterpart — every layout decision made to reveal how the typeface moves.',
    gallery: [],
    featured: true,
    featuredOrder: 5,
    seoDescription: 'Typeface specimen for Archive Foundry.',
  },
  {
    _id: 'mock-6',
    title: 'Rova Creative Direction',
    slug: { current: 'rova-creative-direction' },
    year: 2023,
    discipline: ['creative-direction', 'brand'],
    client: 'Rova',
    coverImage: { _type: 'image', asset: { _ref: '', _type: 'reference' } },
    overview:
      'Creative direction for a D2C lifestyle brand from zero. Defined the visual language, art directed the campaign, and set the rules for how the brand behaves across every surface.',
    gallery: [],
    featured: true,
    featuredOrder: 6,
    seoDescription: 'Creative direction for Rova lifestyle brand.',
  },
]

export const mockSiteSettings: SiteSettings = {
  heroPhilosophy:
    'Design is a decision, not a decoration. Every choice earns its place or it doesn\'t belong.',
  email: 'hello@sajidsheikh.com',
  instagramUrl: 'https://instagram.com',
  behanceUrl: 'https://behance.net',
  linkedinUrl: 'https://linkedin.com',
  clientLogos: [],
}
