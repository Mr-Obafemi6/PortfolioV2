import { useState } from 'react'
import TechIcon, { hasIcon } from './TechIcon.jsx'
import BusinessCard from './BusinessCard.jsx'
import { profile, savoirFaire, technos, outils, parcours } from '../data.js'

function CardGrid({ items }) {
  return (
    <div className="cards">
      {items.map((i) => (
        <div className={`card${hasIcon(i.t) ? ' with-icon' : ''}`} key={i.t} data-hover>
          {hasIcon(i.t) && <TechIcon name={i.t} />}
          <div>
            <strong>{i.t}</strong>
            <span>{i.d}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export function Profil() {
  return (
    <section className="block">
      <h2>À propos de moi</h2>
      <div className="about">
        <img className="portrait" decoding="async" width="800" height="1067" src={profile.photo} alt={`Portrait de ${profile.name}`} />
        <div>
          <p className="lead">{profile.role}</p>
          <p className="text">{profile.about}</p>
          <div className="facts">
            <div className="card">
              <strong>Formation</strong>
              <span>{profile.formation.titre} — {profile.formation.ecole}</span>
            </div>
            <div className="card">
              <strong>Localisation</strong>
              <span>{profile.location}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Expertise() {
  return (
    <section className="block">
      <h2>Ce que je peux faire</h2>
      <CardGrid items={savoirFaire} />

      <h3>Technologies que j'utilise</h3>
      <CardGrid items={technos} />

      <h3>Mes outils</h3>
      <CardGrid items={outils} />

      <h3>Actuellement en apprentissage</h3>
      <CardGrid
        items={[
          { t: 'React', d: 'Technologie étudiée progressivement.' },
          { t: 'Symfony', d: 'Framework PHP étudié progressivement.' },
        ]}
      />
    </section>
  )
}

export function Parcours() {
  return (
    <section className="block">
      <h2>Mon évolution</h2>
      <ol className="timeline">
        {parcours.map(([label, value]) => (
          <li key={label} data-hover>
            <small>{label}</small>
            <strong>{value}</strong>
          </li>
        ))}
      </ol>
      <a className="btn" href={profile.cv} target="_blank" rel="noreferrer">Télécharger mon CV</a>
    </section>
  )
}

export function Contact() {
  const [f, setF] = useState({ nom: '', email: '', sujet: '', message: '' })
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    const body = `${f.message}\n\n— ${f.nom} (${f.email})`
    location.href = `mailto:${profile.email}?subject=${encodeURIComponent(f.sujet)}&body=${encodeURIComponent(body)}`
  }

  return (
    <section className="block">
      <h2>Parlons de votre projet</h2>
      <div className="contact">
        <div className="contact-info">
          <a className="big-link" href={`mailto:${profile.email}`}>{profile.email}</a>
          <a href={profile.phoneHref}>{profile.phone}</a>
          <span>{profile.location}</span>
          <div className="links">
            {profile.links.map((l) => (
              <a key={l.label} href={l.href} target="_blank" rel="noreferrer">{l.label}</a>
            ))}
          </div>

          <BusinessCard />
        </div>

        <form className="form" onSubmit={submit}>
          <input placeholder="Nom" value={f.nom} onChange={set('nom')} required />
          <input type="email" placeholder="Email" value={f.email} onChange={set('email')} required />
          <input placeholder="Sujet" value={f.sujet} onChange={set('sujet')} required />
          <textarea rows="5" placeholder="Message" value={f.message} onChange={set('message')} required />
          <button className="btn" type="submit">Envoyer le message</button>
        </form>
      </div>
    </section>
  )
}
