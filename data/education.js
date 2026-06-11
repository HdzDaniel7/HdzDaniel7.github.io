/* ══════════════════════════════════════════════════════════════
   EDUCACIÓN Y CERTIFICACIONES
   ──────────────────────────────────────────────────────────────
   - highlight: true → tarjeta destacada (úsalo para el título principal)
   - note: línea extra opcional en color de acento (o null)
   - Para agregar una certificación nueva: añade un objeto al inicio.
   ══════════════════════════════════════════════════════════════ */
window.SITE = window.SITE || {};

SITE.education = [
  {
    name: { es: "Ingeniería Mecatrónica — UASLP", en: "Mechatronics Engineering — UASLP" },
    meta: { es: "2019 – 2025 · Programa acreditado de 5 años", en: "2019 – 2025 · 5-year accredited program" },
    note: { es: "EGEL-CENEVAL: Desempeño Sobresaliente", en: "EGEL-CENEVAL: Outstanding Performance" },
    highlight: true
  },
  {
    name: { es: "Getting Started with Deep Learning", en: "Getting Started with Deep Learning" },
    meta: { es: "NVIDIA · 2024", en: "NVIDIA · 2024" },
    note: null,
    highlight: false
  },
  {
    name: { es: "Python Avanzado: Machine Learning", en: "Advanced Python: Machine Learning" },
    meta: { es: "UASLP · 2024", en: "UASLP · 2024" },
    note: null,
    highlight: false
  },
  {
    name: { es: "Introducción al IoT", en: "Introduction to IoT" },
    meta: { es: "CISCO · 2023", en: "CISCO · 2023" },
    note: null,
    highlight: false
  },
  {
    name: { es: "Inglés B2 — Certificación TOEFL-ITP", en: "English B2 — TOEFL-ITP Certified" },
    meta: { es: "ETS · San Luis Potosí", en: "ETS · San Luis Potosí" },
    note: null,
    highlight: false
  }
];
