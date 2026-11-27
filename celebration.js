'use strict';
// A brief shower of flowers and golden sparkles after the curtains open.
window.celebrateFlowers = function celebrateFlowers() {
  if (document.documentElement.dataset.motion === 'off' || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const container = document.querySelector('#petals');
  if (!container) return;
  container.replaceChildren();
  const colors = ['#bd3450', '#e79566', '#f2c96f', '#fff0d4', '#ca6b80'];
  for (let i = 0; i < 32; i++) {
    const particle = document.createElement('span');
    particle.className = 'celebration-particle';
    particle.setAttribute('aria-hidden', 'true');
    particle.textContent = i % 4 === 0 ? '✦' : '✿';
    particle.style.color = colors[i % colors.length];
    particle.style.setProperty('--drift', `${(Math.random() - .5) * 105}vw`);
    particle.style.setProperty('--rise', `${-20 - Math.random() * 55}vh`);
    particle.style.setProperty('--spin', `${(Math.random() - .5) * 720}deg`);
    particle.style.setProperty('--size', `${12 + Math.random() * 17}px`);
    particle.style.animationDelay = `${Math.random() * .45}s`;
    container.append(particle);
    particle.addEventListener('animationend', () => particle.remove(), { once: true });
    setTimeout(() => particle.remove(), 5000);
  }
};
