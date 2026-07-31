/* ==========================================================================
   Nazm Hub — shared UI component helpers
   Every function returns an HTML string. Pages compose them.
   ========================================================================== */

/* --- icons (16px, currentColor) ------------------------------------------- */
const ICO = {
  grid:    '<path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z"/>',
  tenants: '<path d="M3 21V7l6-4v6l6-4v6l6-4v14z"/><path d="M9 21v-4h6v4"/>',
  map:     '<path d="M4 7h6M14 17h6"/><path d="M10 7a4 4 0 0 0 4 4h2a4 4 0 0 1 4 4v2"/><circle cx="4" cy="7" r="2"/><circle cx="20" cy="17" r="2"/>',
  queue:   '<path d="M3 6h18M3 12h18M3 18h11"/>',
  doc:     '<path d="M14 3v5h5"/><path d="M14 3H6v18h12V8z"/><path d="M9 13h6M9 17h4"/>',
  send:    '<path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4z"/>',
  history: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l3 2"/>',
  sync:    '<path d="M21 12a9 9 0 0 1-15.5 6.2L3 16"/><path d="M3 12a9 9 0 0 1 15.5-6.2L21 8"/><path d="M21 3v5h-5M3 21v-5h5"/>',
  shield:  '<path d="M12 3l8 3v6c0 5-3.4 8.4-8 9-4.6-.6-8-4-8-9V6z"/><path d="m9 12 2 2 4-4"/>',
  bell:    '<path d="M18 8a6 6 0 1 0-12 0c0 7-3 8-3 8h18s-3-1-3-8"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/>',
  search:  '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
  check:   '<path d="m4 12 5 5L20 6"/>',
  x:       '<path d="M18 6 6 18M6 6l12 12"/>',
  alert:   '<path d="M12 9v4M12 17h.01"/><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/>',
  info:    '<circle cx="12" cy="12" r="9"/><path d="M12 16v-4M12 8h.01"/>',
  clock:   '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  out:     '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5M21 12H9"/>',
  plug:    '<path d="M9 2v6M15 2v6"/><path d="M6 8h12v3a6 6 0 0 1-12 0z"/><path d="M12 17v5"/>',
  file:    '<path d="M13 2v7h7"/><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/>',
  qr:      '<path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3z"/><path d="M14 14h3v3h-3zM19 14h2v2M14 19h3v2M19 19h2v2"/>',
  down:    '<path d="M12 4v14M6 13l6 6 6-6"/>',
  chart:   '<path d="M3 3v18h18"/><path d="M7 15l4-5 3 3 5-7"/>',
  lock:    '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
  filter:  '<path d="M3 4h18l-7 8v7l-4 2v-9z"/>',
  refresh: '<path d="M21 12a9 9 0 1 1-2.6-6.4L21 8"/><path d="M21 3v5h-5"/>',
  play:    '<path d="M6 4l14 8-14 8z"/>',
  users:   '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9"/>'
};

function icon(name, cls) {
  return `<svg class="${cls || 'nav-ico'}" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICO[name] || ''}</svg>`;
}

/* --- status pills --------------------------------------------------------- */
const PILL_MAP = {
  success:     ['ok',   'Success'],      ok:          ['ok',   'OK'],
  acknowledged:['ok',   'Acknowledged'], delivered:   ['ok',   'Delivered'],
  live:        ['ok',   'Live'],         connected:   ['ok',   'Connected'],
  passed:      ['ok',   'Passed'],       completed:   ['ok',   'Completed'],
  pending:     ['warn', 'Pending'],      active:      ['warn', 'In progress'],
  onboarding:  ['warn', 'Onboarding'],   warn:        ['warn', 'Warning'],
  queued:      ['idle', 'Queued'],       draft:       ['idle', 'Draft'],
  failed:      ['fail', 'Failed'],       rejected:    ['fail', 'Rejected'],
  error:       ['fail', 'Error'],
  reprocessed: ['info', 'Reprocessed'],  satellite:   ['info', 'Satellite'],
  submitted:   ['info', 'Submitted']
};
function pill(key, label) {
  const m = PILL_MAP[String(key).toLowerCase()] || ['idle', key];
  return `<span class="pill pill-${m[0]}"><i class="dot"></i>${label || m[1]}</span>`;
}

/* --- stat tile ------------------------------------------------------------ */
function stat(o) {
  return `<div class="stat rise" ${o.tone ? `style="--tone:${o.tone}"` : ''}>
    <div class="stat-label">${o.label}</div>
    <div class="stat-value">${o.value}</div>
    ${o.meta ? `<div class="stat-meta">${o.meta}</div>` : ''}
  </div>`;
}

/* --- full pipeline stepper ------------------------------------------------ */
function pipeline(currentIndex, opts) {
  const o = opts || {};
  const stages = o.stages || STAGES;
  const times = o.times || [];
  const failedAt = o.failedAt;
  return `<div class="pipe">` + stages.map((s, i) => {
    let cls = 'todo';
    if (failedAt !== undefined && i === failedAt) cls = 'fail';
    else if (failedAt !== undefined && i < failedAt) cls = 'done';
    else if (i < currentIndex) cls = 'done';
    else if (i === currentIndex) cls = 'active';
    const mark = cls === 'done'
      ? `<svg class="pipe-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${ICO.check}</svg>`
      : cls === 'fail'
      ? `<svg class="pipe-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round">${ICO.x}</svg>`
      : '';
    return `<div class="pipe-step ${cls}" style="--i:${i}">
      <div class="pipe-rail"><i></i></div>
      <div class="pipe-meta">
        <div class="pipe-name">${mark}${s}</div>
        ${times[i] ? `<div class="pipe-time">${times[i]}</div>` : ''}
      </div>
    </div>`;
  }).join('') + `</div>`;
}

/* --- compact pipeline for table cells ------------------------------------- */
function pipeMini(idx, state) {
  let out = '<span class="pipe-mini" title="' + (STAGES[idx] || '') + '">';
  for (let i = 0; i < STAGES.length; i++) {
    let c = '';
    if (state === 'failed' && i === idx) c = 'bad';
    else if (i < idx) c = 'on';
    else if (i === idx) c = state === 'failed' ? 'bad' : 'now';
    out += `<i class="${c}"></i>`;
  }
  return out + '</span>';
}

/* --- timeline ------------------------------------------------------------- */
function timeline(items) {
  return `<div class="tl">` + items.map(it => `
    <div class="tl-item ${it.st || ''}">
      <div class="tl-title">${it.name || it.title}</div>
      <div class="tl-meta">${it.t}</div>
      ${it.body ? `<div class="tl-body">${it.body}</div>` : ''}
    </div>`).join('') + `</div>`;
}

/* --- validation rule rows ------------------------------------------------- */
function ruleRow(r) {
  const ic = r.st === 'pass' ? 'check' : r.st === 'fail' ? 'x' : 'alert';
  const col = r.st === 'pass' ? 'var(--ok)' : r.st === 'fail' ? 'var(--fail)' : 'var(--warn)';
  return `<div class="rule ${r.st}">
    <svg class="rule-ico" viewBox="0 0 24 24" fill="none" stroke="${col}" stroke-width="2.2"
      stroke-linecap="round" stroke-linejoin="round">${ICO[ic]}</svg>
    <div class="grow">
      <div class="rule-id">${r.id}</div>
      <div class="rule-txt">${r.txt}</div>
      ${r.x ? `<div class="rule-x">${r.x}</div>` : ''}
    </div>
  </div>`;
}

/* --- notice --------------------------------------------------------------- */
function notice(kind, html) {
  const ic = kind === 'ok' ? 'check' : kind === 'fail' ? 'alert' : kind === 'warn' ? 'alert' : 'info';
  const col = kind === 'ok' ? 'var(--ok)' : kind === 'fail' ? 'var(--fail)' : kind === 'warn' ? 'var(--warn)' : 'var(--accent)';
  return `<div class="notice notice-${kind}">
    <svg class="notice-ico" viewBox="0 0 24 24" fill="none" stroke="${col}" stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round">${ICO[ic]}</svg>
    <div class="grow">${html}</div>
  </div>`;
}

/* --- teaching callout (explains the mock to stakeholders) ----------------- */
function teach(html) {
  return `<div class="teach">
    <svg style="width:14px;height:14px;flex:none;margin-top:2px" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICO.info}</svg>
    <div>${html}</div>
  </div>`;
}

/* --- tenant chip ---------------------------------------------------------- */
function tenantChip(id) {
  const t = tenant(id);
  if (!t) return id;
  return `<span class="row-tight"><span class="avatar" style="width:20px;height:20px;font-size:9px">${t.id}</span>
    <span>${t.short}</span></span>`;
}

/* --- mapping arrow -------------------------------------------------------- */
function mapArrow() {
  return `<div class="map-arrow"><svg viewBox="0 0 80 12" preserveAspectRatio="none">
    <line class="ln" x1="2" y1="6" x2="66" y2="6"/>
    <polygon class="hd" points="66,2 76,6 66,10"/>
  </svg></div>`;
}

/* --- sparkline ------------------------------------------------------------ */
function spark(values) {
  const max = Math.max.apply(null, values);
  return `<div class="spark">` + values.map((v, i) =>
    `<i class="${i === values.length - 1 ? 'hi' : ''}" style="height:${Math.max(8, (v / max) * 100)}%"></i>`
  ).join('') + `</div>`;
}

/* --- syntax-highlighted XML -----------------------------------------------
   Tokenises each line into comments, tags and text, then emits markup once.
   Nothing re-scans previously emitted output, so an attribute pass can never
   match the class="..." of a span produced by the tag pass.                  */
function xml(src) {
  const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const span = (c, t) => '<span class="' + c + '">' + t + '</span>';
  const TAG = /<!--[\s\S]*?-->|<\/?[A-Za-z_?][\w:.?-]*(?:\s[^<>]*?)?\/?>/g;
  const ATTR = /([\w:.-]+)\s*=\s*"([^"]*)"/g;

  return src.split('\n').map(line => {
    let out = '', cursor = 0, m;
    TAG.lastIndex = 0;
    while ((m = TAG.exec(line)) !== null) {
      if (m.index > cursor) out += span('tk-txt', esc(line.slice(cursor, m.index)));
      const tag = m[0];
      if (tag.startsWith('<!--')) {
        out += span('tk-com', esc(tag));
      } else {
        const t = tag.match(/^(<[\/?]?)([\w:.?-]+)([\s\S]*?)([?\/]?>)$/);
        if (!t) {
          out += esc(tag);
        } else {
          let attrs = '', j = 0, a;
          ATTR.lastIndex = 0;
          while ((a = ATTR.exec(t[3])) !== null) {
            if (a.index > j) attrs += esc(t[3].slice(j, a.index));
            attrs += span('tk-attr', esc(a[1])) + '=' + span('tk-val', '"' + esc(a[2]) + '"');
            j = a.index + a[0].length;
          }
          attrs += esc(t[3].slice(j));
          out += esc(t[1]) + span('tk-tag', esc(t[2])) + attrs + esc(t[4]);
        }
      }
      cursor = m.index + tag.length;
    }
    if (cursor < line.length) out += span('tk-txt', esc(line.slice(cursor)));
    return '<span class="l">' + (out || ' ') + '</span>';
  }).join('');
}

/* --- log viewer ----------------------------------------------------------- */
function logView(entries) {
  return `<div class="logs">` + entries.map(l =>
    `<div class="lg"><span class="ts">${l.ts}</span><span class="lv lv-${l.lv}">${l.lv.toUpperCase()}</span><span class="grow">${l.txt}</span></div>`
  ).join('') + `</div>`;
}

/* --- key/value list ------------------------------------------------------- */
function kv(pairs, flat) {
  return `<dl class="kv ${flat ? 'kv-flat' : ''}">` +
    pairs.map(p => `<dt>${p[0]}</dt><dd>${p[1]}</dd>`).join('') + `</dl>`;
}

/* --- simple bar ----------------------------------------------------------- */
function bar(pctVal, tone) {
  return `<div class="bar"><i style="--w:${pctVal}%;${tone ? `--tone:${tone}` : ''}"></i></div>`;
}
