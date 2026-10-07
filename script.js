const storyCounters = document.querySelectorAll(".story-section .stats b[data-n]");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function showCounterFinalValue(counter) {
  const target = Number(counter.dataset.n);
  const suffix = counter.dataset.s || "";
  counter.textContent = `${target}${suffix}`;
}

function animateCounter(counter) {
  const target = Number(counter.dataset.n);
  const suffix = counter.dataset.s || "";

  if (!Number.isFinite(target) || target < 0) {
    throw new Error(`Invalid story counter target: ${counter.dataset.n}`);
  }

  if (prefersReducedMotion.matches) {
    showCounterFinalValue(counter);
    return;
  }

  const duration = 1400;
  const startTime = performance.now();

  function updateCounter(currentTime) {
    const progress = Math.min((currentTime - startTime) / duration, 1);
    const easedProgress = 1 - (1 - progress) ** 3;
    const currentValue = Math.floor(easedProgress * target);

    counter.textContent = `${progress === 1 ? target : currentValue}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    }
  }

  requestAnimationFrame(updateCounter);
}

if ("IntersectionObserver" in window) {
  const counterObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 },
  );

  storyCounters.forEach((counter) => counterObserver.observe(counter));
} else {
  storyCounters.forEach(animateCounter);
}

const arrivalFilters = document.querySelectorAll(".arrival-filter[data-filter]");
const arrivalCards = document.querySelectorAll(".product-card[data-categories]");

function filterArrivalCards(selectedCategory) {
  let visibleCardIndex = 0;

  arrivalCards.forEach((card) => {
    const categories = card.dataset.categories.split(/\s+/);
    const isVisible = categories.includes(selectedCategory);
    card.hidden = !isVisible;
    card.classList.toggle("is-staggered", isVisible && visibleCardIndex % 2 === 1);

    if (isVisible) {
      visibleCardIndex += 1;
    }
  });
}

arrivalFilters.forEach((filterButton) => {
  filterButton.addEventListener("click", () => {
    arrivalFilters.forEach((button) => {
      button.setAttribute("aria-pressed", String(button === filterButton));
    });

    filterArrivalCards(filterButton.dataset.filter);
  });
});

const initiallySelectedFilter = document.querySelector(".arrival-filter[aria-pressed=\"true\"]");
if (initiallySelectedFilter) {
  filterArrivalCards(initiallySelectedFilter.dataset.filter);
}
