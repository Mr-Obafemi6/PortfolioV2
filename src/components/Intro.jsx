import { useEffect, useRef, useState } from 'react'

// ⏱️ Durées réglables
const HACK_MS = 7000     // durée du faux piratage
const SUCCESS_MS = 4000  // durée de l'écran « Succès, bienvenue »

// Faux journal : tout est inventé, rien n'est réellement exécuté.
const SCRIPT = [
  ['# Connexion', 'h'],
  ['[*] Initialisation du module…', 'p'],
  ['[*] Recherche de l\'appareil sur le réseau', 'p'],
  ['[+] Téléphone détecté', 'ok'],
  ['# Sécurité', 'h'],
  ['[*] Contournement du verrouillage…', 'p'],
  ['[+] Verrouillage contourné', 'ok'],
  ['# Données', 'h'],
  ['[*] Lecture des contacts…', 'p'],
  ['[*] Lecture des messages…', 'p'],
  ['[*] Lecture de la galerie…', 'p'],
  ['[+] Accès complet obtenu', 'ok'],
  ['# Finalisation', 'h'],
  ['[*] Effacement des traces…', 'p'],
  ['[+] Opération terminée', 'ok'],
]

const hex = (n) =>
  Array.from({ length: n }, () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0')).join(' ')

const randomLine = () => {
  const r = Math.random()
  if (r < 0.5) return `0x${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0')}  ${hex(8)}`
  if (r < 0.75) return `for (let i = 0; i < ${Math.floor(Math.random() * 900)}; i++) inject(buf[i]);`
  return `sudo ./acces --cible telephone --port ${Math.floor(1000 + Math.random() * 8999)}`
}

function Switch({ phase, onFlip }) {
  const on = phase !== 'off'

  return (
    <div className={`intro-switch ${on ? 'is-on' : ''}`}>
      <button type="button" className={`rocker ${on ? 'is-on' : ''}`} onClick={onFlip} aria-label="Activer">
        <span className="r-frame">
          <span className="r-key">
            <span className="r-half l"><em>ON</em></span>
            <span className="r-half r"><em>OFF</em></span>
          </span>
        </span>
      </button>
      <p className={`sw-hint ${on ? 'gone' : ''}`}>Appuie sur le bouton</p>
    </div>
  )
}

function Hack({ onDone }) {
  const [lines, setLines] = useState([{ id: 0, t: 'root@phone:~# ./acces --cible telephone', k: 'w' }])
  const [pct, setPct] = useState(0)
  const id = useRef(1)

  useEffect(() => {
    const start = performance.now()
    let i = 0
    const tick = setInterval(() => {
      const el = performance.now() - start
      setPct(Math.min(100, Math.round((el / HACK_MS) * 100)))
      const next = i < SCRIPT.length && Math.random() < 0.3 ? SCRIPT[i++] : [randomLine(), 'p']
      setLines((l) => [...l.slice(-60), { id: id.current++, t: next[0], k: next[1] }])
      if (el >= HACK_MS) {
        clearInterval(tick)
        onDone()
      }
    }, 55)
    return () => clearInterval(tick)
  }, [onDone])

  return (
    <div className="hack">
      <div className="hack-log">
        {lines.map((l) => (
          <div key={l.id} className={`l ${l.k}`}>{l.t}</div>
        ))}
      </div>
      <div className="hack-progress">
        <span>Piratage du téléphone… {pct}%</span>
        <div className="bar"><i style={{ width: `${pct}%` }} /></div>
      </div>
    </div>
  )
}

function Success({ onDone }) {
  const [out, setOut] = useState(false)

  useEffect(() => {
    const a = setTimeout(() => setOut(true), SUCCESS_MS - 500)
    const b = setTimeout(onDone, SUCCESS_MS)
    return () => {
      clearTimeout(a)
      clearTimeout(b)
    }
  }, [onDone])

  return (
    <div className={`success ${out ? 'out' : ''}`}>
      <svg viewBox="0 0 52 52" width="96" height="96" aria-hidden="true">
        <circle cx="26" cy="26" r="24" className="c" />
        <path d="M14 27 l8 8 l16 -18" className="ck" />
      </svg>
      <h2>Succès</h2>
      <p>Bienvenue</p>
    </div>
  )
}

export default function Intro({ onDone }) {
  const [phase, setPhase] = useState('off') // off → on → hack → success

  const flip = () => {
    if (phase !== 'off') return
    setPhase('on')
    setTimeout(() => setPhase('hack'), 900)
  }

  return (
    <div className={`intro phase-${phase}`}>
      {(phase === 'off' || phase === 'on') && <Switch phase={phase} onFlip={flip} />}
      {phase === 'hack' && <Hack onDone={() => setPhase('success')} />}
      {phase === 'success' && <Success onDone={onDone} />}
      {phase !== 'success' && (
        <button type="button" className="intro-skip" onClick={onDone}>Passer</button>
      )}
    </div>
  )
}
