import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FileText, Clock, CheckCircle, ArrowLeft, Eye } from 'lucide-react'
import Navbar from '../../components/Navbar'
import { complaintApi } from '../../services/api';

const statusStyles = {
  pending: 'bg-yellow-100 text-yellow-700',
  resolved: 'bg-green-100 text-green-700',
  'in-progress': 'bg-blue-100 text-blue-700',
  open: 'bg-yellow-100 text-yellow-700',
}

const MyComplaints = () => {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [stats, setStats] = useState({ total: 0, active: 0, resolved: 0 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchComplaints = async () => {
      setLoading(true);
      try {
        const { data } = await complaintApi.getMy();
        setComplaints(data);
        const total = data.length;
        const resolved = data.filter((c) => c.status === 'resolved').length;
        const active = total - resolved;
        setStats({ total, active, resolved });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* Back */}
        <button
          onClick={() => navigate('/user')}
          className="flex items-center gap-2 text-gray-500 text-sm mb-6 hover:text-gray-800"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            My Complaints
          </h1>
          <p className="text-gray-500 mt-1">
            Track the status of your submitted complaints
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <StatCard title="Total" value={stats.total} icon={<FileText className='text-blue-400' />} />
          <StatCard title="Active" value={stats.active} icon={<Clock className='text-yellow-500' />} />
          <StatCard title="Resolved" value={stats.resolved} icon={<CheckCircle className='text-green-500' />} />
        </div>

        {/* Complaint List */}
        <div className="space-y-5">
          {complaints.map((c) => (
            <div
              key={c._id}
              className="bg-white rounded-xl shadow p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between"
            >
              {/* Left */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {c.title}
                </h3>
                <p className="text-gray-500 text-sm mt-1">
                  {c.category}
                </p>
              </div>

              {/* Right */}
              <div className="flex items-center gap-4 mt-4 sm:mt-0">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyles[c.status]}`}
                >
                  {c.status}
                </span>

                <span className="text-gray-500 text-sm">
                  {new Date(c.createdAt).toLocaleDateString()}
                </span>

                <button
                  onClick={() => navigate(`/user/complaint/${c._id}`)}
                  className="flex items-center cursor-pointer gap-1 border px-4 py-2 rounded-lg
                             hover:bg-gray-100 transition text-sm"
                >
                  <Eye size={16} />
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

const StatCard = ({ title, value, icon }) => (
  <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
    <div className="bg-gray-100 p-3 rounded-lg text-gray-700">
      {icon}
    </div>
    <div>
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-2xl font-bold text-gray-900">{value}</h2>
    </div>
  </div>
)

export default MyComplaints
