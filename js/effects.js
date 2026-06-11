/* ══════════════════════════════════════════════════
   EFECTOS — rejilla interactiva, contadores, reveals.
   Todos respetan prefers-reduced-motion.
   ══════════════════════════════════════════════════ */

const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* La rejilla se ilumina siguiendo el cursor */
if (!reducedMotion) {
  addEventListener("mousemove", e => {
    const glow = document.querySelector(".gridglow");
    if (!glow) return;
    glow.style.setProperty("--mx", e.clientX + "px");
    glow.style.setProperty("--my", e.clientY + "px");
  }, { passive: true });
}

/* Contadores animados: cualquier elemento con data-count
   anima cuando entra en pantalla (hero y banda de stats) */
function observeCounters() {
  const els = document.querySelectorAll("[data-count]:not([data-done])");
  if (reducedMotion) {
    els.forEach(el => {
      el.textContent = (el.dataset.prefix || "") + el.dataset.count + (el.dataset.suffix || "");
      el.dataset.done = "1";
    });
    return;
  }
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const el = en.target;
      io.unobserve(el);
      if (el.dataset.done) return;
      el.dataset.done = "1";
      const n = +el.dataset.count, pre = el.dataset.prefix || "", suf = el.dataset.suffix || "";
      let t0 = null;
      const step = ts => {
        t0 ??= ts;
        const p = Math.min((ts - t0) / 1200, 1);
        el.textContent = pre + Math.round(n * (1 - Math.pow(1 - p, 3))) + suf;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }, { threshold: 0.4 });
  els.forEach(el => io.observe(el));
}

/* Aparición sutil de tarjetas al hacer scroll */
function observeReveals() {
  if (reducedMotion) {
    document.querySelectorAll(".reveal").forEach(el => el.classList.add("visible"));
    return;
  }
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  document.querySelectorAll(".reveal:not(.visible)").forEach(el => io.observe(el));
}
