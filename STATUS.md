# Estado del producto

**Interfaz local actual:** 0.2.0. Integración visual completada; documentación de proyectos y antecedentes todavía pendiente. Publicación actual conservada en v0.1.

## Implementado en v0.2 local

- Identidad Pedro Soto Almonacid / Del análisis a la solución.
- Paleta oscura configurable, IBM Plex Sans y Mono alojadas localmente con licencias OFL.
- Portada, sobre mí, tres áreas, metodología de cinco etapas, seis fichas, Flowzart Studio, trayectoria/formación/CV y contacto.
- Flowzart como estudio/taller y práctica de investigación, experimentación y aplicación de IA.
- Filtros por categoría con botones, `aria-pressed` y anuncio accesible del resultado.
- Menú móvil con cierre por Escape, devolución del foco y cierre al navegar.
- Renderizadores que omiten campos vacíos, validan URLs y exigen evidencia aprobada para imágenes/resultados.
- Estructura de formación y trayectoria; ningún grado, cargo o fecha inventado.
- CV provisional conservado como archivo, sin ofrecerlo como CV definitivo. Descarga disponible cuando `v02.cv.available` sea verdadero y la ruta válida.
- HTML de respaldo visible sin scripts o ante fallo de JSON; sincronización opcional desde JSON con `scripts/sync-content.cjs`, sin dependencias ni build obligatorio.
- Datos originales conservados; Punto Deportivo Digital mantiene alias Punto Digital y referencia PRY-001.
- Consolidación autorizada en commit local; sin push, publicación, despliegue ni cambios de configuración de hosting.

## Validación de v0.2

- Navegador en escritorio de 1440 px y móvil de 390 y 320 px; sin desbordamiento horizontal en las dimensiones revisadas.
- Seis fichas y cinco etapas renderizadas; filtro de Tecnología muestra Punto Deportivo Digital y Costeo, restablecimiento a todos devuelve seis.
- Menú móvil, Escape y navegación a Flowzart comprobados; consola normal sin errores ni advertencias.
- Página de QA sin scripts: seis fichas y cinco etapas legibles, navegación visible y filtros ocultos.
- Fallo HTTP del JSON simulado: conserva seis fichas y presenta mensaje de respaldo.
- Enlace para saltar contenido comprobado con foco en `main`; contraste mínimo de los colores de texto previstos: 5.18:1.
- Seis pruebas Node (incluido modo de comprobación del sincronizador): catálogo, validación de URLs, escape de HTML/tipos incorrectos, autorización de evidencias y modelo inválido.
- Rutas verificadas bajo `/dist/` para simular una subruta. Capturas y páginas de prueba en `output/qa/`, fuera del sitio publicable.
- Revisión básica de semántica, foco, contraste y movimiento reducido; no constituye auditoría exhaustiva con lectores de pantalla o dispositivos físicos.

## Git, publicación y verificación de la auditoría

Rama `main`. El commit raíz `53e90bf` se conserva y esta consolidación se registra mediante el commit local `feat: integra identidad profesional y portafolio v0.2`. Este documento forma parte de ese commit; su hash exacto se obtiene con `git log -1 --format=%H` y se comunica en la entrega. No hay remoto GitHub ni push. Git requiere una excepción temporal por diferencia de propietario; no se cambió su configuración permanente.

Sites confirma una publicación exitosa en https://pedro-soto-profesional.dropiee.chatgpt.site, versión guardada 1, asociada al mismo commit y con acceso restringido al propietario. La preparación local de GitHub Pages está en `.github/workflows/pages.yml`, con evento único `workflow_dispatch`, rama `main` y artefacto `dist/`. Pages no está activado y el workflow no se ha ejecutado en GitHub.

Durante la auditoría, HTML, CSS, JS, JSON y CV respondieron HTTP 200; el navegador renderizó el contenido sin errores de consola. Se utilizó Python incluido en Codex por problemas con el Python del sistema y las restricciones del aislamiento. No fue una validación completa de móvil o accesibilidad.

## Historial de v0.1 (base anterior)

- sitio profesional estático de una página;
- navegación responsive con menú móvil;
- hero, presentación, capacidades, experiencia, trabajos, proyectos, CV, contacto y footer;
- contenido centralizado y renderizado desde JSON;
- descarga de un PDF placeholder válido;
- metadatos básicos, favicon, foco visible, enlace para saltar contenido y soporte para movimiento reducido;
- diseño adaptable para teléfono, tablet y escritorio;
- documentación de uso y evolución.
- identidad visual refinada como estudio técnico, laboratorio y taller, con paleta grafito, papel y cobre;
- narrativa transversal basada en transformar problemas técnicos u operativos en soluciones concretas;
- capacidades organizadas en tres mundos: ingeniería, sistemas digitales y prototipado;
- sección «Cómo trabajo» con cinco etapas configurables;
- fichas técnicas para casos, con metadatos opcionales y espacios para varias imágenes;
- proyectos propios narrados desde el problema observado hacia la herramienta creada;
- eliminación de coordenadas decorativas no verificadas.

## Contenido pendiente

- título profesional, formación y antecedentes verificables; propuesta multidisciplinaria integrada;
- biografía corta y fotografía;
- experiencia laboral, fechas y organizaciones;
- servicios concretos y su alcance;
- casos reales con problema, intervención, resultado e imágenes;
- problema observado, solución, estado, tecnologías y enlaces de proyectos;
- CV definitivo;
- correo, WhatsApp, LinkedIn y ubicación.

## Límites actuales

- Fotos, evidencias, resultados, participación, herramientas, estados y enlaces de las seis fichas están pendientes de confirmar.
- Formación, trayectoria, retrato, CV definitivo y contacto aún no están disponibles.
- Después de editar JSON, ejecutar sincronización para actualizar también el HTML sin JavaScript y los metadatos estáticos.
- Para probar carga dinámica del JSON, usar servidor HTTP; apertura directa como archivo puede bloquear fetch.
- Sin formulario, backend, analítica, 3D ni framework por alcance.
- GitHub Pages tiene workflow manual preparado, pero no remoto ni activación; requiere decisión y autorización posterior.

## Material visual pendiente

- retrato profesional vertical de Pedro;
- vistas generales y detalles de trabajos de ingeniería e hidráulica;
- imágenes del proceso, montaje y resultado final;
- capturas limpias de productos digitales;
- fotografías de fabricación, piezas, pruebas y prototipos.

## Consolidación Git y preparación de Pages

- Pruebas de contenido y sincronización: seis casos exitosos. Sintaxis JavaScript comprobada.
- Modo `--check` del sincronizador: comprueba HTML, metadatos y paleta sin modificar archivos; utilizado como condición previa al despliegue.
- `.gitignore` excluye capturas/páginas QA generadas, temporales, cachés y credenciales locales. Los archivos permanecen en disco. `output/qa/VALIDACION.md` se conserva en Git.
- No se detectaron credenciales, tokens ni documentos privados de clientes en los archivos candidatos. `.openai/hosting.json` contiene un identificador de proyecto, no un secreto. Los PDFs existentes son placeholders y permanecen en el historial.
- Workflow oficial preparado: ejecución manual, sin build ni instalación de dependencias; solo comprobaciones Node y publicación de `dist/`.
- Antes de activar: confirmar propietario, repositorio (recomendado `pedro-soto-almonacid`), visibilidad y permiso de publicación. Instrucciones en `GITHUB_PAGES.md`.
- Todo archivo de `dist/` será público por ruta, aunque el renderizador lo oculte. Las banderas editoriales no protegen documentos privados.
- Próxima fase: incorporar contenido profesional real y evidencias revisadas; completar CV/contacto antes de la primera publicación aprobada.
