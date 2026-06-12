/* ══════════════════════════════════════════════════
   PERFIL — datos generales del hero y contacto.
   Cada texto bilingüe es { es: "...", en: "..." }
   ══════════════════════════════════════════════════ */
window.SITE = window.SITE || {};

SITE.profile = {
  firstName: "Daniel",
  lastName: "Hernández Mendoza",
  fullName: "Daniel Alejandro Hernández Mendoza",

  role: {
    es: "INGENIERO MECATRÓNICO",
    en: "MECHATRONICS ENGINEER"
  },

  /* Retrato técnico en la sección de contacto (duotono automático).
     Sube tu foto a assets/ y pon aquí la ruta, ej. "assets/me.jpg" */
  photo: "./data/Foto.jpg",

  // Línea de cota animada bajo el nombre
  measureLabel: {
    es: "L = automatización de procesos",
    en: "L = process automation",
  },

  // Líneas tipo terminal bajo el nombre
  taglines: [
    {
      es: "> lean manufacturing · IATF 16949 · python · PLC",
      en: "> lean manufacturing · IATF 16949 · python · PLC"
    },
    {
      es: "> estado: **abierto_a_oportunidades**",
      en: "> status: **open_to_work**"
    }
  ],

  // Métricas del hero (animan al cargar). value es numérico.
  stats: [
    { value: 40, prefix: "−", suffix: "", label: { es: "cycle time %", en: "cycle time %" } },
    { value: 30, prefix: "−", suffix: "", label: { es: "errores %", en: "input errors %" } },
    { value: 15, prefix: "−", suffix: "", label: { es: "scrap %", en: "scrap %" } }
  ],

  // Anotación de coordenadas (esquina del hero)
  coords: ["LAT 22.15° N", "LNG 100.97° W", "SLP · MX"],

  location: {
    es: "San Luis Potosí, México",
    en: "San Luis Potosí, Mexico"
  },

  contactIntro: {
    es: "Abierto a oportunidades de tiempo completo en automatización, ingeniería de procesos y mejora continua en el clúster automotriz de SLP y más allá.",
    en: "Open to full-time opportunities in automation, process engineering, and manufacturing improvement in the SLP automotive cluster and beyond."
  },

  social: {
    github:   { label: "GitHub",   handle: "HdzDaniel7", url: "https://github.com/HdzDaniel7" },
    linkedin: { label: "LinkedIn", handle: "DanielAHernandezMendoza", url: "https://linkedin.com/in/danielahernandezmendoza" },
    email:    { label: "Email",    handle: "imt.hmda@gmail.com", url: "mailto:imt.hmda@gmail.com" }
  }
};
