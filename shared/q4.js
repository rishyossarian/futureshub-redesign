/* Quill 4.0 (quill-4.html): Quill 3.0 with the 8:27 pm closing and Is this for me? (her ask, 21 Nov). What we believe removed 24 Nov (her ask).
   Was: Quill 3.0 (quill-3.html): the mission first, after recurse.com, 80000hours.org, arena.education and hackclub.com (her picks, 21 Nov 2026).
   Who it is for in one line, then the reasons you come, alumni, beliefs, who it is for, dates, who is behind it, "Ready?".
   Loaded after que.js (QueBrief perspectives) and before site.js, which calls q3Page() and q3Wire().
   All copy is Claude's draft for Rishita to rewrite unless marked as quoted. */

// Hero photo options to compare (24 Nov, her ask): ?cover=1 alumni table (default, the one before) · 2 handshake · 3 alumni table on the right only, text side clear · 4 no photo
const Q4_COVER_N = new URLSearchParams(location.search).get('cover') || '1';
const Q4_COVER = { 1: 'alumni-table', 2: 'handshake', 3: 'alumni-table', 4: '' }[Q4_COVER_N] ?? 'alumni-table';
// Hero: her pick A without the floating cards, mission ending 1 ("a launchpad for global AI talent tackling frontier challenges", equitechfutures.com)
const q3Hero = () => `
  <section class="q3-hero" id="top"><div class="wrap">
    <div class="q3-hero-text">
      <h1>FuturesHub is a learning platform for curious minds who want to <span class="accent">shape AI, not just use it.</span></h1>
      <p class="lede">We give you the skills, confidence, community and funding to tackle pressing challenges in the Global South.</p>
      <div class="cta-row"><a class="btn btn-primary" href="${PRICING}">Start free</a><a class="btn btn-ghost" href="#think">Try a sample chapter</a></div>
    </div>
    ${Q4_COVER ? `<img class="q3-hero-photo${Q4_COVER_N === '3' ? ' q4-cover-side' : ''}" data-plx="-0.3" data-plx-max="110" src="${IMG}events/${Q4_COVER}.jpg" alt="">` : ''}
  </div>${marquee()}</section>`;

// The mission sentence as at 8:40 pm (her screenshot): full screen, large, left-aligned, the three reasons underlined.
// The page turns navy while it holds the middle of the screen (equitechfutures.com/ventures).
const q3Intro = () => { const [a, b, c] = Object.entries(Q3_REASONS).map(([id, r]) => `<a href="#${id}">${r.short}</a>`); return `
  <section class="q3-intro" id="why"><div class="wrap"><h2>You come to FuturesHub to ${a}, ${b}, and ${c}. <span class="q4-intro-2">Alongside mentors who believe in you.</span></h2></div></section>`; };

/* ---------- 01 Think: click through the three formats, each with a live preview ---------- */
const Q3_OFFERS = {
  quebook: 'Living textbooks that help you build the intellectual foundations to thrive in the age of AI. By Equitech Futures faculty, with charts you can play with and Que on every page.',
  case: 'A real decision someone had to make. Make the call yourself, then see what happened.',
  brief: 'One current question, what the research says, and the people who disagree about it.',
};
// Who writes it (her brilliant.org pick: "Built by learning experts from MIT and Harvard"). Universities from the faculty bios on equitechfutures.com/team;
// which faculty wrote which QueBook is to confirm with Equitech Futures.
const q3Authors = () => `
  <div class="q3-authors">
    <div class="q4-plx-frame"><img class="q3-authors-pic" data-plx="-0.1" data-plx-max="40" src="${IMG}events/writing.jpg" alt=""></div>
    <div><h3>Written by people who know the field.</h3>
      <p>Written by physicists, climate and planetary scientists and journalists, trained at some of the world’s best universities.</p>
      <span class="q3-unis">${[['caltech', 'Caltech'], ['oxford', 'University of Oxford'], ['virginia-tech', 'Virginia Tech'], ['cu-boulder', 'University of Colorado Boulder']].map(([f, n]) => `<img class="uni-${f}" src="${IMG}logos/${f}.svg" alt="${n}">`).join('')}</span></div>
  </div>`;
// What each format is, then its picture (her ask: the buttons just name them; the panel says what it is and shows it)
const q4Card = (k) => { const c = CARD[k]; return `<div class="q4-panel">
    <div><h3>${CHANNELS[k].name}</h3><p>${Q3_OFFERS[k]}</p></div>
    <img src="${IMG}${c.cover}" alt="${c.title}"></div>`; };
const q3Think = () => `
  <div class="q3-reason-grid">
    <div class="q3-pick" role="tablist" aria-orientation="vertical">${Object.keys(Q3_OFFERS).map((k, i) => `
      <button type="button" role="tab" id="ch-${k}" data-q3pick="${k}" aria-selected="${!i}"><strong>${CHANNELS[k].name}</strong></button>`).join('')}</div>
    <div class="q3-preview" role="tabpanel" aria-live="polite">${q4Card('quebook')}</div>
  </div>
  ${q3Authors()}`;

/* ---------- 02 People: two photo cards, then the faculty as office hours (no repeated faces) ---------- */
// Real FuturesHub masterclasses (ITEMS, channel 'live'), each with its cover; the skills under them, not a fixed list of four
const Q4_CLASSES = [
  ['writing-without-the-llm', 'Writing without the LLM', 'Say what you mean, in your own words.'],
  ['present-like-a-pro-on-zoom', 'Present like a Pro on Zoom', 'Hold a room, even through a screen.'],
  ['interviewing-effectively', 'Interviewing Effectively', 'Walk in knowing what to say.'],
  ['vibe-coding-with-google-ai-studio', 'Vibe Coding with Google AI Studio', 'Build a working prototype with AI.'],
];
const q4More = (label) => `<a class="btn btn-ghost btn-small q4-more" href="#calendar">${label}</a>`; // FuturesHub's own ghost button, no arrow
const q3People = () => `
  <div class="q4-kind" id="ch-live"><h3>Masterclasses</h3><p>One live session on a skill every field needs.</p>${q4More('See all masterclasses')}</div>
  <div class="q4-classes">${Q4_CLASSES.map(([slug, name, line]) => `
    <a class="q4-class" href="#calendar"><img src="${IMG}covers/${slug}.jpg" alt=""><strong>${name}</strong><span>${line}</span></a>`).join('')}</div>
  <div class="q4-kind" id="ch-cohort"><h3>Cohorts</h3><p>The same group and mentors, from the first week to the last.</p>${q4More('See all cohorts')}</div>
  <div class="q4-cohorts">${COHORTS.slice(0, 2).map((c) => `
    <a class="q4-cohort" href="#calendar"><img src="${IMG}${c.cover ? `covers/${c.cover}.jpg` : 'events/summer.jpg'}" alt=""><span><strong>${c.name}</strong>${c.text}</span></a>`).join('')}</div>
  <a class="q4-kind q4-office" id="ch-office" href="#"><h3>Office hours</h3><p>An hour one to one with any faculty member.</p></a>`; // no photo grid: people are already in the hero, the alumni and the "Written by" line (design critique, she agreed)

/* ---------- 03 Build: apply with Que, then the challenges as whole-card links, all pictures in one grey ---------- */
const Q3_CH_PIC = { 'Rise Innovation Challenge': 'events/fellows.webp' }; // was frontier.jpg, whose subject no longer works at Equitech Futures (her note, 25 Nov)
const Q3_CH_LINE = { 'AI for Science Challenge': 'Winners earned places at the AI for Science Summer School.' }; // the CH line repeated "talk with Que, not a CV"
const q3Build = () => `<i id="ch-challenge"></i>
  <div class="ch-cards q3-ch" id="challenge-cards">${CHALLENGES.map((c) => { const x = CH[c.name]; return `
    <a class="ch-card" href="#">
      <img class="ch-pic" src="${IMG}${Q3_CH_PIC[c.name] || x.pic}" alt="">
      <h4>${c.name}</h4><p>${Q3_CH_LINE[c.name] || x.line}</p>
      <span class="ch-logos">${x.logos.map((l) => typeof l === 'string' ? l : `<img src="${IMG}${l[0]}" alt="${l[1]}" title="${l[1]}">`).join('')}</span>
      <div class="ch-foot">${x.stats.slice(0, 1).map(([n, l]) => `<span><b>${n}</b><small>${l}</small></span>`).join('')}${c.past ? `<span class="chip chip-past">Past · ${c.past}</span>` : ''}</div>
    </a>`; }).join('')}</div>
  <p class="q4-more-row">${q4More('See all challenges')}</p>`;

const Q3_REASONS = {
  think: { group: 'read', short: 'think more clearly', title: 'Build the judgement <span class="accent">AI can’t give you.</span>', body: () => q3Think(),
    text: 'AI can hand you an answer in seconds. Knowing whether to trust it is slower work, and nobody can do it for you. Every page here is a conversation with Que, a learning companion that thinks with you, not for you.' },
  people: { group: 'live', short: 'find your people', title: 'Learn with a group, <span class="accent">and faculty beside you.</span>', body: () => q3People(),
    text: 'We think you learn more in company. Join a live masterclass for something you need now, learn from leading researchers alongside kindred spirits in our cohorts, or get hands on in our workshops. When you’re stuck, book an hour with a faculty member.' },
  build: { group: 'build', short: 'build something real', title: 'Work on a real problem, <span class="accent">and get funded for it.</span>', body: () => q3Build(),
    text: 'Pick a problem you care about and give it real time. Past winners have received awards of up to $10,000. Some challenges start with a conversation with Que, not with your CV.' },
};
const q3Reason = (id) => { const r = Q3_REASONS[id]; return `
  <section class="section q3-reason q3-${id}" id="${id}"><div class="wrap" id="group-${r.group}">
    <div class="q3-reason-head"><h2>${r.title}</h2><p class="lede">${r.text}</p></div>
    ${r.body()}
  </div></section>`; };

// Alumni with their own faces, as a slow continuous stream (pauses on hover). Quoted verbatim from equitechfutures.com/programs (21 Nov 2026).
const q3AlumniList = () => [
  ['seba-nazary.webp', 'Seba Nazary', 'Siemens Mobility, Germany · Applied Data Institute', TQ[3].text],
  ['sharon-nafuna.webp', 'Sharon Nafuna', 'Uganda · Civic Tech Institute', 'While working toward becoming a mental health researcher, I loved being part of a group of diverse and smart individuals from all over the world who are creating impact in their communities. It made for really enriching conversations.'],
  ['rawan-gafar.webp', 'Rawan Gafar', 'Egypt · Equitech Futures Institute', 'At Equitech Futures, I became much more confident and comfortable around data. I found the support that I needed to land my first role at a tech startup.'],
  ['fatima-bourhim.webp', 'Fátima Bourhim', 'Spain and Morocco · Civic Tech Institute', 'In order to make an impact, we need evidence-based solutions. The Civic Tech Institute challenged me to think about problems with a data mindset. How do we know which resources to trust? How do we process the data? Is there a global approach to the problem and the solution?'],
  ['sherry-xue.webp', 'Sherry Xue', 'Climate Innovation Challenge, China · Civic Tech Institute', TQ[4].text],
  ['riedwaan-fakier.webp', 'Riedwaan Fakier', 'South Africa · Civic Tech Institute', 'The core faculty come from different disciplines, so even if you already come to the Civic Tech Institute with advanced ideas on a topic, the conversations with the faculty and the cohort will allow you to take them further.'],
];
// Alumni as on Quill 2.0 / the 8:27 pm version (her ask): arrows, one photo card per person, their own faces. site.js wires [data-tq] on #tq.
const q3Alumni = () => `
  <section class="section q3-alumni"><div class="wrap">
    <div class="section-head tq-head"><h2>From Equitech Futures alumni</h2>
      <div class="tq-nav"><button type="button" data-tq="-1" aria-label="Previous quotes">←</button><button type="button" data-tq="1" aria-label="More quotes">→</button></div></div>
    <div class="tcards" id="tq">${q3AlumniList().map(([img, name, from, text]) => `
      <figure class="tcard"><img src="${IMG}people/${img}" alt=""><blockquote>“${text}”</blockquote><figcaption><strong>${name}</strong><span>${from}</span></figcaption></figure>`).join('')}</div>
  </div></section>`;

// The four questions from Quill 3.0 (her ask: back to the original), with her edits: no made-up alum line, "No." only,
// and "What's free?" from the Explorer plan on futureshub.com/pricing. "Who is FuturesHub for?" is the audience Equitech set (students 15+ and young professionals).
const Q3_FAQ = [
  ['Who is FuturesHub for?', 'FuturesHub is for you if you’re curious, 15 or older, and want to think for yourself about AI.'],
  ['Do I need a technical background?', 'No. QueBooks start from real cases and explain the methods as you go, and Que is there when a passage doesn’t land.'],
  ['What’s free?', 'The Explorer plan, free forever: selected QueBriefs and QueBook chapters, with limited Que interactions.'],
  ['Where do I start?', 'Anywhere: each part stands on its own. If you’re not sure, try a sample chapter with Que.'],
]
const q3Faq = () => `
  <section class="section q3-faq"><div class="wrap">
    <h2>Is this for me?</h2>
    <dl>${Q3_FAQ.map(([q, a]) => `<div><dt>${q}</dt><dd>${a}</dd></div>`).join('')}</dl>
  </div></section>`;

// The 8:27 pm closing, exactly as it was (white, the Foundations QueBook crossing the wave from the section above), with today's copy; no Que mascot (she is generating line art)
const q3Ready = () => `
  <section class="section q3-ready"><div class="wrap">
    <img class="q3-book" src="${IMG}covers/foundations-of-data-driven-thinking.jpg" alt="The QueBook Foundations of Data Driven Thinking">
    <div><h2>Not sure where to begin?</h2>
    <p class="lede">Become a member, or try a sample chapter with Que.</p>
    <div class="cta-row"><a class="btn btn-primary" href="${PRICING}">Start free</a><a class="btn btn-ghost" href="#think">Try a sample chapter</a></div></div>
  </div></section>`;

// "It's the learning platform of…": the 8:27 pm statement and numbers (her order: alumni, beliefs, FAQ, calendar, this, Ready). Quoted from equitechfutures.com.
const q3Behind = () => `
  <section class="section q3-behind" id="faculty"><div class="wrap">
    <h2>FuturesHub is the learning platform of <span class="accent">Equitech Futures</span>, a launchpad for global AI talent tackling frontier challenges.</h2>
    <p class="lede"><a href="https://www.equitechfutures.com/">More about Equitech Futures →</a></p>
    ${proofRow()}
  </div></section>`;

const q3Page = () => {
  return [q3Hero(), q3Intro(), q3Reason('think'), que(), q3Reason('people'), q3Reason('build'),
    q3Alumni(), q3Faq(), evMonthPage(true), q3Behind(), q3Ready()].join('');
};

const q3Wire = () => {
  // "Become a member" instead of "Start free" on every button (her ask; futureshub.com says "Become a Member"), header and Que section included
  document.querySelectorAll('a.btn').forEach((a) => { if (a.textContent.trim() === 'Start free') a.textContent = 'Become a member'; });
  // A soft wave only where the colour changes (her 80000hours.org pick); none around the navy mission moment
  const bg = (el) => getComputedStyle(el).backgroundColor;
  const secs = [...document.querySelectorAll('#app > section:not(.q3-hero):not(.q3-intro)')]; // none into the footer, as at 8:27 pm
  secs.slice(0, -1).forEach((s, i) => { const c = bg(secs[i + 1]); if (bg(s) !== c && !s.matches('.q3-alumni')) { // straight edge under the alumni, as at 8:27 pm
    s.classList.add('q3-wave'); s.style.setProperty('--wave', c); } });
  document.querySelector('.q3-behind').classList.add('q3-wave-827'); // the 8:27 pm wave into the closing (her screenshot)

  // Parallax (24 Nov experiment, her ask): each [data-plx] layer moves at its own speed against the scroll,
  // by its distance from the middle of the screen times its factor (negative = slower than the page), capped at data-plx-max px (default 30)
  // so layers near the page's ends never drift far. Off with ?parallax=0 or reduced motion.
  document.querySelector('#que .que-mark-lg')?.setAttribute('data-plx', '0.15');
  const plx = [...document.querySelectorAll('[data-plx]')];
  if (new URLSearchParams(location.search).get('parallax') !== '0' && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let queued = false;
    const move = () => { queued = false; plx.forEach((el) => { const r = el.parentElement.getBoundingClientRect(); const max = +(el.dataset.plxMax || 30); el.style.setProperty('--plx', `${Math.max(-max, Math.min(max, (r.top + r.height / 2 - innerHeight / 2) * el.dataset.plx)).toFixed(1)}px`); }); };
    addEventListener('scroll', () => { if (!queued) { queued = true; requestAnimationFrame(move); } }, { passive: true }); move();
  }

  // The page turns navy while the mission sentence holds the middle of the screen
  const intro = document.querySelector('.q3-intro');
  new IntersectionObserver(([e]) => document.body.classList.toggle('q3-dark', e.isIntersecting), { rootMargin: '-45% 0px -45% 0px' }).observe(intro);

  const pick = (k) => {
    const b = document.querySelector(`[data-q3pick="${k}"]`); if (!b) return;
    b.parentElement.querySelectorAll('[data-q3pick]').forEach((x) => x.setAttribute('aria-selected', x === b));
    document.querySelector('.q3-preview').innerHTML = clean(q4Card(k));
  };
  document.querySelectorAll('[data-q3pick]').forEach((b) => b.addEventListener('click', () => pick(b.dataset.q3pick)));
  addEventListener('hashchange', () => pick(location.hash.slice(4))); // nav links to #ch-case etc.
};
