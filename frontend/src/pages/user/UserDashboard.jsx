import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FileText, Clock, CheckCircle, Plus, List } from 'lucide-react'
import Navbar from '../../components/Navbar'
import CountUp from 'react-countup';

const UserDashboard = () => {
  const navigate = useNavigate()
  const [stats, setStats] = useState({
    total: 12,
    pending: 5,
    resolved: 7
  });
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back!
          </h1>
          <p className="text-gray-500 mt-1">
            Track and manage your civic complaints
          </p>
        </div>

        {stats.total === 0 ? (
          <div className="bg-white p-6 rounded-xl text-center text-gray-500">
            You haven’t raised any complaints yet.
          </div>
        ) : (
          < div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">

            <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <FileText className="text-blue-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Complaints</p>
                <h2 className="text-2xl font-bold text-gray-900">
                  <CountUp end={stats.total} duration={1.5} />
                </h2>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Clock className="text-yellow-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Pending</p>
                <h2 className="text-2xl font-bold text-gray-900">
                  <CountUp end={stats.pending} duration={1.5} />
                </h2>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <CheckCircle className="text-green-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Resolved</p>
                <h2 className="text-2xl font-bold text-gray-900">
                  <CountUp end={stats.resolved} duration={1.5} />
                </h2>
              </div>
            </div>

          </div>
        )}

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Quick Actions
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

            <button
              onClick={() => navigate('/user/new-Complaint')}
              className="flex items-center justify-center gap-2
             bg-gradient-to-r from-blue-600 to-teal-500
             text-white py-3 rounded-lg font-medium
             hover:shadow-lg transition cursor-pointer duration-200
             focus:outline-none focus:ring-2 focus:ring-blue-400">
              <Plus size={18} /> Raise Complaint
            </button>



            <button
              onClick={() => navigate('/user/my-Complaints')}
              className="flex items-center justify-center gap-2
                         border border-gray-300 py-3 cursor-pointer rounded-lg
                         font-medium text-gray-700
                         hover:bg-gray-100 transition"
            >
              <List size={18} />
              My Complaints
            </button>

          </div>
        </div>

        {/* Help Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 flex gap-3">
          <FileText className="text-blue-600 mt-1" />
          <div>
            <h3 className="text-blue-900 font-semibold">Need Help?</h3>
            <p className="text-blue-700 text-sm mt-1">
              Our team reviews all complaints within 24–48 hours.
              You’ll receive updates via email.
            </p>
            <button
              onClick={() => navigate("/contact-support")}
              className="mt-2 text-blue-600 font-semibold underline text-sm">
              Contact Support
            </button>
          </div>
        </div>


      </div>
    </div >
  )
}

export default UserDashboard
