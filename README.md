# Smart Fridge Manager

<div align="center">

### Track stored food and keep expiry information organized

[![React](https://img.shields.io/badge/Frontend-React-111827?style=flat-square&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Build-Vite-111827?style=flat-square&logo=vite)](https://vite.dev/)
[![Firebase](https://img.shields.io/badge/Integration-Firebase-111827?style=flat-square&logo=firebase)](https://firebase.google.com/)

**[Open the deployed application](https://smart-fridge-manager-six.vercel.app/)**

</div>

Smart Fridge Manager is a web application for recording fridge items, their expiry dates and quantities. It includes an overview dashboard, item search and data export / sync utilities intended to support a connected-fridge workflow.

## Features present in the current application

- Add a food item with an expiry date and quantity.
- Display a dashboard summary of stored items.
- Count items approaching expiry within the next three days.
- Search and view stored products through the application interface.
- Export the current fridge data as JSON.
- Sync a JSON payload to a configured Firebase Realtime Database URL.
- Load and save item data through the configured Supabase service.
- Switch between dashboard, notifications, settings and profile views.
- Dark-mode state and fridge-name settings in the interface.

Some notification content is currently example/demo content in the frontend. It should not be treated as a live alert service.

## Technology

| Layer | Technology |
|---|---|
| Frontend | React |
| Development / build | Vite |
| Icons | React Icons |
| Data service | Supabase client integration |
| Export / integration | JSON and Firebase Realtime Database REST endpoint |
| Optional local API | Express and CORS |

The repository also contains an Express JSON-file API. The frontend's current data-loading path uses the Supabase service, so the local API should be considered a separate development utility unless explicitly wired into the app.

## Run locally

### 1. Clone the repository

```bash
git clone https://github.com/Edwinshajan2006/SMART-FRIDGE-MANAGER.git
cd SMART-FRIDGE-MANAGER/fridge-reminder
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the frontend

```bash
npm run dev
```

Vite prints the local development URL in the terminal.

### 4. Production build

```bash
npm run build
npm run preview
```

## Architecture

```text
Browser
  │
  ▼
React application
  ├── Dashboard and item views
  ├── Search / product table
  ├── Notifications, settings and profile
  │
  ├── Supabase service
  │     └── Fetch and save fridge items
  │
  └── Fridge data utilities
        ├── Build JSON payload
        ├── Download JSON export
        └── Upload payload to Firebase

Optional Express API
  └── GET /api/health
      GET /api/items
      POST /api/items
      DELETE /api/items
      └── Local JSON file storage
```

## Repository structure

```text
SMART-FRIDGE-MANAGER/
├── fridge-reminder/
│   ├── src/
│   │   ├── components/   # Dashboard and interface components
│   │   ├── services/     # Supabase, Firebase and data helpers
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── backend-server.js # Optional local JSON API
│   ├── server.js
│   └── package.json
└── project/
```

## Configuration notes

The app's data services depend on their configured backend credentials and endpoints. Keep private keys and service-role credentials out of source control. Use environment variables for deployment configuration and provide a safe example environment file when documenting required settings.

## Roadmap

- [ ] Add genuine screenshots of the dashboard and item workflow
- [ ] Replace demo notification entries with expiry-driven notifications
- [ ] Document required Supabase tables and environment variables
- [ ] Add input validation and clearer backend error states
- [ ] Add tests for expiry calculations and data synchronization
- [ ] Document the ESP8266 / connected-device data contract

---

<div align="center">

**Smart Fridge Manager · Web application / IoT project**

</div>
