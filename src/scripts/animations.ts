let revealObserver: IntersectionObserver | undefined;
let countObserver: IntersectionObserver | undefined;
const activeCountups = new Map<
  HTMLElement,
  { frame: number; finalText: string }
>();
const completedCounts = new WeakSet<HTMLElement>();

export function init() {
  revealObserver?.disconnect();
  countObserver?.disconnect();

  for (const [element, countup] of activeCountups) {
    cancelAnimationFrame(countup.frame);
    element.textContent = countup.finalText;
    completedCounts.add(element);
  }
  activeCountups.clear();

  if (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    !('IntersectionObserver' in window)
  ) {
    document.documentElement.classList.remove('js-reveal');
    return;
  }

  document.documentElement.classList.add('js-reveal');

  revealObserver = new IntersectionObserver(
    (entries, observer) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;

        const element = entry.target as HTMLElement;
        const siblings = Array.from(element.parentElement?.children ?? []).filter(
          (sibling) => sibling.hasAttribute('data-reveal'),
        );
        const siblingIndex = siblings.indexOf(element);
        element.style.setProperty(
          '--reveal-delay',
          `${Math.min(siblingIndex, 5) * 70}ms`,
        );
        const cleanupDelay = (event: TransitionEvent) => {
          if (event.propertyName !== 'opacity') return;
          element.style.removeProperty('--reveal-delay');
          element.removeEventListener('transitionend', cleanupDelay);
        };
        element.addEventListener('transitionend', cleanupDelay);
        element.classList.add('in');
        observer.unobserve(element);
      }
    },
    { threshold: 0.1, rootMargin: '0px 0px -8% 0px' },
  );

  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((element) => {
    revealObserver?.observe(element);
  });

  countObserver = new IntersectionObserver(
    (entries, observer) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;

        const element = entry.target as HTMLElement;
        observer.unobserve(element);
        if (completedCounts.has(element)) continue;

        const target = Number(element.dataset.count);
        if (!Number.isFinite(target)) continue;

        const finalText = element.textContent?.trim() || String(target);
        const start = performance.now();
        const update = (now: number) => {
          const progress = Math.min((now - start) / 1100, 1);
          const eased = 1 - (1 - progress) ** 3;
          element.textContent = String(Math.round(target * eased));

          if (progress < 1) {
            const frame = requestAnimationFrame(update);
            activeCountups.set(element, { frame, finalText });
          } else {
            element.textContent = finalText;
            activeCountups.delete(element);
            completedCounts.add(element);
          }
        };

        const frame = requestAnimationFrame(update);
        activeCountups.set(element, { frame, finalText });
      }
    },
    { threshold: 0.5 },
  );

  document.querySelectorAll<HTMLElement>('[data-count]').forEach((element) => {
    if (!completedCounts.has(element)) countObserver?.observe(element);
  });
}

document.addEventListener('astro:page-load', init);
