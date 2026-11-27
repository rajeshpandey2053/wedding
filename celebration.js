'use strict';
// Let rose petals fall from the invitation's top edge as the curtains part.
window.celebrateFlowers = function celebrateFlowers() {
  if (document.documentElement.dataset.motion === 'off' || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const container = document.querySelector('#petals');
  const card = document.querySelector('.invitation-stage');
  if (!container || !card) return;
  container.replaceChildren();
  const bounds = card.getBoundingClientRect();

  for (let i = 0; i < 120; i++) {
    const petal = document.createElement('span');
    petal.className = 'celebration-particle';
    petal.setAttribute('aria-hidden', 'true');
    const shape = document.createElement('i');
    shape.className = 'rose-petal-shape';
    petal.append(shape);
    petal.style.setProperty('--tilt', `${-35 + Math.random() * 70}deg`);
    petal.style.setProperty('--tumble', `${3 + Math.random() * 3}s`);
    petal.style.left = `${bounds.left + Math.random() * bounds.width}px`;
    petal.style.top = `${Math.max(0, bounds.top) - 12}px`;
    petal.style.setProperty('--drift', `${(Math.random() - .5) * 90}px`);
    petal.style.setProperty('--fall', `${Math.min(window.innerHeight - Math.max(0, bounds.top) + 30, bounds.height)}px`);
    petal.style.setProperty('--spin', `${(Math.random() - .5) * 300}deg`);
    petal.style.setProperty('--size', `${15 + Math.random() * 15}px`);
    petal.style.animationDuration = `${4.5 + Math.random() * 2}s`;
    petal.style.animationDelay = `${i < 24 ? 0 : Math.random() * 2.2}s`;
    container.append(petal);
    petal.addEventListener('animationend', () => petal.remove(), { once: true });
    setTimeout(() => petal.remove(), 9500);
  }
};
