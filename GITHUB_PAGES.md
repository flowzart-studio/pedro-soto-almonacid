# GitHub Pages — publicación inicial verificada

Repositorio: https://github.com/flowzart-studio/pedro-soto-almonacid
Sitio: https://flowzart-studio.github.io/pedro-soto-almonacid/
Commit funcional desplegado: `ac071417331a6b4f62860e51f87bc6b7ce99de16`.

## Configuración actual

GitHub Pages usa GitHub Actions. `.github/workflows/pages.yml` conserva solo workflow_dispatch, limitado a main y al entorno github-pages. Subir un commit no despliega. El workflow comprueba sintaxis JS, nueve pruebas y coherencia del respaldo, sin instalación npm ni compilación; empaqueta únicamente dist con acciones oficiales.

## Historial público limpio

El original permanece intacto y respaldado fuera de la copia publicada. Las rutas históricas `dist/assets/cv/pedro-soto-cv-placeholder.pdf` y `output/pdf/pedro-soto-cv-placeholder.pdf` se excluyeron de los dos commits anteriores mediante reconstrucción de árboles/commits. Se preservaron todos los demás archivos y metadatos. No hay PDFs actuales ni descargables desde las referencias remotas verificadas; un clon remoto no contiene el blob provisional.

No se ofreció ni inventó un CV sustituto. La sección de formación y trayectoria sigue visible. `.gitignore` excluye archivos de preservación y QA generado; no es un mecanismo de protección del contenido histórico.

## Próxima publicación manual

1. Editar contenido aprobado en la copia limpia con origin configurado.
2. Ejecutar `node scripts/sync-content.cjs`, `node --test tests/content.test.cjs` y `node scripts/sync-content.cjs --check`.
3. Revisar dist y todo archivo nuevo antes del commit/push autorizado. Ningún dato privado debe colocarse en el sitio o repositorio público.
4. Subir main sin force.
5. Actions → Publicar sitio en GitHub Pages → Run workflow → main, únicamente cuando corresponda publicar.
6. Verificar la ejecución y la URL pública en escritorio/móvil y comprobar contactos.

La primera ejecución terminó con éxito: https://github.com/flowzart-studio/pedro-soto-almonacid/actions/runs/38481483789. La documentación de cierre se actualiza en un commit posterior sin alterar dist y sin activar un nuevo despliegue automático.
