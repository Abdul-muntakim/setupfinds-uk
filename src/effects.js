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

// Subtle 3D tilt on cards for mouse/trackpad users. Touch and reduced motion get static cards.
const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
const TILT_SELECTOR = '.category-tile, .spotlight-card, .reading-list > a, .guide-grid > a, .product-card, .product-detail-visual, .trust-points li';
function setupTilt() {
  document.querySelectorAll(TILT_SELECTOR).forEach(card => {
    if (card.dataset.tilt) return;
    card.dataset.tilt = '1';
    card.classList.add('tilt');
    const max = card.matches('.product-detail-visual') ? 5 : 8;
    let frame;
    card.addEventListener('pointermove', event => {
      if (reducedMotion.matches || !finePointer.matches || event.pointerType !== 'mouse') return;
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        card.classList.add('is-tilting');
        card.style.transition = 'transform 80ms linear';
        card.style.transform = `perspective(900px) rotateX(${((0.5 - y) * max).toFixed(2)}deg) rotateY(${((x - 0.5) * max).toFixed(2)}deg) translateY(-4px)`;
        card.style.setProperty('--gx', `${(x * 100).toFixed(1)}%`);
        card.style.setProperty('--gy', `${(y * 100).toFixed(1)}%`);
      });
    });
    card.addEventListener('pointerleave', () => {
      cancelAnimationFrame(frame);
      card.classList.remove('is-tilting');
      card.style.transition = 'transform 500ms cubic-bezier(.23,1,.32,1)';
      card.style.transform = '';
    });
  });
}
setupTilt();

// Gentle depth on the homepage hero photo, following the pointer.
const hero = document.querySelector('.home-hero');
const heroImage = hero?.querySelector('.hero-image');
if (hero && heroImage) {
  hero.addEventListener('pointermove', event => {
    if (reducedMotion.matches || !finePointer.matches || innerWidth < 761) return;
    const rect = hero.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    heroImage.style.transform = `scale(1.04) translate3d(${(-x * 14).toFixed(1)}px, ${(-y * 10).toFixed(1)}px, 0)`;
  });
  hero.addEventListener('pointerleave', () => { heroImage.style.transform = ''; });
}
