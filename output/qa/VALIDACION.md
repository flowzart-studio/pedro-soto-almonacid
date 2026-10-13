# Validación local v0.2 — 13 de octubre de 2026

## Comprobaciones realizadas

- Interfaz servida por HTTP bajo `/dist/`, simulando subruta de GitHub Pages.
- HTML, CSS, JS, JSON y ambas tipografías locales respondieron correctamente (HTTP 200; posteriores cargas de fuentes 304).
- Escritorio 1440 × 1000; móvil 390 × 844 y ancho mínimo 320 px. Sin desbordamiento horizontal observado.
- Seis fichas y cinco etapas. Tecnología filtra TEC-001/TEC-002; Todos restablece las seis fichas.
- Menú móvil: apertura, Escape con devolución del foco, cierre al navegar y destino Flowzart correctos.
- Enlace «Saltar al contenido» lleva el foco a `main`.
- Consola de la página normal sin errores ni advertencias.
- `no-scripts.html`: sin app.js, seis fichas/cinco etapas visibles, navegación accesible y filtros ocultos.
- `json-failure.html`: simula 404 del JSON; seis fichas permanecen y se muestra aviso de respaldo. El error de consola es esperado en esta página.
- Cinco pruebas Node exitosas; URLs peligrosas y credenciales rechazadas, HTML escapado, tipos opcionales incorrectos tolerados, evidencia no aprobada excluida, IDs duplicados rechazados.
- Contraste sobre fondo/superficie: principal 15.73/12.55; secundario 7.12/5.68; cobre 6.50/5.18. Todos superan 4.5:1.
- Regla CSS de movimiento reducido sin animaciones ni desplazamiento suave; no se simularon todas las preferencias del sistema.

## Evidencias

- `v02-escritorio.jpg`: portada de escritorio.
- `v02-movil.jpg`: revisión móvil.
- Las páginas y capturas de QA viven fuera de `dist/` y no pertenecen al sitio publicable.

## Alcance y límites

Revisión básica con navegador y dimensiones simuladas; no es certificación de accesibilidad ni prueba con lectores de pantalla o móviles físicos. Las fichas no tienen todavía imágenes ni resultados reales. El CV definitivo y contactos están pendientes, por lo que sus acciones no se ofrecen; el PDF de prueba se conserva. La publicación anterior no fue modificada. Sin commits, push o despliegues.

## Consolidación Git y preparación Pages

- Reejecutadas seis pruebas Node, incluida verificación de coherencia sin escritura. Todas exitosas.
- JavaScript válido; sincronizador `--check` confirma JSON, HTML y paleta coherentes.
- Nueva revisión HTTP bajo `/dist/`: HTML/CSS/JS/JSON 200; fuentes locales cargadas desde caché 304. Seis fichas, cinco etapas, filtro TEC-001/TEC-002 y consola sin errores.
- Anclas y rutas de recursos existentes comprobadas; ambos PDFs son placeholders válidos.
- Revisión de archivos candidatos sin credenciales reales ni documentos privados de clientes; datos originales v0.1 preservados.
- `.gitignore` conserva capturas/páginas QA localmente y excluye su incorporación; este informe se versiona.
- Workflow revisado estáticamente: `workflow_dispatch`, rama main, controles de contenido y artefacto dist. No ejecutado en GitHub.
- Ningún cambio de identidad o rediseño en esta consolidación. Commit local autorizado; sin push ni despliegue.
