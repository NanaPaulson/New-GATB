const revealElements = document.querySelectorAll<HTMLElement>('.reveal, .stagger-group, .timeline-wrapper');

document.documentElement.classList.add('motion-ready');

const showImmediately = () => {
  revealElements.forEach((element) => element.classList.add('is-visible'));
};

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
  showImmediately();
} else {
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          currentObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -60px 0px',
    },
  );

  revealElements.forEach((element) => observer.observe(element));
}
