import React, { useState, useEffect } from 'react';
import { Copy, Check, ChevronDown, FileText, Zap, Mail, User, Building2, ClipboardList } from 'lucide-react';
import { PROGRAMS, CONSTITUTIONS, DOC_CATALOG, getDocKeys, generateMessage } from './data';
import './App.css';

const SELECT_PLACEHOLDER = '— Select —';

function SelectField({ label, icon: Icon, value, onChange, options, placeholder }) {
  return (
    <div className="field">
      <label className="field-label">
        {Icon && <Icon size={13} />} {label}
      </label>
      <div className="select-wrap">
        <select value={value} onChange={e => onChange(e.target.value)} className={value ? '' : 'placeholder'}>
          <option value="">{placeholder || SELECT_PLACEHOLDER}</option>
          {options.map(o => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <ChevronDown size={14} className="select-icon" />
      </div>
    </div>
  );
}

function Toggle({ label, value, onChange }) {
  return (
    <div className="toggle-row" onClick={() => onChange(!value)}>
      <span className="toggle-label">{label}</span>
      <div className={`toggle ${value ? 'on' : ''}`}>
        <div className="toggle-knob" />
      </div>
    </div>
  );
}

function DocSection({ title, icon: Icon, color, keys, checkedKeys, onToggle }) {
  if (!keys.length) return null;
  return (
    <div className="doc-section">
      <div className="doc-section-header" style={{ '--accent': color }}>
        <Icon size={14} />
        <span>{title}</span>
        <span className="doc-count">{keys.filter(k => checkedKeys.includes(k)).length}/{keys.length}</span>
      </div>
      <div className="doc-list">
        {keys.map(k => {
          const doc = DOC_CATALOG[k];
          const checked = checkedKeys.includes(k);
          return (
            <label key={k} className={`doc-item ${checked ? 'checked' : ''}`}>
              <input
                type="checkbox"
                checked={checked}
                onChange={() => onToggle(k)}
              />
              <div className="doc-check">{checked && <Check size={10} />}</div>
              <span className="doc-item-label">{doc.label}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

export default function App() {
  const [customerName, setCustomerName] = useState('');
  const [program, setProgram] = useState('');
  const [constitution, setConstitution] = useState('');
  const [coapplicant, setCoapplicant] = useState(false);
  const [collateral, setCollateral] = useState(false);
  const [above5cr, setAbove5cr] = useState(false);
  const [docKeys, setDocKeys] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const [generated, setGenerated] = useState(false);

  useEffect(() => {
    if (!program || !constitution) { setDocKeys([]); setCheckedKeys([]); return; }
    const keys = getDocKeys({ program, constitution, coapplicant, collateral, above5cr });
    setDocKeys(keys);
    setCheckedKeys(keys);
    setGenerated(false);
    setMessage('');
  }, [program, constitution, coapplicant, collateral, above5cr]);

  const handleToggle = (key) => {
    setCheckedKeys(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
    setGenerated(false);
  };

  const handleGenerate = () => {
    const msg = generateMessage({ customerName, program, constitution, docKeys, checkedKeys });
    setMessage(msg);
    setGenerated(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(message).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const docGroups = {
    doc: docKeys.filter(k => DOC_CATALOG[k]?.cat === 'doc'),
    step: docKeys.filter(k => DOC_CATALOG[k]?.cat === 'step'),
    annexure: docKeys.filter(k => DOC_CATALOG[k]?.cat === 'annexure'),
  };

  const ready = program && constitution;

  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <div className="logo">
            <div className="logo-icon"><ClipboardList size={18} /></div>
            <div>
              <div className="logo-title">Loan Checklist Generator</div>
              <div className="logo-sub">Business Banking — SME Loans</div>
            </div>
          </div>
        </div>
      </header>

      <main className="main">
        <div className="layout">

          {/* Left panel */}
          <div className="left-panel">

            <div className="card">
              <div className="card-title"><User size={14} /> Customer details</div>
              <div className="field">
                <label className="field-label">Customer name</label>
                <input
                  className="text-input"
                  type="text"
                  placeholder="e.g. Ramesh Gupta"
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                />
              </div>
              <div className="two-col">
                <SelectField
                  label="Program"
                  icon={FileText}
                  value={program}
                  onChange={setProgram}
                  options={PROGRAMS}
                />
                <SelectField
                  label="Constitution"
                  icon={Building2}
                  value={constitution}
                  onChange={setConstitution}
                  options={CONSTITUTIONS}
                />
              </div>
            </div>

            <div className="card">
              <div className="card-title"><Zap size={14} /> Case options</div>
              <Toggle label="Co-applicant involved?" value={coapplicant} onChange={setCoapplicant} />
              <Toggle label="Property offered as collateral?" value={collateral} onChange={setCollateral} />
              <Toggle label="Loan amount ₹5 Crore or above?" value={above5cr} onChange={setAbove5cr} />
            </div>

            {ready && docKeys.length > 0 && (
              <div className="card">
                <div className="card-title"><ClipboardList size={14} /> Documents & steps</div>
                <p className="card-hint">Uncheck items not applicable for this case</p>
                <DocSection
                  title="Documents"
                  icon={FileText}
                  color="#185FA5"
                  keys={docGroups.doc}
                  checkedKeys={checkedKeys}
                  onToggle={handleToggle}
                />
                <DocSection
                  title="Steps for customer"
                  icon={Zap}
                  color="#0F6E56"
                  keys={docGroups.step}
                  checkedKeys={checkedKeys}
                  onToggle={handleToggle}
                />
                <DocSection
                  title="Annexures (via registered email)"
                  icon={Mail}
                  color="#854F0B"
                  keys={docGroups.annexure}
                  checkedKeys={checkedKeys}
                  onToggle={handleToggle}
                />
                <button className="btn-generate" onClick={handleGenerate}>
                  Generate WhatsApp message
                </button>
              </div>
            )}

            {!ready && (
              <div className="empty-hint">
                <ClipboardList size={28} />
                <p>Select a program and constitution to get started</p>
              </div>
            )}
          </div>

          {/* Right panel */}
          <div className="right-panel">
            <div className="card output-card">
              <div className="output-header">
                <div className="card-title"><Mail size={14} /> WhatsApp message</div>
                {generated && (
                  <button className={`btn-copy ${copied ? 'copied' : ''}`} onClick={handleCopy}>
                    {copied ? <><Check size={14} /> Copied!</> : <><Copy size={14} /> Copy</>}
                  </button>
                )}
              </div>
              {generated ? (
                <div className="message-preview">
                  <pre className="message-text">{message}</pre>
                </div>
              ) : (
                <div className="output-empty">
                  <Mail size={32} />
                  <p>Your WhatsApp message will appear here</p>
                  <span>Fill in the details and click generate</span>
                </div>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
