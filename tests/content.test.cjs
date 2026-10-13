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
