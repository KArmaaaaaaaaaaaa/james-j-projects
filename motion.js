(() => {
  const quieto = matchMedia('(prefers-reduced-motion: reduce)');
  if (quieto.matches || !('IntersectionObserver' in window)) return;
  const bloques = [...document.querySelectorAll('.sube')];
  const mostrar = () => bloques.forEach(el => el.classList.add('dentro'));
  const vigia = new IntersectionObserver(entradas => {
    entradas.forEach(e => { if (e.isIntersecting) { e.target.classList.add('dentro'); vigia.unobserve(e.target); } });
  }, { threshold: .14, rootMargin: '0px 0px -8% 0px' });
  document.documentElement.classList.add('js-mov');
  const grupos = new Map();
  bloques.forEach(el => {
    const n = grupos.get(el.parentNode) || 0;
    grupos.set(el.parentNode, n + 1);
    el.style.transitionDelay = Math.min(n, 5) * 60 + 'ms';
    vigia.observe(el);
  });
  setTimeout(mostrar, 3000);
  quieto.addEventListener('change', e => { if (e.matches) { mostrar(); vigia.disconnect(); } });
})();
