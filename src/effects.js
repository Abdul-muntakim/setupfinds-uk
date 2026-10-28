import { animate } from 'motion/mini';
import VanillaTilt from 'vanilla-tilt';

// All content is visible before this optional enhancement loads.
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const precisePointer = matchMedia('(hover: hover) and (pointer: fine)');
const cards = [...document.querySelectorAll('.exact-card')];
const hero = document.querySelector('.exact-hero');
const animations = new Set();
let observer;
let stopSpotlight = () => {};

function reveal(element, delay = 0) {
  if (reducedMotion.matches || !Element.prototype.animate) return;
  const playback = animate(element, {
    opacity: [0.45, 1],
    transform: ['translateY(14px)', 'translateY(0)'],
  }, { duration: 0.48, delay, ease: [0.22, 1, 0.36, 1] });
  animations.add(playback);
  playback.then(() => {
    // Release filled Web Animations effects and their compositing layers.
    playback.cancel();
    animations.delete(playback);
  });
}

function startReveals() {
  if (reducedMotion.matches || !('IntersectionObserver' in window)) return;
  const candidates = document.querySelectorAll(
    '.exact-title-row, .exact-categories, .section-head, .guide-grid > a, .product-card, .article-hero, .product-detail-visual'
  );
  observer = new IntersectionObserver(entries => {
    let delay = 0;
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      // Animate only once. The observer never hides offscreen content.
      observer.unobserve(entry.target);
      reveal(entry.target, Math.min(delay++ * 0.045, 0.18));
    });
  }, { threshold: 0.08 });
  candidates.forEach(element => observer.observe(element));
  const heading = hero?.querySelector('h1');
  if (heading) reveal(heading);
}

function spotlight() {
  if (!hero) return () => {};
  let frame = 0;
  let x = 78;
  let y = 42;
  function paint() {
    hero.style.setProperty('--light-x', `${x}%`);
    hero.style.setProperty('--light-y', `${y}%`);
    frame = 0;
  }
  function move(event) {
    if (event.pointerType !== 'mouse') return;
    const bounds = hero.getBoundingClientRect();
    x = Math.max(45, Math.min(100, (event.clientX - bounds.left) / bounds.width * 100));
    y = Math.max(0, Math.min(100, (event.clientY - bounds.top) / bounds.height * 100));
    if (!frame) frame = requestAnimationFrame(paint);
  }
  function reset() {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    hero.style.removeProperty('--light-x');
    hero.style.removeProperty('--light-y');
  }
  hero.addEventListener('pointermove', move, { passive: true });
  hero.addEventListener('pointerleave', reset);
  return () => {
    hero.removeEventListener('pointermove', move);
    hero.removeEventListener('pointerleave', reset);
    reset();
  };
}

function updatePointerEffects() {
  cards.forEach(card => card.vanillaTilt?.destroy());
  stopSpotlight();
  if (reducedMotion.matches || !precisePointer.matches) return;
  VanillaTilt.init(cards, {
    max: 3.5, perspective: 1100, scale: 1.008,
    speed: 500, glare: false, gyroscope: false,
  });
  stopSpotlight = spotlight();
}

reducedMotion.addEventListener('change', () => {
  observer?.disconnect();
  animations.forEach(playback => playback.cancel());
  animations.clear();
  updatePointerEffects();
});
precisePointer.addEventListener('change', updatePointerEffects);
startReveals();
updatePointerEffects();
