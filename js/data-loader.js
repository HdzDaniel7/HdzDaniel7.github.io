/* ══════════════════════════════════════════════════
   CARGADOR DE DATOS — lee data/*.json y arma window.SITE.
   Reemplaza a los antiguos <script src="data/*.js">.
   Cada archivo JSON corresponde a una clave de SITE.
   Tras cargar, dispara el render de la página activa.
   ══════════════════════════════════════════════════ */
window.SITE = window.SITE || {};

/* clave de SITE → archivo JSON */
const SITE_DATA_FILES = {
  profile:    "data/profile.json",
  domains:    "data/domains.json",
  ticker:     "data/ticker.json",
  experience: "data/experience.json",
  projects:   "data/projects.json",
  skills:     "data/skills.json",
  education:  "data/education.json",
  languages:  "data/languages.json"
};

/* Carga todos los JSON en paralelo y los asigna a SITE.
   Devuelve una promesa que resuelve cuando todo está listo. */
function loadSiteData() {
  const keys = Object.keys(SITE_DATA_FILES);
  return Promise.all(
    keys.map(k =>
      fetch(SITE_DATA_FILES[k]).then(r => {
        if (!r.ok) throw new Error(`${SITE_DATA_FILES[k]} → HTTP ${r.status}`);
        return r.json();
      })
    )
  ).then(results => {
    keys.forEach((k, i) => { SITE[k] = results[i]; });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadSiteData()
    .then(() => {
      document.documentElement.lang = SITE.lang;
      if (window.renderAll) renderAll();             // index.html
      if (window.renderProjectPage) renderProjectPage(); // project.html
    })
    .catch(err => {
      console.error("Error cargando datos del sitio:", err);
      document.body.insertAdjacentHTML("afterbegin",
        '<p style="padding:20px;font-family:monospace;color:#e66;background:#000">' +
        'No se pudieron cargar los datos. Si abriste el archivo con file://, ' +
        'sírvelo por HTTP (ej. <code>python -m http.server</code>).</p>');
    });
});
