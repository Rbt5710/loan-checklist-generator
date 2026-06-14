import React, { useState, useEffect } from 'react';
import { Copy, Check, ChevronDown, FileText, Zap, Mail, User, Building2, ClipboardList, ChevronRight } from 'lucide-react';
import { PROGRAMS, CONSTITUTIONS, DOC_CATALOG, getDocKeys, getAllSubItemIds, generateMessage } from './data';
import './App.css';

function SelectField({ label, icon: Icon, value, onChange, options }) {
  return (
    <div className="field">
      <label className="field-label">{Icon && <Icon size={13} />} {label}</label>
      <div className="select-wrap">
        <select value={value} onChange={e => onChange(e.target.value)} className={value ? '' : 'placeholder'}>
          <option value="">— Select —</option>
          {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
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
      <div className={`toggle ${value ? 'on' : ''}`}><div className="toggle-knob" /></div>
    </div>
  );
}

function DocGroup({ docKey, checkedSubIds, onSubToggle }) {
  const doc = DOC_CATALOG[docKey];
  if (!doc) return null;
  const [open, setOpen] = useState(true);
  const checkedCount = doc.items.filter(i => checkedSubIds.includes(i.id)).length;
  const allChecked = checkedCount === doc.items.length;
  const someChecked = checkedCount > 0 && !allChecked;

  const toggleAll = (e) => {
    e.stopPropagation();
    const ids = doc.items.map(i => i.id);
    if (allChecked) ids.forEach(id => onSubToggle(id, false));
    else ids.forEach(id => onSubToggle(id, true));
  };

  if (doc.cat === 'step') {
    const checked = checkedSubIds.includes(doc.items[0]?.id);
    return (
      <label className={`doc-item flat ${checked ? 'checked' : ''}`}>
        <input type="checkbox" checked={checked} onChange={() => {
          const ids = doc.items.map(i => i.id);
          ids.forEach(id => onSubToggle(id, !checked));
        }} />
        <div className="doc-check">{checked && <Check size={10} />}</div>
        <span className="doc-item-label">{doc.label}</span>
      </label>
    );
  }

  if (doc.cat === 'annexure') {
    return (
      <div className="doc-group">
        <div className="doc-group-header" onClick={() => setOpen(o => !o)}>
          <label className={`doc-item group-parent ${allChecked ? 'checked' : someChecked ? 'partial' : ''}`} onClick={e => e.stopPropagation()}>
            <input type="checkbox" checked={allChecked} ref={el => { if (el) el.indeterminate = someChecked; }} onChange={toggleAll} />
            <div className="doc-check">{allChecked ? <Check size={10} /> : someChecked ? <span className="partial-dash" /> : null}</div>
            <span className="doc-item-label">{doc.label}</span>
          </label>
          <ChevronRight size={13} className={`chevron ${open ? 'open' : ''}`} />
        </div>
        {open && (
          <div className="doc-subitems">
            {doc.items.map(item => {
              if (item.id.endsWith('_0')) return null;
              const checked = checkedSubIds.includes(item.id);
              return (
                <label key={item.id} className={`doc-subitem ${checked ? 'checked' : ''}`}>
                  <input type="checkbox" checked={checked} onChange={() => onSubToggle(item.id, !checked)} />
                  <div className="doc-check sm">{checked && <Check size={8} />}</div>
                  <span>{item.text.replace(/^[•]\s*/, '')}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  if (doc.items.length === 1) {
    const checked = checkedSubIds.includes(doc.items[0].id);
    return (
      <label className={`doc-item flat ${checked ? 'checked' : ''}`}>
        <input type="checkbox" checked={checked} onChange={() => onSubToggle(doc.items[0].id, !checked)} />
        <div className="doc-check">{checked && <Check size={10} />}</div>
        <span className="doc-item-label">{doc.label}</span>
      </label>
    );
  }

  return (
    <div className="doc-group">
      <div className="doc-group-header" onClick={() => setOpen(o => !o)}>
        <label className={`doc-item group-parent ${allChecked ? 'checked' : someChecked ? 'partial' : ''}`} onClick={e => e.stopPropagation()}>
          <input type="checkbox" checked={allChecked} ref={el => { if (el) el.indeterminate = someChecked; }} onChange={toggleAll} />
          <div className="doc-check">{allChecked ? <Check size={10} /> : someChecked ? <span className="partial-dash" /> : null}</div>
          <span className="doc-item-label">{doc.label}</span>
          <span className="sub-count">{checkedCount}/{doc.items.length}</span>
        </label>
        <ChevronRight size={13} className={`chevron ${open ? 'open' : ''}`} />
      </div>
      {open && (
        <div className="doc-subitems">
          {doc.items.map(item => {
            const checked = checkedSubIds.includes(item.id);
            return (
              <label key={item.id} className={`doc-subitem ${checked ? 'checked' : ''}`}>
                <input type="checkbox" checked={checked} onChange={() => onSubToggle(item.id, !checked)} />
                <div className="doc-check sm">{checked && <Check size={8} />}</div>
                <span>{item.text}</span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}

function DocSection({ title, icon: Icon, colorClass, keys, checkedSubIds, onSubToggle }) {
  if (!keys.length) return null;
  const totalItems = keys.reduce((acc, k) => acc + (DOC_CATALOG[k]?.items.length || 0), 0);
  const checkedItems = keys.reduce((acc, k) => {
    return acc + (DOC_CATALOG[k]?.items.filter(i => checkedSubIds.includes(i.id)).length || 0);
  }, 0);
  return (
    <div className={`doc-section ${colorClass}`}>
      <div className="doc-section-header">
        <Icon size={13} />
        <span>{title}</span>
        <span className="doc-count">{checkedItems}/{totalItems}</span>
      </div>
      <div className="doc-list">
        {keys.map(k => (
          <DocGroup key={k} docKey={k} checkedSubIds={checkedSubIds} onSubToggle={onSubToggle} />
        ))}
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
  const [checkedSubIds, setCheckedSubIds] = useState([]);
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const [generated, setGenerated] = useState(false);

  useEffect(() => {
    if (!program || !constitution) { setDocKeys([]); setCheckedSubIds([]); return; }
    const keys = getDocKeys({ program, constitution, coapplicant, collateral, above5cr });
    setDocKeys(keys);
    setCheckedSubIds(getAllSubItemIds(keys));
    setGenerated(false);
    setMessage('');
  }, [program, constitution, coapplicant, collateral, above5cr]);

  const handleSubToggle = (id, val) => {
    setCheckedSubIds(prev => val ? [...prev, id] : prev.filter(x => x !== id));
    setGenerated(false);
  };

  const handleGenerate = () => {
    const msg = generateMessage({ customerName, docKeys, checkedSubIds });
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
          <div className="left-panel">
            <div className="card">
              <div className="card-title"><User size={14} /> Customer details</div>
              <div className="field">
                <label className="field-label">Customer name</label>
                <input className="text-input" type="text" placeholder="e.g. Ramesh Gupta" value={customerName} onChange={e => setCustomerName(e.target.value)} />
              </div>
              <div className="two-col">
                <SelectField label="Program" icon={FileText} value={program} onChange={setProgram} options={PROGRAMS} />
                <SelectField label="Constitution" icon={Building2} value={constitution} onChange={setConstitution} options={CONSTITUTIONS} />
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
                <p className="card-hint">Uncheck documents already received from customer</p>
                <DocSection title="Documents" icon={FileText} colorClass="sec-blue" keys={docGroups.doc} checkedSubIds={checkedSubIds} onSubToggle={handleSubToggle} />
                <DocSection title="Steps for customer" icon={Zap} colorClass="sec-green" keys={docGroups.step} checkedSubIds={checkedSubIds} onSubToggle={handleSubToggle} />
                <DocSection title="Annexures (via registered email)" icon={Mail} colorClass="sec-amber" keys={docGroups.annexure} checkedSubIds={checkedSubIds} onSubToggle={handleSubToggle} />
                <button className="btn-generate" onClick={handleGenerate}>Generate WhatsApp message</button>
              </div>
            )}

            {!ready && (
              <div className="empty-hint">
                <ClipboardList size={28} />
                <p>Select a program and constitution to get started</p>
              </div>
            )}
          </div>

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
                <div className="message-preview"><pre className="message-text">{message}</pre></div>
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
