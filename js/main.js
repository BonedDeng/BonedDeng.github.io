// ---------------------------------------------------------
// Dark / light theme with persistence + system preference
// ---------------------------------------------------------
(function () {
  const root = document.documentElement;
  const toggle = document.getElementById("theme-toggle");
  const icon = toggle.querySelector(".theme-icon");

  const stored = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initial = stored || (prefersDark ? "dark" : "light");

  function apply(theme) {
    root.setAttribute("data-theme", theme);
    icon.textContent = theme === "dark" ? "☀️" : "🌙";
  }

  apply(initial);

  toggle.addEventListener("click", function () {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    apply(next);
    localStorage.setItem("theme", next);
  });
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
