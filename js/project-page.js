/* ══════════════════════════════════════════════════
   PÁGINA DE DETALLE — renderiza project.html?id=...
   ══════════════════════════════════════════════════ */

function renderProjectPage() {
  const id = new URLSearchParams(location.search).get("id");
  const p = SITE.projects.find(x => x.id === id);
  const root = document.getElementById("project-root");

  // nav compartida
  document.getElementById("nav-links").innerHTML = "";
  document.getElementById("lang-toggle").innerHTML =
    SITE.lang === "es" ? "<b>ES</b> / EN" : "ES / <b>EN</b>";
  renderThemeDots();

  if (!p) {
    root.innerHTML = `
      <a href="index.html" class="back-link">${t(SITE.ui.backHome)}</a>
      <p class="detail-long">${t(SITE.ui.notFound)}</p>`;
    return;
  }

  document.title = `${t(p.title)} — ${SITE.profile.fullName}`;
  const d = p.detail;

  root.innerHTML = `
    <a href="index.html#projects" class="back-link">${t(SITE.ui.backHome)}</a>
    <div class="detail-head">
      <p class="hero-fig">DWG-003 / ${p.id.toUpperCase()}</p>
      <h1>${t(p.title)}</h1>
      <div class="measure"><span class="ln"><i>${p.tags.join(" · ")}</i></span></div>
      <p class="detail-long">${t(d.long)}</p>
    </div>

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
        ${p.repo ? `<a href="${p.repo}" target="_blank" rel="noopener" class="btn btn-ghost" style="margin-top:22px">${t(SITE.ui.viewGithub)}</a>` : ""}
      </div>
    </div>

    ${d.gallery.length ? `
      <div class="gallery">
        ${d.gallery.map(src => `<img src="${src}" alt="${t(p.title)}" loading="lazy">`).join("")}
      </div>` : ""}

    <footer style="border:none;margin-top:60px"></footer>`;
}

document.addEventListener("DOMContentLoaded", () => {
  document.documentElement.lang = SITE.lang;
  renderProjectPage();
});
