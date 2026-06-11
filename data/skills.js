/* ══════════════════════════════════════════════════════════════
   HABILIDADES
   ──────────────────────────────────────────────────────────────
   - level: "pro" (dominio) | "mid" (familiaridad)
   - Para agregar: añade { name: "...", level: "pro" } al grupo.
   ══════════════════════════════════════════════════════════════ */
window.SITE = window.SITE || {};

SITE.skills = [
  {
    group: { es: "Automatización / PLC", en: "Automation / PLC" },
    items: [
      { name: "RSLogix 500/5000", level: "pro" },
      { name: "TIA Portal", level: "pro" },
      { name: "Keyence (AI vision)", level: "pro" },
      { name: "COGNEX", level: "pro" },
    ]
  },
    {
    group: { es: "Software y Datos", en: "Software & Data" },
    items: [
      { name: "Python", level: "pro" },
      { name: "Excel VBA", level: "pro" },
      { name: "C", level: "pro" },
      { name: "C++", level: "pro" },
      { name: "MATLAB", level: "pro" },
      { name: "PowerBI", level: "pro" },
      { name: "C#", level: "mid" },
      { name: "MySQL", level: "mid" },
      { name: "HTML / CSS", level: "mid" },
      { name: "JavaScript", level: "mid" }
    ]
  },
    {
    group: { es: "Herramientas de Ingeniería", en: "Engineering Tools" },
    items: [
      { name: "AutoCAD", level: "pro" },
      { name: "EPICOR ERP", level: "pro" },
      { name: "SolidWorks", level: "mid" },
      { name: "LabVIEW", level: "mid" },
    ]
  },
  {
    group: { es: "Manufactura", en: "Manufacturing" },
    items: [

      { name: "IATF 16949", level: "pro" },
      { name: "Lean / Kaizen / 5s", level: "pro" },
      { name: "TPM, OEE/MTTR/MTBF", level: "pro" },
      { name: "FMEA", level: "pro" },
      { name: "metallographic analysis", level: "pro" },
      { name: "FANUC Laser Welding", level: "pro" },
      { name: "Struers equipment", level: "pro" }
    ]
  },
];
