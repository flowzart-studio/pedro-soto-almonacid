# Roadmap

## v0.1 — Sitio profesional Pedro

Prototipo estático, arquitectura de contenido separada, diseño responsive y flujo de CV/contacto.

## v0.2 — Contenido real y portafolio

### Integración visual local completada

Identidad aprobada «Pedro Soto Almonacid — Del análisis a la solución», tres áreas, Flowzart Studio, paleta y catálogo de seis proyectos registrados en `IDENTIDAD.md`, `PERFIL.md`, `PORTAFOLIO.md` y el bloque `v02` de `site.json`. La interfaz local está en v0.2: identidad, metodología, Flowzart, fichas filtrables y estructuras de formación/CV integradas. El contenido antiguo permanece en JSON.

### Secuencia de implementación

1. Revisar antecedentes y recopilar participación, herramientas, estado y evidencias de las seis fichas.
2. Completado: integración visual autorizada y aplicada. Punto Digital corresponde a Punto Deportivo Digital; alias conservado.
3. Completado: renderizadores, validación JSON/URLs, evidencia aprobada y HTML legible sin scripts.
4. Base verificada en escritorio, móvil y subruta, con respaldo sin scripts. Pendiente incorporar imágenes, antecedentes y CV reales, y repetir pruebas sobre ese contenido.
5. Completado: workflow manual de GitHub Actions preparado para publicar solo `dist/`, con pruebas y sincronización como controles. Consolidación v0.2 en commit local autorizado; historial anterior conservado. Pendiente decidir propietario, repositorio y visibilidad.
6. Pendiente: autorización específica para conectar remoto, primer push y activación de Pages; seguir `GITHUB_PAGES.md`. La primera publicación requiere ejecutar manualmente el workflow desde `main`. Conservar la publicación actual hasta decidir su coexistencia con GitHub Pages.

El siguiente gran paso es reemplazar placeholders con contenido verificado:

- fotografía profesional;
- experiencia, cargos, organizaciones y fechas;
- seis casos destacados de ingeniería, tecnología y diseño según `PORTAFOLIO.md`;
- problema, intervención y resultado de cada trabajo;
- problema observado y solución de cada proyecto propio;
- imágenes y capturas optimizadas;
- CV definitivo;
- correo, WhatsApp, LinkedIn y ubicación opcional.

## v0.3 — Segundo micrositio

Construir un caso distinto usando el mismo modelo de datos. Medir qué se reutiliza y qué necesita variación.

## v0.4 — Componentes reutilizables

Extraer patrones estables de navegación, hero, servicios, casos, proyectos, CTA y contacto. Formalizar tokens visuales y variantes.

## v0.5 — Prototipo de administración

Evaluar edición de contenido y publicación solo después de validar dos sitios reales. Definir requisitos antes de elegir CMS, base de datos o autenticación.

## Activación futura de Pages

Confirmar cuenta y URL → crear/confirmar repositorio vacío → autorizar y conectar `origin` → autorizar y subir `main` sin reescribir historial → seleccionar GitHub Actions como fuente de Pages → revisar permisos de `github-pages` → aprobar contenido público → ejecutar manualmente el workflow → verificar URL y recursos. Ninguno de estos pasos externos se ha ejecutado.
