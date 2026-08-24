# SurakshaAI

**AI-Powered Regional-Language Phishing Detection & Awareness Platform**

## Project Status — Phase 1: Project Foundation Complete

SurakshaAI is designed to safeguard users against digital scams and phishing attacks targeting Indic regional languages and English communication channels.

---

## 🛠️ Technology Stack (Phase 1 Baseline)

### Frontend
- **Framework:** React 18 + Vite (JavaScript)
- **Styling:** Tailwind CSS (Dark Cyber Aesthetics: `#05080e` dark background, `#00ff66` neon green accent)
- **Routing:** React Router DOM v6
- **Icons:** Lucide React

### Backend
- **Runtime:** Node.js + Express
- **Database:** MongoDB Atlas / Mongoose ORM
- **Utilities:** CORS, dotenv, Nodemon (Dev)

---

## 📁 Repository Architecture

```text
SurakshaAI/
├── frontend/             # React + Vite Client Application
│   ├── src/
│   │   ├── assets/       # Media & static assets
│   │   ├── components/   # UI Layout components (Header, Sidebar, Navigation)
│   │   ├── layouts/      # Main application shell layout
│   │   ├── pages/        # Route placeholder views
│   │   ├── services/     # API service layer (http://localhost:5000/api)
│   │   ├── hooks/        # Custom React hooks
│   │   └── utils/        # Constants and design helpers
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── backend/              # Node.js + Express Server API
│   ├── config/           # Database connection logic
│   ├── controllers/      # Route logic handlers (Health API)
│   ├── middleware/       # Express middlewares
│   ├── models/           # Mongoose schemas
│   ├── routes/           # API router declarations (/api/health)
│   ├── services/         # Business logic layer
│   ├── utils/            # Helper utilities
│   ├── server.js         # Express server entry point
│   ├── .env.example      # Safe environment variable template
│   └── package.json
│
├── .gitignore            # Git exclusion rules
└── README.md             # Project documentation
```

---

## ⚡ Getting Started Locally

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### 1. Backend Setup
```bash
cd backend
npm install
npm run dev
# Backend server runs on http://localhost:5000
# Health check endpoint: GET http://localhost:5000/api/health
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
# Frontend app runs on http://localhost:3000
```

---

## 👥 Team
- Naganath S Dharwadkar
- Nagashree S Dharwadkar
