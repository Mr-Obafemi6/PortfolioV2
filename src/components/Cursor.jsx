import { useEffect, useRef } from 'react'

// Flèche verte en verre qui suit la souris avec inertie.
export default function Cursor() {
  const ref = useRef(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    const el = ref.current
    document.documentElement.classList.add('has-cursor')

    let x = innerWidth / 2, y = innerHeight / 2
    let tx = x, ty = y, rot = 0, raf = 0

    const move = (e) => {
      tx = e.clientX
      ty = e.clientY
      el.style.opacity = 1
      if (!raf) raf = requestAnimationFrame(loop)
    }
    const over = (e) =>
      el.classList.toggle('is-hover', !!e.target.closest('a, button, [data-hover]'))
    const down = () => el.classList.add('is-down')
    const up = () => el.classList.remove('is-down')

    const loop = () => {
      const dx = tx - x
      const dy = ty - y
      x += dx * 0.2
      y += dy * 0.2
      rot += (Math.max(-35, Math.min(35, dx * 0.5)) - rot) * 0.15
      el.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rot}deg)`
      // Au repos, on arrête la boucle (économise le processeur)
      raf = Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1 && Math.abs(rot) < 0.1 ? 0 : requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    addEventListener('pointermove', move)
    addEventListener('mouseover', over)
    addEventListener('pointerdown', down)
    addEventListener('pointerup', up)
    return () => {
      cancelAnimationFrame(raf)
      document.documentElement.classList.remove('has-cursor')
      removeEventListener('pointermove', move)
      removeEventListener('mouseover', over)
      removeEventListener('pointerdown', down)
      removeEventListener('pointerup', up)
    }
  }, [])

  return (
    <div className="cursor" ref={ref} aria-hidden="true">
      <svg viewBox="0 0 48 48" width="46" height="46">
        <defs>
          <linearGradient id="cg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#9dffc0" />
            <stop offset="0.5" stopColor="#1ed760" />
            <stop offset="1" stopColor="#0e8a3c" />
          </linearGradient>
        </defs>
        <path
          d="M9 9 L39 20 L24 24 L20 39 Z"
          fill="url(#cg)"
          stroke="url(#cg)"
          strokeWidth="7"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}
