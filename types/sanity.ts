export type SanityBody<T> = T & {
  _id: string
  _type: string
  _createdAt: string
  _updatedAt: string
  _rev: string
}

export interface SanitySlug {
  current: string
  _type: 'slug'
}
