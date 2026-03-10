# HRMS Lite

A lightweight Human Resource Management System built with **React + FastAPI + PostgreSQL**.

## Live URLs

| | URL |
|---|---|
| **Frontend** | https://hrms-lite.vercel.app *(update after deploy)* |
| **Backend API Docs** | https://hrms-lite.onrender.com/docs *(update after deploy)* |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19 + Vite + TailwindCSS |
| Backend | FastAPI (Python 3.12) |
| Database | PostgreSQL via Supabase (SQLite locally) |
| Frontend Deploy | Vercel |
| Backend Deploy | Render |

---

## Features

- **Employee Management** — Add, list, and delete employees with full validation (unique ID, valid email, required fields)
- **Attendance Tracking** — Mark Present / Absent per employee per day, prevent duplicate entries
- **Dashboard** — Real-time summary: total employees, present today, absent today
- **Bonus: Date filter** — Filter all attendance records by any date
- **Bonus: Present-day counter** — Shows total Present days in the current view
- **Proper HTTP status codes** — `201 Created`, `409 Conflict`, `404 Not Found`, `422 Validation Error`
- **Auto-generated Swagger docs** available at `/docs`
- **Loading, empty, and error states** throughout the UI

---

## Local Setup

### Prerequisites

- Python 3.12+
- Node.js 18+
- A PostgreSQL database (or use the default SQLite for local dev)

### Backend

```bash
cd backend
python -m venv .venv
# Windows:
.venv\Scripts\activate
# macOS/Linux:
source .venv/bin/activate

pip install -r requirements.txt
cp .env.example .env
# Edit .env and set DATABASE_URL (see below)
python -m uvicorn main:app --reload
```

Backend runs at **http://localhost:8000**
Swagger UI at **http://localhost:8000/docs**

#### `.env` (backend)

```
# Local SQLite (no setup required)
DATABASE_URL=sqlite:///./hrms.db

# Or Supabase PostgreSQL
DATABASE_URL=postgresql://user:password@host:5432/dbname
```

---

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
# .env already contains: VITE_API_URL=http://localhost:8000
npm run dev
```

Frontend runs at **http://localhost:5173**

---

## API Endpoints

| Method | Endpoint | Description | Status Codes |
|--------|----------|-------------|--------------|
| `GET` | `/employees` | List all employees | 200 |
| `POST` | `/employees` | Add a new employee | 201, 409, 422 |
| `DELETE` | `/employees/{id}` | Delete an employee | 204, 404 |
| `POST` | `/attendance` | Mark attendance | 201, 404, 409, 422 |
| `GET` | `/attendance/{employee_id}` | Get attendance for employee | 200, 404 |
| `GET` | `/attendance?date=YYYY-MM-DD` | Filter attendance by date *(bonus)* | 200 |
| `GET` | `/dashboard` | Summary counts | 200 |
| `GET` | `/docs` | Interactive Swagger UI | 200 |

---

## Deployment

### 1. Supabase (Database)
1. Go to [supabase.com](https://supabase.com) → New project
2. Copy the **PostgreSQL connection string** from Settings → Database

### 2. Render (Backend)
1. New Web Service → Connect `github.com/Ronakjain515/hrms-lite`
2. **Root directory:** `backend`
3. **Build command:** `pip install -r requirements.txt`
4. **Start command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Add environment variable: `DATABASE_URL=<your-supabase-url>`

### 3. Vercel (Frontend)
1. Import `github.com/Ronakjain515/hrms-lite`
2. **Root directory:** `frontend`
3. **Framework preset:** Vite (auto-detected)
4. Add environment variable: `VITE_API_URL=https://<your-render-app>.onrender.com`

---

## Project Structure

```
hrms-lite/
├── frontend/
│   ├── src/
│   │   ├── components/       # Sidebar, Header, Badge, Spinner, EmptyState
│   │   ├── pages/            # Dashboard, Employees, Attendance
│   │   ├── services/         # api.js — Axios instance + all API calls
│   │   └── App.jsx           # BrowserRouter + route definitions
│   └── package.json
│
├── backend/
│   ├── routers/
│   │   ├── employees.py      # GET, POST /employees | DELETE /employees/{id}
│   │   └── attendance.py     # GET, POST /attendance
│   ├── models.py             # SQLAlchemy ORM models (Employee, Attendance)
│   ├── schemas.py            # Pydantic v2 validation schemas
│   ├── database.py           # DB engine + session + get_db dependency
│   └── main.py               # FastAPI app, CORS, /dashboard endpoint
│
└── README.md
```

---

## Assumptions & Limitations

- Single admin user — no authentication required per the spec
- Leave management and payroll are out of scope
- Locally defaults to SQLite; swap `DATABASE_URL` for PostgreSQL in production
- One attendance record per employee per day (duplicate entries return `409 Conflict`)

---

## Commit History

Follows conventional commits:
- `feat: init project scaffold`
- `feat: add employee APIs`
- `feat: add attendance APIs and dashboard`
- `feat: build frontend UI — employees, attendance, dashboard`
