'use strict';
// Shower roses from the top edge of the invitation after the curtains open.
window.celebrateFlowers = function celebrateFlowers() {
  if (document.documentElement.dataset.motion === 'off' || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const container = document.querySelector('#petals');
  const card = document.querySelector('.invitation-stage');
  if (!container || !card) return;
  container.replaceChildren();
  const bounds = card.getBoundingClientRect();
  for (let i = 0; i < 76; i++) {
    const rose = document.createElement('span');
    rose.className = 'celebration-particle';
    rose.setAttribute('aria-hidden', 'true');
    rose.textContent = '🌹';
    rose.style.left = `${bounds.left + Math.random() * bounds.width}px`;
    rose.style.top = `${Math.max(0, bounds.top) - 28}px`;
    rose.style.setProperty('--drift', `${(Math.random() - .5) * 100}px`);
    rose.style.setProperty('--fall', `${Math.min(window.innerHeight, Math.max(240, bounds.height))}px`);
    rose.style.setProperty('--spin', `${(Math.random() - .5) * 400}deg`);
    rose.style.setProperty('--size', `${14 + Math.random() * 15}px`);
    rose.style.animationDuration = `${2.8 + Math.random() * 1.7}s`;
    rose.style.animationDelay = `${Math.random() * 1.5}s`;
    container.append(rose);
    rose.addEventListener('animationend', () => rose.remove(), { once: true });
    setTimeout(() => rose.remove(), 6500);
  }
};
