import React, { useState, useEffect } from 'react';
import {
  ClipboardList, User, Building2, Landmark, BarChart3, Zap, Mail,
  Moon, Sun, Copy, Check, ChevronDown, Plus, X, FileText, Send
} from 'lucide-react';
import { PROGRAMS, CONSTITUTIONS, INDIAN_STATES, getDocSchema, generateMessage } from './data';
import './App.css';

const ICONS = { building: Building2, user: User, bank: Landmark, chart: BarChart3, zap: Zap, mail: Mail };

function useTheme() {
  const [dark, setDark] = useState(() => window.matchMedia('(prefers-color-scheme: dark)').matches);
  useEffect(() => { document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light'); }, [dark]);
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
        <ChevronDown size={14} className="select-icon" />
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
    if (selected && !gstStates.includes(selected)) { setGstStates(p => [...p, selected]); setSelected(''); }
  };
  return (
    <div className="gst-picker">
      <div className="gst-picker-label">GST state(s) required</div>
      {gstStates.length > 0 && (
        <div className="gst-tags">
          {gstStates.map(s => (
            <span key={s} className="gst-tag">
              {s}
              <button className="gst-tag-x" onClick={() => setGstStates(p => p.filter(x => x !== s))}><X size={9} /></button>
            </span>
          ))}
        </div>
      )}
      <div className="gst-add">
        <div className="select-wrap sm">
          <select value={selected} onChange={e => setSelected(e.target.value)}>
            <option value="">Select state…</option>
            {available.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <ChevronDown size={13} className="select-icon" />
        </div>
        <button className="gst-add-btn" onClick={add} disabled={!selected}><Plus size={13} /> Add</button>
      </div>
    </div>
  );
}

function DocRow({ item, checked, onToggle, gstStates, setGstStates }) {
  return (
    <>
      <div className={`doc-row ${checked ? 'on' : ''}`} onClick={() => onToggle(item.id)}>
        <div className="doc-cb">{checked && <Check size={11} strokeWidth={3} />}</div>
        <div className="doc-meta">
          <span className="doc-name">{item.label}</span>
          {item.sublabel && <span className="doc-sub">{item.sublabel}</span>}
        </div>
      </div>
      {item.type === 'gst' && checked && <GstPicker gstStates={gstStates} setGstStates={setGstStates} />}
    </>
  );
}

function Group({ group, checkedIds, onToggle, gstStates, setGstStates }) {
  const [open, setOpen] = useState(true);
  const cnt = group.items.filter(i => checkedIds.includes(i.id)).length;
  const total = group.items.length;
  const Icon = ICONS[group.icon] || FileText;
  return (
    <div className="group">
      <div className="group-head" onClick={() => setOpen(o => !o)}>
        <div className={`group-icon ${group.tone}`}><Icon size={14} /></div>
        <div className="group-titles">
          <span className="group-title">{group.label}</span>
          {group.sublabel && <span className="group-subtitle">{group.sublabel}</span>}
        </div>
        <span className={`group-count ${cnt === total ? 'full' : ''}`}>{cnt}/{total}</span>
        <ChevronDown size={15} className={`group-chev ${open ? 'open' : ''}`} />
      </div>
      {open && (
        <div className="group-body">
          {group.items.map(item => (
            <DocRow key={item.id} item={item} checked={checkedIds.includes(item.id)} onToggle={onToggle} gstStates={gstStates} setGstStates={setGstStates} />
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
  const [groups, setGroups] = useState([]);
  const [checkedIds, setCheckedIds] = useState([]);
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const [generated, setGenerated] = useState(false);

  useEffect(() => {
    if (!program || !constitution) { setGroups([]); setCheckedIds([]); return; }
    const g = getDocSchema(program, constitution);
    setGroups(g);
    setCheckedIds(g.flatMap(gr => gr.items.map(i => i.id)));
    setGenerated(false); setMessage('');
  }, [program, constitution]);

  const handleToggle = id => {
    setCheckedIds(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
    setGenerated(false);
  };

  const handleGenerate = () => {
    setMessage(generateMessage({ customerName, groups, checkedIds, gstStates, collateral, coapplicant, coapplicantItr, above5cr }));
    setGenerated(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(message).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2200); });
  };

  const ready = program && constitution;

  return (
    <div className="app">
      <div className="bg-gradient" />
      <header className="header">
        <div className="header-inner">
          <div className="logo">
            <div className="logo-icon"><ClipboardList size={17} /></div>
            <div>
              <div className="logo-title">Loan Checklist Generator</div>
              <div className="logo-sub">Business Banking · SME Loans</div>
            </div>
          </div>
          <button className="theme-btn" onClick={() => setDark(d => !d)} aria-label="Toggle theme">
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </header>

      <main className="main">
        <div className="layout">
          <div className="left">
            <div className="card">
              <div className="card-head">
                <div className="card-icon"><User size={15} /></div>
                <span className="card-title">Customer details</span>
              </div>
              <div className="field">
                <label className="field-label">Customer name</label>
                <input className="text-input" placeholder="e.g. Ramesh Gupta" value={customerName} onChange={e => setCustomerName(e.target.value)} />
              </div>
              <div className="two-col">
                <SelectField label="Program" value={program} onChange={setProgram} options={PROGRAMS} />
                <SelectField label="Constitution" value={constitution} onChange={setConstitution} options={CONSTITUTIONS} />
              </div>
            </div>

            <div className="card">
              <div className="card-head">
                <div className="card-icon"><Zap size={15} /></div>
                <span className="card-title">Case options</span>
              </div>
              <Toggle label="Property as collateral?" value={collateral} onChange={setCollateral} />
              <Toggle label="Co-applicant involved?" value={coapplicant} onChange={setCoapplicant} />
              {coapplicant && <Toggle label="Co-applicant ITR required?" sub="Include 2-year ITR of co-applicant" value={coapplicantItr} onChange={setCoapplicantItr} />}
              <Toggle label="Loan amount ₹5 Crore or above?" value={above5cr} onChange={setAbove5cr} />
            </div>

            {ready && groups.length > 0 && (
              <div className="card">
                <div className="card-head">
                  <div className="card-icon"><ClipboardList size={15} /></div>
                  <span className="card-title">Documents & steps</span>
                </div>
                <p className="card-hint">Uncheck whatever the customer has already provided</p>
                {groups.map(g => (
                  <Group key={g.id} group={g} checkedIds={checkedIds} onToggle={handleToggle} gstStates={gstStates} setGstStates={setGstStates} />
                ))}
                <button className="btn-generate" onClick={handleGenerate}><Send size={15} /> Generate WhatsApp message</button>
              </div>
            )}

            {!ready && (
              <div className="empty-state">
                <ClipboardList size={28} />
                <p>Select a program and constitution to begin</p>
              </div>
            )}
          </div>

          <div className="right">
            <div className="card output-card">
              <div className="output-head">
                <div className="card-head" style={{ marginBottom: 0 }}>
                  <div className="card-icon"><Mail size={15} /></div>
                  <span className="card-title">WhatsApp message</span>
                </div>
                {generated && (
                  <button className={`btn-copy ${copied ? 'copied' : ''}`} onClick={handleCopy}>
                    {copied ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy</>}
                  </button>
                )}
              </div>
              {generated ? (
                <div className="msg-box"><pre className="msg-text">{message}</pre></div>
              ) : (
                <div className="output-empty">
                  <div className="output-empty-icon"><Mail size={26} /></div>
                  <p>Your message will appear here</p>
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
