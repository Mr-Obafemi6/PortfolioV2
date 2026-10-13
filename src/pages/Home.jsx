import { Link } from 'react-router-dom'
import Folder from '../components/Folder.jsx'
import TechIcon from '../components/TechIcon.jsx'
import { profile } from '../data.js'

export default function Home() {
  return (
    <header className="hero">
      <Folder />
      <div className="hero-text">
        <h1>{profile.name}</h1>
        <p className="role">{profile.role}</p>

        <ul className="pills small">
          {profile.heroStack.map((s) => (
            <li key={s} data-hover><TechIcon name={s} />{s}</li>
          ))}
          {profile.learning.map((s) => (
            <li key={s} className="soft" data-hover><TechIcon name={s} />{s} · apprentissage</li>
          ))}
        </ul>

        <div className="actions">
          <Link className="btn" to="/realisations">Voir mes projets</Link>
          <a className="btn ghost" href={profile.cv} target="_blank" rel="noreferrer">Télécharger mon CV</a>
          <Link className="btn ghost" to="/contact">Me contacter</Link>
        </div>
      </div>
    </header>
  )
}
