import React, { useState } from "react";
import {
  FileText,
  Users,
  Building2,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats,setStats]=useState({
    total:247,
    department:8,
    rate:"78%"
  })

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* ================= Mobile Top Navbar ================= */}
      <div className="md:hidden sticky top-0 z-20 bg-white border-b px-4 py-3 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">Civic Pulse</h1>
          <p className="text-xs text-gray-400">Admin Dashboard</p>
        </div>

        <button
          onClick={() => navigate("/")}
          className="text-sm px-3 py-1 rounded-lg bg-red-50 text-red-600"
        >
          Logout
        </button>
      </div>

      {/* ================= Sidebar ================= */}
      <aside
        className="
    flex md:flex-col flex-row
    md:w-64 w-full
    bg-white
    border-b md:border-r border-gray-300
    p-2 md:p-4
    overflow-x-auto
  "
      >
        {/* Title (Desktop only) */}
        <div className="hidden md:block mb-6 px-2">
          <h2 className="text-xl font-semibold text-gray-900">
            Civic Pulse
          </h2>
          <p className="text-sm text-gray-400">Admin Portal</p>
        </div>

        {/* Nav buttons */}
        <SidebarItem
          active
          label="Dashboard"
          icon={<FileText size={18} />}
        />

        <SidebarItem
          label="Departments"
          icon={<Building2 size={18} />}
          onClick={() => navigate("/admin/departments")}
        />

        <SidebarItem
          label="Users"
          icon={<Users size={18} />}
          onClick={() => navigate("/admin/users")}
        />

        <SidebarItem
          label="Reports"
          icon={<FileText size={18} />}
          onClick={() => navigate("/admin/reports")}
        />

        {/* Footer (Desktop only) */}
        <div className="hidden md:block mt-auto px-2 pt-6 border-t border-gray-300">
          <p className="font-medium text-gray-900">Admin User</p>
          <p className="text-sm text-gray-400">System Administrator</p>
          <button
            onClick={() => navigate("/")}
            className="mt-3 w-full border px-3 py-2 rounded-lg cursor-pointer text-red-600 bg-red-50"
          >
            Log Out
          </button>
        </div>
      </aside>


      {/* ================= Main ================= */}
      <main className="flex-1 px-4 md:px-8 py-6 space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Admin Dashboard
          </h1>
          <p className="text-gray-500 mt-1">
            Manage and monitor the civic complaint system
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            icon={<FileText className="text-blue-600" />}
            title="Total Complaints"
            value={stats.total}
            subtitle="54 pending resolution"
          />
          <StatCard
            icon={<Building2 className="text-purple-600" />}
            title="Departments"
            value={stats.department}
            subtitle="156 active officers"
          />
          <StatCard
            icon={<TrendingUp className="text-green-600" />}
            title="Resolution Rate"
            value={stats.rate}
            subtitle="12 resolved today"
          />
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="font-semibold text-gray-900 mb-4">
            Quick Actions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ActionCard
              icon={<Building2 className="text-blue-600" />}
              title="Manage Departments"
              onClick={() => navigate("/admin/departments")}
            />
            <ActionCard
              icon={<Users className="text-purple-600" />}
              title="Manage Users"
              onClick={() => navigate("/admin/users")}
            />
            <ActionCard
              icon={<FileText className="text-green-600" />}
              title="View Reports"
              onClick={() => navigate("/admin/reports")}
            />
          </div>
        </div>

        {/* Activity + Performance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="font-semibold text-gray-900 mb-4">
              Recent Activity
            </h2>

            <ul className="space-y-3 text-sm text-gray-600">
              <li>• New complaint assigned (Water) — 5 mins ago</li>
              <li>• Officer joined (Roads) — 15 mins ago</li>
              <li>• Complaint resolved (Electricity) — 32 mins ago</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="font-semibold text-gray-900 mb-4">
              Department Performance
            </h2>

            <Progress label="Roads" value={78} />
            <Progress label="Water" value={80} />
            <Progress label="Electricity" value={72} />
            <Progress label="Sanitation" value={73} />
          </div>
        </div>

        {/* System Status */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-3">
          <ShieldCheck className="text-blue-600 mt-1" />
          <div>
            <p className="font-medium text-blue-900">
              System Status: All Systems Operational
            </p>
            <p className="text-sm text-blue-700">
              All departments are online and processing complaints.
              Last system check 2 minutes ago.
            </p>
          </div>
        </div>

      </main>
    </div>
  );
};

/* ================= Reusable Components ================= */

const SidebarItem = ({ label, icon, onClick, active }) => (
  <button
    onClick={onClick}
    className={`
      flex items-center cursor-pointer gap-2
      px-4 py-2
      rounded-lg
      text-sm font-medium
      whitespace-nowrap
      transition
      md:w-full
      ${active
        ? "bg-blue-100 text-blue-700"
        : "text-gray-700 hover:bg-gray-100"}
    `}
  >
    {icon}
    {label}
  </button>
);


const StatCard = ({ icon, title, value, subtitle }) => (
  <div className="bg-white rounded-xl shadow-sm p-6 flex items-center gap-4">
    <div className="p-3 bg-gray-100 rounded-lg">
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
      <p className="text-sm text-gray-400">{subtitle}</p>
    </div>
  </div>
);

const ActionCard = ({ icon, title, onClick }) => (
  <div
    onClick={onClick}
    className="cursor-pointer border rounded-xl p-4 flex items-center justify-between
               hover:bg-gray-50 transition"
  >
    <div className="flex items-
     gap-3">
      <div className="p-2 bg-gray-100 rounded-lg text-gray-700">
        {icon}
      </div>
      <p className="font-medium text-gray-800">{title}</p>
    </div>
    <span className="text-gray-400 text-lg">›</span>
  </div>
);

const Progress = ({ label, value }) => (
  <div className="mb-4">
    <div className="flex justify-between text-sm mb-1 text-gray-600">
      <span>{label}</span>
      <span>{value}%</span>
    </div>
    <div className="h-2 bg-gray-200 rounded">
      <div
        className="h-2 bg-teal-500 rounded"
        style={{ width: `${value}%` }}
      />
    </div>
  </div>
);

export default AdminDashboard;
