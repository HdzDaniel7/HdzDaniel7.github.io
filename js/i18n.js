/* ══════════════════════════════════════════════════
   i18n — idioma activo, textos de interfaz y helper t()
   ══════════════════════════════════════════════════ */
window.SITE = window.SITE || {};

/* Los textos fijos de interfaz (SITE.ui) ahora viven en data/ui.json y los
   carga js/data-loader.js antes de renderizar (editables desde el editor). */

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

/* Markdown ligero → HTML. Pensado para contenido propio del sitio (no escapa
   HTML). Reglas, en orden seguro:
     [texto](https://url)  → enlace (target=_blank)
     **texto**             → <span class="hl">  (resaltado, firma del sitio)
     *texto*               → <em> (cursiva)
     renglones que empiezan con "- " → lista <ul><li>
     saltos de línea restantes → <br>
   El contenido de una sola línea con solo **negrita** se renderiza igual que
   antes, así que es retrocompatible con todo el contenido existente. */
function mdLite(text) {
  let s = t(text);
  s = s.replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g,
                '<a href="$2" target="_blank" rel="noopener">$1</a>');
  s = s.replace(/\*\*(.+?)\*\*/g, '<span class="hl">$1</span>');
  s = s.replace(/\*([^*\n]+?)\*/g, '<em>$1</em>');
  s = s.replace(/(?:^|\n)((?:- [^\n]*(?:\n|$))+)/g, block => {
    const items = block.trim().split("\n").map(l => l.replace(/^- /, "").trim());
    return "<ul>" + items.map(i => "<li>" + i + "</li>").join("") + "</ul>";
  });
  s = s.replace(/\n/g, "<br>");
  return s;
}

/* hl() (resaltado) y md() comparten el mismo motor de Markdown ligero. */
var hl = mdLite;
var md = mdLite;

function toggleLang() {
  SITE.lang = SITE.lang === "es" ? "en" : "es";
  localStorage.setItem("lang", SITE.lang);
  document.documentElement.lang = SITE.lang;
  if (window.renderAll) renderAll();
  if (window.renderProjectPage) renderProjectPage();
}
