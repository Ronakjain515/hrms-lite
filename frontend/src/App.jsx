import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Employees from './pages/Employees'
import Attendance from './pages/Attendance'

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/attendance" element={<Attendance />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}
