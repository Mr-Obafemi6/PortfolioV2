import { NavLink, Link } from 'react-router-dom'
import { profile } from '../data.js'

const items = [
  ['Accueil', '/'],
  ['Profil', '/profil'],
  ['Expertise', '/expertise'],
  ['Réalisations', '/realisations'],
  ['Parcours', '/parcours'],
  ['Contact', '/contact'],
]

export default function Nav() {
  return (
    <nav className="nav">
      <Link className="nav-logo" to="/">{profile.handle}</Link>
      <ul>
        {items.map(([label, to]) => (
          <li key={to}>
            <NavLink to={to} end={to === '/'} className={({ isActive }) => (isActive ? 'active' : '')}>
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
