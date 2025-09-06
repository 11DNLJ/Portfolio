// goal.js — reads counts from Why Me and displays overall percentage

document.addEventListener("DOMContentLoaded", () => {
  updateOverallFromWhyMe();
});

async function updateOverallFromWhyMe() {
  const overallPercentEl = document.getElementById("overall-percent");
  const overallBarEl     = document.getElementById("overall-bar");
  if (!overallPercentEl || !overallBarEl) return;

  // 1) Fast path: read counts saved by why-me.js
  let counts = null;
  try {
    counts = JSON.parse(localStorage.getItem("whyme_counts") || "null");
  } catch {}

  if (isValid(counts)) {
    renderOverall(counts);
    return;
  }

  // 2) Fallback: parse Why Me HTML directly
  const tryPaths = ["../whyme/why-me.html", "why-me.html", "../why-me.html"];
  for (const path of tryPaths) {
    try {
      const r = await fetch(path, { cache: "no-store" });
      if (!r.ok) continue;
      const html = await r.text();
      const doc = new DOMParser().parseFromString(html, "text/html");
      const skillsCompleted   = doc.querySelectorAll("#cert-list li").length;
      const currentlyLearning = doc.querySelectorAll("#learning-list li").length;
      if (Number.isFinite(skillsCompleted) && Number.isFinite(currentlyLearning)) {
        counts = { skillsCompleted, currentlyLearning };
        renderOverall(counts);
        return;
      }
    } catch {}
  }

  // 3) Last resort → 0%
  renderOverall({ skillsCompleted: 0, currentlyLearning: 0 });

  function isValid(c){
    return c && typeof c.skillsCompleted === "number" && typeof c.currentlyLearning === "number";
  }
  function renderOverall({ skillsCompleted, currentlyLearning }){
    const denom = Math.max(1, Number(currentlyLearning) || 0); // avoid /0
    const pct = Math.min(100, Math.round((Number(skillsCompleted) / denom) * 100));
    overallPercentEl.textContent = `${pct}%`;
    overallBarEl.style.width = `${pct}%`;
  }
}
