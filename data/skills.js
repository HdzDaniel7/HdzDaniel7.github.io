/* ══════════════════════════════════════════════════════════════
   HABILIDADES
   ──────────────────────────────────────────────────────────────
   - level: "pro" (dominio) | "mid" (familiaridad)
   - Para agregar: añade { name: "...", level: "pro" } al grupo.
   ══════════════════════════════════════════════════════════════ */
window.SITE = window.SITE || {};

SITE.skills = [
  {
    group: { es: "Industrial", en: "Industrial" },
    items: [
      { name: "RSLogix 5000", level: "pro" },
      { name: "TIA Portal", level: "pro" },
      { name: "Keyence IV", level: "pro" },
      { name: "COGNEX", level: "pro" },
      { name: "EPICOR", level: "pro" },
      { name: "Power BI", level: "pro" },
      { name: "IATF 16949", level: "pro" },
      { name: "Lean / Kaizen", level: "pro" },
      { name: "TPM / OEE", level: "pro" },
      { name: "FMEA", level: "pro" },
      { name: "5S · Jidoka", level: "pro" },
      { name: "FANUC Laser Welding", level: "pro" }
    ]
  },
  {
    group: { es: "Ingeniería", en: "Engineering" },
    items: [
      { name: "AutoCAD", level: "pro" },
      { name: "SolidWorks", level: "mid" },
      { name: "LabVIEW", level: "mid" },
      { name: "Allen Bradley PLC", level: "pro" },
      { name: "HMI Systems", level: "pro" },
      { name: "Pneumatic Systems", level: "pro" },
      { name: "Vision Systems", level: "pro" }
    ]
  },
  {
    group: { es: "Programación", en: "Coding" },
    items: [
      { name: "Python", level: "pro" },
      { name: "Excel VBA", level: "pro" },
      { name: "C", level: "pro" },
      { name: "C++", level: "pro" },
      { name: "MATLAB", level: "pro" },
      { name: "C#", level: "mid" },
      { name: "MySQL", level: "mid" },
      { name: "HTML / CSS", level: "mid" },
      { name: "JavaScript", level: "mid" }
    ]
  }
];
