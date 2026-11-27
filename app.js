'use strict';
const dialog = document.querySelector('#curtain-dialog');
const openButton = document.querySelector('#open-curtain');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
let motion = !reduced.matches;
try { const saved = localStorage.getItem('wedding-motion'); if (saved !== null) motion = saved === 'on' && !reduced.matches; } catch {}
document.documentElement.dataset.motion = motion ? 'on' : 'off';
let revealTimer, showerTimer;
function finishReveal() {
  clearTimeout(revealTimer);
  clearTimeout(showerTimer);
  if (dialog.open) dialog.close();
  document.body.classList.remove('curtain-active');
  document.querySelector('.invitation-stage').classList.add('revealed');
}
function openCurtain(skip = false) {
  openButton.disabled = true;
  dialog.classList.add('opening');
  document.querySelector('.invitation-stage').classList.add('revealed');
  if (skip || !motion) { finishReveal(); return; }
  showerTimer = setTimeout(() => window.celebrateFlowers(), 853);
  revealTimer = setTimeout(finishReveal, 2300);
}
openButton.onclick = () => openCurtain();
dialog.addEventListener('cancel', e => { e.preventDefault(); finishReveal(); });
document.body.classList.add('curtain-active');
dialog.showModal();
openButton.focus();
