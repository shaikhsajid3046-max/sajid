import { SplitText } from '@/components/ui/SplitText'

const SERVICES = [
  'Graphic Design',
  'Media Design',
  'UI / UX Design',
  'Video Editing',
  'Creative Direction',
  'Brand Identity',
]

export function Services() {
  return (
    <section
      className="section-spacing"
      style={{ padding: '0 var(--margin-page)' }}
    >
      <div className="mb-12 flex items-baseline gap-8">
        <span className="section-label">04</span>
        <SplitText as="h2" className="text-display-lg font-display">
          Services
        </SplitText>
      </div>

      <ul className="grid grid-cols-1 gap-0 md:grid-cols-2">
        {SERVICES.map((service) => (
          <li
            key={service}
            className="py-5 text-body-xl"
            style={{
              borderTop: '1px solid var(--border)',
              color: 'var(--white)',
              fontFamily: 'var(--font-display)',
            }}
          >
            {service}
          </li>
        ))}
      </ul>
    </section>
  )
}
