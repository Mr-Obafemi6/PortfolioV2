// ✏️ Tout le contenu du site est ici.
const SITE = 'https://portfolio-obafemi-tchalla-neon-one.vercel.app/'
const img = (f) => `url("${encodeURI(SITE + 'img/' + f)}")`
const NONE = 'linear-gradient(transparent, transparent)'

export const profile = {
  name: 'TCHALLA Obafemi Gérard',
  handle: 'obafemi_dev',
  initials: 'OG',
  role: 'Développeur Web & Applications',
  intro:
    'Je conçois des applications web modernes, des systèmes de gestion et des solutions numériques adaptées aux besoins des utilisateurs et des entreprises.',
  about:
    "Spécialiste de la conception et du développement d'applications web modernes, je travaille sur des solutions utiles, responsives et adaptées aux besoins des utilisateurs. Ma formation en Développement Web & Applications à FORMATEC m'oriente vers le web, le mobile et les systèmes de gestion.",
  formation: { titre: 'Développement Web & Applications', ecole: 'FORMATEC' },
  location: 'Lomé, Togo',
  email: 'gerardtchalla6@gmail.com',
  phone: '+228 91 18 66 37',
  phoneHref: 'tel:+22891186637',
  photo: SITE + 'img/profile.jpg',
  cv: SITE + 'cv/cv-gerard-tchalla.pdf',
  heroStack: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL', 'Git', 'GitHub', 'PWA', 'Laravel'],
  learning: ['React', 'Symfony'],
  links: [
    { label: 'GitHub', href: 'https://github.com/Mr-Obafemi6' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/gerard-tchalla-4b2b4b2b4/' },
    { label: 'TikTok', href: 'https://tiktok.com/@Obafemi_x2' },
    { label: 'Facebook', href: 'https://facebook.com/TCHALLAobfemi' },
  ],
}

export const projects = [
  {
    title: 'PCHome',
    kind: 'Projet e-commerce',
    text: 'Site de vente et livraison de PC en ligne.',
    stack: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
    links: [{ label: 'GitHub', href: 'https://github.com/Mr-Obafemi6/Mon-Projet-PCHome' }],
    img: img('WhatsApp Image 2026-01-20 at 20.31.03.jpeg'),
    c1: '#2dd4bf', c2: '#1e3a8a',
  },
  {
    title: 'Mon Portfolio',
    kind: 'Projet personnel',
    text: 'Portfolio moderne et responsive pour présenter mes compétences et projets.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    links: [
      { label: 'Démo', href: SITE },
      { label: 'GitHub', href: 'https://github.com/Mr-Obafemi6/Mon-Portfolio' },
    ],
    img: img('WhatsApp Image 2026-01-20 at 20.46.1.jpeg'),
    c1: '#f472b6', c2: '#4c1d95',
  },
  {
    title: 'Gestion de boutique',
    kind: 'Application de gestion',
    text: 'Application de gestion de stock, ventes et informations de boutique.',
    stack: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap'],
    links: [{ label: 'GitHub', href: 'https://github.com/Mr-Obafemi6/gestion_boutique.git' }],
    img: img('image.png'),
    c1: '#fde047', c2: '#b91c1c',
  },
  {
    title: 'Gestion de tâches',
    kind: 'Application de gestion',
    text: 'Application web de gestion de tâches.',
    stack: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap'],
    links: [{ label: 'GitHub', href: 'https://github.com/Mr-Obafemi6/Gestion-des-t-ches.git' }],
    img: img('gest.tâche.jpeg'),
    c1: '#ffb347', c2: '#7a1fa2',
  },
  {
    title: 'Calculatrice Complexe',
    kind: 'Application',
    text: 'Application web de calculatrice complexe.',
    stack: ['C++', 'C#', 'HTML', 'JavaScript', 'Bootstrap'],
    links: [{ label: 'GitHub', href: 'https://github.com/Mr-Obafemi6/Calculatrice_Complexe.git' }],
    img: img('Calculatrice ℂ - Google Chrome 04_03_2026 18_02_04.png'),
    c1: '#60a5fa', c2: '#0f172a',
  },
  {
    title: "SGE – Système de Gestion d'École",
    kind: 'Système de gestion',
    text: "Application web de gestion d'école.",
    stack: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap'],
    links: [],
    img: img('image copy.png'),
    c1: '#34d399', c2: '#064e3b',
  },
]

export const savoirFaire = [
  { t: 'Développement Web', d: "Création d'interfaces web responsives avec HTML, CSS et JavaScript." },
  { t: 'Applications Web', d: "Développement d'expériences web interactives adaptées aux utilisateurs." },
  { t: 'Applications de gestion', d: "Conception de solutions de gestion pour les besoins d'une organisation." },
  { t: 'Bases de données', d: 'Organisation et exploitation de données avec MySQL.' },
  { t: 'Interfaces responsives', d: 'Interfaces claires et adaptables aux écrans mobiles, tablettes et desktop.' },
  { t: 'Versioning', d: 'Suivi des évolutions de projet avec Git et partage sur GitHub.' },
]

export const technos = [
  { t: 'HTML5', d: 'Structure des interfaces web.' },
  { t: 'CSS3', d: 'Mise en forme responsive.' },
  { t: 'JavaScript', d: 'Interactions et logique côté client.' },
  { t: 'PHP', d: 'Applications web côté serveur.' },
  { t: 'MySQL', d: 'Données des applications de gestion.' },
  { t: 'Bootstrap', d: 'Composants utilisés dans plusieurs projets.' },
  { t: 'Laravel', d: 'Framework PHP pour applications web.' },
]

export const outils = [
  { t: 'Git', d: 'Gestion des versions.' },
  { t: 'GitHub', d: 'Hébergement des dépôts.' },
  { t: 'VS Code', d: 'Éditeur utilisé pour développer.' },
]

export const parcours = [
  ['Formation', 'Développement Web & Applications'],
  ['Fondations', 'HTML / CSS'],
  ['Interactivité', 'JavaScript'],
  ['Applications', 'PHP / MySQL'],
  ['Orientation', 'Applications de gestion, API et PWA'],
  ['En apprentissage', 'React'],
]

export const NONE_IMG = NONE
