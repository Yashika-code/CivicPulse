import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FileText, Clock, CheckCircle, Eye } from 'lucide-react'
import Navbar from '../../components/Navbar'

const complaints = [
  {
    id: 1,
    title: 'Broken streetlight on Main Street',
    category: 'Electricity',
    status: 'Resolved',
    date: 'Dec 20, 2025',
  },
  {
    id: 2,
    title: 'Pothole near community center',
    category: 'Road',
    status: 'In Progress',
    date: 'Dec 22, 2025',
  },
  {
    id: 3,
    title: 'Water leakage in residential area',
    category: 'Water',
    status: 'Open',
    date: 'Dec 25, 2025',
  },
]

const statusStyles = {
  Resolved: 'bg-green-100 text-green-700',
  'In Progress': 'bg-blue-100 text-blue-700',
  Open: 'bg-yellow-100 text-yellow-700',
}

const OfficerDashboard = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Officer Dashboard
          </h1>
          <p className="text-gray-500 mt-1">
            Manage and resolve civic complaints efficiently
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <StatCard title="Total" value="5" icon={<FileText className="text-blue-500" />} />
          <StatCard title="Active" value="4" icon={<Clock className="text-orange-500" />} />
          <StatCard title="Resolved" value="1" icon={<CheckCircle className="text-green-500" />} />
        </div>

        {/* Complaints */}
        <div className="space-y-5">
          <h2 className="text-xl font-semibold text-gray-800">
            Recent Complaints
          </h2>

          {complaints.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-xl shadow-sm p-6
                         flex flex-col sm:flex-row sm:items-center sm:justify-between"
            >
              {/* Left */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {c.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {c.category}
                </p>
              </div>

              {/* Right */}
              <div className="flex flex-wrap items-center gap-3 mt-4 sm:mt-0">
                {/* Status + Date */}
                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[c.status]}`}
                  >
                    {c.status}
                  </span>
                  <span className="text-xs text-gray-400">
                    {c.date}
                  </span>
                </div>

                {/* View Button */}
                <button
                  onClick={() => navigate(`/complaints/${c.id}`)}
                  className="flex items-center gap-1
                             border border-gray-300
                             px-4 py-2 rounded-lg text-sm text-gray-700
                             hover:bg-gray-100 transition"
                >
                  <Eye size={16} />
                  View
                </button>

                {/* Update Button */}
                {c.status !== 'Resolved' && (
                  <button
                  onClick={()=>navigate("/officer/complaint/:id")}
                    className="flex items-center gap-1
                               bg-gradient-to-r from-blue-600 to-teal-500
                               text-white px-4 py-2 rounded-lg text-sm
                               shadow-sm hover:opacity-90 transition"
                  >
                    Update
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 pb-10">
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
    
    {/* High Priority */}
    <div className="bg-red-50 border border-red-200 rounded-xl p-5">
      <div className="flex items-center gap-2 mb-2">
        <FileText className="text-red-500" size={20} />
        <h3 className="font-semibold text-gray-900">
          High Priority Alerts
        </h3>
      </div>
      <p className="text-sm text-gray-600">
        2 high priority complaints require immediate attention
      </p>
    </div>

    {/* Success */}
    <div className="bg-green-50 border border-green-200 rounded-xl p-5">
      <div className="flex items-center gap-2 mb-2">
        <CheckCircle className="text-green-500" size={20} />
        <h3 className="font-semibold text-gray-900">
          Recent Success
        </h3>
      </div>
      <p className="text-sm text-gray-600">
        1 complaint resolved this month. Great work!
      </p>
    </div>

  </div>
</div>

    </div>
  )
}

const StatCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 flex items-center gap-4">
      <div className="bg-gray-100 p-3 rounded-lg">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h2 className="text-2xl font-bold text-gray-900">{value}</h2>
      </div>
    </div>
  )
}

export default OfficerDashboard
