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
    company: "MUVIQ",                     // ← TODO: nombre real de la empresa
    location: "San Luis Potosí",
    period:  { es: "FEB 2025 → OCT 2025", en: "FEB 2025 → OCT 2025" },
    bullets: [
      {
        es: "**Reducción del tiempo de ciclo de validación de soldadura láser en un 40% **mediante herramienta Python + Excel con visualización 3D del cordón de soldadura y análisis de imagen Nivel B según ISO 13919-1; la herramienta permanece en producción activa.",
        en: "**Reduced laser weld validation cycle time by 40%** via Python + Excel tool with 3D weld seam visualization and ISO 13919-1 Level B image analysis; tool remains in active production."
      },
      {
        es: "Realización de estudios metalográficos completos (preparación en baquelita, ataque ácido, programación de cortadora Struers, microscopía) y redacción de instrucciones de trabajo que permiten al equipo de calidad realizar estudios de forma independiente tras la entrega.",
        en: "Conducted full metallographic studies (bakelite prep, acid etching, Struers cutter programming, microscopy) and authoredwork instructions enabling quality team to perform studies independently after handoff."
      },
      {
        es: "Programación de cámaras AI Keyence IV4 en sistema de inspección Jidoka, **reduciendo rechazos falsos y disminuyendo el desperdicio en un 15%.**",
        en: "Programmed Keyence IV4 AI cameras in a Jidoka inspection system, **reducing false rejects and cutting scrap by 15%.**"
      },
      {
        es: "Coordinación de la producción y resolución de errores en línea en ausencia del ingeniero titular; capacitación de técnicos de mantenimiento y manufactura (5S, Kaizen, operación de equipos).",
        en: "Coordinated production and resolved line errors in the absence of the lead engineer; trained maintenance and manufacturing technicians (5S, Kaizen, equipment operation)."
      },
      {
        es: "Elaboración de documentación técnica multilingüe, procedimientos operativos y guías de mantenimiento a partir de especificaciones de ingeniería, apoyada por una plataforma de gestión documental en VBA con control de acceso por usuario y rol desarrollada de forma propia.",
        en: "Created multilingual technical documentation, operational procedures, and maintenance guides from engineering specifications, supported by a self-developed VBA document management login platform with user- and role-based access control."
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
        es: "**Reducción de errores de captura en SAF en un 30% ** mediante el desarrollo de un poka-yoke en Excel VBA con entrada guiada de datos y autovalidación.",
        en: "**Reduced SAF input errors by 30% ** by developing an Excel VBA poka-yoke with guided data entry with autovalidation."
      },
      {
        es: "Gestión de TPMs de toda la planta y registros de mantenimiento preventivo mediante EPICOR para cumplimiento en auditorías IATF 16949.",
        en: "Managed plant-wide TPMs and preventive maintenance records via EPICOR to support IATF 16949 audit compliance.."
      },
      {
        es: "Automatización de dashboards de KPIs de mantenimiento integrando métricas de MTTR, MTBF, disponibilidad y OEE.",
        en: "Automated maintenance KPI dashboards integrating MTTR, MTBF, uptime, and OEE metrics."
      },
      {
        es: "Modificación de PLCs Allen Bradley (RSLogix 500) en tableros de control neumático para fresadoras: incorporación de contactores, unidades de purga de aire RFL y actualización de lógica escalera.",
        en: "Modified Allen Bradley PLCs (RSLogix 500) on pneumatic control panels for milling machines: added contactors, RFL air-purge units, and updated ladder logic."
      },
      {
        es: "Soporte en mantenimiento correctivo y preventivo en celdas robóticas, bandas transportadoras, soldadura láser, lavado ultrasónico y sistemas de ensamble automatizado durante operaciones activas de producción.",
        en: "Supported corrective and preventive maintenance on robotic cells, conveyors, laser welding, ultrasonic washing, and automated assembly systems during active production operations."
      }
    ]
  },

  {
    role:    { es: "Proyectos Personales", en: "Personal Projects" },
    company: { es: "Independiente", en: "Independent" },
    location: "San Luis Potosí",
    period:  { es: "2025 → PRESENTE", en: "2025 → PRESENT" },
    bullets: [
      {
        es: "**Herramienta de Análisis 3D de Cordón de Soldadura** (Python, NumPy, Matplotlib). Visualiza concentricidad/excentricidad para ajuste de trayectoria robótica. Desarrollada de forma independiente; actualmente en uso activo.",
        en: "**3D Weld Seam Analysis Tool** (Python, NumPy, Matplotlib). Visualizes concentricity/eccentricity for robot path adjustment. Developed independently; currently in active use."
      },
      {
        es: "**Aplicación Web de Nutrición Clínica** (React, Node.js, SQLite, Python). Aplicación full-stack: expedientes de pacientes, gráficas de progreso, planes de alimentación personalizados con exportación a PDF y base de datos de más de 1,600 alimentos mexicanos con datos de macro y micronutrientes.",
        en: "**Clinical Nutrition Web App** (React, Node.js, SQLite, Python). Full-stack app: patient records, progress charts, personalized meal plans with PDF export, and 1,600+ item Mexican food database with macro/micronutrient data."
      },
      {
        es: "**Editor de Partitura PWM** (C, JavaScript, ESP32, ATmega328P). Editor de partituras web que genera código de audio PWM para microcontroladores; canciones exportables en MIDI/JSON/INO.",
        en: "**PWM Music Score Editor** (C, JavaScript, ESP32, ATmega328P). Web-based score editor generating PWM audio code for microcontrollers; MIDI/JSON/INO exportable songs."
      },
    ]
  }
];
