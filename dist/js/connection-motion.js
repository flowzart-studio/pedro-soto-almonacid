/* Static artwork first. A finite sequence plus a user-pausable ambient breath. */
(()=>{
 'use strict';
 const art=document.querySelector('[data-connection]');if(!art)return;
 const preference=matchMedia('(prefers-reduced-motion: reduce)'),button=art.querySelector('.connection-replay');
 const ambientPause=art.querySelector('.connection-ambient-pause');
 let observer,timer,frame,played=false,visible=true;
 function finish(ambient=false){
  clearTimeout(timer);cancelAnimationFrame(frame);art.classList.remove('is-animating');
  art.classList.toggle('is-ambient',ambient&&!preference.matches&&visible&&!document.hidden);
  ambientPause.hidden=!art.classList.contains('is-ambient');
  art.dataset.motionState='complete';button.disabled=false;button.textContent='Repetir secuencia ↺';
 }
 function start(){
  if(preference.matches)return;
  played=true;finish();art.classList.remove('is-ambient');
  frame=requestAnimationFrame(()=>{void art.offsetWidth;art.classList.add('is-animating');art.dataset.motionState='playing';button.textContent='Detener animación Ⅱ';timer=setTimeout(()=>finish(true),4800);});
 }
 button.hidden=preference.matches;
 button.addEventListener('click',()=>{if(art.dataset.motionState==='playing')finish();else start();});
 ambientPause.addEventListener('click',()=>finish());
 if('IntersectionObserver' in window){
  observer=new IntersectionObserver(entries=>{
   visible=entries[0].isIntersecting;art.classList.toggle('is-in-view',visible);
   if(visible&&!played&&!preference.matches)start();else if(!visible&&played)finish();
  },{threshold:.25});observer.observe(art);
 }
 preference.addEventListener('change',()=>{finish();button.hidden=preference.matches;});
 document.addEventListener('visibilitychange',()=>{if(document.hidden&&played)finish();});
})();
