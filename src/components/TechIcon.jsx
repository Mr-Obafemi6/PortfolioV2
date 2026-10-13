// Icônes des langages / frameworks (devicon). Sans icône connue : pastille avec l'initiale.
const MAP = {
  HTML: 'devicon-html5-plain colored',
  HTML5: 'devicon-html5-plain colored',
  CSS: 'devicon-css3-plain colored',
  CSS3: 'devicon-css3-plain colored',
  'HTML / CSS': 'devicon-html5-plain colored',
  JavaScript: 'devicon-javascript-plain colored',
  PHP: 'devicon-php-plain colored',
  MySQL: 'devicon-mysql-plain colored',
  Bootstrap: 'devicon-bootstrap-plain colored',
  Laravel: 'devicon-laravel-plain colored',
  Git: 'devicon-git-plain colored',
  GitHub: 'devicon-github-original',
  'VS Code': 'devicon-vscode-plain colored',
  React: 'devicon-react-original colored',
  Symfony: 'devicon-symfony-original',
  'C++': 'devicon-cplusplus-plain colored',
  'C#': 'devicon-csharp-plain colored',
}

export const hasIcon = (name) => name in MAP

export default function TechIcon({ name }) {
  if (MAP[name]) return <i className={`tech-icon ${MAP[name]}`} aria-hidden="true" />
  return <span className="tech-icon fallback" aria-hidden="true">{name[0]}</span>
}
