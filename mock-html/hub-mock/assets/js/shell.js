/* ==========================================================================
   Nazm Hub — application shell + guided walkthrough
   Injects sidebar, topbar (with step navigation), hint strip and footer.
   Configured by data-* attributes on <body>:
     data-surface  hub | erp | portal
     data-nav      active sidebar key
     data-step     id from WALKTHROUGH below — drives Previous / Next
     data-crumbs   "Parent / Child"
     data-hint     one sentence: what the viewer is looking at
     data-shell    "off" to skip the shell entirely (auth screens)
   All page files live one folder deep, so cross-surface links use ../
   ========================================================================== */

/* THE canonical screen order. Everything else derives from this list. */
const WALKTHROUGH = [
  { id: 'erp-invoices',   href: '../erp/invoices.html',      name: 'Invoice raised in the ERP' },
  { id: 'hub-login',      href: '../hub/login.html',         name: 'Signing in to the Hub' },
  { id: 'hub-dashboard',  href: '../hub/dashboard.html',     name: 'Group dashboard' },
  { id: 'hub-tenants',    href: '../hub/tenants.html',       name: 'The companies onboarded' },
  { id: 'hub-tenant',     href: '../hub/tenant-detail.html', name: 'One company in detail' },
  { id: 'hub-mapping',    href: '../hub/mapping.html',       name: 'Mapping ERP fields' },
  { id: 'hub-queue',      href: '../hub/queue.html',         name: 'Invoices being processed' },
  { id: 'hub-document',   href: '../hub/document.html',      name: 'XML built and checked' },
  { id: 'hub-asp',        href: '../hub/asp.html',           name: 'Sent to the ASP' },
  { id: 'hub-history',    href: '../hub/history.html',       name: 'The full record' },
  { id: 'portal-login',   href: '../portal/login.html',      name: 'A company signs in' },
  { id: 'portal-home',    href: '../portal/dashboard.html',  name: 'What that company sees' },
  { id: 'erp-sync',       href: '../erp/sync.html',          name: 'Result back in the ERP' }
];

const NAV = {
  hub: [
    { label: 'Operations', items: [
      { key: 'dashboard', name: 'Group Dashboard',   href: 'dashboard.html', ico: 'grid' },
      { key: 'queue',     name: 'Processing Queue',  href: 'queue.html',     ico: 'queue' },
      { key: 'history',   name: 'Processing History',href: 'history.html',   ico: 'history' },
      { key: 'asp',       name: 'ASP Exchange',      href: 'asp.html',       ico: 'send' }
    ]},
    { label: 'Configuration', items: [
      { key: 'tenants',   name: 'Companies',         href: 'tenants.html',   ico: 'tenants', tag: '89' },
      { key: 'mapping',   name: 'Mapping Studio',    href: 'mapping.html',   ico: 'map' },
      { key: 'document',  name: 'Document Inspector',href: 'document.html',  ico: 'doc' }
    ]}
  ],
  erp: [
    { label: 'Accounts Receivable', items: [
      { key: 'invoices',  name: 'Sales Invoices',    href: 'invoices.html', ico: 'file' },
      { key: 'customers', name: 'Customers',         href: '#',             ico: 'users' },
      { key: 'payments',  name: 'Payment Entry',     href: '#',             ico: 'chart' }
    ]},
    { label: 'E-Invoicing', items: [
      { key: 'sync',      name: 'E-Invoice Status',  href: 'sync.html',     ico: 'sync' },
      { key: 'settings',  name: 'Settings',          href: '#',             ico: 'plug' }
    ]}
  ],
  portal: [
    { label: 'My organisation', items: [
      { key: 'dashboard', name: 'Overview',          href: 'dashboard.html', ico: 'grid' },
      { key: 'invoices',  name: 'My Invoices',       href: 'dashboard.html#invoices', ico: 'file' },
      { key: 'acks',      name: 'Acknowledgements',  href: 'dashboard.html#acks', ico: 'check' },
      { key: 'failures',  name: 'Needs my attention',href: 'dashboard.html#failures', ico: 'alert', tag: '2' }
    ]}
  ]
};

const BRAND = {
  hub:    { mark: 'N', name: 'Nazm Hub',       sub: 'Integration Console', who: 'OM', whoName: 'Group IT',      whoRole: 'Platform administrator' },
  erp:    { mark: 'A', name: 'Al Nahda ERP',   sub: 'SAP S/4HANA Cloud',   who: 'AB', whoName: 'A. Al-Balushi', whoRole: 'Accounts Receivable' },
  portal: { mark: 'A', name: 'Al Nahda Trading', sub: 'Nazm Company Portal', who: 'NK', whoName: 'N. Al-Kindi', whoRole: 'Finance — one company' }
};

const ENV = { hub: 'Nazm Hub', erp: 'Their ERP', portal: 'One company' };

/* --- step navigation markup ----------------------------------------------- */
function stepNav(i, compact) {
  const prev = i > 0 ? WALKTHROUGH[i - 1] : null;
  const next = i < WALKTHROUGH.length - 1 ? WALKTHROUGH[i + 1] : null;
  const fix = h => h.replace('../', compact ? '../' : '../');
  return `
    <a class="stepbtn ${prev ? '' : 'is-off'}" href="${prev ? fix(prev.href) : '#'}">← Previous</a>
    <span class="count">Step ${i + 1} of ${WALKTHROUGH.length}</span>
    <a class="stepbtn next" href="${next ? fix(next.href) : '../index.html'}">
      ${next ? 'Next →' : 'Finish ✓'}</a>`;
}

/* Auth screens run without the shell, but still belong to the walkthrough,
   so they get a floating step bar pinned to the bottom of the viewport. */
function floatingStepBar(i) {
  const el = document.createElement('div');
  el.className = 'stepnav';
  el.style.cssText = `position:fixed;left:50%;bottom:20px;transform:translateX(-50%);
    z-index:80;padding:8px 10px;border-radius:99px;border:1px solid var(--line-hard);
    background:var(--surface);box-shadow:var(--shadow)`;
  el.innerHTML = stepNav(i);
  document.body.appendChild(el);
}

document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const surface = body.dataset.surface;

  if (body.dataset.shell === 'off') {
    const i = WALKTHROUGH.findIndex(s => s.id === body.dataset.step);
    if (i >= 0) floatingStepBar(i);
    return;
  }
  if (!surface) return;

  const brand = BRAND[surface];
  const active = body.dataset.nav || '';
  const main = document.querySelector('main.main');
  if (!main) return;

  const stepIndex = WALKTHROUGH.findIndex(s => s.id === body.dataset.step);
  const prev = stepIndex > 0 ? WALKTHROUGH[stepIndex - 1] : null;
  const next = stepIndex >= 0 && stepIndex < WALKTHROUGH.length - 1 ? WALKTHROUGH[stepIndex + 1] : null;

  /* ---- sidebar ---- */
  const aside = document.createElement('aside');
  aside.className = 'sidebar';
  aside.innerHTML = `
    <a class="brand" href="../index.html">
      <span class="brand-mark">${brand.mark}</span>
      <span class="stack">
        <span class="brand-name">${brand.name}</span>
        <span class="brand-sub">${brand.sub}</span>
      </span>
    </a>
    <nav class="nav">${NAV[surface].map(g => `
      <div class="nav-group">
        <div class="nav-label">${g.label}</div>
        ${g.items.map(i => `
          <a class="nav-item ${i.key === active ? 'is-active' : ''}" href="${i.href}">
            ${icon(i.ico)}<span>${i.name}</span>
            ${i.tag ? `<span class="nav-tag">${i.tag}</span>` : ''}
          </a>`).join('')}
      </div>`).join('')}
    </nav>
    <div class="sidebar-foot">
      <div class="who">
        <span class="avatar">${brand.who}</span>
        <span class="stack">
          <span style="font-size:12px;font-weight:600">${brand.whoName}</span>
          <span class="tiny dim">${brand.whoRole}</span>
        </span>
      </div>
    </div>`;

  /* ---- topbar: breadcrumb + step navigation ---- */
  const crumbs = (body.dataset.crumbs || '').split('/').map(s => s.trim()).filter(Boolean);
  const bar = document.createElement('div');
  bar.className = 'topbar';
  bar.innerHTML = `
    <div class="crumbs">${crumbs.map((c, i) =>
      i === crumbs.length - 1 ? `<span class="here">${c}</span>`
                              : `<span>${c}</span><span class="sep">/</span>`).join('')}</div>
    <div class="topbar-right">
      <span class="env"><span class="beacon"><i></i></span>${ENV[surface]}</span>
      ${stepIndex >= 0 ? `<span class="vdivider" style="height:22px"></span>
        <div class="stepnav">${stepNav(stepIndex)}</div>` : ''}
    </div>`;

  /* ---- hint strip ---- */
  let hint = null;
  if (body.dataset.hint) {
    hint = document.createElement('div');
    hint.className = 'hintbar';
    hint.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
           stroke-linecap="round" stroke-linejoin="round">${ICO.info}</svg>
      <div class="grow">${body.dataset.hint}</div>
      <button class="close" title="Hide this hint"
              onclick="this.parentNode.remove()">&times;</button>`;
  }

  /* ---- foot: repeat of the step nav ---- */
  const page = main.querySelector('.page');
  if (page && stepIndex >= 0) {
    const foot = document.createElement('div');
    foot.className = 'stepfoot';
    foot.innerHTML = `
      <div class="side">
        ${prev ? `<div class="lbl">Previous</div><div class="nm">${prev.name}</div>`
               : `<div class="lbl">Start</div><div class="nm">You are at the beginning</div>`}
      </div>
      <div class="stepnav">${stepNav(stepIndex)}</div>
      <div class="side r">
        ${next ? `<div class="lbl">Next</div><div class="nm">${next.name}</div>`
               : `<div class="lbl">End</div><div class="nm">The loop is closed</div>`}
      </div>`;
    page.appendChild(foot);
  }

  const footer = document.createElement('div');
  footer.className = 'footer';
  footer.innerHTML = `
    <span>Demonstration prototype — illustrative data only</span>
    <span class="dot">·</span><span>PINT-OM v1.0.2</span>
    <span class="right"><a href="../index.html">All screens</a></span>`;

  main.prepend(bar);
  if (hint) bar.after(hint);
  main.appendChild(footer);

  const app = document.createElement('div');
  app.className = 'app';
  main.parentNode.insertBefore(app, main);
  app.appendChild(aside);
  app.appendChild(main);

  /* keyboard: ← / → move through the walkthrough */
  document.addEventListener('keydown', e => {
    if (e.target.matches('input, textarea, select')) return;
    if (e.key === 'ArrowRight' && next) location.href = next.href;
    if (e.key === 'ArrowLeft' && prev) location.href = prev.href;
  });
});
