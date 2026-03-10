import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { getEmployees, getAttendanceByEmployee, getAttendanceByDate, markAttendance } from '../services/api'
import Header from '../components/Header'
import Spinner from '../components/Spinner'
import EmptyState from '../components/EmptyState'
import Badge from '../components/Badge'

export default function Attendance() {
  const [employees, setEmployees] = useState([])
  const [selectedEmp, setSelectedEmp] = useState('')
  const [records, setRecords] = useState([])
  const [loadingRecords, setLoadingRecords] = useState(false)
  const [filterDate, setFilterDate] = useState('')

  const [form, setForm] = useState({ employee_id: '', date: '', status: 'Present' })
  const [submitting, setSubmitting] = useState(false)
  const [formErrors, setFormErrors] = useState({})

  useEffect(() => {
    getEmployees()
      .then((res) => setEmployees(res.data))
      .catch(() => toast.error('Failed to load employees'))
  }, [])

  const fetchByEmployee = (empId) => {
    if (!empId) return
    setLoadingRecords(true)
    getAttendanceByEmployee(empId)
      .then((res) => setRecords(res.data))
      .catch(() => toast.error('Failed to load attendance'))
      .finally(() => setLoadingRecords(false))
  }

  const fetchByDate = () => {
    if (!filterDate) return
    setLoadingRecords(true)
    setSelectedEmp('')
    getAttendanceByDate(filterDate)
      .then((res) => setRecords(res.data))
      .catch(() => toast.error('Failed to load attendance'))
      .finally(() => setLoadingRecords(false))
  }

  const handleEmpSelect = (e) => {
    const id = e.target.value
    setSelectedEmp(id)
    setFilterDate('')
    setRecords([])
    fetchByEmployee(id)
  }

  const validate = () => {
    const e = {}
    if (!form.employee_id) e.employee_id = 'Required'
    if (!form.date) e.date = 'Required'
    setFormErrors(e)
    return Object.keys(e).length === 0
  }

  const handleMark = async (ev) => {
    ev.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    try {
      await markAttendance({ ...form, employee_id: Number(form.employee_id) })
      toast.success('Attendance marked!')
      setForm({ employee_id: '', date: '', status: 'Present' })
      setFormErrors({})
      if (selectedEmp) fetchByEmployee(selectedEmp)
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Failed to mark attendance')
    } finally {
      setSubmitting(false)
    }
  }

  // compute total present days per employee in visible records
  const presentCount = records.filter((r) => r.status === 'Present').length

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <Header title="Attendance" />
      <div className="flex-1 overflow-y-auto p-6 space-y-6">

        {/* Mark Attendance Form */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Mark Attendance</h2>
          <form onSubmit={handleMark} noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Employee</label>
                <select
                  value={form.employee_id}
                  onChange={(e) => setForm({ ...form, employee_id: e.target.value })}
                  className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    formErrors.employee_id ? 'border-red-400' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select employee…</option>
                  {employees.map((emp) => (
                    <option key={emp.id} value={emp.id}>
                      {emp.full_name} ({emp.employee_id})
                    </option>
                  ))}
                </select>
                {formErrors.employee_id && (
                  <p className="text-xs text-red-500 mt-1">{formErrors.employee_id}</p>
                )}
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Date</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    formErrors.date ? 'border-red-400' : 'border-gray-300'
                  }`}
                />
                {formErrors.date && (
                  <p className="text-xs text-red-500 mt-1">{formErrors.date}</p>
                )}
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Status</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors"
            >
              {submitting ? 'Marking…' : 'Mark Attendance'}
            </button>
          </form>
        </div>

        {/* View Records */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">View Records</h2>
          <div className="flex flex-wrap gap-3 mb-4">
            <select
              value={selectedEmp}
              onChange={handleEmpSelect}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Filter by employee…</option>
              {employees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.full_name}
                </option>
              ))}
            </select>
            <div className="flex gap-2">
              <input
                type="date"
                value={filterDate}
                onChange={(e) => { setFilterDate(e.target.value); setSelectedEmp('') }}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={fetchByDate}
                disabled={!filterDate}
                className="bg-gray-100 hover:bg-gray-200 disabled:opacity-50 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg transition-colors"
              >
                Filter by Date
              </button>
            </div>
          </div>

          {records.length > 0 && (
            <p className="text-xs text-gray-500 mb-3">
              {presentCount} Present · {records.length - presentCount} Absent in view
            </p>
          )}

          {loadingRecords ? (
            <Spinner />
          ) : records.length === 0 ? (
            <EmptyState message="Select an employee or date to view records." />
          ) : (
            <div className="overflow-hidden rounded-lg border border-gray-100">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
                  <tr>
                    <th className="px-4 py-3 text-left">Date</th>
                    <th className="px-4 py-3 text-left">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {records.map((r) => (
                    <tr key={r.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-700">{r.date}</td>
                      <td className="px-4 py-3">
                        <Badge status={r.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
