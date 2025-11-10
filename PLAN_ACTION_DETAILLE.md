# PLAN D'ACTION DÉTAILLÉ - AUDIT MAQUETTE vs THEME WP

## STATUT GLOBAL
- **Conformité:** 85-90%
- **Blockers:** 8 issues critiques
- **Temps estimé:** 2-3 heures
- **Complexité:** Faible à modérée

---

## PRIORITÉ 1 - CORRECTIONS CRITIQUES (À FAIRE EN PREMIER)

### 1. Hero Block - Ajouter ID="hero"
**Fichier:** `/home/user/eFsvp_maquette/wp-theme-efsvp/blocks/hero/render.php`

**Situation actuelle (ligne ~86):**
```php
$wrapper_attributes = get_block_wrapper_attributes([
    'class' => implode(' ', array_map('sanitize_html_class', $classes)),
    'style' => $style_attribute,
]);
?>

<section <?php echo $wrapper_attributes; ?>>
```

**À modifier:**
```php
$wrapper_attributes = get_block_wrapper_attributes([
    'class' => implode(' ', array_map('sanitize_html_class', $classes)),
    'style' => $style_attribute,
    'id' => 'hero'  // AJOUTER CETTE LIGNE
]);
?>

<section <?php echo $wrapper_attributes; ?>>
```

**Impact:** Permet les liens d'ancrage #hero et le scroll vers le hero

---

### 2. Services Block - Ajouter ID="services"
**Fichier:** `/home/user/eFsvp_maquette/wp-theme-efsvp/blocks/services/render.php`

**Situation actuelle (ligne ~34):**
```php
$wrapper_attributes = get_block_wrapper_attributes([
    'class' => 'efsvp-services',
    'style' => sprintf('--columns: %d;', $columns),
    'data-service-count' => count($services),
]);
?>

<section <?php echo $wrapper_attributes; ?>>
```

**À modifier:**
```php
$wrapper_attributes = get_block_wrapper_attributes([
    'class' => 'efsvp-services',
    'style' => sprintf('--columns: %d;', $columns),
    'data-service-count' => count($services),
    'id' => 'services'  // AJOUTER CETTE LIGNE
]);
?>

<section <?php echo $wrapper_attributes; ?>>
```

---

### 3. Portfolio Block - Ajouter ID="portfolio"
**Fichier:** `/home/user/eFsvp_maquette/wp-theme-efsvp/blocks/portfolio/render.php`

**À modifier:** Ajouter `'id' => 'portfolio'` aux wrapper_attributes

---

### 4. FAQ Block - Ajouter ID="faq" et IDs d'items
**Fichier:** `/home/user/eFsvp_maquette/wp-theme-efsvp/blocks/faq/render.php`

**Modification 1 - Section FAQ:**
Ajouter `'id' => 'faq'` aux wrapper_attributes de la section

**Modification 2 - Items FAQ:**
Trouver la boucle `foreach ($faqs as $index => $faq)` et modifier chaque item :

```php
// Avant:
<article class="efsvp-faq-item">

// Après:
<article class="efsvp-faq-item" id="faq-answer-<?php echo esc_attr($index + 1); ?>">
```

---

### 5. Contact Block - Ajouter ID="contact-form" et Modal
**Fichier:** `/home/user/eFsvp_maquette/wp-theme-efsvp/blocks/contact/render.php`

**Modification 1 - Formulaire:**
```php
// Avant:
<form method="post" class="efsvp-contact__form">

// Après:
<form method="post" class="efsvp-contact__form" id="contact-form">
```

**Modification 2 - Modal de succès:**
Ajouter à la fin du block :

```html
<div
  class="modal"
  id="success-modal"
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
>
  <div class="modal__overlay"></div>
  <div class="modal__content">
    <div class="modal__icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
    <h3 class="modal__title" id="modal-title">Message envoyé !</h3>
    <p class="modal__text">Merci <span id="modal-name"></span> ! On vous répond sous 48h.</p>
    <button class="btn btn--primary" id="modal-close">Continuer</button>
  </div>
</div>
```

---

### 6. Preloader - Ajouter dans le Template
**Fichier:** `/home/user/eFsvp_maquette/wp-theme-efsvp/templates/front-page.html`

**À ajouter en début du fichier (avant le skip-link) :**

```html
<!-- Preloader -->
<div class="preloader" id="preloader">
  <div class="preloader__content">
    <div class="preloader__logo">EfSVP</div>
    <div class="preloader__spinner"></div>
  </div>
</div>
```

---

### 7. Cookie Banner
**Fichier:** `/home/user/eFsvp_maquette/wp-theme-efsvp/footer.php` ou créer un pattern

**À ajouter à la fin du footer :**

```html
<!-- RGPD Consent Banner -->
<aside
  class="cookie-banner"
  id="cookie-banner"
  role="dialog"
  aria-label="Gestion des cookies"
>
  <div class="cookie-banner__content">
    <div class="cookie-banner__text">
      <h3>Bienvenue 👋</h3>
      <p>Nous utilisons des cookies pour vous offrir la meilleure expérience possible.</p>
    </div>
    <div class="cookie-banner__buttons">
      <button id="cookie-reject" class="btn btn--secondary">Refuser</button>
      <button id="cookie-accept" class="btn btn--primary">Accepter</button>
    </div>
  </div>
</aside>
```

---

### 8. Hero Scroll Link
**Fichier:** `/home/user/eFsvp_maquette/wp-theme-efsvp/blocks/hero/render.php`

**À ajouter dans le hero block :**

```html
<a class="hero__scroll" href="#creations" id="hero-scroll" aria-label="Faire défiler vers la section créations">
    <span class="hero__scroll-text">Faire défiler</span>
    <span class="hero__scroll-chevron" aria-hidden="true">
        <svg width="18" height="48" viewBox="0 0 18 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 0V46" stroke="currentColor" stroke-width="2" />
            <path d="M1 38L9 46L17 38" stroke="currentColor" stroke-width="2" />
        </svg>
    </span>
</a>
```

---

## PRIORITÉ 2 - VÉRIFICATIONS CSS (À VÉRIFIER)

### Fichier 1: buttons.css
**Chemin:** `/home/user/eFsvp_maquette/wp-theme-efsvp/assets/css/components/buttons.css`

**À vérifier:**
- [ ] Contient `.btn` base (padding, font-size, border-radius, transition)
- [ ] Contient `.btn--primary` avec couleur #b95a40
- [ ] Contient `.btn--secondary` 
- [ ] Contient `.btn--primary-small` pour header
- [ ] Contient `.btn--hero` pour le héro
- [ ] Contient les effets de hover (box-shadow, transform)
- [ ] Contient l'effet de brillance (::before)

**Fichier de référence:** `/home/user/eFsvp_maquette/src/styles/styles.css` (chercher `.btn`)

---

### Fichier 2: header.css
**Chemin:** `/home/user/eFsvp_maquette/wp-theme-efsvp/assets/css/components/header.css`

**À vérifier:**
- [ ] `.site-header` position sticky, fond #0f141a
- [ ] `.site-header__container` layout flex space-between
- [ ] `.site-branding` logo et titre styling
- [ ] `.site-navigation` centered, flex layout
- [ ] `.nav-menu` gap correct (--space-6)
- [ ] `.site-header__cta` CTA button styling
- [ ] Height = 76px (--header-h)

**Fichier de référence:** Maquette `index.html` section `.nav`

---

### Fichier 3: footer.css
**Chemin:** `/home/user/eFsvp_maquette/wp-theme-efsvp/assets/css/components/footer.css`

**À vérifier:**
- [ ] `.footer` background et padding
- [ ] `.footer__grid` layout grid 4 colonnes
- [ ] `.footer__col` layout et spacing
- [ ] `.footer__title` styling h4
- [ ] `.footer__links` list styling
- [ ] `.footer__newsletter` form styling
- [ ] `.footer__newsletter-input` input styling
- [ ] `.footer__newsletter-btn` button styling
- [ ] `.footer__bottom` bottom section styling
- [ ] `.footer__back-to-top` button styling

**Fichier de référence:** Maquette `index.html` section `<footer>`

---

### Fichier 4: gutenberg.css
**Chemin:** `/home/user/eFsvp_maquette/wp-theme-efsvp/assets/css/gutenberg.css`

**À vérifier:**
- [ ] Pas d'override des styles globaux
- [ ] Pas de conflits avec les design tokens
- [ ] Responsive correct pour tous les breakpoints
- [ ] Pas d'issues de z-index

---

## PRIORITÉ 3 - VÉRIFICATIONS JAVASCRIPT

### Fichiers à vérifier:
1. **main.js** - Initialisation globale
2. **animations.js** - Sélecteurs CSS avec données-attributs
3. **cookieConsent.js** - Sélecteurs `#cookie-banner`, `#cookie-accept`, `#cookie-reject`
4. **formValidator.js** - Sélecteur `#contact-form`

**À vérifier pour chaque fichier:**
- [ ] Les sélecteurs CSS correspondent aux noms de classe modifiés
- [ ] Les sélecteurs ID correspondent aux IDs ajoutés
- [ ] Les attributs `data-*` sont correctement lus

**Exemple de vérification:**
```javascript
// Ces sélecteurs doivent fonctionner après les modifications:
document.getElementById('hero')              // Doit exister
document.getElementById('services')          // Doit exister
document.getElementById('portfolio')         // Doit exister
document.getElementById('faq')               // Doit exister
document.getElementById('contact-form')      // Doit exister
document.getElementById('success-modal')     // Doit exister
document.getElementById('preloader')         // Doit exister
document.getElementById('cookie-banner')     // Doit exister
```

---

## CHECKLIST DE VÉRIFICATION

### Avant de considérer le travail comme terminé:

#### HTML/Structure
- [ ] Tous les IDs critiques sont présents
- [ ] Les attributs `data-scroll`, `data-reveal`, etc. sont présents
- [ ] Les modales et banneaux sont présents
- [ ] Les liens d'ancrage #hero, #services, #portfolio, #faq, #contact, #process, #creations fonctionnent

#### CSS
- [ ] buttons.css contient tous les styles de boutons
- [ ] header.css affiche le header correctement
- [ ] footer.css affiche le footer correctement
- [ ] gutenberg.css n'a pas de conflits
- [ ] Pas d'erreurs console (DevTools)
- [ ] Responsive design OK (mobile, tablette, desktop)

#### JavaScript
- [ ] Pas d'erreurs console liées aux sélecteurs
- [ ] Les animations fonctionnent
- [ ] Le formulaire contact fonctionne
- [ ] La modal de succès s'affiche
- [ ] Le cookie banner fonctionne
- [ ] Le preloader s'affiche/disparaît correctement

#### Visuel
- [ ] Page ressemble exactement à la maquette
- [ ] Animations au scroll fonctionnent
- [ ] Couleurs identiques (design tokens)
- [ ] Spacing/padding identiques
- [ ] Typographie identique (Playfair Display, Inter, Cormorant)

---

## COMMANDES UTILES

### Chercher les occurrences de patterns
```bash
# Chercher toutes les sections
grep -rn "class=\"efsvp-" wp-theme-efsvp/blocks/ | head -20

# Chercher les IDs existants
grep -rn "id=\"" wp-theme-efsvp/ | grep -v ".git"

# Comparer deux fichiers
diff -u src/styles/styles.css wp-theme-efsvp/assets/css/components/buttons.css
```

---

## ESTIMATION TEMPS

| Tâche | Temps |
|-------|-------|
| Ajouter IDs hero, services, portfolio, faq | 15 min |
| Ajouter IDs faq-answer-X (8 items) | 15 min |
| Ajouter id contact-form et modal | 20 min |
| Ajouter preloader et cookie banner | 20 min |
| Ajouter id hero-scroll | 10 min |
| Vérifier CSS files (4 fichiers) | 30 min |
| Vérifier JavaScript | 20 min |
| Tests et ajustements | 30 min |
| **TOTAL** | **2h30 - 3h** |

---

## NOTES IMPORTANTES

1. **Sauvegarder les fichiers:** Faites des commits Git réguliers
2. **Tester progressivement:** Testez après chaque bloc de modifications
3. **Vérifier le responsive:** Testez sur mobile, tablette, desktop
4. **DevTools:** Ouvrez la console pour vérifier les erreurs
5. **Performance:** Vérifiez que les Core Web Vitals ne sont pas affectés

---

## RÉSUMÉ DES FICHIERS À MODIFIER

1. `/home/user/eFsvp_maquette/wp-theme-efsvp/blocks/hero/render.php` - 3 modifications
2. `/home/user/eFsvp_maquette/wp-theme-efsvp/blocks/services/render.php` - 1 modification
3. `/home/user/eFsvp_maquette/wp-theme-efsvp/blocks/portfolio/render.php` - 1 modification
4. `/home/user/eFsvp_maquette/wp-theme-efsvp/blocks/faq/render.php` - 2 modifications
5. `/home/user/eFsvp_maquette/wp-theme-efsvp/blocks/contact/render.php` - 2 modifications
6. `/home/user/eFsvp_maquette/wp-theme-efsvp/templates/front-page.html` - 1 modification
7. `/home/user/eFsvp_maquette/wp-theme-efsvp/footer.php` - 1 modification

---

## RÉSUMÉ DES FICHIERS À VÉRIFIER

1. `/home/user/eFsvp_maquette/wp-theme-efsvp/assets/css/components/buttons.css`
2. `/home/user/eFsvp_maquette/wp-theme-efsvp/assets/css/components/header.css`
3. `/home/user/eFsvp_maquette/wp-theme-efsvp/assets/css/components/footer.css`
4. `/home/user/eFsvp_maquette/wp-theme-efsvp/assets/css/gutenberg.css`
5. Tous les fichiers JS dans `wp-theme-efsvp/assets/js/`

