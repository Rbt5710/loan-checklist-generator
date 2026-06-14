import React, { useState, useEffect } from 'react';
import {
  ClipboardList, User, FileText, Zap, Mail, Moon, Sun,
  Copy, Check, ChevronRight, Plus, X
} from 'lucide-react';
import { PROGRAMS, CONSTITUTIONS, INDIAN_STATES, getDocSchema, generateMessage } from './data';
import './App.css';

function useTheme() {
  const [dark, setDark] = useState(() => window.matchMedia('(prefers-color-scheme: dark)').matches);
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  }, [dark]);
  return [dark, setDark];
}

function SelectField({ label, value, onChange, options }) {
  return (
    <div className="field">
      <label className="field-label">{label}</label>
      <div className="select-wrap">
        <select value={value} onChange={e => onChange(e.target.value)}>
          <option value="">— Select —</option>
          {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <ChevronRight size={13} className="select-icon" style={{ transform: 'rotate(90deg)' }} />
      </div>
    </div>
  );
}

function Toggle({ label, sub, value, onChange }) {
  return (
    <div className="toggle-row" onClick={() => onChange(!value)}>
      <div className="toggle-info">
        <span className="toggle-label">{label}</span>
        {sub && <span className="toggle-sub">{sub}</span>}
      </div>
      <div className={`toggle ${value ? 'on' : ''}`}><div className="toggle-knob" /></div>
    </div>
  );
}

function GstPicker({ gstStates, setGstStates }) {
  const [selected, setSelected] = useState('');
  const available = INDIAN_STATES.filter(s => !gstStates.includes(s));
  const add = () => {
    if (selected && !gstStates.includes(selected)) {
      setGstStates(prev => [...prev, selected]);
      setSelected('');
    }
  };
  return (
    <div className="gst-picker">
      <div className="gst-picker-label">GST state(s) required</div>
      {gstStates.length > 0 && (
        <div className="gst-tags">
          {gstStates.map(s => (
            <div key={s} className="gst-tag">
              {s}
              <button className="gst-tag-remove" onClick={() => setGstStates(prev => prev.filter(x => x !== s))}>
                <X size={9} />
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="gst-add-row">
        <select value={selected} onChange={e => setSelected(e.target.value)}>
          <option value="">Select state…</option>
          {available.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <button className="gst-add-btn" onClick={add} disabled={!selected}>
          <Plus size={12} style={{ display: 'inline', verticalAlign: -1, marginRight: 4 }} />
          Add
        </button>
      </div>
    </div>
  );
}

function DocItem({ item, checked, onToggle, gstStates, setGstStates }) {
  const isGst = item.type === 'gst';
  const isStep = item.type === 'step';
  return (
    <>
      <label className={`doc-item ${checked ? 'checked' : ''}`}>
        <input type="checkbox" checked={checked} onChange={() => onToggle(item.id)} />
        <div className="doc-cb">{checked && <Check size={10} />}</div>
        <div className="doc-text">
          <div className="doc-label">{item.label}</div>
          {item.sublabel && <div className="doc-sub">{item.sublabel}</div>}
        </div>
      </label>
      {isGst && checked && <GstPicker gstStates={gstStates} setGstStates={setGstStates} />}
    </>
  );
}

function AccSection({ section, checkedIds, onToggle, gstStates, setGstStates }) {
  const [open, setOpen] = useState(true);
  const checkedCount = section.items.filter(i => checkedIds.includes(i.id)).length;
  const total = section.items.length;
  const full = checkedCount === total;

  const iconClass = section.id === 'steps' ? 'green' : section.id === 'annexures' ? 'amber' : 'blue';
  const IconEl = section.id === 'kyc' ? User : section.id === 'financials' ? FileText : section.id === 'steps' ? Zap : Mail;

  return (
    <div className="acc-section">
      <div className="acc-header" onClick={() => setOpen(o => !o)}>
        <div className={`acc-icon ${iconClass}`}><IconEl size={13} /></div>
        <span className="acc-title">{section.label}</span>
        <span className={`acc-badge ${full ? 'full' : ''}`}>{checkedCount}/{total}</span>
        <ChevronRight size={14} className={`acc-chevron ${open ? 'open' : ''}`} />
      </div>
      {open && (
        <div className="acc-body">
          {section.items.map(item => (
            <DocItem
              key={item.id}
              item={item}
              checked={checkedIds.includes(item.id)}
              onToggle={onToggle}
              gstStates={gstStates}
              setGstStates={setGstStates}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [dark, setDark] = useTheme();
  const [customerName, setCustomerName] = useState('');
  const [program, setProgram] = useState('');
  const [constitution, setConstitution] = useState('');
  const [collateral, setCollateral] = useState(false);
  const [coapplicant, setCoapplicant] = useState(false);
  const [coapplicantItr, setCoapplicantItr] = useState(false);
  const [above5cr, setAbove5cr] = useState(false);
  const [gstStates, setGstStates] = useState([]);
  const [sections, setSections] = useState([]);
  const [checkedIds, setCheckedIds] = useState([]);
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const [generated, setGenerated] = useState(false);

  useEffect(() => {
    if (!program || !constitution) { setSections([]); setCheckedIds([]); return; }
    const s = getDocSchema(program, constitution);
    setSections(s);
    setCheckedIds(s.flatMap(sec => sec.items.map(i => i.id)));
    setGenerated(false);
    setMessage('');
  }, [program, constitution]);

  const handleToggle = (id) => {
    setCheckedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    setGenerated(false);
  };

  const handleGenerate = () => {
    const msg = generateMessage({ customerName, sections, checkedIds, gstStates, collateral, coapplicant, coapplicantItr, above5cr });
    setMessage(msg);
    setGenerated(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(message).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  };

  const ready = program && constitution;

  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <div className="logo">
            <div className="logo-icon"><ClipboardList size={16} /></div>
            <div>
              <div className="logo-title">Loan Checklist Generator</div>
              <div className="logo-sub">Business Banking — SME Loans</div>
            </div>
          </div>
          <button className="theme-btn" onClick={() => setDark(d => !d)} aria-label="Toggle theme">
            {dark ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </div>
      </header>

      <main className="main">
        <div className="layout">
          <div className="left-panel">

            <div className="card">
              <div className="card-header">
                <div className="card-icon"><User size={14} /></div>
                <span className="card-title">Customer details</span>
              </div>
              <div className="field">
                <label className="field-label">Customer name</label>
                <input className="text-input" type="text" placeholder="e.g. Ramesh Gupta" value={customerName} onChange={e => setCustomerName(e.target.value)} />
              </div>
              <div className="two-col">
                <SelectField label="Program" value={program} onChange={setProgram} options={PROGRAMS} />
                <SelectField label="Constitution" value={constitution} onChange={setConstitution} options={CONSTITUTIONS} />
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <div className="card-icon"><Zap size={14} /></div>
                <span className="card-title">Case options</span>
              </div>
              <Toggle label="Property as collateral?" value={collateral} onChange={setCollateral} />
              <Toggle label="Co-applicant involved?" value={coapplicant} onChange={setCoapplicant} />
              {coapplicant && (
                <Toggle label="Co-applicant ITR required?" sub="Include 2-year ITR of co-applicant" value={coapplicantItr} onChange={setCoapplicantItr} />
              )}
              <Toggle label="Loan amount ₹5 Crore or above?" value={above5cr} onChange={setAbove5cr} />
            </div>

            {ready && sections.length > 0 && (
              <div className="card">
                <div className="card-header">
                  <div className="card-icon"><ClipboardList size={14} /></div>
                  <span className="card-title">Documents & steps</span>
                </div>
                <p className="card-hint">Uncheck documents already received from customer</p>
                {sections.map(sec => (
                  <AccSection
                    key={sec.id}
                    section={sec}
                    checkedIds={checkedIds}
                    onToggle={handleToggle}
                    gstStates={gstStates}
                    setGstStates={setGstStates}
                  />
                ))}
                <button className="btn-generate" onClick={handleGenerate}>
                  Generate WhatsApp message
                </button>
              </div>
            )}

            {!ready && (
              <div className="empty-state">
                <ClipboardList size={26} />
                <p>Select a program and constitution to get started</p>
              </div>
            )}
          </div>

          <div className="right-panel">
            <div className="card output-card">
              <div className="output-header">
                <div className="card-header" style={{ marginBottom: 0 }}>
                  <div className="card-icon"><Mail size={14} /></div>
                  <span className="card-title">WhatsApp message</span>
                </div>
                {generated && (
                  <button className={`btn-copy ${copied ? 'copied' : ''}`} onClick={handleCopy}>
                    {copied ? <><Check size={13} /> Copied!</> : <><Copy size={13} /> Copy</>}
                  </button>
                )}
              </div>
              {generated ? (
                <div className="message-box">
                  <pre className="message-text">{message}</pre>
                </div>
              ) : (
                <div className="output-empty">
                  <Mail size={30} />
                  <p>WhatsApp message will appear here</p>
                  <span>Fill details and click generate</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
