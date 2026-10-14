import { useRef } from 'react'
import { projects, NONE_IMG } from '../data.js'
import TechIcon from './TechIcon.jsx'

function ProjectCard({ p }) {
  const ref = useRef(null)

  const onMove = (e) => {
    if (e.pointerType !== 'mouse') return
    const el = ref.current
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    el.style.setProperty('--px', `${px * 100}%`)
    el.style.setProperty('--py', `${py * 100}%`)
    el.style.setProperty('--rx', `${(0.5 - py) * 10}deg`)
    el.style.setProperty('--ry', `${(px - 0.5) * 12}deg`)
  }
  const onLeave = () => {
    ref.current.style.setProperty('--rx', '0deg')
    ref.current.style.setProperty('--ry', '0deg')
  }

  return (
    <article
      className="project"
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ '--c1': p.c1, '--c2': p.c2, '--img': p.img || NONE_IMG }}
    >
      <div className="project-cover"><b>{p.kind}</b></div>
      <div className="project-body">
        <strong>{p.title}</strong>
        <span>{p.text}</span>
        <ul className="stack">
          {p.stack.map((t) => (
            <li key={t}><TechIcon name={t} />{t}</li>
          ))}
        </ul>
        {p.links.length > 0 && (
          <div className="project-links">
            {p.links.map((l) => (
              <a key={l.label} href={l.href} target="_blank" rel="noreferrer">{l.label}</a>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}

export default function Projects() {
  return (
    <section className="block">
      <h2>Mes projets</h2>
      <div className="grid">
        {projects.map((p) => (
          <ProjectCard key={p.title} p={p} />
        ))}
      </div>
    </section>
  )
}
