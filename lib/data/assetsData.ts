export type Software = 'photoshop' | 'illustrator' | 'premiere-pro' | 'after-effects'

export interface Asset {
  id: string
  title: string
  src: string
  software: Software
  format: string
  poster?: string
}

export const SOFTWARE_META: Record<Software, { label: string; color: string; icon: string }> = {
  photoshop:      { label: 'Photoshop',     color: '#31A8FF', icon: 'Ps' },
  illustrator:    { label: 'Illustrator',   color: '#FF9A00', icon: 'Ai' },
  'premiere-pro': { label: 'Premiere Pro',  color: '#9999FF', icon: 'Pr' },
  'after-effects':{ label: 'After Effects', color: '#CF96FD', icon: 'Ae' },
}

export const ASSETS: Asset[] = [
  // ── Photoshop ──────────────────────────────────────
  { id: 'ps-dope',     title: 'Dope Stuff Everyday',        src: '/assets/photoshop/dope-stuff-everyday.jpg',             software: 'photoshop',      format: 'PSD' },
  { id: 'ps-fashion',  title: 'Experimental Fashion',       src: '/assets/photoshop/experimental-fashion-poster.jpg',      software: 'photoshop',      format: 'PSD' },
  { id: 'ps-1',        title: 'Coffee Shop Poster',         src: '/assets/photoshop/coffee-shop-poster.jpg',              software: 'photoshop',      format: 'PSD' },
  { id: 'ps-french',   title: 'French Fries Commercial',    src: '/assets/photoshop/french-fries-poster.jpg',             software: 'photoshop',      format: 'PSD' },
  { id: 'ps-orange',   title: 'Citrus Splash Poster',       src: '/assets/photoshop/orange-juice-poster.jpg',             software: 'photoshop',      format: 'PSD' },
  { id: 'ps-maggi',    title: 'Noodle Bowl Campaign',       src: '/assets/photoshop/yummy-maggi-poster.jpg',              software: 'photoshop',      format: 'PSD' },
  { id: 'ps-believing',title: 'Believing in Yourself',      src: '/assets/photoshop/believing-in-yourself.jpg',           software: 'photoshop',      format: 'PSD' },
  { id: 'ps-3',        title: 'Jasmine Tea Banner',          src: '/assets/photoshop/jasmine-tea-banner.jpg',              software: 'photoshop',      format: 'PSD' },
  { id: 'ps-4',        title: 'Wildlife Conservation',      src: '/assets/photoshop/wildlife-campaign-poster.jpg',        software: 'photoshop',      format: 'PSD' },
  { id: 'ps-5',        title: 'Magical Gaze',               src: '/assets/photoshop/magical-gaze-poster.jpg',             software: 'photoshop',      format: 'PSD' },

  // ── Illustrator ────────────────────────────────────
  { id: 'ai-2',        title: 'Tikkha Tales Branding',       src: '/assets/illustrator/tikkha-tales-branding.jpg',         software: 'illustrator',    format: 'AI'  },
  { id: 'ai-street',   title: 'Urban Street Illustration',   src: '/assets/illustrator/street-image.jpg',                  software: 'illustrator',    format: 'JPG' },
  { id: 'ai-girl',     title: 'Vector Character Art',        src: '/assets/illustrator/girl-vector-art.jpg',               software: 'illustrator',    format: 'AI'  },
  { id: 'ai-cat',      title: 'Feline Vector Art',           src: '/assets/illustrator/cat-vector-art.jpg',                software: 'illustrator',    format: 'AI'  },
  { id: 'ai-dog',      title: 'Canine Vector Portrait',      src: '/assets/illustrator/dog-vector-art.jpg',                software: 'illustrator',    format: 'AI'  },
  { id: 'ai-cafe',     title: 'Café Collateral & Art',       src: '/assets/illustrator/cafe.jpg',                          software: 'illustrator',    format: 'AI'  },
  { id: 'ai-bg',       title: 'Geometric Backgrounds',       src: '/assets/illustrator/background-design.jpg',             software: 'illustrator',    format: 'AI'  },

  // ── Premiere Pro ───────────────────────────────────
  { id: 'pr-1',        title: 'Anime Reel',                  src: '/assets/premiere-pro/anime-reel-landscape.mp4',         software: 'premiere-pro',   format: 'MP4', poster: '/assets/premiere-pro/anime-reel-landscape-poster.jpg' },
  { id: 'pr-2',        title: 'Video Editing Showreel',      src: '/assets/premiere-pro/show-reel.mp4',                    software: 'premiere-pro',   format: 'MP4', poster: '/assets/premiere-pro/show-reel-poster.jpg' },

  // ── After Effects ──────────────────────────────────
  { id: 'ae-1',        title: 'Motion Graphics Reel',        src: '/assets/after-effects/ae-showreel.mp4',                 software: 'after-effects',  format: 'MP4', poster: '/assets/after-effects/ae-showreel-poster.jpg' },
]

