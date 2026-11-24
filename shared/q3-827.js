/* Quill 3.0 (quill-3.html): the mission first, after recurse.com, 80000hours.org, arena.education and hackclub.com (her picks, 21 Nov 2026).
   Who it is for in one line, then the reasons you come (each with its offerings to click through), alumni, beliefs, who it is for, dates,
   who is behind it, "Ready?". Loaded after que.js (QueBrief perspectives) and before site.js, which calls q3Page() and q3Wire().
   All copy is Claude's draft for Rishita to rewrite unless marked as quoted. */

// Hero and mission line options, switched in the page (?hero=a|b|c&m=1-5), like Quill 2.0's hero options.
// Mission endings are Equitech Futures' own words (equitechfutures.com home and programs pages, read 21 Nov 2026).
const Q3_MISSIONS = {
  1: 'tackle frontier challenges.', // "a launchpad for global AI talent tackling frontier challenges"
  2: 'make innovation more inclusive.', // "We have one mission. Making innovation more inclusive."
  3: 'solve real-world problems with AI.', // "use AI, data, and innovation to solve real-world challenges"
  4: 'shape an equitable future for technology.', // Equitech Futures Institute: "shape an equitable future for the tech ecosystem"
  5: 'become the entrepreneurs, researchers and civic leaders of the AI age.', // "incubate the next generation of entrepreneurs, researchers, and civic leaders for the AI age"
};
const q3Opt = (key, fallback, ok) => { const v = new URLSearchParams(location.search).get(key); return ok.includes(v) ? v : fallback; };
const q3HeroOpts = (hero, m) => `<nav class="hero-opts q3-opts" aria-label="Hero options (mockup only)">Hero ${['a', 'b', 'c'].map((x) => `<a href="?hero=${x}&m=${m}"${x === hero ? ' aria-current="true"' : ''}>${x.toUpperCase()}</a>`).join('')}
  · Mission ${Object.keys(Q3_MISSIONS).map((x) => `<a href="?hero=${hero}&m=${x}"${x === m ? ' aria-current="true"' : ''} title="…to ${Q3_MISSIONS[x]}">${x}</a>`).join('')}</nav>`;

// a: people and product together · b: one big photo · c: the product
const Q3_VISUAL = {
  a: () => `<div class="q3-collage" aria-hidden="true">
    <img src="${IMG}events/alumni-table.jpg" alt="">
    <div class="q3-float q3-float-que"><p class="mock-q">${QUE_ICON}Were textbooks a necessary, sufficient or contributory cause of learning?</p>
      <p class="mock-fb"><b>⇆</b>Good: contributory. Now say what else had to be in place.</p></div>
    <div class="q3-float q3-float-live"><img src="${IMG}covers/${UPCOMING[1].slug}.jpg" alt=""><span><b>Live · ${UPCOMING[1].date}</b>${UPCOMING[1].name}</span></div>
  </div>`,
  b: () => `<img class="q3-hero-photo" src="${IMG}events/handshake.jpg" alt="">`,
  c: () => heroPreview(),
};
const q3Hero = () => {
  const hero = q3Opt('hero', 'a', ['a', 'b', 'c']), m = q3Opt('m', '1', Object.keys(Q3_MISSIONS));
  return `
  <section class="q3-hero q3-hero-${hero}" id="top"><div class="wrap">
    ${q3HeroOpts(hero, m)}
    <div class="q3-hero-text">
      <h1>FuturesHub is a learning platform for curious minds who want to <span class="accent">shape AI, not just use it.</span></h1>
      <div class="q3-side"><p class="lede">We give you the skills, community, funding and confidence to ${Q3_MISSIONS[m]}</p>
      <div class="cta-row"><a class="btn btn-primary" href="${PRICING}">Start free</a><a class="btn btn-ghost" href="#think">Try a sample chapter</a></div></div>
    </div>
    ${Q3_VISUAL[hero]()}
  </div>${marquee()}</section>`;
};

/* ---------- Click-through previews: one per offering ---------- */
const CASE_OPTS = ['The contract and the jobs it brings', 'What the work does to the people doing it', 'How it will look if it goes public'];
const Q3_PREVIEW = {
  quebook: () => MOCKS.quebook(),
  // A case asks you to decide before it shows what happened; Que's follow-up is illustrative.
  case: () => mock('Make the call', `<strong>Sama: The Ethics of AI’s Hidden Workforce</strong>
    <p class="muted small">You lead the company. A major client asks for a new kind of labelling work. What do you weigh first?</p>
    <div class="q3-case">${CASE_OPTS.map((o, i) => `<button type="button" data-case="${i}" aria-pressed="false">${o}</button>`).join('')}</div>
    <div class="bubble" id="q3-case-que" hidden><div class="who">Que</div>Why that first? Before you see what Sama decided, who else does this choice affect?</div>`, 'Illustrative'),
  // "Perspectives from the Field" from the live QueBrief (her favourite widget); stakeholder text from que.js.
  brief: () => mock('QueBrief · Perspectives', `<strong>${BRIEF.title}</strong>
    <p class="muted small">One problem, six stakeholders. Pick one to hear their side.</p>
    <div class="q3-persp">${PERSPECTIVES.map(([who], i) => `<button type="button" data-persp3="${i}" aria-pressed="${!i}">${who}</button>`).join('')}</div>
    <blockquote class="q3-say" id="q3-say">“${PERSPECTIVES[0][1]}”</blockquote>`),
  live: () => MOCKS.live(),
  cohort: () => MOCKS.cohort(),
  office: () => MOCKS.office(),
};
const Q3_OFFERS = {
  quebook: 'Interactive textbooks by Equitech Futures faculty, with charts and widgets you can play with. Que is on every page.',
  case: 'A real decision someone had to make. Make the call yourself, then see what happened.',
  brief: 'One current question, what the research says, and the people who disagree about it.',
  live: 'Masterclasses and workshops with Equitech Futures faculty and guests, from AI adoption to interviewing.',
  cohort: 'The same group and mentors for weeks or months. The Admit Track is open now.',
  office: 'An hour one to one with a faculty member, on research, leadership or writing.',
};
const q3Picker = (keys) => `
  <div class="q3-pick" role="tablist" aria-orientation="vertical">${keys.map((k, i) => `
    <button type="button" role="tab" id="ch-${k}" data-q3pick="${k}" aria-selected="${!i}"><strong>${CHANNELS[k].name}</strong><span>${Q3_OFFERS[k]}</span></button>`).join('')}</div>`;

/* ---------- The three reasons ---------- */
const Q3_REASONS = {
  think: { group: 'read', short: 'think more clearly', title: 'Build the judgement <span class="accent">AI can’t give you.</span>', keys: ['quebook', 'case', 'brief'],
    text: 'AI can hand you an answer in seconds. Here you work out whether to trust it. Everything you read starts from a real problem, and Que asks you questions as you go.' },
  people: { group: 'live', short: 'find your people and get mentored', title: 'Learn with a group, <span class="accent">and faculty beside you.</span>', keys: ['live', 'cohort', 'office'],
    text: 'Join a live class, stay with the same group for months, or book an hour with a faculty member when you’re stuck.' },
  build: { group: 'build', short: 'build something real', title: 'Work on a real problem, <span class="accent">and get funded for it.</span>',
    text: 'Pick a problem you care about and show what you can do with it. Past winners went to the AI for Science Summer School and the Equitech Futures Institute, with awards worth up to $10,000.' },
};
const q3Reason = (id, tint = '') => { const r = Q3_REASONS[id]; return `
  <section class="section q3-reason ${tint}" id="${id}"><div class="wrap" id="group-${r.group}">
    <div class="q3-reason-head"><h2>${r.title}</h2><p class="lede">${r.text}</p></div>
    ${r.keys ? `<div class="q3-reason-grid">${q3Picker(r.keys)}<div class="q3-preview" role="tabpanel" aria-live="polite">${Q3_PREVIEW[r.keys[0]]()}</div></div>` : ''}
    ${id === 'people' ? `<div class="q3-faculty">${Object.values(PEOPLE).map((p) => `
      <article class="person"><img class="photo" src="${IMG}people/${p.img}" alt=""><h4>${p.name}</h4><p class="cred">${p.cred}</p></article>`).join('')}</div>` : ''}
    ${id === 'build' ? q3Build() : ''}
  </div></section>`; };

// Challenge cards: the whole card is the link, every picture in the same grey (Rise had a logo tile)
const Q3_CH_PIC = { 'Rise Innovation Challenge': 'events/frontier.jpg' };
const q3Build = () => `<i id="ch-challenge"></i>
  <div class="q3-apply">
    <div><h3>Apply with Que, not a CV.</h3>
      <p>Your grades and your CV don’t decide this. Some challenges start with a conversation with Que about a problem you care about, and people on the Equitech Futures team read every one.</p></div>
    ${MOCKS.challenge()}
  </div>
  <div class="ch-cards q3-ch" id="challenge-cards">${CHALLENGES.map((c) => { const x = CH[c.name]; return `
    <a class="ch-card" href="#">
      <img class="ch-pic" src="${IMG}${Q3_CH_PIC[c.name] || x.pic}" alt="">
      <h4>${c.name} <span aria-hidden="true">→</span></h4><p>${x.line}</p>
      <div class="ch-marks"><span class="ch-topics">${x.topics.map((t) => `<span title="${t}">${svg(TOPIC[t])}<span class="sr">${t}</span></span>`).join('')}</span>
        <span class="ch-logos">${x.logos.map((l) => typeof l === 'string' ? l : `<img src="${IMG}${l[0]}" alt="${l[1]}" title="${l[1]}">`).join('')}</span></div>
      <div class="ch-foot">${x.stats.map(([n, l]) => `<span><b>${n}</b><small>${l}</small></span>`).join('')}${c.past ? `<span class="chip chip-past">Past · ${c.past}</span>` : ''}</div>
    </a>`; }).join('')}</div>`;

const q3Reasons = () => { const [a, b, c] = Object.entries(Q3_REASONS).map(([id, r]) => `<a href="#${id}">${r.short}</a>`); return `
  <section class="section q3-intro"><div class="wrap"><h2>You come to FuturesHub to ${a}, ${b}, and ${c}.</h2></div></section>
  ${q3Reason('think')}${que().replace('section section-alt"', 'section section-alt q3-wave"')}${q3Reason('people')}${q3Reason('build', 'section-alt q3-wave')}`; };

// Numbered beliefs, as Recurse's self-directives and Hack Club's philosophy. 01 is from Equitech Futures' LinkedIn post about Que.
const Q3_BELIEFS = [
  ['Deeper, not faster.', 'Que isn’t designed to make learning faster or easier. It asks the next question, so your thinking goes one step further.'],
  ['Start from what really happened.', 'Every QueBook opens on a real case: textbooks in Kenya, Google Flu Trends, Sama’s data workers.'],
  ['Show what you can do.', 'Some challenges start with a conversation with Que about a problem you care about, not with your CV.'],
];
const q3Beliefs = () => `
  <section class="section section-alt q3-wave q3-beliefs"><div class="wrap">
    <h2>What we believe</h2>
    <ol>${Q3_BELIEFS.map(([h, p], n) => `<li><span>0${n + 1}</span><h3>${h}</h3><p>${p}</p></li>`).join('')}</ol>
  </div></section>`;

// Who it is for and what is free (ARENA's "who should apply", 80,000 Hours' "Is this advice aimed at me?", her BlueDot pin).
const Q3_FAQ = [
  ['Who is FuturesHub for?', 'Students from age 15, at school or university, and young professionals. There’s no single profile: one alum was an English major who now works in civic tech.'],
  ['Do I need a technical background?', 'No. QueBooks start from real cases and explain the methods as you go, and Que is there when a passage doesn’t land.'],
  ['What’s free?', 'The first 2 chapters of every QueBook, selected QueBriefs, and entry to every challenge. Learner adds live sessions and case studies; Learner+ adds cohorts and office hours.'],
  ['Where do I start?', 'Anywhere: each part stands on its own. If you’re not sure, try a sample chapter with Que.'],
];
const q3Faq = () => `
  <section class="section q3-faq"><div class="wrap">
    <h2>Is this for me?</h2>
    <dl>${Q3_FAQ.map(([q, a]) => `<div><dt>${q}</dt><dd>${a}</dd></div>`).join('')}</dl>
  </div></section>`;

// Statement quoted from equitechfutures.com (19 Nov 2026), as in faculty().
const q3Behind = () => `
  <section class="section section-alt q3-wave q3-behind" id="faculty"><div class="wrap">
    <h2>FuturesHub is the learning platform of <span class="accent">Equitech Futures</span>, a launchpad for global AI talent tackling frontier challenges.</h2>
    <p class="lede"><a href="https://www.equitechfutures.com/">More about Equitech Futures →</a></p>
    ${proofRow()}
  </div></section>`;

// Hack Club's "Ready?": one push, and a way in for anyone unsure (her pin).
// A QueBook rises out of the section above, across the divide (her 80000hours.org pick), and Que sits on the footer's edge (her hackclub.com pick).
const q3Ready = () => `
  <section class="section q3-ready"><div class="wrap">
    <div class="q3-perch" aria-hidden="true"><span class="q3-perch-say">Ask me anything.</span>${QUE_LIVE}</div>
    <img class="q3-book" src="${IMG}covers/foundations-of-data-driven-thinking.jpg" alt="The QueBook Foundations of Data Driven Thinking">
    <div><h2>Ready?</h2>
    <p class="lede">Start free. Not sure where to begin? Try a sample chapter with Que.</p>
    <div class="cta-row"><a class="btn btn-primary" href="${PRICING}">Start free</a><a class="btn btn-ghost" href="#think">Try a sample chapter</a></div></div>
  </div></section>`;

// Alumni quotes over photos, as on Quill 2.0 (her ask), on white here
const q3Page = () => [q3Hero(), q3Reasons(), photoQuotes().replace('section section-alt', 'section'), q3Beliefs(), q3Faq(), evMonthPage(true).replace('section ev-page evm', 'section ev-page evm q3-wave'), q3Behind(), q3Ready()].join('');

const q3Wire = () => {
  const pick = (k) => {
    const b = document.querySelector(`[data-q3pick="${k}"]`); if (!b) return;
    b.parentElement.querySelectorAll('[data-q3pick]').forEach((x) => x.setAttribute('aria-selected', x === b));
    b.closest('.q3-reason-grid').querySelector('.q3-preview').innerHTML = clean(Q3_PREVIEW[k]());
  };
  document.querySelectorAll('[data-q3pick]').forEach((b) => b.addEventListener('click', () => pick(b.dataset.q3pick)));
  addEventListener('hashchange', () => pick(location.hash.slice(4))); // nav links to #ch-case etc.
  document.addEventListener('click', (e) => {
    const c = e.target.closest('[data-case]'), p = e.target.closest('[data-persp3]');
    if (c) { c.parentElement.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', x === c)); document.getElementById('q3-case-que').hidden = false; }
    if (p) { p.parentElement.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', x === p)); document.getElementById('q3-say').textContent = `“${PERSPECTIVES[p.dataset.persp3][1]}”`; }
  });
};
