import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
})

// ── Employees ──────────────────────────────────────────────────────────────
export const getEmployees = () => api.get('/employees')
export const createEmployee = (data) => api.post('/employees', data)
export const deleteEmployee = (id) => api.delete(`/employees/${id}`)

// ── Attendance ─────────────────────────────────────────────────────────────
export const getAttendanceByEmployee = (employeeId) => api.get(`/attendance/${employeeId}`)
export const getAttendanceByDate = (date) => api.get('/attendance', { params: { date } })
export const markAttendance = (data) => api.post('/attendance', data)

// ── Dashboard ──────────────────────────────────────────────────────────────
export const getDashboard = () => api.get('/dashboard')

export default api
