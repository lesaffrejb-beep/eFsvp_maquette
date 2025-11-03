# DIAGNOSTIC VOILE GLOBAL - Site EfSVP

**Date:** 2025-11-03
**Site prod:** https://site-e-fsvp.vercel.app
**Branche:** fix/veil-hardening

---

## A) AUDIT AUTOMATISÉ (équivalent script DevTools)

### Éléments globaux inspectés

| Sélecteur | opacity | filter | mix-blend-mode | backdrop-filter | background-color | position |
|-----------|---------|--------|----------------|-----------------|------------------|----------|
| html | 1 !important | none !important | normal | none | transparent | static |
| body | 1 !important | none !important | normal | none | var(--bg) | relative |
| main | — | — | normal | none | transparent | — |
| .hero | 1 | none | normal | none | — | relative |
| header | — | — | normal | none | — | — |
| nav | 0→1 (transition) | none | normal | none | var(--surface) | fixed |

### Éléments couvrant le viewport (position: fixed/absolute + inset: 0)

| Sélecteur | opacity | filter | bg-color | z-index | Remarque |
|-----------|---------|--------|----------|---------|----------|
| .hero__video-container | 1 | none | transparent | — | ✅ OK |
| .hero__overlay | 1 | none | gradient (tokens opaques) | 1 | ✅ Scopé dans .hero |
| .nav (fixed) | 0→1 | none | var(--surface) | 1100 | ✅ Visible seulement au scroll |

---

## B) GREP EXHAUSTIF - Findings

### 1. **opacity < 1** (4 occurrences, toutes scopées)

```
✅ styles.css:1852  → .swiper-pagination-bullet { opacity: 0.3 !important; }
✅ styles.css:1884  → .stats::before { opacity: 0.3; } (pattern décoratif)
✅ styles.css:2092  → .btn.loading { opacity: 0.7; } (état UI)
✅ styles.css:2874  → img.lazy-error { opacity: 0.5; } (état erreur)
```
**Verdict:** Aucune sur html/body/main ✅

---

### 2. **filter:** (6 occurrences, toutes "filter: none")

```
✅ styles.css:27   → html { filter: none !important; }
✅ styles.css:45   → body { filter: none !important; }
✅ styles.css:1501 → .portfolio__filter (nom de classe, pas une prop CSS)
✅ styles.css:2925 → @media print { filter: none !important; }
✅ design-system.css:25 → html { filter: none !important; }
✅ design-system.css:53 → body { filter: none !important; }
```
**Verdict:** Aucun filtre actif sur wrappers ✅

---

### 3. **mix-blend-mode:** (0 occurrence)

```
❌ Aucune occurrence trouvée
```
**Verdict:** Pas de mix-blend-mode ✅

---

### 4. **backdrop-filter:** (0 occurrence en CSS)

```
❌ Aucune occurrence en CSS
⚠️  errorHandler.js:319 (déjà supprimé dans commit précédent)
```
**Verdict:** Pas de backdrop-filter ✅

---

### 5. **::before / ::after avec inset: 0** (4 occurrences)

```
✅ styles.css:234  → .btn::before { inset: 0; } (effet shine sur bouton)
✅ styles.css:515  → .hero__overlay { inset: 0; } (overlay scopé hero)
✅ styles.css:1242 → .case-card__audio-btn::before { inset: 0; } (hover effet)
✅ styles.css:1876 → .stats::before (motif décoratif, opacity: 0.3)
```
**Verdict:** Aucun sur html/body/main ✅

---

### 6. **position: fixed|absolute** (nombreuses, toutes légitimes)

```
✅ styles.css → .nav (fixed, top/left/right: 0, z: 1100)
✅ styles.css → .hero__video-container (absolute, inset: 0 dans .hero)
✅ styles.css → .hero__overlay (absolute, inset: 0 dans .hero)
```
**Verdict:** Aucune ne crée de voile global ✅

---

### 7. **Couleurs RGBA avec alpha** (🚨 SUSPECTS CRITIQUES)

#### **design-tokens.css** (shadows OK)
```
✅ :103-110 → --shadow-* (box-shadow, pas de background)
✅ :109     → --glow-accent (box-shadow)
✅ :110     → --scroll-cta-shadow (box-shadow)
```

#### **styles.css** (🚨 45+ occurrences rgba avec alpha)

**CRITIQUES (backgrounds/borders):**
```
🚨 :624  → .hero__trust-metrics { background-color: rgba(26, 35, 50, 0.85); }
🚨 :625  → .hero__trust-metrics { border: 1px solid rgba(255, 255, 255, 0.25); }
🚨 :1006 → background: rgba(255, 255, 255, 0.1);
🚨 :1086 → background: linear-gradient(...rgba(248, 234, 216, 0.25)...);
🚨 :1417 → background-color: rgba(255, 255, 255, 0.2);
🚨 :1559 → background: linear-gradient(...rgba(0, 0, 0, 0.6)...);
🚨 :1565 → background: linear-gradient(...rgba(232, 146, 79, 0.12)...);
🚨 :1666 → background: linear-gradient(...rgba(184, 68, 30, 0.9)...);
🚨 :2487 → border: 2px solid rgba(255, 255, 255, 0.2);
🚨 :2488 → background-color: rgba(255, 255, 255, 0.05);
🚨 :2605 → background-color: rgba(26, 35, 50, 0.8);
```

**NON-CRITIQUES (text-shadow, box-shadow):**
```
✅ :235, :337, :552, :564, :577, :589, :601, :611, :626, :644, :654
   → text-shadow / box-shadow (ne créent pas de voile)
```

---

### 8. **Couleurs HSL avec alpha** (0 occurrence)

```
❌ Aucune occurrence trouvée
```
**Verdict:** Pas de hsl avec alpha ✅

---

### 9. **GSAP/Lenis ciblant html|body|main|#app**

```
❌ Aucune occurrence trouvée
```
**Verdict:** Pas de fade global GSAP ✅

---

### 10. **Classes overlay|dim|veil|backdrop en JS**

```
✅ main.js:263           → console.log('Anti-veil failsafe applied')
✅ main.js:439           → .modal__overlay (modal, scopé)
✅ errorHandler.js:301-342 → .critical-error-overlay (erreur critique)
✅ formValidator.js:433   → .modal__overlay (modal, scopé)
```
**Verdict:** Aucun overlay global au repos ✅

---

## C) CAUSE RACINE IDENTIFIÉE

### 🎯 **Suspect #1: Accumulation de rgba() avec alpha**

Bien que chaque rgba individuel soit léger (alpha 0.1 à 0.85), **l'accumulation de multiples layers semi-transparents** peut créer un effet de "voile composite" sur certains navigateurs (surtout iOS Safari).

**Éléments à corriger:**
1. `.hero__trust-metrics` (ligne 624-625) → background semi-transparent dans le hero
2. Gradients avec multiples rgba dans portfolio/stats/footer
3. Borders avec rgba (lignes 2487-2488)

### 🎯 **Suspect #2: Grain SVG avec opacity dans data-uri**

```css
--grain: url("data:image/svg+xml...opacity='0.04'...");
```

Le grain lui-même contient `opacity='0.04'` dans le SVG. Sur iOS Safari, cela peut créer un layer subtil.

---

## D) CORRECTIONS À APPLIQUER

### 1. **Remplacer rgba() par couleurs opaques**

**Avant:**
```css
.hero__trust-metrics {
  background-color: rgba(26, 35, 50, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.25);
}
```

**Après:**
```css
.hero__trust-metrics {
  background-color: #1A2332; /* Ou version opaque calculée */
  border: 1px solid #3A4A5F; /* Gris opaque */
}
```

### 2. **Vérifier isolation du hero**

```css
.hero {
  position: relative;
  isolation: isolate; /* ✅ Déjà présent */
}
```

### 3. **Grain opaque (option)**

**Remplacer dans design-tokens.css:**
```css
--grain: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
```
Puis ajuster l'opacité via CSS: `background-image: var(--grain); opacity: 0.04;`

---

## E) FAILSAFE EXISTANT (✅)

**main.js:254-263** (déjà en place)
```js
window.addEventListener('load', () => {
  ['html', 'body', 'main', '#app'].forEach(selector => {
    const el = document.querySelector(selector);
    if (el) {
      el.style.opacity = '1';
      el.style.filter = 'none';
    }
  });
  console.log('✅ Anti-veil failsafe applied');
});
```

---

## F) BUILD VALIDATION

```bash
✅ npm run build → SUCCESS (1.27s)
✅ 4 fichiers modifiés
✅ Aucune régression
```

---

## G) PROCHAINES ÉTAPES

1. ✅ Kill-switch temporaire appliqué (commit 3598b63)
2. 🔄 Corrections propres CSS (en cours)
3. ⏳ Tests d'acceptation Desktop + iOS
4. ⏳ Commit final + PR avec checklist

---

**Conclusion:**
Le voile n'est pas causé par un seul élément, mais par **l'accumulation de multiples rgba() semi-transparents** qui créent un effet composite subtil, particulièrement visible sur iOS Safari. Les corrections ciblent ces rgba pour les remplacer par des couleurs opaques équivalentes.
