import { animate } from 'motion/mini';

// Animate's timing and easing guidance, adapted to the existing static site.
// Never hide content in CSS: the document remains usable without this bundle.
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const active = new Set();
let observer;
function reveal(element, delay = 0) {
  if (reducedMotion.matches || !Element.prototype.animate) return;
  const playback = animate(element, {
    opacity: [0.7, 1], transform: ['translateY(12px)', 'translateY(0)'],
  }, { duration: 0.28, delay, ease: [0.23, 1, 0.32, 1] });
  active.add(playback);
  playback.then(() => { playback.cancel(); active.delete(playback); });
}
function start() {
  if (reducedMotion.matches || !('IntersectionObserver' in window)) return;
  // A brief entrance for the copy; photography stays still and immediately visible.
  document.querySelectorAll('.hero-copy').forEach((el, i) => reveal(el, i * 0.06));
  observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      reveal(entry.target);
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.section-heading, .setup-inspiration, .article-hero, .product-detail-hero').forEach(el => observer.observe(el));
}
reducedMotion.addEventListener('change', () => {
  observer?.disconnect();
  active.forEach(animation => animation.cancel());
  active.clear();
  if (!reducedMotion.matches) start();
});
start();
