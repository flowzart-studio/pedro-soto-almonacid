# Estado del producto

**Versión de contenido local:** 0.3.0 sobre el diseño v0.2, sin rediseño. Base Git: `ecaa00a305f1bf6504f0ece967801ea0f42b67a7`. Cambios v0.3 sin confirmar. Sin push ni publicación; el despliegue anterior de Sites permanece en v0.1.

## Base visual v0.2 conservada

- Identidad Pedro Soto Almonacid / Del análisis a la solución.
- Paleta oscura configurable, IBM Plex Sans y Mono alojadas localmente con licencias OFL.
- Portada, sobre mí, tres áreas, metodología de cinco etapas, seis fichas, Flowzart Studio, trayectoria/formación/CV y contacto.
- Flowzart como estudio/taller y práctica de investigación, experimentación y aplicación de IA.
- Filtros por categoría con botones, `aria-pressed` y anuncio accesible del resultado.
- Menú móvil con cierre por Escape, devolución del foco y cierre al navegar.
- Renderizadores que omiten campos vacíos, validan URLs y exigen evidencia aprobada para imágenes/resultados.
- Estructura de formación y trayectoria; ningún grado, cargo o fecha inventado.
- CV provisional conservado fuera de `dist/`, sin ofrecerlo como CV definitivo. Descarga disponible cuando `v02.cv.available` sea verdadero y la ruta válida.
- HTML de respaldo visible sin scripts o ante fallo de JSON; sincronización opcional desde JSON con `scripts/sync-content.cjs`, sin dependencias ni build obligatorio.
- Datos anteriores preservados en archivo fuera de `dist/` y Git; Punto Deportivo Digital mantiene alias Punto Digital y referencia PRY-001.
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

Rama `main`. El commit raíz `53e90bf` se conserva y esta consolidación se registra mediante el commit local `feat: integra identidad profesional y portafolio v0.2`. El hash del commit base es `ecaa00a305f1bf6504f0ece967801ea0f42b67a7`; los cambios actuales v0.3 todavía no forman un commit. No hay remoto GitHub ni push. Git requiere una excepción temporal por diferencia de propietario; no se cambió su configuración permanente.

Sites confirma una publicación exitosa en https://pedro-soto-profesional.dropiee.chatgpt.site, versión guardada 1, asociada al commit v0.1 `53e90bf` y con acceso restringido al propietario. La preparación local de GitHub Pages está en `.github/workflows/pages.yml`, con evento único `workflow_dispatch`, rama `main` y artefacto `dist/`. Pages no está activado y el workflow no se ha ejecutado en GitHub.

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

## Contenido pendiente tras v0.3

- Año de licenciatura, fechas y responsabilidades de Antibes.
- Evidencias, fotos, participación, herramientas, resultados y estados particulares de proyectos.
- Retrato, CV definitivo y ubicación publicable opcional.

## Límites actuales

- Fotos, evidencias, resultados, participación, herramientas, estados y enlaces de las seis fichas están pendientes de confirmar.
- Formación, trayectoria y contacto incorporados; retrato y CV definitivo siguen pendientes.
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
- Antes de activar: propietario `flowzart-studio` y repositorio propuesto `pedro-soto-almonacid` definidos; confirmar disponibilidad, visibilidad y permiso de publicación. Instrucciones en `GITHUB_PAGES.md`.
- Todo archivo de `dist/` será público por ruta, aunque el renderizador lo oculte. Las banderas editoriales no protegen documentos privados.
- Próxima fase: incorporar contenido profesional real y evidencias revisadas; completar CV/contacto antes de la primera publicación aprobada.

## Contenido profesional v0.3 preparado para revisión

- Cuatro antecedentes académicos formales y tres entradas de trayectoria incorporados desde la información aportada por Pedro.
- Formación formal separada del aprendizaje independiente continuo en IA.
- Antibes sin período inventado; la actividad independiente descartada se retiró de la cronología por decisión editorial definitiva.
- Ingeniería territorial: más de veinte trabajos y escala declarada, presentada como experiencia agregada; servicios complementarios y herramienta propia de expedientes SAG. Sin aprobaciones administrativas ni resultados particulares inventados.
- Correo, WhatsApp y LinkedIn públicos; WhatsApp usa mensaje inicial editable y requiere envío del visitante.
- CTA «Ver trayectoria y CV» y «Conversemos sobre tu proyecto» integrados sin modificar paleta, tipografías ni layout.
- PDF provisional trasladado a `output/pdf/pedro-soto-cv-placeholder-dist-v0.2.pdf`; copia previa preservada. Ya no hay PDF en `dist/`.
- JSON anterior archivado fuera de `dist/`; distribución activa sin placeholders históricos o referencias al PDF de prueba. Clave `v02` retenida por compatibilidad, con versión 0.3.0.
- LinkedIn no pudo consultarse independientemente; los antecedentes se atribuyen a la información aportada por Pedro según ese perfil.
- Pendiente aprobar esta versión, registrar un commit posterior y autorizar conexión/push/publicación. El workflow permanece manual y no se modificó.

## Verificación final de contenido v0.3

- Nueve pruebas Node exitosas, incluyendo formación/trayectoria, mensaje de WhatsApp y exclusión del PDF/JSON histórico de la distribución.
- HTML de respaldo coherente; JavaScript válido. CSS sin cambios de contenido respecto de ecaa00a (diferencias de finales de línea normalizadas).
- Escritorio 1440 px: cuatro formaciones, tres entradas de trayectoria, seis proyectos y contacto. Consola sin errores.
- Móvil 390 y 320 px: sin desbordamiento horizontal observado; menú, CTA a trayectoria y contacto revisados.
- Enlaces de correo/LinkedIn y WhatsApp inspeccionados, sin envío de mensajes. El parámetro text contiene el borrador esperado.
- Archivo JSON histórico idéntico al del commit base; PDF trasladado con el mismo hash de la copia anterior.
- dist revisado: sin documentos privados detectados, PDF provisional, claves o credenciales. Fuentes/licencias locales y contenido profesional autorizado conservados.
- Capturas v03 en output/qa, fuera de dist e ignoradas por Git. Sin cambios de HEAD, sin commit, push o despliegue.

- Respaldo sin scripts v0.3 comprobado en navegador: cuatro formaciones, tres entradas laborales, tres contactos y CV oculto.

## Decisiones finales e informe de publicación

Flowzart Studio se conserva; la actividad independiente descartada ya no aparece en la cronología, perfil ni contenido activo. Trámite INAPI pendiente; no se afirma registro de marca.

Destino previsto: propietario flowzart-studio, repositorio pedro-soto-almonacid, remoto https://github.com/flowzart-studio/pedro-soto-almonacid.git y Pages https://flowzart-studio.github.io/pedro-soto-almonacid/. Sin creación, conexión ni push.

Auditoría del historial y candidatos actuales sin secretos reales o archivos privados de clientes detectados. Dist contiene ocho archivos y ningún PDF. El placeholder permanece en ambos commits anteriores y en una copia versionada fuera de dist: resolver visibilidad/aceptación de acceso histórico antes de cualquier push público. Nuevas copias de preservación quedan ignoradas. Informe completo: INFORME_PUBLICACION.md.

HEAD sigue ecaa00a, cambios sin commit y sin staging. Nueve pruebas exitosas, cuatro formaciones y tres entradas laborales. Sin despliegue.

## Preparación inicial pública autorizada

El historial público se preparó en una copia separada, tras respaldo completo verificado y recuperación de prueba del repositorio original. Se retiraron las dos rutas históricas del PDF provisional y todas sus copias del árbol de publicación. Los dos commits restantes conservan mensajes, autores y fechas, con hashes nuevos por el cambio de árboles. El repositorio original conserva su historial íntegro.

Destino autorizado: https://github.com/flowzart-studio/pedro-soto-almonacid y Pages https://flowzart-studio.github.io/pedro-soto-almonacid/. Workflow manual; creación, push y primer despliegue autorizados tras comprobaciones. Estado previo a ejecución: todavía no publicado. No se ofrece CV descargable; trayectoria y formación permanecen.
