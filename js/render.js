/* ══════════════════════════════════════════════════
   RENDER — pinta los datos de /data en la página.
   No edites esto para cambiar contenido: edita /data.
   ══════════════════════════════════════════════════ */

/* Íconos SVG (estilo lucide, trazo consistente).
   Para agregar uno: añade una entrada y úsala en projects.js / domains.js */
const ICONS = {
  gear: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>',
  music: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>',
  chip: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3"/></svg>',
  cpu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="5" y="5" width="14" height="14" rx="2"/><path d="M9 9h6v6H9zM9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/></svg>',
  cube: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"/></svg>',
  chart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 3v18h18"/><path d="M7 14l4-4 3 3 5-6"/></svg>',
  robot: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="5" y="9" width="14" height="10" rx="2"/><path d="M12 4v5M12 4a1.5 1.5 0 1 0-.01-3.01A1.5 1.5 0 0 0 12 4zM2 13v3M22 13v3"/><circle cx="9" cy="13.5" r="1"/><circle cx="15" cy="13.5" r="1"/><path d="M9.5 16.5h5"/></svg>',
  spark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M13 2L4.5 13.5H11L9 22l8.5-11.5H11L13 2z"/></svg>',
  code: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/></svg>',
  wrench: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
  github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12.02c0 4.42 2.87 8.18 6.84 9.5.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03a9.56 9.56 0 0 1 5.01 0c1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.7-4.57 4.94.36.31.68.92.68 1.86 0 1.34-.01 2.42-.01 2.75 0 .27.18.58.69.48A10.02 10.02 0 0 0 22 12.02C22 6.48 17.52 2 12 2z"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 6L2 7"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>'
};

const $ = id => document.getElementById(id);

/* ── Diagrama del hero: brazo robótico de soldadura, dibujado en SVG ── */
function robotArmSVG() {
  return `
  <svg viewBox="0 0 420 380" role="img" aria-label="Technical diagram of a robotic welding arm">
    <!-- retícula de referencia -->
    <line class="stroke-soft" x1="20" y1="350" x2="400" y2="350"/>
    <line class="stroke-soft" x1="40" y1="40" x2="40" y2="365" stroke-dasharray="3 5"/>
    <text class="label" x="46" y="52">Y</text>
    <text class="label" x="390" y="344">X</text>

    <!-- línea de cota radio de alcance -->
    <path class="stroke-soft" d="M210 330 A 175 175 0 0 1 360 180" stroke-dasharray="4 6"/>
    <text class="label" x="330" y="262">R=420</text>

    <!-- base -->
    <rect class="stroke draw-path" x="160" y="330" width="100" height="16" rx="2"/>
    <line class="stroke draw-path" x1="150" y1="350" x2="270" y2="350"/>

    <!-- engrane en la base (dasharray = dientes) -->
    <g class="gear">
      <circle cx="210" cy="318" r="17" fill="none" stroke="var(--accent-3)" stroke-width="7" stroke-dasharray="5 4" opacity=".85"/>
    </g>
    <circle class="joint" cx="210" cy="318" r="7"/>

    <!-- segmento 1 -->
    <line class="stroke draw-path" x1="210" y1="318" x2="158" y2="208"/>
    <circle class="joint" cx="158" cy="208" r="9"/>
    <text class="label label-accent" x="128" y="200">J2</text>
    <text class="label label-accent" x="222" y="300">J1</text>

    <!-- segmento 2 -->
    <line class="stroke draw-path" x1="158" y1="208" x2="262" y2="128"/>
    <circle class="joint" cx="262" cy="128" r="8"/>
    <text class="label label-accent" x="270" y="118">J3</text>

    <!-- efector final / antorcha -->
    <path class="stroke draw-path" d="M262 128 L300 110 M262 128 L296 140"/>
    <path class="stroke-cyan draw-path" d="M300 110 L314 104 M296 140 L310 144"/>

    <!-- crosshair de visión sobre el efector -->
    <circle class="stroke-cyan" cx="318" cy="122" r="22" fill="none" opacity=".5"/>
    <path class="stroke-cyan" d="M318 92 v14 M318 138 v14 M288 122 h14 M334 122 h14" opacity=".5"/>
    <circle class="scan-dot" cx="318" cy="122" r="3" fill="var(--accent-2)"/>

    <!-- chispas de soldadura -->
    <g class="spark">
      <path d="M318 122 l10 -14 M318 122 l16 -4 M318 122 l12 12 M318 122 l2 18" stroke="var(--accent-3)" stroke-width="1.5" fill="none"/>
      <circle cx="318" cy="122" r="1.8" fill="var(--accent-3)"/>
    </g>

    <!-- cotas verticales -->
    <path class="stroke-soft" d="M70 208 h78" stroke-dasharray="3 4"/>
    <path class="stroke-soft" d="M70 318 v-110" />
    <path class="stroke-soft" d="M65 208 h10 M65 318 h10"/>
    <text class="label" x="48" y="266" transform="rotate(-90 48 266)">110mm</text>
  </svg>`;
}

function renderNav() {
  const u = SITE.ui;
  /* numerados como las secciones del plano (SEC.02, SEC.03…) */
  const links = [
    ["02", "domains", u.navDomains],
    ["03", "experience", u.navExperience],
    ["04", "projects", u.navProjects],
    ["05", "skills", u.navSkills],
    ["06", "education", u.navEducation],
    ["07", "languages", u.navLanguages],
    ["08", "contact", u.navContact]
  ];
  $("nav-links").innerHTML = links.map(([n, id, label]) =>
    `<li><a href="index.html#${id}"><i>${n}</i>${t(label)}</a></li>`).join("");
  renderLangToggle();
  if (window.renderThemeDots) renderThemeDots();
}

function renderHero() {
  const p = SITE.profile;
  $("hero").innerHTML = `
    <div class="hero-grid">
      <div>
        <p class="hero-fig">${t(SITE.ui.heroFig)}</p>
        <h1>${p.firstName}<br>${p.lastName.split(" ")[0]} <span>${p.lastName.split(" ").slice(1).join(" ")}</span></h1>
        <div class="measure"><span class="ln"><i>${t(p.measureLabel)}</i></span></div>
        <p class="hero-sub">${p.taglines.map(l => hl(l)).join("<br>")}</p>
        <div class="dims">
          ${p.stats.map(s => `
            <div><b data-count="${s.value}" data-prefix="${s.prefix}" data-suffix="${s.suffix}">${s.prefix}0</b>
            <small>${t(s.label)}</small></div>`).join("")}
        </div>
        <div class="hero-cta">
          <a href="#contact" class="btn btn-primary">${t(SITE.ui.ctaContact)} ${ICONS.arrow}</a>
          <a href="${p.social.github.url}" target="_blank" rel="noopener" class="btn btn-ghost">${ICONS.github} GitHub</a>
        </div>
      </div>
      <div class="hero-diagram">
        ${robotArmSVG()}
        <div class="readout r1"><small>WELD TEMP</small>642°C</div>
        <div class="readout r2"><small>CYCLE</small>18.2s ▾40%</div>
        <div class="readout r3"><small>VISION</small>ISO 13919-1 ✓</div>
      </div>
    </div>`;
}

function renderTicker() {
  const items = SITE.ticker.map(x => `<span>${x}</span>`).join("");
  // contenido duplicado para el loop infinito sin cortes
  $("ticker").innerHTML = `<div class="ticker">${items}${items}</div>`;
}

function renderDomains() {
  $("domains").innerHTML = `
    <div class="sec-head"><h2>${t(SITE.ui.secDomains)}</h2><span>DWG-002</span></div>
    <h2 class="sec-title">${hl(SITE.ui.domainsTitle)}</h2>
    <p class="sec-sub">${t(SITE.ui.subDomains)}</p>
    <div class="domains-grid">
      ${SITE.domains.map(d => `
        <div class="domain-card reveal">
          <span class="corner c1">+</span><span class="corner c2">+</span>
          <div class="domain-head">
            <div class="domain-icon">${ICONS[d.icon] || ICONS.cube}</div>
            <span class="domain-code">${d.code}</span>
          </div>
          <h3>${t(d.name)}</h3>
          <p>${t(d.desc)}</p>
        </div>`).join("")}
    </div>`;
  // spotlight que sigue al cursor dentro de cada tarjeta + tilt 3D
  document.querySelectorAll(".domain-card").forEach(c => {
    c.addEventListener("mousemove", e => {
      const r = c.getBoundingClientRect();
      c.style.setProperty("--x", (e.clientX - r.left) + "px");
      c.style.setProperty("--y", (e.clientY - r.top) + "px");
    }, { passive: true });
    if (window.attachTilt) attachTilt(c);
  });
}

/* Experiencia con tabs: riel de roles + panel de detalle */
let expActive = 0;

function renderExpPanel() {
  const e = SITE.experience[expActive];
  $("exp-panel").innerHTML = `
    <article class="exp-detail">
      <h3>${t(e.role)}</h3>
      <p class="exp-meta">${t(e.company).toUpperCase()} · ${e.location.toUpperCase()} <em>[${t(e.period)}]</em></p>
      <ul>${e.bullets.map(b => `<li>${hl(b)}</li>`).join("")}</ul>
    </article>`;
  document.querySelectorAll(".exp-tab").forEach((tab, i) =>
    tab.classList.toggle("active", i === expActive));
}

function selectExp(i) { expActive = i; renderExpPanel(); }

function renderExperience() {
  /* regla de años: del primer año registrado a HOY (o al último año) */
  const years = SITE.experience.flatMap(e => (t(e.period).match(/20\d\d/g) || []).map(Number));
  const hasNow = SITE.experience.some(e => /PRESENTE|PRESENT/i.test(t(e.period)));
  const top = hasNow ? t(SITE.ui.rulerNow) : Math.max(...years);
  const bottom = Math.min(...years);

  $("experience").innerHTML = `
    <div class="sec-head"><h2>${t(SITE.ui.secExperience)}</h2><span>DWG-003 · ${SITE.experience.length} ${SITE.lang === "es" ? "REGISTROS" : "RECORDS"}</span></div>
    <p class="sec-sub">${t(SITE.ui.subExperience)}</p>
    <div class="exp-layout">
      <div class="exp-side">
        <div class="exp-ruler" aria-hidden="true"><span>${top}</span><span>${bottom}</span></div>
        <div class="exp-rail">
          <p class="exp-hint">${t(SITE.ui.expHint)}</p>
          ${SITE.experience.map((e, i) => `
            <button type="button" class="exp-tab" onclick="selectExp(${i})">
              <span class="idx">${String(i + 1).padStart(2, "0")}</span>
              <span><span class="role">${t(e.role)}</span><span class="co">${t(e.company)} · ${t(e.period)}</span></span>
            </button>`).join("")}
        </div>
      </div>
      <div class="exp-panel" id="exp-panel"></div>
    </div>`;
  if (expActive >= SITE.experience.length) expActive = 0;
  renderExpPanel();
}

/* Banda diagonal de stats globales (se calculan solos).
   Un stat con `text` se muestra tal cual, sin contador animado. */
function renderBand() {
  const stats = [
    { text: "EGEL ★", label: SITE.ui.bandEgel },
    { n: SITE.projects.length, pre: "", label: SITE.ui.bandProjects },
    { n: SITE.education.length, pre: "", label: SITE.ui.bandCerts },
    { n: SITE.languages.length, pre: "", label: SITE.ui.bandLangs }
  ];
  $("band").innerHTML = `
    <div class="band-inner">
      ${stats.map(s => `
        <div class="band-stat">
          ${s.text
            ? `<b>${s.text}</b>`
            : `<b data-count="${s.n}" data-prefix="${s.pre}" data-suffix="">${s.pre}0</b>`}
          <small>${t(s.label)}</small>
        </div>`).join("")}
    </div>`;
}

function renderProjects() {
  $("projects").innerHTML = `
    <div class="sec-head"><h2>${t(SITE.ui.secProjects)}</h2><span>DWG-004 · ${SITE.projects.length} ${SITE.lang === "es" ? "UNIDADES" : "UNITS"}</span></div>
    <p class="sec-sub">${t(SITE.ui.subProjects)}</p>
    <div class="projects-grid">
      ${SITE.projects.map((p, i) => `
        <a href="project.html?id=${p.id}" class="bp-card project-card reveal ${i === 0 ? "featured" : ""}">
          <span class="corner c1">+</span><span class="corner c2">+</span>
          <span class="project-num">${String(i + 1).padStart(2, "0")}</span>
          <div class="project-body">
            <div class="project-icon">${ICONS[p.icon] || ICONS.cube}</div>
            <h3>${t(p.title)}</h3>
            <p>${t(p.desc)}</p>
            <div class="tags">${p.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}</div>
            <span class="project-more">${t(SITE.ui.viewDetail)} →</span>
          </div>
          ${p.img ? `<figure class="project-fig"><img src="${p.img}" alt="${t(p.title)}" loading="lazy"></figure>` : ""}
        </a>`).join("")}
    </div>`;
  if (window.attachTilt)
    document.querySelectorAll(".project-card").forEach(c => attachTilt(c));
}

function renderSkills() {
  $("skills").innerHTML = `
    <div class="sec-head"><h2>${t(SITE.ui.secSkills)}</h2><span>DWG-005</span></div>
    <p class="sec-sub">${t(SITE.ui.subSkills)}</p>
    <div class="skills-grid">
      ${SITE.skills.map(g => `
        <div class="bp-card skill-group reveal">
          <span class="corner c1">+</span><span class="corner c2">+</span>
          <h3>${t(g.group)}</h3>
          <div class="chips">${g.items.map(s => `<span class="chip ${s.level}">${s.name}</span>`).join("")}</div>
        </div>`).join("")}
    </div>
    <p class="skills-note">${t(SITE.ui.skillsLegend)}</p>`;
}

function renderEducation() {
  $("education").innerHTML = `
    <div class="sec-head"><h2>${t(SITE.ui.secEducation)}</h2><span>DWG-006</span></div>
    <div class="bp-card edu-rows reveal">
      <span class="corner c1">+</span><span class="corner c2">+</span>
      ${SITE.education.map((e, i) => `
        <div class="edu-row ${e.highlight ? "highlight" : ""}">
          <span class="edu-num">${String(i + 1).padStart(2, "0")}</span>
          <div>
            <h3>${t(e.name)}</h3>
            ${e.note ? `<span class="edu-note">★ ${t(e.note)}</span>` : ""}
          </div>
          <span class="edu-meta">${t(e.meta)}</span>
        </div>`).join("")}
    </div>`;
}

/* Idiomas: escala CEFR (A1…C2) como regla de calibración */
function renderLanguages() {
  const CEFR = ["A1", "A2", "B1", "B2", "C1", "C2"];
  $("languages").innerHTML = `
    <div class="sec-head"><h2>${t(SITE.ui.secLanguages)}</h2><span>DWG-007 · ${SITE.languages.length} ${SITE.lang === "es" ? "REGISTROS" : "RECORDS"}</span></div>
    <div class="bp-card lang-rows reveal">
      <span class="corner c1">+</span><span class="corner c2">+</span>
      ${SITE.languages.map((l, i) => `
        <div class="lang-row">
          <span class="lang-num">${String(i + 1).padStart(2, "0")}</span>
          <div>
            <h3>${t(l.name)}</h3>
            <span class="lang-level">${t(l.level)}</span>
          </div>
          <div class="lang-scale" role="img" aria-label="${t(l.name)}: ${t(l.level)}">
            ${CEFR.map((_, n) => `<i class="${n < l.cefr ? "on" : ""}"></i>`).join("")}
            <small>${l.native ? "C2+" : CEFR[l.cefr - 1]}</small>
          </div>
        </div>`).join("")}
    </div>`;
}

/* Divisores de soldadura: cordón de arcos superpuestos + destello viajero */
function renderWeldDividers() {
  document.querySelectorAll(".weld-divider").forEach(div => {
    let path = "";
    for (let x = 0; x < 1200; x += 16) path += `M${x} 19 A11 11 0 0 1 ${x + 24} 19 `;
    div.innerHTML = `
      <svg viewBox="0 0 1200 26" preserveAspectRatio="none" aria-hidden="true">
        <line class="base" x1="0" y1="19" x2="1200" y2="19"/>
        <path class="bead" d="${path}"/>
      </svg>
      <span class="weld-spark"></span>`;
  });
}

function renderContact() {
  const p = SITE.profile;
  const links = [
    { ...p.social.linkedin, icon: ICONS.linkedin },
    { ...p.social.github, icon: ICONS.github },
    { ...p.social.email, icon: ICONS.mail }
  ];
  $("contact").innerHTML = `
    <div class="sec-head"><h2>${t(SITE.ui.secContact)}</h2><span>DWG-008 · ${SITE.lang === "es" ? "FIN DEL PLANO" : "END OF DRAWING"}</span></div>
    <div class="contact-panel reveal ${p.photo ? "has-photo" : ""}">
      <span class="corner c1">+</span><span class="corner c2">+</span>
      <div class="contact-body">
        <p class="contact-desc">${t(p.contactIntro)}</p>
        <div class="social-grid">
          ${links.map(l => `
            <a href="${l.url}" target="_blank" rel="noopener" class="social-link">
              ${l.icon}
              <span><span class="social-label">${l.label}</span><span class="social-handle">${l.handle}</span></span>
            </a>`).join("")}
        </div>
      </div>
      ${p.photo ? `
        <figure class="contact-photo">
          <img src="${p.photo}" alt="${p.fullName}">
          <figcaption>FIG. 08 — ${t(p.role)}</figcaption>
        </figure>` : ""}
    </div>`;
}

/* Footer como cajetín de plano (title block) */
function renderFooter() {
  const u = SITE.ui;
  const now = new Date();
  const date = `${String(now.getMonth() + 1).padStart(2, "0")}.${now.getFullYear()}`;
  const cells = [
    [u.ftDrawn, "D. HERNÁNDEZ M."],
    [u.ftDate, date],
    [u.ftScale, "1:1"],
    [u.ftRev, "2.0"],
    [u.ftSheet, "1/1"]
  ];
  $("footer-content").innerHTML = `
    <div class="tblock">
      <div class="tb-cell tb-name">
        <small>${t(u.ftProject)}</small>
        <b>PORTFOLIO — ${SITE.profile.fullName.toUpperCase()}</b>
      </div>
      ${cells.map(([label, val]) => `
        <div class="tb-cell"><small>${t(label)}</small><b>${val}</b></div>`).join("")}
    </div>
    <p class="tb-note">© ${now.getFullYear()} · ${t(u.footerNote)}</p>`;
}

function renderAll() {
  renderNav();
  renderHero();
  renderTicker();
  renderDomains();
  renderExperience();
  renderBand();
  renderProjects();
  renderSkills();
  renderEducation();
  renderLanguages();
  renderContact();
  renderFooter();
  renderWeldDividers();
  if (window.observeReveals) observeReveals();
  if (window.observeCounters) observeCounters();
  if (window.observeSections) observeSections();
  if (window.observeAmbient) observeAmbient();
}

document.addEventListener("DOMContentLoaded", () => {
  document.documentElement.lang = SITE.lang;
  renderAll();
});
