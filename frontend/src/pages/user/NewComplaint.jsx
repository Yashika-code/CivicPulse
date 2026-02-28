import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Navbar from '../../components/Navbar';
import { ArrowLeft } from "lucide-react";
import { complaintApi } from '../../services/api';

const NewComplaint = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const subCategories = {
    road: ["Potholes", "Broken Road", "Footpath Issue"],
    water: ["No Water Supply", "Water Leakage", "Dirty Water"],
    electricity: ["Street Light Not Working", "Power Fluctuation"],
    sanitation: ["Garbage Not Collected", "Overflowing Dustbins"],
    drainage: ["Blocked Drain", "Sewer Overflow"],
  };

  const validateForm = (form) => {
    const newErrors = {};
    if (!form.title) newErrors.title = "Title is required";
    if (!form.category) newErrors.category = "Please select a category";
    if (!form.subCategory) newErrors.subCategory = "Please select a subcategory";
    if (!form.location) newErrors.location = "Location is required";
    if (!form.description) newErrors.description = "Description is required";
    if (images.length > 3) newErrors.images = "Maximum 3 images allowed";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    const formBody = new FormData();
    formBody.append("title", e.target.title.value.trim());
    formBody.append("category", category);
    formBody.append("subCategory", subCategory);
    formBody.append("location", e.target.location.value.trim());
    formBody.append("description", e.target.description.value.trim());
    images.forEach((img) => {
      formBody.append("images", img);
    });

    const validationErrors = validateForm({
      title: e.target.title.value.trim(),
      category,
      subCategory,
      location: e.target.location.value.trim(),
      description: e.target.description.value.trim(),
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    try {
      const { data } = await complaintApi.create(formBody);
      // you could show success message here using data.message or data.complaint
      navigate("/user/my-complaints");
    } catch (err) {
      console.error(err);
      setErrors({ server: err.response?.data?.message || err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col items-center justify-center'>
      <Navbar />
      <button
        onClick={() => navigate("/user")}
        className="flex mt-3 text-left gap-2 text-gray-600 mb-6"
      >
        <ArrowLeft size={18} />
        Back to dashboard
      </button>

      <div className='text-center mb-5 mt-2'>
        <h1 className='text-2xl font-semibold text-gray-900'>Raise a Complaint</h1>
        <p className='text-sm text-gray-500 mt-1'>
          Help us improve your community by reporting issues
        </p>
      </div>

      <div className='w-full max-w-md bg-white rounded-lg shadow-lg p-8'>
        <form onSubmit={handleSubmit}>

          {/* Title */}
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Title</label>
            <input
              name="title"
              type="text"
              className={`w-full px-4 py-2 border rounded-md ${errors.title ? "border-red-500" : "border-gray-300"}`}
              placeholder="Enter complaint title"
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
          </div>

          {/* Category */}
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Category</label>
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setSubCategory(""); // reset subCategory on category change
              }}
              className={`w-full px-4 py-2 border rounded-md ${errors.category ? "border-red-500" : "border-gray-300"}`}
            >
              <option value="">Select Category</option>
              <option value="road">Road & Infrastructure</option>
              <option value="water">Water Supply</option>
              <option value="electricity">Electricity & Street Lights</option>
              <option value="sanitation">Sanitation & Cleanliness</option>
              <option value="drainage">Drainage & Sewerage</option>
            </select>
            {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
          </div>

          {/* Sub Category */}
          {category && subCategories[category] && (
            <div className='mb-4'>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Sub Category</label>
              <select
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                className={`w-full px-4 py-2 border rounded-md ${errors.subCategory ? "border-red-500" : "border-gray-300"}`}
              >
                <option value="">Select Sub Category</option>
                {subCategories[category].map((item, index) => (
                  <option key={index} value={item}>{item}</option>
                ))}
              </select>
              {errors.subCategory && <p className="text-red-500 text-xs mt-1">{errors.subCategory}</p>}
            </div>
          )}

          {/* Location */}
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Location</label>
            <input
              name="location"
              type="text"
              className={`w-full px-4 py-2 border rounded-md ${errors.location ? "border-red-500" : "border-gray-300"}`}
              placeholder="Street address or landmark"
            />
            {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
          </div>

          {/* Description */}
          <div className='mb-5'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Description</label>
            <textarea
              name="description"
              rows="3"
              className={`w-full px-4 py-2 border rounded-md ${errors.description ? "border-red-500" : "border-gray-300"}`}
              placeholder="Please provide detailed information about the issue"
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
          </div>

          {/* Images */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload Images (optional)</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => setImages(Array.from(e.target.files).slice(0, 3))}
              className={`w-full px-3 py-2 border rounded-md text-sm ${errors.images ? "border-red-500" : "border-gray-300"}`}
            />
            <p className="text-xs text-gray-500 mt-1">Max 3 images, JPG/PNG only</p>
            {errors.images && <p className="text-red-500 text-xs mt-1">{errors.images}</p>}

            {/* Optional image preview */}
            <div className="flex gap-2 mt-2">
              {images.map((img, idx) => (
                <img key={idx} src={URL.createObjectURL(img)} alt="preview" className="h-16 w-16 object-cover rounded" />
              ))}
            </div>
          </div>

          <button
            type='submit'
            disabled={loading}
            className={`w-full py-2 rounded-md font-semibold text-white
    ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}
  `}
          >
            {loading ? "Submitting..." : "Submit Complaint"}
          </button>
        </form>
      </div>

      {/* Help */}
      <div className="px-5 mt-6 mb-6 max-w-md w-full">
        <div className="bg-blue-50 border-l-4 border-blue-500 rounded-md p-4">
          <h3 className="text-blue-900 font-semibold">Note:</h3>
          <p className="text-blue-700 text-sm mt-1">
            All complaints are reviewed by our team. You'll receive updates via email and can track progress in your dashboard.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewComplaint;
