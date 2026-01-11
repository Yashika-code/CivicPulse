import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  MapPin,
  Tag,
  User,
  Calendar
} from 'lucide-react'
import Navbar from '../../components/Navbar'

const ComplaintDetails = () => {
  const navigate = useNavigate()
  const [status, setStatus] = useState('In Progress')
  const [notes, setNotes] = useState('')

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* Back */}
        <button
          onClick={() => navigate('/officer')}
          className="flex items-center gap-2 text-sm text-blue-600 mb-6"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </button>

        {/* Page Header */}
        <h1 className="text-3xl font-semibold text-gray-900">
          Update Complaint Status
        </h1>
        <p className="text-gray-500 mt-2 mb-8">
          Review complaint details and update the current status
        </p>

        {/* Complaint Card */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-10">

          {/* Title + Badges */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Water leakage in residential area
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Complaint ID: #3
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-4 py-1 rounded-full text-sm bg-yellow-100 text-yellow-700">
                {status}
              </span>
              <span className="px-4 py-1 rounded-full text-sm bg-orange-100 text-orange-700">
                Medium
              </span>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">

            <InfoItem
              icon={<Tag className="text-blue-600" />}
              label="Category"
              value="Water"
              bg="bg-blue-50"
            />

            <InfoItem
              icon={<MapPin className="text-teal-600" />}
              label="Location"
              value="789 Oak Avenue"
              bg="bg-teal-50"
            />

            <InfoItem
              icon={<User className="text-purple-600" />}
              label="Reported By"
              value="Emily Davis"
              bg="bg-purple-50"
            />

            <InfoItem
              icon={<Calendar className="text-yellow-600" />}
              label="Date Submitted"
              value="Dec 25, 2025"
              bg="bg-yellow-50"
            />
          </div>

          {/* Description */}
          <div className="border-t pt-5">
            <p className="text-sm font-medium text-gray-500 mb-2">
              Description
            </p>
            <p className="text-gray-700 leading-relaxed">
              There is a water leakage on the main pipe near the residential area.
              Water is constantly flowing and causing wastage.
            </p>
          </div>
        </div>

        {/* Update Section */}
        <div className="bg-white rounded-2xl shadow-sm p-6">

          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Update Information
          </h3>

          {/* Status */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Status <span className="text-red-500">*</span>
            </label>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3"
            >
              <option>Open</option>
              <option>In Progress</option>
              <option>Resolved</option>
            </select>

            <p className="text-sm text-gray-500 mt-2">
              Current status: <span className="font-medium">Open</span>
            </p>
          </div>

          {/* Notes */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Comments / Notes <span className="text-red-500">*</span>
            </label>

            <textarea
              rows="5"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add notes about the status update, actions taken, or next steps..."
              className="w-full border border-gray-300 rounded-xl px-4 py-3"
            />

            <p className="text-sm text-gray-500 mt-2">
              This note will be visible to the citizen and other officers
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              className="flex-1 bg-gradient-to-r from-blue-600 to-teal-500
                         text-white py-3 rounded-xl font-medium
                         hover:opacity-90 transition"
            >
              Update Status
            </button>

            <button
              onClick={() => navigate('/officer')}
              className="flex-1 border border-gray-300
                         py-3 rounded-xl font-medium text-gray-700
                         hover:bg-gray-100 transition"
            >
              Cancel
            </button>
          </div>
        </div>

        {/* Info Alert */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4 text-blue-700 text-sm">
          <strong>Important:</strong> Citizens will be notified via email when
          you update the status. Make sure to provide clear and helpful
          information in your comments.
        </div>

      </div>
    </div>
  )
}

const InfoItem = ({ icon, label, value, bg }) => (
  <div className="flex items-start gap-4">
    <div className={`p-3 rounded-xl ${bg}`}>
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium text-gray-900">{value}</p>
    </div>
  </div>
)

export default ComplaintDetails
