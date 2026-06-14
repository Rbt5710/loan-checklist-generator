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

export const INDIAN_STATES = [
  'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh',
  'Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka',
  'Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram',
  'Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana',
  'Tripura','Uttar Pradesh','Uttarakhand','West Bengal',
  'Delhi','Jammu & Kashmir','Ladakh','Puducherry','Chandigarh',
];

export function getDocSchema(program, constitution) {
  const groups = [];

  const companyItems = [];
  if (constitution === 'prop') {
    companyItems.push({ id: 'gst_cert', label: 'GST registration certificate', type: 'gst' });
    companyItems.push({ id: 'udyam', label: 'Udyam registration certificate' });
  }
  if (constitution === 'partner') {
    companyItems.push({ id: 'partnership_deed', label: 'Partnership deed', sublabel: 'Latest, stamped' });
    companyItems.push({ id: 'company_pan', label: 'Company PAN card' });
    companyItems.push({ id: 'gst_cert', label: 'GST registration certificate', type: 'gst' });
    companyItems.push({ id: 'udyam', label: 'Udyam registration certificate' });
  }
  if (constitution === 'pvtltd') {
    companyItems.push({ id: 'coi', label: 'Certificate of Incorporation (COI)' });
    companyItems.push({ id: 'moa', label: 'Memorandum of Association (MOA)' });
    companyItems.push({ id: 'aoa', label: 'Articles of Association (AOA)' });
    companyItems.push({ id: 'company_pan', label: 'Company PAN card' });
    companyItems.push({ id: 'gst_cert', label: 'GST registration certificate', type: 'gst' });
    companyItems.push({ id: 'udyam', label: 'Udyam registration certificate' });
  }
  if (constitution === 'llp') {
    companyItems.push({ id: 'coi', label: 'Certificate of Incorporation (COI)' });
    companyItems.push({ id: 'llp_agreement', label: 'LLP Agreement', sublabel: 'Latest, stamped' });
    companyItems.push({ id: 'moa', label: 'Memorandum of Association (MOA)' });
    companyItems.push({ id: 'aoa', label: 'Articles of Association (AOA)' });
    companyItems.push({ id: 'company_pan', label: 'Company PAN card' });
    companyItems.push({ id: 'gst_cert', label: 'GST registration certificate', type: 'gst' });
    companyItems.push({ id: 'udyam', label: 'Udyam registration certificate' });
  }
  groups.push({ id: 'company_kyc', label: 'Company / Entity KYC', icon: 'building', tone: 'blue', items: companyItems });

  groups.push({
    id: 'promoter_kyc', label: 'Promoter KYC', icon: 'user', tone: 'blue',
    items: [
      { id: 'personal_pan', label: 'PAN card', sublabel: 'All directors / partners / proprietor' },
      { id: 'personal_aadhaar', label: 'Aadhaar card', sublabel: 'All directors / partners / proprietor' },
    ],
  });

  const bankItems = [
    { id: 'ca_statement', label: 'Current account statements', sublabel: '12 months · all banks except ours · mention A/C no. · no password' },
  ];
  if (program === 'superbiz') {
    bankItems.push({ id: 'sa_statement', label: 'Saving account statements', sublabel: '12 months · all savings accounts' });
  }
  bankItems.push({ id: 'sanction_letter', label: 'Existing facility sanction letter', sublabel: 'Latest sanction of all availed facilities' });
  groups.push({ id: 'banking', label: 'Banking', icon: 'bank', tone: 'blue', items: bankItems });

  const finItems = [
    { id: 'itr_y1', label: 'ITR computation — Year 1' },
    { id: 'itr_y2', label: 'ITR computation — Year 2' },
  ];
  if (program === 'pd') {
    finItems.push({ id: 'bs_y1', label: 'Balance Sheet — Year 1' });
    finItems.push({ id: 'bs_y2', label: 'Balance Sheet — Year 2' });
    finItems.push({ id: 'pnl_y1', label: 'Profit & Loss — Year 1' });
    finItems.push({ id: 'pnl_y2', label: 'Profit & Loss — Year 2' });
    finItems.push({ id: 'schedules', label: 'All schedules & annexures' });
    finItems.push({ id: 'tax_audit', label: 'Tax Audit Report' });
    if (constitution === 'pvtltd' || constitution === 'llp') {
      finItems.push({ id: 'director_report', label: "Director's Report" });
      finItems.push({ id: 'auditor_report', label: "Independent Auditor's Report" });
    }
  }
  groups.push({ id: 'financial', label: 'Financial Data', icon: 'chart', tone: 'blue', items: finItems });

  const stepItems = [
    {
      id: 'karza', label: 'GST sales data fetch', sublabel: 'Customer completes via GST portal link', type: 'step',
      message: [
        '*Step — GST data fetch:*',
        '1. You will receive a link to our GST data portal',
        '2. Enter your GST username on the portal',
        '3. An OTP will be sent to your GST-registered mobile number',
        '4. Enter the OTP to share your sales figures with us',
        '_Keep your GST-registered mobile number handy_',
      ],
    },
  ];
  if (program === 'superbiz' || program === 'pd') {
    stepItems.push({
      id: 'finfort', label: 'Income Tax portal consent', sublabel: 'IT consent link sent by login desk', type: 'step',
      message: [
        '*Step — Income Tax portal consent:*',
        '1. Our login desk will send an IT consent link to your registered email',
        '2. Log in to your Income Tax portal via the link',
        '3. Grant consent for financial data fetching',
        '_This step is mandatory to process your application_',
      ],
    });
  }
  groups.push({ id: 'data_fetch', label: 'Data Fetching Steps', icon: 'zap', tone: 'green', items: stepItems });

  groups.push({
    id: 'annexures', label: 'Annexures', icon: 'mail', tone: 'amber',
    sublabel: 'Send via registered email ID',
    items: [
      { id: 'rbi_ann', label: 'RBI Annexure 1' },
      { id: 'borrower_decl', label: 'Borrower Declaration' },
      { id: 'ufce', label: 'UFCE Certificate' },
      { id: 'ofac', label: 'OFAC Declaration' },
    ],
  });

  return groups;
}

export function generateMessage({ customerName, groups, checkedIds, gstStates, collateral, coapplicant, coapplicantItr, above5cr }) {
  let msg = `Dear ${customerName || 'Sir/Madam'},\n\n`;
  msg += `Hope you are doing well!\n\n`;
  msg += `Kindly share the following documents at your earliest convenience so we can proceed with your application:\n\n`;

  let docLines = [];
  let stepSections = [];
  let annexureLines = [];

  groups.forEach(group => {
    if (group.id === 'data_fetch') {
      group.items.forEach(item => {
        if (checkedIds.includes(item.id)) stepSections.push(item.message);
      });
      return;
    }
    if (group.id === 'annexures') {
      const checked = group.items.filter(i => checkedIds.includes(i.id));
      if (checked.length) {
        annexureLines.push('*Annexures — Send signed copies from your REGISTERED email ID:*');
        checked.forEach(i => annexureLines.push(`  • ${i.label}`));
        if (above5cr) annexureLines.push('  • Socio-Economic Certificate');
      }
      return;
    }
    group.items.forEach(item => {
      if (!checkedIds.includes(item.id)) return;
      if (item.type === 'gst') {
        if (gstStates.length <= 0) {
          docLines.push('GST registration certificate');
        } else if (gstStates.length === 1) {
          docLines.push(`GST registration certificate — ${gstStates[0]}`);
        } else {
          docLines.push(`GST registration certificates (${gstStates.length} states):`);
          gstStates.forEach(s => docLines.push(`STATE::${s}`));
        }
        return;
      }
      docLines.push(item.label + (item.sublabel ? ` _(${item.sublabel})_` : ''));
    });
  });

  if (collateral) docLines.push('Soft copy of property documents for valuation');
  if (coapplicant) {
    docLines.push('Co-applicant personal KYC (PAN + Aadhaar)');
    if (coapplicantItr) {
      docLines.push('Co-applicant ITR computation — Year 1');
      docLines.push('Co-applicant ITR computation — Year 2');
    }
  }

  if (docLines.length) {
    msg += `📋 *Documents required:*\n`;
    let n = 0;
    docLines.forEach(l => {
      if (l.startsWith('STATE::')) {
        msg += `     • ${l.replace('STATE::', '')}\n`;
      } else {
        n++;
        msg += `${n}. ${l}\n`;
      }
    });
    msg += '\n';
  }

  stepSections.forEach(lines => {
    lines.forEach(l => { msg += `${l}\n`; });
    msg += '\n';
  });

  if (annexureLines.length) {
    annexureLines.forEach(l => { msg += `${l}\n`; });
    msg += '\n';
  }

  msg += `⚠️ *Important notes:*\n`;
  msg += `• All documents in PDF format\n`;
  msg += `• Files must NOT be password protected\n`;
  msg += `• Mention account number on bank statements\n`;
  msg += `• Annexures to be sent from registered email ID only\n\n`;
  msg += `Please feel free to reach out for any queries!\n\n`;
  msg += `Warm regards,\n*[Your Name]*\nRelationship Manager — Business Banking`;

  return msg;
}
