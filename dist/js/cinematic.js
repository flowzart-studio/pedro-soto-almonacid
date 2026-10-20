/* Two video layers, no packages, one-ahead preloading, native scroll/navigation. */
(() => {
  'use strict';
  const hero = document.querySelector('.cinema-hero');
  if (!hero) return;
  const videos = [...hero.querySelectorAll('video')];
  const buttons = [...hero.querySelectorAll('.cinema-scene')];
  const poster = hero.querySelector('.cinema-poster');
  const pauseButton = hero.querySelector('.cinema-pause');
  const scenes = buttons.map(button=>({...button.dataset}));
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const connection = navigator.connection;
  let consent = false, saveData = !!connection?.saveData;
  let active = -1, index = 0, busy = false, queued = null, revision = 0;
  let userPaused = false, blocked = false, inView = true;
  let fadeTimer = 0, finishFade = null, prepared = -1;
  const failed = new Set();
  const permitted = () => consent || (!reduced.matches && !saveData);
  const canRun = () => !userPaused && permitted() && inView && !document.hidden;
  const setState = state => {hero.dataset.playerState=state;};
  function label(sceneIndex) {
    index = sceneIndex; hero.dataset.currentScene = String(index);
    poster.src=scenes[index].poster;
    buttons.forEach((button,i)=>button.setAttribute('aria-pressed',String(i===index)));
  }
  function controls() {
    pauseButton.hidden=false;
    hero.dataset.motionConsent=String(consent);
    hero.dataset.reducedMotion=String(reduced.matches);
    hero.dataset.saveData=String(saveData);
    hero.dataset.playerReason=blocked?'autoplay-blocked':userPaused?'user-paused':!permitted()?(reduced.matches?'reduced-motion':'save-data'):!inView?'offscreen':document.hidden?'hidden':'permitted';
    const playing = canRun() && !blocked && active>=0 && !videos[active].paused;
    const action=playing?'Pausar videos':saveData?'Reproducir videos (usa datos)':'Reproducir videos';
    pauseButton.setAttribute('aria-label',action);
    pauseButton.setAttribute('aria-pressed',String(playing));
    pauseButton.innerHTML=action+` <span aria-hidden="true">${playing?'Ⅱ':'▶'}</span>`;
    hero.classList.toggle('is-paused',!playing);
  }
  function release(slot) {
    const video=videos[slot];
    video.pause();video.classList.remove('is-on','is-incoming');
    video.removeAttribute('src');delete video.dataset.scene;video.load();
  }
  function cleanup() {
    clearTimeout(fadeTimer);
    if(finishFade){const finish=finishFade;finishFade=null;finish();}
    videos.forEach((_,slot)=>{if(slot!==active)release(slot);});
    if(active>=0)videos[active].classList.remove('is-incoming');
    prepared=-1;
  }
  function load(slot,sceneIndex) {
    const video=videos[slot];
    if(video.dataset.scene===String(sceneIndex) && video.readyState>=2)return Promise.resolve();
    return new Promise((resolve,reject)=>{
      let timer;
      const clear=()=>{clearTimeout(timer);video.removeEventListener('loadeddata',ready);video.removeEventListener('error',error);};
      const ready=()=>{clear();resolve();};
      const error=()=>{clear();reject(new Error('media-unavailable'));};
      video.addEventListener('loadeddata',ready,{once:true});video.addEventListener('error',error,{once:true});
      timer=setTimeout(error,8000);
      if(video.dataset.scene!==String(sceneIndex)) {
        video.pause();video.autoplay=false;video.muted=true;video.defaultMuted=true;video.playsInline=true;
        video.preload='auto';video.dataset.scene=String(sceneIndex);video.src=scenes[sceneIndex].src;video.load();
      }
      if(video.readyState>=2)ready();
    });
  }
  const firstFrame = video => new Promise(resolve=>{
    const timer=setTimeout(resolve,200);
    if(video.requestVideoFrameCallback)video.requestVideoFrameCallback(()=>{clearTimeout(timer);resolve();});
    else requestAnimationFrame(()=>{clearTimeout(timer);resolve();});
  });
  function nextIndex() {
    for(let step=1;step<=scenes.length;step++){const next=(index+step)%scenes.length;if(!failed.has(next))return next;}
    return index;
  }
  function prepareNext() {
    if(!canRun()||busy||active<0||saveData)return;
    const next=nextIndex();
    if(next===index||prepared===next)return;
    prepared=next;
    load(1-active,next).catch(()=>{if(prepared===next){failed.add(next);prepared=-1;}});
  }
  async function show(sceneIndex) {
    if(busy){queued=sceneIndex;return;}
    if(!permitted()){label(sceneIndex);setState('poster');return;}
    busy=true;blocked=false;controls();
    const token=++revision;
    const slot=active<0?0:1-active;
    const video=videos[slot];
    try {
      await load(slot,sceneIndex);
      if(token!==revision||!canRun())return;
      await video.play();
      await firstFrame(video);
      if(token!==revision||!canRun()){video.pause();return;}
      const old=active;
      // Keep the previous layer fully opaque until the incoming layer covers it.
      video.classList.add('is-incoming','is-on');
      active=slot;label(sceneIndex);setState('playing');
      controls();
      hero.dataset.lastTransitionFrom=String(old<0?sceneIndex:Number(videos[old].dataset.scene));
      hero.dataset.transitions=String(Number(hero.dataset.transitions||0)+(old<0?0:1));
      hero.dataset.sceneHistory=[...(hero.dataset.sceneHistory||'').split(',').filter(Boolean),String(sceneIndex)].slice(-12).join(',');
      prepared=-1;
      await new Promise(resolve=>{finishFade=resolve;fadeTimer=setTimeout(()=>{finishFade=null;resolve();},950);});
      if(token!==revision)return;
      cleanup();busy=false;
      if(queued!==null){const target=queued;queued=null;if(target!==index)void show(target);}
    } catch(error) {
      if(token!==revision)return;
      if(error.name==='NotAllowedError') {
        blocked=true;userPaused=true;
      } else failed.add(sceneIndex);
      // Fallback is always a real extracted image, never an empty media layer.
      videos.forEach((_,i)=>release(i));active=-1;prepared=-1;
      label(sceneIndex);setState('poster');controls();
      if(!blocked&&failed.size<scenes.length&&canRun()) {
        const next=nextIndex();if(next!==index){busy=false;void show(next);return;}
      } else if(failed.size===scenes.length) {blocked=true;controls();}
    } finally {if(token===revision)busy=false;}
  }
  async function resume() {
    if(!canRun())return;
    if(active<0){void show(index);return;}
    try{await videos[active].play();setState('playing');controls();}
    catch{blocked=true;userPaused=true;setState('paused');controls();}
  }
  function suspend() {
    videos.forEach(video=>video.pause());
    if(active>=0)setState('paused');
    controls();
  }
  videos.forEach((video,slot)=>{
    video.addEventListener('playing',()=>{video.dataset.playing='true';});
    video.addEventListener('pause',()=>{video.dataset.playing='false';});
    video.addEventListener('error',()=>{
      if(slot!==active||!video.error)return;
      ++revision;busy=false;failed.add(index);cleanup();
      videos.forEach((_,i)=>release(i));active=-1;setState('poster');
      if(canRun()&&failed.size<scenes.length)void show(nextIndex());else{blocked=true;controls();}
    });
    video.addEventListener('timeupdate',()=>{
      video.dataset.time=video.currentTime.toFixed(2);
      if(slot!==active||!canRun())return;
      const duration=video.duration;
      hero.style.setProperty('--scene-progress',String(Number.isFinite(duration)?Math.min(1,video.currentTime/duration):0));
      if(video.currentTime>=1)prepareNext();
      if(!busy&&Number.isFinite(duration)&&duration-video.currentTime<=.95){const next=nextIndex();if(next!==index)void show(next);}
    });
    video.addEventListener('ended',()=>{if(slot===active&&canRun()&&!busy){const next=nextIndex();if(next!==index)void show(next);else{userPaused=true;controls();}}});
  });
  pauseButton.addEventListener('click',()=>{
    if(canRun()&&!blocked&&active>=0&&!videos[active].paused){userPaused=true;++revision;busy=false;queued=null;cleanup();suspend();}
    else{consent=true;userPaused=false;blocked=false;failed.clear();void resume();}
    controls();
  });
  function preferenceChanged() {
    consent=false;
    ++revision;busy=false;queued=null;cleanup();
    videos.forEach((_,i)=>release(i));active=-1;
    hero.classList.remove('cinema-intro');
    label(index);setState('poster');controls();
    if(canRun())void show(index);
  }
  reduced.addEventListener('change',preferenceChanged);
  connection?.addEventListener('change',()=>{saveData=!!connection.saveData;preferenceChanged();});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)suspend();else void resume();});
  if('IntersectionObserver' in window)new IntersectionObserver(entries=>{
    inView=entries[0].isIntersecting;
    if(!inView){queued=null;suspend();}else if(!userPaused)void resume();
  },{threshold:0}).observe(hero);
  controls();
  try {
    const key='flowzart-cinematic-intro-v1';
    if(!reduced.matches&&!sessionStorage.getItem(key)&&!location.hash){hero.classList.add('cinema-intro');sessionStorage.setItem(key,'seen');}
  } catch { /* Navigation and content never depend on storage availability. */ }
  if(canRun())void show(0);
})();
