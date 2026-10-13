import { useEffect, useRef, useState } from 'react'
import { profile } from '../data.js'
import { jpegToPdf } from '../utils/pdf.js'

// Carte au format 3,5 × 2 in (85 × 55 mm environ), dessinée en 1050 × 600 px.
const W = 1050
const H = 600
const EXPORT_SCALE = 2 // 2100 × 1200 px pour les téléchargements
const FILE = 'carte-de-visite-tchalla-obafemi'

const short = (url) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')
const linkOf = (label) => profile.links.find((l) => l.label === label)?.href
const font = (w, s) => `${w} ${s}px Figtree, system-ui, sans-serif`

function fit(ctx, text, maxW, size, weight) {
  let s = size
  ctx.font = font(weight, s)
  while (ctx.measureText(text).width > maxW && s > 10) {
    s -= 1
    ctx.font = font(weight, s)
  }
}

function draw(ctx, scale, photo) {
  ctx.setTransform(scale, 0, 0, scale, 0, 0)
  ctx.clearRect(0, 0, W, H)

  // Fond
  const bg = ctx.createLinearGradient(0, 0, W, H)
  bg.addColorStop(0, '#0f3a22')
  bg.addColorStop(1, '#050a07')
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, W, H)

  const glow = ctx.createRadialGradient(W, 0, 0, W, 0, 520)
  glow.addColorStop(0, 'rgba(30,215,96,0.35)')
  glow.addColorStop(1, 'rgba(30,215,96,0)')
  ctx.fillStyle = glow
  ctx.fillRect(0, 0, W, H)

  // Panneau gauche (verre vert)
  const panel = ctx.createLinearGradient(0, 0, 340, H)
  panel.addColorStop(0, 'rgba(150,255,190,0.28)')
  panel.addColorStop(1, 'rgba(30,215,96,0.08)')
  ctx.fillStyle = panel
  ctx.fillRect(0, 0, 340, H)
  ctx.fillStyle = 'rgba(255,255,255,0.18)'
  ctx.fillRect(339, 0, 1, H)

  // Photo (ou initiales)
  const cx = 170, cy = 270, r = 110
  ctx.save()
  ctx.beginPath()
  ctx.arc(cx, cy, r, 0, Math.PI * 2)
  ctx.clip()
  if (photo) {
    const side = Math.min(photo.width, photo.height)
    ctx.drawImage(photo, (photo.width - side) / 2, (photo.height - side) / 2, side, side, cx - r, cy - r, r * 2, r * 2)
  } else {
    const g = ctx.createRadialGradient(cx - 40, cy - 50, 10, cx, cy, r)
    g.addColorStop(0, '#9dffc0')
    g.addColorStop(0.55, '#1ed760')
    g.addColorStop(1, '#0e8a3c')
    ctx.fillStyle = g
    ctx.fillRect(cx - r, cy - r, r * 2, r * 2)
    ctx.fillStyle = '#04200f'
    ctx.font = font(900, 84)
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(profile.initials, cx, cy + 4)
  }
  ctx.restore()
  ctx.lineWidth = 6
  ctx.strokeStyle = '#1ed760'
  ctx.beginPath()
  ctx.arc(cx, cy, r + 8, 0, Math.PI * 2)
  ctx.stroke()

  ctx.textAlign = 'center'
  ctx.textBaseline = 'alphabetic'
  ctx.fillStyle = '#8fb09a'
  fit(ctx, `@${profile.handle}`, 280, 24, 600)
  ctx.fillText(`@${profile.handle}`, cx, 470)

  // Texte à droite
  const x = 395
  const maxW = W - x - 50
  ctx.textAlign = 'left'
  const [first, ...rest] = profile.name.split(' ')

  ctx.fillStyle = '#f3fff7'
  fit(ctx, first.toUpperCase(), maxW, 58, 900)
  ctx.fillText(first.toUpperCase(), x, 120)
  fit(ctx, rest.join(' '), maxW, 58, 900)
  ctx.fillText(rest.join(' '), x, 184)

  ctx.fillStyle = '#1ed760'
  fit(ctx, profile.role, maxW, 27, 700)
  ctx.fillText(profile.role, x, 232)

  const line = ctx.createLinearGradient(x, 0, x + maxW, 0)
  line.addColorStop(0, '#1ed760')
  line.addColorStop(1, 'rgba(30,215,96,0)')
  ctx.fillStyle = line
  ctx.fillRect(x, 262, maxW, 3)

  const rows = [
    ['EMAIL', profile.email],
    ['TÉLÉPHONE', profile.phone],
    ['LOCALISATION', profile.location],
  ]
  rows.forEach(([label, value], i) => {
    const y = 322 + i * 74
    ctx.fillStyle = '#8fb09a'
    ctx.font = font(700, 15)
    if ('letterSpacing' in ctx) ctx.letterSpacing = '2px'
    ctx.fillText(label, x, y)
    if ('letterSpacing' in ctx) ctx.letterSpacing = '0px'
    ctx.fillStyle = '#f3fff7'
    fit(ctx, value, maxW, 29, 600)
    ctx.fillText(value, x, y + 34)
  })

  // Liens
  const gh = linkOf('GitHub')
  const tk = linkOf('TikTok')
  const links = [gh && short(gh), tk && short(tk)].filter(Boolean).join('   •   ')
  if (links) {
    ctx.fillStyle = '#1ed760'
    fit(ctx, links, maxW, 21, 600)
    ctx.fillText(links, x, 556)
  }
}

function loadPhoto(src) {
  return new Promise((resolve) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = () => resolve(null) // repli : initiales
    img.src = src
  })
}

const toBlob = (canvas, type, q) => new Promise((res) => canvas.toBlob(res, type, q))

function save(blob, name) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = name
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 2000)
}

export default function BusinessCard() {
  const preview = useRef(null)
  const assets = useRef({ photo: null })
  const [ready, setReady] = useState(false)
  const [busy, setBusy] = useState('')

  useEffect(() => {
    let alive = true
    const fonts = document.fonts
      ? Promise.all([900, 700, 600].map((w) => document.fonts.load(font(w, 20)))).catch(() => {})
      : Promise.resolve()

    Promise.all([fonts, loadPhoto(profile.photo)]).then(([, photo]) => {
      if (!alive) return
      assets.current.photo = photo
      draw(preview.current.getContext('2d'), 1, photo)
      setReady(true)
    })
    return () => { alive = false }
  }, [])

  const render = () => {
    const c = document.createElement('canvas')
    c.width = W * EXPORT_SCALE
    c.height = H * EXPORT_SCALE
    draw(c.getContext('2d'), EXPORT_SCALE, assets.current.photo)
    return c
  }

  const download = async (kind) => {
    if (!ready || busy) return
    setBusy(kind)
    try {
      const canvas = render()
      if (kind === 'png') save(await toBlob(canvas, 'image/png'), `${FILE}.png`)
      if (kind === 'jpg') save(await toBlob(canvas, 'image/jpeg', 0.95), `${FILE}.jpg`)
      if (kind === 'pdf') {
        const jpg = await toBlob(canvas, 'image/jpeg', 0.95)
        const bytes = new Uint8Array(await jpg.arrayBuffer())
        // Page = 3,5 × 2 pouces (252 × 144 pt)
        save(jpegToPdf(bytes, canvas.width, canvas.height, 252, 144), `${FILE}.pdf`)
      }
    } finally {
      setBusy('')
    }
  }

  return (
    <div className="bcard">
      <h3>Ma carte de visite</h3>
      <canvas
        ref={preview}
        className="bcard-preview"
        width={W}
        height={H}
        role="img"
        aria-label={`Carte de visite de ${profile.name}`}
      />
      <div className="bcard-actions">
        {[['pdf', 'PDF'], ['png', 'PNG'], ['jpg', 'JPG']].map(([k, label]) => (
          <button
            key={k}
            type="button"
            className="btn ghost"
            data-hover
            disabled={!ready || !!busy}
            onClick={() => download(k)}
          >
            {busy === k ? '…' : `Télécharger ${label}`}
          </button>
        ))}
      </div>
    </div>
  )
}
