import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { profile, projects, NONE_IMG } from '../data.js'

const fan = projects.slice(0, 4)

// Dossier 3D en verre : s'incline avec la souris, les cartes sortent quand on s'approche.
export default function Folder() {
  const ref = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const el = ref.current
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const fine = window.matchMedia('(pointer: fine)').matches
    if (reduce) {
      el.style.setProperty('--o', 0.4)
      return
    }
    if (!fine) {
      // Téléphone : éventail ouvert + léger balancement en CSS (pas de calcul JS en continu)
      el.style.setProperty('--o', 0.55)
      el.classList.add('sway')
      return
    }

    let tx = 0, ty = 0, to = 0
    let x = 0, y = 0, o = 0
    let raf = 0, t = 0

    const move = (e) => {
      tx = e.clientX / innerWidth - 0.5
      ty = e.clientY / innerHeight - 0.5
      const r = el.getBoundingClientRect()
      const d = Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2))
      to = Math.max(0, Math.min(1, 1.15 - d / (r.width * 0.9)))
      if (!raf) raf = requestAnimationFrame(loop)
    }
    if (fine) addEventListener('pointermove', move)

    const loop = () => {
      t += 0.012
      if (!fine) {
        tx = Math.sin(t) * 0.25
        ty = Math.cos(t * 0.8) * 0.15
        to = 0.5 + Math.sin(t * 1.4) * 0.3
      }
      x += (tx - x) * 0.07
      y += (ty - y) * 0.07
      o += (to - o) * 0.07
      el.style.setProperty('--rx', `${-y * 22}deg`)
      el.style.setProperty('--ry', `${x * 30}deg`)
      el.style.setProperty('--o', o.toFixed(3))
      const idle = fine && Math.abs(tx - x) < 0.0005 && Math.abs(ty - y) < 0.0005 && Math.abs(to - o) < 0.0005
      raf = idle ? 0 : requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      removeEventListener('pointermove', move)
    }
  }, [])

  const mid = (fan.length - 1) / 2

  return (
    <div className="scene">
      <button
        type="button"
        className="folder"
        ref={ref}
        aria-label="Voir mes projets"
        onClick={() => navigate('/realisations')}
      >
        <span className="folder-back" />

        {fan.map((p, i) => (
          <span
            key={p.title}
            className="folder-card"
            style={{ '--i': i - mid, '--c1': p.c1, '--c2': p.c2, '--img': p.img || NONE_IMG }}
          >
            <b>{p.title}</b>
          </span>
        ))}

        <span className="folder-front">
          <span className="folder-logo">{profile.initials}</span>
          <span className="folder-label">{profile.handle}</span>
        </span>
      </button>
    </div>
  )
}
