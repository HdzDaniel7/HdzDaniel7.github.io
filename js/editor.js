/* ══════════════════════════════════════════════════════════════
   EDITOR — edición de data/*.json. Modo seguro (Fase 3): guarda
   descargando el JSON del área activa para que lo coloques en data/.
   Sin token ni traducción todavía (esas son fases posteriores).
   ══════════════════════════════════════════════════════════════ */

const EDLANG = "es"; // idioma para mostrar títulos en la lista
function t(x) {
  if (x == null) return "";
  if (typeof x === "string") return x;
  return x[EDLANG] || x.es || x.en || "";
}
const ICON_KEYS = ["gear","shield","music","chip","cpu","cube","chart","robot","spark","code","wrench","github","linkedin","mail","arrow"];
const iconOptions = () => ICON_KEYS.map(k => ({ value: k, label: k }));
const clone = x => JSON.parse(JSON.stringify(x));
const isBlank = v => v == null || (typeof v === "object" ? !(v.es || v.en) : String(v).trim() === "");

/* ── helpers de ruta (para claves anidadas tipo "detail.long") ── */
function getPath(obj, path) {
  return path.split(".").reduce((o, k) => (o == null ? undefined : o[k]), obj);
}
function setPath(obj, path, val) {
  const ks = path.split("."); let o = obj;
  for (let i = 0; i < ks.length - 1; i++) {
    if (o[ks[i]] == null || typeof o[ks[i]] !== "object") o[ks[i]] = {};
    o = o[ks[i]];
  }
  o[ks[ks.length - 1]] = val;
}

/* ── valores por defecto al crear ── */
function defaultFor(f) {
  switch (f.type) {
    case "bilingual": case "bilingualArea": return { es: "", en: "" };
    case "number": return 0;
    case "checkbox": return false;
    case "select": return (f.options && f.options[0] && f.options[0].value) || "";
    case "list": return [];
    case "object": { const o = {}; (f.fields || []).forEach(sf => setPath(o, sf.key, defaultFor(sf))); return o; }
    default: return "";
  }
}
function newEntry(area) { const o = {}; area.fields.forEach(f => setPath(o, f.key, defaultFor(f))); return o; }

/* ── normalizadores al cargar (suben datos viejos al esquema nuevo) ── */
function normalizeProject(p) {
  if (!(Array.isArray(p.links) && p.links.length) && p.repo)
    p.links = [{ label: "GitHub", url: p.repo, icon: "github" }];
  delete p.repo;
  p.detail = p.detail || {};
  const d = p.detail;
  if (!(Array.isArray(d.media) && d.media.length) && Array.isArray(d.gallery))
    d.media = d.gallery.map(src => ({ type: "image", src, caption: { es: "", en: "" } }));
  delete d.gallery;
}

const MEDIA_TYPES = [{ value: "image", label: "imagen" }, { value: "youtube", label: "YouTube" }, { value: "vimeo", label: "Vimeo" }];
const LEVELS = [{ value: "pro", label: "pro (dominio)" }, { value: "mid", label: "mid (familiaridad)" }];

/* ══════════ ESQUEMAS DE ÁREA ══════════ */
const AREAS = [
  { key: "projects", file: "data/projects.json", label: "Proyectos", kind: "list",
    title: e => t(e.title) || e.id || "(sin título)", normalize: normalizeProject,
    fields: [
      { key: "id", label: "ID (único, sin espacios)", type: "text", required: true, sec: "Identidad" },
      { key: "icon", label: "Ícono", type: "select", options: iconOptions() },
      { key: "title", label: "Título", type: "bilingual", required: true, sec: "Contenido" },
      { key: "desc", label: "Descripción (tarjeta)", type: "bilingualArea" },
      { key: "tags", label: "Etiquetas", type: "list", item: { type: "text" }, addLabel: "+ etiqueta" },
      { key: "links", label: "Enlaces", type: "list", wide: false, sec: "Enlaces y portada", addLabel: "+ enlace", item: { type: "object", fields: [
        { key: "label", label: "Etiqueta", type: "text" },
        { key: "url", label: "URL", type: "text" },
        { key: "icon", label: "Ícono", type: "select", options: iconOptions() }
      ] } },
      { key: "img", label: "Imagen de portada (ruta)", type: "text", upload: true, placeholder: "assets/projects/x.png" },
      { key: "detail.long", label: "Descripción larga", type: "bilingualArea", sec: "Detalle" },
      { key: "detail.highlights", label: "Puntos clave", type: "list", item: { type: "bilingual" }, addLabel: "+ punto" },
      { key: "detail.stack", label: "Stack técnico", type: "list", item: { type: "text" }, addLabel: "+ tecnología" },
      { key: "detail.flow", label: "Diagrama de flujo (etapas del sistema)", type: "list", numbered: true, addLabel: "+ etapa", item: { type: "object", fields: [
        { key: "es", label: "Etapa (ES)", type: "text" },
        { key: "en", label: "Stage (EN)", type: "text" }
      ] } },
      { key: "detail.media", label: "Media (fotos / video)", type: "list", wide: false, addLabel: "+ media", item: { type: "object", fields: [
        { key: "type", label: "Tipo", type: "select", options: MEDIA_TYPES },
        { key: "src", label: "Ruta (imagen) o URL/ID (video)", type: "text", upload: true },
        { key: "caption", label: "Pie de foto", type: "bilingual" }
      ] } }
    ] },

  { key: "experience", file: "data/experience.json", label: "Experiencia", kind: "list",
    title: e => t(e.role) || "(rol)",
    normalize: e => { if (typeof e.company === "string") e.company = { es: e.company, en: e.company }; },
    fields: [
      { key: "role", label: "Rol", type: "bilingual", required: true },
      { key: "company", label: "Empresa", type: "bilingual" },
      { key: "location", label: "Ubicación", type: "text" },
      { key: "period", label: "Periodo", type: "bilingual" },
      { key: "bullets", label: "Logros / responsabilidades", type: "list", item: { type: "bilingualArea" }, addLabel: "+ logro" }
    ] },

  { key: "education", file: "data/education.json", label: "Educación", kind: "list",
    title: e => t(e.name),
    normalize: e => { if (e.note == null) e.note = { es: "", en: "" }; },
    fields: [
      { key: "name", label: "Nombre", type: "bilingual", required: true },
      { key: "meta", label: "Meta (institución · año)", type: "bilingual" },
      { key: "note", label: "Nota destacada (opcional)", type: "bilingual", nullable: true },
      { key: "highlight", label: "Destacar (tarjeta resaltada)", type: "checkbox" },
      { key: "links", label: "Enlaces (verificación / ID de credencial)", type: "list", addLabel: "+ enlace", item: { type: "object", fields: [
        { key: "label", label: "Etiqueta", type: "text" },
        { key: "url", label: "URL", type: "text" }
      ] } }
    ] },

  { key: "languages", file: "data/languages.json", label: "Idiomas", kind: "single",
    wrap: arr => ({ items: arr }), unwrap: obj => obj.items,
    fields: [
      { key: "items", label: "Idiomas", type: "list", addLabel: "+ idioma", item: { type: "object", fields: [
        { key: "name", label: "Idioma", type: "bilingual" },
        { key: "level", label: "Nivel", type: "bilingual" },
        { key: "cefr", label: "CEFR (1-6)", type: "number" },
        { key: "native", label: "Nativo", type: "checkbox" }
      ] } }
    ] },

  { key: "domains", file: "data/domains.json", label: "Dominios", kind: "list",
    title: e => t(e.name),
    fields: [
      { key: "icon", label: "Ícono", type: "select", options: iconOptions() },
      { key: "name", label: "Nombre", type: "bilingual", required: true },
      { key: "desc", label: "Descripción", type: "bilingualArea" },
      { key: "code", label: "Código (ej. SYS-01)", type: "text" }
    ] },

  { key: "skills", file: "data/skills.json", label: "Habilidades", kind: "list",
    title: e => t(e.group),
    fields: [
      { key: "group", label: "Grupo", type: "bilingual", required: true },
      { key: "items", label: "Habilidades del grupo", type: "list", addLabel: "+ habilidad", item: { type: "object", fields: [
        { key: "name", label: "Nombre", type: "text" },
        { key: "level", label: "Nivel", type: "select", options: LEVELS }
      ] } }
    ] },

  { key: "ticker", file: "data/ticker.json", label: "Ticker (cinta)", kind: "single",
    wrap: arr => ({ items: arr }), unwrap: obj => obj.items,
    fields: [{ key: "items", label: "Términos de la cinta", type: "list", item: { type: "text" }, addLabel: "+ término" }] },

  { key: "profile", file: "data/profile.json", label: "Perfil", kind: "single",
    fields: [
      { key: "firstName", label: "Nombre", type: "text", sec: "Identidad" },
      { key: "lastName", label: "Apellidos", type: "text" },
      { key: "fullName", label: "Nombre completo", type: "text" },
      { key: "role", label: "Rol", type: "bilingual" },
      { key: "photo", label: "Foto (ruta)", type: "text", upload: true },
      { key: "measureLabel", label: "Etiqueta de cota", type: "bilingual", sec: "Hero" },
      { key: "taglines", label: "Taglines (líneas tipo terminal)", type: "list", item: { type: "bilingual" }, addLabel: "+ tagline" },
      { key: "stats", label: "Métricas del hero", type: "list", addLabel: "+ métrica", item: { type: "object", fields: [
        { key: "value", label: "Valor", type: "number" },
        { key: "prefix", label: "Prefijo", type: "text" },
        { key: "suffix", label: "Sufijo", type: "text" },
        { key: "label", label: "Etiqueta", type: "bilingual" }
      ] } },
      { key: "coords", label: "Coordenadas", type: "list", item: { type: "text" }, addLabel: "+ línea" },
      { key: "location", label: "Ubicación", type: "bilingual", sec: "Contacto" },
      { key: "contactIntro", label: "Intro de contacto", type: "bilingualArea" },
      { key: "social.github.label", label: "GitHub · etiqueta", type: "text" },
      { key: "social.github.handle", label: "GitHub · handle", type: "text" },
      { key: "social.github.url", label: "GitHub · URL", type: "text" },
      { key: "social.linkedin.label", label: "LinkedIn · etiqueta", type: "text" },
      { key: "social.linkedin.handle", label: "LinkedIn · handle", type: "text" },
      { key: "social.linkedin.url", label: "LinkedIn · URL", type: "text" },
      { key: "social.email.label", label: "Email · etiqueta", type: "text" },
      { key: "social.email.handle", label: "Email · handle", type: "text" },
      { key: "social.email.url", label: "Email · URL", type: "text" },
      { key: "cv.es", label: "CV en español (URL o ruta a PDF)", type: "text", sec: "CV" },
      { key: "cv.en", label: "CV en inglés (URL o ruta a PDF)", type: "text" }
    ] },

  { key: "ui", file: "data/ui.json", label: "Textos UI", kind: "single", autoFields: true, fields: [] }
];

/* ══════════ ESTADO ══════════ */
const state = { data: {}, area: null, index: 0, search: "" };
const $ = id => document.getElementById(id);
const currentArea = () => AREAS.find(a => a.key === state.area);
function activeEntry() {
  const a = currentArea();
  if (!a) return null;
  return a.kind === "single" ? state.data[a.key] : state.data[a.key][state.index];
}

/* ══════════ CARGA ══════════ */
async function loadAll() {
  for (const area of AREAS) {
    const json = await fetch(area.file).then(r => {
      if (!r.ok) throw new Error(`${area.file} → HTTP ${r.status}`);
      return r.json();
    });
    if (area.kind === "single") {
      state.data[area.key] = area.wrap ? area.wrap(json) : json;
      if (area.normalize) area.normalize(state.data[area.key]);
      if (area.autoFields)
        area.fields = Object.keys(state.data[area.key]).map(k => ({ key: k, label: k, type: "bilingual" }));
    } else {
      json.forEach(e => area.normalize && area.normalize(e));
      state.data[area.key] = json;
    }
  }
}

/* ══════════ CONTROLES DE FORMULARIO (bind por get/set) ══════════ */
function el(tag, cls, props) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (props) Object.assign(e, props);
  return e;
}

/* Devuelve un control (sin label) enlazado a get()/set(). */
function control(field, get, set) {
  if (field.type === "text") {
    const i = el("input", "ed-input", { type: "text", value: get() || "", placeholder: field.placeholder || "" });
    i.addEventListener("input", () => set(i.value));
    if (!field.upload) return i;
    // campo de imagen: input + botón de subida a assets/
    const wrap = el("div", "ed-upload");
    const file = el("input", null, { type: "file", accept: "image/*" }); file.style.display = "none";
    const btn = el("button", "ed-mini", { type: "button", textContent: "⬆", title: "Subir imagen al repo" });
    btn.addEventListener("click", () => file.click());
    file.addEventListener("change", () => { if (file.files[0]) uploadImage(file.files[0], set, i); });
    wrap.append(i, btn, file);
    return wrap;
  }
  if (field.type === "textarea") {
    const ta = el("textarea", "ed-textarea", { rows: 3, value: get() || "" });
    ta.addEventListener("input", () => set(ta.value));
    return ta;
  }
  if (field.type === "number") {
    const i = el("input", "ed-input", { type: "number", value: get() ?? 0 });
    i.addEventListener("input", () => set(i.value === "" ? 0 : Number(i.value)));
    return i;
  }
  if (field.type === "select") {
    const s = el("select", "ed-select");
    (field.options || []).forEach(o => s.appendChild(el("option", null, { value: o.value, textContent: o.label })));
    s.value = get() || (field.options[0] && field.options[0].value) || "";
    s.addEventListener("change", () => set(s.value));
    return s;
  }
  if (field.type === "checkbox") {
    const wrap = el("label", "ed-checkbox");
    const i = el("input", null, { type: "checkbox", checked: !!get() });
    i.addEventListener("change", () => set(i.checked));
    wrap.appendChild(i);
    wrap.appendChild(el("span", null, { textContent: field.label }));
    return wrap;
  }
  if (field.type === "bilingual" || field.type === "bilingualArea") {
    let v = get();
    if (v == null || typeof v !== "object") { v = { es: "", en: "" }; set(v); }
    const wrap = el("div", "ed-bi");
    const inputs = {};
    ["es", "en"].forEach(lang => {
      const line = el("div", "ed-lang-line");
      line.appendChild(el("span", "ed-lang-tag" + (lang === "en" ? " en" : ""), { textContent: lang.toUpperCase() }));
      const inp = field.type === "bilingualArea"
        ? el("textarea", "ed-textarea", { rows: 3, value: v[lang] || "" })
        : el("input", "ed-input", { type: "text", value: v[lang] || "" });
      inp.addEventListener("input", () => { v[lang] = inp.value; });
      inputs[lang] = inp;
      line.appendChild(inp);
      if (lang === "en") {
        const tr = el("button", "ed-tr", { type: "button", textContent: "⇄", title: "Traducir ES → EN" });
        tr.addEventListener("click", () => translateField(v, inputs.en, tr));
        line.appendChild(tr);
      }
      wrap.appendChild(line);
    });
    return wrap;
  }
  if (field.type === "list") {
    return listControl(field, get, set);
  }
  return el("div", null, { textContent: "(campo no soportado)" });
}

function listControl(field, get) {
  let arr = get();
  if (!Array.isArray(arr)) arr = [];
  const item = field.item;

  /* listas de texto simple → chips compactos */
  if (item.type === "text") {
    const box = el("div", "ed-chips");
    arr.forEach((_, idx) => {
      const chip = el("span", "ed-chip");
      const inp = el("input", null, { type: "text", value: arr[idx] || "" });
      inp.size = Math.max((arr[idx] || "").length, 4);
      inp.addEventListener("input", () => { arr[idx] = inp.value; inp.size = Math.max(inp.value.length, 4); });
      const x = el("span", "x", { textContent: "✕", title: "Quitar" });
      x.addEventListener("click", () => { arr.splice(idx, 1); renderForm(); });
      chip.append(inp, x);
      box.appendChild(chip);
    });
    const add = el("button", "ed-chip-add", { type: "button", textContent: field.addLabel || "+ agregar" });
    add.addEventListener("click", () => { arr.push(""); renderForm(); });
    box.appendChild(add);
    return box;
  }

  /* listas de objetos o bilingües → filas con botones ↑ ↓ ✕ */
  const box = el("div", "ed-list");
  arr.forEach((_, idx) => {
    const row = el("div", item.type === "object" ? "ed-row" : "ed-birow");
    if (field.numbered) row.appendChild(el("span", "ed-num", { textContent: idx + 1 }));
    const body = el("div", "ed-body");
    if (item.type === "object") {
      const objrow = el("div", "ed-obj-row");
      item.fields.forEach(sf => {
        const isBi = sf.type === "bilingual" || sf.type === "bilingualArea";
        const cell = el("div", "ed-cell" + (isBi ? " bi" : ""));
        if (sf.type !== "checkbox") cell.appendChild(el("div", "ed-sub", { textContent: sf.label }));
        cell.appendChild(control(sf, () => getPath(arr[idx], sf.key), v => setPath(arr[idx], sf.key, v)));
        objrow.appendChild(cell);
      });
      body.appendChild(objrow);
    } else {
      body.appendChild(control(item, () => arr[idx], v => { arr[idx] = v; }));
    }
    const side = el("div", "ed-side");
    const up = el("button", "ed-mini", { type: "button", textContent: "↑", title: "Subir" });
    const dn = el("button", "ed-mini", { type: "button", textContent: "↓", title: "Bajar" });
    const rm = el("button", "ed-mini", { type: "button", textContent: "✕", title: "Quitar" });
    up.addEventListener("click", () => { if (idx > 0) { [arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]]; renderForm(); } });
    dn.addEventListener("click", () => { if (idx < arr.length - 1) { [arr[idx + 1], arr[idx]] = [arr[idx], arr[idx + 1]]; renderForm(); } });
    rm.addEventListener("click", () => { arr.splice(idx, 1); renderForm(); });
    side.append(up, dn, rm);
    row.append(body, side);
    box.appendChild(row);
  });
  const add = el("button", "ed-add-item", { type: "button", textContent: field.addLabel || "+ agregar" });
  add.addEventListener("click", () => { arr.push(defaultFor(item)); renderForm(); });
  box.appendChild(add);
  return box;
}

/* ── traducción ES→EN (MyMemory, directo desde el navegador) ── */
async function translateES_EN(text) {
  const url = "https://api.mymemory.translated.net/get?q=" + encodeURIComponent(text) + "&langpair=es|en";
  const j = await fetch(url).then(r => r.json());
  return (j.responseData && j.responseData.translatedText) || "";
}
async function translateField(v, enInput, btn) {
  const src = (v.es || "").trim();
  if (!src) { toast("Escribe primero el texto en español."); return; }
  btn.disabled = true; const old = btn.textContent; btn.textContent = "…";
  try {
    const out = await translateES_EN(src);
    if (out) { v.en = out; enInput.value = out; }
  } catch (e) { toast("No se pudo traducir (revisa tu conexión)."); }
  finally { btn.disabled = false; btn.textContent = old; }
}

/* ¿el campo ocupa todo el ancho del formulario? (prosa/bilingüe/listas altas) */
function isWide(field) {
  if (field.wide != null) return field.wide;
  if (["bilingual", "bilingualArea", "textarea"].includes(field.type)) return true;
  if (field.type === "list") return ["bilingual", "bilingualArea", "object"].includes(field.item.type);
  return false;
}

/* ══════════ RENDER ══════════ */
function renderAreas() {
  const nav = $("ed-areas");
  nav.innerHTML = "";
  AREAS.forEach(a => {
    const b = el("button", "ed-area" + (a.key === state.area ? " on" : ""), { type: "button" });
    const count = a.kind === "single" ? "" : ` <small>(${(state.data[a.key] || []).length})</small>`;
    b.innerHTML = a.label + count;
    b.addEventListener("click", () => selectArea(a.key));
    nav.appendChild(b);
  });
}

function selectArea(key) {
  state.area = key; state.index = 0; state.search = "";
  $("ed-search").value = "";
  const single = currentArea().kind === "single";
  $("ed-add").style.display = single ? "none" : "";
  $("ed-search").style.visibility = single ? "hidden" : "";
  renderAreas(); renderEntries(); renderForm();
}

function renderEntries() {
  const ul = $("ed-entry-list");
  ul.innerHTML = "";
  const area = currentArea();
  if (area.kind === "single") {
    $("ed-count").textContent = "";
    const li = el("li", "ed-entry on");
    li.appendChild(el("span", "ed-name", { textContent: area.label }));
    ul.appendChild(li);
    return;
  }
  const arr = state.data[area.key];
  $("ed-count").textContent = "· " + arr.length;
  const q = state.search.toLowerCase();
  arr.forEach((entry, idx) => {
    const name = area.title(entry);
    if (q && !name.toLowerCase().includes(q)) return;
    const li = el("li", "ed-entry" + (idx === state.index ? " on" : ""));
    const main = el("div", "ed-entry-main");
    main.appendChild(el("span", "ed-idx", { textContent: String(idx + 1).padStart(2, "0") }));
    main.appendChild(el("span", "ed-name", { textContent: name || "(sin título)" }));
    li.appendChild(main);
    const acts = el("div", "ed-acts");
    const mk = (txt, title, fn) => {
      const b = el("button", "ed-mini", { type: "button", textContent: txt, title });
      b.addEventListener("click", e => { e.stopPropagation(); fn(); });
      return b;
    };
    acts.append(
      mk("↑", "Subir", () => move(idx, -1)),
      mk("↓", "Bajar", () => move(idx, 1)),
      mk("⎘", "Duplicar", () => duplicate(idx)),
      mk("✕", "Borrar", () => remove(idx))
    );
    li.appendChild(acts);
    li.addEventListener("click", () => { state.index = idx; renderEntries(); renderForm(); });
    ul.appendChild(li);
  });
  if (!ul.children.length) ul.appendChild(el("li", "ed-empty", { textContent: "Sin resultados." }));
}

function renderForm() {
  const wrap = $("ed-form");
  wrap.innerHTML = "";
  const area = currentArea();
  const entry = activeEntry();
  if (!entry) { wrap.appendChild(el("p", "ed-empty", { textContent: "Selecciona o crea una entrada." })); return; }

  const grid = el("div", "ed-form");
  const head = el("div", "ed-form-head");
  head.appendChild(el("span", "ed-kicker", { textContent: area.label }));
  head.appendChild(el("h2", null, { textContent: area.kind === "single" ? area.label : (area.title(entry) || "(nueva entrada)") }));
  grid.appendChild(head);

  let currentSec = null;
  area.fields.forEach(field => {
    if (field.sec && field.sec !== currentSec) {
      currentSec = field.sec;
      const s = el("div", "ed-sec");
      s.appendChild(el("b", null, { textContent: field.sec }));
      s.appendChild(el("i", "rule"));
      grid.appendChild(s);
    }
    const f = el("div", "ed-field" + (isWide(field) ? " full" : ""));
    if (field.type === "checkbox") { // el checkbox trae su propia etiqueta
      f.appendChild(control(field, () => getPath(entry, field.key), v => setPath(entry, field.key, v)));
      grid.appendChild(f);
      return;
    }
    const lab = el("label");
    lab.innerHTML = field.label + (field.required ? ' <span class="req">*</span>' : "");
    f.appendChild(lab);
    f.appendChild(control(field, () => getPath(entry, field.key), v => setPath(entry, field.key, v)));
    grid.appendChild(f);
  });
  wrap.appendChild(grid);
}

/* ══════════ CRUD ══════════ */
function move(idx, dir) {
  const arr = state.data[state.area];
  const j = idx + dir;
  if (j < 0 || j >= arr.length) return;
  [arr[idx], arr[j]] = [arr[j], arr[idx]];
  if (state.index === idx) state.index = j; else if (state.index === j) state.index = idx;
  renderEntries(); renderForm();
}
function duplicate(idx) {
  const arr = state.data[state.area];
  const copy = clone(arr[idx]);
  if (copy.id) copy.id = copy.id + "-copia";
  arr.splice(idx + 1, 0, copy);
  state.index = idx + 1;
  renderAreas(); renderEntries(); renderForm();
}
function remove(idx) {
  const arr = state.data[state.area];
  const name = currentArea().title(arr[idx]) || `#${idx + 1}`;
  confirmModal(`¿Eliminar "${name}"?`,
    "Solo afecta tu edición actual; nada se publica hasta que reemplaces el JSON.",
    () => {
      arr.splice(idx, 1);
      if (state.index >= arr.length) state.index = Math.max(0, arr.length - 1);
      renderAreas(); renderEntries(); renderForm();
    });
}

/* Modal de confirmación con el estilo del editor (reemplaza al confirm nativo). */
function confirmModal(title, detail, onYes) {
  const overlay = el("div", "ed-overlay");
  const box = el("div", "ed-modal");
  box.appendChild(el("h3", "ed-modal-title", { textContent: title }));
  if (detail) box.appendChild(el("p", "ed-modal-msg", { textContent: detail }));
  const row = el("div", "ed-modal-acts");
  const cancel = el("button", "ed-btn", { type: "button", textContent: "Cancelar" });
  const ok = el("button", "ed-btn danger", { type: "button", textContent: "Eliminar" });
  const close = () => { overlay.remove(); document.removeEventListener("keydown", onKey); };
  const onKey = e => { if (e.key === "Escape") close(); };
  cancel.addEventListener("click", close);
  ok.addEventListener("click", () => { close(); onYes(); });
  overlay.addEventListener("click", e => { if (e.target === overlay) close(); });
  document.addEventListener("keydown", onKey);
  row.append(cancel, ok);
  box.appendChild(row);
  overlay.appendChild(box);
  document.body.appendChild(overlay);
  ok.focus();
}
function addEntry() {
  const area = currentArea();
  if (area.kind === "single") return;
  const arr = state.data[area.key];
  arr.unshift(newEntry(area));
  state.index = 0;
  renderAreas(); renderEntries(); renderForm();
}

/* ══════════ GUARDAR (descarga) ══════════ */
function cleanForSave(area, entry) {
  area.fields.forEach(f => {
    if (f.nullable && (f.type === "bilingual" || f.type === "bilingualArea")) {
      const v = getPath(entry, f.key);
      if (isBlank(v)) setPath(entry, f.key, null);
    }
  });
}
function validate(area) {
  const issues = [];
  const list = area.kind === "single" ? [activeEntry()] : state.data[area.key];
  const ids = {};
  list.forEach((entry, i) => {
    const ref = area.kind === "single" ? area.label : `#${i + 1} (${area.title(entry) || "sin título"})`;
    area.fields.forEach(f => {
      if (f.required && isBlank(getPath(entry, f.key))) issues.push(`${ref}: falta "${f.label}".`);
    });
    if (area.key === "projects") {
      if (entry.id && /\s/.test(entry.id)) issues.push(`${ref}: el ID no debe tener espacios.`);
      if (entry.id) { if (ids[entry.id]) issues.push(`ID duplicado: "${entry.id}".`); ids[entry.id] = true; }
    }
  });
  return issues;
}
/* arma el texto JSON final del área activa (validado/limpio) */
function buildAreaText(area) {
  let out;
  if (area.kind === "single") {
    out = clone(state.data[area.key]);
    if (area.normalize) area.normalize(out);
    out = area.unwrap ? area.unwrap(out) : out;
  } else {
    out = clone(state.data[area.key]);
    out.forEach(e => cleanForSave(area, e));
  }
  return JSON.stringify(out, null, 2) + "\n";
}
function download() {
  const area = currentArea();
  const issues = validate(area);
  if (issues.length && !confirm("Avisos:\n\n" + issues.join("\n") + "\n\n¿Descargar de todas formas?")) return;
  const blob = new Blob([buildAreaText(area)], { type: "application/json" });
  const a = el("a", null, { href: URL.createObjectURL(blob), download: area.file.split("/").pop() });
  document.body.appendChild(a); a.click(); a.remove();
  URL.revokeObjectURL(a.href);
  toast(`Descargado ${area.file.split("/").pop()} — colócalo en data/ y haz commit.`);
}

/* ══════════ PUBLICAR EN GITHUB (Contents API) ══════════ */
const GH = { repo: "HdzDaniel7/HdzDaniel7.github.io", branch: "main" };
const ghToken = () => localStorage.getItem("gh-token") || "";
const ghHeaders = () => ({ "Authorization": "Bearer " + ghToken(), "Accept": "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28" });
const toB64Utf8 = s => btoa(unescape(encodeURIComponent(s)));
const ghUrl = path => `https://api.github.com/repos/${GH.repo}/contents/${path.split("/").map(encodeURIComponent).join("/")}`;
function fileToB64(file) { return new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(String(r.result).split(",")[1]); r.onerror = rej; r.readAsDataURL(file); }); }
function safeName(n) { return n.toLowerCase().replace(/[^a-z0-9.\-_]+/g, "-").replace(/^-+|-+$/g, ""); }

async function ghGetSha(path) {
  const r = await fetch(ghUrl(path) + "?ref=" + GH.branch, { headers: ghHeaders() });
  if (r.status === 404) return null;
  if (!r.ok) throw new Error("lectura " + r.status);
  return (await r.json()).sha;
}
async function ghPut(path, base64, message) {
  const sha = await ghGetSha(path);
  const body = { message, content: base64, branch: GH.branch };
  if (sha) body.sha = sha;
  const r = await fetch(ghUrl(path), { method: "PUT", headers: { ...ghHeaders(), "Content-Type": "application/json" }, body: JSON.stringify(body) });
  if (!r.ok) { const e = await r.json().catch(() => ({})); throw new Error(e.message || ("HTTP " + r.status)); }
  return r.json();
}
async function publish() {
  if (!ghToken()) { toast("Configura tu token (🔑) para publicar."); openTokenModal(); return; }
  const area = currentArea();
  const issues = validate(area);
  if (issues.length && !confirm("Avisos:\n\n" + issues.join("\n") + "\n\n¿Publicar de todas formas?")) return;
  const btn = $("ed-publish"); btn.disabled = true; const old = btn.textContent; btn.textContent = "Publicando…";
  try {
    await ghPut(area.file, toB64Utf8(buildAreaText(area)), `editor: actualiza ${area.file}`);
    toast(`Publicado ✓ ${area.file} — el sitio se actualiza en ~1 min.`);
  } catch (e) { toast("Error al publicar: " + e.message); }
  finally { btn.disabled = false; btn.textContent = old; }
}
async function uploadImage(file, setVal, inputEl) {
  if (!ghToken()) { toast("Configura tu token (🔑) para subir imágenes."); openTokenModal(); return; }
  const path = "assets/projects/" + safeName(file.name);
  try {
    toast("Subiendo imagen…");
    await ghPut(path, await fileToB64(file), `editor: sube ${path}`);
    setVal(path); if (inputEl) inputEl.value = path;
    toast("Imagen subida → " + path);
  } catch (e) { toast("Error al subir: " + e.message); }
}
function openTokenModal() {
  const overlay = el("div", "ed-overlay");
  const box = el("div", "ed-modal");
  box.appendChild(el("h3", "ed-modal-title", { textContent: "Token de GitHub" }));
  box.appendChild(el("p", "ed-modal-msg", { textContent: "Pega un token fino (fine-grained PAT) con permiso Contents: Read and write en este repositorio. Se guarda solo en este navegador." }));
  const inp = el("input", "ed-input", { type: "password", placeholder: "github_pat_…", value: ghToken() });
  box.appendChild(inp);
  const row = el("div", "ed-modal-acts");
  const clear = el("button", "ed-btn", { type: "button", textContent: "Borrar" });
  const save = el("button", "ed-btn primary", { type: "button", textContent: "Guardar" });
  const close = () => overlay.remove();
  clear.addEventListener("click", () => { localStorage.removeItem("gh-token"); updateTokenUI(); close(); toast("Token borrado."); });
  save.addEventListener("click", () => { localStorage.setItem("gh-token", inp.value.trim()); updateTokenUI(); close(); toast("Token guardado en este navegador."); });
  overlay.addEventListener("click", e => { if (e.target === overlay) close(); });
  row.append(clear, save); box.appendChild(row); overlay.appendChild(box); document.body.appendChild(overlay); inp.focus();
}
function updateTokenUI() { const b = $("ed-token"); if (b) b.textContent = ghToken() ? "🔑 ✓" : "🔑 Token"; }
function toast(msg) {
  const t = el("div", "ed-toast", { textContent: msg });
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 4200);
}

/* ══════════ TEMA (claro ginkgo / oscuro selva) + partículas ══════════ */
function buildParticles(mode) {
  const box = $("ed-particles"); if (!box) return;
  box.innerHTML = "";
  const rnd = (a, b) => a + Math.random() * (b - a);
  if (mode === "light") {
    for (let i = 0; i < 16; i++) {
      const p = el("div", "lf"); const s = rnd(8, 13);
      p.style.cssText = `left:${rnd(0,100)}%;width:${s}px;height:${(s*0.7).toFixed(0)}px;` +
        `background:${i % 2 ? "#7cc9ad" : "#b09fe0"};--d:${rnd(9,17).toFixed(1)}s;` +
        `--delay:${(-rnd(0,15)).toFixed(1)}s;--sway:${rnd(-60,60)|0}px;--rot:${rnd(160,500)|0}deg;`;
      box.appendChild(p);
    }
  } else {
    for (let i = 0; i < 16; i++) {
      const f = el("div", "ff"); const s = rnd(3, 6);
      f.style.cssText = `left:${rnd(2,98)}%;top:${rnd(5,95)}%;width:${s}px;height:${s}px;` +
        `--d:${rnd(7,16).toFixed(1)}s;--delay:${(-rnd(0,12)).toFixed(1)}s;--dx:${rnd(-30,30)|0}px;--dy:${rnd(-40,-12)|0}px;`;
      box.appendChild(f);
    }
  }
}
function setTheme(mode) {
  document.body.classList.toggle("ed-light", mode === "light");
  localStorage.setItem("ed-theme", mode);
  const btn = $("ed-theme"); if (btn) btn.textContent = mode === "light" ? "☀️" : "🌙";
  buildParticles(mode);
}

/* ══════════ INIT ══════════ */
document.addEventListener("DOMContentLoaded", () => {
  setTheme(localStorage.getItem("ed-theme") || "dark");
  $("ed-theme").addEventListener("click", () =>
    setTheme(document.body.classList.contains("ed-light") ? "dark" : "light"));
  $("ed-search").addEventListener("input", e => { state.search = e.target.value; renderEntries(); });
  $("ed-add").addEventListener("click", addEntry);
  $("ed-download").addEventListener("click", download);
  $("ed-token").addEventListener("click", openTokenModal);
  $("ed-publish").addEventListener("click", publish);
  updateTokenUI();

  loadAll()
    .then(() => {
      $("ed-status").textContent = "Edita y pulsa Guardar para descargar el JSON del área.";
      state.area = AREAS[0].key;
      selectArea(state.area);
    })
    .catch(err => {
      console.error(err);
      $("ed-status").textContent = "Error al cargar datos. Sírvelo por HTTP (python -m http.server), no con file://.";
    });
});
