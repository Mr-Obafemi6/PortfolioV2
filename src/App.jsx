import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Cursor from './components/Cursor.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import Intro from './components/Intro.jsx'
import Nav from './components/Nav.jsx'
import Projects from './components/Projects.jsx'
import Home from './pages/Home.jsx'
import { Profil, Expertise, Parcours, Contact } from './components/Sections.jsx'
import { profile } from './data.js'

function ScrollTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    // Remontée instantanée, compatible avec tous les navigateurs (anciens Safari/Android inclus)
    const el = document.documentElement
    const prev = el.style.scrollBehavior
    el.style.scrollBehavior = 'auto'
    window.scrollTo(0, 0)
    el.style.scrollBehavior = prev
  }, [pathname])
  return null
}

export default function App() {
  const { pathname } = useLocation()

  // L'intro ne s'affiche qu'une fois par session (retire la ligne sessionStorage pour la voir à chaque fois).
  const [entered, setEntered] = useState(() => {
    try { return sessionStorage.getItem('intro') === '1' } catch { return false }
  })
  const finish = () => {
    try { sessionStorage.setItem('intro', '1') } catch { /* ignore */ }
    setEntered(true)
  }

  if (!entered) {
    return (
      <>
        <Cursor />
        <Intro onDone={finish} />
      </>
    )
  }

  return (
    <>
      <Cursor />
      <Nav />
      <ScrollTop />

      <main className="page" key={pathname}>
        <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/expertise" element={<Expertise />} />
          <Route path="/realisations" element={<Projects />} />
          <Route path="/parcours" element={<Parcours />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
        </ErrorBoundary>
      </main>

      <footer className="foot">{new Date().getFullYear()} {profile.name}</footer>
    </>
  )
}
