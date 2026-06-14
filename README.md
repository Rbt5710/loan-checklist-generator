# SME Loan — WhatsApp Checklist Generator

A clean, deployable web tool for generating customised WhatsApp document checklists for Business Banking loan applications.

## Problem
Relationship Managers manually type document checklists over WhatsApp for every loan application — wrong documents, missing items, longer TAT, frustrated customers.

## Solution
Select the loan program + business constitution → get a perfectly formatted, copy-paste-ready WhatsApp message with the right documents, customer action steps, and annexure instructions — every time.

Built from firsthand experience managing an SME lending portfolio at a large private sector bank.

## Features
- 4 loan programs: GST OD, Banking Variant, Super Biz, PD / Financial Based
- 4 constitutions: Proprietorship, Partnership, Pvt Ltd, LLP
- Auto-populates documents, action steps, and annexures based on selection
- Toggles for co-applicant, property collateral, and high-value cases
- One-click copy of formatted WhatsApp message

## Local setup

```bash
npm install
npm start
```

## Deploy to Vercel (recommended — 2 minutes)

1. Push this folder to a GitHub repo
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
3. Click Deploy — live URL ready instantly, free

## Deploy to GitHub Pages

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to `package.json`:
```json
"homepage": "https://YOUR_USERNAME.github.io/YOUR_REPO_NAME"
```

3. Run:
```bash
npm run deploy
```

## Tech stack
- React 18
- Lucide React (icons)
- Pure CSS — no UI library dependency
