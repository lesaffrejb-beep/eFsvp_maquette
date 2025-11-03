# 🎬 Guide de configuration vidéo HERO

## 📁 Placement des fichiers

Placez vos fichiers vidéo dans le dossier :
```
/public/media/
```

Fichiers requis :
- `efsvp-hero.mp4` — Vidéo principale (H.264, optimisée web)
- `efsvp-hero.webm` — Vidéo alternative (format WebM, optionnel mais recommandé)
- `efsvp-hero-poster.jpg` — Image poster (fallback et preview)

---

## 🎥 Spécifications vidéo recommandées

### Format MP4 (H.264)
- **Résolution** : 1920x1080 (Full HD) minimum
- **Codec** : H.264 / AVC
- **Bitrate** : 2-4 Mbps (équilibre qualité/poids)
- **Durée** : 10-30 secondes (boucle courte)
- **FPS** : 24-30 fps
- **Poids cible** : < 5 MB si possible

### Format WebM (VP9 ou AV1)
- **Résolution** : 1920x1080
- **Codec** : VP9 ou AV1
- **Bitrate** : 1.5-3 Mbps
- **Poids** : < 4 MB

### Image Poster (JPG)
- **Résolution** : 1920x1080
- **Format** : JPEG optimisé
- **Qualité** : 80-85%
- **Poids** : < 300 KB

---

## 🛠️ Optimisation vidéo avec FFmpeg

### Convertir et optimiser en MP4 :
```bash
ffmpeg -i source.mov \
  -c:v libx264 \
  -preset slow \
  -crf 23 \
  -vf scale=1920:1080 \
  -r 30 \
  -movflags +faststart \
  -an \
  efsvp-hero.mp4
```

### Convertir en WebM (VP9) :
```bash
ffmpeg -i source.mov \
  -c:v libvpx-vp9 \
  -crf 30 \
  -b:v 2M \
  -vf scale=1920:1080 \
  -r 30 \
  -an \
  efsvp-hero.webm
```

### Extraire le poster (frame à 2 secondes) :
```bash
ffmpeg -i efsvp-hero.mp4 \
  -ss 00:00:02 \
  -vframes 1 \
  -q:v 2 \
  efsvp-hero-poster.jpg
```

---

## 🎨 Conseils créatifs

### Thématique vidéo (palette EfSVP - Brique & Encre)
- **Ambiance** : Chaleureuse, intime, artisanale
- **Mouvements** : Lents et fluides (pas de mouvements brusques)
- **Textures** : Parchemin, bois, encre, plume, feuilles, lumière naturelle
- **Couleurs** : Tons chauds (terre cuite, ambre), contrastes doux

### Exemples de contenu :
- Main qui écrit à la plume sur parchemin
- Pages de livre qui tournent doucement
- Lumière du jour traversant un rideau
- Texture bois/artisanat en gros plan
- Instruments de musique (cordes, bois) en plan serré
- Cinemagraph subtil (mouvement minimal)

---

## ♿ Accessibilité & Performance

### Accessibilité
✅ Vidéo en `autoplay muted` (pas de son imposé)
✅ `preload="metadata"` (charge minimale au départ)
✅ `aria-label` descriptif
✅ Désactivation automatique si `prefers-reduced-motion: reduce`
✅ Fallback sur image poster si vidéo non supportée

### Performance
✅ Lazy load : la vidéo ne se charge qu'au scroll près du HERO
✅ Poster léger (< 300 KB) pour LCP rapide
✅ `playsinline` pour iOS (évite fullscreen)
✅ Pas de son → poids réduit

---

## 🧪 Tests

### Checklist avant mise en prod :
- [ ] Vidéo `.mp4` présente et lisible
- [ ] Poster `.jpg` présent et visible (fallback)
- [ ] Poids total vidéo < 5 MB
- [ ] Teste sur Chrome, Safari, Firefox
- [ ] Teste sur mobile iOS/Android
- [ ] Vérifie que `prefers-reduced-motion` désactive la vidéo
- [ ] Contraste texte blanc sur vidéo > 4.5:1 (WCAG AA)

### Lighthouse cibles :
- Performance : ≥ 90
- Accessibility : ≥ 95
- Best Practices : ≥ 95
- SEO : ≥ 95

---

## 📦 Sources alternatives de vidéos

Si vous n'avez pas encore de vidéo, sources libres de droits :
- **Pexels Videos** : https://www.pexels.com/videos/
- **Pixabay Videos** : https://pixabay.com/videos/
- **Coverr** : https://coverr.co/

Recherche suggérée : "handwriting", "vintage paper", "warm light", "artisan", "ink", "wood texture"

---

## 🚨 Fallback si pas de vidéo

Si vous n'avez pas encore de vidéo, le HERO utilisera automatiquement :
1. Le poster `efsvp-hero-poster.jpg` (si présent)
2. Ou un dégradé élégant Parchemin (défini dans `.hero__video-placeholder`)

Le site reste **100% fonctionnel** sans vidéo.

---

## 🎯 Rappel : palette EfSVP

- **Terre cuite** : `#B8441E`
- **Encre nuit** : `#1A2332`
- **Parchemin** : `#F5E6D3`
- **Ambre forge** : `#E8924F`
- **Surface claire** : `#FBF1E3`

---

*Pour toute question : voir index.html ligne 290-306 et styles.css ligne 552-762*
