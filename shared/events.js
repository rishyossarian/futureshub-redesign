/* Events calendar mockups, after schoolofattention.org/events (her ask, 20 Nov 2026): big pictures with a date chip, plus a month grid
   that is interactive. Two pages share the pieces: events.html (full page, LP "events") and events-front.html (the trimmed version that
   would replace the front-page calendar, LP "evfront"). Loaded before site.js, which calls eventsPage()/evFrontPage() and eventsWire().
   Only dated live sessions go in the grid; cohorts and challenges without dates sit in "Dates to come". Times are UTC, as on FuturesHub. */

const EV_MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const EV_WD = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const EV_TODAY = '2026-11-20';

// Real photos from equitechfutures.com/newsroom and Equitech Futures' LinkedIn page (Rhodes Forum photos), downloaded 20 Nov 2026; local mockup only, check rights before publishing.
// Matched by theme, not by session: none is from these exact sessions. Anything without one falls back to its FuturesHub cover (Present like a Pro on Zoom uses its cover, which shows its presenter, Thomas Murray).
const EV_PHOTO = { 'writing-without-the-llm': 'writing', 'the-jagged-frontier-ai-adoption-and-its-challenges': 'forum-ai', 'interviewing-effectively': 'handshake' };
const evImg = (slug) => EV_PHOTO[slug] ? `${IMG}events/${EV_PHOTO[slug]}.jpg` : `${IMG}covers/${slug}.jpg`;

// The Admit Track has no session dates: it is open enrolment until March 2027, so it appears as an "Open now" item, never on a day.
const ADMIT = () => COHORTS.find((c) => c.name.startsWith('The Admit Track'));
const evAdmitCard = () => { const a = ADMIT();
  return `<a class="ev-card" data-open href="#"><span class="ev-pic"><img src="${IMG}covers/${a.cover}.jpg" alt=""><span class="ev-chip ev-chip-open"><small>Open</small><b>Now</b></span></span>
    <span class="ev-text"><strong>${a.name}</strong><span class="ev-meta">Cohort · online · 15 Sep 2026 to 15 Mar 2027 · join any time · Learner+</span>
      <span class="ev-by">${a.by.map((k) => avatar(PEOPLE[k], 28)).join('')}<span>${a.by.map((k) => PEOPLE[k].name).join(' and ')}</span></span>
      <span class="ev-go">View the cohort <span aria-hidden="true">→</span></span></span></a>`; };
const evAdmitBand = () => { const a = ADMIT();
  if (document.body.dataset.q5) return `<a class="evm-band" href="#"><img src="${IMG}covers/${a.cover}.jpg" alt=""><span><span><b>Open now</b><strong>${a.name}</strong></span><em>Cohort · online · join any time until March 2027 · Learner+</em></span><span class="evm-band-go">View the cohort <span aria-hidden="true">→</span></span></a>`; // Quill 5.0: picture, name, one short line (her note, 25 Nov: between the full band and one bare line)
  return `<a class="evm-band" href="#"><img src="${IMG}covers/${a.cover}.jpg" alt=""><span><b>Open now</b><strong>${a.name}</strong><span>Online · 15 Sep 2026 to 15 Mar 2027 · join any time · Learner+ · biweekly workshops, weekly office hours, live mock interviews</span></span><span class="evm-band-go">View the cohort <span aria-hidden="true">→</span></span></a>`; };

// 'Mon 23 Nov' -> '2026-11-23' (the data has no year: Nov and Dec are 2026, Jan is 2027)
const evIso = (s) => {
  const [, d, m] = s.split(' '), mi = EV_MONTHS.findIndex((x) => x.startsWith(m));
  return `${mi === 0 ? 2027 : 2026}-${String(mi + 1).padStart(2, '0')}-${d.padStart(2, '0')}`;
};
const EVENTS = () => UPCOMING.flatMap((u) => [u.date, ...(u.also ? [u.also.replace('also ', '')] : [])].map((d) => ({ ...u, iso: evIso(d) })))
  .sort((a, z) => a.iso.localeCompare(z.iso));

const evChip = (iso) => { const d = new Date(iso + 'T12:00'); return `<span class="ev-chip"><small>${EV_MONTHS[d.getMonth()].slice(0, 3)}</small><b>${d.getDate()}</b></span>`; };

// One event: a picture with the date chip on it, then title and details. The whole card is the link.
const evCard = (e, compact = false) => {
  const d = new Date(e.iso + 'T12:00'), p = PEOPLE[e.by];
  return `<a class="ev-card${compact ? ' is-compact' : ''}" href="#" data-iso="${e.iso}">
    <span class="ev-pic"><img src="${evImg(e.slug)}" alt="" loading="lazy">${evChip(e.iso)}</span>
    <span class="ev-text"><strong>${e.name}</strong>
      <span class="ev-meta">${EV_WD[(d.getDay() + 6) % 7]} ${d.getDate()} ${EV_MONTHS[d.getMonth()]} · ${e.time} · ${e.length}</span>
      <span class="ev-by">${avatar(p, 28)}<span>${p.name} · Live online</span></span>
      <span class="ev-go">View session <span aria-hidden="true">→</span></span></span></a>`;
};

// Month grid, Monday first. Days with a session are filled and clickable; no dots.
const evGrid = (y, m, events) => {
  const first = new Date(y, m, 1), lead = (first.getDay() + 6) % 7, days = new Date(y, m + 1, 0).getDate();
  const has = new Set(events.map((e) => e.iso));
  const cells = [...Array(lead).fill('<span></span>'), ...Array.from({ length: days }, (_, i) => {
    const iso = `${y}-${String(m + 1).padStart(2, '0')}-${String(i + 1).padStart(2, '0')}`;
    return has.has(iso) ? `<button type="button" class="ev-day has" data-iso="${iso}" aria-label="${i + 1} ${EV_MONTHS[m]}: sessions">${i + 1}</button>`
      : `<span class="ev-day${iso === EV_TODAY ? ' today' : ''}">${i + 1}</span>`;
  })];
  return `<div class="ev-grid" data-y="${y}" data-m="${m}">
    <div class="ev-grid-head"><button type="button" class="ev-nav" data-dir="-1" aria-label="Previous month">←</button>
      <strong>${EV_MONTHS[m]} ${y}</strong><button type="button" class="ev-nav" data-dir="1" aria-label="Next month">→</button></div>
    <div class="ev-wd">${EV_WD.map((w) => `<span>${w[0]}</span>`).join('')}</div>
    <div class="ev-days">${cells.join('')}</div>
    <p class="ev-hint">Pick a highlighted date to see its session.</p></div>`;
};

const evToCome = () => `
  <div class="ev-soon"><h3>Open now and dates to come</h3><ul>
    <li><strong>The Admit Track: Graduate Admissions</strong><span>Cohort · join any time until March 2027</span></li>
    <li><strong>AI for Science Summer School</strong><span>Cohort · next run ${TBC}</span></li>
    <li><strong>Rise Innovation Challenge</strong><span>Challenge · by invitation · date ${TBC}</span></li></ul></div>`;

// 1. Full events page
const eventsPage = () => {
  const ev = EVENTS();
  return `
  <section class="section ev-page" id="events"><div class="wrap">
    <div class="section-head"><h1>Events <span class="accent">calendar</span></h1>
      <p class="lede">Live sessions with Equitech Futures faculty. Times are UTC.</p></div>
    <div class="ev-layout">
      <aside class="ev-side">${evGrid(2026, 10, ev)}${evToCome()}</aside>
      <div class="ev-list" id="ev-list" aria-live="polite">
        ${evAdmitCard()}
        <p class="ev-filter" id="ev-filter" hidden><span></span><button type="button" id="ev-clear">Show all</button></p>
        ${ev.map((e) => evCard(e)).join('')}
      </div>
    </div>
  </div></section>`;
};

// 2. The trimmed version for the front page: grid on the left, next three sessions on the right
const evFrontPage = () => {
  const ev = EVENTS();
  return `
  <section class="section ev-page ev-front" id="calendar"><div class="wrap">
    <div class="section-head"><h2>On the <span class="accent">calendar</span></h2>
      <p class="lede">Live sessions with Equitech Futures faculty. Read with Que has no dates: start any time.</p></div>
    <div class="ev-layout">
      <aside class="ev-side">${evGrid(2026, 10, ev)}</aside>
      <div class="ev-list" id="ev-list" aria-live="polite">
        ${evAdmitCard().replace('class="ev-card"', 'class="ev-card is-compact"')}
        <p class="ev-filter" id="ev-filter" hidden><span></span><button type="button" id="ev-clear">Show next</button></p>
        ${ev.slice(0, 3).map((e) => evCard(e, true)).join('')}
        <a class="ev-all" href="events.html">See the full calendar <span aria-hidden="true">→</span></a>
      </div>
    </div>
  </div></section>`;
};

const eventsWire = () => {
  const root = document.querySelector('.ev-page'), list = root.querySelector('#ev-list'), filter = root.querySelector('#ev-filter');
  const ev = EVENTS(), front = root.classList.contains('ev-front');
  let sel = null;
  const render = () => {
    const shown = sel ? ev.filter((e) => e.iso === sel) : front ? ev.slice(0, 3) : ev;
    list.querySelectorAll('.ev-card:not([data-open])').forEach((c) => c.remove());
    list.querySelector('.ev-all')?.toggleAttribute('hidden', !!sel);
    filter.hidden = !sel;
    if (sel) { const d = new Date(sel + 'T12:00'); filter.firstElementChild.textContent = `${d.getDate()} ${EV_MONTHS[d.getMonth()]}`; }
    filter.insertAdjacentHTML('afterend', shown.map((e) => evCard(e, front)).join(''));
    list.querySelector('[data-open]').toggleAttribute('hidden', !!sel);
    root.querySelectorAll('.ev-day.has').forEach((b) => b.classList.toggle('on', b.dataset.iso === sel));
  };
  const month = (dir) => {
    const g = root.querySelector('.ev-grid'); let y = +g.dataset.y, m = +g.dataset.m + dir;
    if (m < 0) { m = 11; y--; } if (m > 11) { m = 0; y++; }
    g.outerHTML = evGrid(y, m, ev); render();
  };
  root.addEventListener('click', (e) => {
    const day = e.target.closest('.ev-day.has'), nav = e.target.closest('.ev-nav');
    if (day) { sel = sel === day.dataset.iso ? null : day.dataset.iso; render(); }
    else if (nav) month(+nav.dataset.dir);
    else if (e.target.closest('#ev-clear')) { sel = null; render(); }
    else if (e.target.closest('.ev-card')) e.preventDefault();
  });
  // hovering a card lights its date in the grid
  list.addEventListener('mouseover', (e) => { const c = e.target.closest('.ev-card'); root.querySelectorAll('.ev-day.has').forEach((b) => b.classList.toggle('hot', !!c && b.dataset.iso === c.dataset.iso)); });
  list.addEventListener('mouseleave', () => root.querySelectorAll('.ev-day.hot').forEach((b) => b.classList.remove('hot')));
};

// 3. Straight list in the School of Radical Attention format: picture left with the date chip, then title, time range, place and a button.
const evRange = (t, len) => {
  const m = t.match(/^(\d+):(\d+) (AM|PM) UTC$/); let h = +m[1] % 12 + (m[3] === 'PM' ? 12 : 0), mi = +m[2] + parseInt(len, 10);
  h += Math.floor(mi / 60); mi %= 60;
  return `${t.replace(' UTC', '')} – ${(h % 12) || 12}:${String(mi).padStart(2, '0')} ${h % 24 >= 12 ? 'PM' : 'AM'} UTC`;
};
const evSoraPage = () => `
  <section class="section ev-page ev-sora" id="events"><div class="wrap">
    <div class="section-head"><h1>Events <span class="accent">calendar</span></h1></div>
    <div class="ev-rows">
      <article class="ev-row"><a class="ev-pic" href="#" tabindex="-1" aria-hidden="true"><img src="${IMG}covers/${ADMIT().cover}.jpg" alt=""><span class="ev-chip ev-chip-open"><small>Open</small><b>Now</b></span></a>
        <div class="ev-rtext"><h2>${ADMIT().name}</h2><p>Cohort · online · 15 Sep 2026 to 15 Mar 2027 · join any time · Learner+</p><p>With ${ADMIT().by.map((k) => PEOPLE[k].name).join(' and ')}</p>
          <a class="btn btn-primary" href="#">View the cohort <span aria-hidden="true">→</span></a></div></article>${EVENTS().map((e) => `
      <article class="ev-row"><a class="ev-pic" href="#" tabindex="-1" aria-hidden="true"><img src="${evImg(e.slug)}" alt="" loading="lazy">${evChip(e.iso)}</a>
        <div class="ev-rtext"><h2>${e.name}</h2>
          <p>${evRange(e.time, e.length)}</p><p>Live online with ${PEOPLE[e.by].name}</p>
          <a class="btn btn-primary" href="#">View Event <span aria-hidden="true">→</span></a></div></article>`).join('')}
    </div>
  </div></section>`;

// 4. Full month grid in the School of Radical Attention's calendar format: days with a session are filled with a picture, click a day to open
// its details over the neighbouring cells. Phones get the month's sessions as a list instead (seven columns is too narrow).
const evMonthCells = (y, m, ev) => {
  const first = new Date(y, m, 1), lead = (first.getDay() + 6) % 7, days = new Date(y, m + 1, 0).getDate();
  const total = Math.ceil((lead + days) / 7) * 7, pre = `${y}-${String(m + 1).padStart(2, '0')}-`;
  const busy = (r) => ev.some((e) => { const n = +e.iso.slice(8) + lead - 1; return e.iso.startsWith(pre) && Math.floor(n / 7) === r; });
  const rows = Array.from({ length: total / 7 }, (_, r) => (busy(r) ? 'busy' : 'quiet'));
  const cells = Array.from({ length: total }, (_, k) => {
    const n = k - lead + 1, quiet = rows[Math.floor(k / 7)] === 'quiet';
    if (n < 1 || n > days) return `<span class="evm-cell is-out${quiet ? ' q' : ''}">${document.body.dataset.q5 ? `<i>${n < 1 ? new Date(y, m, 0).getDate() + n : n - days}</i>` : ''}</span>`; // Quill 5.0: the neighbouring month's dates, faint, not blank boxes
    const iso = `${pre}${String(n).padStart(2, '0')}`, day = ev.filter((e) => e.iso === iso);
    if (!day.length) return `<span class="evm-cell${quiet ? ' q' : ''}${iso === EV_TODAY ? ' is-today' : ''}"><i>${n}</i></span>`;
    const e = day[0];
    return `<button type="button" class="evm-cell has" data-iso="${iso}"><img src="${evImg(e.slug)}" alt=""><i>${n}</i><span class="evm-label"><b>${e.time.replace(' UTC', '')}</b>${e.name}</span></button>`;
  }).join('');
  return { cells, rows: rows.map((r) => (r === 'busy' ? '170px' : document.body.dataset.q5 ? '76px' : '46px')).join(' ') }; // Quill 5.0: quiet weeks shorter but still read as weeks
};
const evMonthHead = (y, m, nav = true) => `<div class="evm-head">${nav ? '<button type="button" class="ev-nav" data-dir="-1" aria-label="Previous month">←</button>' : ''}
  <h2>${EV_MONTHS[m]} ${y}</h2>${nav ? '<button type="button" class="ev-nav" data-dir="1" aria-label="Next month">→</button>' : ''}</div>`;
// front = the version at the bottom of LP2 (Quill): h2, no "No date needed" strip
const evMonthPage = (front = false) => `
  <section class="section ev-page evm" id="${front ? 'calendar' : 'events'}"><div class="wrap evm-wrap">
    <div class="section-head">${front ? '<h2>Events <span class="accent">calendar</span></h2>' : '<h1>Events <span class="accent">calendar</span></h1>'}</div>
    <div id="evm-head"></div>
    <div id="evm-band"></div>
    <div class="evm-wd">${EV_WD.map((w) => `<span>${w}</span>`).join('')}</div>
    <div class="evm-grid" id="evm-grid"></div>
    <div class="ev-list evm-list" id="evm-list"></div>
    ${front ? '' : `<div class="evm-open"><h3>No date needed</h3><div class="evm-open-row">${[
      ['quebook', 'Read with Que', 'Start any time. QueBooks, case studies and QueBriefs.'],
      ['cohort', 'AI for Science Summer School', `Cohort · next run ${TBC}`],
      ['challenge', 'Rise Innovation Challenge', `Challenge · by invitation · date ${TBC}`]].map(([ch, name, line]) => `
      <a class="evm-open-card" href="#">${ch === 'quebook' ? `<span class="evm-que"><img src="${IMG}que/que-asking-light.svg" alt=""></span>` : posterArt(artFor({ channel: ch, name }))}<span><strong>${name}</strong><span>${line}</span></span></a>`).join('')}</div></div>`}
  </div></section>`;

const evMonthWire = () => {
  const ev = EVENTS(); let y = 2026, m = 11; // opens on December, where the sessions are
  const head = document.getElementById('evm-head'), grid = document.getElementById('evm-grid'), list = document.getElementById('evm-list');
  const inRange = () => y * 12 + m <= 2027 * 12 + 2; // the Admit Track is open until March 2027
  const draw = () => {
    const g = evMonthCells(y, m, ev); head.innerHTML = evMonthHead(y, m); grid.innerHTML = g.cells; grid.style.gridTemplateRows = g.rows; grid.classList.remove('is-open');
    document.getElementById('evm-band').innerHTML = inRange() ? evAdmitBand() : '';
    const inMonth = ev.filter((e) => e.iso.startsWith(`${y}-${String(m + 1).padStart(2, '0')}`));
    list.innerHTML = (inRange() ? evAdmitCard() : '') + (inMonth.length ? inMonth.map((e) => evCard(e)).join('') : '<p class="muted">No sessions this month.</p>');
  };
  // The clicked day grows out of its own cell into a panel (picture left, details right) while the rest of the grid dims.
  const rectOf = (el) => { const g = grid.getBoundingClientRect(), r = el.getBoundingClientRect(); return { left: r.left - g.left, top: r.top - g.top, width: r.width, height: r.height }; };
  const place = (el, r) => Object.entries(r).forEach(([k, v]) => { el.style[k] = `${v}px`; });
  const close = () => {
    const pan = grid.querySelector('.evm-panel'); if (!pan) return;
    const cell = grid.querySelector('.evm-cell.on'); grid.classList.remove('is-open'); pan.classList.remove('is-in');
    if (cell) place(pan, rectOf(cell));
    setTimeout(() => { pan.remove(); cell?.classList.remove('on'); }, 320);
  };
  const open = (cell) => {
    const e = ev.find((x) => x.iso === cell.dataset.iso), p = PEOPLE[e.by], c = rectOf(cell), gw = grid.getBoundingClientRect().width;
    const w = Math.min(c.width * 3 + 8, gw), left = Math.max(0, Math.min(c.left, gw - w));
    const pan = document.createElement('div'); pan.className = 'evm-panel';
    pan.innerHTML = `<img src="${evImg(e.slug)}" alt=""><div class="evm-info"><button type="button" class="evm-x" aria-label="Close">×</button>
      <h3><a href="#">${e.name} →</a></h3><p class="evm-time">${evRange(e.time, e.length)}</p>
      <p class="evm-by">${avatar(p, 32)}<span>${p.name} · Live online · ${e.length}</span></p>
      <a class="btn btn-primary btn-small" href="#">View session <span aria-hidden="true">→</span></a></div>`;
    place(pan, c); grid.append(pan); cell.classList.add('on'); grid.classList.add('is-open');
    requestAnimationFrame(() => requestAnimationFrame(() => { place(pan, { left, top: c.top, width: w, height: Math.max(c.height, 340) }); pan.classList.add('is-in'); }));
  };
  document.addEventListener('click', (e) => {
    const nav = e.target.closest('#evm-head .ev-nav'), cell = e.target.closest('.evm-cell.has');
    if (nav) { m += +nav.dataset.dir; if (m < 0) { m = 11; y--; } if (m > 11) { m = 0; y++; } draw(); return; }
    if (e.target.closest('.evm-x')) { close(); return; }
    if (e.target.closest('.evm-panel')) return;
    const was = cell && cell.classList.contains('on');
    if (grid.querySelector('.evm-panel')) close();
    if (cell && !was) setTimeout(() => open(cell), grid.querySelector('.evm-panel') ? 330 : 0);
    else if (e.target.closest('.ev-card')) e.preventDefault();
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
  draw();
};

// LP2 (Quill) Live sessions band: only what the calendar below does not already show (no repeats): the January session
// and a free recording. Two items, to match Cohorts.
const evNext = () => `<div class="ev-list ev-next">${EVENTS().filter((e) => e.iso >= '2027-01-01').slice(0, 1).map((e) => { const d = new Date(e.iso + 'T12:00');
  return `<a class="ev-card is-compact" href="#"><span class="ev-pic"><img src="${evImg(e.slug)}" alt=""></span>
    <span class="ev-text"><strong>${e.name}</strong><span class="ev-when">${EV_WD[(d.getDay() + 6) % 7]} ${d.getDate()} ${EV_MONTHS[d.getMonth()].slice(0, 3)}</span></span></a>`; }).join('')}
  <a class="ev-card is-compact" href="#"><span class="ev-pic"><img src="${IMG}covers/the-environmental-costs-of-building-ai.jpg" alt=""></span>
    <span class="ev-text"><strong>The Environmental Costs of Building AI</strong><span class="ev-when">Free recording</span></span></a></div>`;
