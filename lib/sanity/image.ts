import imageUrlBuilder from '@sanity/image-url'
import { sanityClient } from './client'
import type { SanityImage } from '@/types/project'

const builder = imageUrlBuilder(sanityClient)

export function urlForImage(source: SanityImage | null | undefined) {
  if (!source?.asset?._ref) return null
  return builder.image(source)
}

export function urlForImageString(
  source: SanityImage | null | undefined,
  width?: number
): string {
  const url = urlForImage(source)
  if (!url) return '/images/placeholder.jpg'
  if (width) return url.width(width).auto('format').url()
  return url.auto('format').url()
}
