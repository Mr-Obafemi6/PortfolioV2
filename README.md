# Portfolio React — Obafemi

1. Dézippe et remplace ton ancien dossier par celui-ci.
2. `npm.cmd install`
3. `npm.cmd run dev`

Pages : `/`, `/profil`, `/expertise`, `/realisations`, `/parcours`, `/contact`.
Tout le contenu se change dans `src/data.js`. Les icônes sont dans `src/components/TechIcon.jsx`
(chargées depuis le CDN devicon, déjà ajouté dans `index.html`).
`vercel.json` permet de recharger une page directement sur Vercel.
Les captures des projets sont chargées depuis ton site en ligne ; pour les avoir en local,
copie ton dossier `img` dans `public/img` et remplace l'URL dans `data.js`.

## Intro (bouton ON/OFF → faux piratage → « Succès, bienvenue »)
Fichier `src/components/Intro.jsx`. Les durées se règlent en haut du fichier
(`HACK_MS` = piratage, `SUCCESS_MS` = écran succès, 4000 ms).
L'intro ne s'affiche qu'une fois par onglet ; ferme l'onglet pour la revoir.
Tout le texte du terminal est inventé : rien n'est réellement exécuté.
