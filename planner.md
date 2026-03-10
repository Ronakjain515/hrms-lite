# 🎯 HRMS Lite – Winning Strategy & Execution Plan

## ⚡ Recommended Tech Stack

| Layer | Choice | Why |
|---|---|---|
| **Frontend** | React + Vite + TailwindCSS | Fast setup, clean code, great UI |
| **Backend** | FastAPI (Python) | Auto-docs, fast, clean REST APIs |
| **Database** | PostgreSQL (via Supabase) | Free hosted DB, no setup hassle |
| **Frontend Deploy** | Vercel | 1-click, free, instant |
| **Backend Deploy** | Render | Free tier, supports FastAPI |

---

## 🗓️ Time-Boxed Execution Plan (6–7 Hours)

### Hour 1 – Project Scaffold & Setup (60 min)

```
✅ Create GitHub repo with /frontend and /backend folders
✅ Init React app: npm create vite@latest hrms-frontend -- --template react
✅ Install: tailwindcss, react-router-dom, axios, react-hot-toast, lucide-react
✅ Init FastAPI backend: main.py, models.py, schemas.py, database.py, routers/
✅ Set up Supabase PostgreSQL (free) — get connection string
✅ Install: fastapi, uvicorn, sqlalchemy, psycopg2-binary, pydantic[email]
```

### Hour 2 – Backend: Database Models + Employee APIs (60 min)

```
✅ SQLAlchemy models: Employee, Attendance
✅ Pydantic schemas for validation (email, required fields, duplicate check)
✅ Routes: POST /employees, GET /employees, DELETE /employees/{id}
✅ Error handling: 422 validation, 409 duplicate, 404 not found
✅ CORS enabled for frontend
✅ Test with Swagger UI (/docs) — FastAPI gives this FREE
```

### Hour 3 – Backend: Attendance APIs + Validation (45 min)

```
✅ Routes: POST /attendance, GET /attendance/{employee_id}
✅ Validation: valid employee_id, valid status (Present/Absent)
✅ Bonus: GET /attendance?date=YYYY-MM-DD filter
✅ GET /dashboard — counts for summary
✅ Proper HTTP status codes throughout
```

### Hour 4 – Frontend: Layout + Employee Module (75 min)

```
✅ App shell: sidebar nav, header, main content area
✅ Employee List page: table with ID, name, email, dept + delete button
✅ Add Employee form: validation, loading state, success/error toast
✅ Empty state component, loading spinner, error boundary
✅ Axios service layer (api.js) — all API calls centralized
```

### Hour 5 – Frontend: Attendance + Dashboard (60 min)

```
✅ Attendance page: mark attendance form + records table per employee
✅ Dashboard: summary cards (total employees, present today, absent today)
✅ Date filter for attendance records (bonus ✅)
✅ Total present days per employee badge (bonus ✅)
✅ Polish: consistent spacing, typography, responsive layout
```

### Hour 6 – Deployment + README (45 min)

```
✅ Push to GitHub (public repo)
✅ Deploy backend to Render (connect GitHub, set env vars)
✅ Update frontend .env: VITE_API_URL=https://your-app.onrender.com
✅ Deploy frontend to Vercel (connect GitHub, set env var)
✅ Test live URLs end-to-end
✅ Write README.md
```

---

## 📁 Recommended Project Structure

```
hrms-lite/
├── frontend/
│   ├── src/
│   │   ├── components/       # Reusable: Table, Modal, Badge, Spinner
│   │   ├── pages/            # Dashboard, Employees, Attendance
│   │   ├── services/         # api.js (axios instance + all calls)
│   │   └── App.jsx
│   └── package.json
│
├── backend/
│   ├── routers/
│   │   ├── employees.py
│   │   └── attendance.py
│   ├── models.py             # SQLAlchemy ORM models
│   ├── schemas.py            # Pydantic validation schemas
│   ├── database.py           # DB connection
│   └── main.py               # FastAPI app entry
│
└── README.md
```

---

## 🏆 Differentiators That Will Get You Selected

1. **FastAPI auto-generates Swagger docs** at `/docs` — include this URL in your README. It shows professionalism instantly.
2. **Meaningful HTTP status codes** — 201 for creation, 409 for duplicates, 422 for validation. Reviewers check this.
3. **Loading + empty + error states** in UI — most candidates skip these; they're explicitly in the requirements.
4. **Complete README** with local setup steps, live URL, and assumptions.
5. **All 3 bonus features** — they're easy with the proposed structure, and they signal thoroughness.
6. **Clean commit history** — commit per feature (`feat: add employee API`, `feat: attendance UI`) — shows professionalism.

---

## 🚀 Deployment Quick Reference

### Supabase (Database)
- Go to [supabase.com](https://supabase.com) → New project
- Copy the **PostgreSQL connection string**

### Render (Backend)
- New Web Service → Connect GitHub → Root directory: `backend/`
- **Build command:** `pip install -r requirements.txt`
- **Start command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`
- Add environment variable: `DATABASE_URL=postgresql://...`

### Vercel (Frontend)
- Import GitHub repo → Root directory: `frontend/`
- Add environment variable: `VITE_API_URL=https://your-render-app.onrender.com`

---

## 📋 API Endpoints Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/employees` | List all employees |
| `POST` | `/employees` | Add a new employee |
| `DELETE` | `/employees/{id}` | Delete an employee |
| `GET` | `/attendance/{employee_id}` | Get attendance for employee |
| `POST` | `/attendance` | Mark attendance |
| `GET` | `/attendance?date=YYYY-MM-DD` | Filter by date *(bonus)* |
| `GET` | `/dashboard` | Summary counts *(bonus)* |

---

## ✅ README Template Checklist

```markdown
# HRMS Lite

## Live URLs
- Frontend: https://your-app.vercel.app
- Backend API Docs: https://your-app.onrender.com/docs

## Tech Stack
- Frontend: React + Vite + TailwindCSS
- Backend: FastAPI (Python)
- Database: PostgreSQL (Supabase)
- Deployment: Vercel (frontend) + Render (backend)

## Local Setup

### Backend
cd backend
pip install -r requirements.txt
# Create .env with DATABASE_URL=...
uvicorn main:app --reload

### Frontend
cd frontend
npm install
# Create .env with VITE_API_URL=http://localhost:8000
npm run dev

## API Endpoints
(see table above)

## Assumptions & Limitations
- Single admin user, no authentication required
- Leave management and payroll are out of scope
```

---

## 🧠 Key Validation Rules to Implement

| Field | Rule |
|---|---|
| Employee ID | Unique, required |
| Email | Valid format, required |
| Full Name | Required, non-empty |
| Department | Required |
| Attendance Status | Must be `Present` or `Absent` |
| Attendance Date | Valid date format, required |

---

*Good luck! Focus on core stability first, then layer in bonus features. A clean working app beats a feature-rich broken one every time. 🚀*