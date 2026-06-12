'use client'

import { useState } from 'react'
import { ProjectCard } from './ProjectCard'
import { DISCIPLINE_LABELS } from '@/types/project'
import type { Project, Discipline } from '@/types/project'

const FILTERS: { label: string; value: Discipline | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Graphic', value: 'graphic' },
  { label: 'UI/UX', value: 'uiux' },
  { label: 'Video', value: 'video' },
  { label: 'Motion', value: 'motion' },
  { label: 'Brand', value: 'brand' },
]

interface ProjectGridProps {
  projects: Project[]
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  const [active, setActive] = useState<Discipline | 'all'>('all')

  const filtered = active === 'all'
    ? projects
    : projects.filter((p) => p.discipline.includes(active))

  return (
    <div>
      {/* Filter bar */}
      <div
        className="flex gap-2 overflow-x-auto pb-1 mb-12"
        role="tablist"
        aria-label="Filter projects by discipline"
      >
        {FILTERS.map(({ label, value }) => (
          <button
            key={value}
            role="tab"
            aria-selected={active === value}
            onClick={() => setActive(value)}
            className="swap-btn text-label whitespace-nowrap rounded-full px-4 py-2 transition-colors duration-200"
            style={{
              border: '1px solid var(--border)',
              color: active === value ? 'var(--black)' : 'var(--muted)',
              backgroundColor: active === value ? 'var(--white)' : 'transparent',
            }}
          >
            <span className="swap-btn__text">{label}</span>
            <span className="swap-btn__clone" aria-hidden="true">{label}</span>
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2">
        {filtered.map((project, i) => (
          <ProjectCard key={project._id} project={project} index={i} />
        ))}
      </div>
    </div>
  )
}
