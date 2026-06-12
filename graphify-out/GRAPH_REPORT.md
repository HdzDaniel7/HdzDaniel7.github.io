# Graph Report - .  (2026-06-12)

## Corpus Check
- Corpus is ~14,636 words - fits in a single context window. You may not need a graph.

## Summary
- 73 nodes · 130 edges · 11 communities (9 shown, 2 thin omitted)
- Extraction: 74% EXTRACTED · 26% INFERRED · 0% AMBIGUOUS · INFERRED: 34 edges (avg confidence: 0.82)
- Token cost: 93,557 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Datos del CV y Páginas|Datos del CV y Páginas]]
- [[_COMMUNITY_Tarjeta Social (OG Image)|Tarjeta Social (OG Image)]]
- [[_COMMUNITY_Idioma y Selector de Temas|Idioma y Selector de Temas]]
- [[_COMMUNITY_Efectos y Observers|Efectos y Observers]]
- [[_COMMUNITY_Render de Secciones|Render de Secciones]]
- [[_COMMUNITY_Favicon e Identidad Visual|Favicon e Identidad Visual]]
- [[_COMMUNITY_Render Global y Decoraciones|Render Global y Decoraciones]]
- [[_COMMUNITY_Experiencia Interactiva (Tabs)|Experiencia Interactiva (Tabs)]]
- [[_COMMUNITY_Retrato de Perfil|Retrato de Perfil]]
- [[_COMMUNITY_Config de VSCode|Config de VSCode]]
- [[_COMMUNITY_Hero y Brazo Robótico|Hero y Brazo Robótico]]

## God Nodes (most connected - your core abstractions)
1. `$()` - 21 edges
2. `renderAll()` - 19 edges
3. `Portfolio Main Page (index.html)` - 15 edges
4. `t()` - 13 edges
5. `Data Folder Editing Guide (README)` - 9 edges
6. `Project Detail Page (project.html)` - 9 edges
7. `renderProjectPage()` - 5 edges
8. `Daniel Hernández Mendoza` - 5 edges
9. `renderThemeDots()` - 4 edges
10. `renderNav()` - 4 edges

## Surprising Connections (you probably didn't know these)
- `Portfolio Main Page (index.html)` --references--> `$()`  [EXTRACTED]
  index.html → js/render.js
- `renderAll()` --calls--> `observeCounters()`  [INFERRED]
  js/render.js → js/effects.js
- `renderAll()` --calls--> `observeSections()`  [INFERRED]
  js/render.js → js/effects.js
- `renderAll()` --calls--> `observeAmbient()`  [INFERRED]
  js/render.js → js/effects.js
- `renderAll()` --calls--> `observeReveals()`  [INFERRED]
  js/render.js → js/effects.js

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Data-driven Rendering Pipeline (data/* + render.js -> index.html sections)** — index_page, js_render, data_profile, data_domains, data_experience, data_projects, data_skills, data_education, data_languages [INFERRED 0.85]
- **Bilingual ES/EN System (i18n engine + {es,en} data + lang toggle on both pages)** — data_readme_bilingual_content_model, js_i18n, index_page, project_page [INFERRED 0.85]

## Communities (11 total, 2 thin omitted)

### Community 0 - "Datos del CV y Páginas"
Cohesion: 0.23
Nodes (8): styles.css (site design), tokens.css (color palette tokens), Data Folder Editing Guide (README), Bilingual Content Model ({es, en} objects), Content/Code Separation Principle, JSON-LD Person Structured Data, Portfolio Main Page (index.html), Project Detail Page (project.html)

### Community 1 - "Tarjeta Social (OG Image)"
Cohesion: 0.31
Nodes (9): Blueprint / Technical Drawing Design Style, Daniel Hernández Mendoza, DHM Monogram Logo, Lean Manufacturing, Mechatronics Engineer (Role), Open Graph Social Card (og-image.png), hdzdaniel7.github.io Portfolio Site, Process Automation (+1 more)

### Community 2 - "Idioma y Selector de Temas"
Cohesion: 0.39
Nodes (6): renderLangToggle(), renderThemeDots(), setTheme(), toggleLang(), renderProjectPage(), renderNav()

### Community 3 - "Efectos y Observers"
Cohesion: 0.29
Nodes (4): observeAmbient(), observeCounters(), observeReveals(), observeSections()

### Community 4 - "Render de Secciones"
Cohesion: 0.33
Nodes (7): hl(), t(), renderContact(), renderDomains(), renderEducation(), renderLanguages(), renderProjects()

### Community 5 - "Favicon e Identidad Visual"
Cohesion: 0.47
Nodes (6): Blueprint Grid Motif, Daniel Hernandez personal identity (DHM initials), DHM Monogram Seal, Engineering Brand Palette (dark navy #0B111C, blueprint blue #4DA3FF, cyan #67E8F9, amber #FFC857), Site Favicon (DHM seal on blueprint grid), JetBrains Mono / monospace typography

### Community 6 - "Render Global y Decoraciones"
Cohesion: 0.33
Nodes (6): renderAll(), renderBand(), renderFooter(), renderSkills(), renderTicker(), renderWeldDividers()

### Community 7 - "Experiencia Interactiva (Tabs)"
Cohesion: 0.70
Nodes (5): $(), ICONS, renderExperience(), renderExpPanel(), selectExp()

### Community 8 - "Retrato de Perfil"
Cohesion: 0.67
Nodes (4): Portfolio Owner Visual Identity, Professional Headshot Presentation, Profile Portrait Photo (Foto.jpg), Profile Data (profile.js)

## Knowledge Gaps
- **10 isolated node(s):** `version`, `configurations`, `ICONS`, `JSON-LD Person Structured Data`, `JetBrains Mono / monospace typography` (+5 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Portfolio Main Page (index.html)` connect `Datos del CV y Páginas` to `Idioma y Selector de Temas`, `Efectos y Observers`, `Experiencia Interactiva (Tabs)`?**
  _High betweenness centrality (0.195) - this node is a cross-community bridge._
- **Why does `$()` connect `Experiencia Interactiva (Tabs)` to `Datos del CV y Páginas`, `Idioma y Selector de Temas`, `Render de Secciones`, `Render Global y Decoraciones`, `Hero y Brazo Robótico`?**
  _High betweenness centrality (0.158) - this node is a cross-community bridge._
- **Why does `renderAll()` connect `Render Global y Decoraciones` to `Idioma y Selector de Temas`, `Efectos y Observers`, `Render de Secciones`, `Experiencia Interactiva (Tabs)`, `Hero y Brazo Robótico`?**
  _High betweenness centrality (0.082) - this node is a cross-community bridge._
- **Are the 5 inferred relationships involving `renderAll()` (e.g. with `toggleLang()` and `observeAmbient()`) actually correct?**
  _`renderAll()` has 5 INFERRED edges - model-reasoned connections that need verification._
- **Are the 11 inferred relationships involving `t()` (e.g. with `renderProjectPage()` and `renderContact()`) actually correct?**
  _`t()` has 11 INFERRED edges - model-reasoned connections that need verification._
- **What connects `version`, `configurations`, `ICONS` to the rest of the system?**
  _10 weakly-connected nodes found - possible documentation gaps or missing edges._