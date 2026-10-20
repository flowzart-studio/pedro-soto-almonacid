/* Static content first. Filtering never fetches content or writes to the editor. */
(() => {
 'use strict';
 document.querySelectorAll('.work-visual img').forEach(image=>image.addEventListener('error',()=>{
  if(!image.dataset.fallback||image.dataset.failed)return;
  image.dataset.failed='true';image.src=image.dataset.fallback;
  image.alt='Ilustración conceptual temporal de esta ficha.';
  const visual=image.closest('.work-visual');visual.classList.remove('work-image-capture','work-image-provided');visual.classList.add('work-image-temporary');
  visual.querySelector('.work-image-label').textContent='Visual conceptual · temporal';
 }));
 if(!document.querySelector('[data-portfolio-page]'))return;
 // Standalone catalogue navigation; home keeps its existing navigation controller.
 const menu=document.querySelector('.nav-toggle'),nav=document.querySelector('#site-nav');
 if(menu&&nav){
  document.body.classList.add('enhanced');menu.hidden=false;
  const close=()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');};
  menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));});
  nav.addEventListener('click',event=>{if(event.target.closest('a'))close();});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&nav.classList.contains('open')){close();menu.focus();}});
  document.addEventListener('click',event=>{if(!event.target.closest('.nav-wrap'))close();});
  matchMedia('(max-width:720px)').addEventListener('change',()=>{if(nav.contains(document.activeElement))menu.focus();close();});
 }
 const catalogue=document.querySelector('[data-catalog]');
 const cards=[...catalogue.querySelectorAll('.work-card')];
 const categoryButtons=[...document.querySelectorAll('[data-category-filter]')];
 const typeSelect=document.querySelector('#portfolio-type');
 const resetButtons=[...document.querySelectorAll('[data-reset-filters]')];
 const categoryIds=new Set(categoryButtons.map(b=>b.dataset.categoryFilter));
 const typeIds=new Set([...typeSelect.options].map(o=>o.value));
 let category='all',type='all';
 function apply(writeURL=true){
  let count=0;
  cards.forEach(card=>{card.hidden=!(category==='all'||card.dataset.category===category)||!(type==='all'||card.dataset.type===type);if(!card.hidden)count++;});
  catalogue.querySelectorAll('[data-catalog-group]').forEach(group=>{
   const total=[...group.querySelectorAll('.work-card')].filter(card=>!card.hidden).length;
   group.hidden=total===0;group.querySelector('[data-group-count]').textContent=`${String(total).padStart(2,'0')} ${total===1?'ficha':'fichas'}`;
  });
  categoryButtons.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.categoryFilter===category)));
  typeSelect.value=type;
  document.querySelector('#portfolio-results').textContent=`${count} ${count===1?'ficha':'fichas'}${category==='all'?' · todas las categorías':''}${type==='all'?'':` · ${typeSelect.selectedOptions[0].textContent}`}`;
  document.querySelector('.catalog-empty').hidden=count!==0;
  document.querySelector('.catalog-results [data-reset-filters]').hidden=category==='all'&&type==='all';
  if(writeURL){
   const url=new URL(location.href);category==='all'?url.searchParams.delete('categoria'):url.searchParams.set('categoria',category);type==='all'?url.searchParams.delete('tipo'):url.searchParams.set('tipo',type);
   let target=null;try{target=document.getElementById(decodeURIComponent(url.hash.slice(1)));}catch{}
   if(target?.hidden)url.hash='';
   try{history.replaceState(null,'',url.pathname+url.search+url.hash);}catch{}
  }
 }
 function fromURL(){
  const params=new URLSearchParams(location.search);
  category=categoryIds.has(params.get('categoria'))?params.get('categoria'):'all';type=typeIds.has(params.get('tipo'))?params.get('tipo'):'all';
  let target;try{target=document.getElementById(decodeURIComponent(location.hash.slice(1)));}catch{}
  let repair=false;
  if(target?.classList.contains('work-card')&&((category!=='all'&&target.dataset.category!==category)||(type!=='all'&&target.dataset.type!==type))){category=target.dataset.category;type='all';repair=true;}
  apply(repair);
 }
 categoryButtons.forEach(button=>button.addEventListener('click',()=>{category=button.dataset.categoryFilter;apply();}));
 typeSelect.addEventListener('change',()=>{type=typeSelect.value;apply();});
 resetButtons.forEach(button=>button.addEventListener('click',()=>{category='all';type='all';apply();categoryButtons[0].focus();}));
 addEventListener('popstate',fromURL);addEventListener('hashchange',fromURL);
 fromURL();document.querySelector('.catalog-filters').hidden=false;
})();
