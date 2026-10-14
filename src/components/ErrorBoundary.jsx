import { Component } from 'react'

// Évite la page noire vide : si une page plante, on affiche un message et un bouton.
export default class ErrorBoundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  componentDidCatch(err) { console.error(err) }
  render() {
    if (!this.state.failed) return this.props.children
    return (
      <section className="block" style={{ textAlign: 'center' }}>
        <h2>Oups, la page n'a pas pu s'afficher</h2>
        <button type="button" className="btn" onClick={() => location.reload()}>Recharger la page</button>
      </section>
    )
  }
}
