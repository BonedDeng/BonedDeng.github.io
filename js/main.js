// ---------------------------------------------------------
// Dark / light theme.
// The initial theme is applied inline in <head> to avoid a flash;
// here we only sync the icon and handle the toggle.
// ---------------------------------------------------------
(function () {
  const root = document.documentElement;
  const toggle = document.getElementById("theme-toggle");
  if (!toggle) return;
  const icon = toggle.querySelector(".theme-icon");

  function apply(theme) {
    root.setAttribute("data-theme", theme);
    icon.textContent = theme === "dark" ? "☀️" : "🌙";
  }

  apply(root.getAttribute("data-theme") || "light");

  toggle.addEventListener("click", function () {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    apply(next);
    localStorage.setItem("theme", next);
  });
})();

// ---------------------------------------------------------
// Scroll reveal — elements fade/rise in as they enter the viewport.
// Items that share a parent are staggered for a gentle cascade.
// ---------------------------------------------------------
(function () {
  const items = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  if (!items.length) return;

  function showAll() {
    items.forEach(function (el) { el.classList.add("is-visible"); });
  }

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced || !("IntersectionObserver" in window)) {
    showAll();
    return;
  }

  // stagger siblings: 0ms, 70ms, 140ms … capped so late cards don't lag
  const seen = new Map();
  items.forEach(function (el) {
    const n = seen.get(el.parentNode) || 0;
    seen.set(el.parentNode, n + 1);
    if (n) el.style.transitionDelay = Math.min(n, 3) * 70 + "ms";
  });

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0 });

  items.forEach(function (el) { observer.observe(el); });

  // Safety net: anything already on screen at load must never stay hidden
  // (e.g. very tall viewports, or a browser that throttles the observer).
  window.addEventListener("load", function () {
    items.forEach(function (el) {
      if (el.getBoundingClientRect().top < window.innerHeight) {
        el.classList.add("is-visible");
      }
    });
  });
})();

// ---------------------------------------------------------
// Nav: highlight the section currently in view
// ---------------------------------------------------------
(function () {
  const links = Array.prototype.slice.call(document.querySelectorAll(".nav-links a"));
  if (!links.length || !("IntersectionObserver" in window)) return;

  const byId = {};
  const sections = [];
  links.forEach(function (link) {
    const id = link.getAttribute("href").slice(1);
    const section = document.getElementById(id);
    if (!section) return;
    byId[id] = link;
    sections.push(section);
  });

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      links.forEach(function (l) { l.classList.remove("is-active"); });
      const link = byId[entry.target.id];
      if (link) link.classList.add("is-active");
    });
  }, { rootMargin: "-45% 0px -50% 0px" });

  sections.forEach(function (s) { observer.observe(s); });
})();

// ---------------------------------------------------------
// Auto-update footer year
// ---------------------------------------------------------
document.getElementById("year").textContent = new Date().getFullYear();

// ---------------------------------------------------------
// Visitor counter (counterapi.dev — free, no account, no cookies)
// Counts each browser once per session; shows nothing if the API is down.
// ---------------------------------------------------------
(function () {
  var box = document.getElementById("visits");
  var out = document.getElementById("visit-count");
  if (!box || !out) return;

  var base = "https://api.counterapi.dev/v1/boneddeng-site/visits/";
  // increment only once per browser session; otherwise just read the total
  var firstThisSession = !sessionStorage.getItem("counted");
  var url = firstThisSession ? base + "up" : base;

  fetch(url)
    .then(function (r) { return r.ok ? r.json() : Promise.reject(); })
    .then(function (d) {
      if (typeof d.count !== "number") return Promise.reject();
      if (firstThisSession) sessionStorage.setItem("counted", "1");
      out.textContent = d.count.toLocaleString();
      box.hidden = false;
    })
    .catch(function () { /* API unavailable — leave the counter hidden */ });
})();
