// FuturesHub mockup. One catalogue, three layouts, no hierarchy between channels:
//   A: BlueDot pattern (three ways in, areas, then a section per format)
//   B: channels with topic tabs
//   C: pick a topic, see everything FuturesHub has on it
// [square brackets] = existing FuturesHub line (hidden on the page unless SHOW_EXISTING). TBC = to confirm.
// Programme, people and challenge details are taken from futureshub.com and equitechfutures.com (18 Nov 2026).

const TBC = '<span class="tbc">TBC</span>';
const IMG = 'assets/';

const GROUPS = {
  read: { name: 'Read with Que', title: 'Read with <span class="accent">Que</span>', sub: 'Interactive books, cases and briefs, at your own pace.' },
  live: { name: 'Learn with others', title: 'Learn with <span class="accent">others</span>', sub: 'Live classes, cohorts and 1:1 time with faculty.' },
  build: { name: 'Build something', title: 'Build <span class="accent">something</span>', sub: 'Challenges with scholarships, funding and awards.' },
};

const TOPICS = {
  science: { name: 'AI for Science', sub: 'How machine learning is changing the way scientists find things out.' },
  data: { name: 'Data and Reasoning', sub: 'Judging claims made with data, and telling causes from coincidences.' },
  society: { name: 'AI and Society', sub: 'Who builds AI, who pays for it and who benefits.' },
  building: { name: 'Building with AI', sub: 'Making working things with today’s AI tools.' },
  careers: { name: 'Careers and Skills', sub: 'Applications, interviews, writing and presenting.' },
};

// One line per channel: what it is, how long, what it costs.
const CHANNELS = {
  quebook: { group: 'read', name: 'QueBooks', def: 'Interactive textbooks with widgets and Que check-ins.', length: 'Chapters of ~35–40 min', price: 'First 2 chapters free', free: true },
  case: { group: 'read', name: 'Case studies', def: 'A real decision. Make the call, then see what happened.', length: `About 1 hour ${TBC}`, price: 'Learner', free: false },
  brief: { group: 'read', name: 'QueBriefs', def: 'Short research briefings on one current question.', length: `Read time ${TBC}`, price: 'Selected briefs free', free: true },
  live: { group: 'live', name: 'Live sessions', def: 'One live class with a named instructor. Masterclasses and workshops.', length: '60–90 min', price: 'Learner', free: false },
  cohort: { group: 'live', name: 'Cohorts', def: 'Weeks or months with the same group and mentors.', length: '4 weeks to 6 months', price: 'Learner+', free: false },
  office: { group: 'live', name: 'Office hours', def: '1:1 time with Equitech Futures faculty, on any topic.', length: '30–60 min', price: '[Learner+ exclusive]', free: false },
  challenge: { group: 'build', name: 'FuturesHub Challenges', def: 'Real problems, with scholarships, funding and awards.', length: 'One conversation to 5 months', price: 'Free to enter', free: true },
};

// channel, name, meta, topic (null = any topic), free, past
const ITEMS = [
  { channel: 'quebook', name: 'Introduction to Applied Artificial Intelligence', meta: 'Ch. 1: Closed vs. Open World Problems', topic: 'building', free: true },
  { channel: 'quebook', name: 'Foundations of Data Driven Thinking', meta: 'Ch. 1: Thinking in a World of Data', topic: 'data', free: true },
  { channel: 'quebook', name: 'Introduction to Causal Reasoning', meta: '10 chapters · ~30 hours', topic: 'data', free: true },
  { channel: 'quebook', name: 'AI for Science', meta: '6 chapters', topic: 'science', free: true },
  { channel: 'case', name: 'Sama: The Ethics of AI’s Hidden Workforce', meta: 'Kenyan data workers', topic: 'society' },
  { channel: 'case', name: 'Hugging Face', meta: '[How a failing chatbot for teenagers…]', topic: 'building' },
  { channel: 'brief', name: 'Six QueBriefs so far', meta: 'e.g. human data as a scarce resource', topic: 'society', free: true },
  { channel: 'live', name: 'Writing without the LLM', meta: 'Mon 23 Nov · 60 min', topic: 'careers' },
  { channel: 'live', name: 'The Jagged Frontier: AI Adoption and Challenges', meta: 'Fri 4 Dec · 60 min', topic: 'society' },
  { channel: 'live', name: 'Interviewing Effectively', meta: 'Thu 10 Dec · 90 min', topic: 'careers' },
  { channel: 'live', name: 'Present like a Pro on Zoom', meta: 'Fri 8 Jan · 90 min', topic: 'careers' },
  { channel: 'live', name: 'The Environmental Costs of Building AI', meta: 'Recording free for all tiers', topic: 'society', free: true, past: true },
  { channel: 'live', name: 'Tech in Practice with Elyse Wallnutt', meta: '1 Oct 2026 · recording free for all tiers', topic: 'society', free: true, past: true },
  { channel: 'live', name: 'Vibe Coding with Google AI Studio', meta: 'Workshop led by Equitech Scholar Vedika Bagla', topic: 'building', past: true },
  { channel: 'cohort', name: 'The Admit Track: Graduate Admissions', meta: '6 months · join any time until March 2027', topic: 'careers' },
  { channel: 'cohort', name: 'AI for Science Summer School', meta: `Ran 6–31 July 2026 · next run ${TBC}`, topic: 'science', past: true },
  { channel: 'office', name: 'Dr. Abhilash Mishra', meta: '60 min · research', topic: null },
  { channel: 'office', name: 'Thomas Murray', meta: '60 min · leadership', topic: null },
  { channel: 'office', name: 'Azania Imtiaz Patel', meta: '45 min · writing', topic: null },
  { channel: 'office', name: 'Dr. Nikita Kaushal', meta: '30 min', topic: null },
  { channel: 'challenge', name: 'Rise Innovation Challenge', meta: 'Awards up to $10,000 · by invitation', topic: 'society' },
  { channel: 'challenge', name: 'AI for Science Challenge', meta: '2026 · winners got summer-school scholarships', topic: 'science', past: true },
  { channel: 'challenge', name: 'EFI Scholar Challenge', meta: '2026 · winners got full funding worth $9,500', topic: 'building', past: true },
];

const PEOPLE = {
  // role = title at Equitech Futures (the section heading names Equitech, so it isn't repeated); cred = field · highest degree (equitechfutures.com/team bios, 19 Nov 2026; Amy: Planetary Society profile)
  abhilash: { name: 'Dr. Abhilash Mishra', img: 'abhilash-mishra.png', role: 'Founder and Chief Science Officer', cred: 'Physicist · Ph.D., Caltech', teaches: 'The Jagged Frontier · AI for Science Summer School · office hours' },
  thomas: { name: 'Thomas Murray', img: 'thomas-murray.webp', role: 'Chief Community Officer', cred: 'Documentary theatre · MFA, Virginia Tech', teaches: 'Writing without the LLM · Interviewing Effectively · Present like a Pro on Zoom' },
  nikita: { name: 'Dr. Nikita Kaushal', img: 'nikita-kaushal.webp', role: 'Faculty', cred: 'Climate scientist · Ph.D., Oxford', teaches: 'Office hours' },
  azania: { name: 'Azania Imtiaz Patel', img: 'azania-imtiaz-patel.webp', role: 'Faculty', cred: 'Journalist · Dual M.Sc., Oxford', teaches: 'Office hours on writing' },
  amy: { name: 'Dr. Amy Barr Mlinar', img: 'amy-barr-mlinar.jpg', role: '[Faculty]', cred: 'Planetary scientist · Ph.D., CU Boulder', teaches: 'AI for Science Summer School' },
};

const UPCOMING = [
  { slug: 'writing-without-the-llm', name: 'Writing without the LLM', date: 'Mon 23 Nov', also: 'also Wed 16 Dec', time: '3:00 PM UTC', length: '60 min', by: 'thomas' },
  { slug: 'the-jagged-frontier-ai-adoption-and-its-challenges', name: 'The Jagged Frontier: AI Adoption and Challenges', date: 'Fri 4 Dec', time: '3:00 PM UTC', length: '60 min', by: 'abhilash' },
  { slug: 'interviewing-effectively', name: 'Interviewing Effectively', date: 'Thu 10 Dec', time: '1:30 PM UTC', length: '90 min', by: 'thomas' },
  { slug: 'present-like-a-pro-on-zoom', name: 'Present like a Pro on Zoom', date: 'Fri 8 Jan', time: '3:00 PM UTC', length: '90 min', by: 'thomas' },
];
const RECORDINGS = [
  { slug: 'the-environmental-costs-of-building-ai', name: 'The Environmental Costs of Building AI', by: 'Dr. Abhilash Mishra' },
  { slug: 'tech-in-practice-with-elyse-wallnutt', name: 'Tech in Practice with Elyse Wallnutt', by: 'Elyse Wallnutt and Dr. Abhilash Mishra' },
];

const COHORTS = [
  { name: 'The Admit Track: Graduate Admissions', cover: 'the-admit-track-graduate-admissions', status: 'Join any time until March 2027',
    text: 'Applying to master’s and doctoral programmes, in the right order: your list, statements, recommenders, interviews and financial aid.',
    facts: '6 months · biweekly workshops · weekly office hours · cohort channel', by: ['thomas', 'abhilash'] },
  { name: 'AI for Science Summer School', cover: null, past: 'Ran 6–31 July 2026', status: `Next run ${TBC}`,
    text: 'Four weeks of live sessions on AI in physics, chemistry, biology and climate, ending in a capstone with 1:1 mentorship.',
    facts: 'Two groups: 15–17 and 18–21 · 25–30 per group · 3 hours live a week', by: ['amy', 'abhilash'] },
];

const CHALLENGES = [
  { name: 'Rise Innovation Challenge', status: '[By invitation]', with: 'Rise · Rhodes Trust', award: 'Awards up to $10,000',
    text: 'For Rise Fellows and Finalists: five months building AI tools for healthcare, education, climate and governance, with mentorship and product workshops.' },
  { name: 'AI for Science Challenge', past: '2026', with: 'Equitech Futures', award: 'Scholarships to the summer school',
    text: 'Applicants had [a candid, open-ended conversation with Que] instead of sending a CV. People on the Equitech Futures team read every one.' },
  { name: 'EFI Scholar Challenge', past: '2026', with: 'Rhodes Forum on Technology and Society · Kevin Xu Initiative at UChicago', award: 'Full funding worth $9,500',
    text: 'Undergraduates from any discipline set out a problem they want to solve with technology. Winners attended the Equitech Futures Institute 2026.' },
];

// Equitech Futures alumni, quoted as published on equitechfutures.com.
const QUOTES = [
  { name: 'Montse Madrigal', img: 'montse-madrigal.webp', from: 'United States · Equitech Futures Institute, 2021', text: 'I was an English major, and now I work in civic tech. I wanted a space where I could learn data science and AI and figure out how to apply these tools to real-world problems. Equitech Futures was the perfect fit.' },
  { name: 'Aryan Gupta', img: 'aryan-gupta.webp', from: 'India · Equitech Futures Institute', text: 'One of the biggest things Equitech Futures focuses on, and I find really lacking in this world right now, is collaboration over competition. The community came forward to support me in being bold about my vision and paving a different path for myself.' },
  { name: 'Raunaq Jain', img: 'raunaq-jain.webp', from: 'India · Applied Data Institute, 2022', text: 'To be able to build relationships with people you’ve met only on the internet, and then feel like you’ve known each other for years when you finally meet in person – it is a feat only Equitech Futures could accomplish.' },
];

/* ---------- Small pieces ---------- */

const priceChip = (text, free) => `<span class="chip ${free ? 'chip-free' : 'chip-lock'}">${text}</span>`;
const pastChip = (text = 'Past') => `<span class="chip chip-past">${text}</span>`;
const initials = (p) => p.initials || p.name.replace('Dr. ', '').split(' ').map((w) => w[0]).slice(0, 2).join('');
const avatar = (p, size = 40) => p.img
  ? `<img class="avatar" src="${IMG}people/${p.img}" alt="" width="${size}" height="${size}">`
  : `<span class="avatar avatar-initials" style="width:${size}px;height:${size}px">${initials(p)}</span>`;
const byline = (keys) => `<div class="by">${keys.map((k) => avatar(PEOPLE[k], 28)).join('')}<span>${keys.map((k) => PEOPLE[k].name).join(' and ')}</span></div>`;

const currentFirst = (list) => [...list].sort((a, b) => !!a.past - !!b.past);
const forTopic = (topic) => ITEMS.filter((i) => topic === 'all' || i.topic === topic || i.topic === null);

const row = (i, label = false) => `<li class="${i.past ? 'past' : ''}">
  <span class="row-name">${label ? `<span class="chip chip-mini">${CHANNELS[i.channel].name}</span> ` : ''}${i.name}${i.past ? ` ${pastChip()}` : ''}${i.free && !CHANNELS[i.channel].free ? ' <span class="chip chip-free chip-mini">Free</span>' : ''}</span>
  <span class="row-meta">${i.meta}</span></li>`;

const channelBlock = (key, items, limit = 3) => {
  const c = CHANNELS[key], list = currentFirst(items);
  return `<article class="tblock" id="ch-${key}">
    <div class="tblock-head"><h4>${c.name}</h4>${priceChip(c.price, c.free)}</div>
    <p>${c.def} <span class="muted">${c.length}.</span></p>
    <ul class="rows">${list.map((i, n) => n < limit ? row(i) : row(i).replace('<li', '<li hidden')).join('')}</ul>
    ${list.length > limit ? `<button type="button" class="more">See all ${list.length}</button>` : ''}
  </article>`;
};

const groupsHTML = (items) => `
  <div class="groups">${Object.entries(GROUPS).map(([g, G]) => {
    const blocks = Object.keys(CHANNELS).filter((k) => CHANNELS[k].group === g)
      .map((k) => [k, items.filter((i) => i.channel === k)]).filter(([, list]) => list.length);
    return `<div class="group" id="group-${g}">
      <div class="group-head"><h3>${G.name}</h3><p>${G.sub}</p></div>
      ${blocks.length ? blocks.map(([k, list]) => channelBlock(k, list)).join('') : '<p class="empty">Nothing in this topic yet.</p>'}
    </div>`;
  }).join('')}</div>`;

const ANY_ORDER_TEXT = 'Each one stands on its own. Use any of them, in any order.';
const ANY_ORDER = `<p class="any-order">${ANY_ORDER_TEXT}</p>`;

const topicTabs = (selected, attr) => `<div class="tabs" role="tablist" aria-label="Topics">${[['all', 'All topics'], ...Object.entries(TOPICS).map(([k, t]) => [k, t.name])]
  .map(([k, l]) => `<button type="button" role="tab" ${attr}="${k}" aria-selected="${k === selected}">${l}</button>`).join('')}</div>`;

/* ---------- Variant: the explore section ---------- */

const topicPanel = (key) => {
  const t = TOPICS[key], list = ITEMS.filter((i) => i.topic === key);
  const cols = [['Read with Que', ['quebook', 'case', 'brief']], ['Live sessions', ['live']], ['Cohorts', ['cohort']], ['FuturesHub Challenges', ['challenge']]];
  return `<div class="topic-panel">
    <div><h3>${t.name}</h3><p class="muted">${t.sub}</p></div>
    <div class="channel-cols">${cols.map(([name, keys]) => {
      const rows = currentFirst(list.filter((i) => keys.includes(i.channel)));
      return `<div class="channel-col"><h4>${name}</h4>${rows.length ? `<ul class="rows">${rows.map((i) => row(i, keys.length > 1)).join('')}</ul>` : '<p class="empty">Nothing in this topic yet.</p>'}</div>`;
    }).join('')}</div>
    <p class="muted small">Office hours cover any topic: book Equitech Futures faculty with [Learner+].</p>
  </div>`;
};

const EXPLORE = {
  a: () => `
    <div class="section-head"><h2>Three ways to <span class="accent">learn</span></h2>${ANY_ORDER}</div>
    <div class="bands">
      <a class="band" href="#areas"><h3>${GROUPS.read.name}</h3><p>Interactive QueBooks, case studies and briefs. The first two chapters of every book are free.</p><span class="proofline">4 QueBooks · 2 case studies · 6 QueBriefs</span></a>
      <a class="band" href="#upcoming"><h3>${GROUPS.live.name}</h3><p>Live masterclasses, cohorts and 1:1 office hours with Equitech Futures faculty.</p><span class="proofline">4 masterclasses before 8 January</span></a>
      <a class="band" href="#challenges"><h3>${GROUPS.build.name}</h3><p>FuturesHub Challenges with scholarships, funding and awards. Entry is free.</p><span class="proofline">Awards up to $10,000</span></a>
    </div>
    <div class="section-head" id="areas" style="margin-top:72px"><h2>Pick an <span class="accent">area</span></h2>
      <p class="lede">Everything FuturesHub has on a subject in one place.</p></div>
    <div class="topic-cards">${Object.entries(TOPICS).map(([key, t]) => {
      const list = currentFirst(ITEMS.filter((i) => i.topic === key));
      const missing = ['quebook', 'live', 'cohort', 'challenge'].filter((c) => !list.some((i) => i.channel === c)).map((c) => CHANNELS[c].name);
      return `<article class="tblock">
        <div><h3>${t.name}</h3><p class="muted small">${t.sub}</p></div>
        <ul class="rows">${list.map((i) => row(i, true)).join('')}</ul>
        ${missing.length ? `<p class="gap-note">Nothing yet: ${missing.join(', ')}</p>` : ''}
      </article>`;
    }).join('')}</div>`,

  b: () => `
    <div class="section-head"><h2>Explore <span class="accent">FuturesHub</span></h2>${ANY_ORDER}</div>
    ${topicTabs('all', 'data-topic')}
    <div id="explore-body">${groupsHTML(forTopic('all'))}</div>`,

  c: () => `
    <div class="section-head"><h2>Pick a <span class="accent">topic</span></h2>
      <p class="lede">See everything FuturesHub has on it: books, live sessions, cohorts and challenges.</p>${ANY_ORDER}</div>
    <div class="picker" role="tablist" aria-label="Topics">${Object.entries(TOPICS).map(([k, t], n) =>
      `<button type="button" role="tab" data-pick="${k}" aria-selected="${n === 0}"><strong>${t.name}</strong><span>${ITEMS.filter((i) => i.topic === k).length} things</span></button>`).join('')}</div>
    <div id="explore-body">${topicPanel(Object.keys(TOPICS)[0])}</div>`,
};

/* ---------- Shared sections ---------- */

// The two-page version (landing.html + read-with-que.html, body[data-pair]) shows only these two in the mockbar (her ask, 25 Nov)
const PAIR = [['landing', 'FuturesHub landing page'], ['read-with-que', 'Read with Que']];
const QUE_PAGE = () => document.body.dataset.pair ? 'read-with-que.html' : 'que-2.html';
// Changes vs original: off by default on every page, switched on here in the top bar (her ask, 25 Nov)
const chgBtn = () => document.body.dataset.q6 || document.body.dataset.h2 || document.body.dataset.brief2 ? '<button type="button" id="chg-toggle" aria-pressed="false">Changes vs original: off</button>' : '';
const mockbar = (v) => document.body.dataset.pair ? `
  <div class="mockbar"><div class="wrap">
    <strong>${location.pathname.includes('/equitech/') ? '<a class="mock-home" href="./">← Overview</a>' : 'Mockup'}</strong>
    <nav aria-label="Pages">${PAIR.map(([k, l]) => `<a href="${k}.html"${/\/[^/]+$/.test(location.pathname) && location.pathname.replace(/\.html$/, '').endsWith(`/${k}`) ? ' aria-current="page"' : ''}>${l}</a>`).join('')}</nav>
    ${chgBtn()}
  </div></div>` : `
  <div class="mockbar"><div class="wrap">
    <strong>Mockup</strong>
    <nav aria-label="Landing page versions">${[['1', 'LP1 · Cards'], ['2', 'LP2 · Quill'], ['quill-2', 'Quill 2.0'], ['quill-3', 'Quill 3.0'], ['quill-4', 'Quill 4.0'], ['quill-5', 'Quill 5.0'], ['quill-6', 'FuturesHub landing page'], ['4', 'LP4 · Topics'], ['5', 'LP5 · Research'], ['6', 'LP6 · Brilliant'], ['7', 'LP7 · Posters'], ['8', 'LP8 · Favourites'], ['ideas', 'Thumbnail ideas'], ['que-2', 'Read with Que']].map(([k, l]) => `<a href="${k.length > 1 ? k : `lp${k}`}.html"${(Q3 ? location.pathname.endsWith(`/${k}.html`) : Q2 ? k === 'quill-2' : document.body.dataset.h2 ? k === 'que-2' : LP === k) ? ' aria-current="page"' : ''}>${l}</a>`).join('')}</nav>
    ${LP === '5' ? '<button type="button" id="why-toggle" aria-pressed="true">Competitor inputs: on</button>' : ''}
    ${chgBtn()}
    <span class="legend">dashed box = placeholder · TBC = to confirm</span>
  </div></div>`;

// Main-nav dropdowns list the offerings in each channel group; each item jumps to its block in the Explore section.
// Pricing now lives on its own page (not built yet); until then these links go nowhere.
const PRICING = '#';
const NAV = [['read', 'Read with Que'], ['live', 'Learn with Others'], ['build', 'Build Something']];
const menu = ([g, label]) => `
      <div class="menu">
        <button type="button" aria-expanded="false" aria-controls="menu-${g}"${g === 'read' && document.body.dataset.h2 ? ' aria-current="page"' : ''}>${label}</button>
        <div class="menu-panel" id="menu-${g}">
          ${Object.entries(CHANNELS).filter(([, c]) => c.group === g)
            .map(([k, c]) => `<a href="#ch-${k}"><strong>${c.name}</strong></a>`).join('')}
          <a class="menu-all" href="${g === 'read' ? QUE_PAGE() : `#group-${g}`}">See all <span aria-hidden="true">→</span></a>
        </div>
      </div>`;

const header = () => `
  <header class="header"><div class="wrap">
    <a href="#top" class="logo" aria-label="FuturesHub home"></a>
    <nav aria-label="Main">${NAV.map(menu).join('')}
      ${Q3 || document.body.dataset.h2 ? '' : `<a href="${PRICING}">Membership</a>`}
    </nav>
    <div class="actions"><a class="btn btn-ghost btn-small" href="#">Sign in</a><a class="btn btn-primary btn-small" href="${PRICING}">Start free</a></div>
  </div></header>`;

// Depth first, headcount last (approved from LP5's competitor scan, 19 Nov: vs Polygence 10,000+, Elements 2M)
// Faculty and partner logos as an always-moving strip under the hero (BlueDot pattern, her ask 20 Nov). Two copies for a seamless loop.
const LOGOS = [['caltech', 'Caltech'], ['oxford', 'University of Oxford'], ['uchicago', 'University of Chicago'], ['rhodes-trust', 'Rhodes Trust'], ['rise', 'Rise']];
const logoSet = (hide) => `<div class="logos"${hide ? ' aria-hidden="true"' : ''}>${LOGOS.map(([f, alt]) => `<img class="logo-${f}" src="${IMG}logos/${f}.svg" alt="${hide ? '' : alt}">`).join('')}<b class="kxi" title="Placeholder: no public logo found">Kevin Xu Initiative<small>UChicago Harris</small></b></div>`;
const marquee = () => `<div class="marquee"><p class="marquee-label">Faculty and partners from</p><div class="marquee-view"><div class="marquee-track">${logoSet()}${logoSet(true)}</div></div></div>`;
const PROOF = [['$2M', 'in scholarships'], ['15', 'alumni-led ventures'], ['70+', 'countries'], ['300+', 'alumni']];
// Challenges: applying through Que is the feature, shown above the challenge cards in every version (approved 19 Nov).
// LP2's challenge band and LP6 already show it with their own Apply-with-Que mock.
const APPLY_QUE = '<p class="apply-que">Apply through a conversation with Que, not a CV.</p>';
const hero = (bg = '', dark = !!bg) => `
  <section class="hero${dark ? ' hero-wall' : ''}" id="top">${bg}<div class="wrap">
    <h1>[Human Intelligence,] <span class="accent">[Amplified]</span></h1>
    <p class="lede">AI is reshaping how we work and create. FuturesHub builds the deep judgement and creative confidence that you need to take to shape that transformation.</p>
    <div class="cta-row"><a class="btn btn-primary" href="${PRICING}">Start free</a><a class="btn btn-ghost" href="#que">Try a sample chapter</a></div>
    ${LP === '5' ? `<p class="hero-free">Free to start: the first 2 chapters of every QueBook, selected QueBriefs, and every challenge.</p>
    <p class="hero-meta">Faculty from [Caltech, Oxford and UChicago] · <a href="#">For parents and schools →</a></p>` : ''}
    ${proofRow()}
  </div>${marquee()}</section>`;
// Quill 2.0 hero: one large photo (layout B) + headline draft 2, her picks (21 Nov). Headline is Claude's draft.
const heroQ2 = () => `
  <section class="hero hero-wall hero-q2" id="top"><div class="wrap">
    <div class="hq-text"><h1>Build the judgement <span class="accent">AI can’t give you.</span></h1>
      <p class="lede">AI is reshaping how we work and create. FuturesHub builds the deep judgement and creative confidence that you need to take to shape that transformation.</p>
      <div class="cta-row"><a class="btn btn-primary" href="${PRICING}">Start free</a><a class="btn btn-ghost" href="#group-read">Try a sample chapter</a></div></div>
    <img class="hq-photo" src="${IMG}events/handshake.jpg" alt="">
  </div>${marquee()}</section>`;
const proofRow = () => `<div class="proof">
      ${PROOF.map(([n, l]) => `<span><span class="num">${n}</span><span class="lbl">${l}</span></span>`).join('')}
      <span class="source">Equitech Futures figures, the team behind FuturesHub.</span>
    </div>`;

// Quill 2.0 story (after equitechfutures.com's order: promise, who and why, what we do, impact, alumni).
// Problem statement + the three ways in as one system. Copy is Claude's draft for Rishita to rewrite.
const PILLARS = [ // [group, gain line, what]
  ['read', 'Understand it, not just finish it.', 'Que asks you questions as you read, so you know you’ve understood.'],
  ['live', 'Learn with a group and faculty beside you.', 'Live classes, longer cohorts and 1:1 time with Equitech Futures faculty.'],
  ['build', 'Show what you can do, and earn scholarships and funding.', 'Awards up to $10,000. You apply by talking with Que, not by sending a CV.'],
];
const WAY = { read: '01', live: '02', build: '03' };
const why = () => `
  <section class="section why" id="why"><div class="wrap">
    <div class="why-head">
      <h2>AI can hand you an answer in seconds. <span class="accent">FuturesHub helps you build the judgement to use it well.</span></h2>
      <p class="lede">FuturesHub is the learning platform of Equitech Futures. There are three ways in, and you can start free.</p>
    </div>
    <ol class="pillars">${PILLARS.map(([g, gain, what]) => `
      <li class="pillar pillar-${g}"><span class="n">${WAY[g]}</span>
        <h3><a href="#group-${g}">${GROUPS[g].name}</a></h3><p class="problem">${gain}</p><p>${what}</p>
        <p class="pillar-chips">${GROUP_CHANNELS[g].map((k) => `<span>${CHANNELS[k].name}</span>`).join('')}</p></li>`).join('')}</ol>
    <div class="cta-row why-cta"><a class="btn btn-primary" href="${PRICING}">Start free</a></div>
  </div></section>`;

const impact = () => `
  <section class="section" id="impact"><div class="wrap">
    <div class="section-head"><h2>How Equitech Futures makes a difference</h2>
      <p class="lede">FuturesHub is built by the team behind these programmes, and Learner+ members can book office hours with its faculty. <a href="https://www.equitechfutures.com/">More about Equitech Futures →</a></p></div>
    ${proofRow()}
  </div></section>`;

// Cohort benefits, verbatim from futureshub.com (21 Nov 2026)
const svg = (d) => `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const PERKS = [
  ['<circle cx="9" cy="8" r="3"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17" cy="9" r="2.5"/><path d="M16 14.2c2.9.4 5 2.8 5 5.8"/>', 'Learn in small cohorts', 'Small class sizes ensure meaningful interaction, collaboration, and personalized feedback from faculty.'],
  ['<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z"/>', 'Global peer network', 'Access a diverse, international community of ambitious learners.'],
  ['<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5"/><path d="M22 9v6"/>', 'Learn from leading researchers & practitioners', 'Taught by faculty from the Equitech Futures network drawn from top universities (Caltech, Oxford, UChicago).'],
  ['<path d="M12 3l2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3l-5.6 2.9 1.1-6.2L3 9.6l6.2-.9z"/>', 'Capstone project and mentorship', 'Develop a capstone project with 1:1 guidance from faculty mentors, with support extending beyond the program.'],
];
const perks = () => `<ul class="band-perks">${PERKS.map(([d, h, t]) => `<li>${svg(d)}<h4>${h}</h4><p>${t}</p></li>`).join('')}</ul>`;

// Quill 3.0: a framed product preview under the hero headline (format borrowed from the Axiom reference). A QueBook chapter with a Que check-in; wording is the QueBooks mock's, illustrative.
const heroPreview = () => `<div class="hero-preview" role="img" aria-label="A QueBook chapter beside a Que check-in. Illustrative.">
  <div class="hp-app">
    <div class="hp-bar"><span><b>Introduction to Causal Reasoning</b> · Chapter 1</span><span class="hp-note">Illustrative</span></div>
    <div class="hp-body">
      <div class="hp-read">
        <p>A programme gave textbooks to schools across Kenya. Years later, average test scores had not improved.</p>
        <p>Did the textbooks fail? Or did they only work when something else was in place?</p>
        <div class="hp-progress"><span style="width:18%"></span></div>
      </div>
      <div class="hp-que">
        <p class="mock-q">${QUE_ICON}Were textbooks a necessary, sufficient or contributory cause of learning?</p>
        <p class="mock-a">A <mark>contributory cause</mark>. They made learning more likely, but not on their own.</p>
        <p class="mock-fb"><b aria-hidden="true">⇆</b>Good: contributory. Now say what else had to be in place for the textbooks to help.</p>
      </div>
    </div>
  </div></div>`;

/* Que demo: text and widgets from the live QueBook chapter; the verdict in the feedback is the proposed change. */

const fluChart = () => {
  const W = 520, H = 220, L = 36, R = 12, T = 12, B = 28;
  const x = (t) => L + (t - 2009) / 4.3 * (W - L - R), y = (v) => T + (1 - v / 12) * (H - T - B);
  const bump = (t, peaks) => 0.8 + peaks.reduce((s, [c, h, w]) => s + h * Math.exp(-((t - c) ** 2) / (2 * w * w)), 0);
  const cdc = [[2009.83, 6.9, .09], [2011.1, 3.9, .1], [2012.2, 1.7, .12], [2013.05, 5.2, .09]];
  const goo = [[2009.83, 4.6, .09], [2011.1, 4.2, .1], [2012.2, 3.8, .12], [2013.05, 10.4, .09]];
  const path = (peaks) => Array.from({ length: 130 }, (_, k) => 2009 + k / 30).map((t, k) => `${k ? 'L' : 'M'}${x(t).toFixed(1)},${y(bump(t, peaks)).toFixed(1)}`).join('');
  return `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="Google Flu Trends prediction against CDC actual flu rates, 2009 to 2013">
    ${[0, 6, 12].map((v) => `<line x1="${L}" x2="${W - R}" y1="${y(v)}" y2="${y(v)}" class="grid"/><text x="${L - 6}" y="${y(v) + 4}" text-anchor="end">${v}%</text>`).join('')}
    ${[2009, 2010, 2011, 2012, 2013].map((t) => `<text x="${x(t)}" y="${H - 8}" text-anchor="middle">${t}</text>`).join('')}
    <path d="${path(cdc)}" class="s-cdc" data-series="cdc"/>
    <path d="${path(goo)}" class="s-goo" data-series="goo"/>
    <text x="${x(2012.95)}" y="${y(10.6)}" text-anchor="end" class="note">Predictions diverge ↗</text>
  </svg>`;
};

const MATRIX = [
  ['Strong data + strong theory', 'Climate Science'], ['Weak data + strong theory', 'String Theory'],
  ['Strong data + weak theory', 'Google Flu Trends'], ['Weak data + weak theory', 'Astrology'],
];

const DEMO = {
  read: () => `
    <p>[In 2008, Google announced something extraordinary. Their engineers had built a system that could predict flu outbreaks faster than the Centers for Disease Control — sometimes weeks faster.]</p>
    <p>[The system, called Google Flu Trends, worked by tracking what people searched for.]</p>
    <blockquote>[“Data never speaks for itself. Data only speaks through the questions we ask of it.”]</blockquote>`,
  chart: () => `
    ${Q5 ? '<p class="q5-chart-title"><strong>Google Flu Trends vs. the CDC</strong> · 2009–2013</p><p class="q5-chart-note">By 2013, Google’s prediction overshot actual flu rates by nearly 100 percent.</p>' : '<p class="muted">[Google Flu Trends: Prediction vs. Reality] · tap a line to show or hide it</p>'}
    <div class="legend-row"><button type="button" class="key key-goo" data-toggle="goo" aria-pressed="true">Google prediction</button><button type="button" class="key key-cdc" data-toggle="cdc" aria-pressed="true">CDC actual</button></div>
    ${fluChart()}
    ${Q5 ? '' : '<p class="muted small">Shape is illustrative, as in the live widget. By 2013 the prediction overshot actual flu rates by nearly 100 percent.</p>'}`, // Quill 5.0: title and takeaway both above the chart (her ask, 25 Nov; the long captions stay gone)
  matrix: () => `
    <p class="muted">[The Data-Theory Matrix] · click a square</p>
    <div class="matrix">${MATRIX.map(([q, a]) => `<button type="button" data-reveal="${a}"><span>${q}</span><strong hidden>${a}</strong></button>`).join('')}</div>`,
  check: () => `
    <div class="bubble"><div class="who">Que · check-in · [Testing your understanding]</div>[Quick check before we continue. In your own words, why did Google Flu Trends fail?]</div>
    <label class="sr" for="answer">Your answer</label>
    <textarea id="answer" rows="3" placeholder="[Think about what Google's system found, and why that wasn't enough...]"></textarea>
    <div class="cta-row"><button type="button" class="btn btn-ghost btn-small" id="hint">Hint</button><button type="button" class="btn btn-check btn-small" id="check">Check →</button></div>
    <p id="hint-text" class="muted" hidden>[💡 Consider: what did the system actually measure?]</p>
    <div id="feedback"></div>`,
  explain: () => `
    <div class="bubble me"><div class="who">You · [🔄 Alternative explanations]</div>Can you explain that another way?</div>
    <div class="bubble"><div class="who">Que</div>Imagine guessing how many people have colds by counting tissue sales. If a news story makes everyone stock up on tissues, your count jumps even though nobody got sicker. Searches worked the same way.</div>`,
};

const FEEDBACK = {
  good: `<div class="bubble"><div class="who">Que <span class="verdict">On track</span></div>Yes. The system measured searching, not illness, so when news coverage changed what people searched for, the prediction drifted. Want a harder question?</div>`,
  partial: `<div class="bubble"><div class="who">Que <span class="verdict verdict-warn">Not yet</span></div>Close, but think about what was actually being counted. Was it people with flu, or something else?</div>`,
};

const SAMPLES = [
  ['A vague answer', 'It just wasn’t accurate enough.'],
  ['A closer answer', 'It tracked what people searched for.'],
  ['A strong answer', 'It counted searches, but news coverage made people search even when they weren’t ill.'],
];

// The Que panel's slides: one live feature each (check-ins, another explanation, hints). Captions are Claude's draft.
const QUE_SLIDES = [
  ['check', 'Check-ins', 'Que asks you questions as you read, and tells you what your answer is missing.'],
  ['again', 'Another way', 'Ask when a passage doesn’t land, and Que rewrites it with a fresh example.'],
  ['hint', 'Hints', 'Stuck? Que points you at what to think about, and leaves the thinking to you.'],
];
// Que's mark inline (her vector package), so it can idle like Brilliant's Koji: a slow float, a blink, a glance (20 Nov)
const QUE_LIVE = `<svg class="que-mark-lg que-live" viewBox="0 0 410 235" aria-hidden="true"><g class="que-body"><path d="M 216 71 C 234 49 254 25 282 15 C 312 2 341 9 363 27 C 386 45 398 72 396 102 C 395 142 371 175 336 192 C 308 206 278 204 250 191 C 228 180 208 173 185 181 L 200 158 C 220 151 232 151 250 154 C 278 160 302 148 318 131 C 337 109 331 82 312 69 C 286 48 253 53 216 71 Z" fill="#0489dc"/><path d="M 228 58 C 213 62 204 47 181 38 C 151 23 121 25 94 35 C 58 48 33 73 23 106 C 11 141 23 178 50 201 C 72 222 105 225 134 214 C 156 206 171 191 184 181 L 203 160 C 185 166 171 174 153 176 C 127 180 105 167 94 145 C 82 120 98 97 120 86 C 137 77 151 76 170 79 C 192 84 209 75 228 58 Z" fill="#003052"/><path d="M 194 80 C 219 73 236 57 262 56 C 288 52 310 65 322 83 C 334 103 326 123 308 138 C 289 155 270 158 248 154 C 225 150 208 157 187 168 C 159 182 135 178 115 168 C 96 157 88 141 91 125 C 93 107 106 91 125 84 C 147 74 168 82 194 80 Z" fill="#FFFFFF"/><g class="que-eyes" fill="#003052"><ellipse cx="190" cy="119" rx="10.2" ry="17"/><ellipse cx="243" cy="113.5" rx="10.2" ry="17"/></g></g></svg>`;
// Que's character mark (her vector package in assets/que; usage sheet: size by width, no shadows, light version on light backgrounds)
const QUE_ICON = `<img class="qlogo-mark" src="${IMG}que/que-asking-light.svg" alt="" aria-hidden="true">`;
const que = () => `
  <section class="section section-alt" id="que"><div class="wrap">
    ${Q3 ? `<div class="feature-head">${QUE_LIVE}
      <p class="fh"><strong>Meet <span class="accent">Que</span>, our Socratic AI agent.</strong> Que is built into everything you read on FuturesHub. It asks you questions as you go and tells you what your answer is missing, so you think one step deeper before you move on.</p></div>` : document.body.dataset.fan === 'meet' ? fanMeet() : `<div class="section-head center">
      ${QUE_LIVE}
      <h2>${Q2 ? 'Meet <span class="accent">Que</span>, our Socratic AI agent' : '[Meet] <span class="accent">[Que]</span>[, your AI learning companion]'}</h2>
      <p class="lede">Que is built into everything you read on FuturesHub. It asks you questions as you go and tells you what your answer is missing, so you think one step deeper before you move on.</p>
    </div>`}
    ${Q5 ? '<p class="q5-demo"><button type="button" id="q5-play" aria-pressed="false">Play demo</button></p>' : ''}
    <ol class="steps" id="que-steps" aria-label="How a Que check-in works">
      ${['Read', 'Answer', 'Get feedback', 'Revise'].map((t, n) => `<li data-step="${n + 1}"><b>${n + 1}</b><span>${t}</span>${Q5 && n === 2 ? '<em class="q5-proposed">Proposed</em>' : ''}</li>`).join('')}
    </ol>
    <div class="que2">
      <article class="reader">
        <div class="demo-top"><span><strong>[Foundations of Data Driven Thinking]</strong> · [Chapter 1: Thinking in a World of Data]</span></div>
        <div class="reader-body" id="demo-body">
          ${DEMO.read()}
          ${DEMO.chart()}
        </div>
        ${Q5 ? '' : '<div class="demo-foot"><div class="progress"><span style="width:12%"></span></div><span>[12% complete]</span></div>'}
      </article>
      <aside class="que-panel" aria-label="Que">
        <div class="qhead">${QUE_ICON}<strong>Que</strong></div>
        ${Q5 ? '' : `<div class="qtabs" role="tablist" aria-label="What Que does">${QUE_SLIDES.map(([k, name], i) => `<button type="button" role="tab" data-slide="${k}" aria-selected="${!i}">${name}<i></i></button>`).join('')}</div>`}
        <p class="qcap" id="que-cap">${QUE_SLIDES[0][2]}</p>
        <div class="qpanes">
          <div class="qslide" data-pane="check">
            <div class="bubble"><div class="who">Que</div>[Quick check before we continue. In your own words, why did Google Flu Trends fail?]</div>
            <p class="que-auto small" id="que-auto" aria-live="polite"></p>
            <label class="sr" for="que-answer">Your answer</label>
            <textarea id="que-answer" rows="3" placeholder="Write your answer in your own words."></textarea>
            <div class="cta-row"><button type="button" class="btn btn-ghost btn-small" id="que-hint">Hint</button><button type="button" class="btn btn-check btn-small" id="que-check">Check →</button></div>
            <p id="que-hint-text" class="muted" hidden>Consider: what did the system actually measure?</p>
            <div id="que-feedback" aria-live="polite"></div>
          </div>
          ${Q5 ? '' : `<div class="qslide" data-pane="again" hidden>
            <div class="bubble quote"><div class="who">From the chapter</div>[The system, called Google Flu Trends, worked by tracking what people searched for.]</div>
            <div class="qthread" id="que-again" aria-live="polite"></div>
            <div class="cta-row"><button type="button" class="btn btn-ghost btn-small" id="que-again-btn">Explain another way</button></div>
          </div>
          <div class="qslide" data-pane="hint" hidden>
            <div class="bubble"><div class="who">Que</div>[In your own words, why did Google Flu Trends fail?]</div>
            <div class="qthread" id="que-hint2" aria-live="polite"></div>
            <div class="cta-row"><button type="button" class="btn btn-ghost btn-small" id="que-hint-btn">Hint</button></div>
          </div>`}
        </div>
      </aside>
    </div>
    ${Q2 ? `<div class="que-cta"><a class="btn btn-primary" href="${PRICING}">Start free</a><span>The first 2 chapters of every QueBook are free.</span></div>` : ''}
    ${LP === '2' ? '' : `<ul class="que-list three">
      <li><b>1</b><span><strong>Explains a passage another way</strong> when the first explanation doesn’t land.</span></li>
      <li><b>2</b><span><strong>Asks you check-in questions</strong> as you read, so you find out what you’ve understood.</span></li>
      <li><b>3</b><span><strong>Tells you what’s missing</strong>, not just whether you’re right.</span></li>
    </ul>`}
  </div></section>`;

// Que features beyond the live check-in, as cards (LP6). LP2 shows them as slides in the Que panel instead. Copy is Claude's draft.
const queMore = () => `<div class="qm-cards">
    <article class="qm-card"><h3>It explains things another way</h3><p>Ask when a passage doesn’t land, and Que rewrites it with a fresh example.</p>
      ${mock('Explain another way', `<div class="bubble me"><div class="who">You</div>Can you explain that another way?</div>
        <div class="bubble"><div class="who">Que</div>${Q2 ? 'Think of a bag of fertiliser. It only helps if there is rain and someone plants it. A textbook is the same: it helps when a teacher, time and a reader are also there.' : 'Imagine counting tissue sales to guess how many people have colds. A news story makes everyone stock up, and your count jumps though nobody got sicker.'}</div>`)}</article>
    <article class="qm-card"><h3>Hints, not answers</h3><p>Stuck on a check-in? Que points you at what to think about, and leaves the thinking to you.</p>
      ${mock('Hint', `<p class="mock-q">${QUE_ICON}${Q2 ? 'Were textbooks a necessary, sufficient or contributory cause of learning in Kenya?' : '[In your own words, why did Google Flu Trends fail?]'}</p><p class="mock-fb"><b aria-hidden="true">?</b>${Q2 ? 'Consider: what else had to be in place for the textbooks to help?' : 'Consider: what did the system actually measure?'}</p>`)}</article>
    ${Q2 ? '' /* Quill 2.0 shows Apply with Que beside the challenge cards */ : `<article class="qm-card"><h3>Applications are a conversation</h3><p>Challenges start with a talk with Que about a problem you care about, not a CV.</p>${MOCKS.challenge()}</article>`}
  </div>`;

const upcoming = () => `
  <section class="section section-alt" id="upcoming"><div class="wrap">
    <div class="section-head"><h2>Coming <span class="accent">up</span></h2>
      <p class="lede">Live masterclasses with Equitech Futures faculty. [For Learner and Learner+].</p></div>
    <div class="sessions">${UPCOMING.map((s) => {
      const p = PEOPLE[s.by];
      return `<article class="session">
        <img class="cover" src="${IMG}covers/${s.slug}.jpg" alt="">
        <div class="session-body">
          <span class="date">${s.date} · ${s.time}${s.also ? ` <span class="muted">(${s.also})</span>` : ''}</span>
          <h4>${s.name}</h4>
          <div class="by">${avatar(p, 28)}<span>${p.name}</span><span class="muted">· ${s.length}</span></div>
        </div>
      </article>`;
    }).join('')}</div>
    <div class="recordings">
      <span class="chip chip-free">Free for all tiers</span>
      ${RECORDINGS.map((r) => `<a class="recording" href="#"><img src="${IMG}covers/${r.slug}.jpg" alt=""><span><strong>${r.name}</strong><span class="muted">Watch the recording · ${r.by}</span></span></a>`).join('')}
    </div>
  </div></section>`;

const cohorts = () => `
  <section class="section section-alt" id="cohorts"><div class="wrap">
    <div class="section-head"><h2><span class="accent">Cohorts</span></h2><p class="lede">Weeks or months with the same group and mentors. Included in Learner+.</p></div>
    <div class="feature-cards">${COHORTS.map((c) => `
      <article class="feature ${c.past ? 'is-past' : ''}">
        ${c.cover ? `<img class="cover" src="${IMG}covers/${c.cover}.jpg" alt="">` : ''}
        <div class="feature-body">
          <div class="card-top">${c.past ? pastChip(c.past) : ''}<span class="chip">${c.status}</span></div>
          <h3>${c.name}</h3><p>${c.text}</p><p class="muted small">${c.facts}</p>${byline(c.by)}
        </div>
      </article>`).join('')}</div>
  </div></section>`;

const challenges = () => `
  <section class="section" id="challenges"><div class="wrap">
    <div class="section-head"><h2>[FuturesHub] <span class="accent">[Challenges]</span></h2><p class="lede">Scholarships, funding and awards for real work. Entry is free.</p></div>
    <div class="three">${CHALLENGES.map((c) => `
      <article class="card ${c.past ? 'is-past' : ''}">
        <div class="card-top">${c.past ? pastChip(`Past · ${c.past}`) : `<span class="chip">${c.status}</span>`}</div>
        <h3>${c.name}</h3><p>${c.text}</p>
        <p class="award">${c.award}</p><p class="muted small">With ${c.with}</p>
      </article>`).join('')}</div>
  </div></section>`;

const faculty = () => `
  <section class="section" id="faculty"><div class="wrap">
    <!-- Who we are + faculty in one block (her bluedot.org reference, then "merge these two"); wording from equitechfutures.com, 19 Nov 2026 -->
    <div class="about">
      <h2>FuturesHub is the learning platform of <span class="accent">Equitech Futures</span>, a launchpad for global AI talent tackling frontier challenges.</h2>
      <p class="lede">Learner+ members can book office hours with ${Q2 ? 'Equitech Futures faculty' : 'the faculty below'}. <a href="https://www.equitechfutures.com/">More about Equitech Futures →</a></p>
    </div>
    ${Q2 ? '' : `<div class="people">${Object.values(PEOPLE).map((p) => `
      <article class="person">
        ${p.img ? `<img class="photo" src="${IMG}people/${p.img}" alt="">` : `<div class="photo photo-initials" aria-hidden="true">${initials(p)}</div>`}
        <h4>${p.name}</h4><p>${p.role}</p><p class="cred">${p.cred}</p>
      </article>`).join('')}</div>`}
  </div></section>`;

// Quill 2.0: alumni quotes over full-bleed photos (Axiom-style cards), no placeholder notes
// Seba Nazary and Sherry Xue: quoted as published on equitechfutures.com/programs (21 Nov 2026), with their photos from that page.
const TQ = [
  { ...QUOTES[0], pic: 'people/montse-madrigal.webp' },
  { ...QUOTES[1], pic: 'events/alumni-table.jpg' },
  { ...QUOTES[2], pic: 'people/raunaq-jain-2.webp' },
  { name: 'Seba Nazary', pic: 'people/seba-nazary.webp', from: 'Siemens Mobility, Germany · Applied Data Institute', text: 'Equitech Futures’ Applied Data Institute brought me together with exceptionally motivated, thoughtful, and talented people from all over the world. Everything I am doing in the data science field right now is because of the introduction I got from Equitech Futures.' },
  { name: 'Sherry Xue', pic: 'people/sherry-xue.webp', from: 'Climate Innovation Challenge, China · Civic Tech Institute', text: 'The Community Action Lab course in the Civic Tech Institute taught me what to do when I’m presenting an idea to someone who has a different perspective than me. I learned techniques to advocate for my position in a respectful way that continues the dialogue.' },
];
const photoQuotes = () => `
  <section class="section section-alt"><div class="wrap">
    <div class="section-head tq-head"><h2>From Equitech Futures alumni</h2>
      <div class="tq-nav"><button type="button" data-tq="-1" aria-label="Previous quotes">←</button><button type="button" data-tq="1" aria-label="More quotes">→</button></div></div>
    <div class="tcards" id="tq">${TQ.map((q) => `
      <figure class="tcard"><img src="${IMG}${q.pic}" alt="" loading="lazy">
        <blockquote>“${q.text}”</blockquote>
        <figcaption><strong>${q.name}</strong><span>${q.from}</span></figcaption>
      </figure>`).join('')}</div>
  </div></section>`;

const testimonials = () => Q2 ? photoQuotes() : `
  <section class="section section-alt"><div class="wrap">
    <div class="section-head"><h2>From Equitech Futures alumni</h2>
      <p class="ph-label">Placeholder: quotes from Equitech Futures programmes until FuturesHub learners are quoted</p></div>
    <div class="three">${QUOTES.map((q) => `
      <figure class="quote">
        <blockquote>“${q.text}”</blockquote>
        <figcaption><img class="avatar" src="${IMG}people/${q.img}" alt="" width="44" height="44"><span><strong>${q.name}</strong><span class="muted small">${q.from}</span></span></figcaption>
      </figure>`).join('')}</div>
    <div class="ph stack" style="margin-top:16px"><span class="ph-label">Placeholder · alumni outcomes</span><p>Where alumni went next: universities, scholarships, roles and ventures.</p></div>
  </div></section>`;

const plans = () => `
  <section class="section section-alt" id="plans"><div class="wrap">
    <div class="section-head"><h2>Start free. Upgrade for the full books, live classes and faculty.</h2></div>
    <div class="three">
      <article class="card plan"><h3>Explorer</h3><div class="price">Free</div><ul>
        <li>Selected QueBriefs</li><li>The first 2 chapters of every QueBook</li><li>Recordings of past workshops</li><li>Every FuturesHub Challenge that’s open</li><li>[Limited Que interactions]</li></ul>
        <a class="btn btn-ghost" href="#">Start free</a></article>
      <article class="card plan featured"><h3>Learner</h3><div class="price">$15 <small>a month</small></div><ul>
        <li>Every QueBook in full</li><li>Live masterclasses</li><li>Case studies ${TBC}</li></ul>
        <a class="btn btn-primary" href="#">Become a Learner</a></article>
      <article class="card plan"><h3>Learner+</h3><div class="price">$99 <small>a year</small></div><ul>
        <li>Everything in Learner</li><li>Office hours with faculty</li><li>Cohorts, including the Admit Track</li><li>AI for Science Summer School [at no additional cost]</li></ul>
        <a class="btn btn-ghost" href="#">Become a Learner+</a></article>
    </div>
    <p class="muted" style="margin-top:24px">Builder and FuturesHub Studio appear on the full pricing page only.</p>
  </div></section>`;

const FAQ = [
  ['[Do I need technical knowledge?]', 'No. QueBooks start from first principles, and Que can explain any passage another way.'],
  ['Do I have to do these in order?', 'No. QueBooks, live sessions, cohorts and challenges each stand on their own. Use any of them, in any order.'],
  ['What can I do for free?', 'Read selected QueBriefs and the first two chapters of every QueBook, watch past workshop recordings, and enter open FuturesHub Challenges.'],
  ['What’s the difference between a live session and a cohort?', 'A live session is one class of 60 to 90 minutes. A cohort runs for weeks or months with the same group and mentors.'],
  ['Who or what is Que?', 'Que is the AI tutor inside every QueBook and QueBrief. It explains, asks check-in questions and gives feedback on your answers.'],
];

const faq = () => `
  <section class="section" id="faq"><div class="wrap">
    <div class="section-head"><h2>Questions</h2></div>
    <div class="faq">${FAQ.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('')}</div>
  </div></section>`;

const closing = () => `
  <section class="section closing"><div class="wrap">
    <h2>[Helping the Next Generation of Innovators] <span class="accent">[Build the Future]</span></h2>
    <p class="lede">[Whether you're a prospective student, educator, or institution — we'd love to hear from you.]</p>
    <div class="cta-row"><a class="btn btn-primary" href="${PRICING}">[Start Learning] →</a><a class="btn btn-ghost" href="mailto:info@equitechfutures.com">[Contact Us]</a></div>
  </div></section>`;

// Live footer: every Platform link points to "#" (top of page), cohorts are missing, and it says
// Floating badge, as on the live site: links to Equitech Futures.
const platformBadge = () => `
  <a class="platform-badge" href="https://equitechfutures.com/" target="_blank" rel="noopener" aria-label="An Equitech Futures platform (opens equitechfutures.com)">
    <span aria-hidden="true">An</span><span class="ef-logo" aria-hidden="true"></span><span aria-hidden="true">Platform</span>
  </a>`;

// QueChallenges while the page says FuturesHub Challenges. Here it's FuturesHub Challenges everywhere, every offering is listed, and each link lands on its section.
// Footer socials as small icons (her ask, 21 Nov), not pill buttons
const SOCIALS = [
  ['LinkedIn', 'https://www.linkedin.com/company/equitech-futures', '<path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5.2c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V21h-4z" fill="currentColor"/>'],
  ['Instagram', 'https://www.instagram.com/equitechfutures', '<rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/>'],
  ['YouTube', 'https://www.youtube.com/channel/UC7GigG-alaghZdRDYUrurfw', '<path d="M22 8.2c-.2-1.6-1-2.7-2.6-2.9C17 5 12 5 12 5s-5 0-7.4.3C3 5.5 2.2 6.6 2 8.2 1.8 9.5 1.8 12 1.8 12s0 2.5.2 3.8c.2 1.6 1 2.7 2.6 2.9C7 19 12 19 12 19s5 0 7.4-.3c1.6-.2 2.4-1.3 2.6-2.9.2-1.3.2-3.8.2-3.8s0-2.5-.2-3.8zM10 15V9l5.2 3z" fill="currentColor"/>'],
];
const footer = () => {
  const on = (id) => (document.body.dataset.variant === 'a' ? `#${id}` : '#group-read');
  const links = (rows) => rows.map(([label, href]) => `<a href="${href}">${label}</a>`).join('');
  const ext = (label, href) => `<a href="${href}" target="_blank" rel="noopener">${label}</a>`;
  return `
  <footer class="footer"><div class="wrap">
    <div class="foot-grid">
      <div class="foot-brand">
        <a href="#top" class="logo" aria-label="FuturesHub home"></a>
        <p>[An Equitech Futures platform advancing human intelligence in the age of AI.]</p>
        <address>[231 S. La Salle Street, Suite 2100]<br>[Chicago, Illinois 60604]<br>[U.S.A]</address>
        ${ext('[A platform by Equitech Futures]', 'https://equitechfutures.com/')}
      </div>
      <nav aria-label="Platform"><h4>[Platform]</h4>${links([
        ['Read with Que', QUE_PAGE()], ['Learn with others', '#group-live'], ['Build something', '#group-build'],
      ])}</nav>
      <div><h4>[Organization]</h4>${ext('[Programs]', 'https://equitechfutures.com/')}${ext('[Ventures]', 'https://equitechfutures.com/')}${ext('[Newsroom]', 'https://equitechfutures.com/')}</div>
      <div><h4>[Contact]</h4>${['info', 'partnerships', 'admissions'].map((m) => `<a href="mailto:${m}@equitechfutures.com">[${m}@equitechfutures.com]</a>`).join('')}
        <div class="socials">${SOCIALS.map(([label, href, path]) => `<a href="${href}" target="_blank" rel="noopener" aria-label="${label}"><svg viewBox="0 0 24 24" aria-hidden="true">${path}</svg></a>`).join('')}</div>
      </div>
    </div>
    <div class="foot-base">
      <span>[© 2026 Equitech Futures. All rights reserved.]</span>
      <span>${links([['[Privacy Policy]', 'https://www.futureshub.com/privacy-policy'], ['[Terms of Service]', 'https://www.futureshub.com/terms-of-service'], ['[Cookie Policy]', 'https://www.futureshub.com/cookie-policy']])}</span>
    </div>
    <p class="fine">Mockup for discussion, November 2026. Not the live FuturesHub site. Proof figures and alumni quotes are Equitech Futures’ own.</p>
  </div></footer>`;
};


/* ---------- Category sections: three groups, each shown as gradient offer cards ---------- */
const ICON = {
  quebook: '<path d="M5 4h10a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3V4zM5 17a3 3 0 0 1 3-3h10"/>',
  case: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M3 13h18"/>',
  brief: '<path d="M6 3h9l4 4v14H6zM14 3v5h5M9 13h7M9 17h7"/>',
  live: '<rect x="3" y="6" width="13" height="12" rx="2"/><path d="m16 11 5-3v8l-5-3"/>',
  cohort: '<circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 20a6 6 0 0 1 12 0M15 15a5 5 0 0 1 6 5"/>',
  office: '<path d="M4 5h16v11H9l-5 4z"/><path d="M8 10h8"/>',
  challenge: '<path d="M6 21V4M6 5h11l-2 4 2 4H6"/>',
};
const icon = (k) => `<svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON[k]}</svg>`;
const TONES = ['tone-a', 'tone-b', 'tone-c'];
const offer = ({ id, ic, title, desc, foot, past }, n) => `
  <a class="offer ${TONES[n % 3]}${past ? ' is-past' : ''}" href="#"${id ? ` id="${id}"` : ''}>
    <span class="offer-top">${icon(ic)}</span>${past ? '<span class="chip chip-past">Past</span>' : ''}
    <span class="offer-body"><h3>${title}</h3><p>${desc}</p></span>
    <span class="offer-foot"><span>${foot}</span><span aria-hidden="true">→</span></span>
  </a>`;

const channelCard = (k) => {
  const c = CHANNELS[k];
  const foot = k === 'live' ? `Next: ${UPCOMING[0].date}` : k === 'cohort' ? 'Join any time' : c.price;
  return { id: `ch-${k}`, ic: k, title: c.name, desc: c.def, foot };
};
const challengeCards = () => ITEMS.filter((i) => i.channel === 'challenge').sort((a, b) => !!a.past - !!b.past)
  .map((i, n) => ({ id: n === 0 ? 'ch-challenge' : '', ic: 'challenge', title: i.name, desc: i.meta, foot: i.past ? 'Ended' : 'Free to enter', past: i.past }));

const category = (g, body) => `
  <section class="section" id="group-${g}"><div class="wrap">
    <div class="section-head"><h2>${GROUPS[g].title}</h2><p class="lede">${GROUPS[g].sub}</p></div>
    ${body}
  </div></section>`;
const offers = (cards) => `<div class="offers">${cards.map(offer).join('')}</div>`;

/* On the calendar: everything with a date, across all three groups. Undated items say so instead of inventing dates. */
const CALENDAR = [
  ...UPCOMING.map((s) => ({ g: 'live', ch: 'live', when: s.date, title: s.name, meta: `Live session · ${PEOPLE[s.by].name} · ${s.time}` })),
  { g: 'live', ch: 'cohort', when: 'Rolling', title: 'The Admit Track: Graduate Admissions', meta: 'Cohort · join any time until March 2027' },
  { g: 'live', ch: 'cohort', when: null, title: 'AI for Science Summer School', meta: 'Cohort · next run to be announced' },
  { g: 'build', ch: 'challenge', when: null, title: 'Rise Innovation Challenge', meta: 'Challenge · by invitation · awards up to $10,000' },
];
const calDate = (when) => {
  if (!when) return `<span class="cal-date tbc-date"><b>${TBC}</b><span>date</span></span>`;
  const [wd, d, m] = when.split(' ');
  return m ? `<span class="cal-date"><span>${wd}</span><b>${d}</b><span>${m}</span></span>` : `<span class="cal-date"><b class="word">${when}</b></span>`;
};
const calendar = () => `
  <section class="section" id="calendar"><div class="wrap">
    <div class="section-head"><h2>On the <span class="accent">calendar</span></h2>
      <p class="lede">Everything with a date, from all three. Read with Que has no dates: start any time.</p></div>
    <ol class="cal">${CALENDAR.map((c) => `
      <li class="cal-item g-${c.g}${c.when ? '' : ' is-tbc'}">${posterArt(artFor({ channel: c.ch, name: c.title }))}
        <span class="cal-text"><span class="cal-when">${c.when || `Date ${TBC}`}</span><strong>${c.title}</strong><span class="muted small">${c.meta}</span></span>
      </li>`).join('')}</ol>
  </div></section>`;

const categories = () => [
  category('read', offers(['quebook', 'case', 'brief'].map(channelCard)) + `<p class="muted note">${ANY_ORDER_TEXT}</p>`),
  category('live', offers(['live', 'cohort', 'office'].map(channelCard))),
  category('build', APPLY_QUE + offers(challengeCards())),
  LP === '7' ? shelf() : calendar(),
].join('');


/* ---------- LP2: each offering introduced in a full-width band, Quill-style, in FuturesHub colours ---------- */
const LP = document.body.dataset.lp || '1';
// Quill 2.0 (quill-2.html): LP2 plus the design-critic fixes of 20 Nov (merged Read band, pause button, bigger targets, one more Start free)
const Q2 = document.body.dataset.q2 === '1';
// Quill 3.0 (quill-3.html): its own mission-first page in shared/q3.js
const Q3 = document.body.dataset.q3 === '1';
const Q5 = document.body.dataset.q5 === '1'; // Quill 5.0: Quill 4.0 + Sharanya's review (24 Nov)
const MENTOR = (name) => Object.values(PEOPLE).find((p) => p.name === name);
const mock = (label, body, note = '') => `<div class="mock"><div class="mock-head"><span>${label}</span>${note ? `<span class="mock-note">${note}</span>` : ''}</div><div class="mock-body">${body}</div></div>`;
const MOCKS = {
  // Check-in from Introduction to Causal Reasoning, Ch. 1 (futureshub.com, 20 Nov 2026); the Meet Que demo already uses Google Flu Trends.
  // The answer and Que's reply are illustrative.
  quebook: () => mock('Causal Reasoning · Chapter 1', `
    <p class="mock-q">${QUE_ICON}[In Kenya, textbooks didn't improve average test scores. Were textbooks a necessary cause, sufficient cause, or contributory cause of learning?]</p>
    <p class="mock-a">A <mark>contributory cause</mark>. They made learning more likely, but not on their own.</p>
    <p class="mock-fb"><b aria-hidden="true">⇆</b>Good: contributory. Now say what else had to be in place for the textbooks to help.</p>`, 'Illustrative answer'),
  case: () => mock('Make the call', `
    <strong>Sama: The Ethics of AI’s Hidden Workforce</strong>
    <p class="muted small">You lead the company. A major client asks for a new kind of labelling work. What do you weigh first?</p>
    <ul class="mock-opts">${['The contract and the jobs it brings', 'What the work does to the people doing it', 'How it will look if it goes public'].map((o, i) => `<li${i === 1 ? ' class="on"' : ''}>${o}</li>`).join('')}</ul>`, 'Illustrative'),
  brief: () => mock('QueBrief', `
    <img class="mock-cover" src="${IMG}covers/what-happens-when-ai-trains-on-ai-generated-data.jpg" alt="">
    <strong>What happens when AI trains on AI-generated data?</strong>
    <p class="muted small">One question, what the research says, in one sitting.</p>`),
  live: () => LP === '2' ? mock('More live sessions', evNext()) : mock('Next live sessions', UPCOMING.slice(0, 3).map((u) => `
    <div class="mock-row">${calDate(u.date)}<span><strong>${u.name}</strong><span class="muted small">${PEOPLE[u.by].name} · ${u.time}</span></span></div>`).join('')),
  // The summer school has no cover; its "Welcome" image from Equitech Futures' LinkedIn stands in (local mockup only).
  cohort: () => LP === '2' ? mock('Cohorts', `<div class="ev-list ev-next">${COHORTS.map((c) => `<a class="ev-card is-compact" href="#">
    <span class="ev-pic"><img src="${IMG}${c.cover ? `covers/${c.cover}` : 'events/summer'}.jpg" alt=""></span>
    <span class="ev-text"><strong>${c.name}</strong><span class="ev-when">${c.past ? `Next run ${TBC}` : 'Open now · join any time'}</span></span></a>`).join('')}</div>`) : mock('Cohorts', COHORTS.map((c) => `
    <div class="mock-row"><img src="${IMG}${c.cover ? `covers/${c.cover}` : 'events/summer'}.jpg" alt=""><span><strong>${c.name}</strong><span class="muted small">${c.past ? `${c.past} · ` : ''}${c.status}</span></span></div>`).join('')),
  office: () => mock('Book office hours', ITEMS.filter((i) => i.channel === 'office').map((i) => `
    <div class="mock-row">${avatar(MENTOR(i.name), 40)}<span><strong>${i.name}</strong><span class="muted small">${i.meta}</span></span></div>`).join('')),
  challenge: () => mock('Apply with Que', `
    <p class="mock-q">${QUE_ICON}Tell me about a problem you noticed this year that nobody was fixing.</p>
    <p class="mock-a">At my college, first-year students drop out of coding classes in the first month…</p>
    <p class="muted small">[A candid, open-ended conversation with Que] instead of a CV, read by people on the Equitech Futures team.</p>`, 'Illustrative'),
};

// Quill 2.0 band cards, laid out like futureshub.com's programme cards (facts strip, faculty row, status chips, stat footer).
// Quill 2.0 band card: the same frame for every tab (cover, title, one line, a small live example), so tabs never jump in size.
const avatarRow = (keys) => `<span class="pc-by">${keys.map((k) => `<span><img src="${IMG}people/${PEOPLE[k].img}" alt="">${PEOPLE[k].name}</span>`).join('')}</span>`;
const nextRow = (img, small, title) => `<a class="pc-next" href="#"><img src="${IMG}${img}" alt=""><span><small>${small}</small><strong>${title}</strong></span><b aria-hidden="true">→</b></a>`;
const CARD = {
  quebook: { cover: 'covers/introduction-to-causal-reasoning.jpg', tag: 'QueBook', title: 'Introduction to Causal Reasoning', line: 'Chapter 1 asks why textbooks in Kenya didn’t raise test scores.',
    snip: () => `<p class="mock-q">${QUE_ICON}Were textbooks a necessary, sufficient or contributory cause of learning?</p><p class="mock-a">A <mark>contributory cause</mark>. They made learning more likely, but not on their own.</p>` },
  case: { cover: 'covers/sama-the-ethics-of-ai-s-hidden-workforce.jpg', tag: 'Case study', title: 'Sama: The Ethics of AI’s Hidden Workforce', line: 'You lead the company. A client asks for a new kind of labelling work.',
    snip: () => `<ul class="mock-opts">${['The contract and the jobs it brings', 'What the work does to the people doing it', 'How it will look if it goes public'].map((o, i) => `<li${i === 1 ? ' class="on"' : ''}>${o}</li>`).join('')}</ul>` },
  brief: { cover: 'covers/what-happens-when-ai-trains-on-ai-generated-data.jpg', tag: 'QueBrief', title: 'What happens when AI trains on AI-generated data?', by: ['abhilash'],
    snip: () => `<p class="mock-q">${QUE_ICON}Why does training on AI-made text make models narrower, not noisier?</p>` },
  live: { cover: 'covers/present-like-a-pro-on-zoom.jpg', tag: 'Fri 8 Jan · 3:00 PM UTC · 90 min', title: 'Present like a Pro on Zoom', by: ['thomas'],
    snip: () => nextRow(`covers/${RECORDINGS[0].slug}.jpg`, 'Free recording', RECORDINGS[0].name) },
  cohort: { cover: `covers/${COHORTS[0].cover}.jpg`, tag: 'Open now · 6 months', title: COHORTS[0].name, by: COHORTS[0].by,
    snip: () => nextRow('events/summer.jpg', COHORTS[1].status, COHORTS[1].name) },
  office: { cover: 'people/nikita-kaushal.webp', tag: 'Learner+ · 30–60 min', title: 'Office hours', line: '1:1 time with Equitech Futures faculty, on any topic.',
    snip: () => `<span class="pc-by">${['abhilash', 'thomas', 'azania', 'nikita'].filter((k) => PEOPLE[k]).map((k) => `<span><img src="${IMG}people/${PEOPLE[k].img}" alt="">${PEOPLE[k].name}</span>`).join('')}</span>` },
};
const pcard = (k) => { const c = CARD[k]; return `<div class="pcard">
    <div class="pc-top"><img class="pc-cov" src="${IMG}${c.cover}" alt=""><div class="pc-meta"><span class="pc-tag">${c.tag}</span><strong class="pc-title">${c.title}</strong>${c.line ? `<p>${c.line}</p>` : ''}${c.by ? avatarRow(c.by) : ''}</div></div>
    <div class="pc-snip">${c.snip()}</div></div>`; };

// Challenges: pictures, topic icons and partner logos instead of chips and "With …" text
const TOPIC = {
  Healthcare: '<path d="M20.8 8.6a5 5 0 0 0-8.8-3.2A5 5 0 0 0 3.2 8.6c0 5.4 8.8 10.4 8.8 10.4s8.8-5 8.8-10.4z"/><path d="M3.5 12h4l2-3 3 6 2-3h6"/>',
  Education: '<path d="M2 5h7a3 3 0 0 1 3 3v12a2 2 0 0 0-2-2H2z"/><path d="M22 5h-7a3 3 0 0 0-3 3v12a2 2 0 0 1 2-2h8z"/>',
  Climate: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10z"/><path d="M2 21c0-3 1.9-5.4 5.2-6.1"/>',
  Governance: '<path d="M3 22h18M6 18v-7M10 18v-7M14 18v-7M18 18v-7M12 2l9 5H3z"/>',
  Science: '<circle cx="12" cy="12" r="1.5"/><ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/>',
  Technology: '<rect x="5" y="5" width="14" height="14" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/>',
};
const KXI = '<b class="kxi">Kevin Xu Initiative<small>UChicago Harris</small></b>';
const CH = {
  'Rise Innovation Challenge': { pic: '', line: 'For Rise Fellows and Finalists: five months building AI tools, with mentorship.', topics: ['Healthcare', 'Education', 'Climate', 'Governance'],
    logos: [['logos/rise.svg', 'Rise'], ['logos/rhodes-trust.svg', 'Rhodes Trust']], stats: [['$10K', 'top award'], ['5 months', 'programme']], act: 'View the challenge' },
  'AI for Science Challenge': { pic: 'covers/ai-for-science-challenge.jpg', line: 'Applicants talked with Que instead of sending a CV.', topics: ['Science'],
    logos: [['equitech-futures-logo.svg', 'Equitech Futures']], stats: [['Scholarships', 'to the summer school']], act: 'See the 2026 challenge' },
  'EFI Scholar Challenge': { pic: 'covers/efi-scholar-challenge.jpg', line: 'Undergraduates set out a problem they want to solve with technology.', topics: ['Technology'],
    logos: [['logos/rhodes-trust.svg', 'Rhodes Forum on Technology and Society'], KXI], stats: [['$9,500', 'full funding']], act: 'See the 2026 challenge' },
};
const chCards = () => `<div class="ch-cards">${CHALLENGES.map((c) => { const x = CH[c.name]; return `
    <article class="ch-card${c.past ? ' is-past' : ''}">
      ${x.pic ? `<img class="ch-pic" src="${IMG}${x.pic}" alt="">` : `<span class="ch-pic ch-pic-logo"><img src="${IMG}logos/rise.svg" alt=""></span>`}
      <h4>${c.name}</h4><p>${x.line}</p>
      <div class="ch-marks"><span class="ch-topics">${x.topics.map((t) => `<span title="${t}">${svg(TOPIC[t])}<span class="sr">${t}</span></span>`).join('')}</span>
        <span class="ch-logos">${x.logos.map((l) => typeof l === 'string' ? l : `<img src="${IMG}${l[0]}" alt="${l[1]}" title="${l[1]}">`).join('')}</span></div>
      <div class="ch-foot">${x.stats.map(([n, l]) => `<span><b>${n}</b><small>${l}</small></span>`).join('')}<a href="#">${x.act}</a></div>
    </article>`; }).join('')}</div>
  <div class="apply-que"><div><h4>Apply with Que, not a CV</h4><p>Some challenges start with a conversation with Que about a problem you care about. People on the Equitech Futures team read every one.</p></div>${MOCKS.challenge()}</div>`;

const TAB_BANDS = { read: ['band-blue', ['quebook', 'case', 'brief'], 'Read with Que', 'quebook'], live: ['band-teal', ['live', 'cohort', 'office'], 'Learn with others', 'live'] };
const tabText = (k) => { const c = CHANNELS[k], b = BAND[k]; return `<p class="tagline">${c.def}</p><span class="dash" aria-hidden="true"></span><p>${b.body}</p>
    <div class="cta-row"><a class="btn btn-light" href="${b.href || '#'}">${Q2_CTA[k] || b.cta || 'Find out more'}</a></div>`; };
const tabExtra = (k) => k === 'cohort' ? perks() : '';
const tabBand = (g) => { const [tone, ks, name, ic] = TAB_BANDS[g]; return `<div id="group-${g}"><section class="oband ${tone}${g === 'live' ? ' flip' : ''}" id="band-${g}">${ks.map((k) => `<i id="ch-${k}"></i>`).join('')}
    <div class="wrap"><div class="band-text"><h3>${icon(ic)}${name}</h3>
      <div class="rtabs" role="tablist" aria-label="${name}">${ks.map((k, i) => `<button type="button" role="tab" data-tab="${g}:${k}" aria-selected="${!i}">${CHANNELS[k].name}</button>`).join('')}</div>
      <div class="rpane" id="${g}-text" aria-live="polite">${tabText(ks[0])}</div></div>
      <div class="band-mock" id="${g}-mock">${pcard(ks[0])}</div></div>
    <div class="wrap cards-wrap" id="${g}-extra">${tabExtra(ks[0])}</div></section></div>`; };
const tabWire = () => {
  const pick = (g, k) => {
    document.querySelectorAll(`[data-tab^="${g}:"]`).forEach((t) => t.setAttribute('aria-selected', t.dataset.tab === `${g}:${k}`));
    document.getElementById(`${g}-text`).innerHTML = clean(tabText(k));
    document.getElementById(`${g}-mock`).innerHTML = clean(pcard(k));
    document.getElementById(`${g}-extra`).innerHTML = clean(tabExtra(k));
  };
  document.querySelectorAll('[data-tab]').forEach((t) => t.addEventListener('click', () => pick(...t.dataset.tab.split(':'))));
  addEventListener('hashchange', () => { const k = location.hash.slice(4), g = Object.keys(TAB_BANDS).find((x) => TAB_BANDS[x][1].includes(k)); if (g) pick(g, k); });
};

// Draft copy for Rishita to rewrite.
const BAND = {
  quebook: { body: 'Interactive textbooks written by Equitech Futures faculty, chapter by chapter, with charts and widgets you can play with. Que is on every page.', cta: 'Try a sample chapter' },
  case: { body: 'Each case puts you inside a real organisation at the moment it had to choose, from Sama and the ethics of AI’s hidden workforce to Hugging Face and a failing chatbot for teenagers. Decide what you would do and why, then see what actually happened.', cta: 'Try a sample case' },
  brief: { body: 'A QueBrief takes one current question and lays out what the research says.', cta: 'Read a sample brief' },
  live: { body: 'Masterclasses and workshops of 60 to 90 minutes with Equitech Futures faculty and guests, on everything from AI adoption to interviewing and presenting.', cta: 'See the dates', href: '#calendar' },
  cohort: { body: 'Learn with the same group and mentors over a longer stretch, from four weeks to six months.', cta: 'See the dates', href: '#calendar' },
  office: { body: 'Book a 1:1 with a faculty member: research with Dr. Abhilash Mishra, leadership with Thomas Murray, writing with Azania Imtiaz Patel, or a general session with Dr. Nikita Kaushal.', cta: 'Book office hours' },
  challenge: { body: 'Work on a real problem, and apply by talking it through with Que instead of sending a CV. Past winners earned summer-school scholarships and full funding worth up to $10,000.', cta: 'See the challenges', href: '#challenge-cards' },
};
// Quill 2.0: specific button labels instead of six "Learn more" and two "See the dates"
const Q2_MORE = { quebook: 'How QueBooks work', case: 'How case studies work', brief: 'How QueBriefs work', live: 'Browse all live sessions', cohort: 'How cohorts work', challenge: 'How applying works' };
const Q2_CTA = { live: 'See upcoming sessions', cohort: 'Explore cohorts' };
const BAND_TONES = ['band-blue', 'band-navy', 'band-teal'];
const DECO = { quebook: ['brief', 'case'], case: ['quebook', 'office'], brief: ['quebook', 'challenge'], live: ['cohort', 'office'], cohort: ['live', 'quebook'], office: ['cohort', 'brief'], challenge: ['quebook', 'cohort'] };

const band = (k, n, tone = BAND_TONES[n % 3]) => {
  const c = CHANNELS[k], b = BAND[k];
  const cards = k === 'challenge' && Q2 ? chCards() : k !== 'challenge' ? '' : `
    <div class="band-cards" id="challenge-cards">${ITEMS.filter((i) => i.channel === 'challenge').sort((a, z) => !!a.past - !!z.past).map((i) => `
      <article class="band-card${i.past ? ' is-past' : ''}">${COVERED.includes(slug(i.name)) ? `<img class="band-pic" src="${IMG}covers/${slug(i.name)}.jpg" alt="">` : `<span class="band-pic band-logo"><img src="${IMG}logos/rise.svg" alt="Rise"></span>`}<h4>${i.name}</h4>${i.past ? pastChip() : '<span class="chip chip-free">Free to enter</span>'}
        <p class="muted">${i.meta}</p><a class="btn btn-ghost btn-small" href="#">View the challenge</a></article>`).join('')}</div>`;
  return `
  <section class="oband ${tone}${n % 2 ? ' flip' : ''}" id="ch-${k}">
    ${DECO[k].map((d, j) => `<span class="deco deco-${j}" aria-hidden="true">${icon(d)}</span>`).join('')}
    <div class="wrap">
      <div class="band-text">
        <h3>${icon(k)}${c.name}</h3>
        <p class="tagline">${c.def}</p>
        <span class="dash" aria-hidden="true"></span>
        <p>${b.body}</p>
        ${Q2 ? '' : `<p class="band-facts">${c.length} · ${c.price}</p>`}
        <div class="cta-row"><a class="btn btn-light" href="${b.href || '#'}">${Q2 && Q2_CTA[k] ? Q2_CTA[k] : b.cta}</a>${Q2 ? '' : `<a class="btn btn-outline-light" href="#">${Q2 ? Q2_MORE[k] : 'Learn more'}</a>`}</div>
      </div>
      <div class="band-mock">${k === 'challenge' && Q2 ? `<img class="band-photo" src="${IMG}events/forum-ai.jpg" alt="">` : MOCKS[k]()}</div>
    </div>
    ${cards ? `<div class="wrap cards-wrap">${cards}</div>` : ''}
  </section>`;
};
const bands = () => {
  let n = 0;
  if (Q2) return tabBand('read') + tabBand('live') + `<div id="group-build">${band('challenge', 2, 'band-navy')}</div>` + evMonthPage(true); // calendar after all three: it lists sessions, cohorts and challenges
  return exploreBoxes() + Object.entries({ read: ['quebook', 'case', 'brief'], live: ['live', 'cohort'], build: ['challenge'] })
    .map(([g, ks]) => `<div id="group-${g}">${ks.map((k) => band(k, n++)).join('')}</div>`).join('') + evMonthPage(true);
};

/* ---------- LP7: the calendar as a poster shelf (open now, coming up, dates to come, watch free) ---------- */
// Covers come from FuturesHub; items without one get a draft cover in the same style.
// Draft covers for anything FuturesHub has no cover for, in the style of its own series.
const SERIES = { quebook: { kind: 'QueBooks', tone: 'blue' }, case: { kind: 'Case Studies', tone: 'plum' }, brief: { kind: 'QueBriefs', tone: 'slate' },
  cohort: { kind: 'Cohort Programs', tone: 'teal' }, challenge: { kind: 'Challenges', tone: 'violet' } };
const COVERED = ['interviewing-effectively', 'present-like-a-pro-on-zoom', 'tech-in-practice-with-elyse-wallnutt', 'the-admit-track-graduate-admissions',
  'the-environmental-costs-of-building-ai', 'the-jagged-frontier-ai-adoption-and-its-challenges', 'vibe-coding-with-google-ai-studio', 'writing-without-the-llm',
  // QueBook, case and QueBrief covers from futureshub.com/home (19 Nov 2026)
  'foundations-of-data-driven-thinking', 'critical-reasoning-in-the-age-of-ai', 'foundations-of-artificial-intelligence', 'sama-the-ethics-of-ai-s-hidden-workforce', 'introduction-to-causal-reasoning', 'ai-for-science', 'hugging-face', 'what-happens-when-ai-trains-on-ai-generated-data',
  // challenge covers from futureshub.com/home (closed opportunities, 20 Nov 2026)
  'ai-for-science-challenge', 'efi-scholar-challenge'];
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const artFor = (i) => COVERED.includes(slug(i.name)) ? { cover: slug(i.name), title: i.name } : { ...SERIES[i.channel], ic: i.channel, title: i.name };
const coverArt = (p) => p.cover ? `<img src="${IMG}covers/${p.cover}.jpg" alt="" loading="lazy">` : `
  <span class="poster-make tone-${p.tone}" aria-hidden="true"><span class="poster-logo"></span>${icon(p.ic)}
    <span class="poster-title">${p.title}</span><span class="poster-kind">FuturesHub | ${p.kind}</span><span class="poster-draft">Draft cover</span></span>`;

const posterArt = (a) => `<span class="poster-art">${coverArt(a)}</span>`;
const deck = (items) => `<span class="deck" aria-hidden="true">${items.slice(0, 3).map((i, n, all) => `<span style="--i:${n - (all.length - 1) / 2}">${posterArt(artFor(i))}</span>`).join('')}</span>`;
const posterWall = (cols = 6) => {
  const all = ITEMS.filter((i) => !['office', 'brief'].includes(i.channel)).map(artFor);
  return `<div class="wall" aria-hidden="true">${Array.from({ length: cols }, (_, c) => {
    const col = all.filter((_, i) => i % cols === c).concat(all.slice(c, c + 2));
    return `<div class="wall-col${c % 2 ? ' down' : ''}" style="--d:${70 + c * 9}s">${[...col, ...col].map(posterArt).join('')}</div>`;
  }).join('')}</div>`;
};

const SHELF = [
  ['Open now', [{ g: 'live', cover: COHORTS[0].cover, title: COHORTS[0].name, when: 'Join any time', meta: 'Cohort · until March 2027', back: [COHORTS[0].facts], chip: [CHANNELS.cohort.price] }]],
  ['Coming up', UPCOMING.map((u) => ({ g: 'live', cover: u.slug, title: u.name, when: u.date, meta: `${u.time} · ${PEOPLE[u.by].name}`,
    back: [`${u.length} · with ${PEOPLE[u.by].name}`, CHANNELS.live.def], chip: [CHANNELS.live.price] }))],
  ['Dates to come', [
    { g: 'live', ...SERIES.cohort, ic: 'cohort', title: COHORTS[1].name, meta: 'Cohort · ran July 2026', back: [COHORTS[1].facts], chip: [CHANNELS.cohort.price] },
    { g: 'build', ...SERIES.challenge, ic: 'challenge', title: CHALLENGES[0].name, meta: 'By invitation · up to $10,000', back: [CHALLENGES[0].text], chip: ['Free to enter', true] },
  ]],
  ['Watch any time, free', RECORDINGS.map((r) => ({ g: 'live', cover: r.slug, title: r.name, rec: true, meta: `Recording · ${r.by}`, back: [`With ${r.by}`], chip: ['Free for all tiers', true] }))],
];
const poster = (p) => `
  <li class="poster g-${p.g}${p.rec ? ' is-rec' : ''}"><a href="#">
    <span class="poster-art">${LP === '8' ? `<span class="flip-in"><span class="flip-face">${coverArt(p)}</span>
      <span class="flip-face flip-back"><strong>${p.title}</strong>${p.back.map((l) => `<span>${l}</span>`).join('')}${priceChip(...p.chip)}</span></span>` : coverArt(p)}
      ${p.rec ? '<span class="poster-play" aria-hidden="true"></span>' : ''}</span>
    <span class="stub"><span class="stub-when">${p.rec ? 'Watch free' : p.when || `Date ${TBC}`}</span><strong class="sr">${p.title}</strong><span class="stub-meta">${p.meta}</span></span>
  </a></li>`;
const shelf = () => `
  <section class="shelf-sec" id="calendar"><div class="wrap">
    <div class="shelf-head"><div><h2>On the <span class="accent">calendar</span></h2>
      <p>Everything with a date, plus recordings you can watch any time. Read with Que has no dates: start whenever you like.</p></div>
      <div class="shelf-nav"><button type="button" data-shelf="-1" aria-label="Scroll back">←</button><button type="button" data-shelf="1" aria-label="Scroll on">→</button></div></div>
    <div class="shelf" tabindex="0" aria-label="Calendar, scrolls sideways">${SHELF.map(([label, list]) => `
      <section class="shelf-seg" aria-label="${label}"><h3>${label}</h3><ol>${list.map(poster).join('')}</ol></section>`).join('')}</div>
  </div></section>`;

/* ---------- LP4: Explore FuturesHub, topics, then the three groups as light boxes ---------- */
const GROUP_CHANNELS = { read: ['quebook', 'case', 'brief'], live: ['live', 'cohort', 'office'], build: ['challenge'] };
const inTopic = (i, t) => t === 'all' || i.topic === t;
const xbox = (g, t) => {
  const pick = currentFirst(ITEMS.filter((i) => CHANNELS[i.channel].group === g && inTopic(i, t)))[0];
  const covers = currentFirst(ITEMS.filter((i) => CHANNELS[i.channel].group === g && i.channel !== 'office' && inTopic(i, t)));
  const has = (k) => ITEMS.some((i) => i.channel === k && (inTopic(i, t) || i.topic === null));
  const ex = `<p class="xbox-pick"><span>${t === 'all' ? 'For example' : `In ${TOPICS[t].name}`}</span>${pick ? `${pick.name}${pick.past ? ` ${pastChip()}` : ''}` : 'Nothing on this topic yet.'}</p>`;
  // LP2: a lighter box (the bands below carry the detail): no icon, chips or Apply line (20 Nov, "less cluttered")
  if (LP === '2') return `<article class="xbox xbox-lite x-${g}">
    <h3>${GROUPS[g].title}</h3><p>${GROUPS[g].sub}</p>
    <p class="xbox-list">${GROUP_CHANNELS[g].map((k) => `<span${has(k) ? '' : ' class="none"'}>${CHANNELS[k].name}</span>`).join(' · ')}</p>
    ${ex}<a class="xbox-go" href="#group-${g}">Explore ${GROUPS[g].name} <span aria-hidden="true">→</span></a>
  </article>`;
  return `<article class="xbox x-${g}${LP === '8' ? ' deck-box' : ''}" id="group-${g}">
    ${LP === '8' && covers.length ? deck(covers) : `<span class="xbox-ic">${icon(GROUP_CHANNELS[g][0])}</span>`}
    <h3>${GROUPS[g].title}</h3>
    <p>${GROUPS[g].sub}</p>${g === 'build' ? APPLY_QUE : ''}
    <ul class="xbox-chips">${GROUP_CHANNELS[g].map((k) => `<li id="ch-${k}"${has(k) ? '' : ' class="none"'}>${CHANNELS[k].name}</li>`).join('')}</ul>
    ${ex}
    <a class="xbox-go" href="#">Explore ${GROUPS[g].name} <span aria-hidden="true">→</span></a>
  </article>`;
};
const xboxes = (t) => `<div class="xboxes">${Object.keys(GROUP_CHANNELS).map((g) => xbox(g, t)).join('')}</div>`;
const exploreBoxes = () => `
  <section class="section" id="explore"><div class="wrap">
    <div class="section-head"><h2>Explore <span class="accent">FuturesHub</span></h2>${ANY_ORDER}</div>
    ${topicTabs('all', 'data-topic')}
    <div id="explore-body">${xboxes('all')}</div>
  </div></section>`;
const explore4 = () => exploreBoxes() + (LP === '8' ? shelf() : calendar());

/* ---------- LP5: LP1 plus the competitor-scan inputs (research/competitors.md); labels toggle from the mockup bar ---------- */
const nextUp = () => { const s = UPCOMING[0]; return `
  <div class="nextup"><div class="wrap"><span>Next live session</span><strong>${s.name}</strong><span>${s.date} · ${s.time}</span><a href="#calendar">See the calendar →</a></div></div>`; };
const WHY = {
  '.nextup': 'Next date up top · Polygence, Inspirit AI',
  '.hero .cta-row': 'No-commitment first step · Polygence, Pioneer, Maven',
  '.hero-free': '“Free” on the first screen · Elements of AI, BlueDot',
  '.hero-meta': 'Name faculty institutions · Inspirit AI · Speak to parents · Brilliant, Polygence',
  '.proof': 'Lead with depth, not headcount · vs Polygence 10,000+, Elements 2M',
  '#que .section-head': 'Live demo high up · no competitor lets you try it (Brilliant, Khanmigo)',
  '.apply-que': 'Apply with Que as a feature · no one else does it',
};

/* ---------- Render and wire up ---------- */

// Existing FuturesHub lines stay marked with [ ] in this file; set to true to show the brackets on the page.
const SHOW_EXISTING = false;
const clean = (html) => SHOW_EXISTING ? html : html.replace(/\[([^\[\]<>]+)\]/g, '$1');

const v = document.body.dataset.variant;
const formatSections = v === 'a' ? [upcoming(), cohorts(), challenges()] : [];
// true = front section only; false = full page (current).
const HERO_ONLY = false;
document.getElementById('app').innerHTML = clean([
  mockbar(v), header(), LP === '5' ? nextUp() : '',
  ...(LP === 'events' ? [eventsPage(), footer(), platformBadge()] : LP === 'evfront' ? [evFrontPage(), footer(), platformBadge()] : LP === 'evsora' ? [evSoraPage(), footer(), platformBadge()] : LP === 'evmonth' ? [evMonthPage(), footer(), platformBadge()] : LP === 'que' ? [quePage(), footer(), platformBadge()] : LP === '8' ? [hero(posterWall()), que(), explore4(), faculty(), testimonials(), closing(), footer(), platformBadge()] : LP === 'ideas' ? [ideasPage(), footer()] : LP === '3' || LP === '6' ? [LP === '3' ? lp3Page() : lp6Page(), footer(), platformBadge()] : Q3 ? [q3Page(), footer(), platformBadge()] : Q2 ? [heroQ2(), why(), bands(), que(), impact(), testimonials(), closing(), footer(), platformBadge()] : [hero('', LP === '2'), ...(HERO_ONLY ? [] : [que(),
    LP === '2' ? bands() : LP === '4' ? explore4() : categories(),
    ...formatSections, faculty(), testimonials(), closing(), footer(), platformBadge()])]),
].join(''));

// Sections alternate plain and tinted, whatever the option, starting with the Que section tinted.
if (!Q3) document.querySelectorAll('#app > section.section:not(.closing)').forEach((sec, i) => sec.classList.toggle('section-alt', i % 2 === 0));

// LP3: the header sits on the sky until you scroll, then turns solid.
if (LP === '3') { const solid = () => document.body.classList.toggle('scrolled', scrollY > 24); solid(); addEventListener('scroll', solid, { passive: true }); }

// Hero fills exactly what is left of the screen below the mockup bar and header, so nothing below peeks in.
const fitHero = () => document.documentElement.style.setProperty('--chrome', `${['.mockbar', '.header', '.nextup'].reduce((h, sel) => h + (document.querySelector(sel)?.offsetHeight || 0), 0)}px`);
fitHero(); addEventListener('resize', fitHero); document.fonts?.ready.then(fitHero);

const menus = [...document.querySelectorAll('.menu')];
const closeMenus = (except) => menus.forEach((m) => { if (m !== except) m.querySelector('button').setAttribute('aria-expanded', 'false'); });
menus.forEach((m) => m.querySelector('button').addEventListener('click', (e) => {
  const b = e.currentTarget, open = b.getAttribute('aria-expanded') !== 'true';
  closeMenus(m); b.setAttribute('aria-expanded', open);
}));
document.addEventListener('click', (e) => { if (!e.target.closest('.menu') || e.target.closest('.menu-panel a')) closeMenus(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenus(); });

document.addEventListener('click', (e) => { // "See all" opens the rest of that list in place
  const more = e.target.closest('.more');
  if (more) { more.closest('article').querySelectorAll('li[hidden]').forEach((li) => { li.hidden = false; }); more.remove(); }
});

const body = document.getElementById('demo-body');
document.querySelectorAll('[data-tab]').forEach((b) => b.addEventListener('click', () => {
  document.querySelectorAll('[data-tab]').forEach((x) => x.setAttribute('aria-selected', x === b));
  body.innerHTML = clean(DEMO[b.dataset.tab]());
}));
body?.addEventListener('click', (e) => {
  const t = e.target.closest('button');
  if (!t) return;
  if (t.dataset.toggle) {
    const on = t.getAttribute('aria-pressed') !== 'true';
    t.setAttribute('aria-pressed', on);
    body.querySelector(`[data-series="${t.dataset.toggle}"]`).style.opacity = on ? 1 : 0;
  } else if (t.dataset.reveal) {
    t.classList.add('open'); t.querySelector('strong').hidden = false;
  } else if (t.id === 'hint') {
    body.querySelector('#hint-text').hidden = false;
  } else if (t.id === 'check') {
    const a = body.querySelector('#answer').value.trim();
    body.querySelector('#feedback').innerHTML = !a ? '<p class="muted">Write an answer first.</p>'
      : FEEDBACK[/search|behaviou?r|news|media|measur/i.test(a) ? 'good' : 'partial'];
  }
});

// B: topic tabs regroup the channels. C: the picker swaps the topic panel.
const explore = document.getElementById('explore-body');
const select = (attr, render) => document.querySelectorAll(`[${attr}]`).forEach((b) => b.addEventListener('click', () => {
  document.querySelectorAll(`[${attr}]`).forEach((x) => x.setAttribute('aria-selected', x === b));
  explore.innerHTML = clean(render(b.getAttribute(attr)));
}));
if (explore && v === 'b') select('data-topic', ['2', '4', '8'].includes(LP) ? xboxes : (k) => groupsHTML(forTopic(k)));

if (LP === '6') lp6Wire();
if (LP === 'que') queWire();
if (LP === 'events' || LP === 'evfront') eventsWire();
if (LP === 'evmonth' || LP === '2') evMonthWire();
if (Q2) {
  if (Q3) q3Wire(); else tabWire();
  const tq = document.getElementById('tq');
  document.querySelectorAll('[data-tq]').forEach((b) => b.addEventListener('click', () => tq.scrollBy({ left: +b.dataset.tq * (tq.firstElementChild.offsetWidth + 16), behavior: 'smooth' })));
  const mq = document.querySelector('.marquee'), pb = document.querySelector('.marquee-pause');
  pb?.addEventListener('click', () => { const on = mq.classList.toggle('is-paused'); pb.setAttribute('aria-pressed', on); pb.textContent = on ? 'Play' : 'Pause'; });
}
if (LP === 'ideas') ideasWire();

const shelfEl = document.querySelector('.shelf');
document.querySelectorAll('[data-shelf]').forEach((b) => b.addEventListener('click', () => shelfEl.scrollBy({ left: b.dataset.shelf * shelfEl.clientWidth * 0.8, behavior: 'smooth' })));

if (LP === '5') {
  Object.entries(WHY).forEach(([sel, why]) => document.querySelector(sel)?.setAttribute('data-why', why));
  const t = document.getElementById('why-toggle'); document.body.classList.add('why-on');
  t.addEventListener('click', () => { const on = document.body.classList.toggle('why-on'); t.setAttribute('aria-pressed', on); t.textContent = `Competitor inputs: ${on ? 'on' : 'off'}`; });
}
if (explore && v === 'c') select('data-pick', topicPanel);

// Que check-in: answer, get feedback on what landed and what is missing, revise.
// When it scrolls into view it plays itself once (types a vague, a closer and a strong answer and checks each), then hands over.
(() => {
  const root = document.getElementById('que-answer'); if (!root) return;
  const $ = (id) => document.getElementById(id);
  const SEARCH = /(what people searched( for)?|search(es|ed|ing)?|queries|query)/gi;
  const DRIFT = /(news( coverage)?|media|worried|panic|attention|behaviou?r|not (actually )?(sick|ill|flu)|weren[’']?t (sick|ill)|proxy|correlat\w*)/gi;
  const steps = [...document.querySelectorAll('#que-steps li')];
  let cur = 0;
  const setStep = (n, done = false) => { cur = n; steps.forEach((li, i) => { li.dataset.state = done || i + 1 < n ? 'done' : i + 1 === n ? 'now' : 'next'; }); const sec = document.getElementById('que'); if (sec) sec.dataset.step = done ? 'done' : n; };
  setStep(Q5 ? 1 : 2);

  $('que-hint').addEventListener('click', () => { $('que-hint-text').hidden = false; });
  document.querySelectorAll('#que [data-toggle]').forEach((t) => t.addEventListener('click', () => {
    const on = t.getAttribute('aria-pressed') !== 'true'; t.setAttribute('aria-pressed', on);
    document.querySelector(`#que [data-series="${t.dataset.toggle}"]`).style.opacity = on ? 1 : 0;
  }));

  const check = () => {
    const raw = $('que-answer').value.trim();
    if (!raw) { $('que-feedback').innerHTML = '<p class="muted">Write an answer first.</p>'; return; }
    const hasS = new RegExp(SEARCH.source, 'i').test(raw), hasD = new RegExp(DRIFT.source, 'i').test(raw), solved = hasS && hasD;
    let verdict, text, missing = '';
    if (solved) { verdict = ['Strong answer', '']; text = 'Yes. It counted searches, and news coverage changed what people searched for without anyone getting sicker.'; }
    else if (hasS) { verdict = ['Keep going', 'verdict-warn']; text = 'Good: it counted searches. But does a search always mean someone is ill? What could make people search without being sick?'; missing = 'Missing: why searches are not the same as illness'; }
    else if (hasD) { verdict = ['Almost', 'verdict-warn']; text = 'Good: you spotted that behaviour and illness came apart. Now say what the system actually counted.'; missing = 'Missing: what the system actually counted'; }
    else { verdict = ['Not yet', 'verdict-warn']; text = 'True, but let’s get specific. What was Google’s system actually counting?'; missing = 'Missing: what the system counted, and why that fell short'; }
    $('que-feedback').innerHTML = `<div class="bubble fb ${solved ? 'win' : ''}"><div class="who">Que <span class="verdict ${verdict[1]}">${verdict[0]}</span>${Q5 ? '<em class="q5-proposed">Proposed: Que doesn’t grade answers yet</em>' : ''}</div>${text}${missing ? `<span class="gap">${missing}</span>` : ''}</div>${solved || playing ? '' : '<p class="muted small">Edit your answer and press Check to revise.</p>'}`;
    if (Q5) { if (solved) setStep(5, true); else setStep(cur === 2 ? 3 : 4); } else setStep(4, solved);
  };
  // The tour: plays once when the panel scrolls into view. Check-ins (types a vague, a closer and a strong answer and checks each),
  // then another explanation, then a hint, then hands the box over. Any click on a tab, button or the box stops it.
  const box = $('que-answer'), auto = $('que-auto'), btn = $('que-check');
  if (!auto) { // LP3 keeps its own panel: sample chips fill the box and check it, no tour
    btn.addEventListener('click', check);
    document.querySelectorAll('[data-sample]').forEach((b) => b.addEventListener('click', () => { box.value = b.dataset.sample; check(); }));
    return;
  }
  const tabs = [...document.querySelectorAll('#que [data-slide]')], panes = [...document.querySelectorAll('#que [data-pane]')];
  const sleep = (ms) => new Promise((ok) => setTimeout(ok, ms));
  let run = 0, playing = false;
  const status = (html) => { auto.innerHTML = html; };
  const show = (k) => {
    tabs.forEach((t) => t.setAttribute('aria-selected', t.dataset.slide === k)); panes.forEach((p) => { p.hidden = p.dataset.pane !== k; });
    $('que-cap').textContent = QUE_SLIDES.find(([x]) => x === k)[2];
  };
  const playBtn = $('q5-play'), playUI = (on) => { if (playBtn) { playBtn.setAttribute('aria-pressed', on); playBtn.textContent = on ? 'Pause demo' : 'Play demo'; } };
  const stop = () => { run++; playing = false; playUI(false); box.classList.remove('is-auto'); tabs.forEach((t) => { t.dataset.state = ''; }); };
  const press = async (b) => { b.classList.add('is-press'); await sleep(180); b.classList.remove('is-press'); };
  const yourTurn = (clear) => {
    stop(); if (clear) { box.value = ''; $('que-feedback').innerHTML = ''; setStep(2); }
    status(`Your turn: write your own answer. <button type="button" data-auto="play">Watch the tour again</button><span class="tries">Or replay an example: ${SAMPLES.map(([l], n) => `<button type="button" class="try" data-try="${n}">▶ ${l.split(' ')[1][0].toUpperCase() + l.split(' ')[1].slice(1)}</button>`).join('')}</span>`);
  };
  const tryOne = async (n, id) => {
    box.value = '';
    const t = SAMPLES[n][1], d = Math.min(28, 900 / t.length); // long answers type faster: ~1s each at most
    for (const ch of t) { if (id !== run) return false; box.value += ch; await sleep(d); }
    await sleep(350); if (id !== run) return false;
    await press(btn); check(); return true;
  };
  const reply = async (el, id, html) => { // Que "typing", then its bubble
    el.insertAdjacentHTML('beforeend', '<div class="bubble typing" aria-hidden="true"><i></i><i></i><i></i></div>'); await sleep(600);
    if (id === run) el.lastElementChild.outerHTML = html;
  };
  const again = async (id) => {
    const t = $('que-again'); t.innerHTML = ''; await press($('que-again-btn'));
    t.innerHTML = '<div class="bubble me"><div class="who">You</div>Can you explain that another way?</div>'; await sleep(500);
    if (id === run) await reply(t, id, '<div class="bubble"><div class="who">Que</div>Imagine counting tissue sales to guess how many people have colds. A news story makes everyone stock up, and your count jumps though nobody got sicker. Searches worked the same way.</div>');
  };
  const hint = async (id) => {
    const t = $('que-hint2'); t.innerHTML = ''; await press($('que-hint-btn'));
    await reply(t, id, '<div class="bubble fb"><div class="who">Que · hint</div>Consider: what did the system actually measure? I won’t give you the answer, but that’s where to look.</div>');
  };
  const tour = async () => {
    stop(); const id = run; playing = true; playUI(true); box.classList.add('is-auto'); $('que-feedback').innerHTML = '';
    if (Q5) { box.value = ''; setStep(1); status('Reading the chapter… <button type="button" data-auto="skip">Skip</button>'); await sleep(1800); if (id !== run) return; }
    const mark = (k, ms) => tabs.forEach((t, i) => { const at = tabs.findIndex((x) => x.dataset.slide === k); t.dataset.state = i < at ? 'done' : i === at ? 'now' : ''; t.style.setProperty('--dur', `${ms}ms`); });
    show('check'); mark('check', 12000);
    for (const [n, [label]] of SAMPLES.entries()) {
      if (Q5) { setStep(n ? 4 : 2); await sleep(700); if (id !== run) return; } // a beat on each step, so it reads
      status(`Example ${n + 1} of 3: ${label.toLowerCase()} <button type="button" data-auto="skip">Skip</button>`);
      if (!await tryOne(n, id)) return; await sleep(n === 2 ? 3000 : 2600); if (id !== run) return;
    }
    if (Q5) { show('check'); yourTurn(true); return; } // Quill 5.0: check-ins only; "Another way" and "Hints" aren't live features (her note, 25 Nov)
    // Quill 3.0: every tab gets the same 12s as the three check-ins (her ask: one standard length)
    show('again'); mark('again', Q3 ? 12000 : 5000); await sleep(400); if (id !== run) return;
    await again(id); await sleep(Q3 ? 10300 : 3200); if (id !== run) return;
    show('hint'); mark('hint', Q3 ? 12000 : 4000); await sleep(400); if (id !== run) return;
    await hint(id); await sleep(Q3 ? 10800 : 2800); if (id !== run) return;
    show('check'); yourTurn(true);
  };
  btn.addEventListener('click', () => { if (playing) yourTurn(false); check(); });
  box.addEventListener('input', () => { if (Q5 && !playing && cur === 3) setStep(4); }); // editing after feedback = revising
  playBtn?.addEventListener('click', () => { if (playing) yourTurn(false); else tour(); });
  box.addEventListener('focus', () => { if (playing) yourTurn(true); });
  auto.addEventListener('click', (e) => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.dataset.auto === 'play') tour(); else if (b.dataset.auto === 'skip') yourTurn(true);
    else if (b.dataset.try) { stop(); const id = run; tryOne(+b.dataset.try, id); }
  });
  tabs.forEach((t) => t.addEventListener('click', () => {
    const k = t.dataset.slide, was = playing; stop(); show(k);
    if (k === 'check') yourTurn(was); else if (k === 'again') again(run); else hint(run);
  }));
  $('que-again-btn')?.addEventListener('click', () => { stop(); again(run); });
  $('que-hint-btn')?.addEventListener('click', () => { stop(); hint(run); });
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) status('<button type="button" data-auto="play">Watch Que in action</button> or write your own answer.');
  else new IntersectionObserver((es, o) => { if (es[0].isIntersecting) { o.disconnect(); tour(); } }, { threshold: 0.5 }).observe(box.closest('.que-panel'));
})();
