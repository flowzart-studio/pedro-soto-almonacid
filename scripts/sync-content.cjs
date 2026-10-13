// Actualiza el HTML de respaldo desde JSON. No compila ni publica el sitio.
const fs = require('node:fs');
const path = require('node:path');
const api = require('../dist/js/app.js');
const root = path.resolve(__dirname, '..');
const v = api.validModel(JSON.parse(fs.readFileSync(path.join(root, 'dist/content/site.json'), 'utf8')));
const file = path.join(root, 'dist/index.html');
let html = fs.readFileSync(file, 'utf8');
const originalHtml = html;
const checkOnly = process.argv.includes('--check');
const blocks = {
  areas: api.renderAreas(v.areas),
  methodology: api.renderProcess(v.methodology),
  featuredPortfolio: api.renderPortfolio(v.featuredPortfolio),
  studioActivities: api.strings(v.studio.activities).map(t => `<li>${api.escapeHtml(t)}</li>`).join(''),
  education: api.renderBackground(v.education, 'education'),
  trajectory: api.renderBackground(v.trajectory, 'trajectory'),
  contact: api.renderContact(v.contact),
};
html = html.replace(/<!-- content:(list|bind):([\w.]+) -->[\s\S]*?<!-- \/content:\1:\2 -->/g, (match, type, key) => {
  const value = type === 'list' ? blocks[key] : key.split('.').reduce((obj, k) => obj?.[k], v);
  if (typeof value !== 'string') throw new Error(`Contenido no válido: ${key}`);
  let body = type === 'list' ? value : api.escapeHtml(value);
  if (key === 'identity.concept' && match.includes('<span>')) {
    const words = value.split(' '), last = words.pop();
    body = `${api.escapeHtml(words.join(' '))} <span>${api.escapeHtml(last)}</span>`;
  }
  return `<!-- content:${type}:${key} -->${body}<!-- /content:${type}:${key} -->`;
});
html = html.replace(/<title>.*?<\/title>/, `<title>${api.escapeHtml(v.metadata?.title || `${v.identity.name} | ${v.identity.concept}`)}</title>`);
html = html.replace(/(<meta name="description" content=")[^"]*(">)/, (_, a, b) => a + api.escapeHtml(v.metadata?.description || v.presentation.summary) + b);
html = html.replace(/(<a class="brand"[^>]*aria-label=")[^"]*(">)/, (_, a, b) => a + api.escapeHtml(`${v.identity.name}, inicio`) + b);
const portrait = v.portrait;
html = html.replace(/<div id="portrait">[\s\S]*?<\/div>/, `<div id="portrait">${api.safeUrl(portrait?.src, 'asset') && api.strings([portrait?.alt]).length ? `<img class="portrait" src="${api.escapeHtml(api.safeUrl(portrait.src, 'asset'))}" alt="${api.escapeHtml(portrait.alt)}" loading="lazy" decoding="async">` : ''}</div>`);
const cv = v.cv;
html = html.replace(/<a id="cv-download"[\s\S]*?<\/a>/, `<a id="cv-download" class="button secondary" ${cv?.available === true && api.safeUrl(cv.file, 'asset') ? `href="${api.escapeHtml(api.safeUrl(cv.file, 'asset'))}"` : 'hidden'} download>Descargar CV en PDF ↓</a>`);
const cssFile = path.join(root, 'dist/css/styles.css');
let css = fs.readFileSync(cssFile, 'utf8');
const originalCss = css;
for (const key of ['background', 'surface', 'accent', 'text', 'textSecondary']) {
  const value = v.theme?.palette?.[key];
  if (typeof value === 'string' && /^#[0-9a-f]{6}$/i.test(value)) css = css.replace(new RegExp(`--${key}:#[0-9a-f]{6}`, 'i'), `--${key}:${value}`);
}
if (/^#[0-9a-f]{6}$/i.test(v.theme?.palette?.background || '')) html = html.replace(/(<meta name="theme-color" content=")[^"]*(">)/, (_, a, b) => a + v.theme.palette.background + b);
if (checkOnly) {
  if (html !== originalHtml || css !== originalCss) {
    console.error('Respaldo HTML o paleta desactualizados. Ejecuta node scripts/sync-content.cjs y revisa los cambios.');
    process.exitCode = 1;
  } else {
    console.log('JSON, HTML de respaldo y paleta coherentes. No se modificaron archivos.');
  }
} else {
  fs.writeFileSync(cssFile, css);
  fs.writeFileSync(file, html);
  console.log('HTML de respaldo sincronizado con v02. Sin publicación.');
}
