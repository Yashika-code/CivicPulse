import React from "react";
import {
  Building2,
  Users,
  FileText,
  Plus,
  ArrowLeft,
  UserCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Departments = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">

      {/* ================= Mobile Navbar ================= */}
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
          label="Dashboard"
          icon={<FileText size={18} />}
          onClick={() => navigate("/admin")}
        />

        <SidebarItem
          active
          label="Departments"
          icon={<Building2 size={18} />}
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

      {/* ================= Main Content ================= */}
      <main className="flex-1 px-4 md:px-10 py-8 space-y-10">

        {/* Back */}
        <button
          onClick={() => navigate("/admin")}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </button>

        {/* Header */}
        <div className="flex justify-between items-start flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-semibold">Manage Departments</h1>
            <p className="text-gray-500 mt-1">
              Create and manage departments and officers
            </p>
          </div>

          <button
            onClick={() => navigate("/admin/department/addDepartment")}
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl shadow hover:bg-blue-700"
          >
            <Plus size={16} />
            Add Department
          </button>
        </div>

        {/* ================= Stats ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <StatCard
            title="Total Departments"
            value="5"
            icon={<Building2 className="text-blue-600" />}
          />
          <StatCard
            title="Active Officers"
            value="4"
            icon={<UserCheck className="text-green-600" />}
          />
          <StatCard
            title="Total Complaints"
            value="12"
            icon={<FileText className="text-purple-600" />}
          />
        </div>

        {/* ================= Department Table ================= */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr className="border-b border-gray-400">
                <th className="px-6 py-4 text-left">Department Name</th>
                <th className="px-6 py-4 text-left">Description</th>
                <th className="px-6 py-4 text-left">Officers</th>
                <th className="px-6 py-4 text-center">Complaints</th>
                <th className="px-6 py-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-100 hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">
                  Roads & Infrastructure
                </td>
                <td className="px-6 py-4 text-gray-500">
                  Road repair, potholes & maintenance
                </td>
                <td className="px-6 py-4 text-center">12</td>
                <td className="px-6 py-4 text-center">58</td>
                <td className="px-6 py-4 text-center">
                  <span className="px-3 py-1 rounded-full text-xs bg-green-50 text-green-600">
                    Active
                  </span>
                </td>
              </tr>

              <tr className="border-t border-gray-100 hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">
                  Water Supply
                </td>
                <td className="px-6 py-4 text-gray-500">
                  Handles water supply issues and pipeline
                </td>
                <td className="px-6 py-4 text-center">8</td>
                <td className="px-6 py-4 text-center">40</td>
                <td className="px-6 py-4 text-center">
                  <span className="px-3 py-1 rounded-full text-xs bg-green-50 text-green-600">
                    Active
                  </span>
                </td>
              </tr>


            </tbody>
          </table>
        </div>

      </main>
    </div>
  );
};

export default Departments;

const SidebarItem = ({ label, icon, onClick, active }) => (
  <button
    onClick={onClick}
    className={`flex cursor-pointer items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
      ${active ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100"}`}
  >
    {icon}
    {label}
  </button>
);

const StatCard = ({ title, value, icon }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm flex items-center gap-4">
    <div className="p-3 bg-gray-100 rounded-lg">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className="text-2xl font-bold">{value}</h3>
    </div>
  </div>
);
