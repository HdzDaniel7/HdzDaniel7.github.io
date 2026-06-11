# 📂 Guía rápida — Cómo actualizar tu información

Toda tu información vive en esta carpeta. **Nunca necesitas tocar HTML, CSS ni el código JS** para actualizar contenido.

## Reglas generales

- Todo texto bilingüe se escribe como `{ es: "texto en español", en: "text in english" }`.
- Dentro de un bullet, escribe `**texto**` para **resaltarlo** visualmente.
- El orden de los elementos en cada archivo = orden en que aparecen en la página (pon lo más reciente primero).
- Después de editar, guarda y haz commit + push. GitHub Pages se actualiza solo.

## Agregar una experiencia nueva → `experience.js`

Copia este bloque y pégalo **al inicio** del array `SITE.experience`:

```js
{
  role:    { es: "Tu puesto", en: "Your role" },
  company: "Nombre de la empresa",
  location: "Ciudad",
  period:  { es: "ENE 2026 → PRESENTE", en: "JAN 2026 → PRESENT" },
  bullets: [
    {
      es: "Logré X **mejorando Y en 25%** con la herramienta Z.",
      en: "Achieved X by **improving Y by 25%** using tool Z."
    }
  ]
},
```

## Agregar un proyecto nuevo → `projects.js`

Copia un bloque existente. Campos clave:

- `id`: único y sin espacios — define la URL (`project.html?id=mi-proyecto`)
- `icon`: `"gear"`, `"shield"`, `"music"`, `"chip"`, `"cube"` o `"chart"`
- `repo`: link de GitHub o `null`
- `detail.gallery`: para fotos, sube imágenes a `assets/projects/` y lista las rutas:
  `gallery: ["assets/projects/foto1.png", "assets/projects/foto2.png"]`

## Agregar una habilidad → `skills.js`

Añade `{ name: "Nombre", level: "pro" }` al grupo que corresponda.
`level: "pro"` = dominio (borde sólido) · `level: "mid"` = familiaridad (borde punteado).

## Agregar certificación o título → `education.js`

Copia un bloque. `highlight: true` la marca como destacada; `note` es una línea extra opcional en color de acento (ej. un reconocimiento).

## Cambiar datos personales / métricas del hero → `profile.js`

Nombre, rol, métricas animadas (`stats`), redes sociales y texto de contacto.

## Cambiar la paleta de colores → `../css/tokens.css`

La paleta completa son ~10 variables al inicio del archivo. Hay 3 paletas
alternativas listas para copiar/pegar en los comentarios del mismo archivo.

## Pendientes conocidos

- [ ] `experience.js`: reemplazar `"Empresa"` por el nombre real (primer registro).
- [ ] Crear `assets/og-image.png` (1200×630) para el preview al compartir en LinkedIn/WhatsApp.
