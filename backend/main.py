from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from database import engine, get_db
import models
from routers import employees, attendance
from sqlalchemy.orm import Session
from datetime import date

# Create all tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="HRMS Lite API", version="1.0.0")

# CORS configuration
# allow_origins: lists specific domains
# allow_origin_regex: handles all *.vercel.app subdomains
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://hrm_lite_project.vercel.app"],
    allow_credentials=True,
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(employees.router)
app.include_router(attendance.router)


@app.get("/dashboard", tags=["Dashboard"])
def get_dashboard(db: Session = Depends(get_db)):
    total_employees = db.query(models.Employee).count()
    today = date.today()
    present_today = (
        db.query(models.Attendance)
        .filter(models.Attendance.date == today, models.Attendance.status == "Present")
        .count()
    )
    absent_today = (
        db.query(models.Attendance)
        .filter(models.Attendance.date == today, models.Attendance.status == "Absent")
        .count()
    )
    return {
        "total_employees": total_employees,
        "present_today": present_today,
        "absent_today": absent_today,
    }


@app.get("/", tags=["Health"])
def root():
    return {"message": "HRMS Lite API is running", "docs": "/docs"}
