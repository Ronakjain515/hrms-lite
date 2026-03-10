from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from sqlalchemy import func
from database import get_db
from models import Attendance, Employee
from schemas import AttendanceCreate, AttendanceResponse
from typing import List, Optional
from datetime import date

router = APIRouter(prefix="/attendance", tags=["Attendance"])


@router.get("", response_model=List[AttendanceResponse])
def list_attendance(
    filter_date: Optional[date] = Query(None, alias="date"),
    db: Session = Depends(get_db),
):
    query = db.query(Attendance)
    if filter_date:
        query = query.filter(Attendance.date == filter_date)
    return query.all()


@router.get("/{employee_id}", response_model=List[AttendanceResponse])
def get_employee_attendance(employee_id: int, db: Session = Depends(get_db)):
    employee = db.query(Employee).filter(Employee.id == employee_id).first()
    if not employee:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Employee not found")
    return db.query(Attendance).filter(Attendance.employee_id == employee_id).all()


@router.post("", response_model=AttendanceResponse, status_code=status.HTTP_201_CREATED)
def mark_attendance(payload: AttendanceCreate, db: Session = Depends(get_db)):
    employee = db.query(Employee).filter(Employee.id == payload.employee_id).first()
    if not employee:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Employee not found")

    # Prevent duplicate entry for same employee + date
    existing = (
        db.query(Attendance)
        .filter(Attendance.employee_id == payload.employee_id, Attendance.date == payload.date)
        .first()
    )
    if existing:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Attendance already marked for this date")

    record = Attendance(**payload.model_dump())
    db.add(record)
    db.commit()
    db.refresh(record)
    return record
