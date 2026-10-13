# Identidad profesional — v0.2

Decisiones aprobadas por Pedro el 13 de octubre de 2026. La auditoría previa está completada. La integración visual v0.2 fue autorizada posteriormente y está implementada únicamente en local. La consolidación Git local está autorizada; no hay publicación ni push.

## Identidad y propósito

- Nombre principal: **Pedro Soto Almonacid**.
- Concepto central: **Del análisis a la solución.**
- Público: empresas, instituciones, empleadores y clientes.
- Áreas: Ingeniería y soluciones técnicas; Tecnología y desarrollo digital; Diseño, fabricación y prototipado.
- Tono: equilibrado, profesional, humano y cercano.

Propuesta aprobada: Pedro integra análisis técnico, diseño y ejecución para transformar necesidades en soluciones concretas. Su actividad comprende ingeniería aplicada, desarrollo de aplicaciones, diseño digital, fabricación y prototipado.

La narrativa debe presentar un profesional multidisciplinario mediante su enfoque y sus proyectos. La formación y trayectoria aportan contexto, pero el sitio no se organizará como un currículum online convencional.

## Flowzart Studio

Es el espacio independiente de trabajo técnico y creativo de Pedro, desde donde desarrolla proyectos físicos y digitales. Se presentará como estudio/taller, sin atribuirle forma jurídica, equipo, clientes, fechas de fundación ni acreditaciones no confirmadas.

Combina ingeniería y análisis de factibilidad, diseño técnico y creativo, desarrollo de software y herramientas digitales, fabricación de productos y prototipos, e investigación y aplicación práctica de inteligencia artificial.

Texto preparado: «En Flowzart Studio conecto análisis, diseño y ejecución para desarrollar proyectos físicos y digitales. Estudio y experimento continuamente con tecnologías de inteligencia artificial, integrándolas en diferentes etapas de mis proyectos».

## Decisiones visuales

Estética oscura, técnica y contemporánea, con legibilidad y contenido visual real. Paleta inicial configurable:

| Token propuesto | Valor | Uso |
| --- | --- | --- |
| background | #151A1F | Fondo |
| surface | #252D34 | Superficies |
| accent | #C8926E | Acento cobre |
| text | #F2F3F1 | Texto principal |
| textSecondary | #9AA7B2 | Texto secundario |

Tipografías implementadas y alojadas en `dist/assets/fonts/`, con sus licencias SIL OFL: IBM Plex Sans para lectura y IBM Plex Mono para referencias técnicas. IBM Plex Sans usa fuente variable (pesos 100–700) y IBM Plex Mono regular. Se conservan fallbacks del sistema y `font-display: swap`. No se realizan solicitudes a servicios externos de fuentes. Fuente de los archivos: repositorio oficial `google/fonts`, directorios `ofl/ibmplexsans` y `ofl/ibmplexmono`.

La paleta está registrada en `v02.theme.palette` y aplicada como variables CSS. El script `scripts/sync-content.cjs` sincroniza también el respaldo sin JavaScript. Se comprobaron los contrastes de texto principal, secundario y cobre sobre fondo y superficies.

La inspiración en portafolios interactivos se limita a explorar proyectos y navegación clara. No se requiere videojuego, 3D ni animación que impida leer o acceder al contenido.

## Reglas editoriales

- Usar solo información proporcionada y evidencias revisadas.
- Diferenciar estado del proyecto de estado de documentación.
- No inventar fechas, empresas, métricas, aprobaciones, resultados, grados o certificaciones.
- Mantener datos desconocidos vacíos y registrarlos como pendientes en documentación.
- No sustituir fotos o capturas faltantes por material presentado como evidencia real.
- Revisar permiso de publicación y datos sensibles de cada evidencia.
- Conservar el contenido de v0.1 hasta revisar su integración con v0.2.

## Antes del rediseño

Presentar impacto y aprobar integración visual: nombre y narrativa en hero, sección Flowzart, catálogo destacado, metadatos, retrato y tokens. Conservar HTML/CSS/JavaScript/JSON, navegación por anclas y descarga de CV. Publicación, push y despliegue requieren autorización específica.

## Metodología integrada

La instrucción visual más reciente prioriza exploración, factibilidad, prototipado, validación e implementación. Por ello, `v02.methodology` adopta Explorar → Evaluar → Prototipar → Validar → Implementar. La mejora continua forma parte de la última etapa. El proceso original de v0.1 se conserva en el JSON para compatibilidad.

## Decisiones definitivas para publicación

Flowzart Studio se mantiene como nombre del estudio técnico y creativo de Pedro Soto Almonacid. la actividad independiente descartada queda excluido del sitio, de la cronología y de las fichas profesionales. No se presenta Flowzart Studio como marca registrada: el trámite ante INAPI está pendiente. Esta última información se registra como decisión editorial, sin introducir afirmaciones de registro en la web.

Destino GitHub previsto: propietario `flowzart-studio`, repositorio `pedro-soto-almonacid`. No se ha creado ni conectado. Se conserva la ubicación local y todo el historial; push y despliegue requieren autorización posterior.
