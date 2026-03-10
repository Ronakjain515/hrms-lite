import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { Users, UserCheck, UserX } from 'lucide-react'
import { getDashboard } from '../services/api'
import Header from '../components/Header'
import Spinner from '../components/Spinner'

function StatCard({ icon: Icon, label, value, color }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex items-center gap-4">
      <div className={`${color} p-3 rounded-lg`}>
        <Icon size={22} className="text-white" />
      </div>
      <div>
        <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{label}</p>
        <p className="text-3xl font-bold text-gray-800 mt-0.5">{value}</p>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getDashboard()
      .then((res) => setStats(res.data))
      .catch(() => toast.error('Failed to load dashboard'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <Header title="Dashboard" />
      <div className="flex-1 overflow-y-auto p-6">
        <p className="text-sm text-gray-500 mb-6">
          Today's overview — {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
        {loading ? (
          <Spinner />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard
              icon={Users}
              label="Total Employees"
              value={stats?.total_employees ?? 0}
              color="bg-blue-500"
            />
            <StatCard
              icon={UserCheck}
              label="Present Today"
              value={stats?.present_today ?? 0}
              color="bg-green-500"
            />
            <StatCard
              icon={UserX}
              label="Absent Today"
              value={stats?.absent_today ?? 0}
              color="bg-red-400"
            />
          </div>
        )}
      </div>
    </div>
  )
}
