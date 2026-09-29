# AW-Med — Gestion clinique (PWA)
Build by KonbitTech · HTML/JS/CSS · offline-first · Firebase Auth + Firestore (sync auto)

## Déploiement Netlify
1. Poussez ce dossier sur GitHub.
2. Netlify → Add new site → Import from Git → choisissez le dépôt (aucune commande de build, publish = `.`).
   Ou glissez-déposez le dossier dans Netlify Drop.

## Activer Firebase
1. Console Firebase → créez un projet → Authentication → activez Email/Mot de passe.
2. Firestore Database → créez la base, puis collez `firestore.rules` dans l'onglet Règles.
3. Authentication → Paramètres → Domaines autorisés : ajoutez votre domaine Netlify.
4. Dans l'app : Paramètres → collez la config Firebase (JSON) → Enregistrer.
5. L'admin ajoute les utilisateurs (email + rôle) dans « Utilisateurs » ; chaque personne crée ensuite son compte depuis l'écran de connexion.

Sans config Firebase, l'app fonctionne en mode local hors-ligne (le premier compte créé devient Admin).
