export const PROGRAMS = [
  { value: 'gst', label: 'GST OD Program' },
  { value: 'banking', label: 'Banking Variant Program' },
  { value: 'superbiz', label: 'Super Biz Program' },
  { value: 'pd', label: 'PD / Financial Based Program' },
];

export const CONSTITUTIONS = [
  { value: 'prop', label: 'Proprietorship' },
  { value: 'partner', label: 'Partnership' },
  { value: 'pvtltd', label: 'Private Limited' },
  { value: 'llp', label: 'LLP' },
];

export const DOC_CATALOG = {
  common_kyc: {
    label: 'Company KYC documents',
    cat: 'doc',
    items: [
      { id: 'common_kyc_1', text: 'Company KYC — registration proof' },
      { id: 'common_kyc_2', text: 'Company KYC — address proof' },
    ],
  },
  personal_kyc: {
    label: 'Personal KYC — all directors / partners / proprietor',
    cat: 'doc',
    items: [
      { id: 'personal_kyc_1', text: 'PAN card of all directors / partners / proprietor' },
      { id: 'personal_kyc_2', text: 'Aadhaar of all directors / partners / proprietor' },
    ],
  },
  ca_statement: {
    label: 'Current account statements (12 months)',
    cat: 'doc',
    items: [
      { id: 'ca_1', text: 'Latest 12-month current account statements of ALL banks except our bank' },
      { id: 'ca_2', text: 'Please mention account number on each statement file' },
      { id: 'ca_3', text: 'Files must NOT be password protected' },
    ],
  },
  sa_statement: {
    label: 'Saving account statements (12 months)',
    cat: 'doc',
    items: [
      { id: 'sa_1', text: 'Latest 12-month saving account statements of all savings accounts' },
    ],
  },
  itr: {
    label: 'ITR computations (last 2 years)',
    cat: 'doc',
    items: [
      { id: 'itr_1', text: 'ITR computation — Year 1' },
      { id: 'itr_2', text: 'ITR computation — Year 2' },
    ],
  },
  sanction: {
    label: 'Existing facility sanction letter',
    cat: 'doc',
    items: [
      { id: 'sanction_1', text: 'Latest sanction letter of all currently availed credit facilities' },
    ],
  },
  property: {
    label: 'Property papers (collateral)',
    cat: 'doc',
    items: [
      { id: 'property_1', text: 'Soft copy of property documents for valuation purposes' },
    ],
    conditional: 'collateral',
  },
  financials: {
    label: 'Audited financials (last 2 years)',
    cat: 'doc',
    items: [
      { id: 'fin_1', text: 'Balance Sheet — Year 1' },
      { id: 'fin_2', text: 'Balance Sheet — Year 2' },
      { id: 'fin_3', text: 'Profit & Loss Statement — Year 1' },
      { id: 'fin_4', text: 'Profit & Loss Statement — Year 2' },
      { id: 'fin_5', text: 'All schedules and annexures' },
      { id: 'fin_6', text: 'Tax Audit Report' },
    ],
  },
  director_report: {
    label: "Director's Report + Auditor's Report",
    cat: 'doc',
    items: [
      { id: 'dir_1', text: "Director's Report" },
      { id: 'dir_2', text: "Independent Auditor's Report" },
    ],
  },
  gst_cert: {
    label: 'GST registration certificate',
    cat: 'doc',
    items: [
      { id: 'gst_1', text: 'GST registration certificate' },
    ],
  },
  udyam: {
    label: 'Udyam registration certificate',
    cat: 'doc',
    items: [
      { id: 'udyam_1', text: 'Udyam registration certificate' },
    ],
  },
  partnership_deed: {
    label: 'Partnership deed',
    cat: 'doc',
    items: [
      { id: 'pd_1', text: 'Partnership deed (latest, stamped)' },
    ],
  },
  company_pan: {
    label: 'Company PAN card',
    cat: 'doc',
    items: [
      { id: 'cpan_1', text: 'Company PAN card' },
    ],
  },
  moa_aoa: {
    label: 'MOA / AOA / Certificate of Incorporation',
    cat: 'doc',
    items: [
      { id: 'moa_1', text: 'Memorandum of Association (MOA)' },
      { id: 'moa_2', text: 'Articles of Association (AOA)' },
      { id: 'moa_3', text: 'Certificate of Incorporation (COI)' },
    ],
  },
  llp_agreement: {
    label: 'LLP Agreement',
    cat: 'doc',
    items: [
      { id: 'llp_1', text: 'LLP Agreement (latest, stamped)' },
    ],
  },
  coapplicant_itr: {
    label: 'Co-applicant ITR computations (2 years)',
    cat: 'doc',
    items: [
      { id: 'coitr_1', text: 'Co-applicant ITR computation — Year 1' },
      { id: 'coitr_2', text: 'Co-applicant ITR computation — Year 2' },
    ],
    conditional: 'coapplicant',
  },
  coapplicant_kyc: {
    label: 'Co-applicant personal KYC',
    cat: 'doc',
    items: [
      { id: 'cokyc_1', text: 'Co-applicant PAN card' },
      { id: 'cokyc_2', text: 'Co-applicant Aadhaar' },
    ],
    conditional: 'coapplicant',
  },
  karza: {
    label: 'GST Data Portal — sales data fetch',
    cat: 'step',
    items: [
      { id: 'karza_1', text: '*Step — GST data fetch (via GST portal):*' },
      { id: 'karza_2', text: '1. You will receive a link to our GST data portal from our team' },
      { id: 'karza_3', text: '2. Enter your GST username on the portal' },
      { id: 'karza_4', text: '3. An OTP will be sent to your GST-registered mobile number' },
      { id: 'karza_5', text: '4. Enter the OTP to securely share your sales figures with us' },
      { id: 'karza_6', text: '_Please keep your GST-registered mobile number handy_' },
    ],
  },
  finfort: {
    label: 'IT Consent Portal — Income Tax portal consent',
    cat: 'step',
    items: [
      { id: 'finfort_1', text: '*Step — Income Tax portal consent:*' },
      { id: 'finfort_2', text: '1. Our login desk will send an IT consent link to your registered email' },
      { id: 'finfort_3', text: '2. Click the link and log in to your Income Tax portal' },
      { id: 'finfort_4', text: '3. Grant consent for financial data fetching' },
      { id: 'finfort_5', text: '_This step is mandatory to process your application_' },
    ],
  },
  annexures: {
    label: 'Internal annexures (send via registered email ID)',
    cat: 'annexure',
    items: [
      { id: 'ann_0', text: '*Annexures — Send signed copies from your REGISTERED email ID:*' },
      { id: 'ann_1', text: '• RBI Annexure 1' },
      { id: 'ann_2', text: '• Borrower Declaration' },
      { id: 'ann_3', text: '• UFCE Certificate' },
      { id: 'ann_4', text: '• OFAC Declaration' },
    ],
  },
  socioeconomic: {
    label: 'Socio-economic certificate (₹5 Crore and above)',
    cat: 'annexure',
    items: [
      { id: 'socio_1', text: '• Socio-Economic Certificate' },
    ],
    conditional: 'above5cr',
  },
};

export function getDocKeys({ program, constitution, coapplicant, collateral, above5cr }) {
  let keys = [];
  keys.push('common_kyc', 'personal_kyc', 'ca_statement', 'itr', 'sanction', 'gst_cert');
  if (constitution === 'prop') keys.push('udyam');
  if (constitution === 'partner') keys.push('partnership_deed', 'company_pan', 'udyam');
  if (constitution === 'pvtltd') keys.push('moa_aoa', 'company_pan', 'udyam');
  if (constitution === 'llp') keys.push('llp_agreement', 'moa_aoa', 'company_pan', 'udyam');
  if (program === 'superbiz') keys.push('sa_statement');
  if (program === 'pd') {
    keys.push('financials');
    if (constitution === 'pvtltd' || constitution === 'llp') keys.push('director_report');
  }
  if (collateral) keys.push('property');
  if (coapplicant) keys.push('coapplicant_itr', 'coapplicant_kyc');
  keys.push('karza');
  if (program === 'superbiz' || program === 'pd') keys.push('finfort');
  keys.push('annexures');
  if (above5cr) keys.push('socioeconomic');
  return keys;
}

export function getAllSubItemIds(docKeys) {
  const ids = [];
  docKeys.forEach(k => {
    if (DOC_CATALOG[k]) {
      DOC_CATALOG[k].items.forEach(item => ids.push(item.id));
    }
  });
  return ids;
}

export function generateMessage({ customerName, docKeys, checkedSubIds }) {
  const active = docKeys.filter(k => DOC_CATALOG[k]);

  const docs = active.filter(k => DOC_CATALOG[k].cat === 'doc');
  const steps = active.filter(k => DOC_CATALOG[k].cat === 'step');
  const annexures = active.filter(k => DOC_CATALOG[k].cat === 'annexure');

  let msg = `Dear ${customerName || 'Sir/Madam'},\n\n`;
  msg += `Hope you are doing well!\n\n`;
  msg += `Kindly share the following documents at your earliest convenience so we can proceed with your application:\n\n`;

  if (docs.length) {
    msg += `📋 *Documents required:*\n`;
    let i = 1;
    docs.forEach(k => {
      DOC_CATALOG[k].items.forEach(item => {
        if (!checkedSubIds.includes(item.id)) return;
        msg += `${i}. ${item.text}\n`;
        i++;
      });
    });
    msg += '\n';
  }

  if (steps.length) {
    steps.forEach(k => {
      const activeItems = DOC_CATALOG[k].items.filter(item => checkedSubIds.includes(item.id));
      if (activeItems.length) {
        activeItems.forEach(item => { msg += `${item.text}\n`; });
        msg += '\n';
      }
    });
  }

  if (annexures.length) {
    const hasAnn = annexures.some(k =>
      DOC_CATALOG[k].items.some(item => checkedSubIds.includes(item.id))
    );
    if (hasAnn) {
      annexures.forEach(k => {
        DOC_CATALOG[k].items.forEach(item => {
          if (!checkedSubIds.includes(item.id)) return;
          msg += `${item.text}\n`;
        });
      });
      msg += '\n';
    }
  }

  msg += `⚠️ *Important notes:*\n`;
  msg += `• All documents in PDF format\n`;
  msg += `• Files must NOT be password protected\n`;
  msg += `• Mention account number on bank statements\n`;
  msg += `• Annexures must be sent from your registered email ID only\n\n`;
  msg += `Please feel free to reach out for any queries!\n\n`;
  msg += `Warm regards,\n*[Your Name]*\nRelationship Manager — Business Banking`;

  return msg;
}
