'use client'

import { useState, useMemo } from 'react'
import { ProjectCard } from './ProjectCard'
import type { Project, Discipline } from '@/types/project'

const FILTERS: { label: string; value: Discipline | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Graphic', value: 'graphic' },
  { label: 'Brand', value: 'brand' },
  { label: 'Video', value: 'video' },
]

interface ProjectGridProps {
  projects: Project[]
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  const [active, setActive] = useState<Discipline | 'all'>('all')

  // Count projects per discipline
  const counts = useMemo(() => {
    const map: Record<string, number> = { all: projects.length }
    FILTERS.forEach(({ value }) => {
      if (value !== 'all') {
        map[value] = projects.filter((p) => p.discipline.includes(value as Discipline)).length
      }
    })
    return map
  }, [projects])

  const filtered = active === 'all'
    ? projects
    : projects.filter((p) => p.discipline.includes(active))

  return (
    <div>
      {/* Filter bar */}
      <div className="flex items-center justify-between flex-wrap gap-4 mb-12">
        <div
          className="flex gap-1 overflow-x-auto pb-1 no-scrollbar"
          role="tablist"
          aria-label="Filter projects by discipline"
        >
          {FILTERS.map(({ label, value }) => (
            <button
              key={value}
              role="tab"
              aria-selected={active === value}
              onClick={() => setActive(value)}
              data-active={active === value}
              className="filter-underline text-label whitespace-nowrap px-4 py-2 transition-colors duration-200"
              style={{
                color: active === value ? 'var(--accent)' : 'var(--muted)',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {label}
              <span
                className="ml-1"
                style={{
                  opacity: 0.5,
                  fontSize: '10px',
                }}
              >
                ({counts[value] ?? 0})
              </span>
            </button>
          ))}
        </div>

        {/* Results count */}
        <span className="text-label" style={{ color: 'var(--muted)' }}>
          {filtered.length} {filtered.length === 1 ? 'result' : 'results'}
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2">
        {filtered.map((project, i) => (
          <ProjectCard key={project._id} project={project} index={i} />
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div
          className="flex flex-col items-center justify-center py-24"
          style={{ color: 'var(--muted)' }}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <p className="text-body-sm mt-4">No projects found in this category.</p>
        </div>
      )}
    </div>
  )
}
