(() => {
  "use strict";
  const appearance = typeof module !== 'undefined' && module.exports ? require('./theme.js') : window.FlowzartTheme;
  const text = value => typeof value === "string" ? value.trim() : "";
  const list = value => Array.isArray(value) ? value : [];
  const records = value => list(value).filter(item => item && typeof item === "object" && !Array.isArray(item));
  const escapeHtml = value => text(value).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[c]);
  const safeUrl = (value, kind = "external") => {
    if (typeof value !== "string" || /[\u0000-\u001f\u007f]/u.test(value)) return "";
    const url = text(value);
    if (!url || /[\\\s\u0000-\u001f\u007f]/u.test(url)) return "";
    try {
      if (kind === "asset" && /^assets\/[a-zA-Z0-9_./-]+$/.test(url) && !url.split("/").some(part => part === ".." || part === ".")) return url;
      const parsed = new URL(url);
      return parsed.protocol === "https:" && !parsed.username && !parsed.password ? parsed.href : "";
    } catch { return ""; }
  };
  const strings = value => list(value).map(text).filter(Boolean);
  const validModel = data => {
    const v = data?.v02;
    if (!v || typeof v !== "object" || !text(v.identity?.name) || !text(v.identity?.concept) || !text(v.presentation?.summary) || !Array.isArray(v.areas) || !Array.isArray(v.methodology) || !Array.isArray(v.featuredPortfolio) || !text(v.studio?.name)) throw new Error("Modelo de contenido v0.2 incompleto.");
    const projects = records(v.featuredPortfolio);
    if (strings(v.areas).length !== 3 || records(v.methodology).length !== 5 || v.methodology.some(step => !text(step.title) || !text(step.description))) throw new Error("Se requieren tres áreas y cinco etapas completas.");
    if (projects.length !== v.featuredPortfolio.length || projects.some(p => !/^(ING|TEC|DIS)-\d{3}$/.test(text(p.id)) || !text(p.title) || !text(p.category)) || new Set(projects.map(p=>p.id)).size !== projects.length) throw new Error("Fichas de proyectos inválidas.");
    return v;
  };
  const renderAreas = (value, details) => strings(value).map((title,i)=>{const area=list(details)[i];return `<article><span class="mono">0${i+1} / ${["ING","TEC","DIS"][i] || "ÁREA"}</span><h3>${escapeHtml(title)}</h3>${text(area?.description)?`<p>${escapeHtml(area.description)}</p>`:""}${strings(area?.services).length?`<ul>${strings(area.services).map(service=>`<li>${escapeHtml(service)}</li>`).join("")}</ul>`:""}</article>`;}).join("");
  const renderPortrait = portrait => portrait?.publicationApproved !== false && safeUrl(portrait?.src,"asset") && text(portrait?.alt) ? `<img class="portrait" src="${escapeHtml(safeUrl(portrait.src,"asset"))}" alt="${escapeHtml(portrait.alt)}" loading="lazy" decoding="async">` : "";
  const renderProcess = value => records(value).filter(x=>text(x.title)).map((x,i)=>`<li><span class="mono">${String(i+1).padStart(2,"0")}</span><h3>${escapeHtml(x.title)}</h3>${text(x.description)?`<p>${escapeHtml(x.description)}</p>`:""}</li>`).join("");
  const field = (label,value) => text(value) ? `<div class="project-detail"><h4>${label}</h4><p>${escapeHtml(value)}</p></div>` : "";
  const renderPortfolio = value => records(value).filter(p => p.visible !== false).map(p => {
    const evidence = records(p.evidence).filter(e=>text(e.id) && e.publicationApproved === true && (text(e.description) || safeUrl(e.file,"asset") || safeUrl(e.url)));
    const approved = id => evidence.some(e=>e.id===id);
    const results = records(p.results).filter(r=>text(r.description) && strings(r.evidenceIds).length && strings(r.evidenceIds).every(approved));
    const images = records(p.images).filter(i=>safeUrl(i.src,"asset") && text(i.alt) && approved(i.evidenceId));
    const cover = images.findIndex(i => i.src === p.coverImage);
    if (cover > 0) images.unshift(images.splice(cover, 1)[0]);
    const links = records(p.links).filter(l=>text(l.label) && safeUrl(l.url));
    const tools = strings(p.tools);
    return `<article class="project-card" id="${escapeHtml(p.id)}" data-category="${escapeHtml(p.category)}"><div class="project-meta"><span>${escapeHtml(p.id)}</span><span>${escapeHtml(p.category)}</span></div><h3>${escapeHtml(p.title)}</h3>${text(p.location)?`<p class="project-location">${escapeHtml(p.location)}</p>`:""}${field("Tipo de trabajo",p.workType)}${field("Problema / contexto",p.context)}${field("Intervención / solución",p.solution)}${field("Herramienta propia de apoyo al servicio",p.supportingTool)}${field("Mi participación",p.participation)}${tools.length?field("Herramientas",tools.join(" · ")):""}${results.length?`<div class="project-detail"><h4>Resultados verificables</h4><ul>${results.map(r=>`<li>${escapeHtml(r.description)}</li>`).join("")}</ul></div>`:""}${images.length?`<div class="project-images">${images.map(i=>`<figure><img src="${escapeHtml(safeUrl(i.src,"asset"))}" alt="${escapeHtml(i.alt)}" loading="lazy" decoding="async">${text(i.caption)?`<figcaption>${escapeHtml(i.caption)}</figcaption>`:""}</figure>`).join("")}</div>`:""}${links.length?`<div class="project-links">${links.map(l=>`<a href="${escapeHtml(safeUrl(l.url))}" target="_blank" rel="noopener noreferrer">${escapeHtml(l.label)} ↗<span class="sr-only"> (abre una nueva pestaña)</span></a>`).join("")}</div>`:""}${text(p.status)?`<p class="project-status">Estado del proyecto: ${escapeHtml(p.status)}</p>`:""}${text(p.editorialStatus)?`<p class="editorial-note">${p.editorialStatus==="Pendiente de documentar"?"Ficha en documentación":`Documentación: ${escapeHtml(p.editorialStatus)}`}</p>`:""}</article>`;
  }).join("") || '<p class="quiet">No hay proyectos visibles por ahora.</p>';
  const renderBackground = (value,type) => records(value).filter(x=>text(x[type==="education"?"title":"role"])).map(x=>`<article class="timeline-item"><h4>${escapeHtml(x[type==="education"?"title":"role"])}</h4>${text(x.institution||x.organization)?`<p>${escapeHtml(x.institution||x.organization)}</p>`:""}${text(x.period)?`<span>${escapeHtml(x.period)}</span>`:""}${text(x.type)?`<p>${escapeHtml(x.type)}</p>`:""}${text(x.description)?`<p>${escapeHtml(x.description)}</p>`:""}</article>`).join("") || `<p class="quiet">${type==="education"?"La información de formación está pendiente de incorporar.":"Los antecedentes de trayectoria están pendientes de incorporar."}</p>`;
  const whatsappHref = contact => {
    const base = safeUrl(contact?.whatsappUrl);
    if (!base) return "";
    const url = new URL(base);
    if (url.hostname !== "wa.me" || !/^\/\d+$/.test(url.pathname)) return "";
    const message = text(contact.whatsappMessage);
    if (message) url.searchParams.set("text", message);
    return url.href;
  };
  const renderContact = contact => {
    const c = contact && typeof contact === "object" ? contact : {};
    const email = text(c.email);
    const entries = [];
    if (/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email) && !/[?&#%]/.test(email)) entries.push(`<a class="contact-link" href="mailto:${escapeHtml(email)}"><span>Correo</span><span>${escapeHtml(email)}</span></a>`);
    [["WhatsApp",c.whatsapp,whatsappHref(c)],["LinkedIn",c.linkedinLabel,c.linkedinUrl]].forEach(([label,value,url])=>{if(text(value)&&safeUrl(url)) entries.push(`<a class="contact-link" href="${escapeHtml(safeUrl(url))}" target="_blank" rel="noopener noreferrer"><span>${label}</span><span>${escapeHtml(value)} ↗<span class="sr-only"> (abre una nueva pestaña)</span></span></a>`);});
    if(text(c.location)) entries.push(`<p>${escapeHtml(c.location)}</p>`);
    records(c.links).filter(link=>text(link.label)&&safeUrl(link.url)).forEach(link=>entries.push(`<a class="contact-link" href="${escapeHtml(safeUrl(link.url))}" target="_blank" rel="noopener noreferrer"><span>${escapeHtml(link.label)}</span><span>Visitar ↗<span class="sr-only"> (abre una nueva pestaña)</span></span></a>`));
    return entries.join("") || '<p class="quiet">Los canales de contacto están pendientes de incorporar.</p>';
  };
  // Permite comprobar los renderizadores con Node, sin dependencias ni navegador.
  if (typeof module !== "undefined" && module.exports) { module.exports={safeUrl,validModel,renderPortfolio,renderBackground,renderProcess,renderContact,renderAreas,renderPortrait,escapeHtml,strings,whatsappHref}; return; }
  const getValue = (data,path) => path.split(".").reduce((value,key)=>value?.[key],data);
  const setList = (name,html) => { const el=document.querySelector(`[data-list="${name}"]`); if(el) el.innerHTML=html; };
  const setupNavigation = () => {
    const button=document.querySelector(".nav-toggle"), nav=document.querySelector("#site-nav");
    if(!button||!nav) return;
    document.body.classList.add("enhanced"); button.hidden=false;
    const close=()=>{nav.classList.remove("open");button.setAttribute("aria-expanded","false");};
    button.addEventListener("click",()=>{const open=nav.classList.toggle("open");button.setAttribute("aria-expanded",String(open));});
    nav.addEventListener("click",e=>{if(e.target.closest("a")) close();});
    document.addEventListener("keydown",e=>{if(e.key==="Escape"&&nav.classList.contains("open")){close();button.focus();}});
    document.addEventListener("click",e=>{if(!e.target.closest(".nav-wrap")) close();});
    const mq=window.matchMedia("(max-width:720px)");mq.addEventListener("change",()=>{if(nav.contains(document.activeElement))button.focus();close();});
  };
  const setupFilters = () => {
    const group=document.querySelector(".filters"); if(!group)return;
    group.hidden=false;
    group.querySelector('[data-filter="all"] span').textContent=String(document.querySelectorAll(".project-card").length).padStart(2,"0");
    group.addEventListener("click",e=>{const button=e.target.closest("button[data-filter]");if(!button)return;const filter=button.dataset.filter;
      group.querySelectorAll("button").forEach(b=>b.setAttribute("aria-pressed",String(b===button)));
      let count=0;document.querySelectorAll(".project-card").forEach(card=>{card.hidden=filter!=="all"&&card.dataset.category!==filter;if(!card.hidden)count++;});
      document.querySelector("#filter-status").textContent=`${count} proyectos visibles${filter==="all"?"":` de ${filter}`}.`;
    });
  };
  const render = data => {
    const v=validModel(data);
    // Construir antes de mutar el DOM: si el modelo falla se conserva el HTML legible.
    const blocks={areas:renderAreas(v.areas,v.areaDetails),methodology:renderProcess(v.methodology),featuredPortfolio:renderPortfolio(v.featuredPortfolio),studioActivities:strings(v.studio.activities).map(t=>`<li>${escapeHtml(t)}</li>`).join(""),education:renderBackground(v.education,"education"),trajectory:renderBackground(v.trajectory,"trajectory"),contact:renderContact(v.contact)};
    document.querySelectorAll("[data-bind]").forEach(el=>{const value=getValue(v,el.dataset.bind);el.textContent=text(value);});
    const concept=text(v.identity.concept), parts=concept.split(" "), last=parts.pop();if (!document.querySelector("#hero-title").hasAttribute("data-cinematic-title")) document.querySelector("#hero-title").innerHTML=`${escapeHtml(parts.join(" "))} <span>${escapeHtml(last)}</span>`;
    document.querySelector(".brand").setAttribute("aria-label",`${v.identity.name}, inicio`);
    document.title = document.querySelector("[data-cinematic-title]") ? "Flowzart Studio | De tu idea a la implementación" : text(v.metadata?.title)||`${v.identity.name} | ${v.identity.concept}`;
    document.querySelector('meta[name="description"]').content=text(v.metadata?.description)||v.presentation.summary;
    Object.entries(blocks).forEach(([name,html])=>setList(name,html));
    appearance.apply(v.theme);
    const theme=text(v.theme?.palette?.background);if(/^#[0-9a-f]{6}$/i.test(theme))document.querySelector('meta[name="theme-color"]').content=theme;
    const portrait=document.querySelector("#portrait");if(portrait)portrait.innerHTML=renderPortrait(v.portrait);
    const cv=document.querySelector("#cv-download");if(v.cv?.available===true&&safeUrl(v.cv.file,"asset")){cv.href=safeUrl(v.cv.file,"asset");cv.hidden=false;}
    setupFilters();
  };
  setupNavigation();
  fetch("content/site.json?v=0.3.0",{cache:"no-store"}).then(r=>{if(!r.ok)throw new Error(`HTTP ${r.status}`);return r.json();}).then(render).catch(error=>{console.error("No se pudo actualizar el contenido:",error);const status=document.querySelector("#content-status");status.textContent="No se pudo actualizar el contenido. Se muestra la versión incluida en la página. Comprueba el archivo de contenido y la conexión; para abrir el proyecto local utiliza un servidor HTTP.";status.hidden=false;});
})();
