# En français s'il vous plaît - Site Web Vitrine

Site web one-page professionnel pour EfSVP, studio de création narrative et musicale basé à Angers.

## 🚀 Lancement rapide

### Option 1 : Ouverture directe
Ouvrez simplement `index.html` dans votre navigateur web préféré.

### Option 2 : Serveur local (recommandé)
Pour éviter les problèmes CORS et tester dans des conditions réelles :

```bash
# Avec Python 3
python -m http.server 8000

# Avec Python 2
python -m SimpleHTTPServer 8000

# Avec Node.js (si npx est installé)
npx serve

# Avec PHP
php -S localhost:8000
```

Puis ouvrez `http://localhost:8000` dans votre navigateur.

---

## 📁 Structure des fichiers

```
/
├── index.html          # Page principale (HTML sémantique)
├── css/
│   └── styles.css      # Styles complets (palette, typographies, responsive)
├── js/
│   └── main.js         # Interactions (smooth scroll, animations, FAQ, etc.)
└── README.md           # Ce fichier
```

---

## 🎨 Personnalisation

### Modifier les couleurs

Toutes les couleurs sont définies dans **CSS Custom Properties** au début de `css/styles.css` :

```css
:root {
    --terre-cuite: #B8441E;    /* Couleur principale, CTA */
    --encre-nuit: #1A2332;     /* Texte principal */
    --parchemin: #F5E6D3;      /* Fond principal */
    --ambre-forge: #E8924F;    /* Accents secondaires */
    --charbon: #2D2D2D;        /* Texte secondaire */
    --blanc: #FFFFFF;          /* Cartes, espaces */
}
```

**Pour changer la palette :**
1. Ouvrez `css/styles.css`
2. Modifiez les valeurs hexadécimales dans `:root`
3. Sauvegardez → les changements s'appliquent partout automatiquement

---

### Modifier les typographies

Les polices Google Fonts sont chargées dans `<head>` de `index.html` :

```html
<link href="https://fonts.googleapis.com/css2?family=Newsreader:wght@400;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Cormorant:ital,wght@1,600&display=swap" rel="stylesheet">
```

Variables de typographie dans `css/styles.css` :

```css
:root {
    --font-editorial: 'Newsreader', serif;    /* Titres */
    --font-ui: 'Plus Jakarta Sans', sans-serif; /* Corps de texte */
    --font-accent: 'Cormorant', serif;         /* Accents poétiques */
}
```

**Pour changer les polices :**
1. Trouvez vos polices sur [Google Fonts](https://fonts.google.com)
2. Remplacez le `<link>` dans `index.html`
3. Mettez à jour les variables dans `css/styles.css`

---

### Ajouter de vraies images

Actuellement, les cartes références utilisent des **blocs de couleur** (`reference-card__visual`).

**Pour remplacer par des images :**

1. **Créez un dossier images :**
   ```bash
   mkdir images
   ```

2. **Ajoutez vos images** (format recommandé : JPG/WebP, ratio 4:3, ~800px de large)

3. **Modifiez le HTML** dans `index.html` :

   **AVANT :**
   ```html
   <div class="reference-card reference-card--primary">
       <div class="reference-card__visual"></div>
       <div class="reference-card__content">...</div>
   </div>
   ```

   **APRÈS :**
   ```html
   <div class="reference-card">
       <img src="images/maine-et-loire.jpg" alt="La force de la douceur" class="reference-card__visual">
       <div class="reference-card__content">...</div>
   </div>
   ```

4. **Mettez à jour le CSS** dans `css/styles.css` :

   Remplacez :
   ```css
   .reference-card__visual {
       width: 100%;
       aspect-ratio: 4 / 3;
   }

   .reference-card--primary .reference-card__visual {
       background-color: var(--terre-cuite);
   }
   ```

   Par :
   ```css
   .reference-card__visual {
       width: 100%;
       aspect-ratio: 4 / 3;
       object-fit: cover;
   }
   ```

5. **Optimisation (optionnel mais recommandé) :**
   - Compressez vos images avec [TinyPNG](https://tinypng.com)
   - Utilisez WebP pour de meilleures performances
   - Ajoutez le lazy loading : `<img loading="lazy" ...>`

---

### Modifier les contenus textuels

Tous les textes sont directement dans `index.html`. Sections principales :

- **Hero** → Ligne ~32
- **Services** → Ligne ~50
- **Formules** → Ligne ~75
- **Process** → Ligne ~145
- **Références** → Ligne ~180
- **Chiffres** → Ligne ~250
- **FAQ** → Ligne ~280
- **Contact** → Ligne ~350

Éditez directement le HTML et sauvegardez.

---

## ⚙️ Fonctionnalités JavaScript

Le fichier `js/main.js` inclut :

- ✅ **Smooth scroll** vers les sections
- ✅ **Sticky header** apparaissant au scroll
- ✅ **Menu mobile** burger responsive
- ✅ **Animations au scroll** (Intersection Observer)
- ✅ **Accordéon FAQ** (toggle questions/réponses)
- ✅ **Validation de formulaire** côté client
- ✅ **Scroll spy** (lien actif selon la section visible)
- ✅ **Navigation clavier** (accessibilité)

Toutes les fonctions sont vanilla JS (pas de dépendances).

---

## 📧 Intégrer l'envoi du formulaire

Le formulaire contact est actuellement en **validation locale uniquement**.

### Option 1 : FormSpree (gratuit, simple)

1. Créez un compte sur [FormSpree.io](https://formspree.io)
2. Créez un nouveau formulaire et obtenez votre endpoint
3. Dans `js/main.js`, décommentez et complétez la section FormSpree (ligne ~150) :

```javascript
fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    body: new FormData(form),
    headers: { 'Accept': 'application/json' }
})
.then(response => {
    if (response.ok) {
        alert('Message envoyé avec succès !');
        form.reset();
    }
});
```

### Option 2 : EmailJS

1. Créez un compte sur [EmailJS.com](https://www.emailjs.com)
2. Suivez leur guide d'intégration
3. Intégrez leur SDK dans `index.html` et modifiez `main.js`

### Option 3 : Backend custom

Créez votre propre API (Node.js, PHP, Python) et modifiez la fonction `formValidation()`.

---

## 📱 Responsive

Le site est **100% responsive** avec breakpoints :

- **Mobile** : < 768px (menu burger, colonnes empilées)
- **Tablette** : 768px - 1024px (grilles adaptées)
- **Desktop** : > 1024px (layout complet)

Testez avec les DevTools de votre navigateur (F12 → mode responsive).

---

## ♿ Accessibilité

Le site respecte les bonnes pratiques :

- ✅ HTML sémantique (`<header>`, `<section>`, `<nav>`, etc.)
- ✅ Attributs ARIA (`aria-expanded`, `aria-label`)
- ✅ Navigation au clavier (Tab, Entrée, Échap)
- ✅ Contrastes de couleurs suffisants
- ✅ Focus visible sur les éléments interactifs

**Pour aller plus loin :**
- Testez avec [WAVE](https://wave.webaim.org)
- Validez le HTML sur [validator.w3.org](https://validator.w3.org)

---

## 🚀 Déploiement

### Option 1 : Netlify (gratuit, recommandé)

1. Créez un compte sur [Netlify](https://www.netlify.com)
2. Glissez-déposez votre dossier dans leur interface
3. Votre site est en ligne en 30 secondes !

### Option 2 : GitHub Pages

1. Créez un repo GitHub
2. Poussez votre code
3. Activez GitHub Pages dans Settings

### Option 3 : Serveur classique (FTP)

1. Connectez-vous à votre hébergement via FTP
2. Uploadez tous les fichiers à la racine
3. Le site est accessible via votre nom de domaine

---

## 🎯 Checklist avant mise en ligne

- [ ] Remplacez `contact@efsvp.fr` par la vraie adresse email
- [ ] Ajoutez un vrai numéro de téléphone (si souhaité)
- [ ] Intégrez un service d'envoi de formulaire (FormSpree, etc.)
- [ ] Remplacez les blocs de couleur par de vraies images
- [ ] Testez sur mobile réel (pas seulement émulateur)
- [ ] Testez tous les liens et boutons
- [ ] Vérifiez l'accordéon FAQ
- [ ] Testez le formulaire de contact
- [ ] Optimisez les images (compression)
- [ ] Ajoutez un favicon (icône d'onglet)
- [ ] Configurez Google Analytics (optionnel)
- [ ] Testez les performances avec [PageSpeed Insights](https://pagespeed.web.dev)

---

## 🆘 Support & Questions

### Le menu mobile ne s'ouvre pas
→ Vérifiez que `js/main.js` est bien chargé (regardez la console du navigateur)

### Les animations ne fonctionnent pas
→ Intersection Observer nécessite un navigateur récent. Testez sur Chrome/Firefox/Safari récent.

### Le formulaire ne s'envoie pas
→ Normal, vous devez intégrer un service d'envoi (voir section "Intégrer l'envoi du formulaire")

### Les polices ne s'affichent pas
→ Vérifiez votre connexion internet (Google Fonts requiert une connexion)

---

## 📄 Mentions légales

Pour ajouter une page mentions légales :

1. Créez `mentions-legales.html`
2. Copiez la structure de `index.html`
3. Remplacez le contenu
4. Liez depuis le footer : `<a href="mentions-legales.html">Mentions légales</a>`

Ou utilisez un générateur en ligne gratuit.

---

## 🎨 Crédits

**Design & Développement :** Site créé selon les spécifications du brief EfSVP
**Typographies :** Google Fonts (Newsreader, Plus Jakarta Sans, Cormorant)
**Code :** HTML5, CSS3, JavaScript Vanilla
**Licence :** Tous droits réservés à En français s'il vous plaît

---

## 📝 Notes techniques

- **Pas de jQuery** : JavaScript vanilla pur (meilleure performance)
- **Pas de Bootstrap** : CSS custom pour un design unique
- **Mobile-first** : Design pensé d'abord pour mobile
- **Progressive enhancement** : Fonctionne même sans JS (contenus visibles)

---

**Besoin d'aide ?** Contactez votre développeur web ou consultez :
- [MDN Web Docs](https://developer.mozilla.org) (référence HTML/CSS/JS)
- [CSS-Tricks](https://css-tricks.com) (tutoriels design)
- [Stack Overflow](https://stackoverflow.com) (questions techniques)

---

**Version :** 1.0.0
**Dernière mise à jour :** Janvier 2025
**Compatibilité :** Tous navigateurs modernes (Chrome, Firefox, Safari, Edge)
