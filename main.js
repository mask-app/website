const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    }
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

const headerLinks = document.querySelectorAll("nav a[href^='#']");
const sections = [...headerLinks]
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

window.addEventListener(
  "scroll",
  () => {
    const anchor = sections.find((section) => {
      const rect = section.getBoundingClientRect();
      return rect.top <= 120 && rect.bottom >= 120;
    });

    if (!anchor) return;

    headerLinks.forEach((link) => {
      const active = link.getAttribute("href") === `#${anchor.id}`;
      link.style.background = active ? "rgba(255,255,255,0.08)" : "";
      link.style.color = active ? "#e9eeff" : "";
    });
  },
  { passive: true }
);
