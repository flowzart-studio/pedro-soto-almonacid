# Portafolio destacado — contenido v0.3

Catálogo preparado a partir de los títulos proporcionados por Pedro. No hay evidencias visuales reales de estos seis proyectos incorporadas al repositorio. La trayectoria territorial y la herramienta de expedientes fueron confirmadas por Pedro en esta etapa. Los resultados particulares, entregas o aprobaciones de cada ficha aún requieren evidencia.

| ID | Título aprobado | Categoría | Dato adicional confirmado | Evidencias por reunir |
| --- | --- | --- | --- | --- |
| ING-001 | Levantamiento topográfico de terreno urbano, Puerto Varas | Ingeniería | Ubicación del trabajo: Puerto Varas | Fotografías, planos o extractos revisados; contexto, participación, herramientas y resultados |
| ING-002 | Proyecto de subdivisión predial rural | Ingeniería | Ninguno adicional | Planos o documentación publicable; alcance, participación y estado; no inferir aprobación |
| TEC-001 | Punto Deportivo Digital | Tecnología | Nombre del proyecto | Capturas reales, descripción de uso, participación, herramientas, estado y enlace si existe |
| TEC-002 | Costeo | Tecnología | Nombre del proyecto | Capturas reales, contexto, solución, participación, herramientas, estado y enlace si existe |
| DIS-001 | Productos personalizados | Diseño | Título del proyecto | Fotografías reales, proceso, materiales/herramientas, participación y resultados |
| DIS-002 | Dioramas y prototipado | Diseño | Título del proyecto | Fotografías reales, proceso, pruebas, herramientas, participación y resultados |

Estas solicitudes de evidencia son una guía de recopilación, no una afirmación de entregables existentes.

## Modelo de cada ficha

Las seis entradas se preparan en `v02.featuredPortfolio` de `dist/content/site.json`:

| Campo | Tipo | Criterio |
| --- | --- | --- |
| id | texto | Referencia estable ING/TEC/DIS |
| title | texto | Título aprobado |
| category | texto | Ingeniería, Tecnología o Diseño |
| workType | texto | Tipo de trabajo pendiente de precisar |
| location | texto | Vacío salvo Puerto Varas en ING-001 |
| context | texto | Contexto o problema verificado |
| solution | texto | Solución desarrollada |
| participation | texto | Participación específica de Pedro |
| supportingTool | texto | Herramienta propia de apoyo al servicio, sin atribuir uso en un encargo particular |
| tools | lista de textos | Herramientas realmente utilizadas |
| results | lista de objetos | Cada objeto: `description` y `evidenceIds` |
| status | texto | Estado real del proyecto; vacío hasta confirmar |
| images | lista de objetos | `src`, `alt`, `caption`, `evidenceId` |
| links | lista de objetos | `label`, `url` |
| evidence | lista de objetos | `id`, `description`, `file`, `url`, `publicationApproved` |
| editorialStatus | texto | Estado de documentación; inicialmente pendiente de documentar |

Un resultado debe vincular evidencia revisada; no crear métricas estimadas. `publicationApproved` es booleano y solo será verdadero después de revisar autorización y datos sensibles. Si no hay evidencia, dejar `results` vacío.

Usar rutas relativas desde `dist/index.html`, por ejemplo `assets/images/ing-001-general.webp`. No anteponer `/`. Enlaces externos completos HTTPS; validar protocolos antes de renderizar. Año, cliente y aprobaciones no se añaden hasta disponer de información confirmada.

## Contenido anterior conservado

Las fichas provisionales y los proyectos anteriores se conservan en `archive/content/site-v0.2-ecaa00a.json` y en el historial de Git, fuera de `dist/`. Pedro confirmó que Punto Digital y Punto Deportivo Digital son el mismo proyecto: el nombre público es Punto Deportivo Digital; TEC-001 conserva `legacyAliases: ["Punto Digital"]` y `legacyReference: "PRY-001"`.

## Integración local implementada

Las seis fichas se muestran con filtros accesibles por categoría. Los campos vacíos se omiten; el aviso «Ficha en documentación» describe el estado editorial, no el estado real del proyecto. Resultados e imágenes solo se renderizan si sus referencias de evidencia están aprobadas (`publicationApproved: true`); las imágenes necesitan texto alternativo. Se validan URLs HTTPS y rutas relativas de recursos. Las fotos, resultados, herramientas y enlaces siguen pendientes: no se ha inventado contenido para completar las fichas. La documentación permanece fuera de `dist/`.

## Ingeniería territorial incorporada en v0.3

- Más de veinte trabajos, desde predios de aproximadamente una hectárea hasta proyectos con más de diez propietarios y setenta lotes, según información aportada por Pedro.
- Métricas del conjunto de la actividad: no se imputan a ING-001 o ING-002 ni se convierten en resultados de cada ficha.
- Levantamiento topográfico y subdivisión predial rural son servicios complementarios y pueden formar parte del mismo encargo.
- ING-001 conserva el título y ubicación previamente aportados, con tipo de trabajo y contexto complementario actualizado; faltan alcance y evidencia de ese caso particular.
- ING-002 incorpora el contexto complementario y la herramienta propia para gestionar y seguir expedientes SAG como apoyo general al servicio, sin afirmar que se utilizó en este encargo particular. No se inventa URL, tecnología ni aprobación.
- Las fichas mantienen resultados, herramientas, imágenes y estados sin completar cuando no se dispone de datos. El aviso editorial identifica el alcance particular pendiente.
- No se asume que la herramienta mencionada tenga un enlace público o sea exactamente la entrada histórica «Expedientes SAG» sin confirmación adicional.

El resumen general se configura en `v02.territorialExperience` y se muestra separado de los resultados de las seis fichas. No se afirma aprobación SAG ni resolución administrativa.
