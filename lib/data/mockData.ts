import type { Project, SiteSettings } from '@/types/project'

export const mockProjects: Project[] = [
  // ── Photoshop ──────────────────────────────────────
  {
    _id: 'ps-dope',
    title: 'Dope Stuff Everyday',
    slug: { current: 'dope-stuff-everyday' },
    year: 2024,
    discipline: ['graphic'],
    coverImageUrl: '/assets/photoshop/dope-stuff-everyday.jpg',
    overview:
      'A high-energy urban typography poster blending bold street aesthetics, textured layering, and dynamic composition to capture contemporary creative culture.',
    gallery: [
      '/assets/photoshop/dope-stuff-everyday.jpg',
    ],
    featured: true,
    featuredOrder: 1,
    tools: ['Adobe Photoshop'],
    seoDescription: 'Dope Stuff Everyday poster design by Sajid Shaikh.',
  },
  {
    _id: 'ps-fashion',
    title: 'Experimental Fashion',
    slug: { current: 'experimental-fashion' },
    year: 2024,
    discipline: ['graphic'],
    coverImageUrl: '/assets/photoshop/experimental-fashion-poster.jpg',
    overview:
      'An avant-garde editorial poster merging high-fashion portraiture with experimental typography, intentional negative space, and monochromatic tension.',
    gallery: [
      '/assets/photoshop/experimental-fashion-poster.jpg',
    ],
    featured: true,
    featuredOrder: 3,
    tools: ['Adobe Photoshop'],
    seoDescription: 'Experimental Fashion poster by Sajid Shaikh.',
  },
  {
    _id: 'ps-1',
    title: 'Coffee Shop Poster',
    slug: { current: 'coffee-shop-poster' },
    year: 2024,
    discipline: ['graphic'],
    coverImageUrl: '/assets/photoshop/coffee-shop-poster.jpg',
    overview:
      'An advertisement poster designed for an artisanal coffee house. Features dynamic liquid splash composites, rich roasting tones, and clean promotional typography.',
    gallery: [
      '/assets/photoshop/coffee-shop-poster.jpg',
    ],
    featured: true,
    featuredOrder: 4,
    tools: ['Adobe Photoshop'],
    seoDescription: 'Coffee Shop Poster by Sajid Shaikh.',
  },
  {
    _id: 'ps-french-fries',
    title: 'French Fries Commercial',
    slug: { current: 'french-fries-poster' },
    year: 2024,
    discipline: ['graphic'],
    coverImageUrl: '/assets/photoshop/french-fries-poster.jpg',
    overview:
      'Vibrant fast-food advertising poster highlighting crispy textures, dynamic angle composition, and appetizing visual contrast for social and print campaigns.',
    gallery: [
      '/assets/photoshop/french-fries-poster.jpg',
    ],
    featured: false,
    tools: ['Adobe Photoshop'],
    seoDescription: 'French Fries poster design by Sajid Shaikh.',
  },
  {
    _id: 'ps-orange-juice',
    title: 'Citrus Splash Poster',
    slug: { current: 'citrus-splash-poster' },
    year: 2024,
    discipline: ['graphic'],
    coverImageUrl: '/assets/photoshop/orange-juice-poster.jpg',
    overview:
      'A revitalizing beverage advertisement featuring crisp citrus fruit slices, dynamic fluid splashes, and sunlit color palettes crafted for summer campaigns.',
    gallery: [
      '/assets/photoshop/orange-juice-poster.jpg',
    ],
    featured: false,
    tools: ['Adobe Photoshop'],
    seoDescription: 'Orange Juice beverage poster by Sajid Shaikh.',
  },
  {
    _id: 'ps-maggi',
    title: 'Noodle Bowl Campaign',
    slug: { current: 'noodle-bowl-campaign' },
    year: 2024,
    discipline: ['graphic'],
    coverImageUrl: '/assets/photoshop/yummy-maggi-poster.jpg',
    overview:
      'Warm comfort-food poster capturing appetizing noodle textures, spicy seasoning aesthetics, and playful modern advertising layout.',
    gallery: [
      '/assets/photoshop/yummy-maggi-poster.jpg',
    ],
    featured: false,
    tools: ['Adobe Photoshop'],
    seoDescription: 'Yummy Maggi noodle poster by Sajid Shaikh.',
  },
  {
    _id: 'ps-believing',
    title: 'Believing in Yourself',
    slug: { current: 'believing-in-yourself' },
    year: 2024,
    discipline: ['graphic'],
    coverImageUrl: '/assets/photoshop/believing-in-yourself.jpg',
    overview:
      'Inspirational graphic artwork featuring intricate layered typography, motivational visual hierarchy, and polished digital composite techniques.',
    gallery: [
      '/assets/photoshop/believing-in-yourself.jpg',
    ],
    featured: false,
    tools: ['Adobe Photoshop'],
    seoDescription: 'Believing in Yourself artwork by Sajid Shaikh.',
  },
  {
    _id: 'ps-3',
    title: 'Jasmine Tea Banner',
    slug: { current: 'jasmine-tea-banner' },
    year: 2024,
    discipline: ['graphic'],
    coverImageUrl: '/assets/photoshop/jasmine-tea-banner.jpg',
    overview:
      'A calming green tea brand banner featuring a glass cup filled with tea, paired with fresh tea leaves and a sunset background inside a subtle smoke frame.',
    gallery: [
      '/assets/photoshop/jasmine-tea-banner.jpg',
    ],
    featured: false,
    tools: ['Adobe Photoshop'],
    seoDescription: 'Jasmine Tea Banner by Sajid Shaikh.',
  },
  {
    _id: 'ps-4',
    title: 'Wildlife Conservation',
    slug: { current: 'wildlife-campaign-poster' },
    year: 2024,
    discipline: ['graphic'],
    coverImageUrl: '/assets/photoshop/wildlife-campaign-poster.jpg',
    overview:
      'An environmental campaign poster promoting animal conservation. Integrates wildlife imagery within bold letterforms to make the conservation message visually urgent.',
    gallery: [
      '/assets/photoshop/wildlife-campaign-poster.jpg',
    ],
    featured: false,
    tools: ['Adobe Photoshop'],
    seoDescription: 'Wildlife Campaign Poster by Sajid Shaikh.',
  },
  {
    _id: 'ps-5',
    title: 'Magical Gaze',
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
    seoDescription: 'Magical Gaze Poster by Sajid Shaikh.',
  },

  // ── Illustrator ────────────────────────────────────
  {
    _id: 'ai-2',
    title: 'Tikkha Tales Branding',
    slug: { current: 'tikkha-tales-branding' },
    year: 2024,
    discipline: ['brand', 'graphic'],
    coverImageUrl: '/assets/illustrator/tikkha-tales-branding.jpg',
    overview:
      'Branding and packaging label designs for Tikkha Tales artisanal spices and pickles. Features jar mockups, earthy warm color schemes, and authentic product display templates.',
    gallery: [
      '/assets/illustrator/tikkha-tales-branding.jpg',
    ],
    featured: true,
    featuredOrder: 2,
    tools: ['Adobe Illustrator'],
    seoDescription: 'Tikkha Tales Branding by Sajid Shaikh.',
  },
  {
    _id: 'ai-street',
    title: 'Urban Street Illustration',
    slug: { current: 'urban-street-illustration' },
    year: 2024,
    discipline: ['graphic'],
    coverImageUrl: '/assets/illustrator/street-image.jpg',
    overview:
      'A richly detailed urban landscape illustration capturing architectural layers, street culture, and vibrant color harmonies with stylized line work.',
    gallery: [
      '/assets/illustrator/street-image.jpg',
    ],
    featured: false,
    tools: ['Adobe Illustrator'],
    seoDescription: 'Urban Street Illustration by Sajid Shaikh.',
  },
  {
    _id: 'ai-girl',
    title: 'Vector Character Art',
    slug: { current: 'vector-character-art' },
    year: 2024,
    discipline: ['graphic'],
    coverImageUrl: '/assets/illustrator/girl-vector-art.jpg',
    overview:
      'Stylized vector portrait artwork exploring precise bezier curve craft, expressive facial features, and modern digital character illustration aesthetics.',
    gallery: [
      '/assets/illustrator/girl-vector-art.jpg',
    ],
    featured: false,
    tools: ['Adobe Illustrator'],
    seoDescription: 'Vector Character Art by Sajid Shaikh.',
  },
  {
    _id: 'ai-cat',
    title: 'Feline Vector Art',
    slug: { current: 'feline-vector-art' },
    year: 2024,
    discipline: ['graphic'],
    coverImageUrl: '/assets/illustrator/cat-vector-art.jpg',
    overview:
      'Charming and clean feline character illustration showcasing delicate linework, modern flat shading, and stylized graphic appeal.',
    gallery: [
      '/assets/illustrator/cat-vector-art.jpg',
    ],
    featured: false,
    tools: ['Adobe Illustrator'],
    seoDescription: 'Cat Vector Illustration by Sajid Shaikh.',
  },
  {
    _id: 'ai-dog',
    title: 'Canine Vector Portrait',
    slug: { current: 'canine-vector-portrait' },
    year: 2024,
    discipline: ['graphic'],
    coverImageUrl: '/assets/illustrator/dog-vector-art.jpg',
    overview:
      'Expressive canine vector illustration emphasizing anatomical contours, playful personality, and crisp scalable vector detailing.',
    gallery: [
      '/assets/illustrator/dog-vector-art.jpg',
    ],
    featured: false,
    tools: ['Adobe Illustrator'],
    seoDescription: 'Dog Vector Art by Sajid Shaikh.',
  },
  {
    _id: 'ai-cafe',
    title: 'Café Collateral & Art',
    slug: { current: 'cafe-collateral-art' },
    year: 2024,
    discipline: ['brand', 'graphic'],
    coverImageUrl: '/assets/illustrator/cafe.jpg',
    overview:
      'Editorial collateral and decorative graphics designed for modern cafe interior spaces, menus, and branded takeaway items.',
    gallery: [
      '/assets/illustrator/cafe.jpg',
    ],
    featured: false,
    tools: ['Adobe Illustrator'],
    seoDescription: 'Café Collateral & Art by Sajid Shaikh.',
  },
  {
    _id: 'ai-background',
    title: 'Geometric Backgrounds',
    slug: { current: 'geometric-background-design' },
    year: 2024,
    discipline: ['graphic'],
    coverImageUrl: '/assets/illustrator/background-design.jpg',
    overview:
      'A series of modular geometric background designs exploring mathematical patterns, abstract gradients, and visual rhythm for digital backdrops.',
    gallery: [
      '/assets/illustrator/background-design.jpg',
    ],
    featured: false,
    tools: ['Adobe Illustrator'],
    seoDescription: 'Geometric Background Design by Sajid Shaikh.',
  },

  // ── Premiere Pro ───────────────────────────────────
  {
    _id: 'pr-1',
    title: 'Anime Reel',
    slug: { current: 'anime-reel' },
    year: 2024,
    discipline: ['video'],
    coverImageUrl: '/assets/premiere-pro/anime-reel-landscape-poster.jpg',
    heroVideoUrl: '/assets/premiere-pro/anime-reel-landscape.mp4',
    overview:
      'A high-octane editing showreel demonstrating rhythmic pacing, audio-visual synchronicity, and dynamic reframing techniques across high-energy action sequences.',
    gallery: [],
    featured: false,
    tools: ['Adobe Premiere Pro'],
    seoDescription: 'Anime Reel by Sajid Shaikh.',
  },
  {
    _id: 'pr-2',
    title: 'Video Editing Showreel',
    slug: { current: 'video-editing-showreel' },
    year: 2024,
    discipline: ['video'],
    coverImageUrl: '/assets/premiere-pro/show-reel-poster.jpg',
    heroVideoUrl: '/assets/premiere-pro/show-reel.mp4',
    overview:
      'A comprehensive commercial video editing showreel showcasing narrative pacing, audio mastering, seamless cuts, and color grading across varied creative genres.',
    gallery: [],
    featured: false,
    tools: ['Adobe Premiere Pro'],
    seoDescription: 'Show Reel by Sajid Shaikh.',
  },

  // ── After Effects ──────────────────────────────────
  {
    _id: 'ae-1',
    title: 'Motion Graphics Reel',
    slug: { current: 'ae-showreel' },
    year: 2024,
    discipline: ['motion'],
    coverImageUrl: '/assets/after-effects/ae-showreel-poster.jpg',
    heroVideoUrl: '/assets/after-effects/ae-showreel.mp4',
    overview:
      'A kinetic motion graphics reel highlighting typography animation, particle systems, seamless camera transitions, and visual effects composited in After Effects.',
    gallery: [],
    featured: false,
    tools: ['Adobe After Effects'],
    seoDescription: 'After Effects Show Reel by Sajid Shaikh.',
  },
]

export const mockSiteSettings: SiteSettings = {
  heroPhilosophy:
    "Design is a decision, not a decoration. Every choice earns its place or it doesn't belong.",
  aboutBio:
    "I am Sajid Shaikh, a digital designer and creative based in India. I specialize in branding, graphic design, print layout, video post-production, motion graphics, and UI/UX design. I approach design as a structured decision-making process where form serves visual density and interface precision.",
  portraitImageUrl: '/assets/photoshop/dope-stuff-everyday.jpg',
  cvFileUrl: '/files/cv.pdf',
  email: 'shaikhsajid3046@gmail.com',
  behanceUrl: 'https://www.behance.net/sajidshaikh83',
  linkedinUrl: 'https://www.linkedin.com/in/sajid-shaikh-13b528416/',
  clientLogos: [],
}
