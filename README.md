# Sitio profesional Pedro Soto — v0.1

Primera versión funcional del sitio profesional de Pedro Soto y primer caso de estudio para una futura familia de landing pages y micrositios reutilizables.

## Ejecutar en local

El sitio no usa dependencias ni requiere compilación. Desde la raíz del proyecto ejecuta:

```powershell
python -m http.server 8000 --directory dist
```

Luego abre `http://localhost:8000`. Es necesario usar un servidor local porque el navegador carga el contenido desde un archivo JSON.

## Estructura

```text
dist/
├── index.html              # Estructura semántica y secciones
├── css/styles.css          # Diseño, responsive y estados
├── js/app.js               # Renderizado de contenido e interacciones
├── content/site.json       # Única fuente de contenido editable
└── assets/cv/              # CV descargable
```

La configuración de despliegue estático está en `.openai/hosting.json`. La documentación de producto vive en la raíz.

## Editar contenido

- **Textos y datos:** modifica `dist/content/site.json`.
- **Fotografía:** agrega la imagen en `dist/assets/images/`, reemplaza el bloque `.portrait-placeholder` de `dist/index.html` por un elemento `img` y conserva el contenedor `.technical-frame`.
- **Capacidades:** edita `capabilityWorlds`; cada mundo admite código, título, descripción y estado editorial.
- **Proceso:** edita `process`; sus cinco pasos se renderizan sin modificar el HTML.
- **Trabajos:** añade objetos en `portfolio`; cada ficha admite referencia, categoría, tipo de trabajo, cliente o sector, año, ubicación, problema, intervención, resultado, imágenes y herramientas. Año, ubicación, herramientas e imágenes son opcionales.
- **Proyectos:** añade objetos en `projects`; cada uno prioriza `observedProblem` y `solution`. Estado y tecnologías aparecen como información secundaria.
- **CV:** reemplaza `dist/assets/cv/pedro-soto-cv-placeholder.pdf` y actualiza `cv.file` si cambia el nombre.
- **Contacto:** completa `contact.email`, `contact.whatsapp`, `contact.whatsappUrl`, `contact.linkedinLabel`, `contact.linkedinUrl` y `contact.location`.

No introduzcas HTML dentro del JSON. El render escapa el contenido para reducir errores y evitar que los datos rompan la página.

## Principios de v0.1

- contenido separado de presentación;
- una sola página narrativa y fácil de recorrer;
- HTML semántico, accesibilidad básica y responsive desde 320 px;
- sin frameworks, backend, base de datos ni proceso de build;
- secciones suficientemente independientes para extraerse como componentes más adelante.
- campos opcionales que desaparecen de la interfaz cuando no contienen información real.

Consulta `STATUS.md`, `ROADMAP.md` y `VISION.md` para estado, próximas etapas y decisiones de alcance.
