# ICICI Bank — Loan Checklist Generator

A clean, deployable web tool for generating customised WhatsApp document checklists for Business Banking loan applications.

## Features
- 4 programs: GST OD, Banking Variant, Super Biz, PD/Financial Based
- 4 constitutions: Proprietorship, Partnership, Pvt Ltd, LLP
- Auto-populates documents, Karza/Finfort steps, and annexures based on selection
- Toggles for co-applicant, collateral, and ₹5Cr+ cases
- One-click copy of formatted WhatsApp message

## Local setup

```bash
npm install
npm start
```

## Deploy to GitHub Pages

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add this to `package.json` (replace with your GitHub username and repo name):
```json
"homepage": "https://YOUR_USERNAME.github.io/YOUR_REPO_NAME"
```

3. Push to GitHub, then run:
```bash
npm run deploy
```

That's it — your app will be live at the homepage URL.

## Deploy to Vercel (easiest)

1. Push this folder to a GitHub repo
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
3. Vercel auto-detects React. Click Deploy.
4. Done — you get a live URL instantly.

## Tech stack
- React 18
- Lucide React (icons)
- Pure CSS (no UI library dependency)
