/* Configuración visual compartida por el sitio, el editor y el sincronizador. */
(() => {
  'use strict';
  const defaults = {palette: {background: '#151A1F', surface: '#252D34', accent: '#C8926E', text: '#F2F3F1', textSecondary: '#9AA7B2'}, typography: {body: 'sans', heading: 'sans'}, layout: {titleSize: 'normal', spacing: 'normal', corners: 'square'}};
  const fonts = {sans: '"IBM Plex Sans","Segoe UI",sans-serif', mono: '"IBM Plex Mono",Consolas,monospace'};
  // Reglas derivadas completas: un respaldo anterior no necesita conocer los tokens nuevos.
  const rules = 'h1,h2,h3{font-family:var(--heading-font,var(--sans));overflow-wrap:anywhere}h1{font-size:calc(clamp(3.7rem,7vw,6.3rem) * var(--title-scale,1))}h2{font-size:calc(clamp(2rem,4.4vw,3.7rem) * var(--title-scale,1))}.studio h2{font-size:calc(clamp(2.5rem,5vw,4.7rem) * var(--title-scale,1))}.contact-grid h2{font-size:calc(clamp(2.2rem,4vw,3.5rem) * var(--title-scale,1))}.section{padding:calc(6rem * var(--spacing-scale,1)) 0}.project-card,.button,.studio-panel,.technical-frame{border-radius:var(--corner-radius,0px)}.primary:hover{filter:none;outline:1px solid var(--accent);outline-offset:3px}@media(max-width:1000px){.hero-grid h1{font-size:calc(clamp(3.5rem,7vw,5.5rem) * var(--title-scale,1))}}@media(max-width:720px){.hero-grid h1{font-size:calc(clamp(3.2rem,12vw,5rem) * var(--title-scale,1))}.section{padding:calc(3.5rem * var(--spacing-scale,1)) 0}h2,.contact h2{font-size:calc(2.2rem * var(--title-scale,1))}}';
  function read(theme = {}) {
    return {palette: {...defaults.palette, ...theme.palette}, typography: {...defaults.typography, ...theme.typography}, layout: {...defaults.layout, ...theme.layout}};
  }
  function contrast(a, b) {
    const luminance = hex => { const rgb = hex.slice(1).match(/../g).map(n => parseInt(n, 16) / 255).map(n => n <= .04045 ? n / 12.92 : ((n + .055) / 1.055) ** 2.4); return rgb[0] * .2126 + rgb[1] * .7152 + rgb[2] * .0722; };
    const x = luminance(a), y = luminance(b); return (Math.max(x, y) + .05) / (Math.min(x, y) + .05);
  }
  function validate(value) {
    const check = (v, keys) => { if (!v || typeof v !== 'object' || Array.isArray(v) || Object.keys(v).length !== keys.length || keys.some(k => !Object.hasOwn(v, k))) throw new Error('La apariencia contiene campos incompletos o no permitidos.'); };
    check(value, ['palette', 'typography', 'layout']); check(value.palette, Object.keys(defaults.palette)); check(value.typography, ['body', 'heading']); check(value.layout, ['titleSize', 'spacing', 'corners']);
    for (const color of Object.values(value.palette)) if (typeof color !== 'string' || !/^#[0-9a-f]{6}$/i.test(color)) throw new Error('Selecciona colores hexadecimales de seis dígitos.');
    for (const font of Object.values(value.typography)) if (!Object.hasOwn(fonts, font)) throw new Error('Selecciona una de las tipografías locales disponibles.');
    for (const [key, options] of Object.entries({titleSize: ['compact', 'normal', 'large'], spacing: ['compact', 'normal', 'airy'], corners: ['square', 'soft']})) if (!options.includes(value.layout[key])) throw new Error('Selecciona un ajuste de presentación disponible.');
    const names = {text: 'Texto principal', textSecondary: 'Texto secundario', accent: 'Acento'}, backgrounds = {background: 'fondo principal', surface: 'superficies'};
    for (const [fg, label] of Object.entries(names)) for (const [bg, background] of Object.entries(backgrounds)) if (contrast(value.palette[fg], value.palette[bg]) < 4.5) throw new Error(`${label}: contraste insuficiente sobre ${background}. Ajusta los colores hasta alcanzar 4,5:1.`);
    return structuredClone(value);
  }
  function variables(value) {
    const v = validate(read(value));
    return {...Object.fromEntries(Object.entries(v.palette).map(([k, color]) => ['--' + k, color])), '--sans': fonts[v.typography.body], '--heading-font': fonts[v.typography.heading], '--title-scale': {compact: '.9', normal: '1', large: '1.06'}[v.layout.titleSize], '--spacing-scale': {compact: '.85', normal: '1', airy: '1.15'}[v.layout.spacing], '--corner-radius': v.layout.corners === 'soft' ? '8px' : '0px'};
  }
  function apply(value, doc = document) {
    Object.entries(variables(value)).forEach(([key, entry]) => doc.documentElement.style.setProperty(key, entry));
    if (doc.head && !doc.querySelector('#flowzart-appearance-rules')) { const style = doc.createElement('style'); style.id = 'flowzart-appearance-rules'; style.textContent = rules; doc.head.append(style); }
    const meta = doc.querySelector('meta[name="theme-color"]'); if (meta) meta.content = read(value).palette.background;
  }
  const api = {defaults, read, validate, contrast, variables, rules, apply};
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else window.FlowzartTheme = api;
})();
