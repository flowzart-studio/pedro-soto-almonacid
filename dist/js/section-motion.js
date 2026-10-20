/* One entry observer, finite CSS sequences, and a local scroll story.
   Visible-first HTML remains the fallback. The cinematic player is independent. */
(() => {
  'use strict';
  const clamp = value => Math.min(1, Math.max(0, value));
  const storyProgress = (rect, viewport, vertical) => clamp(
    (viewport * .76 - rect.top) / Math.max(1, vertical ? rect.height : Math.min(viewport * .48, rect.height + viewport * .16))
  );
  if (typeof module !== 'undefined' && module.exports) module.exports = {storyProgress};
  if (typeof document === 'undefined' || !document.querySelector('.editorial-about') || !('IntersectionObserver' in window)) return;
  const groups = new Map(), entered = new WeakSet(), played = new WeakSet(), animated = new Set();
  const story = document.querySelector('#proceso .process-list');
  let observer, mutation, frame = 0, highest = 0, inStory = false, enabled = false, prepared = false;
  const reset = () => {
    enabled = false; inStory = false;
    observer?.disconnect(); mutation?.disconnect();
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    animated.forEach(element => element.classList.remove('section-enter'));
    story?.removeAttribute('data-story-ready');
  };
  try {
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const compact = matchMedia('(max-width: 1000px)');
    const item = (element, kind = 'copy', delay = 0) => ({element, kind, delay});
    const query = selector => [...document.querySelectorAll(selector)];
    function titleItems(heading, quiet = false, delay = 0) {
      if (!heading) return [];
      if (!heading.querySelector('br')) return [item(heading, quiet ? 'quiet' : 'title', delay)];
      // Keep original inline spans and accents. Replace BRs with equal line boxes.
      const lines = []; let line = document.createElement('span');
      line.className = 'story-line'; lines.push(line);
      for (const node of [...heading.childNodes]) {
        if (node.nodeName === 'BR') {
          line = document.createElement('span'); line.className = 'story-line'; lines.push(line);
        } else line.appendChild(node.cloneNode(true));
      }
      heading.replaceChildren(...lines);
      return lines.map((element, index) => item(element, quiet ? 'quiet' : 'title', delay + index * 110));
    }
    const register = (anchor, items) => {
      if (anchor) groups.set(anchor, items.filter(entry => entry.element));
    };
    function prepare() {
      if (prepared) return;
      prepared = true;
      const about = document.querySelector('#perfil');
      register(about.querySelector('.eyebrow'), [item(about.querySelector('.eyebrow'), 'label'),
        ...titleItems(about.querySelector('h2'), false, 90),
        ...[...about.querySelectorAll('.about-copy p')].map((element, index) => item(element, 'copy', 310 + index * 100))]);
      for (const id of ['trabajos', 'capacidades', 'proceso', 'flowzart', 'curriculum', 'contacto']) {
        const section = document.getElementById(id), quiet = ['flowzart', 'curriculum', 'contacto'].includes(id);
        if (!section) continue;
        const heading = section.querySelector('h2');
        const secondary = section.querySelector('.work-section-aside p, .section-head > p, .studio-grid > div > .lead, .shell > h2 + p, .contact-grid > div:last-child > p');
        register(heading, [...titleItems(heading, quiet), item(secondary, quiet ? 'quiet' : 'copy', quiet ? 140 : 240)]);
      }
      query('#trabajos .work-card').forEach((card, index) => {
        register(card.querySelector('.work-visual'), [item(card.querySelector('.work-visual img'), 'image', (index % 2) * 70)]);
        register(card.querySelector('.work-body'), [item(card.querySelector('.work-tags'), 'label'),
          item(card.querySelector('h3'), 'copy', 90), item(card.querySelector('.work-description'), 'copy', 180)]);
      });
      query('#capacidades .discipline-grid article').forEach((element, index) => register(element, [item(element, 'discipline', index * 120)]));
    }
    function reveal({element, kind, delay}) {
      if (!element || played.has(element)) return;
      played.add(element); animated.add(element);
      element.style.setProperty('--section-delay', delay + 'ms');
      element.classList.add('section-' + kind, 'section-enter');
    }
    function drawStory() {
      frame = 0;
      if (!enabled || !inStory || document.hidden || !story) return;
      try {
        const rect = story.getBoundingClientRect();
        highest = Math.max(highest, storyProgress(rect, innerHeight, compact.matches));
        story.style.setProperty('--story-progress', highest.toFixed(4));
        story.dataset.storyProgress = highest.toFixed(4);
        const stages = [...story.querySelectorAll('li')];
        stages.forEach((stage, index) => {
          const threshold = compact.matches ? stage.offsetTop / Math.max(1, rect.height) : index / stages.length;
          if (highest <= 0 || highest + .001 < threshold || stage.classList.contains('story-step-active')) return;
          stage.classList.add('story-step-active');
          // app.js may regenerate these children from the existing JSON model.
          [...stage.children].forEach((element, part) => reveal(item(element, 'step', part * 70)));
        });
      } catch { reset(); }
    }
    function schedule() {
      if (enabled && inStory && !document.hidden && !frame) frame = requestAnimationFrame(drawStory);
    }
    function configure() {
      reset();
      if (preference.matches) return;
      try {
        prepare(); enabled = true;
        observer = new IntersectionObserver(entries => {
          try {
            for (const entry of entries) {
              if (entry.target === story) { inStory = entry.isIntersecting; schedule(); continue; }
              if (!entry.isIntersecting || entered.has(entry.target)) continue;
              entered.add(entry.target); observer.unobserve(entry.target);
              groups.get(entry.target)?.forEach(reveal);
            }
          } catch { reset(); }
        }, {threshold: 0, rootMargin: '0px 0px -48px 0px'});
        groups.forEach((_, anchor) => { if (!entered.has(anchor)) observer.observe(anchor); });
        if (story) {
          story.dataset.storyReady = 'true'; observer.observe(story);
          mutation = new MutationObserver(schedule); mutation.observe(story, {childList: true});
        }
      } catch { reset(); }
    }
    document.addEventListener('animationend', event => {
      if (!animated.has(event.target)) return;
      event.target.classList.remove('section-enter'); animated.delete(event.target);
    });
    document.addEventListener('focusin', event => {
      const container = event.target.closest?.('.work-card, .section-enter');
      if (!container) return;
      container.classList.remove('section-enter');
      container.querySelectorAll('.section-enter').forEach(element => element.classList.remove('section-enter'));
    });
    addEventListener('scroll', schedule, {passive: true});
    addEventListener('resize', schedule, {passive: true});
    document.addEventListener('visibilitychange', schedule);
    preference.addEventListener('change', configure);
    compact.addEventListener('change', schedule);
    configure();
  } catch { reset(); }
})();
