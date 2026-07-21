import type { Project, SiteSettings } from '@/types/project'

export const mockProjects: Project[] = [
  // ── Photoshop ──────────────────────────────────────
  {
    _id: 'ps-1',
    title: 'Aldenaire Cafe - Branding Poster',
    slug: { current: 'coffee-shop-poster' },
    year: 2024,
    discipline: ['graphic'],
    coverImageUrl: '/assets/photoshop/coffee-shop-poster.jpg',
    overview:
      'An advertisement poster designed for Aldenaire Coffee Shop. It features a realistic cup of coffee with a splash effect, designed to look appealing for promotional banners and social media campaigns.',
    gallery: [
      '/assets/photoshop/coffee-shop-poster.jpg',
    ],
    featured: true,
    featuredOrder: 1,
    tools: ['Adobe Photoshop'],
    seoDescription: 'Aldenaire Cafe - Branding Poster by Sajid Shaikh.',
  },
  {
    _id: 'ps-2',
    title: 'Coffee Splash - Product Mockup',
    slug: { current: 'coffee-splash-render' },
    year: 2024,
    discipline: ['graphic'],
    coverImageUrl: '/assets/photoshop/coffee-splash-render.jpg',
    overview:
      'A clean product showcase highlighting a coffee cup with a surrounding liquid splash on a simple background, focusing entirely on product advertising.',
    gallery: [
      '/assets/photoshop/coffee-splash-render.jpg',
    ],
    featured: true,
    featuredOrder: 2,
    tools: ['Adobe Photoshop'],
    seoDescription: 'Coffee Splash - Product Mockup by Sajid Shaikh.',
  },
  {
    _id: 'ps-3',
    title: 'Jasmine Green Tea - Refreshing Banner',
    slug: { current: 'jasmine-tea-banner' },
    year: 2024,
    discipline: ['graphic'],
    coverImageUrl: '/assets/photoshop/jasmine-tea-banner.jpg',
    overview:
      'A calming green tea brand banner featuring a glass cup filled with tea, paired with fresh tea leaves and a sunset background inside a subtle smoke frame.',
    gallery: [
      '/assets/photoshop/jasmine-tea-banner.jpg',
    ],
    featured: true,
    featuredOrder: 3,
    tools: ['Adobe Photoshop'],
    seoDescription: 'Jasmine Green Tea - Refreshing Banner by Sajid Shaikh.',
  },
  {
    _id: 'ps-4',
    title: 'World Wildlife Day - Event Poster',
    slug: { current: 'wildlife-campaign-poster' },
    year: 2024,
    discipline: ['graphic'],
    coverImageUrl: '/assets/photoshop/wildlife-campaign-poster.jpg',
    overview:
      'An event poster promoting animal conservation. It integrates wildlife images (birds, tiger, giraffe, monkey) inside the bold text "WILD LIFE" to make the message visually engaging.',
    gallery: [
      '/assets/photoshop/wildlife-campaign-poster.jpg',
    ],
    featured: false,
    tools: ['Adobe Photoshop'],
    seoDescription: 'World Wildlife Day - Event Poster by Sajid Shaikh.',
  },
  {
    _id: 'ps-5',
    title: 'Magical Gaze - Fashion Editorial',
    slug: { current: 'magical-gaze-poster' },
    year: 2024,
    discipline: ['graphic'],
    coverImageUrl: '/assets/photoshop/magical-gaze-poster.jpg',
    overview:
      'A stylish minimalist fashion poster featuring a split-portrait layout of a woman, using typography overlapping clean block colors.',
    gallery: [
      '/assets/photoshop/magical-gaze-poster.jpg',
    ],
    featured: false,
    tools: ['Adobe Photoshop'],
    seoDescription: 'Magical Gaze - Fashion Editorial by Sajid Shaikh.',
  },

  // ── Illustrator ────────────────────────────────────
  {
    _id: 'ai-1',
    title: 'Apex Identity - Rebranding System',
    slug: { current: 'rebranding-identity' },
    year: 2024,
    discipline: ['brand', 'graphic'],
    coverImageUrl: '/assets/illustrator/rebranding-identity.svg',
    overview:
      'A complete corporate visual rebranding displaying clean vector logos, minimalist typography guides, and professional color palettes designed for scale.',
    gallery: [
      '/assets/illustrator/rebranding-identity.svg',
    ],
    featured: true,
    featuredOrder: 4,
    tools: ['Adobe Illustrator'],
    seoDescription: 'Apex Identity - Rebranding System by Sajid Shaikh.',
  },
  {
    _id: 'ai-2',
    title: 'Tikkha Tales - Spicy Brand Identity',
    slug: { current: 'tikkha-tales-branding' },
    year: 2024,
    discipline: ['brand', 'graphic'],
    coverImageUrl: '/assets/illustrator/tikkha-tales-branding.jpg',
    overview:
      'Branding and packaging label designs for Tikkha Tales pickle and spices. Features jar mockups, earthy warm color schemes, and product display templates.',
    gallery: [
      '/assets/illustrator/tikkha-tales-branding.jpg',
    ],
    featured: true,
    featuredOrder: 5,
    tools: ['Adobe Illustrator'],
    seoDescription: 'Tikkha Tales - Spicy Brand Identity by Sajid Shaikh.',
  },

  // ── Premiere Pro ───────────────────────────────────
  {
    _id: 'pr-1',
    title: 'Anime Action - Editing Showreel',
    slug: { current: 'anime-reframing-reel' },
    year: 2024,
    discipline: ['video'],
    coverImageUrl: '/assets/photoshop/coffee-shop-poster.jpg',
    heroVideoUrl: '/assets/premiere-pro/anime-reframing-reel.mp4',
    overview:
      'A fast-paced video editing showreel demonstrating advanced pacing, beat-synced cuts, and dynamic reframing techniques using high-energy action sequences.',
    gallery: [],
    featured: true,
    featuredOrder: 6,
    tools: ['Adobe Premiere Pro'],
    seoDescription: 'Anime Action - Editing Showreel by Sajid Shaikh.',
  },
]

export const mockSiteSettings: SiteSettings = {
  heroPhilosophy:
    "Design is a decision, not a decoration. Every choice earns its place or it doesn't belong.",
  aboutBio:
    "I am Sajid Shaikh, a digital designer and creative based in India. I specialize in branding, graphic design, print layout, video post-production, motion graphics, and UI/UX design. I approach design as a structured decision-making process where form serves visual density and interface precision.",
  portraitImageUrl: '/assets/photoshop/coffee-shop-poster.jpg',
  cvFileUrl: '/files/cv.pdf',
  email: 'shaikhsajid3046@gmail.com',
  instagramUrl: 'https://instagram.com',
  behanceUrl: 'https://behance.net',
  linkedinUrl: 'https://linkedin.com',
  clientLogos: [],
}
