# 🔍 INSTRUCTIONS DE DEBUG - VOILE GRIS

## ⚠️ LE VOILE PERSISTE MALGRÉ LE DEBUG CSS

Le fichier `debug-overlay.css` est déjà chargé dans `index.html` mais le voile est toujours présent.

Cela signifie que le problème ne vient PAS d'un overlay CSS classique.

---

## 🎯 TESTS À FAIRE MAINTENANT

### TEST 1 : Background Rouge Vif

Le `debug-overlay.css` force maintenant un **background ROUGE VIF** sur le body.

**Qu'est-ce que tu vois ?**

1. ✅ **Si le fond est ROUGE VIF sans voile** → Le problème vient du grain ou de la couleur parchemin
2. ⚠️ **Si le fond est ROUGE mais avec un voile gris par-dessus** → Un élément couvre la page
3. ❌ **Si le fond n'est PAS rouge** → Le debug CSS ne se charge pas correctement

---

### TEST 2 : Script Console Navigateur

1. Ouvre la page du site
2. Appuie sur **F12** (Chrome DevTools)
3. Va dans l'onglet **Console**
4. Copie-colle le contenu du fichier `inspect-layers.js`
5. Appuie sur **Entrée**

Le script va afficher :
- Tous les éléments position:fixed/absolute couvrant l'écran
- Les éléments avec un z-index élevé
- Le style exact du body

**Copie-colle le résultat ici !**

---

### TEST 3 : Désactiver Toutes les Extensions

Ouvre le site en **mode navigation privée** (Ctrl+Shift+N sur Chrome).

Le voile est-il toujours là ?

- ✅ **Oui** → Problème vient du site
- ❌ **Non** → Une extension Chrome cause le problème (dark mode, blue light filter, etc.)

---

### TEST 4 : Tester sur un Autre Navigateur

Ouvre le site sur **Firefox** ou **Safari**.

Le voile est-il toujours là ?

- ✅ **Oui sur tous les navigateurs** → Problème du site
- ❌ **Non, seulement sur Chrome** → Problème de rendu Chrome ou d'extension

---

### TEST 5 : Page de Test Minimale

Ouvre : **`test-radical.html`**

Cette page n'a AUCUN CSS du site, juste un fond parchemin pur.

Le voile est-il présent sur cette page aussi ?

- ✅ **Oui** → Problème d'écran, de calibration ou de navigateur
- ❌ **Non** → Problème vient bien du CSS/JS du site

---

## 📸 CE QUE J'AI BESOIN DE TOI

Pour continuer le debug, j'ai besoin de :

1. **Résultat du TEST 1** : Le fond est-il rouge vif ? Y a-t-il un voile gris par-dessus ?
2. **Résultat du script console** (TEST 2) : Copie-colle complet
3. **Résultat TEST 3** : Mode privé - voile présent ou absent ?
4. **Résultat TEST 5** : test-radical.html - voile présent ou absent ?

---

## 💡 HYPOTHÈSES ACTUELLES

### Hypothèse #1 : Les couleurs parchemin SONT grises sur ton écran

Peut-être que `#F5E6D3` et `#FBF1E3` apparaissent gris/beiges délavés à cause de :
- Calibration de l'écran
- Profil de couleur du navigateur
- Mode sombre ou filtre de lumière bleue actif

**Test** : Si le fond ROUGE est bien visible, cette hypothèse est fausse.

---

### Hypothèse #2 : Un élément invisible couvre toute la page

Un élément `position:fixed` ou `absolute` avec :
- Un background semi-transparent
- Un z-index élevé
- Qui n'est pas dans le HTML mais ajouté par JS

**Test** : Le script console révélera cet élément.

---

### Hypothèse #3 : Le hero overlay "fuit"

Le `.hero__overlay` a des couleurs sombres et pourrait s'afficher au-dessus des autres sections si l'isolation échoue.

**Test** : Le debug CSS désactive maintenant complètement le hero overlay.

---

### Hypothèse #4 : Les sections ne sont pas opaques

Les sections alternent entre `var(--bg)` et `var(--surface)`. Si ces variables ont une transparence...

**Test** : Le debug CSS force maintenant les sections à être opaques.

---

## 🚀 PROCHAINES ÉTAPES

Une fois que tu m'as donné les résultats des tests, je pourrai :

1. Identifier le coupable exact
2. Appliquer la correction définitive
3. Commiter et pusher le fix

**Réponds avec les 4 résultats et je trouve la solution ! 🎯**
