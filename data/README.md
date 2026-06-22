# 📂 Contenido del sitio — cómo actualizarlo

Todo el contenido del portafolio vive en esta carpeta como **archivos JSON**.
**Nunca necesitas tocar HTML, CSS ni JS** para cambiar contenido.

## Forma fácil (recomendada): el editor

Abre **`editor.html`** (en local: `http://localhost:8000/editor.html`).

- Edita todas las áreas desde formularios: Proyectos, Experiencia, Habilidades,
  Educación, Idiomas, Dominios, Ticker, Perfil y Textos UI.
- Agregar / reordenar (↑↓) / duplicar (⎘) / borrar (✕) / buscar.
- Sube **fotos** con el botón ⬆ (van a `assets/projects/`).
- Botón **⇄** traduce ES→EN; al **Publicar** rellena los inglés que falten.
- **Publicar ↑** hace el commit a GitHub por ti (necesita pegar una vez tu token
  en **🔑 Token**). **Descargar** es la alternativa sin token: bajas el JSON y lo
  colocas aquí a mano.

## Forma manual (avanzada): editar el JSON

Puedes editar cualquier `data/*.json` directamente. Reglas:

- Texto bilingüe = `{ "es": "…", "en": "…" }`. **Nunca dejes un idioma vacío.**
- Dentro de la prosa: `**negrita**` (resaltado), `*cursiva*`, `[texto](url)`,
  listas con `- `. (Markdown ligero.)
- El **orden** de cada array = orden en la página (lo más reciente arriba).
- Tras editar, guarda y haz **commit + push**; GitHub Pages se actualiza solo.
- ⚠️ Es JSON estricto: comillas dobles, **sin** comas finales, **sin** comentarios.

## Esquemas

| Archivo | Forma |
|---|---|
| `profile.json` | objeto: nombre, rol, `photo`, `taglines[]`, `stats[]`, `social{}`, `contactIntro`, `cv{es,en}` |
| `projects.json` | array de `{ id, icon, img, title, desc, tags[], links[], detail{ long, highlights[], stack[], flow[], media[] } }` |
| `experience.json` | array de `{ role, company, location, period, bullets[] }` |
| `skills.json` | array de grupos `{ group, items:[{ name, level: "pro"\|"mid" }] }` |
| `education.json` | array de `{ name, meta, note, highlight, links[] }` |
| `languages.json` | array de `{ name, level, cefr (1–6), native? }` |
| `domains.json` | array de `{ icon, name, desc, code }` · `ticker.json` = array de strings |
| `ui.json` | textos fijos de interfaz (claves bilingües) |

- **Enlaces** (`links[]`): `{ "label": "GitHub", "url": "https://…", "icon": "github" }`
- **Media** (`media[]`): `{ "type": "image"|"youtube"|"vimeo", "src": "ruta-o-URL", "caption": {"es":"…","en":"…"} }`
- **Íconos** válidos: `gear, shield, music, chip, cpu, cube, chart, robot, spark, code, wrench, github, linkedin, mail, arrow` (definidos en `js/render.js`).

## Probar en local

Los JSON se cargan con `fetch`, así que **abrir el HTML con doble clic
(`file://`) no funciona**. Usa un servidor estático:

```
python -m http.server
```

y abre `http://localhost:8000`.
