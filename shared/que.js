/* FuturesHub "Read with Que" page: where the Read with Que menu leads.
   Formats taken from quill.org/tools/evidence (Rishita's likes, 19 Nov 2026), not copied: what the tool does and
   what the tool does up front with the product on a big laptop below it, a 1st / 2nd / 3rd attempt walkthrough
   (Proposed: Que doesn't grade yet), and topic cards with "Try a sample" + "See all". "Meet Que" rows follow
   brilliant.org (her likes) and show only Que's four live capabilities.
   Brief: [What Happens When AI Trains on AI-Generated Data?] by Abhilash Mishra, July 2026 (futureshub.com/explore/172).
   Brief text and the For the Student box are from the live page. The check-in walkthrough (kept short on purpose),
   the explain-another-way reply, the perspectives (the live ones didn't load) and the three claims are Claude's
   drafts, marked Illustrative. Loaded before site.js; site.js calls quePage() at render time and queWire() after. */

const BRIEF = {
  title: '[What Happens When AI Trains on AI-Generated Data?]',
  by: '[Abhilash Mishra]', date: '[July 2026]', checkins: 8,
  lede: '[Large language models are trained on text scraped from the internet. Increasingly, the text on the internet is written by large language models.]',
  student: '[The analogy to photocopying a photocopy is not quite right, because a photocopier introduces random noise uniformly. Model collapse is more like a selective filter: it preserves the high-probability center of the distribution and systematically removes the periphery. Each generation is not noisier but narrower. The loss is not fidelity but diversity.]',
  pull: '[“The tails of the distribution disappear first. And the tails are where the interesting things live.”]',
  question: 'Why does training on AI-made text make models narrower, not noisier?',
};

const illus = '<span class="q-illus">Illustrative</span>';

// The check-in walkthrough: what the learner wrote, what Que said, and what Que was doing (Quill's "1st Attempt" format).
const ATTEMPTS = [
  { label: '1st attempt', answer: 'Because AI text has mistakes in it.', verdict: ['Not yet', 'verdict-warn'],
    reply: 'Mistakes add noise, not narrowness. What disappears each time?',
    gap: 'Missing: what gets lost', why: 'Que points to what doesn’t fit, without giving the answer.' },
  { label: '2nd attempt', answer: 'Rare words and ideas get lost.', verdict: ['Almost', 'verdict-warn'],
    reply: 'Yes, the rare things go first. Why are they the ones that go?',
    gap: 'Missing: why rare things vanish', why: 'Que builds on what’s right and asks for one more step.' },
  { label: '3rd attempt', answer: 'Models rarely produce rare things, so each new model sees fewer of them.', verdict: ['Strong answer', ''],
    reply: 'Exactly. The common middle survives and the edges fade.',
    gap: '', why: 'Que says why it works, and the check-in is done.' },
];

// Live brief's perspective quotes didn't render; these paraphrase the brief. Labelled by stakeholder (her note), not by field.
const WHO_ICON = ['🔬', '📚', '🏛️', '🛠️', '📰', '⚖️'];
const PERSPECTIVES = [
  ['AI researchers', 'Collapse is the worst case: every generation trained only on the last. Mix in even 20–30% real data and the loop holds. The question is the ratio, not whether synthetic data is used at all.'],
  ['Archivists & librarians', 'The real loss is provenance. Once we can’t say where a text came from, every archive built after 2023 becomes harder to trust.'],
  ['Publishers & universities', 'If verified human text becomes scarce, it becomes an asset. Whoever holds the largest clean corpora, from publishers to universities, gains leverage over AI.'],
  ['Open-source model builders', 'This hits open-source models hardest. Companies with licensing deals can buy quality human text; community models built on Common Crawl are left with the synthetic web.'],
  ['Journalists & fact-checkers', 'Synthetic text is already hard to spot. As more of the web is machine-written, checking where a claim came from gets slower and more expensive.'],
  ['Policymakers & regulators', 'Labelling AI-made content and disclosing training data would help, but only if provenance can be traced in the first place.'],
];

// [claim, answer, evidence]. Claims rebuilt from the live widget's visible fragments; the answer key is Claude's reading of the brief.
const CLAIMS = [
  ['Mixing in real data prevents collapse.', 'Supported', '20–30% real data kept the loop stable (Alemohammad et al., 2023).'],
  ['Detectors can reliably spot AI text.', 'Contested', 'Paraphrasing breaks watermarks, and detectors flag non-native writers.'],
  ['We know how much AI text is safe.', 'Open', 'Whether 5% or 30% matters is still unknown.'],
];

// Quill's "What topics are covered": one card per topic, a sample to try now and a way to see the rest.
const TOPIC_SAMPLES = {
  society: ['brief', BRIEF.title, '#brief'],
  data: ['quebook', '[Foundations of Data Driven Thinking]', '#'],
  science: ['quebook', '[AI for Science]', '#'],
  building: ['case', '[Hugging Face]', '#'],
};

const laptop = () => `
  <div class="q-laptop" aria-hidden="true"><div class="q-screen">
    <div class="q-app-bar">${fmt('brief')}<span class="q-count">Check-in 1 / ${BRIEF.checkins}</span></div>
    <div class="q-app">
      <div class="q-app-text"><img src="${IMG}covers/what-happens-when-ai-trains-on-ai-generated-data.jpg" alt="">
        <strong>${BRIEF.title}</strong><p>${BRIEF.lede}</p><p class="q-fade">Train a new model on those samples and the tails are underrepresented further…</p></div>
      <div class="q-app-que">
        <div class="qhead">${queMark('asking', 'q-mark-chat')}<strong>Que</strong><span class="qtag">Check-in</span></div>
        <div class="bubble">${BRIEF.question}</div>
        <div class="bubble me">Rare things get generated less, so each new model sees fewer of them.</div>
        <div class="q-app-actions"><span class="q-f-go">Check</span><span>Get a hint</span></div>
        <div class="bubble fb">Need it another way? Picture a playlist rebuilt each week from last week’s most-played songs.</div>
        <div class="q-app-input">Ask Que anything…</div>
      </div>
    </div>
  </div></div>`;

// Que 2.0 hero screenshot: the live Foundations of Data Driven Thinking chapter (its quote and Data-Theory Matrix) with an illustrative Que check-in
const qHeroShot = () => `<div class="hero-preview q-shot" role="img" aria-label="A QueBook chapter with the Data-Theory Matrix beside a Que check-in. Illustrative.">
  <div class="hp-app">
    <div class="hp-bar"><span><b>Foundations of Data Driven Thinking</b> · Chapter 1: Thinking in a World of Data</span></div>
    <img class="hp-cover" src="${IMG}covers/foundations-banner.jpg" alt="">
    <div class="hp-body">
      <div class="hp-read">
        <blockquote class="hp-quote">“Data never speaks for itself. Data only speaks through the questions we ask of it.”</blockquote>
        <p class="hp-cap">The Data-Theory Matrix</p>
        <div class="hp-matrix">${MATRIX.map(([q, a]) => `<div><span>${q}</span><strong>${a}</strong></div>`).join('')}</div>
      </div>
      <div class="hp-que hp-chat">
        <div class="qhead">${queMark('asking', 'q-mark-chat')}<strong>Que</strong><span class="qtag">Check-in</span></div>
        <p class="hp-bub">Look at the matrix. Why isn’t strong data enough on its own?</p>
        <p class="hp-bub me">Because without a theory, you can’t say why the numbers move.</p>
        <p class="hp-bub fb">Yes. Data tells you what happened. Theory is what lets you explain it, and predict what comes next.</p>
      </div>
    </div>
  </div>
</div>`;

const qHero = () => `
  <section class="q-hero" id="top"><div class="wrap">
    <div class="q-hero-text">
      ${document.body.dataset.h2 ? `<h1>Three ways to read, with <span class="accent">Que</span> beside you</h1>
      <div class="q-hero-side"><p class="lede">A whole subject. A real organisation. One current question. <strong>Que checks your understanding as you go.</strong></p>
      <div class="cta-row"><a class="btn btn-primary" href="#topics">Browse topics</a></div></div>` : `<h1>Read with <span class="accent">Que</span></h1>
      <p class="lede">Que is the AI learning companion built into every QueBook, case study and QueBrief. Ask it anything, check your understanding as you go, and get hints and new explanations until ideas click.</p>
      <div class="cta-row"><a class="btn btn-primary" href="${PRICING}">Start free</a><a class="btn q-btn-light" href="#brief">Try a sample brief</a></div>
      <p class="q-free">Free: the first 2 chapters of every QueBook and selected QueBriefs.</p>`}
    </div>
    ${document.body.dataset.h2 ? qHeroShot() : laptop()}
  </div></section>`;

// Each card shows the same thing in the same order: who acts, what they see, the one control
const attemptPanel = (a, i) => `
  <div class="q-attempt" id="attempt-${i}" role="tabpanel"${i ? ' hidden' : ''}>
    <div class="q-why"><h3>${a.label}</h3><p>${a.why}</p></div>
    <div class="q-exchange">
      <div class="q-prompt"><span class="q-k">Check-in question</span>${BRIEF.question}</div>
      <div class="bubble me"><div class="who">Learner · ${a.label}</div>${a.answer}</div>
      <div class="bubble fb${a.gap ? '' : ' win'}"><div class="who">Que <span class="verdict ${a.verdict[1]}">${a.verdict[0]}</span></div>${a.reply}${a.gap ? `<span class="gap">${a.gap}</span>` : ''}</div>
    </div>
  </div>`;

// Que 2.0: the three attempts as one thread (no attempt toggles), each step numbered
const attemptThread = () => `<div class="q-thread">
  ${ATTEMPTS.map((a, i) => `<div class="q-step" style="--i:${i}"><span class="q-k">${['First', 'Second', 'Third'][i]} attempt</span>
    <div class="q-ans"><span class="q-by">Your answer</span><p>${a.answer}</p></div>
    <div class="q-rep${a.gap ? '' : ' win'}"><span class="q-by">${queMark(['not-yet', 'thinking', 'strong-answer'][i], 'q-mark-mini')}Que</span><p>${a.reply}</p></div></div>`).join('')}
</div>`;
// Que 2.0: flag, and an icon per brief feature for the tile buttons
const H2Q = () => !!document.body.dataset.h2;
// the new "In every read" section (the interactive parts shared by all three formats) shows on Que 2.0, and on the original Que page via data-brief2
const B2Q = () => H2Q() || !!document.body.dataset.brief2;
// the new topics section (left-aligned, formats row, cropped covers): Que 2.0, and the original page via data-topics2
const T2Q = () => H2Q() || !!document.body.dataset.topics2;
const FEAT_ICON = [
  '<path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  '<path d="M4 8h13l-3-3M20 16H7l3 3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  '<circle cx="8" cy="9" r="3" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="16.5" cy="9" r="3" fill="none" stroke="currentColor" stroke-width="2"/><path d="M2.5 19c.8-3 3-4.5 5.5-4.5s4.7 1.5 5.5 4.5M11 19c.8-3 3-4.5 5.5-4.5S21.2 16 22 19" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  '<path d="M12 4v16M6 20h12M5 8h14M5 8l-2.5 6a2.5 2.5 0 0 0 5 0zM19 8l-2.5 6a2.5 2.5 0 0 0 5 0z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>',
];
const FEATS = [['Check-ins'], ['Another explanation'], ['Perspectives'], ['Classify claims']];
const qBrief = () => `
  <section class="section" id="brief"><div class="wrap">
    ${B2Q() ? `<div class="feature-head">
      <p class="fh"><strong>In every read.</strong> Interactive widgets that make you think, not just scroll. Try them here.</p></div>
    <div class="q-tiles" role="tablist" aria-label="Brief features">${[2, 3, 0].map((i) => [FEATS[i], i]).map(([[t0], i]) => { const t = i === 0 ? 'Strong and weak answers' : t0; return `<button type="button" role="tab" data-feat="${i}" aria-selected="${i === 2}" aria-controls="feat-${i}"><svg viewBox="0 0 24 24" aria-hidden="true">${FEAT_ICON[i]}</svg>${t}</button>`; }).join('')}</div>` : `<div class="section-head"><h2>Inside a <span class="accent">QueBrief</span></h2>
      <p class="lede">One current question, read in one sitting. Try the interactive parts of one brief.</p></div>
    <div class="q-briefcard">
      <div>${fmt('brief')}<h3>${BRIEF.title}</h3><p class="muted">By ${BRIEF.by} · ${BRIEF.date}</p></div>
      <span class="q-counter" id="q-counter" aria-live="polite">0 / ${BRIEF.checkins} check-ins</span>
    </div>
    <div class="q-tabs q-feats" role="tablist" aria-label="Brief features">${FEATS.map(([t], i) => `<button type="button" role="tab" data-feat="${i}" aria-selected="${!i}" aria-controls="feat-${i}">${t}</button>`).join('')}</div>`}
    <div class="q-panes">

    <div class="q-block" id="feat-0" role="tabpanel"${B2Q() ? ' hidden' : ''}>
      <p class="muted">${B2Q() ? `Check-in: <strong>${BRIEF.question}</strong>` : 'Step through one answer, from vague to strong.'} <span class="q-illus">Proposed: Que doesn’t grade answers yet</span></p>
      ${B2Q() ? attemptThread() : `<div class="q-tabs" role="tablist" aria-label="Attempts">${ATTEMPTS.map((a, i) => `<button type="button" role="tab" data-attempt="${i}" aria-selected="${!i}" aria-controls="attempt-${i}">${a.label}</button>`).join('')}</div>
      ${ATTEMPTS.map(attemptPanel).join('')}`}
    </div>

    <div class="q-block q-two" id="feat-1" role="tabpanel" hidden>
      <div><p class="muted">When an explainer doesn’t land, ask Que for a different angle.</p>
        <blockquote class="q-pull">${BRIEF.pull}</blockquote></div>
      <div class="q-student">
        <div class="q-student-head"><span aria-hidden="true">💡</span><strong>For the Student</strong></div>
        <p>${BRIEF.student}</p>
        <button type="button" class="chipbtn" id="q-explain" aria-expanded="false" aria-controls="q-explain-out">Explain it another way</button>
        <div class="bubble" id="q-explain-out" hidden><div class="who">Que ${illus}</div>Picture a class photo retaken every year, but from last year’s photo, by a camera that keeps only the faces it sees most often. Nobody gets blurrier. The unusual faces just stop appearing.</div>
      </div>
    </div>

    <div class="q-block" id="feat-2" role="tabpanel"${B2Q() ? '' : ' hidden'}>
      <p class="muted">One problem, six stakeholders. Pick one to hear their side.</p>
      <div class="q-ring" role="tablist" aria-label="Stakeholders">${PERSPECTIVES.map(([who], i) => `
        <button type="button" role="tab" class="q-who" style="grid-area: s${i}" data-persp="${i}" aria-selected="${!i}" aria-controls="persp-${i}"><span class="q-av" aria-hidden="true">${WHO_ICON[i]}</span>${who}</button>`).join('')}
        <div class="q-hub">${B2Q() ? '' : `<span class="q-k">The issue</span><p class="q-issue">${BRIEF.title}</p>`}${PERSPECTIVES.map(([who, say], i) => `
          <blockquote class="q-persp-panel" id="persp-${i}" role="tabpanel"${i ? ' hidden' : ''}>“${say}”<cite>${who}</cite></blockquote>`).join('')}
        </div>
      </div>
    </div>

    <div class="q-block" id="feat-3" role="tabpanel" hidden>
      <p class="muted">Supported, contested or open? Choose, then see the evidence. <span id="q-score" aria-live="polite"></span></p>
      <ol class="q-claims">${CLAIMS.map(([c, , ev], i) => `
        <li data-claim="${i}"><p>${c}</p>
          <div class="q-pick">${['Supported', 'Contested', 'Open'].map((o) => `<button type="button" data-pick="${o}">${o}</button>`).join('')}</div>
          <div class="q-evidence" hidden><strong></strong> <span class="q-k">See the evidence</span>${ev}</div></li>`).join('')}
      </ol>
    </div>
    </div>
  </div></section>`;

// What sets each format apart, in one line
const FORMATS = {
  quebook: ['QueBook', 'A whole subject, chapter by chapter, like a textbook.'],
  case: ['Case study', 'One real organisation. Make the call, then see what they did.'],
  brief: ['QueBrief', 'One current research question, explained short.'],
};
const formatsRow = (cls) => `<ul class="q-formats ${cls === 'q-formats-cards' ? '' : 'q-formats-row '}${cls}">${Object.entries(FORMATS).map(([k, [name, line]]) => `<li data-k="${k}"><span class="q-fmt">${name}</span><p>${line}</p></li>`).join('')}</ul>`;
const fmt = (k) => `<span class="q-fmt" data-k="${k}">${FORMATS[k][0]}</span>`;

// Que 2.0: "browse by format" (default) or "by topic", one panel on top of the other so the section never changes height
// Que 2.0: real FuturesHub items (futureshub.com/learn, 21 Nov), no cover shown in both views
const FORMAT_SAMPLE = { quebook: ['quebook', 'Foundations of Data Driven Thinking', '#'], case: ['case', 'Hugging Face', '#'], brief: ['brief', BRIEF.title, '#brief'] };
const TOPIC_CARDS = {
  ai: { name: 'How AI Works', line: 'What machines actually do when they learn.', item: ['quebook', 'Foundations of Artificial Intelligence', '#'] },
  data: { name: 'Data and Reasoning', line: 'Judging claims, and spotting false causes.', item: ['quebook', 'Critical Reasoning in the Age of AI', '#'] },
  science: { name: 'AI for Science', line: 'How machine learning is changing scientific discovery.', item: ['quebook', 'AI for Science', '#'] },
  society: { name: 'AI and Society', line: 'Who builds AI, who pays for it and who benefits.', item: ['case', 'Sama: The Ethics of AI’s Hidden Workforce', '#'] },
};
const TOPIC_VIEW = Object.keys(TOPIC_CARDS);
const topicCard = (t) => { const { name, line, item: [kind, title, href] } = TOPIC_CARDS[t]; return `
      <article class="q-topic" data-k="${kind}">${posterArt(artFor({ channel: kind, name: title }))}
        <h3>${name}</h3><p class="q-fline">${line}</p>
        <div class="q-topic-cta"><a class="btn btn-check btn-small" href="${href}">Try a sample</a></div>
      </article>`; };
// how the main page describes them (CHANNELS in site.js)
const FORMAT_DEF = { quebook: ['The foundations: core reasoning skills for the AI age.', 'Chapter by chapter'], case: ['A real decision. Make the call, then see what happened.', 'Real decisions'], brief: ['Short research briefings on one current question.', 'One sitting'] };
const formatCard = (k) => { const [kind, title, href] = FORMAT_SAMPLE[k]; return `
      <article class="q-topic" data-k="${kind}">${posterArt(artFor({ channel: kind, name: title }))}
        <h3>${FORMATS[k][0]}</h3><p class="q-fline">${FORMAT_DEF[k][0]}</p>
        <div class="q-topic-cta"><a class="btn btn-check btn-small" href="${href}">Try a sample</a></div>
      </article>`; };
const qTopicsH2 = () => `
  <section class="section" id="topics"><div class="wrap">
    <div class="feature-head q-head-row"><p class="fh"><strong>What you can read.</strong> By format or by topic.</p>
      <div class="q-viewbar"><a class="q-see-all" href="#" data-only="topic">See all topics <span aria-hidden="true">→</span></a><a class="q-see-all" href="#" data-only="format">See the full library <span aria-hidden="true">→</span></a>
        <div class="q-seg" role="tablist" aria-label="Browse by">
          <button type="button" role="tab" aria-selected="true" data-view="format">By format</button>
          <button type="button" role="tab" aria-selected="false" data-view="topic">By topic</button></div></div></div>
    <div class="q-views">
      <div class="q-view" data-view="format"><div class="q-topics">${Object.keys(FORMATS).map(formatCard).join('')}
</div></div>
      <div class="q-view is-off" data-view="topic" aria-hidden="true"><div class="q-topics">${TOPIC_VIEW.map(topicCard).join('')}</div></div>
    </div>
  </div></section>`;

const qTopics = () => H2Q() ? qTopicsH2() : `
  <section class="section" id="topics"><div class="wrap">
    ${T2Q() ? `<div class="feature-head q-head-row"><p class="fh"><strong>What you can read about.</strong> Pick a topic, try a sample.</p>
      <a class="q-see-all" href="#">See all topics <span aria-hidden="true">→</span></a></div>` : `<div class="q-topics-head"><div class="section-head"><h2>What you can read <span class="accent">about</span></h2>
      <p class="lede">Three ways to read. Every topic has something to try free.</p></div>
      <a class="q-see-all" href="#">See all topics <span aria-hidden="true">→</span></a></div>`}
    ${T2Q() && !H2Q() ? formatsRow('') : ''}
    <div class="q-topics">${Object.entries(TOPIC_SAMPLES).map(([t, [kind, title, href]]) => `
      <article class="q-topic" data-k="${kind}">${posterArt(artFor({ channel: kind, name: title }))}
        ${fmt(kind)}<h3>${TOPICS[t].name}</h3>
        <div class="q-topic-cta"><a class="btn btn-check btn-small" href="${href}">Try a sample</a></div>
      </article>`).join('')}
    </div>
  </div></section>`;

const qClosing = () => `
  <section class="section closing"><div class="wrap">
    ${document.body.dataset.h2 ? `<h2>Start reading <span class="accent">free</span></h2>
    <p class="lede">Pick a format. <strong>Que reads along.</strong></p>` : `<h2>Start with a free <span class="accent">QueBrief</span></h2>
    <p class="lede">One question, one sitting, and Que reading along with you.</p>`}
    <div class="cta-row">${document.body.dataset.h2 ? Object.values(FORMATS).map(([n]) => `<a class="btn btn-primary" href="#topics">Read a ${n === 'QueBook' || n === 'QueBrief' ? n : n.toLowerCase()}</a>`).join('') : `<a class="btn btn-primary" href="${PRICING}">Start free</a><a class="btn btn-ghost" href="#brief">Try the sample again</a>`}</div>
  </div></section>`;

// Que's mark in one place, so the real logo swaps in here (placeholder: the Q tile)
// Que's character mark (her vector package in assets/que). Only the eyes change by mood; light version on light backgrounds, dark on navy, never a shadow.
const queMark = (mood = 'asking', cls = '', tone = 'light') => `<img class="q-mark ${cls}" src="${IMG}que/que-${mood}-${tone}.svg" alt="" aria-hidden="true">`;

// Brilliant-style feature rows: text on one side, a soft panel with a clipped chat card on the other
// One avatar per card: a later Que message passes mood = null and keeps the same indent
const queSays = (mood, ...lines) => `<div class="q-f-que">${mood ? queMark(mood, 'q-f-avatar') : '<span class="q-f-avatar"></span>'}<div class="q-f-lines">${lines.map((l) => `<p class="q-f-b">${l}</p>`).join('')}</div></div>`;
const youSay = (t) => `<p class="q-f-b q-f-you">${t}</p>`;
const choices = (...c) => `<div class="q-f-choices">${c.map((x) => `<span>${x}</span>`).join('')}</div>`;
// What Que does, per Rishita (25 Nov 2026): only check-ins exist; hints are being added; Ask anything and Alternative explanations do NOT exist,
// even though the live QueBook page listed all four on 19 Nov. Don't show them as features.
// No verdicts, retries or progress tracking here: those aren't live. Que's replies are drafts.
const qInput = (t, typed) => `<div class="q-f-input${typed ? ' typed' : ''}">${t}</div>`;
// Que 2.0: one example per row, each from a different reading (drafts, illustrative)
const FEATURES_2 = () => [ // only what's live or being added (her note, 25 Nov): Ask anything and Alternative explanations removed
  ['Check your understanding', '<strong>Explain it back</strong> in your own words. Check-ins through every chapter show you it’s landed before you move on.',
    `<div class="q-f-top"><span>Check-in</span><b>1 / 6</b></div>
     ${queSays('asking', 'In Kenya, textbooks didn’t raise average scores. Were they a necessary, sufficient or contributory cause of learning?')}
     ${qInput('Contributory. They helped, but not on their own.', true)}
     <div class="q-f-row"><span class="q-f-go">Check</span></div>`],
  ['Get hints', 'Stuck on a check-in? <strong>Ask for a hint.</strong> Que nudges you forward without handing you the answer.',
    `${queSays('asking', 'Why do rare ideas disappear first?')}
     ${choices('Get a hint')}
     ${queSays(null, 'Think about which kinds of text a model produces most often.')}
     ${qInput('Because…', true)}`],
  ['Apply with Que, not a CV', 'Que asks about <strong>a problem you care about</strong>, and people on the Equitech Futures team read every one.',
    `<div class="q-f-top"><span>Apply with Que</span><b>No CV needed</b></div>
     ${queSays('asking', 'Tell me about a problem you noticed this year that nobody was fixing.')}
     ${youSay('At my college, first-year students drop out of coding classes in the first month…')}
     ${queSays(null, 'Why do you think they leave then, and not later?')}
     ${qInput('Your answer…')}`],
];
const FEATURES = () => H2Q() ? FEATURES_2() : [
  ['Ask anything', 'Ask Que about anything on the page, in your own words, whenever something isn’t clear.',
    `<div class="q-f-page"><p>Each generation is not noisier but <mark>narrower</mark>. The rare cases thin out first.</p></div>
     ${youSay('What does “narrower” mean here?')}
     ${queSays('asking', 'Less varied. Each generation keeps the common cases and loses the rare ones.')}
     ${qInput('Ask Que anything…')}`],
  ['Alternative explanations', 'If an explanation doesn’t click, ask for another. Que tries a new angle until it does.',
    `${queSays('thinking', 'Each generation keeps the common cases and loses the rare ones.')}
     ${choices('Explain it another way')}
     ${queSays(null, 'Picture a playlist rebuilt each week from last week’s most-played songs. In a few months, only the hits are left.')}`],
  ['Check your understanding', 'Check-ins through each chapter ask you to explain an idea in your own words, so you know it’s landed before you move on.',
    `<div class="q-f-top"><span>Check-in</span><b>1 / 8</b></div>
     ${queSays('asking', 'Why does training on AI-made text make models narrower, not noisier?')}
     ${qInput('Rare things get generated less, so each new model sees fewer of them.', true)}
     <div class="q-f-row"><span class="q-f-go">Check</span><span>Get a hint</span></div>`],
  ['Get hints', 'Stuck on a check-in or an exercise? Ask for a hint. Que nudges you forward without handing you the answer.',
    `${queSays('asking', 'Why do rare ideas disappear first?')}
     ${choices('Get a hint')}
     ${queSays(null, 'Think about which kinds of text a model produces most often.')}
     ${qInput('Because…', true)}`],
];
const qMeet = () => `
  <section class="section q-meet" id="meet"><div class="wrap">
    ${document.body.dataset.h2 ? `<div class="feature-head">${queMark('asking', 'q-mark-big')}<p class="fh"><strong>What Que does.</strong> A reading partner, not a chatbot.</p></div>` : `<div class="q-meet-head">${queMark('asking', 'q-mark-big')}<h2>Meet <span class="accent">Que</span>, your reading partner</h2>
      <p class="lede">Built into every chapter to help you learn more effectively. ${illus}</p></div>`}
    ${FEATURES().map(([h, p, mock], i) => `
      <div class="q-f${i % 2 ? ' flip' : ''}">
        <div class="q-f-text"><h3>${H2Q() ? `<span class="q-num" aria-hidden="true">0${i + 1}</span>` : ''}${h}</h3><p>${p}</p></div>
        <div class="q-f-panel" aria-hidden="true"><div class="q-f-card">${mock}</div></div>
      </div>`).join('')}
  </div></section>`;

// Card-fan previews (fan.js): body data-fan="hero" swaps the laptop hero for the cards; "strip" adds them under it
const quePage = () => {
  const fan = document.body.dataset.fan;
  const top = fan === 'hero' ? [fanHero()] : fan === 'strip' ? [qHero(), fanStrip()] : [qHero()];
  return [...top, qTopics(), qMeet(), qBrief(), qClosing()].join('');
};

// Que 2.0: label what changed against the original page (like LP5's competitor inputs). Toggle in the mockup bar.
const CHANGES = [
  ['.header nav', 'Changed: Axiom-style nav, Membership removed, current page marked'],
  ['.q-hero h1', 'Changed: headline is now about the three offerings, with Que as the helper'],
  ['.hero-preview', 'New, taller screenshot: the live Foundations of Data Driven Thinking chapter (quote + Data-Theory Matrix) with a Que check-in in chat bubbles'],
  ['.q-hero-side', 'Changed: new line; Browse topics is the only button (Start free stays in the nav)'],
  ['.q-viewbar', 'New: browse by format (default: the three offerings) or by topic'],
  ['#topics .feature-head', 'Changed: one-block heading; See all topics moved up; "try free" line replaced'],
  ['.q-topics', 'Changed: left-aligned; repeated sample titles removed; the three formats now live here as the default view'],
  ['#meet .feature-head', 'New: "What Que does" heading with Que mark (hero no longer has it)'],
  ['.q-f', 'Changed: only what exists or is coming: Check your understanding, Get hints, Apply with Que (no CV). Ask anything and Alternative explanations removed'],
  ['#brief .feature-head', 'Changed: "In every read" (the widgets are in every format, not just QueBrief); one-block heading; title card, byline and counter removed'],
  ['.q-tiles', 'Changed: pills → three tiles (Perspectives, Classify claims, Strong and weak answers); Another explanation removed'],
  ['.q-ring', 'Changed: stakeholder buttons stay put; "The issue" title removed'],
  ['.closing', 'Changed: light closing, not just about QueBrief; one button per format instead of Start free / Try a sample'],
  ['.footer .socials', 'Changed: social pills → small icons'],
];
const REMOVED = [
  ['.q-hero-side', 'Removed: the format row (QueBook / Case study / QueBrief) from the hero, now in the format view · hero screenshot (QueBrief + Que chat) · "Que is the AI learning companion…" sentence · "Free: the first 2 chapters…" line · "Try a sample brief" button'],
  ['#topics .feature-head', 'Removed: centred heading · "Every topic has something to try free" · centred See all topics'],
  ['#brief .feature-head', 'Removed: QueBrief title card · "By Abhilash Mishra" byline · 0/8 counter · attempt toggles · Another explanation tab'],
];
const CHANGES_1 = [
  ['#meet .q-meet-head', 'Changed: heading, mascot and line left-aligned (were centred)'],
  ['#topics .feature-head', 'Changed: one-block heading, one colour; "See all topics" moved up and level with it; subtitle replaced'],
  ['.q-formats-row', 'New: the three formats explained'],
  ['.q-topics', 'Changed: cards left-aligned, full-width covers, logo strip cropped, buttons 44px'],
  ['#brief .feature-head', 'Changed: "In every read" (the widgets are in every format, not just QueBrief); one-block heading; title card, byline and counter removed'],
  ['.q-tiles', 'Changed: pills → three tiles (Perspectives, Classify claims, Strong and weak answers); Another explanation removed'],
  ['.q-ring', 'Changed: stakeholder buttons stay put; "The issue" title removed'],
];
const REMOVED_1 = [
  ['#topics .feature-head', 'Removed: centred heading · blue "about" · "Every topic has something to try free" · bottom "See all topics" link · grey sample titles under each topic name'],
  ['#brief .feature-head', 'Removed: QueBrief title card · "By Abhilash Mishra" byline · 0/8 counter · attempt toggles · Another explanation tab'],
];
const changesWire = () => {
  const [CHANGES_L, REMOVED_L] = H2Q() ? [CHANGES, REMOVED] : [CHANGES_1, REMOVED_1];
  CHANGES_L.forEach(([sel, t]) => document.querySelector(sel)?.setAttribute('data-chg', t));
  REMOVED_L.forEach(([sel, t]) => { const el = document.querySelector(sel); if (el) el.insertAdjacentHTML('afterend', `<p class="chg-removed" aria-hidden="true">${t}</p>`); });
  const tg = document.getElementById('chg-toggle'); // off until switched on, like the landing page (her ask, 25 Nov)
  tg?.addEventListener('click', () => { const on = document.body.classList.toggle('chg-on'); tg.setAttribute('aria-pressed', on); tg.textContent = `Changes vs original: ${on ? 'on' : 'off'}`; });
};
const queWire = () => {
  // Que 2.0: like equitechfutures.com/ventures, the whole page turns dark navy while "In every read" holds the middle of the screen
  if (H2Q() && 'IntersectionObserver' in window) {
    const band = document.getElementById('brief');
    const dark = new URLSearchParams(location.search).get('dark'); // try other dark colours: ?dark=18181c
    if (/^[0-9a-f]{6}$/i.test(dark || '')) document.body.style.setProperty('--q-dark', '#' + dark);
    new IntersectionObserver(([e]) => document.body.classList.toggle('q-dark', e.isIntersecting), { rootMargin: '-45% 0px -54% 0px' }).observe(band);
  }
  if (H2Q() || document.body.dataset.brief2) changesWire();
  document.querySelectorAll('.q-seg [data-view]').forEach((b) => b.addEventListener('click', () => {
    const v = b.dataset.view;
    document.querySelectorAll('.q-seg [data-view]').forEach((x) => x.setAttribute('aria-selected', x === b));
    document.querySelectorAll('.q-view').forEach((el) => { const on = el.dataset.view === v; el.classList.toggle('is-off', !on); el.setAttribute('aria-hidden', !on); });
    document.querySelectorAll('[data-only]').forEach((el) => { el.hidden = el.dataset.only !== v; });
  }));
  document.querySelectorAll('[data-only]').forEach((el) => { el.hidden = el.dataset.only !== 'format'; });
  const counter = document.getElementById('q-counter');
  const tabs = (sel, panel) => document.querySelectorAll(`[${sel}]`).forEach((b) => b.addEventListener('click', () => {
    document.querySelectorAll(`[${sel}]`).forEach((x) => {
      const on = x === b; x.setAttribute('aria-selected', on);
      document.getElementById(panel(x.getAttribute(sel))).hidden = !on;
    });
  }));
  tabs('data-feat', (i) => `feat-${i}`);
  tabs('data-attempt', (i) => `attempt-${i}`);
  tabs('data-persp', (i) => `persp-${i}`);
  // Reaching the strong answer completes the first check-in.
  if (B2Q()) { // all four panels keep one height, so switching features doesn't make the page jump
    const panes = [...document.querySelectorAll('.q-panes > .q-block')].filter((p) => p.id !== 'feat-1'), box = document.querySelector('.q-panes');
    const quotes = [...document.querySelectorAll('.q-persp-panel')];
    const even = () => {
      const pane = document.getElementById('feat-2'), was = pane.hidden; pane.hidden = false;
      quotes.forEach((q) => { q.style.minHeight = ''; });
      const qh = Math.max(...quotes.map((q) => { const h = q.hidden; q.hidden = false; const v = q.offsetHeight; q.hidden = h; return v; }));
      quotes.forEach((q) => { q.style.minHeight = `${qh}px`; }); pane.hidden = was;
      box.style.minHeight = ''; const hs = panes.map((p) => { const h = p.hidden; p.hidden = false; const v = p.offsetHeight; p.hidden = h; return v; }); box.style.minHeight = `${Math.max(...hs)}px`; };
    even(); addEventListener('resize', even);
  }
  document.querySelector(`[data-attempt="${ATTEMPTS.length - 1}"]`)?.addEventListener('click', () => { counter.textContent = `1 / ${BRIEF.checkins} check-ins`; counter.classList.add('done'); });

  const explain = document.getElementById('q-explain');
  explain.addEventListener('click', () => {
    const out = document.getElementById('q-explain-out'), open = out.hidden;
    out.hidden = !open; explain.setAttribute('aria-expanded', open);
  });

  const score = document.getElementById('q-score');
  document.querySelectorAll('[data-claim]').forEach((li) => li.addEventListener('click', (e) => {
    const b = e.target.closest('[data-pick]'); if (!b) return;
    const answer = CLAIMS[li.dataset.claim][1], right = b.dataset.pick === answer;
    if (B2Q() && (b.className === 'ok' || b.className === 'no')) { // Que 2.0: click your choice again to undo it
      li.querySelectorAll('[data-pick]').forEach((x) => { x.className = ''; x.setAttribute('aria-pressed', 'false'); });
      delete li.dataset.state; li.querySelector('.q-evidence').hidden = true;
      const done = document.querySelectorAll('[data-claim][data-state]').length, ok = document.querySelectorAll('[data-claim][data-state="ok"]').length;
      score.textContent = done ? `${ok} of ${done} right so far.` : ''; return;
    }
    if (B2Q()) li.querySelectorAll('[data-pick]').forEach((x) => x.setAttribute('aria-pressed', x === b));
    li.querySelectorAll('[data-pick]').forEach((x) => { x.className = x === b ? (right ? 'ok' : 'no') : x.dataset.pick === answer ? 'answer' : ''; });
    li.dataset.state = right ? 'ok' : 'no';
    const ev = li.querySelector('.q-evidence'); ev.hidden = false;
    ev.querySelector('strong').textContent = right ? `Yes: ${answer}.` : `It’s ${answer}.`;
    const done = document.querySelectorAll('[data-claim][data-state]').length, ok = document.querySelectorAll('[data-claim][data-state="ok"]').length;
    score.textContent = `${ok} of ${done} right so far.`;
  }));
};
