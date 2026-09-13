(() => {
  "use strict";

  const CONFIG_PATH = "content/site.json?v=0.1.0-narrative";
  const escapeHtml = (value = "") => String(value).replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]);
  const getValue = (source, path) => path.split(".").reduce((value, key) => value?.[key], source);
  const hasValue = (value) => typeof value === "string" && value.trim().length > 0;

  const bindText = (data) => {
    document.querySelectorAll("[data-bind]").forEach((element) => {
      const value = getValue(data, element.dataset.bind);
      if (hasValue(value)) element.textContent = value;
    });
    document.querySelectorAll("[data-bind-href]").forEach((element) => {
      const value = getValue(data, element.dataset.bindHref);
      if (hasValue(value)) element.setAttribute("href", value);
    });
  };

  const renderCapabilityWorlds = (items = []) => items.map((item, index) => `
    <article class="capability-card reveal">
      <div class="capability-head"><span>${String(index + 1).padStart(2, "0")}</span><span>${escapeHtml(item.code || "ÁREA")}</span></div>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.description)}</p>
      <div class="capability-status">${escapeHtml(item.status || "Contenido por documentar")}</div>
    </article>`).join("");

  const renderProcess = (items = []) => items.map((item, index) => `
    <li class="process-step reveal">
      <span class="process-index">${String(index + 1).padStart(2, "0")}</span>
      <div><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.description)}</p></div>
    </li>`).join("");

  const renderExperience = (items = []) => items.map((item) => `
    <article class="timeline-item reveal">
      <div class="timeline-meta"><span>${escapeHtml(item.period)}</span><span>${escapeHtml(item.organization)}</span></div>
      <h3>${escapeHtml(item.role)}</h3>
      <p>${escapeHtml(item.description)}</p>
    </article>`).join("");

  const renderMetaField = (label, value) => hasValue(value) ? `
    <div class="spec-field"><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>` : "";

  const renderCaseVisuals = (images = []) => {
    const entries = images.length ? images : [{ label: "Fotografía del trabajo pendiente", src: "", alt: "" }];
    return entries.map((image, index) => hasValue(image.src)
      ? `<figure class="case-image"><img src="${escapeHtml(image.src)}" alt="${escapeHtml(image.alt)}" loading="lazy"></figure>`
      : `<div class="case-image-placeholder"><span>IMG ${String(index + 1).padStart(2, "0")}</span><strong>${escapeHtml(image.label || "Material visual pendiente")}</strong></div>`).join("");
  };

  const renderPortfolio = (items = []) => items.map((item, index) => `
    <article class="case-sheet reveal">
      <header class="case-sheet-head">
        <div><p class="case-reference">${escapeHtml(item.reference || `PROYECTO ${String(index + 1).padStart(3, "0")}`)}</p><h3>${escapeHtml(item.title)}</h3></div>
        <span class="case-state">${escapeHtml(item.state || "CASO PLACEHOLDER")}</span>
      </header>
      <dl class="spec-grid">
        ${renderMetaField("Área", item.category)}
        ${renderMetaField("Trabajo", item.workType)}
        ${renderMetaField("Tipo / sector", item.clientOrSector)}
        ${renderMetaField("Año", item.year)}
        ${renderMetaField("Ubicación", item.location)}
      </dl>
      <div class="case-content">
        <div class="case-visuals">${renderCaseVisuals(item.images)}</div>
        <div class="case-story">
          <div><span>01 / Problema</span><h4>Necesidad</h4><p>${escapeHtml(item.problem)}</p></div>
          <div><span>02 / Acción</span><h4>Intervención</h4><p>${escapeHtml(item.intervention)}</p></div>
          <div><span>03 / Efecto</span><h4>Resultado</h4><p>${escapeHtml(item.result)}</p></div>
          ${(item.tools || []).length ? `<div class="case-tools"><span>Herramientas</span><p>${item.tools.map(escapeHtml).join(" · ")}</p></div>` : ""}
        </div>
      </div>
    </article>`).join("");

  const renderProjects = (items = []) => items.map((item, index) => `
    <article class="project-card reveal">
      <header><span>PRY-${String(index + 1).padStart(3, "0")}</span><span class="status">${escapeHtml(item.status)}</span></header>
      <h3>${escapeHtml(item.name)}</h3>
      <div class="project-logic">
        <div><span>Problema observado</span><p>${escapeHtml(item.observedProblem)}</p></div>
        <span class="project-arrow" aria-hidden="true">↓</span>
        <div><span>Solución / herramienta</span><p>${escapeHtml(item.solution)}</p></div>
      </div>
      ${(item.technologies || []).length ? `<footer><span>Herramientas secundarias</span><p>${item.technologies.map(escapeHtml).join(" · ")}</p></footer>` : ""}
    </article>`).join("");

  const renderContact = (contact = {}) => {
    const entries = [
      ["Correo", contact.email, contact.email ? `mailto:${contact.email}` : ""],
      ["WhatsApp", contact.whatsapp, contact.whatsappUrl],
      ["LinkedIn", contact.linkedinLabel, contact.linkedinUrl],
      ["Ubicación", contact.location, ""]
    ];
    return entries.map(([label, value, href]) => href
      ? `<a class="contact-link" href="${escapeHtml(href)}" ${href.startsWith("http") ? 'target="_blank" rel="noopener noreferrer"' : ""}><span>${label}</span><strong>${escapeHtml(value)}</strong></a>`
      : `<div class="contact-placeholder"><span>${label}</span><strong>${escapeHtml(value || "Pendiente")}</strong></div>`).join("");
  };

  const observeReveals = () => {
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(".reveal").forEach((element) => element.classList.add("visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
  };

  const setupNavigation = () => {
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector(".site-nav");
    const header = document.querySelector("[data-header]");
    toggle?.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    nav?.addEventListener("click", (event) => {
      if (event.target.closest("a")) {
        nav.classList.remove("open");
        toggle?.setAttribute("aria-expanded", "false");
      }
    });
    window.addEventListener("scroll", () => header?.classList.toggle("scrolled", window.scrollY > 24), { passive: true });
  };

  const render = (data) => {
    bindText(data);
    document.querySelector('[data-list="capabilityWorlds"]').innerHTML = renderCapabilityWorlds(data.capabilityWorlds);
    document.querySelector('[data-list="process"]').innerHTML = renderProcess(data.process);
    document.querySelector('[data-list="experience"]').innerHTML = renderExperience(data.experience);
    document.querySelector('[data-list="portfolio"]').innerHTML = renderPortfolio(data.portfolio);
    document.querySelector('[data-list="projects"]').innerHTML = renderProjects(data.projects);
    document.querySelector('[data-list="contact"]').innerHTML = renderContact(data.contact);
    observeReveals();
  };

  setupNavigation();
  fetch(CONFIG_PATH, { cache: "no-store" })
    .then((response) => {
      if (!response.ok) throw new Error(`No se pudo cargar ${CONFIG_PATH}`);
      return response.json();
    })
    .then(render)
    .catch((error) => {
      console.error(error);
      document.querySelectorAll(".reveal").forEach((element) => element.classList.add("visible"));
      document.querySelectorAll("[data-list]").forEach((element) => {
        if (!element.children.length) element.innerHTML = '<p class="empty-state">Contenido no disponible. Ejecuta el sitio mediante un servidor local.</p>';
      });
    });
})();
