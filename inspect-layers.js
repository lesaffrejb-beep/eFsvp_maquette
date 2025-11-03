// SCRIPT À EXÉCUTER DANS LA CONSOLE DU NAVIGATEUR
// Identifie tous les éléments qui pourraient créer un voile

console.log('🔍 INSPECTION DES LAYERS...\n');

// 1. Chercher tous les éléments position:fixed ou absolute plein écran
const allElements = document.querySelectorAll('*');
const suspects = [];

allElements.forEach(el => {
  const style = window.getComputedStyle(el);
  const rect = el.getBoundingClientRect();
  
  // Éléments fixed/absolute qui couvrent une grande partie de l'écran
  if ((style.position === 'fixed' || style.position === 'absolute') &&
      (rect.width > window.innerWidth * 0.9 || rect.height > window.innerHeight * 0.9)) {
    
    suspects.push({
      element: el,
      tag: el.tagName,
      class: el.className,
      id: el.id,
      position: style.position,
      zIndex: style.zIndex,
      opacity: style.opacity,
      background: style.background,
      display: style.display,
      visibility: style.visibility,
      width: rect.width,
      height: rect.height
    });
  }
});

console.log('🎯 SUSPECTS TROUVÉS:', suspects.length);
suspects.forEach((s, i) => {
  console.log(`\n[${i+1}] ${s.tag}.${s.class}${s.id ? '#'+s.id : ''}`, s);
});

// 2. Chercher des éléments avec un z-index élevé
console.log('\n\n🔢 ÉLÉMENTS AVEC Z-INDEX ÉLEVÉ:');
const highZIndex = [];
allElements.forEach(el => {
  const z = parseInt(window.getComputedStyle(el).zIndex);
  if (z > 100) {
    highZIndex.push({
      element: el,
      tag: el.tagName,
      class: el.className,
      zIndex: z
    });
  }
});
highZIndex.sort((a, b) => b.zIndex - a.zIndex);
highZIndex.slice(0, 10).forEach(h => {
  console.log(`z-index ${h.zIndex}: ${h.tag}.${h.class}`);
});

// 3. Vérifier les pseudo-éléments sur body
console.log('\n\n🎨 STYLE DU BODY:');
const bodyStyle = window.getComputedStyle(document.body);
console.log('opacity:', bodyStyle.opacity);
console.log('filter:', bodyStyle.filter);
console.log('backdrop-filter:', bodyStyle.backdropFilter);
console.log('background:', bodyStyle.background);
console.log('mix-blend-mode:', bodyStyle.mixBlendMode);

console.log('\n✅ Inspection terminée!');
