# SurakshaAI Implementation Plan — Phase 11: Complete Testing & QA

## 1. Goal Description & Background (Phase 1–10 Baseline)

SurakshaAI has completed **Phases 1 through 10**:
- **Phases 1–7:** Detection engine, regional NLP, risk scoring, and MongoDB persistence baseline.
- **Phase 8:** System integration & real document `scanId` propagation.
- **Phase 9:** Responsive UI & final UX polish across 320px–1440px viewports (committed & pushed).
- **Phase 10:** Security hardening, Helmet headers, IP rate-limiting, 1MB body limits, and dynamic CORS configuration (committed & pushed).

**Phase 11 Objective:**
Execute end-to-end quality assurance, regression testing, detection accuracy verification, frontend UX validation, security boundary verification, and responsive viewport checks. Fix any genuine defects uncovered during QA without altering core detection strategies or introducing Phase 12 deployment actions.

---

## 2. Testing Scope & Categories

### Category 1: Backend API Endpoints & Contracts
- `GET /api/health` — Returns status 200 OK with operational payload.
- `POST /api/analyze/message` — Accepts `{ text, language }`, returns Phase 6 risk score, language metadata, intent signals, explainability, recommendations, and optional `scanId`.
- `POST /api/analyze/url` — Accepts `{ url }`, returns URL heuristic breakdown, risk score, and recommendations.
- `POST /api/analyze/risk` — Accepts `{ type, payload }`, returns standardized Phase 6 risk assessment contract.
- `GET /api/history` — Returns paginated scan records or safe offline response if MongoDB is disconnected.
- `GET /api/history/:id` — Returns single scan record or 400 Bad Request for invalid ObjectId format.

### Category 2: Regional Language Detection & Intent Signals
- **English Phishing:** Urgent banking block SMS ("Your HDFC account will be blocked. Verify OTP.").
- **Hindi (Devanagari):** Regional banking scam ("आपका खाता निष्क्रय कर दिया जाएगा। केवाईसी अपडेट करें।").
- **Kannada (Kannada script):** Regional block threat ("ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಖಾತೆ ಬ್ಲಾಕ್ ಆಗುತ್ತದೆ. OTP ಹಂಚಿಕೊಳ್ಳಿ.").
- **Code-Mixed / Transliterated (Hinglish):** Latin script regional message ("Aapka account block ho jayega, share OTP.").
- **Other Supported Indic Scripts:** Tamil, Telugu, Marathi, Bengali sample payloads.
- **Safe Messages:** Non-phishing benign messages (e.g. meeting reminders, greeting messages) yielding score < 30 and `SAFE` level.

### Category 3: URL Heuristics & Domain Spoofing
- **IP Address URLs:** `http://192.168.1.1/login` yielding `HIGH` risk (score >= 80).
- **Unencrypted HTTP Protocol:** `http://` links flagged for lack of SSL/TLS.
- **Suspicious Hyphenated Brands:** Spoofed hostnames (e.g., `sbi-kyc-verify.com`).
- **Phishing Keywords:** Target keywords (`verify`, `login`, `kyc`, `otp`, `account`).
- **Safe Legitimate URLs:** `https://cybercrime.gov.in` yielding `SAFE` level (score < 30).

### Category 4: Frontend Component & Route QA
- **Navigation:** Header logo, phase badge, backend status pill, sidebar links, mobile drawer nav.
- **Dashboard Page (`/dashboard`):** 4 metric summary cards, quick scan trigger cards, recent activity preview table, scan detail modal preview.
- **Message Analysis Page (`/analyze-message`):** Preset message selector buttons, language script dropdown, text area character counter, clear button, scanning spinner, risk report cards.
- **URL Analysis Page (`/analyze-url`):** Preset URL buttons, link input box, clear button, scanning spinner, URL report cards.
- **History Page (`/history`):** Search bar, risk filter dropdown, type filter dropdown, log history table, MongoDB status warning banner, record details modal.
- **Safety Tips Page (`/safety-tips`):** 7 protective awareness cards, 1930 helpline banner.
- **About & Settings Pages (`/about`, `/settings`):** Vision banner, tech stack grid, team members, default language setting, notification toggle switches, locked dark theme pill.

### Category 5: Regression Testing Suite
- Execute `node backend/tests/phase6TestRunner.js` (Assert 21/21 tests pass).
- Execute `node backend/tests/phase7TestRunner.js` (Assert 12/12 tests pass).

### Category 6: Security & Input Hardening QA
- **Payload Protection:** Verify 1MB request body limit rejects oversized payloads.
- **Rate Limiting:** Verify `/api/` endpoints return `RateLimit-Limit: 100` response headers.
- **Security Headers:** Verify Helmet sets `X-Content-Type-Options`, `X-Frame-Options`, `X-DNS-Prefetch-Control`.
- **Error Leakage Check:** Verify 400 and 404 error responses omit stack traces and `mongodb://` URIs.
- **Secrets Isolation:** Verify frontend static build contains zero API keys or DB credentials.

### Category 7: Responsive Viewport QA
Verify layout aesthetics and touch targets across 5 standard viewport widths:
- **320px** (Mobile Small - iPhone SE)
- **375px** (Mobile Standard - iPhone 13/14)
- **768px** (Tablet - iPad Portrait)
- **1024px** (Tablet Landscape / Laptop)
- **1440px** (Desktop Monitor)

### Category 8: Build & Runtime Compilation QA
- Run `npm run build` in `frontend/` to verify zero production compilation warnings/errors.
- Verify Express backend boots cleanly on `PORT 5000`.

---

## 3. Regression & Bug-Fixing Strategy

1. **Regression Guard:** All Phase 6 (21 tests) and Phase 7 (12 tests) assertions must remain 100% green.
2. **Defect Remediation:** If Phase 11 QA identifies an integration bug or edge-case defect:
   - Apply a minimal, targeted fix directly to the affected module.
   - Do NOT alter detection algorithms or risk scoring weights unnecessarily.
   - Do NOT weaken existing test assertions.

---

## 4. Files Likely to be Inspected / Modified

- `backend/tests/phase6TestRunner.js` *(Regression verification)*
- `backend/tests/phase7TestRunner.js` *(Regression verification)*
- `frontend/src/*` *(Only if Phase 11 QA uncovers a genuine UI bug)*
- `backend/services/*` *(Only if Phase 11 QA uncovers a genuine backend bug)*

---

## 5. Phase 11 Acceptance Criteria

1. **Backend API Contract Passed:** All 5 backend API routes return expected JSON schemas.
2. **Detection Engine Passed:** Safe, medium, and high-risk regional messages & URLs correctly classified.
3. **Regression Passed:** Phase 6 (21/21) and Phase 7 (12/12) test suites pass 100%.
4. **Security Hardening Passed:** Helmet headers active, Rate limiting active, 1MB limit active, zero secret/stack trace leakage.
5. **Responsive QA Passed:** Zero horizontal body overflow at 320px, 375px, 768px, 1024px, 1440px.
6. **Production Build Passed:** `npm run build` compiles cleanly with zero errors.

---

## 6. Phase 11 Completion Criteria & Clear Separation from Phase 12

- [ ] All 8 QA test categories executed and verified.
- [ ] Any uncovered defects resolved cleanly.
- [ ] No cloud deployment, Docker containerization, or Phase 12 release triggers executed.

---

*End of Phase 11 Implementation Plan — Awaiting User Approval.*
