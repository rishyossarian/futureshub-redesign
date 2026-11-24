/* Thumbnail ideas 2–8 (idea 1, the poster shelf, is LP7). Loaded before site.js; uses its data and cover helpers at render time. */

const ideaTag = (n, title, why) => `<p class="idea-tag"><b>Idea ${n}</b>${title}<span>${why}</span></p>`;
const art = (a) => posterArt(a);
const sessionsOf = (k) => [...UPCOMING.filter((u) => u.by === k), ...RECORDINGS.filter((r) => r.by.includes(PEOPLE[k].name)), ...COHORTS.filter((c) => c.cover && c.by.includes(k))]
  .map((x) => ({ cover: x.slug || x.cover, title: x.name }));

// Catalogue dates have no year: Jan–Jun belong to 2027, the rest to 2026.
const MON = 'JanFebMarAprMayJunJulAugSepOctNovDec';
const startsAt = ({ date, time }) => {
  const [, d, m] = date.split(' '), [, h, mi, ap] = time.match(/(\d+):(\d+) (AM|PM)/), mo = MON.indexOf(m) / 3;
  return Date.UTC(mo < 6 ? 2027 : 2026, mo, +d, (h % 12) + (ap === 'PM' ? 12 : 0), +mi);
};
const countdown = (t) => { const h = Math.round((t - Date.now()) / 36e5); return h < 24 ? `in ${h} hours` : h < 48 ? 'tomorrow' : `in ${Math.round(h / 24)} days`; };

/* 2: a slow wall of posters behind the hero */
const idea2 = () => `<section class="idea-wall">${posterWall()}
    <div class="wrap wall-text">${ideaTag(2, 'Poster wall behind the hero', 'Says “busy, real place” before anyone reads a word.')}
      <h1>[Human Intelligence,] <span class="accent">[Amplified]</span></h1>
      <p class="lede">AI is reshaping how we work and create. FuturesHub builds the deep judgement and creative confidence that you need to take to shape that transformation.</p>
      <div class="cta-row"><a class="btn btn-primary" href="${PRICING}">Start free</a></div></div>
  </section>`;

/* 7: the next-session strip with its poster and a live countdown */
const idea7 = () => {
  const u = UPCOMING.find((x) => startsAt(x) > Date.now()) || UPCOMING[0];
  return `<section class="idea-sec">${ideaTag(7, 'Next-session strip with its poster', 'One glance: what’s next, who, and how soon.')}
    <div class="nextup2"><img src="${IMG}covers/${u.slug}.jpg" alt="" width="48" height="64">
      <span><span class="nx-when">Next live session · ${countdown(startsAt(u))}</span><strong>${u.name}</strong><span class="nx-meta">${u.date} · ${u.time} · ${PEOPLE[u.by].name}</span></span>
      <a href="#">See the calendar →</a></div></section>`;
};

/* 5: the nav dropdown shows what's next */
const idea5 = () => { const u = UPCOMING[0]; return `<section class="idea-sec">${ideaTag(5, 'Posters in the nav dropdown', 'The menu shows what’s on, not just what exists.')}
  <div class="mega-demo"><div class="mega-bar"><span class="logo"></span><span>Read with Que ▾</span><span class="on">Learn with Others ▴</span><span>Build Something ▾</span></div>
    <div class="mega"><div class="mega-list">${GROUP_CHANNELS.live.map((k) => `<a href="#"><strong>${CHANNELS[k].name}</strong><span>${CHANNELS[k].def}</span></a>`).join('')}<a class="menu-all" href="#">See all →</a></div>
      <a class="mega-next" href="#">${art({ cover: u.slug })}<span><span class="nx-when">Next up</span><strong>${u.name}</strong><span class="muted small">${u.date} · ${u.time}</span></span></a></div></div></section>`; };

/* 3: each faculty member fans out their own sessions */
const idea3 = () => `<section class="idea-sec">${ideaTag(3, 'Faculty fan out their sessions', 'Real people teaching real things. Hover a card.')}
  <div class="fac-fans">${['thomas', 'abhilash'].map((k) => { const p = PEOPLE[k], list = sessionsOf(k); return `
    <a class="fac-fan" href="#"><span class="fan" aria-hidden="true">${list.map((a, i) => `<span style="--i:${i - (list.length - 1) / 2}">${art(a)}</span>`).join('')}</span>
      ${avatar(p, 96)}<strong>${p.name}</strong><span class="muted small">${p.role}</span><span class="fan-count">${list.length} sessions and cohorts →</span></a>`; }).join('')}</div>
  <p class="muted small center">Faculty without sessions yet (office hours only) would show without a fan.</p></section>`;

/* 4: a small deck of covers in each LP4 box (built for real in LP8) */
const idea4 = () => `<section class="idea-sec">${ideaTag(4, 'A deck of covers in each box (LP4)', 'The boxes get weight without more text. Hover a box.')}
  <div class="xboxes">${Object.keys(GROUP_CHANNELS).map((g) => `
    <a class="xbox deck-box x-${g}" href="#">${deck(currentFirst(ITEMS.filter((i) => CHANNELS[i.channel].group === g && i.channel !== 'office')))}
      <h3>${GROUPS[g].title}</h3><p>${GROUPS[g].sub}</p><span class="xbox-go">Explore ${GROUPS[g].name} →</span></a>`).join('')}</div></section>`;

/* 6: posters flip to show the details */
const idea6 = () => `<section class="idea-sec">${ideaTag(6, 'Posters that flip', 'Visual first; details one tap away. Hover or tap a poster.')}
  <div class="flips">${UPCOMING.map((u) => `
    <button type="button" class="flip" aria-pressed="false" aria-label="${u.name}: show details"><span class="flip-in">
      <span class="flip-face">${art({ cover: u.slug })}</span>
      <span class="flip-face flip-back"><span class="nx-when">Live session · ${u.length}</span><strong>${u.name}</strong>
        <span>${PEOPLE[u.by].name}</span><span>${u.date}${u.also ? ` (${u.also})` : ''} · ${u.time}</span>
        <span class="muted small">${CHANNELS.live.def}</span><span class="chip chip-lock">${CHANNELS.live.price}</span></span>
    </span></button>`).join('')}</div></section>`;

/* 8: covers for everything that has none, in the same series */
const idea8 = () => `<section class="idea-sec">${ideaTag(8, 'Covers for everything', 'QueBooks, cases, briefs and challenges join the series, so every idea above works everywhere.')}
  ${['quebook', 'case', 'brief', 'challenge'].map((k) => `<h3 class="series-h">${SERIES[k].kind}</h3>
  <div class="series">${ITEMS.filter((i) => i.channel === k).map((i) => art(artFor(i))).join('')}</div>`).join('')}</section>`;

const ideasPage = () => [idea2(), idea7(), idea5(), idea3(), idea4(), idea6(), idea8()].join('');
const ideasWire = () => document.querySelectorAll('.flip').forEach((b) => b.addEventListener('click', () => b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true')));
