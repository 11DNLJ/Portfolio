// why-me.js — drives counters on Why Me and shares counts with Goals

document.addEventListener("DOMContentLoaded", () => {
  // Animate all preset counters (default values in HTML)
  document.querySelectorAll(".counter").forEach(el => {
    animate(el, Number(el.dataset.target || 0), 1000);
  });

  /* ---------------- Projects Completed ---------------- */
  const projectsBuiltEl = document.getElementById("projects-built");
  if (projectsBuiltEl) {
    // 1) Try previously saved total from elsewhere
    try {
      const saved = JSON.parse(localStorage.getItem("projectCounts") || "{}");
      if (typeof saved.total === "number") animate(projectsBuiltEl, saved.total, 1000);
    } catch {}

    // 2) Fallback: count cards from projects.html
    fetch("../ProjectPage/projects.html")
      .then(r => { if (!r.ok) throw new Error("HTTP " + r.status); return r.text(); })
      .then(html => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        const count = doc.querySelectorAll(".project-card").length;
        animate(projectsBuiltEl, count, 1000);
      })
      .catch(err => console.warn("Could not load project count:", err));
  }

  /* ---------------- Certs/Skills Completed ---------------- */
  const certsEl = document.getElementById("certs-completed");
  const skillsCompleted = document.querySelectorAll("#cert-list li").length;
  if (certsEl) animate(certsEl, skillsCompleted, 1000);

  /* ---------------- Languages / Currently Learning ---------------- */
  const langsEl = document.getElementById("languages-learning");
  const learningItems = document.querySelectorAll("#learning-list li");
  const currentlyLearning = learningItems.length;
  const languagesLearning = Array.from(learningItems).filter(li => /language/i.test(li.textContent)).length;
  if (langsEl) animate(langsEl, languagesLearning, 1000);

  /* ---------------- Share counts with Goals page ---------------- */
  try {
    const payload = {
      skillsCompleted,          // from #cert-list li
      currentlyLearning,        // total learning tags
      languagesLearning,        // subset with "(Language)"
      ts: Date.now()
    };
    localStorage.setItem("whyme_counts", JSON.stringify(payload));
  } catch (e) {
    console.warn("Could not save whyme_counts:", e);
  }
});

/* -------- Animation helper -------- */
function animate(el, target, duration) {
  const start = performance.now();
  function step(now) {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
    el.textContent = Math.floor(eased * target).toString();
    if (t < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
