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
    items: ['Company KYC (registration proof, address proof)'],
  },
  personal_kyc: {
    label: 'Personal KYC — all directors / partners / proprietor',
    cat: 'doc',
    items: ['Personal KYC — PAN card + Aadhaar of all directors / partners / proprietor'],
  },
  ca_statement: {
    label: 'Current account statements (12 months, all banks except our bank)',
    cat: 'doc',
    items: [
      'Latest 12-month current account statements of ALL banks except our bank',
      'Please mention account number on each statement file',
      'Files must NOT be password protected',
    ],
  },
  sa_statement: {
    label: 'Saving account statements (12 months) — Super Biz',
    cat: 'doc',
    items: ['Latest 12-month saving account statements of all savings accounts'],
  },
  itr: {
    label: 'ITR computations (last 2 years)',
    cat: 'doc',
    items: ['Last 2 years ITR computation'],
  },
  sanction: {
    label: 'Existing facility sanction letter',
    cat: 'doc',
    items: ['Latest sanction letter of all currently availed credit facilities'],
  },
  property: {
    label: 'Property papers (collateral)',
    cat: 'doc',
    items: ['Soft copy of property documents for valuation purposes'],
    conditional: 'collateral',
  },
  financials: {
    label: 'Audited financials — Balance Sheet, P&L, schedules, Tax Audit Report (2 years)',
    cat: 'doc',
    items: [
      'Last 2 years audited financials:',
      '  • Balance Sheet',
      '  • Profit & Loss Statement',
      '  • All schedules and annexures',
      '  • Tax Audit Report',
    ],
  },
  director_report: {
    label: "Director's Report + Independent Auditor's Report",
    cat: 'doc',
    items: ["Director's Report", "Independent Auditor's Report"],
  },
  gst_cert: {
    label: 'GST registration certificate',
    cat: 'doc',
    items: ['GST registration certificate'],
  },
  udyam: {
    label: 'Udyam registration certificate',
    cat: 'doc',
    items: ['Udyam registration certificate'],
  },
  partnership_deed: {
    label: 'Partnership deed',
    cat: 'doc',
    items: ['Partnership deed (latest, stamped)'],
  },
  company_pan: {
    label: 'Company PAN card',
    cat: 'doc',
    items: ['Company PAN card'],
  },
  moa_aoa: {
    label: 'MOA / AOA / Certificate of Incorporation',
    cat: 'doc',
    items: [
      'Memorandum of Association (MOA)',
      'Articles of Association (AOA)',
      'Certificate of Incorporation (COI)',
    ],
  },
  llp_agreement: {
    label: 'LLP Agreement',
    cat: 'doc',
    items: ['LLP Agreement (latest, stamped)'],
  },
  coapplicant_itr: {
    label: 'Co-applicant ITR computations (2 years)',
    cat: 'doc',
    items: ['Last 2 years ITR computation of all co-applicants'],
    conditional: 'coapplicant',
  },
  coapplicant_kyc: {
    label: 'Co-applicant personal KYC',
    cat: 'doc',
    items: ['Personal KYC (PAN + Aadhaar) of all co-applicants'],
    conditional: 'coapplicant',
  },
  karza: {
    label: 'GST Data Portal — sales data fetch',
    cat: 'step',
    items: [
      '*Step — GST data fetch (via GST portal):*',
      '1. You will receive a link to our GST data portal from our team',
      '2. Enter your GST username on the portal',
      '3. An OTP will be sent to your GST-registered mobile number',
      '4. Enter the OTP to securely share your sales figures with us',
      '_Please keep your GST-registered mobile number handy_',
    ],
  },
  finfort: {
    label: 'IT Consent Portal — Income Tax portal consent',
    cat: 'step',
    items: [
      '*Step — Income Tax portal consent:*',
      '1. Our login desk will send an IT consent link to your registered email',
      '2. Click the link and log in to your Income Tax portal',
      '3. Grant consent for financial data fetching',
      '_This step is mandatory to process your application_',
    ],
  },
  annexures: {
    label: 'Internal annexures (send via registered email ID)',
    cat: 'annexure',
    items: [
      '*Annexures — Send signed copies from your REGISTERED email ID:*',
      '  • RBI Annexure 1',
      '  • Borrower Declaration',
      '  • UFCE Certificate',
      '  • OFAC Declaration',
    ],
  },
  socioeconomic: {
    label: 'Socio-economic certificate (₹5 Crore and above cases)',
    cat: 'annexure',
    items: ['  • Socio-Economic Certificate'],
    conditional: 'above5cr',
  },
};

export function getDocKeys({ program, constitution, coapplicant, collateral, above5cr }) {
  let keys = [];

  // Common docs
  keys.push('common_kyc', 'personal_kyc', 'ca_statement', 'itr', 'sanction', 'gst_cert');

  // Constitution-specific
  if (constitution === 'prop') keys.push('udyam');
  if (constitution === 'partner') keys.push('partnership_deed', 'company_pan', 'udyam');
  if (constitution === 'pvtltd') keys.push('moa_aoa', 'company_pan', 'udyam');
  if (constitution === 'llp') keys.push('llp_agreement', 'moa_aoa', 'company_pan', 'udyam');

  // Program-specific
  if (program === 'superbiz') keys.push('sa_statement');
  if (program === 'pd') {
    keys.push('financials');
    if (constitution === 'pvtltd' || constitution === 'llp') keys.push('director_report');
  }

  // Conditionals
  if (collateral) keys.push('property');
  if (coapplicant) keys.push('coapplicant_itr', 'coapplicant_kyc');

  // Steps
  keys.push('karza');
  if (program === 'superbiz' || program === 'pd') keys.push('finfort');

  // Annexures
  keys.push('annexures');
  if (above5cr) keys.push('socioeconomic');

  return keys;
}

export function generateMessage({ customerName, program, constitution, docKeys, checkedKeys }) {
  const progLabel = PROGRAMS.find(p => p.value === program)?.label || '';
  const conLabel = CONSTITUTIONS.find(c => c.value === constitution)?.label || '';

  const active = docKeys.filter(k => checkedKeys.includes(k));

  const docs = active.filter(k => DOC_CATALOG[k]?.cat === 'doc');
  const steps = active.filter(k => DOC_CATALOG[k]?.cat === 'step');
  const annexures = active.filter(k => DOC_CATALOG[k]?.cat === 'annexure');

  let msg = `Dear ${customerName || 'Sir/Madam'},\n\n`;
  msg += `Greetings from our team! 🙏\n\n`;
  msg += `Thank you for your interest. To process your *${progLabel}* application (${conLabel}), please arrange the following:\n\n`;

  if (docs.length) {
    msg += `📋 *Documents required:*\n`;
    let i = 1;
    docs.forEach(k => {
      DOC_CATALOG[k].items.forEach(line => {
        if (line.startsWith('  ') || line.startsWith('•')) {
          msg += `   ${line.trim()}\n`;
        } else {
          msg += `${i}. ${line}\n`;
          i++;
        }
      });
    });
    msg += '\n';
  }

  if (steps.length) {
    steps.forEach(k => {
      DOC_CATALOG[k].items.forEach(line => { msg += `${line}\n`; });
      msg += '\n';
    });
  }

  if (annexures.length) {
    annexures.forEach(k => {
      DOC_CATALOG[k].items.forEach(line => { msg += `${line}\n`; });
    });
    msg += '\n';
  }

  msg += `⚠️ *Important notes:*\n`;
  msg += `• All documents in PDF format\n`;
  msg += `• Files must NOT be password protected\n`;
  msg += `• Mention account number on bank statements\n`;
  msg += `• Annexures must be sent from your registered email ID only\n\n`;
  msg += `Please feel free to reach out for any queries. Looking forward to serving you!\n\n`;
  msg += `Warm regards,\n*[Your Name]*\nRelationship Manager — Business Banking`;

  return msg;
}
