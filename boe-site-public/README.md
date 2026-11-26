# BOÉ MULTI-SERVICES — site public

Site Vite + React + Tailwind (3.4), prêt pour Cloudflare Workers.

## Lancer en local
```
npm install
npm run dev
```

## Publier sur Cloudflare
- **Avec GitHub (Workers Builds)** : remplacez le contenu du dépôt par ce dossier, puis
  Build command : `npm run build` — Deploy command : `npx wrangler deploy`.
  Le nom du Worker est dans `wrangler.jsonc` (`boe-site-public2`).
- **À la main** : `npm run deploy` (il faut être connecté avec `npx wrangler login`).

Variables à garder dans Cloudflare (comme avant) : `VITE_SUPABASE_URL` et `VITE_SUPABASE_PUBLISHABLE_KEY`.
Voir `.env.example` pour le développement local.

## Où modifier quoi
- `src/config.js` : numéros de téléphone, numéro WhatsApp, e-mail.
- `src/data.js` : textes des services, pages sur devis, partenariat, pages légales.
- `src/annonces.js` : lecture des annonces de l'espace manager (immobilier / automobile).
  Renseignez le nom des tables dans `TABLES` ; tant qu'il est à `null`, le catalogue reste vide.
- `public/images/services/` : photos de la page d'accueil (mêmes noms de fichiers pour les remplacer).
- `src/App.jsx` : pages et composants.

## À faire avant la mise en ligne
- Faire relire les pages « Conditions d'utilisation » et « Politique de confidentialité »
  (la mention « Texte provisoire à faire valider » est dans `LegalView`).
- Faire relire les textes des pages de partenariat (`PARTENAIRES` dans `src/data.js`).
