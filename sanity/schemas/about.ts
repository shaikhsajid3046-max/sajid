import { defineField, defineType } from 'sanity'

export const about = defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  // @ts-expect-error – Sanity internal API
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'bio',
      type: 'array',
      title: 'Bio (Rich Text)',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'portrait',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', type: 'string', title: 'Alt text' })],
    }),
    defineField({
      name: 'skills',
      type: 'array',
      of: [{ type: 'string' }],
      title: 'Skills List (8–10 items)',
    }),
  ],
  preview: {
    select: { title: 'bio' },
    prepare() {
      return { title: 'About Page' }
    },
  },
})
