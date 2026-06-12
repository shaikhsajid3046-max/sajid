import { defineField, defineType } from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'year',
      type: 'number',
      validation: (R) => R.required().min(2015).max(2035),
    }),
    defineField({
      name: 'discipline',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Graphic Design', value: 'graphic' },
          { title: 'UI/UX', value: 'uiux' },
          { title: 'Video Editing', value: 'video' },
          { title: 'Motion Design', value: 'motion' },
          { title: 'Brand Identity', value: 'brand' },
          { title: 'Creative Direction', value: 'creative-direction' },
          { title: 'Media Design', value: 'media' },
        ],
      },
    }),
    defineField({ name: 'client', type: 'string' }),
    defineField({
      name: 'coverImage',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', type: 'string', title: 'Alt text' })],
    }),
    defineField({
      name: 'heroVideoUrl',
      type: 'url',
      title: 'Hero Video URL (Cloudinary)',
    }),
    defineField({
      name: 'overview',
      type: 'text',
      title: 'Project Overview (100–200 words)',
      validation: (R) => R.required().min(80).max(400),
    }),
    defineField({
      name: 'gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [defineField({ name: 'alt', type: 'string', title: 'Alt text' })],
        },
      ],
    }),
    defineField({
      name: 'featured',
      type: 'boolean',
      title: 'Show on Homepage',
      initialValue: false,
    }),
    defineField({
      name: 'featuredOrder',
      type: 'number',
      title: 'Homepage Order (1–8)',
    }),
    defineField({ name: 'credits', type: 'text' }),
    defineField({
      name: 'seoDescription',
      type: 'text',
      title: 'SEO Description',
      validation: (R) => R.max(160),
    }),
  ],
  orderings: [
    {
      title: 'Year (Newest)',
      name: 'yearDesc',
      by: [{ field: 'year', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'year', media: 'coverImage' },
  },
})
