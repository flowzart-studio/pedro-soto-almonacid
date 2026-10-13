const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {spawnSync} = require('node:child_process');
const api = require('../dist/js/app.js');
const data = JSON.parse(fs.readFileSync(path.join(__dirname, '../dist/content/site.json'), 'utf8'));

test('El catálogo aprobado contiene seis fichas sin resultados o material ficticio', () => {
  const v = api.validModel(data);
  assert.equal(v.featuredPortfolio.length, 6);
  assert.equal(v.methodology.length, 5);
  const html = api.renderPortfolio(v.featuredPortfolio);
  assert.equal((html.match(/class="project-card"/g) || []).length, 6);
  assert.ok(html.includes('Punto Deportivo Digital'));
  assert.ok(!html.includes('<img'));
  assert.ok(!html.includes('Resultados verificables'));
  assert.ok(!html.includes('Estado del proyecto:'));
});

test('Se rechazan protocolos peligrosos, credenciales y rutas incompatibles con subruta', () => {
  for (const url of ['javascript:alert(1)', 'data:text/html,test', '//example.com', 'http://example.com', 'https://user:pass@example.com', 'https://example.com\n', 'assets/../content/site.json', '/assets/image.webp']) {
    assert.equal(api.safeUrl(url, 'asset'), '');
  }
  assert.equal(api.safeUrl('assets/images/case.webp', 'asset'), 'assets/images/case.webp');
  assert.equal(api.safeUrl('https://example.com/project'), 'https://example.com/project');
});

test('Contenido no interpretado como HTML; tipos opcionales incorrectos no rompen el render', () => {
  const p = {...data.v02.featuredPortfolio[0], title:'<img src=x onerror=alert(1)>', tools:null, results:5, links:[{label:'Ataque',url:'javascript:alert(1)'}], images:[null]};
  const html = api.renderPortfolio([p]);
  assert.ok(html.includes('&lt;img'));
  assert.ok(!html.includes('<img'));
  assert.ok(!html.includes('href="javascript:'));
});

test('Resultados e imágenes requieren evidencia aprobada y texto alternativo', () => {
  const p = {...data.v02.featuredPortfolio[0], results:[{description:'Resultado de prueba',evidenceIds:['e1']}], images:[{src:'assets/images/test.webp',alt:'Imagen de prueba',evidenceId:'e1'}], evidence:[{id:'e1',description:'Evidencia de prueba',publicationApproved:false}]};
  assert.ok(!api.renderPortfolio([p]).includes('Resultado de prueba'));
  assert.ok(!api.renderPortfolio([p]).includes('<img'));
  p.evidence[0].publicationApproved=true;
  assert.ok(api.renderPortfolio([p]).includes('Resultado de prueba'));
  assert.ok(api.renderPortfolio([p]).includes('<img'));
  p.images[0].alt='';
  assert.ok(!api.renderPortfolio([p]).includes('<img'));
});

test('Modelo inválido o IDs duplicados activan el respaldo, no una sustitución parcial', () => {
  assert.throws(()=>api.validModel({v02:{}}));
  const clone=structuredClone(data);clone.v02.featuredPortfolio[1].id=clone.v02.featuredPortfolio[0].id;
  assert.throws(()=>api.validModel(clone));
  assert.ok(api.renderBackground([null, {}], 'education').includes('pendiente'));
  assert.ok(!api.renderContact({email:'a@b.com?subject=bad',linkedinLabel:'Prueba',linkedinUrl:'javascript:alert(1)'}).includes('<a'));
});

test('El sincronizador comprueba coherencia sin escribir HTML ni CSS', () => {
  const root = path.resolve(__dirname, '..');
  const files = ['dist/index.html', 'dist/css/styles.css'];
  const before = files.map(file => fs.readFileSync(path.join(root, file)));
  const result = spawnSync(process.execPath, ['scripts/sync-content.cjs', '--check'], {cwd: root, encoding: 'utf8'});
  assert.equal(result.status, 0, result.stderr || result.stdout);
  files.forEach((file, index) => assert.deepEqual(fs.readFileSync(path.join(root, file)), before[index]));
});

test('Formación y trayectoria conservan períodos confirmados y omiten fechas desconocidas', () => {
  const v = api.validModel(data);
  assert.equal(v.education.length, 4);
  assert.equal(v.trajectory.length, 3);
  const bachelor = v.education.find(x => x.title.startsWith('Licenciado'));
  assert.equal(bachelor.period, '');
  const antibes = v.trajectory.find(x => x.organization === 'Constructora Antibes');
  assert.equal(antibes.period, '');
  assert.deepEqual(v.trajectory.map(x => x.organization), ['Subsecretaría de Pesca y Acuicultura', 'Importadora y Comercializadora Talcahuano Ltda.', 'Constructora Antibes']);
  assert.ok(api.renderBackground(v.education, 'education').includes('Titulado en 2016'));
  assert.ok(api.renderBackground(v.trajectory, 'trajectory').includes('Mayo – diciembre de 2019'));
});

test('WhatsApp codifica un mensaje inicial y no usa enlaces de envío automático', () => {
  const href = api.whatsappHref(data.v02.contact);
  const url = new URL(href);
  assert.equal(url.origin, 'https://wa.me');
  assert.equal(url.pathname, '/56998557968');
  assert.equal(url.searchParams.get('text'), data.v02.contact.whatsappMessage);
  assert.equal(api.whatsappHref({whatsappUrl:'https://example.com/56998557968'}), '');
  const html = api.renderContact(data.v02.contact);
  assert.ok(html.includes('mailto:sotopedroid@gmail.com'));
  assert.ok(html.includes('https://www.linkedin.com/in/pedro-soto-almonacid-38558aa4/'));
});

test('La distribución pública excluye el PDF y el contenido provisional histórico', () => {
  const root = path.resolve(__dirname, '..');
  assert.equal(fs.existsSync(path.join(root, 'dist/assets/cv/pedro-soto-cv-placeholder.pdf')), false);
  assert.equal(data.v02.cv.available, false);
  assert.equal(data.v02.cv.file, '');
  assert.deepEqual(Object.keys(data).sort(), ['v02', 'version']);
  assert.equal(fs.existsSync(path.join(root, 'dist/archive/content/site-v0.2-ecaa00a.json')), false);
  assert.ok(data.v02.territorialExperience.scopeNote.includes('conjunto'));
  assert.ok(data.v02.featuredPortfolio.every(x => x.results.length === 0));
});
