import { SplitText } from '@/components/ui/SplitText'

const SKILLS = [
  { name: 'Adobe Photoshop', icon: 'Ps', color: '#00C8FF', bg: '#001C26' },
  { name: 'Adobe Illustrator', icon: 'Ai', color: '#FF9A00', bg: '#261300' },
  { name: 'Adobe Premiere Pro', icon: 'Pr', color: '#EA76FF', bg: '#130026' },
  { name: 'Adobe After Effects', icon: 'Ae', color: '#D199FF', bg: '#1D0026' },
  { name: 'Adobe InDesign', icon: 'Id', color: '#FF00A0', bg: '#260017' },
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
          Skills
        </SplitText>
      </div>

      <ul className="grid grid-cols-1 gap-0 md:grid-cols-2">
        {SKILLS.map((skill) => (
          <li
            key={skill.name}
            className="py-5 text-body-xl flex items-center gap-4 transition-colors duration-300 hover:opacity-90"
            style={{
              borderTop: '1px solid var(--border)',
              color: 'var(--white)',
              fontFamily: 'var(--font-display)',
            }}
          >
            <span
              className="inline-flex items-center justify-center rounded text-xs font-bold w-8 h-8 shrink-0 select-none"
              style={{
                backgroundColor: skill.bg,
                color: skill.color,
                border: `1px solid ${skill.color}40`,
                fontFamily: 'sans-serif',
              }}
            >
              {skill.icon}
            </span>
            <span>{skill.name}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export const Skills = Services

