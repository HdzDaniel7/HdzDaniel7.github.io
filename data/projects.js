/* ══════════════════════════════════════════════════════════════
   PROYECTOS
   ──────────────────────────────────────────────────────────────
   Para AGREGAR un proyecto: copia un bloque { ... } y edita.

   - id:    único, sin espacios (se usa en la URL: project.html?id=...)
   - icon:  "gear" | "shield" | "music" | "chip" | "cube" | "chart"
   - img:   imagen de portada para la tarjeta (duotono automático),
            ej. "assets/projects/weld-cover.png" — o null si no tiene
   - repo:  URL de GitHub (o null si no tiene)
   - detail: contenido de la página propia del proyecto.
     · highlights: lista de logros/características clave
     · flow: diagrama de bloques del sistema (lista de etapas bilingües)
     · gallery: rutas de imágenes, ej. ["assets/projects/weld-01.png"]
       (crea la carpeta assets/projects/ y sube ahí tus imágenes)
   ══════════════════════════════════════════════════════════════ */
window.SITE = window.SITE || {};

SITE.projects = [
  {
    id: "laser-weld-validator",
    icon: "gear",
    img: null,
    title: { es: "Validador de Calidad de Soldadura Láser", en: "Laser Weld Quality Validator" },
    desc: {
      es: "Herramienta Python + Excel para validación automatizada de calidad de soldadura láser. Análisis de imagen según ISO 13919-1 Nivel B con visualización 3D y reportes automáticos.",
      en: "Python + Excel tool for automated laser weld quality validation. Image analysis based on ISO 13919-1 Level B specs with 3D visualization and automated reporting."
    },
    tags: ["Python", "Excel VBA", "Image Analysis", "ISO 13919-1"],
    repo: "https://github.com/HdzDaniel7/Weld-eccentricity-visualizer",
    detail: {
      long: {
        es: "Sistema desarrollado durante mi estancia en proyectos para estandarizar la validación de primera pieza de soldadura láser. Combina análisis de imagen en Python con reportes automatizados en Excel VBA, eliminando la medición manual y reduciendo el cycle time de validación en 40%.",
        en: "System developed during my projects internship to standardize laser weld first-piece validation. It combines Python image analysis with automated Excel VBA reporting, eliminating manual measurement and reducing validation cycle time by 40%."
      },
      highlights: [
        { es: "Análisis de excentricidad y penetración basado en especificaciones ISO 13919-1 Nivel B", en: "Eccentricity and penetration analysis based on ISO 13919-1 Level B specifications" },
        { es: "Visualización 3D del cordón de soldadura para análisis metalográfico", en: "3D weld bead visualization for metallographic analysis" },
        { es: "Generación automática de reportes de validación listos para auditoría", en: "Automatic generation of audit-ready validation reports" }
      ],
      stack: ["Python", "OpenCV", "Matplotlib", "Excel VBA"],
      flow: [
        { es: "IMAGEN DEL CORDÓN", en: "WELD IMAGE" },
        { es: "ANÁLISIS OPENCV", en: "OPENCV ANALYSIS" },
        { es: "VALIDACIÓN ISO 13919-1", en: "ISO 13919-1 CHECK" },
        { es: "REPORTE EXCEL", en: "EXCEL REPORT" }
      ],
      gallery: []
    }
  },

  {
    id: "pwm-music-editor",
    icon: "music",
    img: null,
    title: { es: "Editor de Partituras PWM", en: "PWM Music Score Editor" },
    desc: {
      es: "Editor de partituras embebido que compila partituras digitales personalizadas a código de audio PWM para microcontroladores ESP32 y ATmega328P.",
      en: "Embedded music score editor that compiles custom digital sheet music into PWM audio code for ESP32 and ATmega328P microcontrollers."
    },
    tags: ["ESP32", "ATmega328P", "C++", "Embedded"],
    repo: "https://github.com/HdzDaniel7/Interfaz-Musical---Microcontroladores",
    detail: {
      long: {
        es: "Proyecto personal que une música y sistemas embebidos: un editor que permite escribir partituras digitales y compilarlas a código C++ con generación de audio por PWM, reproducible en microcontroladores de bajo costo.",
        en: "Personal project bridging music and embedded systems: an editor for writing digital sheet music and compiling it to C++ code with PWM audio generation, playable on low-cost microcontrollers."
      },
      highlights: [
        { es: "Notación musical personalizada compilada a arrays de frecuencia/duración", en: "Custom music notation compiled to frequency/duration arrays" },
        { es: "Soporte para ESP32 y ATmega328P (Arduino)", en: "Support for ESP32 and ATmega328P (Arduino)" },
        { es: "Generación de audio por PWM sin hardware adicional", en: "PWM audio generation with no extra hardware" }
      ],
      stack: ["C++", "Arduino", "ESP32"],
      flow: [
        { es: "PARTITURA DIGITAL", en: "DIGITAL SCORE" },
        { es: "COMPILADOR", en: "COMPILER" },
        { es: "CÓDIGO PWM", en: "PWM CODE" },
        { es: "ESP32 / ATMEGA328P", en: "ESP32 / ATMEGA328P" }
      ],
      gallery: []
    }
  },

  {
    id: "nutri-app",
    icon: "chart",
    img: null,
    title: { es: "Aplicación de Nutrición Clínica", en: "Clinical Nutrition App" },
    desc: {
      es: "Aplicación web full-stack para nutriólogos: expedientes de pacientes, gráficas de progreso, agenda y planes de alimentación personalizados con exportación a PDF.",
      en: "Full-stack web app for nutritionists: patient records, progress charts, scheduling, and personalized meal plans with PDF export."
    },
    tags: ["React", "Node.js", "SQLite", "Python"],
    repo: "https://github.com/HdzDaniel7/NutriApp",
    detail: {
      long: {
        es: "Aplicación web completa para la práctica clínica de nutrición: gestión de expedientes de pacientes con gráficas de progreso, generación de planes de alimentación personalizados exportables a PDF, y una base de datos de más de 1,600 alimentos mexicanos con macro y micronutrientes.",
        en: "Complete web application for clinical nutrition practice: patient record management with progress charts, personalized meal plan generation with PDF export, and a database of 1,600+ Mexican foods with macro and micronutrient data."
      },
      highlights: [
        { es: "Base de datos de más de 1,600 alimentos mexicanos con datos de macro y micronutrientes", en: "Database of 1,600+ Mexican foods with macro and micronutrient data" },
        { es: "Expedientes de pacientes con gráficas de progreso a lo largo del tratamiento", en: "Patient records with progress charts across the treatment" },
        { es: "Planes de alimentación personalizados con exportación a PDF", en: "Personalized meal plans with PDF export" }
      ],
      stack: ["React", "Node.js", "SQLite", "Python"],
      flow: [
        { es: "EXPEDIENTE", en: "PATIENT RECORD" },
        { es: "BASE DE 1,600 ALIMENTOS", en: "1,600-FOOD DATABASE" },
        { es: "PLAN PERSONALIZADO", en: "CUSTOM MEAL PLAN" },
        { es: "PDF", en: "PDF" }
      ],
      gallery: []
    }
  },

  {
    id: "gpu-workstations",
    icon: "chip",
    img: null,
    title: { es: "Workstations GPU de Alto Rendimiento", en: "High-Performance GPU Workstations" },
    desc: {
      es: "Workstations AMD personalizadas para Revit, CAD/CAE y renderizado de larga duración. Optimizadas con benchmarking, ajuste térmico y perfiles de eficiencia energética.",
      en: "Custom AMD GPU workstations architected for Revit, CAD/CAE, and long-duration rendering. Optimized through benchmarking, thermal tuning, and power-efficiency profiling."
    },
    tags: ["AMD GPU", "Benchmarking", "Thermal Optimization", "CAD/CAE"],
    detail: {
      long: {
        es: "Diseño y ensamble de estaciones de trabajo orientadas a cargas de ingeniería: modelado en Revit, simulación CAD/CAE y renderizado prolongado. Cada build se valida con benchmarking estructurado y se optimiza térmica y energéticamente.",
        en: "Design and assembly of workstations targeting engineering workloads: Revit modeling, CAD/CAE simulation, and long rendering sessions. Each build is validated with structured benchmarking and optimized for thermals and power efficiency."
      },
      highlights: [
        { es: "Selección de componentes basada en benchmarks por carga de trabajo", en: "Component selection based on per-workload benchmarks" },
        { es: "Optimización de curvas térmicas para sesiones de render prolongadas", en: "Thermal curve optimization for extended rendering sessions" },
        { es: "Perfiles de eficiencia energética para operación 24/7", en: "Power-efficiency profiles for 24/7 operation" }
      ],
      stack: ["AMD GPU", "Hardware", "Benchmarking"],
      flow: [
        { es: "CARGA DE TRABAJO", en: "WORKLOAD" },
        { es: "BENCHMARKS", en: "BENCHMARKS" },
        { es: "ENSAMBLE", en: "BUILD" },
        { es: "AJUSTE TÉRMICO", en: "THERMAL TUNING" }
      ],
      gallery: []
    }
  }
];
