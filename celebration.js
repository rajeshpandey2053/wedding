'use strict';
// Let rose petals fall from the invitation's top edge as the curtains part.
window.celebrateFlowers = function celebrateFlowers() {
  if (document.documentElement.dataset.motion === 'off' || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const container = document.querySelector('#petals');
  const card = document.querySelector('.invitation-stage');
  if (!container || !card) return;
  container.replaceChildren();
  const bounds = card.getBoundingClientRect();
  const colors = [ ['#a81737','#e96781'], ['#7e102a','#c74760'], ['#bd3750','#f29aaa'], ['#a92643','#e67585'], ['#d0596f','#f7b5b7'] ];
  for (let i = 0; i < 120; i++) {
    const petal = document.createElement('span');
    petal.className = 'celebration-particle';
    petal.setAttribute('aria-hidden', 'true');
    const [dark, light] = colors[i % colors.length];
    petal.style.left = `${bounds.left + Math.random() * bounds.width}px`;
    petal.style.top = `${Math.max(0, bounds.top) - 12}px`;
    petal.style.setProperty('--petal-dark', dark);
    petal.style.setProperty('--petal-light', light);
    petal.style.setProperty('--drift', `${(Math.random() - .5) * 90}px`);
    petal.style.setProperty('--fall', `${Math.min(window.innerHeight - Math.max(0, bounds.top) + 30, bounds.height)}px`);
    petal.style.setProperty('--spin', `${(Math.random() - .5) * 300}deg`);
    petal.style.setProperty('--size', `${8 + Math.random() * 10}px`);
    petal.style.animationDuration = `${3.8 + Math.random() * 2}s`;
    petal.style.animationDelay = `${i < 24 ? 0 : Math.random() * 2.2}s`;
    container.append(petal);
    petal.addEventListener('animationend', () => petal.remove(), { once: true });
    setTimeout(() => petal.remove(), 8500);
  }
};
