// ProjectPage/projects.js
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".projects-grid");

  // Run once on load
  recomputeAndRender();

  // Keep stats in sync if cards change
  if (grid) {
    const obs = new MutationObserver(recomputeAndRender);
    obs.observe(grid, { childList: true, subtree: true });
  }
});

/* -------- helpers -------- */
function qs(id) { return document.getElementById(id); }

function animateTo(el, target, ms = 800) {
  if (!el) return;
  const start = performance.now();
  const from  = Number(el.textContent) || 0;
  const delta = target - from;

  function frame(now) {
    const t = Math.min(1, (now - start) / ms);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = Math.floor(from + eased * delta);
    if (t < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

function recomputeAndRender() {
  const cards       = document.querySelectorAll(".project-card");
  const total       = cards.length;
  const completed   = document.querySelectorAll('.project-card[data-status="completed"]').length;
  const inProgress  = document.querySelectorAll('.project-card[data-status="in-progress"]').length;

  animateTo(qs("stat-total"),     total);
  animateTo(qs("stat-completed"), completed);
  animateTo(qs("stat-progress"),  inProgress);

  try {
    localStorage.setItem(
      "projectCounts",
      JSON.stringify({ total, completed, inProgress, ts: Date.now() })
    );
  } catch (_) {}
}
