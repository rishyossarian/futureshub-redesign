/* Quill 3.0 (quill-3.html): the mission first, after recurse.com, 80000hours.org, arena.education and hackclub.com (her picks, 21 Nov 2026).
   Who it is for in one line, then the reasons you come, alumni, beliefs, who it is for, dates, who is behind it, "Ready?".
   Loaded after que.js (QueBrief perspectives) and before site.js, which calls q3Page() and q3Wire().
   All copy is Claude's draft for Rishita to rewrite unless marked as quoted. */

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

// The mission sentence, ARENA-style (arena.education, her pin): one centred line, the three reasons in colour, a hand-drawn line under the last.
// The page turns navy while it holds the middle of the screen (equitechfutures.com/ventures).
const q3Intro = () => { const [a, b, c] = Object.entries(Q3_REASONS).map(([id, r]) => `<a href="#${id}">${r.short}</a>`); return `
  <section class="q3-intro" id="why"><div class="wrap"><h2>You come to FuturesHub to ${a}, ${b}, and <span class="q3-swoosh">${c}</span>.</h2></div></section>`; };

/* ---------- 01 Think: click through the three formats, each with a live preview ---------- */
const Q3_OFFERS = {
  quebook: 'Interactive textbooks by Equitech Futures faculty, with charts and widgets you can play with. Que is on every page.',
  case: 'A real decision someone had to make. Make the call yourself, then see what happened.',
  brief: 'One current question, what the research says, and the people who disagree about it.',
};
// Who writes it (her brilliant.org pick: "Built by learning experts from MIT and Harvard"). Universities from the faculty bios on equitechfutures.com/team;
// which faculty wrote which QueBook is to confirm with Equitech Futures.
const q3Authors = () => `
  <div class="q3-authors">
    <img class="q3-authors-pic" src="${IMG}events/writing.jpg" alt="">
    <div><h3>Written by people who know the field.</h3>
      <p>Every QueBook, case study and QueBrief is written by Equitech Futures faculty: physicists, climate and planetary scientists, journalists and theatre-makers, trained at some of the world’s best universities.</p>
      <span class="q3-unis">${[['caltech', 'Caltech'], ['oxford', 'University of Oxford'], ['virginia-tech', 'Virginia Tech'], ['cu-boulder', 'University of Colorado Boulder']].map(([f, n]) => `<img class="uni-${f}" src="${IMG}logos/${f}.svg" alt="${n}">`).join('')}</span></div>
  </div>`;
const q3Think = () => `
  <div class="q3-reason-grid">
    <div class="q3-pick" role="tablist" aria-orientation="vertical">${Object.keys(Q3_OFFERS).map((k, i) => `
      <button type="button" role="tab" id="ch-${k}" data-q3pick="${k}" aria-selected="${!i}"><strong>${CHANNELS[k].name}</strong><span>${Q3_OFFERS[k]}</span></button>`).join('')}</div>
    <div class="q3-preview" role="tabpanel" aria-live="polite">${pcard('quebook')}</div>
  </div>
  ${q3Authors()}`;

/* ---------- 02 People: two photo cards, then the faculty as office hours (no repeated faces) ---------- */
// Masterclasses as the skills they build (her ask: topics, and the skills that carry across every field), each linked to its next date in the calendar
const Q3_SKILLS = [
  ['Writing', 'Say what you mean, without leaning on AI to say it.', '<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13.5 6.5l4 4"/>'],
  ['Presenting', 'Hold a room, on a stage or on Zoom.', '<rect x="3" y="4" width="18" height="12" rx="1"/><path d="M12 16v4M8 20h8"/>'],
  ['Interviewing', 'Walk into any interview knowing what to say.', '<path d="M4 5h11v8H8l-4 3z"/><path d="M15 9h5v8l-3-2h-6v-2"/>'],
  ['AI, up close', 'The questions shaping AI, with the people researching them.', '<circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/>'],
];
const q3People = () => `
  <div class="q3-skills" id="ch-live">${Q3_SKILLS.map(([h, t, d]) => `
    <a class="q3-skill" href="#calendar">${svg(d)}<strong>${h}</strong><span>${t}</span></a>`).join('')}</div>
  <a class="q3-cohort-line" id="ch-cohort" href="#calendar"><strong>Or stay with one group for months.</strong> Cohorts keep the same mentors from the first week to the last. <span aria-hidden="true">→</span></a>
  <div class="q3-office" id="ch-office">
    <h3>Office hours. <span>An hour one to one with any of them.</span></h3>
    <div class="q3-faculty">${Object.values(PEOPLE).map((p) => `
      <article class="person"><img class="photo" src="${IMG}people/${p.img}" alt=""><h4>${p.name}</h4><p class="cred">${p.cred}</p></article>`).join('')}</div>
  </div>`;

/* ---------- 03 Build: apply with Que, then the challenges as whole-card links, all pictures in one grey ---------- */
const Q3_CH_PIC = { 'Rise Innovation Challenge': 'events/frontier.jpg' };
const Q3_CH_LINE = { 'AI for Science Challenge': 'Winners earned places at the AI for Science Summer School.' }; // the CH line repeated "talk with Que, not a CV"
const q3Build = () => `<i id="ch-challenge"></i>
  <div class="q3-apply">
    <div><h3>Apply with Que, not a CV.</h3>
      <p>Your grades and your CV don’t decide this. Tell Que about a problem you care about; people on the Equitech Futures team read every answer.</p></div>
    ${MOCKS.challenge().replace(/<p class="muted small">.*?<\/p>/s, '')}
  </div>
  <div class="ch-cards q3-ch" id="challenge-cards">${CHALLENGES.map((c) => { const x = CH[c.name]; return `
    <a class="ch-card" href="#">
      <img class="ch-pic" src="${IMG}${Q3_CH_PIC[c.name] || x.pic}" alt="">
      <h4>${c.name} <span aria-hidden="true">→</span></h4><p>${Q3_CH_LINE[c.name] || x.line}</p>
      <div class="ch-marks"><span class="ch-topics">${x.topics.map((t) => `<span title="${t}">${svg(TOPIC[t])}<span class="sr">${t}</span></span>`).join('')}</span>
        <span class="ch-logos">${x.logos.map((l) => typeof l === 'string' ? l : `<img src="${IMG}${l[0]}" alt="${l[1]}" title="${l[1]}">`).join('')}</span></div>
      <div class="ch-foot">${x.stats.map(([n, l]) => `<span><b>${n}</b><small>${l}</small></span>`).join('')}${c.past ? `<span class="chip chip-past">Past · ${c.past}</span>` : ''}</div>
    </a>`; }).join('')}</div>`;

const Q3_REASONS = {
  think: { group: 'read', short: 'think more clearly', title: 'Build the judgement <span class="accent">AI can’t give you.</span>', body: () => q3Think(),
    text: 'AI can hand you an answer in seconds. Here you work out whether to trust it. Everything you read starts from a real problem, and Que asks you questions as you go.' },
  people: { group: 'live', short: 'find your people', title: 'Learn with a group, <span class="accent">and faculty beside you.</span>', body: () => q3People(),
    text: 'Live masterclasses in the skills every field needs, taught by the people who use them.' },
  build: { group: 'build', short: 'build something real', title: 'Work on a real problem, <span class="accent">and get funded for it.</span>', body: () => q3Build(),
    text: 'Pick a problem you care about and show what you can do with it. Past winners went to the AI for Science Summer School and the Equitech Futures Institute, with awards worth up to $10,000.' },
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
const q3Alumni = () => { const cards = (hide) => q3AlumniList().map(([img, name, from, text]) => `
    <figure class="q3-alum"${hide ? ' aria-hidden="true"' : ''}><img src="${IMG}people/${img}" alt=""><div><blockquote>“${text}”</blockquote><figcaption><strong>${name}</strong><span>${from}</span></figcaption></div></figure>`).join('');
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

// Navy close with a navy-and-gold QueBook (the green one clashed) rising out of the section above, across the divide, as first built on 21 Nov (her 80000hours.org pick).
const q3Ready = () => `
  <section class="section closing q3-ready"><div class="wrap">
    <img class="q3-book" src="${IMG}covers/introduction-to-causal-reasoning.jpg" alt="The QueBook Introduction to Causal Reasoning">
    <div><h2>Not sure where to begin?</h2>
    <p class="lede">Start free, or try a sample chapter with Que.</p>
    <div class="cta-row"><a class="btn btn-primary" href="${PRICING}">Start free</a><a class="btn btn-ghost" href="#think">Try a sample chapter</a></div></div>
  </div></section>`;

const q3Page = () => {
  return [q3Hero(), q3Intro(), q3Reason('think'), que(), q3Reason('people'), q3Reason('build'),
    q3Alumni(), q3Beliefs(), q3Faq(), evMonthPage(true), impact(), q3Ready()].join(''); // impact(): Quill 2.0's "How Equitech Futures makes a difference" and numbers
};

const q3Wire = () => {
  // A soft wave only where the colour changes (her 80000hours.org pick); none around the navy mission moment
  const bg = (el) => getComputedStyle(el).backgroundColor;
  const secs = [...document.querySelectorAll('#app > section:not(.q3-hero):not(.q3-intro)'), document.querySelector('.footer')];
  secs.slice(0, -1).forEach((s, i) => { const c = bg(secs[i + 1]); if (bg(s) !== c) { s.classList.add('q3-wave'); s.style.setProperty('--wave', c); } });

  // The page turns navy while the mission sentence holds the middle of the screen
  const intro = document.querySelector('.q3-intro');
  new IntersectionObserver(([e]) => document.body.classList.toggle('q3-dark', e.isIntersecting), { rootMargin: '-45% 0px -45% 0px' }).observe(intro);

  const pick = (k) => {
    const b = document.querySelector(`[data-q3pick="${k}"]`); if (!b) return;
    b.parentElement.querySelectorAll('[data-q3pick]').forEach((x) => x.setAttribute('aria-selected', x === b));
    document.querySelector('.q3-preview').innerHTML = clean(pcard(k));
  };
  document.querySelectorAll('[data-q3pick]').forEach((b) => b.addEventListener('click', () => pick(b.dataset.q3pick)));
  addEventListener('hashchange', () => pick(location.hash.slice(4))); // nav links to #ch-case etc.
};
