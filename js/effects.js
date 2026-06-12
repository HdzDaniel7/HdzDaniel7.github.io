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

/* Tilt 3D sutil: la tarjeta se inclina unos grados siguiendo al cursor.
   Solo en dispositivos con cursor fino y hover real; el CSS aplica
   --rx/--ry únicamente en :hover (ver styles.css). */
const fineHover = matchMedia("(hover: hover) and (pointer: fine)").matches;

function attachTilt(card, max = 2.5) {
  if (reducedMotion || !fineHover) return;
  card.addEventListener("mousemove", e => {
    const r = card.getBoundingClientRect();
    card.style.setProperty("--ry", (((e.clientX - r.left) / r.width) - .5) * max * 2 + "deg");
    card.style.setProperty("--rx", (.5 - ((e.clientY - r.top) / r.height)) * max * 2 + "deg");
  }, { passive: true });
  card.addEventListener("mouseleave", () => {
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
  });
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

/* Scroll-spy: marca en la nav el link de la sección visible */
function observeSections() {
  const links = document.querySelectorAll(".nav-links a[href*='#']");
  if (!links.length) return;
  const map = {};
  links.forEach(a => {
    const id = a.getAttribute("href").split("#")[1];
    if (id) map[id] = a;
  });
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      links.forEach(a => a.classList.remove("active"));
      if (map[en.target.id]) map[en.target.id].classList.add("active");
    });
  }, { rootMargin: "-30% 0px -55% 0px" });
  Object.keys(map).forEach(id => {
    const s = document.getElementById(id);
    if (s) io.observe(s);
  });
}

/* Línea de cota bajo la nav que avanza con el scroll */
function initScrollProgress() {
  const bar = document.querySelector(".nav-progress");
  if (!bar) return;
  let ticking = false;
  const update = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    ticking = false;
  };
  addEventListener("scroll", () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  update();
}
document.addEventListener("DOMContentLoaded", initScrollProgress);

/* Las animaciones ambientales (ticker, chispa de soldadura) se pausan
   cuando su sección sale de pantalla: menos ruido y menos batería */
function observeAmbient() {
  if (reducedMotion) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => en.target.classList.toggle("paused", !en.isIntersecting));
  });
  document.querySelectorAll(".ticker-wrap, .weld-divider").forEach(el => io.observe(el));
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
