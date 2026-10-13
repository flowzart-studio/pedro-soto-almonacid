# Informe previo a publicación — contenido v0.3

## Estado y decisiones definitivas

Ubicación conservada: `D:\07_ias\Repositorios\CV Sitio Profesional Pedro Soto`.

Rama `main`, HEAD `ecaa00a305f1bf6504f0ece967801ea0f42b67a7`. Se conservan ambos commits y todo el historial. Los cambios v0.3 están locales, sin commit ni archivos preparados en el índice. Sin creación de repositorio, remoto, push ni despliegue.

Flowzart Studio es el nombre del estudio técnico y creativo. La actividad independiente descartada se retiró del JSON activo, respaldo HTML y perfil profesional. No se afirma registro de marca ante INAPI: el trámite está pendiente.

Destino previsto, sin confirmar existencia/disponibilidad:

- Propietario: `flowzart-studio`.
- Repositorio propuesto: `pedro-soto-almonacid`.
- Remoto: `https://github.com/flowzart-studio/pedro-soto-almonacid.git`.
- Pages esperado: `https://flowzart-studio.github.io/pedro-soto-almonacid/`.

## Revisión del material

Se revisaron los dos commits completos, 31 blobs históricos únicos y 26 archivos candidatos actuales antes de agregar este informe. La revisión combinó lectura editorial, inventario, búsqueda de patrones de claves/tokens/URLs con credenciales y extracción del contenido de todos los PDFs históricos.

No se detectaron credenciales reales, documentos privados de clientes ni datos personales de terceros. Las únicas credenciales reconocidas por el patrón son el ejemplo sintético rechazado por las pruebas. Los nombres institucionales de formación/empleadores fueron proporcionados por Pedro; las licencias de fuentes mantienen sus avisos obligatorios. El correo, teléfono y LinkedIn de Pedro tienen autorización explícita de uso público.

La búsqueda de patrones no es una garantía matemática de ausencia de secretos; todos los tipos de archivo presentes se revisaron dentro de su contexto. `.openai/hosting.json` tiene identidad y carpeta de publicación, sin credenciales. `.git/config` no tiene remoto ni autenticación embebida.

### Distribución de Pages

`dist/` contiene ocho archivos: HTML, CSS, JS, JSON activo, dos fuentes y dos licencias. No contiene PDF, documentos Office, fotografías, capturas, archivos temporales ni datos de clientes. El CV está deshabilitado y sin ruta de descarga; el contenido anterior se preservó fuera de `dist/`. El respaldo HTML también omite la entrada descartada.

El workflow conserva únicamente `workflow_dispatch`, rama `main` y artefacto `dist/`. Documentación, `.openai/`, archivos de preservación y QA no se suben al artefacto Pages. Se mantienen rutas relativas; no se realizó rediseño.

### Repositorio e historial: decisión pendiente

El PDF provisional, aunque fuera del sitio actual, está en los dos commits anteriores, en las rutas `dist/assets/cv/pedro-soto-cv-placeholder.pdf` y `output/pdf/pedro-soto-cv-placeholder.pdf`. La segunda ruta también sigue versionada en el árbol actual. El contenido es un placeholder sin antecedentes ni datos de clientes, pero puede descargarse si el repositorio completo se hace público.

`.gitignore` excluye nuevas copias en `archive/`, `output/pdf/` y QA generado; no oculta archivos ya versionados ni borra historial. La copia trasladada desde dist y el JSON archivado permanecen locales. Un push normal de main incluye sus commits anteriores.

Por tanto, si ningún provisional debe quedar accesible públicamente, no corresponde autorizar todavía un repositorio público con este historial. Opciones pendientes:

1. Conservar el repositorio privado y confirmar un plan de GitHub compatible con Pages desde repositorio privado, manteniendo el sitio público y los archivos fuente fuera del acceso público.
2. Autorizar expresamente que el placeholder y la documentación histórica sean accesibles desde un repositorio público, conservando el historial completo.

No se propone reescribir el historial ni eliminar sus archivos. La visibilidad debe decidirse antes del primer push. Referencia: https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages

## Verificaciones y contenido pendiente

Nueve pruebas de contenido exitosas; sincronizador `--check` y sintaxis JavaScript correctos. Cuatro formaciones y tres entradas de trayectoria. Contactos y seis fichas conservados; resultados administrativos no inventados. El diseño y el workflow permanecen sin cambios.

Pendientes: fechas/responsabilidades de Antibes, año de licenciatura, CV definitivo, retrato y evidencias/detalles de proyectos. No es necesario inventar material para publicar; aprobar qué se mostrará como pendiente. LinkedIn no pudo verificarse independientemente en la etapa previa y se mantiene la atribución a los datos aportados por Pedro.

## Pasos finales, todos pendientes de autorización

1. Aprobar el contenido v0.3 y resolver la visibilidad del repositorio y el acceso al placeholder histórico.
2. Autorizar un commit local de v0.3, incluyendo código/documentación/pruebas y la retirada del PDF de dist. No incorporar los archivos locales ignorados.
3. Confirmar disponibilidad y permisos de `flowzart-studio/pedro-soto-almonacid`; crear o confirmar un repositorio vacío, sin README inicial ni historial distinto.
4. Autorizar la vinculación de `origin` y el primer push sin force, conservando todos los commits.
5. Seleccionar Pages → GitHub Actions y comprobar el plan, permisos y entorno `github-pages`.
6. Autorizar la publicación y ejecutar manualmente el workflow desde `main`. Un push por sí solo no lo activa.
7. Verificar la URL final, recursos, navegación, móvil, contacto y ausencia de documentos provisionales en el artefacto.

No se ejecutó ninguno de los pasos externos. Instrucciones concretas en `GITHUB_PAGES.md`.

## Resolución autorizada para la primera publicación

La decisión de visibilidad quedó resuelta: repositorio público con historial limpio preparado en una copia separada. Las advertencias anteriores describen el estado previo del original, que se conserva fuera del repositorio público. En las referencias destinadas a GitHub no hay PDFs; se excluyeron ambas rutas históricas, sin borrar documentos funcionales ni alterar el original. La recuperación del respaldo fue verificada antes de la limpieza. No hay CV descargable en la interfaz.
