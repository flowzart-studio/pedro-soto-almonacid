'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const dir=path.resolve(__dirname,'../dist'),read=f=>fs.readFileSync(path.join(dir,f),'utf8');
const h=read('index.html'),full=read('portafolio.html'),data=JSON.parse(read('content/portfolio.json'));
require(path.join(dir,'js/app.js')).validModel(JSON.parse(read('content/site.json')));
assert.equal(data.items.length,18);assert.equal((h.match(/data-featured-id=/g)||[]).length,6);assert.equal((full.match(/class="work-card"/g)||[]).length,18);
assert.ok(h.includes('Estudio de ingeniería, tecnología y diseño de Pedro Soto Almonacid.'));
assert.ok(h.includes('Soluciones de ingeniería, tecnología y diseño para personas, empresas e instituciones. Desde la planificación de un proyecto hasta su ejecución.'));
assert.ok(h.includes('href="#contacto" class="cinema-contact-link"'));assert.ok(h.includes('href="#trabajos" class="cinema-project-link"'));
assert.ok(!h.includes('MOTION EXPERIENCE / V2'));assert.ok(!h.includes('cinema-now'));assert.ok(!h.includes('cinema-player-note'));
assert.ok(h.includes('<div class="cinema-scene-list" hidden inert aria-hidden="true">'));
assert.ok(!h.includes('data-connection'));assert.ok(h.includes('areas-background'));assert.ok(h.includes('retrato-profesional.webp'));assert.ok(h.includes('css/final-editorial.css'));assert.ok(h.includes('js/section-motion.js'));assert.ok(h.includes('playsinline'));assert.ok(!h.includes('<video controls'));
const clips=[...h.matchAll(/data-src="([^"]+\.mp4)"/g)].map(m=>m[1]);assert.equal(clips.length,4);
for(const file of clips)assert.ok(fs.statSync(path.join(dir,file)).size>500000,file);
for(const [file,html]of [['index.html',h],['portafolio.html',full]])for(const m of html.matchAll(/(?:src|href|srcset|data-src|data-poster|data-fallback)="([^"]+)"/g)){
 const ref=m[1];if(/^(?:https?:|mailto:|data:)/.test(ref))continue;
 assert.ok(!ref.startsWith('/'),ref);
 const [relative,anchor]=ref.split('#'),destination=relative?relative.split('?')[0]:file;
 assert.ok(fs.existsSync(path.join(dir,destination)),ref);
 if(anchor)assert.ok(read(destination).includes('id="'+anchor+'"'),ref);
}
for(const file of ['assets/images/areas/areas-trabajo-banner.webp','assets/images/areas/areas-trabajo-banner-mobile.webp','assets/images/profile/retrato-profesional.webp']){const bytes=fs.readFileSync(path.join(dir,file));assert.equal(bytes.toString('ascii',0,4),'RIFF');assert.equal(bytes.toString('ascii',8,12),'WEBP');}
console.log('Public release: identity, copy, native links, SVG, six highlights, 18 cards, four MP4s and relative routes OK.');
