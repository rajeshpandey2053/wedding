'use strict';
// Keep one overlay in place: reparenting animated petals restarts CSS animations.
let flowerCleanup;
window.stopFlowerShower = function () {
  clearTimeout(flowerCleanup);
  const layer = document.querySelector('#petals');
  layer.replaceChildren();
  if (layer.matches(':popover-open')) layer.hidePopover();
};
window.celebrateFlowers = function celebrateFlowers() {
  if (document.documentElement.dataset.motion === 'off' || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const container = document.querySelector('#petals');
  const card = document.querySelector('.invitation-stage');
  if (!container || !card) return;
  window.stopFlowerShower();
  if (container.showPopover) {
    container.setAttribute('popover', 'manual');
    container.showPopover();
  }
  flowerCleanup = setTimeout(window.stopFlowerShower, 3500);
  const bounds = card.getBoundingClientRect();

  for (let i = 0; i < 120; i++) {
    const petal = document.createElement('span');
    petal.className = 'celebration-particle';
    petal.setAttribute('aria-hidden', 'true');
    const shape = document.createElement('i');
    shape.className = 'rose-petal-shape';
    petal.append(shape);
    petal.style.setProperty('--tilt', `${-35 + Math.random() * 70}deg`);
    petal.style.setProperty('--tumble', `${1.4 + Math.random()}s`);
    petal.style.left = `${bounds.left + Math.random() * bounds.width}px`;
    petal.style.top = `${Math.max(0, bounds.top) - 12}px`;
    petal.style.setProperty('--drift', `${(Math.random() - .5) * 90}px`);
    petal.style.setProperty('--fall', `${Math.min(window.innerHeight - Math.max(0, bounds.top) + 30, bounds.height)}px`);
    petal.style.setProperty('--spin', `${(Math.random() - .5) * 300}deg`);
    petal.style.setProperty('--size', `${9 + Math.random() * 8}px`);
    const delay = i < 24 ? 0 : (i - 24) / 95 * .65;
    petal.style.animationDuration = `${3.5 - delay}s`;
    petal.style.animationDelay = `${delay}s`;
    container.append(petal);
    petal.addEventListener('animationend', () => petal.remove(), { once: true });

  }
};
