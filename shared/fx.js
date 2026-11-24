/* Pinned mission band and hero zoom (fx.css has the why). Off with reduced motion. */
(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.body.dataset.fx = '1';

  // Mission band: three steps, each with its own picture and a 01 / 03 counter (people in every one, her ask: a group round a laptop, a handshake, Rhodes Forum prize-winners; sharp ones from equitechfutures.com; none repeated on the page, 25 Nov)
  const intro = document.querySelector('.q3-intro'), h2 = intro.querySelector('h2'), links = [...h2.querySelectorAll('a')];
  intro.querySelector('.wrap').insertAdjacentHTML('afterbegin', `<div class="fx-scenes" aria-hidden="true">${['events/think-together.webp', 'events/handshake.jpg', 'events/forum-winners.webp'].map((p) => `<img src="${IMG}${p}" alt="">`).join('')}</div>`);
  h2.classList.add('fx-step'); h2.insertAdjacentHTML('afterend', '<p class="fx-count" aria-hidden="true"></p>');
  // The faculty-and-partners strip moves into the band's section and sticks under the header, so nothing white opens above the pinned band (her ask, 25 Nov)
  const marq = document.querySelector('.q3-hero .marquee'), head = document.querySelector('.header');
  if (marq) intro.prepend(marq);
  const size = () => { document.body.style.setProperty('--fxhdr', `${head.offsetHeight}px`); document.body.style.setProperty('--fxm', `${marq ? marq.offsetHeight : 0}px`); };
  size(); addEventListener('resize', size);
  const scenes = [...intro.querySelectorAll('.fx-scenes img')], count = intro.querySelector('.fx-count');
  let step = -1;
  const setStep = (n) => { if (n === step) return; step = n; [links, scenes].forEach((set) => set.forEach((x, k) => x.classList.toggle('on', k === n))); count.textContent = n < 0 ? '' : `0${n + 1} / 03`; };

  const hero = document.querySelector('.q3-hero');
  let queued = false;
  const frame = () => {
    queued = false;
    const r = intro.getBoundingClientRect(), p = Math.max(0, Math.min(0.999, (head.offsetHeight - r.top) / (innerHeight * 0.6))); // 0 → 1 while the band is pinned
    setStep(p < 0.08 ? -1 : Math.floor((p - 0.08) / 0.92 * 3)); // nothing lit until you scroll into the band (her ask, 25 Nov), then one phrase at a time
    hero.style.setProperty('--fxh', Math.max(0, Math.min(1, scrollY / hero.offsetHeight)).toFixed(3));
  };
  addEventListener('scroll', () => { if (!queued) { queued = true; requestAnimationFrame(frame); } }, { passive: true });
  frame();
})();
