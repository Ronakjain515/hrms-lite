from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from models import Employee
from schemas import EmployeeCreate, EmployeeResponse
from typing import List

router = APIRouter(prefix="/employees", tags=["Employees"])


@router.get("", response_model=List[EmployeeResponse])
def list_employees(db: Session = Depends(get_db)):
    return db.query(Employee).all()


@router.post("", response_model=EmployeeResponse, status_code=status.HTTP_201_CREATED)
def create_employee(payload: EmployeeCreate, db: Session = Depends(get_db)):
    # Check for duplicate employee_id
    if db.query(Employee).filter(Employee.employee_id == payload.employee_id).first():
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Employee ID already exists")
    # Check for duplicate email
    if db.query(Employee).filter(Employee.email == payload.email).first():
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Email already registered")

    employee = Employee(**payload.model_dump())
    db.add(employee)
    db.commit()
    db.refresh(employee)
    return employee


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_employee(id: int, db: Session = Depends(get_db)):
    employee = db.query(Employee).filter(Employee.id == id).first()
    if not employee:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Employee not found")
    db.delete(employee)
    db.commit()
