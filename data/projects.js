/* ══════════════════════════════════════════════════════════════
   PROYECTOS
   ──────────────────────────────────────────────────────────────
   Para AGREGAR un proyecto: copia un bloque { ... } y edita.

   - id:    único, sin espacios (se usa en la URL: project.html?id=...)
   - icon:  "gear" | "shield" | "music" | "chip" | "cube" | "chart"
   - repo:  URL de GitHub (o null si no tiene)
   - detail: contenido de la página propia del proyecto.
     · highlights: lista de logros/características clave
     · gallery: rutas de imágenes, ej. ["assets/projects/weld-01.png"]
       (crea la carpeta assets/projects/ y sube ahí tus imágenes)
   ══════════════════════════════════════════════════════════════ */
window.SITE = window.SITE || {};

SITE.projects = [
  {
    id: "laser-weld-validator",
    icon: "gear",
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
      gallery: []
    }
  },

  {
    id: "poka-yoke-vba",
    icon: "shield",
    title: { es: "Sistema Poka-Yoke en Excel VBA", en: "Excel VBA Poka-Yoke System" },
    desc: {
      es: "Sistema a prueba de errores para captura de datos SAF que redujo errores 30%. Construido con análisis iterativo de errores en campo y desplegado como estándar de producción.",
      en: "Error-proofing system for SAF data entry that reduced input errors by 30%. Built through iterative field error analysis, user testing, and deployed as a production standard."
    },
    tags: ["Excel VBA", "Poka-Yoke", "IATF 16949"],
    repo: "https://github.com/HdzDaniel7",
    detail: {
      long: {
        es: "Sistema poka-yoke desarrollado a partir del análisis de los errores de captura más frecuentes en el sistema SAF de mantenimiento. Valida entradas en tiempo real, bloquea combinaciones inválidas y guía al técnico durante la captura.",
        en: "Poka-yoke system developed from analysis of the most frequent data-entry errors in the SAF maintenance system. It validates entries in real time, blocks invalid combinations, and guides technicians through data capture."
      },
      highlights: [
        { es: "Reducción del 30% en errores de captura tras el despliegue", en: "30% reduction in input errors after deployment" },
        { es: "Adoptado como estándar de producción para el área de mantenimiento", en: "Adopted as production standard for the maintenance area" },
        { es: "Diseño iterativo validado con pruebas de usuario en piso", en: "Iterative design validated with shop-floor user testing" }
      ],
      stack: ["Excel VBA", "EPICOR"],
      gallery: []
    }
  },

  {
    id: "pwm-music-editor",
    icon: "music",
    title: { es: "Editor de Partituras PWM", en: "PWM Music Score Editor" },
    desc: {
      es: "Editor de partituras embebido que compila partituras digitales personalizadas a código de audio PWM para microcontroladores ESP32 y ATmega328P.",
      en: "Embedded music score editor that compiles custom digital sheet music into PWM audio code for ESP32 and ATmega328P microcontrollers."
    },
    tags: ["ESP32", "ATmega328P", "C++", "Embedded"],
    repo: "https://github.com/HdzDaniel7/microcontroller-music-box",
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
      gallery: []
    }
  },

  {
    id: "gpu-workstations",
    icon: "chip",
    title: { es: "Workstations GPU de Alto Rendimiento", en: "High-Performance GPU Workstations" },
    desc: {
      es: "Workstations AMD personalizadas para Revit, CAD/CAE y renderizado de larga duración. Optimizadas con benchmarking, ajuste térmico y perfiles de eficiencia energética.",
      en: "Custom AMD GPU workstations architected for Revit, CAD/CAE, and long-duration rendering. Optimized through benchmarking, thermal tuning, and power-efficiency profiling."
    },
    tags: ["AMD GPU", "Benchmarking", "Thermal Optimization", "CAD/CAE"],
    repo: "https://github.com/HdzDaniel7",
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
      gallery: []
    }
  }
];
