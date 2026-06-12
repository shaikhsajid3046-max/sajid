import Image from 'next/image'
import { urlForImageString } from '@/lib/sanity/image'
import type { Project } from '@/types/project'

interface ProjectHeroProps {
  project: Project
}

export function ProjectHero({ project }: ProjectHeroProps) {
  const hasCover = Boolean(project.coverImage?.asset?._ref)
  const coverSrc = urlForImageString(project.coverImage, 2400)

  return (
    <div className="relative w-full" style={{ aspectRatio: '16/9', maxHeight: '90vh' }}>
      {project.heroVideoUrl ? (
        <video
          src={project.heroVideoUrl}
          autoPlay
          muted
          loop
          playsInline
          poster={hasCover ? coverSrc : undefined}
          className="h-full w-full object-cover"
          aria-label={`${project.title} hero video`}
        />
      ) : hasCover ? (
        <Image
          src={coverSrc}
          alt={project.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      ) : (
        <div
          className="h-full w-full flex items-center justify-center"
          style={{ backgroundColor: 'var(--surface)' }}
        >
          <span className="text-label" style={{ color: 'var(--muted)' }}>{project.title}</span>
        </div>
      )}
    </div>
  )
}
