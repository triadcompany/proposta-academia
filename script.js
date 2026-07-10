// Ícones (lucide)
if (window.lucide) lucide.createIcons();

// Scroll suave para links [data-scroll]
document.querySelectorAll('[data-scroll]').forEach((el) => {
  el.addEventListener('click', (e) => {
    const targetSelector = el.getAttribute('data-target') || el.getAttribute('href');
    const target = document.querySelector(targetSelector);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Barra de progresso de leitura
const progressBar = document.getElementById('progressBar');
function updateProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = pct + '%';
}
window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

// Animações de entrada ao rolar
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion && 'IntersectionObserver' in window) {
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = (Array.from(el.parentElement.children).indexOf(el) % 6) * 70;
          setTimeout(() => el.classList.add('visible'), delay);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );
  revealEls.forEach((el) => observer.observe(el));
} else {
  document.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'));
}