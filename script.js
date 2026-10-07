const findElement = (selector, scope = document) => scope.querySelector(selector);
const findElements = (selector, scope = document) =>
  Array.from(scope.querySelectorAll(selector));

const userPrefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;
const observedElements = findElements("[data-n], .story-timeline li");

function animateNumber(element) {
  const target = Number(element.dataset.n);
  const suffix = element.dataset.s || "";

  if (!Number.isFinite(target) || target < 0) {
    throw new Error(`Invalid statistic target: ${element.dataset.n}`);
  }

  const startedAt = performance.now();
  const animateFrame = (now) => {
    const progress = userPrefersReducedMotion
      ? 1
      : Math.min(1, (now - startedAt) / 1400);
    const easedProgress = 1 - (1 - progress) ** 3;
    element.textContent = `${Math.round(target * easedProgress)}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(animateFrame);
    }
  };

  requestAnimationFrame(animateFrame);
}

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        currentObserver.unobserve(entry.target);

        if (entry.target.dataset.n !== undefined) {
          animateNumber(entry.target);
        } else {
          entry.target.classList.add("on");
        }
      });
    },
    { threshold: 0.5 },
  );

  observedElements.forEach((element) => observer.observe(element));
} else {
  observedElements.forEach((element) => {
    if (element.dataset.n !== undefined) {
      animateNumber(element);
    } else {
      element.classList.add("on");
    }
  });
}

findElements(".story-timeline li").forEach((item, index) => {
  const year = findElement("b", item);
  if (year) {
    year.style.transitionDelay = `${index * 0.2 + 0.3}s`;
  }
});

const storyImagePanel = findElement("#story-image");
const storyImage = storyImagePanel && findElement("img", storyImagePanel);

if (storyImagePanel && storyImage && !userPrefersReducedMotion) {
  const moveStoryImage = () => {
    const bounds = storyImagePanel.getBoundingClientRect();
    const progress = Math.min(
      1,
      Math.max(
        0,
        1 - (bounds.top + bounds.height) / (window.innerHeight + bounds.height),
      ),
    );

    storyImage.style.transform = `translateX(${(progress - 0.5) * -9}%)`;
  };

  window.addEventListener("scroll", moveStoryImage, { passive: true });
  moveStoryImage();
}

const menuButton = findElement("#burger");
const navigationLinks = findElement("#links");

if (menuButton && navigationLinks) {
  const closeMenu = () => {
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open menu");
    navigationLinks.classList.remove("open");
  };

  menuButton.addEventListener("click", () => {
    const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isExpanded));
    menuButton.setAttribute("aria-label", isExpanded ? "Open menu" : "Close menu");
    navigationLinks.classList.toggle("open", !isExpanded);
  });

  navigationLinks.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });
}

const arrivalFilters = findElements(".arrival-filter[data-filter]");
const arrivalCards = findElements(".product-card[data-categories]");

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

const initiallySelectedFilter = findElement(
  '.arrival-filter[aria-pressed="true"]',
);
if (initiallySelectedFilter) {
  filterArrivalCards(initiallySelectedFilter.dataset.filter);
}
