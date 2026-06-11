/* ══════════════════════════════════════════════════════════════
   EXPERIENCIA PROFESIONAL
   ──────────────────────────────────────────────────────────────
   Para AGREGAR un trabajo: copia un bloque { ... }, pégalo AL
   INICIO del array (el orden aquí = orden en la página) y edita.

   - Usa **texto** dentro de un bullet para resaltarlo.
   - Cada campo bilingüe es { es: "...", en: "..." }
   ══════════════════════════════════════════════════════════════ */
window.SITE = window.SITE || {};

SITE.experience = [
  {
    role:    { es: "Practicante de Proyectos", en: "Projects Intern" },
    company: "Empresa",                     // ← TODO: nombre real de la empresa
    location: "San Luis Potosí",
    period:  { es: "FEB 2025 → OCT 2025", en: "FEB 2025 → OCT 2025" },
    bullets: [
      {
        es: "Estandaricé la validación de primera pieza de soldadura láser desarrollando documentación metalográfica y herramientas de reporte automatizado, **reduciendo el cycle time 40%** con metodología Kaizen.",
        en: "Standardized laser weld first-piece validation by developing metallographic documentation and automated reporting tools, **reducing cycle time by 40%** using Kaizen methodology."
      },
      {
        es: "Desarrollé una herramienta de **Python + Excel VBA** para validación de calidad de soldadura láser con análisis de imagen según ISO 13919-1 Nivel B y visualización 3D.",
        en: "Developed a **Python + Excel VBA** automation tool for laser weld quality validation using image analysis based on ISO 13919-1 Level B specifications and 3D visualization."
      },
      {
        es: "**Reduje el scrap 15%** programando sensores Keyence IV en un sistema Jidoka para detectar defectos de ensamble.",
        en: "**Reduced scrap by 15%** by programming Keyence IV sensors in a Jidoka system to detect assembly defects."
      },
      {
        es: "Capacité equipos multifuncionales con **metodología 5S** durante el arranque de línea de producción y despliegue de herramentales.",
        en: "Trained cross-functional teams using **5S methodology** during production line startup and tooling deployment."
      },
      {
        es: "Desarrollé un dashboard en Excel para calcular niveles de concentración de lavado ultrasónico y generar acciones correctivas a partir de datos de titulación.",
        en: "Developed an Excel dashboard to calculate ultrasonic washing concentration levels and generate corrective actions based on titration data."
      }
    ]
  },

  {
    role:    { es: "Practicante de Mantenimiento", en: "Maintenance Intern" },
    company: "MUVIQ",
    location: "San Luis Potosí",
    period:  { es: "JUL 2024 → ENE 2025", en: "JUL 2024 → JAN 2025" },
    bullets: [
      {
        es: "**Reduje errores de captura SAF 30%** desarrollando un sistema poka-yoke en Excel VBA basado en análisis de errores en campo.",
        en: "**Reduced SAF input errors by 30%** by developing an Excel VBA poka-yoke system based on field error analysis."
      },
      {
        es: "Gestioné TPMs y registros de mantenimiento preventivo vía EPICOR para soportar el **cumplimiento de auditorías IATF 16949**.",
        en: "Managed TPMs and preventive maintenance records via EPICOR to support **IATF 16949 audit compliance**."
      },
      {
        es: "Automaticé dashboards de KPIs de mantenimiento integrando métricas de **MTTR, MTBF, uptime y OEE**.",
        en: "Automated maintenance KPI dashboards integrating **MTTR, MTBF, uptime, and OEE** metrics."
      },
      {
        es: "Realicé troubleshooting en equipos de manufactura automatizada: lógica de **PLC Allen Bradley**, sistemas de validación HMI, sensores e integraciones neumáticas.",
        en: "Performed troubleshooting on automated manufacturing equipment including **Allen Bradley PLC** logic, HMI validation systems, sensors, and pneumatic integrations."
      },
      {
        es: "Apoyé mantenimiento correctivo y preventivo en celdas robóticas, conveyors, soldadura láser, lavado ultrasónico y sistemas de ensamble automatizado durante producción activa.",
        en: "Supported corrective and preventive maintenance on robotic cells, conveyors, laser welding, ultrasonic washing, and automated assembly systems during active production operations."
      }
    ]
  },

  {
    role:    { es: "Proyectos Personales", en: "Personal Projects" },
    company: { es: "Independiente", en: "Independent" },
    location: "San Luis Potosí",
    period:  { es: "2019 → PRESENTE", en: "2019 → PRESENT" },
    bullets: [
      {
        es: "Desarrollé un **editor de partituras musicales** capaz de generar código de audio PWM para microcontroladores ESP32 y ATmega328P.",
        en: "Developed a **music score editor** capable of generating PWM-based audio code for ESP32 and ATmega328P microcontrollers."
      },
      {
        es: "Diseñé **workstations de alto rendimiento con GPU AMD** optimizadas para Revit, CAD/CAE y renderizado de larga duración mediante benchmarking y optimización térmica.",
        en: "Architected **high-performance AMD GPU workstations** optimized for Revit, CAD/CAE, and long-duration rendering workloads through benchmarking, thermal, and power-efficiency optimization."
      }
    ]
  }
];
