# 🧹 GUIDE DE NETTOYAGE GITHUB

## 📋 État actuel de ton repo

Tu as **10+ branches** obsolètes qui encombrent ton repo.

---

## ✅ ÉTAPES POUR NETTOYER (5 minutes)

### **1. Va sur GitHub**

👉 https://github.com/lesaffrejb-beep/Site_eFsvp

### **2. Clique sur "Branches"**

En haut à gauche, sous le nom du repo, tu verras un bouton qui affiche le nombre de branches.

```
📁 lesaffrejb-beep / Site_eFsvp
[🌿 X branches]  ← CLIQUE ICI
```

### **3. Supprime les branches obsolètes**

**Clique sur l'icône poubelle 🗑️ à droite de chaque branche** :

#### ❌ À SUPPRIMER (vieilles branches Claude/Codex) :

- `claude/award-2025-audit-improvements-011CUhqF97zdLdaLAn6hrnK4`
- `claude/award-site-prestige-redesign-011CUihTpz1bZ3AxC1juneUY`
- `claude/efsvp-complete-fix-011CUhovNiAJB6WKxqKmqesN`
- `claude/efsvp-premium-redesign-011CUikTJ4WGXLE9VhPAhdeK`
- `claude/efsvp-premium-website-011CUgoV9JZVbtUjLV9pZ9W6`
- `claude/efsvp-website-creation-011CUgn2nByG4nCwQHWDBQ7A`
- `claude/resolve-merge-conflicts-011CUkhk7MUCwxacEahXcCkP`
- `codex/fix-bugs-and-layout-issues`
- `codex/fix-bugs-and-layout-issues-43yifv`

#### ✅ À GARDER :

- `claude/fix-hero-haze-fullscreen-011CUkiYYVbPFeGTvBVvtiKc` (mes corrections actuelles)

### **4. Créer la branche "main" (branche de production)**

Une fois les vieilles branches supprimées :

1. **Clique sur le sélecteur de branches** (en haut à gauche)

2. **Tape "main"** dans la recherche

3. **Clique sur** :
   ```
   Create branch: main from claude/fix-hero-haze-fullscreen-011CUkiYYVbPFeGTvBVvtiKc
   ```

4. **Définis "main" comme branche par défaut** :
   - Va dans **Settings** (onglet en haut)
   - **Branches** (menu gauche)
   - **Switch default branch to "main"**
   - Confirme

### **5. Après avoir créé "main", supprime la branche Claude**

Une fois que "main" est créée et définie comme branche par défaut :

- Retourne dans **Branches**
- Supprime `claude/fix-hero-haze-fullscreen-011CUkiYYVbPFeGTvBVvtiKc` (ses commits sont maintenant dans "main")

---

## 🎯 RÉSULTAT FINAL

Ton repo aura **SEULEMENT** :

- ✅ **main** (branche de production, propre)

**C'EST TOUT !** Propre et simple. 🎉

---

## 🔄 WORKFLOW FUTUR

Pour de nouveaux développements :

1. Créer une branche depuis "main" :
   ```bash
   git checkout -b feature/nom-de-ta-feature
   ```

2. Travailler dessus

3. Créer une Pull Request vers "main" sur GitHub

4. Merger la PR

5. Supprimer la branche feature après merge

---

## 🚀 APRÈS LE NETTOYAGE : DÉPLOIEMENT

Une fois "main" créée, **Vercel déploiera automatiquement** si tu as configuré :
- **Settings > Git > Production Branch = "main"**

**OU**

Si Vercel n'est pas encore configuré :

1. Va sur https://vercel.com/dashboard

2. **Clique sur "Site_eFsvp"** (ou **"Import Project"** si pas encore fait)

3. **Settings > Git**

4. **Production Branch** : `main`

5. **Deploy**

---

## 📊 RÉCAP EN 3 ÉTAPES

| Étape | Action |
|-------|--------|
| 1️⃣ | Supprimer 9 branches obsolètes sur GitHub |
| 2️⃣ | Créer "main" depuis ma branche de fix |
| 3️⃣ | Définir "main" comme branche par défaut |

**Temps estimé** : 5 minutes

---

## 🆘 SI TU BLOQUES

**Dis-moi** :
- À quelle étape tu bloques ?
- Ce que tu vois à l'écran ?
- Un screenshot si possible ?

Je t'aide immédiatement ! 💪

---

## 📦 APRÈS LE NETTOYAGE

Ton repo sera :
- ✅ Propre (1 seule branche : main)
- ✅ Organisé
- ✅ Facile à maintenir
- ✅ Prêt pour de nouveaux développements

Et ton site sera en ligne avec **TOUTES mes corrections** :
- ✅ Plus de voile blanc
- ✅ HERO plein écran
- ✅ Vidéo background
- ✅ Couleurs EfSVP parfaites
- ✅ Contraste AA/AAA

---

*Guide créé par Claude — Session `011CUkiYYVbPFeGTvBVvtiKc`*
