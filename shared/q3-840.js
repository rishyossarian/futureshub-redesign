/* Quill 3.0 (quill-3.html): the mission first, after recurse.com, 80000hours.org, arena.education and hackclub.com (her picks, 21 Nov 2026).
   Who it is for in one line, then the reasons you come, alumni, beliefs, who it is for, dates, who is behind it, "Ready?".
   Loaded after que.js (QueBrief perspectives) and before site.js, which calls q3Page() and q3Wire().
   All copy is Claude's draft for Rishita to rewrite unless marked as quoted. */

// Mockup-only options she is comparing (?tone=1-3&nums=a-c): colours between sections, and where the big numbers go.
const q3Opt = (key, fallback, ok) => { const v = new URLSearchParams(location.search).get(key); return ok.includes(v) ? v : fallback; };
const Q3_TONE = q3Opt('tone', '1', ['1', '2', '3']), Q3_NUMS = q3Opt('nums', 'b', ['a', 'b', 'c']);
const Q3_TONES = { 1: 'Light', 2: 'Bands', 3: 'Tints' }, Q3_NUMSETS = { a: 'Under the hero', b: 'Who’s behind it', c: 'Beside the reasons' };
const q3Opts = () => `<nav class="q3-opts" aria-label="Page options (mockup only)">
  <span>Colours</span>${Object.entries(Q3_TONES).map(([k, l]) => `<a href="?tone=${k}&nums=${Q3_NUMS}" title="${l}"${k === Q3_TONE ? ' aria-current="true"' : ''}>${k}</a>`).join('')}
  <span>Numbers</span>${Object.entries(Q3_NUMSETS).map(([k, l]) => `<a href="?tone=${Q3_TONE}&nums=${k}" title="${l}"${k === Q3_NUMS ? ' aria-current="true"' : ''}>${k.toUpperCase()}</a>`).join('')}</nav>`;

// Big proof numbers (Equitech Futures figures), placed per the Numbers option
const q3Big = (rows) => `<dl class="q3-big">${rows.map(([n, l]) => `<div><dt>${n}</dt><dd>${l}</dd></div>`).join('')}</dl>`;
const q3NumsStrip = () => `<section class="section q3-nums"><div class="wrap">${q3Big(PROOF)}<p class="muted small">Equitech Futures figures, the team behind FuturesHub.</p></div></section>`;

// Hero: her pick A without the floating cards, mission ending 1 ("a launchpad for global AI talent tackling frontier challenges", equitechfutures.com)
const q3Hero = () => `
  <section class="q3-hero" id="top"><div class="wrap">
    <div class="q3-hero-text">
      <h1>FuturesHub is a learning platform for curious minds who want to <span class="accent">shape AI, not just use it.</span></h1>
      <p class="lede">We give you the skills, community, funding and confidence to tackle frontier challenges.</p>
      <div class="cta-row"><a class="btn btn-primary" href="${PRICING}">Start free</a><a class="btn btn-ghost" href="#think">Try a sample chapter</a></div>
    </div>
    <img class="q3-hero-photo" src="${IMG}events/alumni-table.jpg" alt="">
  </div>${marquee()}</section>`;

// The mission sentence fills the screen and the page turns navy while it holds the middle (equitechfutures.com/ventures, as on Read with Que 2.0)
const q3Intro = () => { const [a, b, c] = Object.entries(Q3_REASONS).map(([id, r]) => `<a href="#${id}">${r.short}</a>`); return `
  <section class="q3-intro" id="why"><div class="wrap"><h2>You come to FuturesHub to ${a}, ${b}, and ${c}.</h2></div></section>`; };

/* ---------- 01 Think: click through the three formats, each with a live preview ---------- */
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
};
const Q3_OFFERS = {
  quebook: 'Interactive textbooks by Equitech Futures faculty, with charts and widgets you can play with. Que is on every page.',
  case: 'A real decision someone had to make. Make the call yourself, then see what happened.',
  brief: 'One current question, what the research says, and the people who disagree about it.',
};
const q3Think = () => `
  <div class="q3-reason-grid">
    <div class="q3-pick" role="tablist" aria-orientation="vertical">${Object.keys(Q3_OFFERS).map((k, i) => `
      <button type="button" role="tab" id="ch-${k}" data-q3pick="${k}" aria-selected="${!i}"><strong>${CHANNELS[k].name}</strong><span>${Q3_OFFERS[k]}</span></button>`).join('')}
      <a class="btn btn-ghost q3-library" href="que-2.html">Browse the library →</a></div>
    <div class="q3-preview" role="tabpanel" aria-live="polite">${Q3_PREVIEW.quebook()}</div>
  </div>`;

/* ---------- 02 People: two photo cards, then the faculty as office hours (no repeated faces) ---------- */
const q3People = () => { const OFFICE = new Set(ITEMS.filter((i) => i.channel === 'office').map((i) => i.name)); return `
  <div class="q3-live">
    <a class="q3-photo-card" id="ch-live" href="#calendar"><img src="${IMG}events/forum-ai.jpg" alt="">
      <span><strong>Live sessions</strong>Masterclasses and workshops with Equitech Futures faculty and guests.<em>Next: ${UPCOMING[0].name}, ${UPCOMING[0].date} →</em></span></a>
    <a class="q3-photo-card" id="ch-cohort" href="#calendar"><img src="${IMG}events/summer.jpg" alt="">
      <span><strong>Cohorts</strong>The same group and mentors for weeks or months.<em>Open now: ${COHORTS[0].name} →</em></span></a>
  </div>
  <div class="q3-office" id="ch-office">
    <h3>Office hours. <span>An hour one to one with any of them.</span></h3>
    <div class="q3-faculty">${Object.values(PEOPLE).map((p) => { const oh = OFFICE.has(p.name); return `
      <${oh ? 'a href="#"' : 'article'} class="person${oh ? ' q3-bookable' : ''}"><span class="q3-face"><img class="photo" src="${IMG}people/${p.img}" alt="">${oh ? '<b>Book →</b>' : ''}</span>
        <h4>${p.name}</h4><p class="cred">${p.cred}</p></${oh ? 'a' : 'article'}>`; }).join('')}</div>
  </div>` };

/* ---------- 03 Build: apply with Que, then the challenges as whole-card links, all pictures in one grey ---------- */
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

const Q3_REASONS = {
  think: { group: 'read', short: 'think more clearly', title: 'Build the judgement <span class="accent">AI can’t give you.</span>', body: () => q3Think(),
    text: 'AI can hand you an answer in seconds. Here you work out whether to trust it. Everything you read starts from a real problem, and Que asks you questions as you go.' },
  people: { group: 'live', short: 'find your people and get mentored', title: 'Learn with a group, <span class="accent">and faculty beside you.</span>', body: () => q3People(), nums: [3, 2],
    text: 'Join a live class, stay with the same group for months, or book an hour with a faculty member when you’re stuck.' },
  build: { group: 'build', short: 'build something real', title: 'Work on a real problem, <span class="accent">and get funded for it.</span>', body: () => q3Build(), nums: [0, 1],
    text: 'Pick a problem you care about and show what you can do with it. Past winners went to the AI for Science Summer School and the Equitech Futures Institute, with awards worth up to $10,000.' },
};
const q3Reason = (id) => { const r = Q3_REASONS[id]; return `
  <section class="section q3-reason q3-${id}" id="${id}"><div class="wrap" id="group-${r.group}">
    <div class="q3-reason-head"><div><h2>${r.title}</h2><p class="lede">${r.text}</p></div>${Q3_NUMS === 'c' && r.nums ? q3Big(r.nums.map((i) => PROOF[i])) : ''}</div>
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
const q3Alumni = () => { const cards = (hide) => q3AlumniList().map(([img, name, from, text]) => `
    <figure class="q3-alum"${hide ? ' aria-hidden="true"' : ''}><img src="${IMG}people/${img}" alt=""><blockquote>“${text}”</blockquote><figcaption><strong>${name}</strong><span>${from}</span></figcaption></figure>`).join('');
  return `<section class="section q3-alumni"><div class="wrap"><h2>From Equitech Futures alumni</h2></div>
    <div class="q3-stream"><div class="q3-stream-track">${cards()}${cards(true)}</div></div></section>`; };

// Numbered beliefs, as Recurse's self-directives and Hack Club's philosophy. 01 is from Equitech Futures' LinkedIn post about Que.
const Q3_BELIEFS = [
  ['Deeper, not faster.', 'Que isn’t designed to make learning faster or easier. It asks the next question, so your thinking goes one step further.'],
  ['Start from what really happened.', 'Every QueBook opens on a real case: textbooks in Kenya, Google Flu Trends, Sama’s data workers.'],
  ['Show what you can do.', 'Some challenges start with a conversation with Que about a problem you care about, not with your CV.'],
];
const q3Beliefs = () => `
  <section class="section q3-beliefs"><div class="wrap">
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
  <section class="section q3-behind" id="faculty"><div class="wrap">
    <h2>FuturesHub is the learning platform of <span class="accent">Equitech Futures</span>, a launchpad for global AI talent tackling frontier challenges.</h2>
    <p class="lede"><a href="https://www.equitechfutures.com/">More about Equitech Futures →</a></p>
    ${Q3_NUMS === 'b' ? q3Big(PROOF) : ''}
  </div></section>`;

// A QueBook rises out of the section above, across the divide (her 80000hours.org pick), and Que sits on the footer's edge like a logo (her hackclub.com pick).
const q3Ready = () => `
  <section class="section q3-ready"><div class="wrap">
    <span class="q3-perch" aria-hidden="true">${QUE_LIVE}</span>
    <img class="q3-book" src="${IMG}covers/foundations-of-data-driven-thinking.jpg" alt="The QueBook Foundations of Data Driven Thinking">
    <div><h2>Ready?</h2>
    <p class="lede">Start free. Not sure where to begin? Try a sample chapter with Que.</p>
    <div class="cta-row"><a class="btn btn-primary" href="${PRICING}">Start free</a><a class="btn btn-ghost" href="#think">Try a sample chapter</a></div></div>
  </div></section>`;

const q3Page = () => {
  document.body.dataset.tone = Q3_TONE;
  return [q3Opts(), q3Hero(), Q3_NUMS === 'a' ? q3NumsStrip() : '', q3Intro(), q3Reason('think'), que(), q3Reason('people'), q3Reason('build'),
    q3Alumni(), q3Beliefs(), q3Faq(), evMonthPage(true), q3Behind(), q3Ready()].join('');
};

const q3Wire = () => {
  // Wave divider wherever a section's colour changes (her 80000hours.org pick): the next section's colour curves up into this one
  const bg = (el) => { const c = getComputedStyle(el).backgroundColor; return c === 'rgba(0, 0, 0, 0)' ? getComputedStyle(document.body).backgroundColor : c; };
  const secs = [...document.querySelectorAll('#app > section:not(.q3-hero):not(.q3-intro)')];
  secs.forEach((s, i) => { const next = secs[i + 1]; /* none before the footer: Que sits on a straight edge there */ if (next && bg(s) !== bg(next) && !next.classList.contains('q3-intro')) { s.classList.add('q3-wave'); s.style.setProperty('--wave', bg(next)); } });

  // The page turns navy while the mission sentence holds the middle of the screen
  const intro = document.querySelector('.q3-intro');
  new IntersectionObserver(([e]) => document.body.classList.toggle('q3-dark', e.isIntersecting), { rootMargin: '-45% 0px -45% 0px' }).observe(intro);

  const pick = (k) => {
    const b = document.querySelector(`[data-q3pick="${k}"]`); if (!b) return;
    b.parentElement.querySelectorAll('[data-q3pick]').forEach((x) => x.setAttribute('aria-selected', x === b));
    document.querySelector('.q3-preview').innerHTML = clean(Q3_PREVIEW[k]());
  };
  document.querySelectorAll('[data-q3pick]').forEach((b) => b.addEventListener('click', () => pick(b.dataset.q3pick)));
  addEventListener('hashchange', () => pick(location.hash.slice(4))); // nav links to #ch-case etc.
  document.addEventListener('click', (e) => {
    const c = e.target.closest('[data-case]'), p = e.target.closest('[data-persp3]');
    if (c) { c.parentElement.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', x === c)); document.getElementById('q3-case-que').hidden = false; }
    if (p) { p.parentElement.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', x === p)); document.getElementById('q3-say').textContent = `“${PERSPECTIVES[p.dataset.persp3][1]}”`; }
  });
};
