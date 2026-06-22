/* ══════════════════════════════════════════════════
   PÁGINA DE DETALLE — renderiza project.html?id=...
   ══════════════════════════════════════════════════ */

/* Extrae el ID de un video de YouTube desde una URL o lo deja tal cual
   si ya es un ID de 11 caracteres. */
function ytId(s) {
  const m = String(s).match(/(?:v=|youtu\.be\/|embed\/)([\w-]{11})/);
  return m ? m[1] : s;
}

/* Renderiza un item de media unificado {type, src, caption?}:
   imagen, video de YouTube o Vimeo. */
function mediaEmbed(m, alt) {
  if (m.type === "youtube")
    return `<div class="video-embed"><iframe src="https://www.youtube.com/embed/${ytId(m.src)}" title="${alt}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>`;
  if (m.type === "vimeo")
    return `<div class="video-embed"><iframe src="https://player.vimeo.com/video/${m.src}" title="${alt}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>`;
  return `<img src="${m.src}" alt="${alt}" loading="lazy">`;
}

function renderProjectPage() {
  const id = new URLSearchParams(location.search).get("id");
  const p = SITE.projects.find(x => x.id === id);
  const root = document.getElementById("project-root");

  // nav compartida
  document.getElementById("nav-links").innerHTML = "";
  renderLangToggle();
  renderThemeDots();

  if (!p) {
    root.innerHTML = `
      <a href="index.html" class="back-link">${t(SITE.ui.backHome)}</a>
      <p class="detail-long">${t(SITE.ui.notFound)}</p>`;
    return;
  }

  document.title = `${t(p.title)} — ${SITE.profile.fullName}`;
  const d = p.detail;

  /* Esquema unificado con retrocompatibilidad:
     - links[]: si no existe, se sintetiza desde repo (botón GitHub).
     - media[]: si no existe, se usa gallery (lista de imágenes). */
  const links = Array.isArray(p.links) && p.links.length
    ? p.links
    : (p.repo ? [{ label: SITE.ui.viewGithub, url: p.repo }] : []);
  const media = Array.isArray(d.media) && d.media.length
    ? d.media
    : (Array.isArray(d.gallery) ? d.gallery.map(src => ({ type: "image", src })) : []);

  root.innerHTML = `
    <a href="index.html#projects" class="back-link">${t(SITE.ui.backHome)}</a>
    <div class="detail-head">
      <p class="hero-fig">DWG-003 / ${p.id.toUpperCase()}</p>
      <h1>${t(p.title)}</h1>
      <div class="measure"><span class="ln"><i>${p.tags.join(" · ")}</i></span></div>
      <p class="detail-long">${md(d.long)}</p>
    </div>

    ${d.flow ? `
      <div class="flow" aria-label="${SITE.lang === "es" ? "Diagrama de bloques del sistema" : "System block diagram"}">
        ${d.flow.map(s => `<span class="flow-node">${t(s)}</span>`).join('<span class="flow-arrow" aria-hidden="true">→</span>')}
      </div>` : ""}

    <div class="detail-grid">
      <div class="bp-card">
        <span class="corner c1">+</span><span class="corner c2">+</span>
        <h3>${t(SITE.ui.highlights)}</h3>
        <ul>${d.highlights.map(h => `<li>${hl(h)}</li>`).join("")}</ul>
      </div>
      <div class="bp-card">
        <span class="corner c1">+</span><span class="corner c2">+</span>
        <h3>${t(SITE.ui.stack)}</h3>
        <div class="chips">${d.stack.map(s => `<span class="chip">${s}</span>`).join("")}</div>
        ${links.map(l => `<a href="${l.url}" target="_blank" rel="noopener" class="btn btn-ghost" style="margin-top:22px">${t(l.label) || l.url}</a>`).join("")}
      </div>
    </div>

    ${media.length ? `
      <div class="gallery">
        ${media.map(m => mediaEmbed(m, t(p.title))).join("")}
      </div>` : ""}

    <footer style="border:none;margin-top:60px"></footer>`;
}

/* El render lo dispara js/data-loader.js cuando los datos JSON
   ya están cargados en window.SITE (ver loadSiteData). */
