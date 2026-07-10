
function setFooterYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
}

function revealOnLoad() {
  const reveals = document.querySelectorAll(".reveal");
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  reveals.forEach((el, index) => {
    if (prefersReducedMotion) {
      el.classList.add("reveal-in");
      return;
    }
    const delay = index * 60; // subtle stagger, ms
    window.setTimeout(() => {
      el.classList.add("reveal-in");
    }, delay);
  });
}

function initScrollProgress() {
  const fill = document.querySelector("[data-boot-fill]");
  if (!fill) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const enableProgressMode = () => {
    fill.setAttribute("data-progress-mode", "");
    updateProgress();
  };

  const updateProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    fill.style.width = pct + "%";
  };

  if (prefersReducedMotion) {
    enableProgressMode();
  } else {
    
    window.setTimeout(enableProgressMode, 1200);
  }

  window.addEventListener("scroll", updateProgress, { passive: true });
}

function initActiveNav() {
  const navLinks = Array.from(document.querySelectorAll(".nav-list a"));
  if (!navLinks.length) return;

  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (!("IntersectionObserver" in window) || !sections.length) return;

  const setActive = (id) => {
    navLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === "#" + id;
      if (isActive) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}


function initBackToTop() {
  const button = document.querySelector("[data-back-to-top]");
  if (!button) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const toggleVisibility = () => {
    button.hidden = window.scrollY < window.innerHeight * 0.6;
  };

  toggleVisibility();
  window.addEventListener("scroll", toggleVisibility, { passive: true });

  button.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  });
}

function initCopyEmail() {
  const button = document.querySelector("[data-copy-email]");
  if (!button) return;

  button.addEventListener("click", async () => {
    const email = button.getAttribute("data-copy-email");
    if (!email) return;

    try {
      await navigator.clipboard.writeText(email);
      button.classList.add("is-copied");
      const original = button.getAttribute("aria-label");
      button.setAttribute("aria-label", "Email address copied");
      window.setTimeout(() => {
        button.classList.remove("is-copied");
        if (original) button.setAttribute("aria-label", original);
      }, 1800);
    } catch (err) {
      
    }
  });
}


function initLightbox() {
  const lightbox = document.querySelector("[data-lightbox]");
  const lightboxImage = document.querySelector("[data-lightbox-image]");
  const closeBtn = document.querySelector("[data-lightbox-close]");
  const triggers = document.querySelectorAll("[data-lightbox-trigger]");

  if (!lightbox || !lightboxImage || !closeBtn || !triggers.length) return;

  let lastTrigger = null;

  const open = (trigger) => {
    const img = trigger.querySelector("img");
    if (!img) return;
    lastTrigger = trigger;
    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt;
    lightbox.hidden = false;
    closeBtn.focus();
    document.addEventListener("keydown", onKeydown);
  };

  const close = () => {
    lightbox.hidden = true;
    lightboxImage.src = "";
    document.removeEventListener("keydown", onKeydown);
    if (lastTrigger) lastTrigger.focus();
  };

  const onKeydown = (e) => {
    if (e.key === "Escape") close();
  };

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => open(trigger));
  });

  closeBtn.addEventListener("click", close);

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) close();
  });
}

document.addEventListener("DOMContentLoaded", () => {
 
  document.body.classList.remove("no-js");
  setFooterYear();
  revealOnLoad();
  initScrollProgress();
  initActiveNav();
  initBackToTop();
  initCopyEmail();
  initLightbox();
});