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

## Datos y decisiones requeridos

1. Cuenta o institución propietaria en GitHub.
2. Nombre y URL exacta del repositorio de destino.
3. Visibilidad del repositorio y disponibilidad de Pages según el plan.
4. Autorización para crear o usar el repositorio, vincular el remoto, hacer el primer push y activar/publicar Pages.

Nombre recomendado: **pedro-soto-almonacid**, permanente e independiente del número de versión. URL de proyecto prevista: `https://<usuario>.github.io/pedro-soto-almonacid/`. No se ha comprobado disponibilidad del nombre en una cuenta concreta. El repositorio especial `<usuario>.github.io` sería una alternativa para publicar en la raíz de esa cuenta; no es necesario para este proyecto.

## Pasos posteriores a la autorización

Crear un repositorio vacío o confirmar uno existente. Para un repositorio nuevo, no inicializar README, licencia ni `.gitignore` remotos: ya existe un historial local que conservar. Si el destino contiene commits, revisar cómo integrarlos antes de subir; no usar force push.

Desde la carpeta local y sustituyendo los marcadores:

```powershell
git remote add origin https://github.com/<usuario>/pedro-soto-almonacid.git
git remote -v
git push -u origin main
```

Estos comandos son instrucciones futuras: no se ejecutaron. Si Git sigue bloqueado por diferencia de propietario, emplear una excepción limitada a este repositorio y comando, `git -c safe.directory="D:/07_ias/Repositorios/CV Sitio Profesional Pedro Soto" ...`. No se añadió una excepción global.

En GitHub, habilitar Actions si está restringido y seleccionar **Settings → Pages → Source: GitHub Actions**. Revisar que el entorno `github-pages` permita desplegar desde `main` y aplicar aprobación manual adicional si la cuenta lo permite.

Tras aprobar el contenido público: **Actions → Publicar sitio en GitHub Pages → Run workflow → main**. Esa ejecución manual sí publica. Revisar el estado y la URL devuelta por el despliegue. Abrir la página y comprobar CSS, JS, JSON, fuentes, imágenes, enlaces, navegación móvil y CV definitivo cuando exista.

El workflow todavía no se ha ejecutado en GitHub; su configuración fue revisada localmente. Hasta vincular el destino y activar Pages no se puede verificar permisos reales, disponibilidad del plan ni el despliegue.

## Control editorial antes de publicar

- Completar participación, herramientas, estado y evidencias de los seis proyectos; formación, trayectoria, retrato, CV y contacto siguen pendientes.
- No incorporar archivos privados a `dist/` ni información sensible al JSON: todo el directorio se publica, incluso archivos sin enlaces visibles.
- `publicationApproved` controla el renderizado; no restringe el acceso al archivo o al JSON servido.
- El PDF placeholder se conserva por decisión de preservación y sigue accesible por ruta directa si se publica `dist/`, aunque no aparece como descarga de CV definitivo.
- `output/qa/` contiene capturas y páginas generadas locales ignoradas; se versiona únicamente `VALIDACION.md`.
- Se conservaron los datos v0.1 por compatibilidad; el JSON completo será accesible públicamente. Actualmente son datos provisionales, sin documentos privados de clientes.

Después de editar contenido: `node scripts/sync-content.cjs`, revisar diferencias, ejecutar `node --test tests/content.test.cjs` y `node scripts/sync-content.cjs --check`. Registrar los cambios y subirlos solo con autorización; la publicación continuará siendo manual.
