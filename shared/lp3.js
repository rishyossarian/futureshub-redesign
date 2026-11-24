/* FuturesHub LP3: Cluely-inspired layout (cluely.com), FuturesHub colours, fonts and content.
   Loaded before site.js; site.js calls lp3Page() at render time, so the helpers it uses (header, icon, MOCKS, CALENDAR...) exist by then. */

const pill = (ic, word) => `<span class="pill-word">${ic}${word}</span>`;
const SPARK = '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8z"/></svg>';
const SWAP = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 8h14l-3-3M20 16H6l3 3"/></svg>';

const RIDGES = `<svg class="l3-ridges" viewBox="0 0 1440 260" preserveAspectRatio="none" aria-hidden="true">
  <path fill="#bfe0f5" d="M0 190 L140 120 L230 160 L360 70 L470 150 L560 110 L700 170 L820 100 L940 160 L1060 90 L1180 150 L1300 110 L1440 160 V260 H0z"/>
  <path fill="#8cc6ec" opacity=".8" d="M0 220 L180 150 L300 200 L420 130 L560 210 L700 160 L860 215 L1000 150 L1150 205 L1300 160 L1440 210 V260 H0z"/>
  <path fill="#eaf4fb" d="M0 245 L240 205 L520 240 L800 210 L1100 245 L1440 215 V260 H0z"/>
</svg>`;

const l3Hero = () => `
  <section class="l3-hero" id="top">
    <div class="wrap l3-hero-text">
      <h1>[Human Intelligence,]<br>[Amplified]</h1>
      <span class="l3-rule" aria-hidden="true"></span>
      <p>AI is reshaping how we work and create. FuturesHub builds the deep judgement and creative confidence that you need to take to shape that transformation.</p>
      <a class="btn l3-glow" href="${PRICING}">Start free</a>
    </div>
    ${RIDGES}
    <div class="wrap"><div class="l3-screen">
      <div class="l3-bar"><span class="qlogo" aria-hidden="true">Q</span><span class="l3-bar-btn">⌄ Hide</span><span class="l3-bar-stop" aria-hidden="true"></span></div>
      <div class="l3-window">
        <div class="l3-dots" aria-hidden="true"><i></i><i></i><i></i><span>[Foundations of Data Driven Thinking] · [Chapter 1]</span></div>
        <div class="l3-page">
          <p>[In 2008, Google announced something extraordinary. Their engineers had built a system that could predict flu outbreaks faster than the Centers for Disease Control — sometimes weeks faster.]</p>
          <p>[The system, called Google Flu Trends, worked by tracking what people searched for.]</p>
        </div>
        <div class="l3-que">
          <div class="l3-que-actions">${[[SPARK, 'Check-in'], [SWAP, 'Explain another way'], ['?', 'Hint'], ['↻', 'Recap']].map(([i, l]) => `<span>${i} ${l}</span>`).join('<b aria-hidden="true">·</b>')}</div>
          <div class="l3-que-input"><span>Ask Que about this page, or</span><kbd>⌘</kbd><kbd>↵</kbd><span>for a check-in</span><span class="l3-send" aria-hidden="true">▶</span></div>
        </div>
      </div>
    </div></div>
  </section>`;

const l3Helps = () => `
  <section class="l3-sec" id="que"><div class="wrap">
    <h2 class="l3-h2">How Que helps <span>while you read</span></h2>
    <div class="l3-two">
      <article class="l3-card l3-card-blue">
        <h3>Que ${pill(SWAP, 'explains')} it another way</h3>
        <p>When a passage doesn’t land, ask. Que rewrites it with a fresh example, inside the chapter.</p>
        <div class="l3-glass">
          <div class="bubble me"><div class="who">You</div>Can you explain that another way?</div>
          <div class="bubble"><div class="who">Que</div>Imagine guessing how many people have colds by counting tissue sales. If a news story makes everyone stock up on tissues, your count jumps even though nobody got sicker. Searches worked the same way.</div>
        </div>
      </article>
      <article class="l3-card l3-card-light">
        <h3>Que ${pill(SPARK, 'checks')} what you’ve understood</h3>
        <p>Answer in your own words. Que shows what landed and what’s missing, and you revise until it holds up. Try it.</p>
        <aside class="que-panel l3-panel" aria-label="Que check-in">
          <div class="qhead"><span class="qlogo" aria-hidden="true">Q</span><strong>Que</strong><span class="qtag">Check-in</span>
            <span class="qtries" id="que-tries" aria-label="Attempts">${'<i></i>'.repeat(5)}</span></div>
          <div class="bubble"><div class="who">Que</div>[In your own words, why did Google Flu Trends fail?]</div>
          <div id="que-thread"></div>
          <label class="sr" for="que-answer">Your answer</label>
          <textarea id="que-answer" rows="2" placeholder="Write your answer, or pick a sample."></textarea>
          <div class="chips" role="group" aria-label="Sample answers">${SAMPLES.map(([l, t]) => `<button type="button" class="chipbtn" data-sample="${t}">${l}</button>`).join('')}</div>
          <div class="cta-row"><button type="button" class="btn btn-ghost btn-small" id="que-hint">Hint</button><button type="button" class="btn btn-check btn-small" id="que-check">Check →</button></div>
          <p id="que-hint-text" class="muted" hidden>Consider: what did the system actually measure?</p>
          <div id="que-feedback" aria-live="polite"></div>
        </aside>
      </article>
    </div>
  </div></section>`;

const L3_WAYS = [
  ['read', 'Read with Que.', 'QueBooks, case studies and QueBriefs, at your own pace.', ['quebook', 'case', 'brief'], () => MOCKS.quebook()],
  ['live', 'Learn with others.', 'Live sessions, cohorts and 1:1 office hours with Equitech Futures faculty.', ['live', 'cohort', 'office'], () => MOCKS.live()],
  ['build', 'Build something.', 'Challenges with scholarships, funding and awards. Apply with Que, not a CV.', ['challenge'], () => MOCKS.challenge()],
];
const l3Ways = () => `
  <section class="l3-sec"><div class="wrap">
    <div class="l3-center"><h2 class="l3-h2">Three ways <span>to learn</span></h2><p class="l3-sub">${ANY_ORDER_TEXT}</p></div>
    <div class="l3-three">${L3_WAYS.map(([g, lead, rest, ks, ui]) => `
      <article class="l3-way" id="group-${g}">
        <div class="l3-tile">${ui()}</div>
        <p><strong>${lead}</strong> <span>${rest}</span></p>
        <div class="l3-links">${ks.map((k) => `<a id="ch-${k}" href="#">${CHANNELS[k].name} <span aria-hidden="true">→</span></a>`).join('')}</div>
      </article>`).join('')}</div>
    <div class="l3-logos"><span class="l3-cap">Faculty drawn from</span>${['Caltech', 'Oxford', 'UChicago'].map((u) => `<span class="l3-uni">${u}</span>`).join('')}</div>
  </div></section>`;

const l3Calendar = () => `
  <section class="l3-sec" id="calendar"><div class="wrap">
    <div class="l3-center"><h2 class="l3-h2">On the <span>calendar</span></h2><p class="l3-sub">Everything with a date, from all three. Read with Que has no dates: start any time.</p></div>
    <div class="l3-panel-big"><div class="l3-doc">
      <div class="l3-dots" aria-hidden="true"><i></i><i></i><i></i></div>
      ${CALENDAR.map((c) => `<div class="l3-cal-row g-${c.g}">${calDate(c.when)}<span><strong>${c.title}</strong><span class="muted small">${c.meta}</span></span><span class="cal-key g-${c.g}">${GROUPS[c.g].name}</span></div>`).join('')}
    </div></div>
  </div></section>`;

const L3_STATS = [['300+', 'Alumni', 'People who have come through Equitech Futures programmes.'], ['70+', 'Countries', 'Where Equitech Futures learners come from.'], ['15', 'Alumni-led ventures', 'Started by people from the programmes.'], ['$2M', 'In scholarships', 'Awarded through Equitech Futures.']];
const l3Numbers = () => `
  <section class="l3-sec" id="faculty"><div class="wrap l3-stats">
    <div class="l3-tile l3-faculty"><div class="l3-doc">
      <span class="muted small">Your faculty</span>
      ${['abhilash', 'thomas', 'nikita', 'azania', 'amy'].map((k) => { const p = PEOPLE[k]; return `<div class="l3-person">${avatar(p, 44)}<span><strong>${p.name}</strong><span class="muted small">${p.role}</span></span></div>`; }).join('')}
    </div></div>
    <div>
      <h2 class="l3-h2">Equitech Futures <span>in numbers</span></h2>
      <dl class="l3-nums">${L3_STATS.map(([n, t, d]) => `<div><dt>${n}</dt><dd><strong>${t}</strong><span>${d}</span></dd></div>`).join('')}</dl>
      <p class="muted small">Equitech Futures figures, the team behind FuturesHub.</p>
    </div>
  </div></section>`;

const l3Closing = () => `
  <section class="l3-close"><div class="wrap">
    <div>
      <h2>[Helping the Next Generation of Innovators]<br><span>[Build the Future.]</span></h2>
      <div class="cta-row"><a class="btn l3-glow" href="${PRICING}">[Start Learning] →</a><a class="btn btn-ghost" href="mailto:info@equitechfutures.com">[Contact Us]</a></div>
    </div>
    <div class="l3-keys" aria-hidden="true"><span class="l3-key k1">↵</span><span class="l3-key k2">Q</span></div>
  </div></section>`;

const lp3Page = () => [l3Hero(), l3Helps(), l3Ways(), l3Calendar(), l3Numbers(), l3Closing()].join('');
