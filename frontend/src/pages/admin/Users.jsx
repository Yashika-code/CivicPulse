import React from 'react'
import { useNavigate } from "react-router-dom";
const AdminDashboard = () => {
  const navigate=useNavigate();
  return (
    <div className='min-h-screen h-screen bg-gray-50'>

      <div className='flex flex-col h-full md:flex-row '>

        <aside className="
          flex md:flex-col flex-row
          md:w-64 w-full
          bg-white border-b border-gray-300 shadow-sm md:border-r
          p-2 md:p-4
          sticky top-0
          overflow-x-auto
        ">
          <div className='mb-6 border-b border-gray-300'>
            <h2 className="hidden md:block text-2xl font-semibold ml-2 ">
              Civic Pulse
            </h2>
            <p className='text-sm text-gray-400 mb-5 ml-2'> Admin Portal</p>
          </div>
          <button
            className="cursor-pointer flex  items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 font-medium whitespace-nowrap md:w-full md:mt-2 ml-2 md:ml-0"
            onClick={() => navigate("/admin")}
          >
            Dashboard
          </button>

          <button
            className="flex cursor-pointer items-center gap-2 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 whitespace-nowrap md:w-full md:mt-2 ml-2 md:ml-0"
            onClick={() => navigate("/admin/departments")}
          >
            Departments
          </button>

          <button
            className="flex cursor-pointer bg-gradient-to-r from-blue-600 to-teal-500
                         text-white items-center gap-2 px-4 py-2 rounded-lg font-medium  hover:bg-gray-100 whitespace-nowrap md:w-full md:mt-2 ml-2 md:ml-0"
            onClick={() => navigate("/admin/users")}
          >
            Users
          </button>

          <button
            className="flex cursor-pointer items-center gap-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 whitespace-nowrap md:w-full md:mt-2 ml-2 md:ml-0"
            onClick={() => navigate("/admin/reports")}
          >
            Reports
          </button>

          

        </aside>

      </div>

    </div>
  )
}
export default AdminDashboard