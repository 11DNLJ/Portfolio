// Animate progress bars
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".goal").forEach(card => {
    const target = Number(card.getAttribute("data-progress") || 0);
    const bar = card.querySelector(".bar-fill");
    const pct = card.querySelector(".pct");
    animate(bar, pct, target, 1200);
  });
});

function animate(barEl, pctEl, target, duration){
  const start = performance.now();
  function tick(now){
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
    const val = Math.round(eased * target);
    barEl.style.width = val + "%";
    pctEl.textContent = val + "%";
    if (t < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
