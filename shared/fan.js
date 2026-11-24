/* Brilliant-style card fan for Que (brilliant.org hero; her ask, 19 Nov 2026): a headline, then a tilted row of cards.
   Each card is one live Que or QueBook moment: check-in, Flu Trends chart, hint, Data-Theory Matrix, claims, another
   explanation, perspectives, ask anything. Nothing graded (not live). Three placements to compare, set by body data-fan:
   "hero" (que-fan-hero.html), "strip" (que-fan-strip.html), "meet" (lp1-fan.html). Loaded before site.js. */

const fanQue = (t) => `<p class="fan-que">${QUE_ICON}<span>${t}</span></p>`;
const fanBtns = (labels, on = -1) => `<div class="fan-btns">${labels.map((l, i) => `<span${i === on ? ' class="on"' : ''}>${l}</span>`).join('')}</div>`;
const fanFlu = () => `<svg class="fan-chart" viewBox="0 0 160 70" aria-hidden="true"><path d="M0 64H160" stroke="#d5dee6"/>
  <polyline fill="none" stroke="#0fa68e" stroke-width="2.5" points="0,62 16,60 26,40 36,60 56,60 66,44 76,60 96,60 106,50 116,60 130,60 140,32 150,60 160,62"/>
  <polyline fill="none" stroke="#0489dc" stroke-width="2.5" points="0,62 16,60 26,28 36,60 56,60 66,42 76,60 96,60 106,44 116,60 130,60 140,6 150,60 160,62"/></svg>`;

const FAN_CARDS = () => [
  ['In your own words: why do models get narrower, not noisier?', `<div class="fan-input">Rare things get generated less…</div>${fanBtns(['Check', 'Hint'], 0)}<span class="fan-count">Check-in 1 / 8</span>`],
  ['Tap a line to compare.', `${fanFlu()}<div class="fan-legend"><span class="b">Google prediction</span><span class="t">CDC actual</span></div>`],
  ['Stuck? Ask for a hint.', fanQue('Think about which kinds of text a model produces most often.')],
  ['Click a square to reveal it.', `<div class="fan-matrix">${MATRIX.map(([q, a], i) => `<span${i === 2 ? ' class="on"' : ''}>${i === 2 ? a : q}</span>`).join('')}</div>`],
  ['Supported, contested or still open?', `<p class="fan-claim">“Detectors can reliably spot AI text.”</p>${fanBtns(['Supported', 'Contested', 'Open'], 1)}`],
  ['Explain it another way.', `<p class="fan-b">Each generation keeps the common cases.</p>${fanQue('Like a playlist rebuilt from last week’s hits.')}`],
  ['Read it from another field.', `${fanBtns(['ML research', 'Economics', 'Policy'], 0)}<p class="fan-quote">“The question is the ratio, not whether synthetic data is used at all.”</p>`],
  ['Ask Que anything.', `<p class="fan-b fan-you">What does “the tails” mean here?</p>${fanQue('The rare cases at the edges of the data.')}`],
];

const fanRow = () => {
  const cards = FAN_CARDS();
  return `<div class="fan" aria-hidden="true">${cards.map(([p, body], i) => `
    <article class="fan-card" style="--i:${i - (cards.length - 1) / 2}"><p class="fan-p">${p}</p>${body}</article>`).join('')}</div>`;
};

const FAN_LEDE = 'Read QueBooks, case studies and QueBriefs with Que, the AI learning companion that checks your understanding, gives hints and explains ideas another way.';

// 1. Read with Que page: the cards replace the laptop as the hero
const fanHero = () => `
  <section class="fan-hero" id="top"><div class="wrap">
    <h1>Your reading partner for <span class="accent">AI, data and society</span></h1>
    <p class="lede">${FAN_LEDE}</p>
    <div class="cta-row"><a class="btn btn-primary" href="${PRICING}">Start free</a><a class="btn btn-ghost" href="#brief">Try a sample brief</a></div>
  </div>${fanRow()}</section>`;

// 2. Read with Que page: laptop hero kept, the cards as a strip right under it
const fanStrip = () => `
  <section class="fan-strip"><div class="wrap">
    <h2>Que is on <span class="accent">every page</span></h2>
    <p class="lede">Check-ins, hints, new explanations and widgets you can play with.</p>
  </div>${fanRow()}</section>`;

// 3. Front page: the cards open the Meet Que section, above the live demo
const fanMeet = () => `
  <div class="section-head center fan-meet">
    <img class="que-mark-lg" src="${IMG}que/que-asking-light.svg" alt="">
    <h2>Meet <span class="accent">Que</span>, your AI learning companion</h2>
    <p class="lede">${FAN_LEDE}</p>
  </div>${fanRow()}`;
