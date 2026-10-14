import { useEffect, useRef, useState } from 'react'

// ⏱️ Durées réglables
const HACK_MS = 10000    // durée totale du faux terminal (bannière + commandes + piratage)
const SUCCESS_MS = 4000  // durée de l'écran « Succès, bienvenue »

// Faux journal : tout est inventé, rien n'est réellement exécuté.
const SCRIPT = [
  ['# Connexion', 'h'],
  ['[*] Initialisation du module…', 'p'],
  ['[*] Recherche de l\'appareil sur le réseau', 'p'],
  ['[+] Système détecté', 'ok'],
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
  return `sudo ./acces --cible systeme --port ${Math.floor(1000 + Math.random() * 8999)}`
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

// ---------- Faux terminal façon Termux (tout est inventé, rien n'est exécuté) ----------
const USER = 'u0_a938'

const BANNER = [
  'Welcome to Termux',
  '',
  'Docs:       https://termux.dev/docs',
  'Donate:     https://termux.dev/donate',
  'Community:  https://termux.dev/community',
  '',
  'Working with packages:',
  '',
  ' - Search:  pkg search <query>',
  ' - Install: pkg install <package>',
  ' - Upgrade: pkg upgrade',
  '',
  'Subscribing to additional repositories:',
  '',
  ' - Root:    pkg install root-repo',
  ' - X11:     pkg install x11-repo',
  '',
  'For fixing any repository issues,',
  "try 'termux-change-repo' command.",
  '',
  'Report issues at https://termux.dev/issues',
]

const ART = [
  '         -o          o-',
  '          +hydNNNNdyh+',
  '        +mMMMMMMMMMMMMm+',
  '      `dMMm:NMMMMMMN:mMMd`',
  '      hMMMMMMMMMMMMMMMMMMh',
  '  ..  yyyyyyyyyyyyyyyyyyyy  ..',
  '.mMMm`MMMMMMMMMMMMMMMMMMMM`mMMm.',
  ':MMMM-MMMMMMMMMMMMMMMMMMMM-MMMM:',
  ':MMMM-MMMMMMMMMMMMMMMMMMMM-MMMM:',
  ':MMMM-MMMMMMMMMMMMMMMMMMMM-MMMM:',
  ':MMMM-MMMMMMMMMMMMMMMMMMMM-MMMM:',
  '-MMMM-MMMMMMMMMMMMMMMMMMMM-MMMM-',
  ' +yy+ MMMMMMMMMMMMMMMMMMMM +yy+',
  '      mMMMMMMMMMMMMMMMMMMm',
  '      `/++MMMMh++hMMMM++/`',
  '          MMMMMo  oMMMMM',
  '          MMMMMo  oMMMMM',
  '          oNMm-    -mMNs',
]

const guessOS = () => {
  const ua = navigator.userAgent || ''
  if (/Android/i.test(ua)) return 'Android 14 aarch64'
  if (/iPhone|iPad/i.test(ua)) return 'iOS 17 arm64'
  if (/Windows/i.test(ua)) return 'Windows 11 x86_64'
  if (/Mac/i.test(ua)) return 'macOS arm64'
  return 'Linux x86_64'
}

const INFO = () => [
  ['OS', guessOS()],
  ['Host', 'Système cible'],
  ['Kernel', '5.15.180-android13-8'],
  ['Uptime', '7 days, 13 hours, 3 mins'],
  ['Packages', '259 (dpkg), 1 (pkg)'],
  ['Shell', 'bash 5.3.9'],
  ['CPU', `(${navigator.hardwareConcurrency || 8}) @ 1.612GHz`],
  ['Memory', '1978MiB / 3794MiB'],
]

const SWATCH = [
  ['#555', '#e00', '#0e0', '#ee0', '#25f', '#e0e', '#0ee', '#fff'],
  ['#555', '#f33', '#3f3', '#ff3', '#46f', '#f3f', '#3ff', '#fff'],
]

const LS = [
  ['drwx------. 20 u0_a938 u0_a938 3452 Jun 10 14:27 ', '.', true],
  ['drwxrwx--x.  4 u0_a938 u0_a938 3452 May 12 13:04 ', '..', true],
  ['drwx------.  2 u0_a938 u0_a938 3452 May 12 02:43 ', '.android', true],
  ['-rw-------.  1 u0_a938 u0_a938  239 May 19 17:04 ', '.bash_history', false],
  ['-rw-------.  1 u0_a938 u0_a938  193 Jun  2 00:56 ', '.bashrc', false],
  ['drwx------.  3 u0_a938 u0_a938 3452 May 11 14:59 ', '.cache', true],
  ['drwx------.  5 u0_a938 u0_a938 3452 Jun  2 13:39 ', '.config', true],
  ['drwx------.  5 u0_a938 u0_a938 3452 May 30 03:23 ', '.npm', true],
  ['drwx------.  2 u0_a938 u0_a938 3452 May 12 01:25 ', '.ssh', true],
  ['drwx------.  2 u0_a938 u0_a938 3452 May 11 00:06 ', '.termux', true],
  ['-rw-------.  1 u0_a938 u0_a938  235 May 22 13:08 ', '.wget-hsts', false],
]

function Prompt() {
  return <span className="ps">{USER}@termux:~$</span>
}

function Neofetch() {
  return (
    <div className="neo">
      <pre className="neo-art">{ART.join('\n')}</pre>
      <div className="neo-info">
        <div className="u">{USER}@localhost</div>
        <div>-----------------</div>
        {INFO().map(([k, v]) => (
          <div key={k}><b>{k}</b>: {v}</div>
        ))}
        <div className="swatch">
          {SWATCH.flat().map((c, i) => <i key={i} style={{ background: c }} />)}
        </div>
      </div>
    </div>
  )
}

function Line({ l }) {
  if (l.k === 'neo') return <Neofetch />
  if (l.k === 'cmd') return <div className="l"><Prompt /> {l.t}</div>
  if (l.k === 'ls') return <div className="l ls">{l.t}<span className={l.d ? 'dir' : ''}>{l.n}</span></div>
  return <div className={`l ${l.k}`}>{l.t || '\u00a0'}</div>
}

function Hack({ onDone }) {
  const [lines, setLines] = useState([])
  const [typing, setTyping] = useState('')
  const [pct, setPct] = useState(null) // null = barre cachée
  const id = useRef(0)
  const done = useRef(onDone)
  done.current = onDone

  useEffect(() => {
    let dead = false
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
    const add = (item) => {
      if (!dead) setLines((l) => [...l.slice(-150), { id: id.current++, ...item }])
    }
    // Tape une commande lettre par lettre, puis « Entrée »
    const type = async (txt) => {
      for (let i = 1; i <= txt.length; i++) {
        if (dead) return
        setTyping(txt.slice(0, i))
        await sleep(40 + Math.random() * 40)
      }
      await sleep(300)
      setTyping('')
      add({ k: 'cmd', t: txt })
    }

    ;(async () => {
      const start = performance.now()

      for (const t of BANNER) { add({ k: 'b', t }); await sleep(20) }
      add({ k: 'neo' })
      await sleep(1000)

      await type('ls -la ~')
      for (const [t, n, d] of LS) { add({ k: 'ls', t, n, d }); await sleep(40) }
      await sleep(500)

      await type('./acces --cible systeme')
      await sleep(200)

      // Journal du « piratage » : les étapes arrivent dans l'ordre, entrecoupées de lignes aléatoires
      const logStart = performance.now()
      const logMs = Math.max(3000, HACK_MS - (logStart - start))
      let i = 0
      while (!dead) {
        const el = performance.now() - logStart
        if (el >= logMs) break
        setPct(Math.min(100, Math.round((el / logMs) * 100)))
        const target = Math.floor((el / logMs) * SCRIPT.length)
        if (i < target) add({ k: SCRIPT[i][1], t: SCRIPT[i++][0] })
        else add({ k: 'hex', t: randomLine() })
        await sleep(45)
      }
      if (dead) return
      while (i < SCRIPT.length) { add({ k: SCRIPT[i][1], t: SCRIPT[i++][0] }); await sleep(60) }
      setPct(100)
      await sleep(700)
      if (!dead) done.current()
    })()

    return () => { dead = true }
  }, [])

  const BAR = 28
  const filled = pct == null ? 0 : Math.round((pct / 100) * BAR)

  return (
    <div className="hack" aria-hidden="true">
      {lines.map((l) => <Line key={l.id} l={l} />)}
      {pct != null && (
        <div className="l pg">
          Piratage du système… [{'█'.repeat(filled)}{'░'.repeat(BAR - filled)}] {pct}%
        </div>
      )}
      {pct == null && (
        <div className="l"><Prompt /> {typing}<span className="caret" /></div>
      )}
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
