import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewDepartment = () => {
  const navigate = useNavigate();
  const [department, setDepartment] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [departmentError, setDepartmentError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [status, setStatus] = useState("");
  const [statusError, setStatusError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setDepartmentError("");
    setDescriptionError("");
    setStatusError("");

    let hasError = false;

    if (!department.trim()) {
      setDepartmentError("Department is required");
      hasError=true;
    }

    if (!description.trim()) {
      setDescriptionError("Description is required");
      hasError=true;
    }

    if (!status) {
      setStatusError("Select Status");
      hasError=true;
    }

    if (hasError) return;
    setLoading(true);

    setTimeout(() => {
      console.log("Department added successfully");
      setLoading(false);
      navigate("/admin/departments")
    }, 1000);
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-8 w-ful min-h-screen itmes-center justify-center mx-auto max-w-2xl mt-10 mb-10">
      <button
        onClick={() => navigate("/admin/departments")}
        className="flex mt-3 text-left gap-2 text-gray-600 mb-6"
      >
        <ArrowLeft size={18} />
        Back to dashboard
      </button>
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Add New Department
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">

        <div className="flex flex-col">
          <label className="mb-2 font-medium" htmlFor="Department Name">Department Name</label>
          <input
            value={department}
            onChange={(e)=>{
              setDepartment(e.target.value)
            }}
            type="text"
            className="border border-gray-300 rounded-lg p-2" placeholder="e.g., Roads & Infrastructure" />
          {departmentError && <p className='text-red-500 text-sm'>{departmentError}</p>}
        </div>

        {/* Comments */}
        <div>
          <label className="block font-medium text-gray-800 mb-2">
            Description
          </label>
          <textarea
            rows="4"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value)
            }}
            className="w-full border border-gray-300 rounded-lg p-3"
            placeholder="Describe the department's responsibilities..."
          />
          {descriptionError && <p className='text-red-500 text-sm'>{descriptionError}</p>}
        </div>

        {/* Officer Behaviour */}
        <div>
          <label className="block font-medium text-gray-800 mb-2">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value)
            }}
            className="w-full border border-gray-300 rounded-lg p-3"

          >
            <option>Select</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
          {statusError && <p className='text-red-500 text-sm'>{statusError}</p>}
        </div>

        {/* Submit */}
        <div className="gap-4 pt-4 grid grid-cols-1 sm:grid-cols-2">
          <button
            type="submit"
            disabled={loading}
            className={`text-white px-6 py-3 rounded-xl font-medium
                       hover:opacity-90
              ${loading ? "bg-gray-400" : "bg-gradient-to-r from-blue-600 to-teal-500"}
                       `}
          >
            {loading? "adding department" : "Add Department"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/admin/departments")}
            className="border border-gray-300 px-6 py-3 rounded-xl
                       text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewDepartment;
