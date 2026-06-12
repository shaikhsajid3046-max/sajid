import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  // @ts-expect-error – Sanity internal API
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({ name: 'heroPhilosophy', type: 'text', title: 'Hero Philosophy Statement' }),
    defineField({
      name: 'aboutBio',
      type: 'array',
      of: [{ type: 'block' }],
      title: 'About Bio (Rich Text)',
    }),
    defineField({
      name: 'portraitImage',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', type: 'string' })],
    }),
    defineField({ name: 'cvFile', type: 'file', title: 'CV PDF' }),
    defineField({ name: 'email', type: 'string' }),
    defineField({ name: 'instagramUrl', type: 'url' }),
    defineField({ name: 'behanceUrl', type: 'url' }),
    defineField({ name: 'linkedinUrl', type: 'url' }),
    defineField({
      name: 'clientLogos',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name', type: 'string' }),
            defineField({
              name: 'logo',
              type: 'image',
              fields: [defineField({ name: 'alt', type: 'string' })],
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' }
    },
  },
})
