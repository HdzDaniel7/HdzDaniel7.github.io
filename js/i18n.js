/* ══════════════════════════════════════════════════
   i18n — idioma activo, textos de interfaz y helper t()
   ══════════════════════════════════════════════════ */
window.SITE = window.SITE || {};

/* Textos fijos de la interfaz (no son datos del CV) */
SITE.ui = {
  navDomains:    { es: "Sistemas",    en: "Systems" },
  navExperience: { es: "Experiencia", en: "Experience" },
  navProjects:   { es: "Proyectos",   en: "Projects" },
  navSkills:     { es: "Habilidades", en: "Skills" },
  navEducation:  { es: "Educación",   en: "Education" },
  navContact:    { es: "Contacto",    en: "Contact" },

  secDomains:    { es: "SEC.02 / MAPA DE SISTEMAS", en: "SEC.02 / SYSTEM MAP" },
  secExperience: { es: "SEC.03 / EXPERIENCIA", en: "SEC.03 / EXPERIENCE" },
  secProjects:   { es: "SEC.04 / PROYECTOS",   en: "SEC.04 / PROJECTS" },
  secSkills:     { es: "SEC.05 / HABILIDADES", en: "SEC.05 / SKILLS" },
  secEducation:  { es: "SEC.06 / EDUCACIÓN",   en: "SEC.06 / EDUCATION" },
  secContact:    { es: "SEC.07 / CONTACTO",    en: "SEC.07 / CONTACT" },

  domainsTitle:  { es: "Sistemas que **domino**", en: "Systems I **work with**" },
  bandYears:     { es: "años de formación", en: "years of training" },
  bandProjects:  { es: "proyectos documentados", en: "documented projects" },
  bandCerts:     { es: "certificaciones", en: "certifications" },
  bandLangs:     { es: "idiomas", en: "languages" },
  expHint:       { es: "// selecciona un registro", en: "// select a record" },

  heroFig:    { es: "FIG. 01 — PERFIL / INGENIERO MECATRÓNICO", en: "FIG. 01 — PROFILE / MECHATRONICS ENGINEER" },
  ctaContact: { es: "Contáctame", en: "Get in touch" },
  viewGithub: { es: "Ver en GitHub", en: "View on GitHub" },
  viewDetail: { es: "Ver proyecto", en: "View project" },
  backHome:   { es: "← Volver al inicio", en: "← Back to home" },
  highlights: { es: "Puntos clave", en: "Highlights" },
  stack:      { es: "Stack técnico", en: "Tech stack" },
  notFound:   { es: "Proyecto no encontrado.", en: "Project not found." },
  footerRev:  { es: "REV 2.0 — 2026 · HECHO A MANO, SIN PLANTILLAS", en: "REV 2.0 — 2026 · HANDCRAFTED, NO TEMPLATES" }
};

/* idioma activo: localStorage → idioma del navegador → 'en' */
SITE.lang = localStorage.getItem("lang")
  || (navigator.language && navigator.language.startsWith("es") ? "es" : "en");

/* ── TEMA (paleta de color) ── */
SITE.themes = ["blueprint", "phosphor", "ember", "ion"];
SITE.theme = localStorage.getItem("theme") || "blueprint";
/* aplicar de inmediato para evitar flash del tema default */
if (SITE.theme !== "blueprint") document.documentElement.dataset.theme = SITE.theme;

function setTheme(name) {
  SITE.theme = name;
  localStorage.setItem("theme", name);
  if (name === "blueprint") delete document.documentElement.dataset.theme;
  else document.documentElement.dataset.theme = name;
  renderThemeDots();
}

function renderThemeDots() {
  const el = document.getElementById("theme-dots");
  if (!el) return;
  el.innerHTML = SITE.themes.map(th => `
    <button type="button" class="theme-dot ${th === SITE.theme ? "active" : ""}"
      data-theme="${th}" onclick="setTheme('${th}')"
      aria-label="Tema ${th}" title="${th}"></button>`).join("");
}

/* t(x): devuelve el texto en el idioma activo.
   Acepta strings planos (los regresa tal cual) u objetos {es,en}. */
function t(x) {
  if (x == null) return "";
  if (typeof x === "string") return x;
  return x[SITE.lang] || x.en || x.es || "";
}

/* hl(texto): convierte **resaltado** en <span class="hl"> */
function hl(text) {
  return t(text).replace(/\*\*(.+?)\*\*/g, '<span class="hl">$1</span>');
}

function toggleLang() {
  SITE.lang = SITE.lang === "es" ? "en" : "es";
  localStorage.setItem("lang", SITE.lang);
  document.documentElement.lang = SITE.lang;
  if (window.renderAll) renderAll();
  if (window.renderProjectPage) renderProjectPage();
}
