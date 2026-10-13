# GitHub Pages — preparación manual

El sitio permanece en su carpeta local actual. La rama es `main`; el commit de consolidación v0.2 incluye `.github/workflows/pages.yml`, código, contenido, documentación y comprobaciones. La identidad y el diseño no se modifican en esta etapa.

## Preparación disponible

- Evento único `workflow_dispatch`: un push no publica el sitio.
- Ejecución limitada a `main`, con entorno `github-pages`.
- Acciones oficiales: checkout v6, setup-node v6, configure-pages v5, upload-pages-artifact v4 y deploy-pages v4.
- Node 24 solo para comprobaciones; sin instalación npm, frameworks, dependencias ni compilación.
- Comprueba sintaxis, pruebas de contenido y coherencia del respaldo con `node scripts/sync-content.cjs --check`.
- Sube exclusivamente `dist/`; no incluye documentación de la raíz, pruebas, scripts, `.openai/` ni `output/`.
- Permisos de despliegue `pages: write` e `id-token: write`, sin tokens personales en archivos.

Referencia oficial: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages

## Destino definido y decisiones requeridas

- Propietario: `flowzart-studio`.
- Repositorio propuesto: `pedro-soto-almonacid`.
- Remoto previsto: `https://github.com/flowzart-studio/pedro-soto-almonacid.git`.
- Pages esperado: `https://flowzart-studio.github.io/pedro-soto-almonacid/`.

Falta confirmar existencia/disponibilidad, permisos, visibilidad y plan de Pages. No se creó ni vinculó el repositorio. El PDF provisional sigue en el historial y una copia está versionada fuera de dist: un repositorio público los expondrá. Resolver esta decisión antes de autorizar el primer push, según `INFORME_PUBLICACION.md`.

## Pasos posteriores a la autorización

Crear un repositorio vacío o confirmar uno existente. Para un repositorio nuevo, no inicializar README, licencia ni `.gitignore` remotos: ya existe un historial local que conservar. Si el destino contiene commits, revisar cómo integrarlos antes de subir; no usar force push.

Desde la carpeta local y sustituyendo los marcadores:

```powershell
git remote add origin https://github.com/flowzart-studio/pedro-soto-almonacid.git
git remote -v
git push -u origin main
```

Estos comandos son instrucciones futuras: no se ejecutaron. Si Git sigue bloqueado por diferencia de propietario, emplear una excepción limitada a este repositorio y comando, `git -c safe.directory="D:/07_ias/Repositorios/CV Sitio Profesional Pedro Soto" ...`. No se añadió una excepción global.

En GitHub, habilitar Actions si está restringido y seleccionar **Settings → Pages → Source: GitHub Actions**. Revisar que el entorno `github-pages` permita desplegar desde `main` y aplicar aprobación manual adicional si la cuenta lo permite.

Tras aprobar el contenido público: **Actions → Publicar sitio en GitHub Pages → Run workflow → main**. Esa ejecución manual sí publica. Revisar el estado y la URL devuelta por el despliegue. Abrir la página y comprobar CSS, JS, JSON, fuentes, imágenes, enlaces, navegación móvil y CV definitivo cuando exista.

El workflow todavía no se ha ejecutado en GitHub; su configuración fue revisada localmente. Hasta vincular el destino y activar Pages no se puede verificar permisos reales, disponibilidad del plan ni el despliegue.

## Control editorial antes de publicar

- Formación, trayectoria y contacto incorporados en v0.3 local; siguen pendientes retrato, CV definitivo, datos laborales faltantes y detalles/evidencias de proyectos. Aprobar estos cambios antes de un commit posterior.
- No incorporar archivos privados a `dist/` ni información sensible al JSON: todo el directorio se publica, incluso archivos sin enlaces visibles.
- `publicationApproved` controla el renderizado; no restringe el acceso al archivo o al JSON servido.
- El PDF placeholder se trasladó fuera de `dist/` a `output/pdf/` y no será parte del artefacto publicado. El enlace de CV sigue oculto hasta disponer del definitivo.
- `output/qa/` contiene capturas y páginas generadas locales ignoradas; se versiona únicamente `VALIDACION.md`.
- El JSON anterior está preservado en `archive/content/site-v0.2-ecaa00a.json` fuera de dist. El JSON activo completo será accesible públicamente; incluye únicamente el contenido profesional preparado y sus campos pendientes.

Después de editar contenido: `node scripts/sync-content.cjs`, revisar diferencias, ejecutar `node --test tests/content.test.cjs` y `node scripts/sync-content.cjs --check`. Registrar los cambios y subirlos solo con autorización; la publicación continuará siendo manual.

No presentar Flowzart Studio como marca registrada. Trámite INAPI pendiente; no modifica la identidad pública del estudio.

## Preparación inicial pública autorizada

El historial público se preparó en una copia separada, tras respaldo completo verificado y recuperación de prueba del repositorio original. Se retiraron las dos rutas históricas del PDF provisional y todas sus copias del árbol de publicación. Los dos commits restantes conservan mensajes, autores y fechas, con hashes nuevos por el cambio de árboles. El repositorio original conserva su historial íntegro.

Destino autorizado: https://github.com/flowzart-studio/pedro-soto-almonacid y Pages https://flowzart-studio.github.io/pedro-soto-almonacid/. Workflow manual; creación, push y primer despliegue autorizados tras comprobaciones. Estado previo a ejecución: todavía no publicado. No se ofrece CV descargable; trayectoria y formación permanecen.
