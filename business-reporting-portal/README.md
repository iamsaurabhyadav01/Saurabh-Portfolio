# Nexora MIS — Business Reporting Portal (Dummy Prototype)

A fully client-side prototype of an internal business reporting / MIS data-download
portal. It simulates the experience of an employee logging into an ERP-style
system and downloading real, generated `.xlsx` reports for **Sales**, **Orders**
and **Inventory**.

There is no backend or database — authentication and all data are handled
entirely in the browser (frontend logic + `localStorage`/`sessionStorage`), and
Excel files are generated on the fly using [SheetJS (`xlsx`)](https://github.com/SheetJS/sheetjs).

## User journey

```
Login → Dashboard → Sales / Orders / Inventory → Select Report → View Report → Download Excel
```

## Tech stack

- React 18 + TypeScript
- Vite
- React Router
- Tailwind CSS
- SheetJS (`xlsx`) for real `.xlsx` generation
- lucide-react for icons

## Getting started

```bash
cd business-reporting-portal
npm install
npm run dev
```

Then open the URL Vite prints (typically `http://localhost:5173`).

Other scripts:

```bash
npm run build     # type-check + production build to dist/
npm run preview   # preview the production build locally
npm run lint      # lint the project
```

## Demo login credentials

| Field    | Value       |
|----------|-------------|
| Username | `admin`     |
| Password | `Admin@123` |

These are shown directly on the login screen for convenience since this is a
prototype, not a production system.

### Changing the dummy username/password

Edit `src/utils/auth.tsx` and update the two constants near the top of the file:

```ts
export const DUMMY_USERNAME = 'admin';
export const DUMMY_PASSWORD = 'Admin@123';
```

Save the file and restart the dev server — the login form and the "Demo
credentials" hint on the login page will continue to work against whatever
values you set here.

## Features

- **Login page** — branded split-panel login, client-side validation for empty
  fields, invalid-credential error message, "Remember me" (persists the
  session in `localStorage` instead of `sessionStorage`), and a dummy
  "Forgot Password?" flow (shows a confirmation, does not actually send email).
- **Dashboard** — sidebar navigation (collapses to a top menu on mobile/tablet),
  user profile section, logout, and an overview page summarizing all three
  modules.
- **Sales / Orders / Inventory modules** — each lists report cards (name, type,
  reporting period, last-updated timestamp, file size) with **View** and
  **Download Excel** actions. Low-stock and out-of-stock inventory rows and
  order/delivery statuses are highlighted with colored status pills.
- **Report preview modal** — KPI cards, a searchable/sortable/paginated data
  table, and a Download Excel button, all fed by the same dummy data used for
  the actual export so the preview and the download always match.
- **Real Excel export** — clicking "Download Excel" (from a report card or the
  preview modal) generates an actual `.xlsx` workbook client-side via SheetJS
  and downloads it with a meaningful filename, e.g. `Sales_Report_2026-08-20.xlsx`,
  `Order_Report_2026-08-20.xlsx`, `Inventory_Report_2026-08-20.xlsx`.
- **Toast notifications** for successful/failed downloads and login.
- Responsive, enterprise-style UI (light theme, indigo/blue accents, rounded
  cards, subtle shadows) that works on both desktop and tablet.

## Project structure

```text
business-reporting-portal/
│
├── index.html
├── package.json
├── src/
│   ├── components/        # Sidebar, Topbar, ReportCard, ReportViewModal, KpiCard, Toast, ...
│   ├── pages/
│   │   ├── Login/
│   │   ├── Dashboard/
│   │   ├── Sales/
│   │   ├── Orders/
│   │   └── Inventory/
│   ├── data/               # dummy data generators + report catalog
│   ├── utils/
│   │   ├── auth.tsx
│   │   └── excelExport/    # SheetJS-based .xlsx generation
│   └── styles/
│
└── README.md
```

## Notes

- All business data (sales, orders, inventory) is synthetically generated in
  the browser using a seeded random generator, so each report shows
  consistent, realistic-looking numbers every time you open it in the same
  browser session.
- This project is a standalone Vite app and does not affect the rest of the
  parent repository. Run all commands from inside `business-reporting-portal/`.
