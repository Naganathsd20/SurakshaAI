# SurakshaAI Implementation Plan — Phase 10: Security & Production Configuration

## 1. Goal Description & Background (Phase 1–9 Baseline)

SurakshaAI has completed **Phases 1 through 9**:
- **Phases 1–7:** Core detection engine, regional NLP, risk scoring, and MongoDB persistence baseline.
- **Phase 8:** Complete system integration and genuine persisted document `scanId` propagation.
- **Phase 9:** Responsive UI and UX polish committed and pushed to `main`.

**Phase 10 Objective:**
Harden the Node Express backend and React frontend for production readiness by implementing HTTP security headers (`helmet`), rate limiting (`express-rate-limit`), body size limits, production CORS controls, secure error handling without stack trace/credential leaks, and dynamic production environment variable support.

---

## 2. Security Areas to Inspect

| Area | Component | Inspection Objective |
| :--- | :--- | :--- |
| **HTTP Security Headers** | Express App (`server.js`) | Protect against XSS, clickjacking, MIME-sniffing via `helmet`. |
| **Rate Limiting** | Express Router (`server.js`) | Protect against DDoS and brute-force flooding via `express-rate-limit`. |
| **Body Size Limits** | Express Body Parser (`server.js`) | Enforce `1mb` maximum JSON payload size to prevent memory exhaustion attacks. |
| **CORS Policy** | Express App (`server.js`) | Restrict origin access dynamically using `process.env.ALLOWED_ORIGINS`. |
| **Error Sanitization** | `middleware/errorHandler.js` | Ensure stack traces, file paths, and database URI strings are never returned to client responses. |
| **Database Security** | `config/db.js` | Manage connection strings strictly via `process.env.MONGODB_URI` and sanitize log outputs. |
| **Frontend Production URL**| `utils/constants.js` | Support dynamic `VITE_API_BASE_URL` for production deployment without client secret leakage. |

---

## 3. Backend Security Changes (Phase 10 Scope)

### Dependency Installations (`backend/package.json`)
Install production security packages:
- `helmet`: Express security HTTP headers middleware.
- `express-rate-limit`: API rate limiting middleware.
- `compression`: Gzip body compression middleware.

### Express Application Hardening (`backend/server.js`)
- Mount `helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } })`.
- Mount `compression()`.
- Define and mount `apiLimiter`: 100 requests per 15-minute window per IP for `/api/` endpoints.
- Configure `cors()` to read `process.env.ALLOWED_ORIGINS` dynamically, defaulting to dev origins (`http://localhost:3000`, `http://127.0.0.1:3000`, `http://localhost:5173`).
- Set `express.json({ limit: '1mb' })` and `express.urlencoded({ extended: true, limit: '1mb' })`.
- Add graceful process termination handlers (`SIGINT`, `SIGTERM`) to close Express HTTP server and MongoDB pool cleanly.

### Secure Error Handler (`backend/middleware/errorHandler.js`)
- Update `errorHandler` to inspect `NODE_ENV`.
- Never include raw `err.stack` or raw DB error messages in client JSON responses when in production mode.
- Ensure error messages do not leak internal file paths or `mongodb://` connection strings.

---

## 4. Production & Environment Configuration Strategy

### Environment Variables Template (`backend/.env.example`)
Update `.env.example` to document all production variables:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/suraksha_ai
NODE_ENV=production
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
NLP_PROVIDER=local-nlp-engine
```

### Database Connection Hardening (`backend/config/db.js`)
- Ensure connection options include `serverSelectionTimeoutMS: 5000`.
- Verify console output never logs raw URI containing password credentials.

---

## 5. Frontend Production Safety (`frontend/src/utils/constants.js`)

- Update `API_BASE_URL` to dynamically inspect `import.meta.env.VITE_API_BASE_URL`:
  ```javascript
  export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
  ```
- Audit frontend code to guarantee zero secrets, private keys, or DB credentials exist in client bundles.

---

## 6. Security Verification Strategy

After applying Phase 10 security hardening, perform manual and automated API checks:

1. **Oversized Input Verification:** Send >1MB request payload to `POST /api/analyze/message` to verify 413 Payload Too Large protection.
2. **Rate Limit Verification:** Send repeated requests to verify rate limiter headers (`RateLimit-Limit`, `RateLimit-Remaining`).
3. **Security Headers Verification:** Verify response headers include `X-Content-Type-Options`, `X-Frame-Options`, `X-DNS-Prefetch-Control`.
4. **Invalid ObjectId & Error Leak Check:** Request `GET /api/history/invalid-id-123` and verify error response does not leak stack trace or connection URI.
5. **CORS Verification:** Verify allowed origin response header behavior.

---

## 7. Files Likely to be Modified

- `backend/package.json` *(Add helmet, express-rate-limit, compression)*
- `backend/package-lock.json` *(Lockfile update)*
- `backend/server.js` *(Mount helmet, rate-limiter, compression, CORS config, graceful shutdown)*
- `backend/middleware/errorHandler.js` *(Sanitize stack trace and connection leakage)*
- `backend/config/db.js` *(Sanitize database connection logging)*
- `backend/.env.example` *(Document production environment variables)*
- `frontend/src/utils/constants.js` *(Dynamic VITE_API_BASE_URL resolution)*

---

## 8. Phase 10 Acceptance Criteria

1. **HTTP Security Headers:** Express server returns Helmet security headers on all responses.
2. **Rate Limiting Active:** `/api/` endpoints enforce 100 requests / 15-minute rate limit.
3. **Payload Protection:** Body parser enforces 1MB max payload limit.
4. **Zero Secret Leakage:** Error responses never expose stack traces or MongoDB connection URIs.
5. **Dynamic CORS & Frontend URL:** Production CORS origin list and frontend `VITE_API_BASE_URL` are dynamically configurable via environment variables.
6. **Functional Baseline Intact:** Phase 4–8 logic, Phase 6 risk scoring, Phase 7 MongoDB persistence, and Phase 9 responsive UI remain 100% functional.

---

## 9. Phase 10 Completion Criteria

- [ ] Security dependencies installed in `backend/package.json`.
- [ ] Security middleware mounted and verified in `backend/server.js`.
- [ ] Error handler and database connection loggers sanitized.
- [ ] Frontend `VITE_API_BASE_URL` configuration updated.
- [ ] Frontend build (`npm run build`) and backend tests (`phase6TestRunner.js`, `phase7TestRunner.js`) pass 100%.
- [ ] No Phase 11 testing framework creation or Phase 12 deployment executed.

---

*End of Phase 10 Implementation Plan — Awaiting User Approval.*
