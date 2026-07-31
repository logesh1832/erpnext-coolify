/* ==========================================================================
   Nazm Hub — demonstration dataset
   Fictional group, realistic Omani shapes: VATIN OM11xxxxxxxx, Peppol scheme
   0248, OMR to 3 decimals, 5% standard VAT.
   ========================================================================== */

const DEMO_DATE = '31 Jul 2026';

/* --- tenants -------------------------------------------------------------- */
const TENANTS = [
  {
    id: 'ANT', code: 'ANT-001', name: 'Al Nahda Trading LLC', short: 'Al Nahda Trading',
    sector: 'Distribution', city: 'Muscat', vatin: 'OM1100428317', peppol: '0248:OM1100428317',
    erp: 'SAP S/4HANA Cloud', erpVer: '2025 FPS02', tier: 1, conn: 'OData v4 — API_BILLING_DOCUMENT_SRV',
    status: 'live', wave: 1, health: 'ok', mapped: 47, mapTotal: 47, sync: '2 min ago',
    today: 412, mtd: 8940, failed: 3, pending: 11, success: 99.2, selfBilled: true, inbound: true
  },
  {
    id: 'MSI', code: 'ANT-002', name: 'Muscat Steel Industries SAOC', short: 'Muscat Steel',
    sector: 'Manufacturing', city: 'Sohar', vatin: 'OM1100519204', peppol: '0248:OM1100519204',
    erp: 'Microsoft Dynamics 365 F&O', erpVer: '10.0.42', tier: 1, conn: 'Data entities + Business Events',
    status: 'live', wave: 1, health: 'ok', mapped: 44, mapTotal: 45, sync: '5 min ago',
    today: 268, mtd: 5417, failed: 1, pending: 4, success: 99.6, selfBilled: true, inbound: true
  },
  {
    id: 'GLC', code: 'ANT-003', name: 'Gulf Logistics Company LLC', short: 'Gulf Logistics',
    sector: 'Logistics', city: 'Muscat', vatin: 'OM1100637852', peppol: '0248:OM1100637852',
    erp: 'Odoo 17 Enterprise', erpVer: '17.0', tier: 1, conn: 'JSON-RPC — account.move',
    status: 'live', wave: 1, health: 'warn', mapped: 41, mapTotal: 45, sync: '18 min ago',
    today: 96, mtd: 2183, failed: 14, pending: 27, success: 96.1, selfBilled: false, inbound: true
  },
  {
    id: 'SFP', code: 'ANT-004', name: 'Salalah Food Processing LLC', short: 'Salalah Foods',
    sector: 'FMCG', city: 'Salalah', vatin: 'OM1100744196', peppol: '0248:OM1100744196',
    erp: 'Tally Prime', erpVer: '4.1', tier: 2, conn: 'On-prem agent — XML/HTTP :9000',
    status: 'live', wave: 2, health: 'ok', mapped: 39, mapTotal: 41, sync: '9 min ago',
    today: 154, mtd: 3062, failed: 2, pending: 8, success: 98.8, selfBilled: false, inbound: true
  },
  {
    id: 'DQC', code: 'ANT-005', name: 'Duqm Cement Works SAOC', short: 'Duqm Cement',
    sector: 'Materials', city: 'Duqm', vatin: 'OM1100852340', peppol: '0248:OM1100852340',
    erp: 'ERPNext v15', erpVer: '15.42.1', tier: 1, conn: 'REST — Sales Invoice',
    status: 'live', wave: 2, health: 'ok', mapped: 45, mapTotal: 45, sync: '1 min ago',
    today: 87, mtd: 1744, failed: 0, pending: 2, success: 99.9, selfBilled: true, inbound: true
  },
  {
    id: 'BRE', code: 'ANT-006', name: 'Barka Retail Enterprises LLC', short: 'Barka Retail',
    sector: 'Retail', city: 'Barka', vatin: 'OM1100963471', peppol: '0248:OM1100963471',
    erp: 'Legacy POS — scheduled export', erpVer: 'v3 CSV', tier: 3, conn: 'SFTP drop — nightly 23:30',
    status: 'onboarding', wave: 3, health: 'warn', mapped: 22, mapTotal: 43, sync: '6 hr ago',
    today: 0, mtd: 0, failed: 0, pending: 0, success: null, selfBilled: false, inbound: false
  },
  {
    id: 'NPC', code: 'ANT-007', name: 'Nizwa Petrochemicals JV', short: 'Nizwa Petrochem',
    sector: 'Energy (JV)', city: 'Nizwa', vatin: 'OM1101074528', peppol: '0248:OM1101074528',
    erp: 'Oracle Fusion Cloud ERP', erpVer: '24C', tier: 1, conn: 'Satellite deployment — data resident on site',
    status: 'satellite', wave: 2, health: 'ok', mapped: 45, mapTotal: 45, sync: 'telemetry 3 min ago',
    today: 62, mtd: 1268, failed: 1, pending: 3, success: 99.1, selfBilled: false, inbound: true
  }
];

/* --- group roll-up -------------------------------------------------------- */
const GROUP = {
  name: 'Al Nahda Group',
  entities: 89, live: 61, onboarding: 24, notStarted: 4, satellites: 3,
  todayTotal: 1079, todaySuccess: 1058, todayFailed: 21, todayPending: 55,
  mtdTotal: 22614, inboundToday: 143, aspAvgMs: 412, uptime: '99.98%',
  week: [780, 1140, 960, 1310, 1205, 340, 1079]
};

/* --- customers used across invoices --------------------------------------- */
const CUSTOMERS = [
  { name: 'Oman Oil Marketing Co. SAOG', vatin: 'OM1100112233', type: 'B2B', country: 'OM' },
  { name: 'Sohar Aluminium LLC',         vatin: 'OM1100334455', type: 'B2B', country: 'OM' },
  { name: 'Muscat Municipality',         vatin: 'OM1100556677', type: 'B2G', country: 'OM' },
  { name: 'Emirates Steel Arkan PJSC',   vatin: 'AE100234567800003', type: 'Export', country: 'AE' },
  { name: 'Al Maha Petroleum SAOG',      vatin: 'OM1100778899', type: 'B2B', country: 'OM' },
  { name: 'Walk-in Customer',            vatin: null, type: 'B2C', country: 'OM' },
  { name: 'Renaissance Services SAOG',   vatin: 'OM1100990011', type: 'B2B', country: 'OM' },
  { name: 'Bahwan Engineering Co. LLC',  vatin: 'OM1100221144', type: 'B2B', country: 'OM' }
];

/* --- pipeline stages ------------------------------------------------------ */
const STAGES = ['Queued', 'Mapping', 'XML Generation', 'Validation', 'Ready for ASP', 'Submitted', 'Acknowledged'];
const STAGE_SHORT = ['Queue', 'Map', 'XML', 'Validate', 'Ready', 'Sent', 'Ack'];

/* --- invoices ------------------------------------------------------------- */
/* stage index maps into STAGES; state: ok | active | failed | held             */
const INVOICES = [
  { no: 'ANT-SINV-2026-04471', tenant: 'ANT', cust: 0, net: 24800.000, vat: 1240.000, total: 26040.000,
    cur: 'OMR', type: 'Invoice', scen: 'B2B', stage: 6, state: 'ok', retry: 0, created: '31 Jul 09:14:02',
    uuid: 'b7f4c2e1-9a3d-5c8b-a1f6-2e7d4b9c0a35', ackNo: 'ASP-OM-2026-0731-44718', ref: 'PEP-8842-2026',
    lines: 6, po: 'PO-88213' },
  { no: 'ANT-SINV-2026-04472', tenant: 'ANT', cust: 1, net: 118400.000, vat: 5920.000, total: 124320.000,
    cur: 'OMR', type: 'Invoice', scen: 'B2B', stage: 6, state: 'ok', retry: 0, created: '31 Jul 09:21:47',
    uuid: 'c1a8d3f2-4b7e-6d9c-b2a7-3f8e5c0d1b46', ackNo: 'ASP-OM-2026-0731-44719', ref: 'PEP-8843-2026',
    lines: 12, po: 'PO-88220' },
  { no: 'MSI-SINV-2026-01180', tenant: 'MSI', cust: 3, net: 86200.000, vat: 0.000, total: 86200.000,
    cur: 'OMR', type: 'Invoice', scen: 'Export', stage: 5, state: 'active', retry: 0, created: '31 Jul 10:02:11',
    uuid: 'd2b9e4a3-5c8f-7e0d-c3b8-4a9f6d1e2c57', ackNo: null, ref: 'PEP-8851-2026', lines: 4, po: 'PO-11907' },
  { no: 'GLC-SINV-2026-00934', tenant: 'GLC', cust: 4, net: 3420.000, vat: 171.000, total: 3591.000,
    cur: 'OMR', type: 'Invoice', scen: 'B2B', stage: 3, state: 'failed', retry: 2, created: '31 Jul 10:11:38',
    uuid: 'e3c0f5b4-6d9a-8f1e-d4c9-5b0a7e2f3d68', ackNo: null, ref: null, lines: 3, po: null },
  { no: 'GLC-SINV-2026-00935', tenant: 'GLC', cust: 6, net: 9150.000, vat: 457.500, total: 9607.500,
    cur: 'OMR', type: 'Invoice', scen: 'B2B', stage: 3, state: 'active', retry: 0, created: '31 Jul 10:14:05',
    uuid: 'f4d1a6c5-7e0b-9a2f-e5d0-6c1b8f3a4e79', ackNo: null, ref: null, lines: 8, po: 'PO-4471' },
  { no: 'SFP-SINV-2026-02207', tenant: 'SFP', cust: 5, net: 84.400, vat: 4.220, total: 88.620,
    cur: 'OMR', type: 'Simplified', scen: 'B2C', stage: 6, state: 'ok', retry: 0, created: '31 Jul 10:18:52',
    uuid: 'a5e2b7d6-8f1c-0b3a-f6e1-7d2c9a4b5f80', ackNo: 'ASP-OM-2026-0731-44731', ref: 'PEP-8859-2026',
    lines: 5, po: null },
  { no: 'DQC-SINV-2026-00611', tenant: 'DQC', cust: 7, net: 42750.000, vat: 2137.500, total: 44887.500,
    cur: 'OMR', type: 'Invoice', scen: 'B2B', stage: 4, state: 'ok', retry: 0, created: '31 Jul 10:22:30',
    uuid: 'b6f3c8e7-9a2d-1c4b-a7f2-8e3d0b5c6a91', ackNo: null, ref: null, lines: 2, po: 'PO-3390' },
  { no: 'ANT-CRNT-2026-00218', tenant: 'ANT', cust: 0, net: -4200.000, vat: -210.000, total: -4410.000,
    cur: 'OMR', type: 'Credit Note', scen: 'B2B', stage: 6, state: 'ok', retry: 0, created: '31 Jul 10:26:14',
    uuid: 'c7a4d9f8-0b3e-2d5c-b8a3-9f4e1c6d7b02', ackNo: 'ASP-OM-2026-0731-44736', ref: 'PEP-8863-2026',
    lines: 1, po: null, against: 'ANT-SINV-2026-04390' },
  { no: 'MSI-SINV-2026-01181', tenant: 'MSI', cust: 2, net: 15600.000, vat: 780.000, total: 16380.000,
    cur: 'OMR', type: 'Invoice', scen: 'B2G', stage: 2, state: 'active', retry: 0, created: '31 Jul 10:31:09',
    uuid: 'd8b5e0a9-1c4f-3e6d-c9b4-0a5f2d7e8c13', ackNo: null, ref: null, lines: 7, po: 'PO-11912' },
  { no: 'NPC-SINV-2026-00448', tenant: 'NPC', cust: 1, net: 62300.000, vat: 3115.000, total: 65415.000,
    cur: 'OMR', type: 'Invoice', scen: 'B2B', stage: 6, state: 'ok', retry: 0, created: '31 Jul 10:35:41',
    uuid: 'e9c6f1b0-2d5a-4f7e-d0c5-1b6a3e8f9d24', ackNo: 'ASP-OM-2026-0731-44742', ref: 'PEP-8871-2026',
    lines: 3, po: 'PO-7781', satellite: true },
  { no: 'ANT-SINV-2026-04473', tenant: 'ANT', cust: 6, net: 7480.000, vat: 374.000, total: 7854.000,
    cur: 'OMR', type: 'Invoice', scen: 'B2B', stage: 1, state: 'active', retry: 0, created: '31 Jul 10:38:56',
    uuid: 'f0d7a2c1-3e6b-5a8f-e1d6-2c7b4f9a0e35', ackNo: null, ref: null, lines: 9, po: 'PO-88231' },
  { no: 'SFP-SINV-2026-02208', tenant: 'SFP', cust: 4, net: 12900.000, vat: 645.000, total: 13545.000,
    cur: 'OMR', type: 'Invoice', scen: 'B2B', stage: 0, state: 'active', retry: 0, created: '31 Jul 10:41:12',
    uuid: null, ackNo: null, ref: null, lines: 4, po: 'PO-2201' },
  { no: 'GLC-SINV-2026-00931', tenant: 'GLC', cust: 3, net: 28700.000, vat: 0.000, total: 28700.000,
    cur: 'OMR', type: 'Invoice', scen: 'Export', stage: 5, state: 'failed', retry: 4, created: '31 Jul 08:52:20',
    uuid: 'a1e8b3d2-4f7c-6b9a-f2e7-3d8c5a0b1f46', ackNo: null, ref: null, lines: 2, po: null },
  { no: 'DQC-SINV-2026-00610', tenant: 'DQC', cust: 5, net: 1890.000, vat: 94.500, total: 1984.500,
    cur: 'OMR', type: 'Simplified', scen: 'B2C', stage: 6, state: 'ok', retry: 0, created: '31 Jul 08:14:33',
    uuid: 'b2f9c4e3-5a8d-7c0b-a3f8-4e9d6b1c2a57', ackNo: 'ASP-OM-2026-0731-44702', ref: 'PEP-8801-2026',
    lines: 3, po: null }
];

/* --- ERP-side invoice list (Screen 1) ------------------------------------- */
const ERP_INVOICES = [
  { no: 'ANT-SINV-2026-04471', cust: 'Oman Oil Marketing Co. SAOG', date: '31-07-2026', due: '30-08-2026',
    net: 24800.000, vat: 1240.000, total: 26040.000, docStatus: 'Submitted', eStatus: 'Acknowledged',
    ready: true, uuid: 'b7f4c2e1…0a35', qr: true },
  { no: 'ANT-SINV-2026-04472', cust: 'Sohar Aluminium LLC', date: '31-07-2026', due: '30-08-2026',
    net: 118400.000, vat: 5920.000, total: 124320.000, docStatus: 'Submitted', eStatus: 'Acknowledged',
    ready: true, uuid: 'c1a8d3f2…1b46', qr: true },
  { no: 'ANT-SINV-2026-04473', cust: 'Renaissance Services SAOG', date: '31-07-2026', due: '30-08-2026',
    net: 7480.000, vat: 374.000, total: 7854.000, docStatus: 'Submitted', eStatus: 'In Progress',
    ready: true, uuid: null, qr: false },
  { no: 'ANT-CRNT-2026-00218', cust: 'Oman Oil Marketing Co. SAOG', date: '31-07-2026', due: '—',
    net: -4200.000, vat: -210.000, total: -4410.000, docStatus: 'Submitted', eStatus: 'Acknowledged',
    ready: true, uuid: 'c7a4d9f8…7b02', qr: false, credit: true },
  { no: 'ANT-SINV-2026-04474', cust: 'Bahwan Engineering Co. LLC', date: '31-07-2026', due: '30-08-2026',
    net: 33150.000, vat: 1657.500, total: 34807.500, docStatus: 'Draft', eStatus: 'Not Applicable',
    ready: false, uuid: null, qr: false },
  { no: 'ANT-SINV-2026-04475', cust: 'Al Maha Petroleum SAOG', date: '31-07-2026', due: '30-08-2026',
    net: 9600.000, vat: 480.000, total: 10080.000, docStatus: 'Draft', eStatus: 'Not Applicable',
    ready: false, uuid: null, qr: false },
  { no: 'ANT-SINV-2026-04470', cust: 'Muscat Municipality', date: '30-07-2026', due: '29-08-2026',
    net: 51200.000, vat: 2560.000, total: 53760.000, docStatus: 'Submitted', eStatus: 'Acknowledged',
    ready: true, uuid: 'd4c1b8a7…3e92', qr: true },
  { no: 'ANT-SINV-2026-04469', cust: 'Sohar Aluminium LLC', date: '30-07-2026', due: '29-08-2026',
    net: 7300.000, vat: 365.000, total: 7665.000, docStatus: 'Submitted', eStatus: 'Rejected',
    ready: true, uuid: 'e5d2c9b8…4f03', qr: false }
];

/* --- mapping profile (Screen 5) ------------------------------------------- */
const MAPPING = [
  { grp: 'Document header', rows: [
    { erp: 'BillingDocument',        std: 'BT-1',  stdName: 'Invoice number',        xf: null,          req: 'Mandatory', ok: true },
    { erp: 'BillingDocumentDate',    std: 'BT-2',  stdName: 'Issue date',            xf: 'date:ISO8601',req: 'Mandatory', ok: true },
    { erp: 'BillingDocumentType',    std: 'BT-3',  stdName: 'Invoice type code',     xf: 'codelist:UNCL1001', req: 'Mandatory', ok: true },
    { erp: 'TransactionCurrency',    std: 'BT-5',  stdName: 'Document currency',     xf: null,          req: 'Mandatory', ok: true },
    { erp: 'BillingDocumentIsCancelled', std: 'BT-3', stdName: 'Credit note flag',   xf: 'map:381',     req: 'Conditional', ok: true },
    { erp: '—',                      std: 'BTOM-002', stdName: 'Document UUID',      xf: 'derive:uuidv5', req: 'Mandatory', ok: true, derived: true }
  ]},
  { grp: 'Seller party', rows: [
    { erp: 'CompanyCode',            std: 'BT-27', stdName: 'Seller name',           xf: 'lookup:company', req: 'Mandatory', ok: true },
    { erp: 'CompanyVATNumber',       std: 'BT-31', stdName: 'Seller VAT identifier', xf: 'prefix:OM',   req: 'Mandatory', ok: true },
    { erp: '—',                      std: 'BTOM-004', stdName: 'Seller participant ID', xf: 'derive:0248', req: 'Mandatory', ok: true, derived: true },
    { erp: 'CompanyAddressCity',     std: 'BT-37', stdName: 'Seller city',           xf: null,          req: 'Mandatory', ok: true },
    { erp: 'CompanyCountry',         std: 'BT-40', stdName: 'Seller country code',   xf: 'iso:alpha2',  req: 'Mandatory', ok: true }
  ]},
  { grp: 'Buyer party', rows: [
    { erp: 'CustomerCode',           std: 'BT-46', stdName: 'Buyer identifier',      xf: null,          req: 'Mandatory', ok: true },
    { erp: 'CustomerName',           std: 'BT-44', stdName: 'Buyer name',            xf: 'trim|upper',  req: 'Mandatory', ok: true },
    { erp: 'CustomerVATNumber',      std: 'BT-48', stdName: 'Buyer VAT identifier',  xf: 'nullable',    req: 'Conditional', ok: true },
    { erp: 'CustomerCountry',        std: 'BT-55', stdName: 'Buyer country code',    xf: 'iso:alpha2',  req: 'Mandatory', ok: true },
    { erp: '(not exposed)',          std: 'BT-50', stdName: 'Buyer address line 1',  xf: null,          req: 'Mandatory', ok: false }
  ]},
  { grp: 'Monetary totals', rows: [
    { erp: 'NetAmount',              std: 'BT-109', stdName: 'Sum of line net amounts', xf: 'decimal:3', req: 'Mandatory', ok: true },
    { erp: 'TaxAmount',              std: 'BT-110', stdName: 'Invoice total VAT amount', xf: 'decimal:3', req: 'Mandatory', ok: true },
    { erp: 'InvoiceTotal',           std: 'BT-112', stdName: 'Invoice total with VAT',  xf: 'decimal:3', req: 'Mandatory', ok: true },
    { erp: 'AmountDue',              std: 'BT-115', stdName: 'Amount due for payment',  xf: 'decimal:3', req: 'Mandatory', ok: true },
    { erp: 'TaxRate',                std: 'BT-119', stdName: 'VAT category rate',       xf: 'pct',       req: 'Mandatory', ok: true }
  ]},
  { grp: 'Line items', rows: [
    { erp: 'ProductCode',            std: 'BT-155', stdName: 'Item seller identifier', xf: null,        req: 'Mandatory', ok: true },
    { erp: 'ProductDescription',     std: 'BT-153', stdName: 'Item name',              xf: 'trim',      req: 'Mandatory', ok: true },
    { erp: 'BillingQuantity',        std: 'BT-129', stdName: 'Invoiced quantity',      xf: 'decimal:4', req: 'Mandatory', ok: true },
    { erp: 'BillingQuantityUnit',    std: 'BT-130', stdName: 'Unit of measure code',   xf: 'codelist:UNECE20', req: 'Mandatory', ok: true },
    { erp: 'NetPriceAmount',         std: 'BT-146', stdName: 'Item net price',         xf: 'decimal:3', req: 'Mandatory', ok: true },
    { erp: '(not exposed)',          std: 'BT-158', stdName: 'Item classification code', xf: null,      req: 'Optional',  ok: false }
  ]}
];

/* --- validation results (Screen 7) ---------------------------------------- */
const VALIDATION = {
  profile: 'PINT-OM v1.0.2 · Schematron OM-CIUS-1.0.2', ran: '31 Jul 2026 10:22:31 GST', ms: 284,
  passed: 148, failed: 0, warned: 2,
  rules: [
    { st: 'pass', id: 'IBR-001-OM', txt: 'An invoice shall have a Specification identifier (BT-24).' },
    { st: 'pass', id: 'IBR-002-OM', txt: 'An invoice shall have an Invoice number (BT-1).' },
    { st: 'pass', id: 'BTOM-002',   txt: 'Document UUID shall be a deterministic UUIDv5 over seller ID, invoice number and issue date.' },
    { st: 'pass', id: 'IBR-CO-10',  txt: 'Sum of Invoice line net amounts (BT-106) = Σ Invoice line net amount (BT-131).' },
    { st: 'pass', id: 'IBR-CO-15',  txt: 'Invoice total with VAT (BT-112) = Invoice total without VAT (BT-109) + Invoice total VAT (BT-110).' },
    { st: 'pass', id: 'IBR-052-OM', txt: 'Seller VAT identifier shall match the Omani VATIN format OM + 10 digits.' },
    { st: 'warn', id: 'IBR-W-014',  txt: 'Payment means code (BT-81) not supplied — defaulted to 30 (credit transfer).',
      x: 'cac:PaymentMeans/cbc:PaymentMeansCode' },
    { st: 'warn', id: 'IBR-W-031',  txt: 'Buyer address line 1 (BT-50) sourced from fallback mapping — field not exposed by ERP.',
      x: 'cac:AccountingCustomerParty/cac:Party/cac:PostalAddress/cbc:StreetName' }
  ]
};

const VALIDATION_FAILED = {
  profile: 'PINT-OM v1.0.2 · Schematron OM-CIUS-1.0.2', ran: '31 Jul 2026 10:11:52 GST', ms: 261,
  passed: 143, failed: 2, warned: 1,
  rules: [
    { st: 'fail', id: 'IBR-053-OM', txt: 'Buyer VAT identifier (BT-48) is absent and no substitute participant ID was derived.',
      x: 'cac:AccountingCustomerParty/cac:Party/cac:PartyTaxScheme/cbc:CompanyID' },
    { st: 'fail', id: 'IBR-CO-15',  txt: 'Invoice total with VAT (BT-112) does not equal BT-109 + BT-110. Expected 3591.000, found 3590.000.',
      x: 'cac:LegalMonetaryTotal/cbc:TaxInclusiveAmount' },
    { st: 'warn', id: 'IBR-W-014',  txt: 'Payment means code (BT-81) not supplied — defaulted to 30 (credit transfer).',
      x: 'cac:PaymentMeans/cbc:PaymentMeansCode' },
    { st: 'pass', id: 'IBR-001-OM', txt: 'An invoice shall have a Specification identifier (BT-24).' },
    { st: 'pass', id: 'IBR-002-OM', txt: 'An invoice shall have an Invoice number (BT-1).' }
  ]
};

/* --- processing logs ------------------------------------------------------ */
const LOGS = [
  { ts: '10:22:28.114', lv: 'info', txt: 'Poll tick — tenant DQC, watermark 2026-07-31T10:21:44Z' },
  { ts: '10:22:28.291', lv: 'info', txt: 'Fetched raw payload · 14.2 KB · 27 fields (allowlist applied)' },
  { ts: '10:22:28.402', lv: 'ok',   txt: 'Idempotency check passed — (DQC, DQC-SINV-2026-00611) not previously seen' },
  { ts: '10:22:28.556', lv: 'info', txt: 'Mapping profile DQC/v4 applied — 45 of 45 fields resolved' },
  { ts: '10:22:28.703', lv: 'info', txt: 'Scenario detected: B2B domestic · standard rate 5%' },
  { ts: '10:22:28.844', lv: 'ok',   txt: 'BTOM-002 UUID derived — b6f3c8e7-9a2d-1c4b-a7f2-8e3d0b5c6a91' },
  { ts: '10:22:29.017', lv: 'info', txt: 'UBL 2.1 Invoice built · 8.9 KB · 2 lines' },
  { ts: '10:22:29.188', lv: 'info', txt: 'Schematron OM-CIUS-1.0.2 — evaluating 150 assertions' },
  { ts: '10:22:31.472', lv: 'warn', txt: 'IBR-W-014 · payment means defaulted to 30' },
  { ts: '10:22:31.474', lv: 'ok',   txt: 'Validation passed — 148 passed, 0 failed, 2 warnings (284 ms)' },
  { ts: '10:22:31.610', lv: 'ok',   txt: 'State → READY_FOR_ASP · queued on tenant channel DQC' }
];

/* --- ASP exchange (Screen 8) ---------------------------------------------- */
const ASP = {
  provider: 'Oman Accredited Service Provider — OTA licence ASP-OM-014',
  endpoint: 'https://ap.asp-oman.om/peppol/v1/documents',
  auth: 'mTLS · client cert CN=nazm-hub.alnahda.om · expires 14 Mar 2027',
  sentAt: '31 Jul 2026 09:14:07.221 GST',
  ackAt:  '31 Jul 2026 09:14:07.633 GST',
  mlsAt:  '31 Jul 2026 09:16:41.008 GST',
  rtt: 412,
  http: '202 Accepted',
  ref: 'PEP-8842-2026',
  ackNo: 'ASP-OM-2026-0731-44718',
  msgId: 'urn:uuid:b7f4c2e1-9a3d-5c8b-a1f6-2e7d4b9c0a35',
  sender: '0248:OM1100428317',
  receiver: '0248:OM1100112233',
  docType: 'urn:peppol:pint:billing-1@om-1',
  process: 'urn:peppol:bis:billing',
  mls: 'DELIVERED',
  govStatus: 'Reported to OTA'
};

/* --- history (Screen 9) --------------------------------------------------- */
const HISTORY = [
  { no: 'ANT-SINV-2026-04471', tenant: 'ANT', date: '31 Jul 09:14', total: 26040.000, type: 'Invoice',  st: 'success', ack: 'ASP-OM-2026-0731-44718', retries: 0 },
  { no: 'ANT-SINV-2026-04472', tenant: 'ANT', date: '31 Jul 09:21', total: 124320.000, type: 'Invoice', st: 'success', ack: 'ASP-OM-2026-0731-44719', retries: 0 },
  { no: 'DQC-SINV-2026-00610', tenant: 'DQC', date: '31 Jul 08:14', total: 1984.500, type: 'Simplified', st: 'success', ack: 'ASP-OM-2026-0731-44702', retries: 0 },
  { no: 'GLC-SINV-2026-00931', tenant: 'GLC', date: '31 Jul 08:52', total: 28700.000, type: 'Invoice',  st: 'failed',  ack: null, retries: 4, err: 'ASP timeout — transient, retrying' },
  { no: 'SFP-SINV-2026-02207', tenant: 'SFP', date: '31 Jul 10:18', total: 88.620, type: 'Simplified',  st: 'success', ack: 'ASP-OM-2026-0731-44731', retries: 0 },
  { no: 'ANT-CRNT-2026-00218', tenant: 'ANT', date: '31 Jul 10:26', total: -4410.000, type: 'Credit Note', st: 'success', ack: 'ASP-OM-2026-0731-44736', retries: 0 },
  { no: 'NPC-SINV-2026-00448', tenant: 'NPC', date: '31 Jul 10:35', total: 65415.000, type: 'Invoice',  st: 'success', ack: 'ASP-OM-2026-0731-44742', retries: 0 },
  { no: 'GLC-SINV-2026-00934', tenant: 'GLC', date: '31 Jul 10:11', total: 3591.000, type: 'Invoice',   st: 'failed',  ack: null, retries: 2, err: 'IBR-CO-15 · total mismatch' },
  { no: 'MSI-SINV-2026-01179', tenant: 'MSI', date: '31 Jul 07:40', total: 44210.000, type: 'Invoice',  st: 'reprocessed', ack: 'ASP-OM-2026-0731-44688', retries: 1 },
  { no: 'ANT-SINV-2026-04469', tenant: 'ANT', date: '30 Jul 16:22', total: 7665.000, type: 'Invoice',   st: 'rejected', ack: null, retries: 0, err: 'ASP rejected — buyer participant not registered' },
  { no: 'MSI-SINV-2026-01180', tenant: 'MSI', date: '31 Jul 10:02', total: 86200.000, type: 'Invoice',  st: 'pending', ack: null, retries: 0 },
  { no: 'DQC-SINV-2026-00611', tenant: 'DQC', date: '31 Jul 10:22', total: 44887.500, type: 'Invoice',  st: 'pending', ack: null, retries: 0 },
  { no: 'SFP-SINV-2026-02205', tenant: 'SFP', date: '30 Jul 19:03', total: 2310.750, type: 'Simplified', st: 'success', ack: 'ASP-OM-2026-0730-44611', retries: 0 },
  { no: 'ANT-SINV-2026-04470', tenant: 'ANT', date: '30 Jul 14:11', total: 53760.000, type: 'Invoice',  st: 'success', ack: 'ASP-OM-2026-0730-44590', retries: 0 }
];

/* --- group activity feed -------------------------------------------------- */
const ACTIVITY = [
  { st: 'ok',   t: '10:35', title: 'Acknowledgement received', body: 'NPC-SINV-2026-00448 · ASP-OM-2026-0731-44742', tag: 'Nizwa Petrochem' },
  { st: 'fail', t: '10:11', title: 'Validation failed', body: 'GLC-SINV-2026-00934 · IBR-CO-15 total mismatch', tag: 'Gulf Logistics' },
  { st: 'ok',   t: '10:26', title: 'Credit note acknowledged', body: 'ANT-CRNT-2026-00218 against ANT-SINV-2026-04390', tag: 'Al Nahda Trading' },
  { st: 'warn', t: '09:58', title: 'Connector latency elevated', body: 'Odoo JSON-RPC p95 at 3.4 s — above 2 s threshold', tag: 'Gulf Logistics' },
  { st: 'ok',   t: '09:40', title: 'Mapping profile published', body: 'Salalah Foods v3 — 39 of 41 fields resolved', tag: 'Salalah Foods' },
  { st: 'warn', t: '08:22', title: 'Onboarding checkpoint due', body: 'Barka Retail — 22 of 43 fields mapped, wave 3', tag: 'Barka Retail' },
  { st: 'ok',   t: '07:15', title: 'Inbound document delivered', body: '3 supplier invoices posted as drafts in Dynamics 365', tag: 'Muscat Steel' }
];

/* --- ERP status sync steps (Screen 11) ------------------------------------ */
const SYNC_STEPS = [
  { name: 'Invoice submitted in ERP', t: '31 Jul 09:14:02', st: 'ok',
    body: 'Sales Invoice ANT-SINV-2026-04471 submitted by A. Al-Balushi. Document status set to Submitted.' },
  { name: 'Picked up by Hub', t: '31 Jul 09:14:04', st: 'ok',
    body: 'Tier 1 connector polled OData API_BILLING_DOCUMENT_SRV. Raw payload 14.2 KB, allowlist applied.' },
  { name: 'Mapped and validated', t: '31 Jul 09:14:06', st: 'ok',
    body: 'Profile ANT/v7 applied. UBL 2.1 built. Schematron OM-CIUS-1.0.2 passed — 148 rules, 2 warnings.' },
  { name: 'Submitted to ASP', t: '31 Jul 09:14:07', st: 'ok',
    body: 'HTTP 202 Accepted from ap.asp-oman.om in 412 ms. Peppol reference PEP-8842-2026.' },
  { name: 'Acknowledgement received', t: '31 Jul 09:16:41', st: 'ok',
    body: 'MLS status DELIVERED. Acknowledgement ASP-OM-2026-0731-44718. Reported to OTA.' },
  { name: 'Written back to ERP', t: '31 Jul 09:16:43', st: 'ok',
    body: 'Custom fields updated on the ERP invoice record: UUID, e-invoice status, acknowledgement number, Peppol reference, signed XML attachment.' },
  { name: 'QR generated', t: '31 Jul 09:16:43', st: 'ok',
    body: 'Appendix D Base64 TLV QR attached to the print format. Available on the customer copy.' }
];

/* --- helpers -------------------------------------------------------------- */
function tenant(id) { return TENANTS.find(t => t.id === id); }
function omr(n) {
  if (n === null || n === undefined) return '—';
  return (n < 0 ? '−' : '') + Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: 3, maximumFractionDigits: 3 });
}
function pct(n) { return n === null ? '—' : n.toFixed(1) + '%'; }
