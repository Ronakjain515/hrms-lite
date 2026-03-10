import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Users, CalendarCheck } from 'lucide-react'

const links = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/employees', label: 'Employees', icon: Users },
  { to: '/attendance', label: 'Attendance', icon: CalendarCheck },
]

export default function Sidebar() {
  return (
    <aside className="w-56 min-h-screen bg-slate-900 text-white flex flex-col shrink-0">
      <div className="px-6 py-5 text-xl font-bold tracking-tight border-b border-slate-700">
        HRM<span className="text-blue-400">S</span> Lite
      </div>
      <nav className="flex-1 py-4 space-y-1 px-3">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:bg-slate-700 hover:text-white'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
