/* FuturesHub LP6: Brilliant-inspired layout (brilliant.org), FuturesHub colours, fonts and content.
   Loaded before site.js; site.js calls lp6Page() at render time and lp6Wire() after it. */

const LAUREL = (flip) => `<svg viewBox="0 0 24 44" width="20" height="38" aria-hidden="true"${flip ? ' style="transform:scaleX(-1)"' : ''}>
  <path d="M17 41C7 34 5 18 13 4" fill="none" stroke="currentColor" stroke-width="1.4"/>${[[15, 8, 35], [11, 16, 15], [9, 25, 0], [10, 33, -20]]
  .map(([x, y, r]) => `<ellipse cx="${x - 4}" cy="${y}" rx="4" ry="2" transform="rotate(${r} ${x} ${y})"/><ellipse cx="${x + 4}" cy="${y - 2}" rx="4" ry="2" transform="rotate(${r - 70} ${x} ${y})"/>`).join('')}</svg>`;
const award = (top, bottom) => `<span class="l6-award">${LAUREL(false)}<span><b>${top}</b>${bottom}</span>${LAUREL(true)}</span>`;

const l6Hero = () => `
  <section class="l6-hero" id="top"><div class="wrap">
    <h1>[Human Intelligence,]<br><span class="accent">[Amplified]</span></h1>
    <p class="lede">AI is reshaping how we work and create. FuturesHub builds the deep judgement and creative confidence that you need to take to shape that transformation.</p>
    <div class="l6-ctas"><a class="l6-btn l6-btn-go" href="${PRICING}">Start free</a><a class="l6-btn l6-btn-light" href="#que">Try a Que check-in</a></div>
    <div class="l6-awards">${award('Faculty from', 'Caltech · Oxford · UChicago')}${award('300+ alumni', 'in 70+ countries')}${award('$2M', 'in scholarships')}</div>
  </div>
  <div class="l6-fan" aria-hidden="true"><div class="l6-fan-track">${[
    MOCKS.quebook(), mock('QueBook widget', fluChart()), MOCKS.case(), MOCKS.brief(), MOCKS.live(), MOCKS.challenge(),
  ].map((m, i, all) => `<div class="l6-fan-card" style="--dy:${((i - (all.length - 1) / 2) ** 2) * 10}px">${m}</div>`).join('')}</div></div>
  </section>`;

const l6QueMore = () => `<section class="l6-sec l6-que-more"><div class="wrap">${queMore()}</div></section>`;

const tabs = (name, entries, sel) => `<div class="l6-tabs" role="tablist">${entries.map(([k, label, id]) =>
  `<button type="button" role="tab" data-l6tab="${name}" data-key="${k}"${id ? ` id="${id}"` : ''} aria-selected="${k === sel}">${label}</button>`).join('')}</div>`;

const L6_PANELS = {
  topic: (k) => `<div class="l6-covered">
    <div><h3>${TOPICS[k].name}: what’s covered</h3><p class="muted">${TOPICS[k].sub}</p></div>
    <ul>${currentFirst(ITEMS.filter((i) => i.topic === k)).map((i) => `<li>${icon(i.channel)}<span><strong>${i.name}</strong><span class="muted small">${CHANNELS[i.channel].name}${i.past ? ' · past' : ''}</span></span></li>`).join('')}</ul>
  </div>`,
  fmt: (k) => { const c = CHANNELS[k]; return `<div class="l6-fmt">
    <div><h3>${c.name}</h3><p>${c.def}</p><p class="muted">${c.length} · ${c.price}</p><a class="l6-link" href="${k === 'challenge' ? '#' : '#calendar'}">${k === 'challenge' ? 'See the challenges' : 'See what’s on'} →</a></div>
    ${MOCKS[k]()}
  </div>`; },
};

const l6Topics = () => { const first = Object.keys(TOPICS)[0]; return `
  <section class="l6-sec" id="group-read"><div class="wrap">
    <div class="l6-head"><h2>Five topics, <span class="accent">every format</span></h2>
      <p>Read with Que in ${['quebook', 'case', 'brief'].map((k) => `<span class="l6-fmt-name" id="ch-${k}">${CHANNELS[k].name}</span>`).join(', ')}, then take it further live.</p></div>
    ${tabs('topic', Object.entries(TOPICS).map(([k, t]) => [k, t.name]), first)}
    <div class="l6-panel" data-l6panel="topic">${L6_PANELS.topic(first)}</div>
  </div></section>`; };

const l6Formats = () => `
  <section class="l6-sec l6-alt" id="group-live"><div class="wrap" id="group-build">
    <div class="l6-head"><h2>Learn with others, <span class="accent">build something</span></h2><p>${GROUPS.live.sub} ${GROUPS.build.sub}</p></div>
    ${tabs('fmt', ['live', 'cohort', 'office', 'challenge'].map((k) => [k, CHANNELS[k].name, `ch-${k}`]), 'live')}
    <div class="l6-panel" data-l6panel="fmt">${L6_PANELS.fmt('live')}</div>
  </div></section>`;

const l6Trust = () => `
  <section class="l6-sec" id="faculty"><div class="wrap l6-trust">
    <article class="l6-tile"><h3>Taught by Equitech Futures faculty</h3><p>[Drawn from top universities (Caltech, Oxford, UChicago)].</p>
      <div class="l6-faces">${['abhilash', 'thomas', 'nikita', 'azania', 'amy'].map((k) => avatar(PEOPLE[k], 56)).join('')}</div></article>
    <article class="l6-tile"><h3>Real cases, real funding</h3><p>Decide what Sama should do about its hidden workforce. Enter the Rise Innovation Challenge for awards up to $10,000.</p></article>
    <article class="l6-tile"><h3>A global community</h3>
      <dl class="l6-nums">${PROOF.map(([n, l]) => `<div><dt>${n}</dt><dd>${l}</dd></div>`).join('')}</dl><p class="muted small">Equitech Futures figures, the team behind FuturesHub.</p></article>
    <article class="l6-tile l6-tile-go"><h3>Free to start</h3><p>The first 2 chapters of every QueBook, selected QueBriefs, and every challenge.</p><a class="l6-btn l6-btn-go" href="${PRICING}">Start free</a></article>
  </div></section>`;

const l6Quotes = () => `
  <section class="l6-sec l6-alt"><div class="wrap"><div class="l6-head center"><h2>From Equitech Futures <span class="accent">alumni</span></h2>
    <p class="ph-label">Placeholder: quotes from Equitech Futures programmes until FuturesHub learners are quoted</p></div></div>
    <div class="l6-marquee"><div class="l6-track">${[...QUOTES, ...QUOTES].map((q, i) => `
      <figure class="quote"${i >= QUOTES.length ? ' aria-hidden="true"' : ''}><blockquote>“${q.text}”</blockquote>
        <figcaption><img class="avatar" src="${IMG}people/${q.img}" alt="" width="44" height="44"><span><strong>${q.name}</strong><span class="muted small">${q.from}</span></span></figcaption></figure>`).join('')}</div></div>
  </section>`;

const l6Close = () => `
  <section class="l6-sec l6-close"><div class="wrap">
    <h2>[Helping the Next Generation of Innovators] <span class="accent">[Build the Future.]</span></h2>
    <a class="l6-btn l6-btn-go" href="${PRICING}">[Start Learning]</a>
  </div></section>`;

const lp6Page = () => [l6Hero(), que(), l6QueMore(), l6Topics(), l6Formats(), calendar(), l6Trust(), l6Quotes(), l6Close()].join('');

const lp6Wire = () => {
  const pick = (b) => {
    document.querySelectorAll(`[data-l6tab="${b.dataset.l6tab}"]`).forEach((x) => x.setAttribute('aria-selected', x === b));
    document.querySelector(`[data-l6panel="${b.dataset.l6tab}"]`).innerHTML = clean(L6_PANELS[b.dataset.l6tab](b.dataset.key));
  };
  document.querySelectorAll('[data-l6tab]').forEach((b) => b.addEventListener('click', () => pick(b)));
  // Nav links to a format (e.g. #ch-cohort) open its tab.
  const fromHash = () => { const t = location.hash && document.querySelector(`${location.hash}[data-l6tab]`); if (t) pick(t); };
  addEventListener('hashchange', fromHash); fromHash();
};
