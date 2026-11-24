/* Quill 6.0: what changed against the live futureshub.com homepage (checked 25 Nov 2026), labelled like Read with Que 2.0.
   Off by default (her ask); the "Changes vs original" button in the top bar turns the labels on. */
(() => {
  const CHANGES = [
    ['.header nav', 'New: three menus (Read with Que, Learn with Others, Build Something). Live site: Sign in and Become a Member only'],
    ['.q3-hero .cta-row', 'Changed: headline (was “Human Intelligence, Amplified”) · a photo, not a QueBook preview · “How It Works” → “Try a sample chapter”'],
    ['.marquee', 'New: faculty and partner logos'],
    ['#why h2', 'New: one sentence, three reasons; each lights up in turn (01 / 03)'],
    ['#think .q3-reason-head h2', 'Changed: QueBooks, case studies and QueBriefs together; the live site’s “AI is reshaping…” line moved here'],
    ['#think .q3-pick', 'New: one tab per format, each with what it is and a cover'],
    ['#think .q3-authors', 'New: who writes them'],
    ['#que .fh strong', 'New: Que named and introduced as a Socratic AI agent'],
    ['#que .steps', 'Changed: the live site’s Flu Trends check-in, as a 4-step demo (step 3 marked Proposed)'],
    ['#people .q3-reason-head h2', 'Changed: masterclasses, cohorts and office hours together (live site: cohorts only)'],
    ['#people .q4-classes', 'New: masterclasses on the homepage, one per teacher'],
    ['#ch-office', 'New: office hours'],
    ['#build .q3-reason-head h2', 'Changed: challenges lead with what you can win (up to $10,000)'],
    ['.q3-alumni h2', 'New: alumni in their own words (quotes from equitechfutures.com)'],
    ['.q3-faq h2', 'New: questions people ask before joining'],
    ['#calendar .section-head', 'New: events calendar'],
    ['.q3-behind h2', 'New: Equitech Futures and its numbers'],
    ['.q3-ready h2', 'Changed: “Helping the Next Generation…” contact block → “Not sure where to begin?”'],
  ];
  const REMOVED = [
    ['.q3-hero', 'Removed: the rotating announcement bar above the nav (“The Environmental Costs of Building AI cohort is open now”)'],
    ['#why', 'Removed: “Explore the frontiers of knowledge…” overview, whose three rows repeated the sections below'],
  ];
  CHANGES.forEach(([sel, t]) => document.querySelector(sel)?.setAttribute('data-chg', t));
  REMOVED.forEach(([sel, t]) => document.querySelector(sel)?.insertAdjacentHTML('afterend', `<div class="chg-note"><p class="chg-removed" aria-hidden="true">${t}</p></div>`));
  const tg = document.getElementById('chg-toggle'); // in the top bar, off until switched on (her ask, 25 Nov)
  tg?.addEventListener('click', () => { const on = document.body.classList.toggle('chg-on'); tg.setAttribute('aria-pressed', on); tg.textContent = `Changes vs original: ${on ? 'on' : 'off'}`; });
})();
