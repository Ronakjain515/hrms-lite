import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { Trash2, UserPlus } from 'lucide-react'
import { getEmployees, createEmployee, deleteEmployee } from '../services/api'
import Header from '../components/Header'
import Spinner from '../components/Spinner'
import EmptyState from '../components/EmptyState'

const EMPTY_FORM = { employee_id: '', full_name: '', email: '', department: '' }

export default function Employees() {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(EMPTY_FORM)
  const [submitting, setSubmitting] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [errors, setErrors] = useState({})

  const fetchEmployees = () => {
    setLoading(true)
    getEmployees()
      .then((res) => setEmployees(res.data))
      .catch(() => toast.error('Failed to load employees'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchEmployees()
  }, [])

  const validate = () => {
    const e = {}
    if (!form.employee_id.trim()) e.employee_id = 'Required'
    if (!form.full_name.trim()) e.full_name = 'Required'
    if (!form.email.trim()) e.email = 'Required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email'
    if (!form.department.trim()) e.department = 'Required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    try {
      await createEmployee(form)
      toast.success('Employee added!')
      setForm(EMPTY_FORM)
      setErrors({})
      setShowForm(false)
      fetchEmployees()
    } catch (err) {
      const msg = err.response?.data?.detail || 'Failed to add employee'
      toast.error(msg)
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete ${name}?`)) return
    try {
      await deleteEmployee(id)
      toast.success('Employee deleted')
      setEmployees((prev) => prev.filter((e) => e.id !== id))
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Delete failed')
    }
  }

  const field = (key, label, type = 'text') => (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
      <input
        type={type}
        value={form[key]}
        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          errors[key] ? 'border-red-400' : 'border-gray-300'
        }`}
      />
      {errors[key] && <p className="text-xs text-red-500 mt-1">{errors[key]}</p>}
    </div>
  )

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <Header title="Employees" />
      <div className="flex-1 overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <p className="text-sm text-gray-500">
            {employees.length} employee{employees.length !== 1 ? 's' : ''} registered
          </p>
          <button
            onClick={() => setShowForm((v) => !v)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            <UserPlus size={16} />
            {showForm ? 'Cancel' : 'Add Employee'}
          </button>
        </div>

        {showForm && (
          <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6 shadow-sm">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">New Employee</h2>
            <form onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                {field('employee_id', 'Employee ID')}
                {field('full_name', 'Full Name')}
                {field('email', 'Email', 'email')}
                {field('department', 'Department')}
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors"
              >
                {submitting ? 'Saving…' : 'Save Employee'}
              </button>
            </form>
          </div>
        )}

        {loading ? (
          <Spinner />
        ) : employees.length === 0 ? (
          <EmptyState message="No employees yet. Add one to get started." />
        ) : (
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
                <tr>
                  <th className="px-4 py-3 text-left">ID</th>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">Department</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {employees.map((emp) => (
                  <tr key={emp.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-mono text-gray-600">{emp.employee_id}</td>
                    <td className="px-4 py-3 font-medium text-gray-800">{emp.full_name}</td>
                    <td className="px-4 py-3 text-gray-600">{emp.email}</td>
                    <td className="px-4 py-3 text-gray-600">{emp.department}</td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => handleDelete(emp.id, emp.full_name)}
                        className="text-red-400 hover:text-red-600 transition-colors"
                        title="Delete employee"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
