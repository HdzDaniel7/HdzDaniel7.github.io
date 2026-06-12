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
  navLanguages:  { es: "Idiomas",     en: "Languages" },
  navContact:    { es: "Contacto",    en: "Contact" },

  secDomains:    { es: "SEC.02 / MAPA DE SISTEMAS", en: "SEC.02 / SYSTEM MAP" },
  secExperience: { es: "SEC.03 / EXPERIENCIA", en: "SEC.03 / EXPERIENCE" },
  secProjects:   { es: "SEC.04 / PROYECTOS",   en: "SEC.04 / PROJECTS" },
  secSkills:     { es: "SEC.05 / HABILIDADES", en: "SEC.05 / SKILLS" },
  secEducation:  { es: "SEC.06 / EDUCACIÓN",   en: "SEC.06 / EDUCATION" },
  secLanguages:  { es: "SEC.07 / IDIOMAS",     en: "SEC.07 / LANGUAGES" },
  secContact:    { es: "SEC.08 / CONTACTO",    en: "SEC.08 / CONTACT" },

  domainsTitle:  { es: "Sistemas que **domino**", en: "Systems I **work with**" },

  /* frases humanas bajo cada encabezado de sección */
  subDomains: {
    es: "Tres frentes que se cruzan en cada proyecto: el proceso, el dato y la máquina.",
    en: "Three fronts that meet in every project: the process, the data, and the machine."
  },
  subExperience: {
    es: "Del piso de producción automotriz a las herramientas que lo miden.",
    en: "From the automotive shop floor to the tools that measure it."
  },
  subProjects: {
    es: "Sistemas construidos para resolver problemas reales — varios siguen en uso activo.",
    en: "Systems built to solve real problems — several remain in active use."
  },
  subSkills: {
    es: "Las herramientas que uso a diario, y las que estoy afilando.",
    en: "The tools I use daily, and the ones I'm sharpening."
  },
  bandEgel:      { es: "examen de egreso sobresaliente", en: "outstanding exit exam result" },
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
  skillsLegend: { es: "◌ = en desarrollo", en: "◌ = in progress" },
  rulerNow:   { es: "HOY", en: "NOW" },

  /* cajetín del footer (title block de plano) */
  ftProject: { es: "PROYECTO", en: "PROJECT" },
  ftDrawn:   { es: "DIBUJÓ",   en: "DRAWN BY" },
  ftDate:    { es: "FECHA",    en: "DATE" },
  ftScale:   { es: "ESCALA",   en: "SCALE" },
  ftRev:     { es: "REVISIÓN", en: "REVISION" },
  ftSheet:   { es: "HOJA",     en: "SHEET" },
  footerNote: { es: "HECHO A MANO, SIN PLANTILLAS", en: "HANDCRAFTED, NO TEMPLATES" }
};

/* idioma activo: localStorage → idioma del navegador → 'en' */
SITE.lang = localStorage.getItem("lang")
  || (navigator.language && navigator.language.startsWith("es") ? "es" : "en");

/* ── TEMA (paleta de color) ── */
SITE.themes = ["blueprint","ion", "coast", "phosphor", "ember",  "paper" ];
SITE.themeNames = {
  blueprint: "Blueprint", ion: "Ion", coast: "Costa", phosphor: "Salvia", ember: "Arcilla",
   paper: "Papel", 
};
/* sin preferencia guardada: respeta el modo claro/oscuro del sistema */
SITE.theme = localStorage.getItem("theme")
  || (matchMedia("(prefers-color-scheme: light)").matches ? "paper" : "blueprint");
/* aplicar de inmediato para evitar flash del tema default */
if (SITE.theme !== "blueprint") document.documentElement.dataset.theme = SITE.theme;

function setTheme(name) {
  SITE.theme = name;
  localStorage.setItem("theme", name);
  if (name === "blueprint") delete document.documentElement.dataset.theme;
  else document.documentElement.dataset.theme = name;
  renderThemeDots();
}

/* Botón con la muestra actual + menú desplegable de paletas.
   Conserva el nombre renderThemeDots para no romper a quien lo llama. */
function renderThemeDots() {
  const el = document.getElementById("theme-dots");
  if (!el) return;
  el.innerHTML = `
    <button type="button" class="theme-btn" onclick="toggleThemeMenu(event)"
      aria-haspopup="listbox" aria-expanded="false" aria-label="Cambiar paleta / Change palette">
      <span class="swatch" data-theme="${SITE.theme}"></span><span class="theme-name">${SITE.themeNames[SITE.theme]}</span>
      <span class="caret">▾</span>
    </button>
    <div class="theme-menu" hidden>
      ${SITE.themes.map(th => `
        <button type="button" class="theme-opt ${th === SITE.theme ? "active" : ""}" onclick="setTheme('${th}')">
          <span class="swatch" data-theme="${th}"></span>${SITE.themeNames[th]}
        </button>`).join("")}
    </div>`;
}

function toggleThemeMenu(e) {
  e.stopPropagation();
  const btn = e.currentTarget;
  const menu = btn.parentElement.querySelector(".theme-menu");
  const open = menu.hidden;
  menu.hidden = !open;
  btn.setAttribute("aria-expanded", open);
  if (open) {
    const close = () => {
      menu.hidden = true;
      btn.setAttribute("aria-expanded", "false");
      document.removeEventListener("click", close);
    };
    document.addEventListener("click", close);
  }
}

/* Interruptor segmentado ES│EN (lo usan index y project) */
function renderLangToggle() {
  const el = document.getElementById("lang-toggle");
  if (!el) return;
  el.innerHTML = `
    <span class="${SITE.lang === "es" ? "on" : ""}">ES</span>
    <span class="${SITE.lang === "en" ? "on" : ""}">EN</span>`;
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
