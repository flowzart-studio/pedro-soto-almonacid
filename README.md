# Sitio profesional Pedro Soto Almonacid — contenido v0.3 local

**Del análisis a la solución.** Portafolio multidisciplinario de ingeniería, tecnología y diseño. El diseño v0.2 se conserva y se incorporan formación, trayectoria, contacto y contexto territorial en v0.3. Los datos aún desconocidos se mantienen pendientes. Publicación inicial verificada: https://flowzart-studio.github.io/pedro-soto-almonacid/ Repositorio: https://github.com/flowzart-studio/pedro-soto-almonacid. Commit funcional desplegado: `ac071417331a6b4f62860e51f87bc6b7ce99de16`.

## Ejecutar en local

No usa frameworks, dependencias npm ni build obligatorio:

```powershell
python -m http.server 8000 --directory dist
```

Abrir `http://localhost:8000/`. Usar servidor HTTP para que funcione la carga dinámica del JSON. Durante la auditoría se utilizó el Python incluido en Codex por problemas con el Python del sistema.

## Estructura y fuentes de verdad

```text
dist/
  index.html          # Estructura semántica y contenido de respaldo sin scripts
  css/styles.css      # Variables visuales, responsive y accesibilidad
  js/app.js           # Renderizadores, validación, navegación y filtros
  content/site.json   # Clave estable v02, versión de contenido 0.3.0
  assets/fonts/       # IBM Plex Sans y Mono + licencias SIL OFL
  assets/cv/          # Reservada para CV definitivo; sin PDF provisional
scripts/sync-content.cjs  # Actualiza respaldo HTML y tokens CSS desde JSON
tests/content.test.cjs    # Comprobaciones de renderizado y validación
archive/content/         # JSON histórico fuera de dist
output/pdf/              # CV provisional preservado fuera de dist
output/qa/               # Capturas y páginas de comprobación local; no publicar
```

`IDENTIDAD.md`, `PERFIL.md`, `PORTAFOLIO.md` y `VISION.md` son la base editorial. `STATUS.md` registra el resultado real y `ROADMAP.md` las etapas pendientes.

## Editar contenido

Editar el bloque `v02` de `dist/content/site.json`:

- `identity`, `presentation`: nombre, concepto y presentación; título y descripción SEO se derivan de estos datos. `metadata` admite overrides opcionales y actualmente está vacío para evitar duplicar textos.
- `territorialExperience`: experiencia agregada, complementariedad y herramienta de expedientes; cifras no atribuidas a fichas particulares.
- `areas`: tres áreas profesionales; `methodology`: cinco etapas y descripciones.
- `studio`: Flowzart Studio, actividades y práctica de IA.
- `featuredPortfolio`: seis fichas, campos y criterios descritos en `PORTAFOLIO.md`.
- `education`: entradas con `title`, `institution`, `type`, `period`, `description`, `evidenceIds`.
- `trajectory`: entradas con `role`, `organization`, `period`, `description`, `evidenceIds`.
- `portrait`: ruta `src` y texto alternativo `alt` de una imagen real.
- `cv`: `summary`, `file` y `available: true` solo cuando exista un CV definitivo aprobado.
- `contact`: correo, WhatsApp y su URL base, `whatsappMessage` inicial configurable, etiqueta/URL LinkedIn y ubicación publicable. WhatsApp abre un borrador editable antes del envío.
- `theme.palette`: cinco colores configurables. Las tipografías se declaran mediante `@font-face` en CSS y se alojan localmente.

Campos vacíos se omiten. El estado editorial de una ficha se distingue del estado del proyecto. Resultados e imágenes necesitan referencias de evidencia con `publicationApproved: true`; las imágenes requieren `alt`. No introducir HTML en JSON. Se escapa texto y se permiten URLs externas HTTPS sin credenciales, más rutas de recursos `assets/...` sin traversal.

Después de editar el JSON:

```powershell
node scripts/sync-content.cjs
node --test tests/content.test.cjs
node scripts/sync-content.cjs --check
```

La sincronización usa los mismos renderizadores que el navegador para mantener coherentes JSON y HTML de respaldo, metadatos, retrato, CV y paleta. No publica ni compila. Conservar los comentarios `content:...` en HTML. Las secciones, navegación, botones y textos de interfaz se editan en HTML; comportamiento y estilos se editan en JS/CSS.

Los campos originales se archivaron en `archive/content/site-v0.2-ecaa00a.json` fuera del directorio publicable y permanecen en Git. La clave `v02` se conserva como contrato del modelo, aunque la versión activa es 0.3.0. Punto Digital corresponde a Punto Deportivo Digital: TEC-001 conserva alias y referencia PRY-001. No hay fusión con Goals, Expedientes SAG ni Bingo.

## Rutas y publicación

Mantener rutas relativas a `dist/index.html`, sin `/` inicial, respetando mayúsculas/minúsculas. CSS resuelve sus recursos desde `dist/css/`. El sitio fue comprobado bajo la subruta `/dist/` y no requiere prefijo de repositorio ni `<base>`.

`.openai/hosting.json` conserva la identidad del sitio anterior de Sites, que no se modificó. GitHub Pages publica exclusivamente dist mediante el workflow manual y verificado; origin apunta al repositorio público. El original conserva su ubicación e historial; la copia pública usa el historial limpio. Ver GITHUB_PAGES.md para próximas publicaciones manuales.

## Principios conservados

Contenido separado de presentación; una página narrativa; navegación por anclas; HTML semántico; teclado y foco visibles; movimiento reducido; responsive desde 320 px; sin backend, CMS, base de datos, analítica ni 3D. La complejidad solo crece cuando el contenido y los casos reales la justifican.

Las capturas y páginas de `output/qa/` se conservan localmente, ignoradas por Git; únicamente su informe `VALIDACION.md` se versiona. Todo contenido bajo `dist/` será accesible si se publica. Se retiraron de esta carpeta el PDF provisional y los datos históricos del JSON, conservándolos fuera de dist; no alojar allí datos privados.

## Respaldo y publicación segura

El original y su respaldo completo están fuera de esta copia. En el historial público se excluyeron ambas rutas del PDF provisional, preservando el resto de archivos y metadatos. No hay PDFs en dist ni recuperables desde las referencias remotas verificadas. La interfaz conserva formación y trayectoria sin ofrecer un CV sustituto. Ver INFORME_PUBLICACION.md para comprobaciones y resultados.

## Publicación inicial completada

GitHub Pages está activo con workflow manual. El historial público excluye todos los PDFs provisionales; el repositorio original y su respaldo conservan el historial completo fuera de la copia pública. La documentación de cierre se registra después del despliegue; los archivos de dist permanecen iguales al commit funcional publicado. Ver STATUS.md y GITHUB_PAGES.md para estado y procedimiento vigentes.
