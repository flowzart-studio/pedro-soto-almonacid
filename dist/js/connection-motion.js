/* One finite sequence. Static complete artwork is the progressive baseline. */
(()=>{
 'use strict';
 const art=document.querySelector('[data-connection]');
 if(!art)return;
 const preference=matchMedia('(prefers-reduced-motion: reduce)');
 let observer,timer,played=false;
 function finish(){clearTimeout(timer);art.classList.remove('is-animating');art.dataset.motionState='complete';}
 function start(){
  if(played||preference.matches)return;
  played=true;observer?.disconnect();art.dataset.motionState='playing';art.classList.add('is-animating');
  timer=setTimeout(finish,4050);
 }
 if(!preference.matches&&'IntersectionObserver' in window){
  observer=new IntersectionObserver(entries=>{if(entries.some(entry=>entry.isIntersecting))start();},{threshold:.2});observer.observe(art);
 }
 preference.addEventListener('change',()=>{if(preference.matches){played=true;observer?.disconnect();finish();}});
 document.addEventListener('visibilitychange',()=>{if(document.hidden&&played)finish();});
})();
