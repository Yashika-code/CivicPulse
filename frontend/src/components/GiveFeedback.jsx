import React, { useState } from "react";
import { Star } from "lucide-react";

const GiveFeedback = () => {
  const [rating, setRating] = useState(0);
  const [resolution, setResolution] = useState("");
  const [comment, setComment] = useState("");
  const [behavior, setBehavior] = useState("");
  const [reopen, setReopen] = useState(false);
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!rating) newErrors.rating = "Rating is required";
    if (!resolution) newErrors.resolution = "Please select resolution status";
    if ((rating <= 2 || resolution === "Not Resolved") && !comment) {
      newErrors.comment = "Comment is required for low rating";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const payload = {
      rating,
      resolution,
      comment,
      behavior,
      reopen,
      image,
    };

    console.log("Feedback Submitted:", payload);
    alert("Feedback submitted successfully!");
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-8 w-ful min-h-screen itmes-center justify-center mx-auto max-w-2xl mt-10 mb-10">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Give Feedback
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Rating */}
        <div>
          <label className="block font-medium text-gray-800 mb-2">
            How satisfied are you? *
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={28}
                className={`cursor-pointer ${
                  star <= rating
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
          {errors.rating && (
            <p className="text-red-500 text-sm mt-1">{errors.rating}</p>
          )}
        </div>

        {/* Resolution */}
        <div>
          <label className="block font-medium text-gray-800 mb-2">
            Was the issue resolved? *
          </label>
          <div className="flex gap-6">
            {["Resolved", "Partially Resolved", "Not Resolved"].map((item) => (
              <label key={item} className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="resolution"
                  value={item}
                  checked={resolution === item}
                  onChange={(e) => setResolution(e.target.value)}
                />
                {item}
              </label>
            ))}
          </div>
          {errors.resolution && (
            <p className="text-red-500 text-sm mt-1">{errors.resolution}</p>
          )}
        </div>

        {/* Comments */}
        <div>
          <label className="block font-medium text-gray-800 mb-2">
            Comments / Feedback
          </label>
          <textarea
            rows="4"
            className="w-full border border-gray-300 rounded-lg p-3"
            placeholder="Share your experience or issues..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          {errors.comment && (
            <p className="text-red-500 text-sm mt-1">{errors.comment}</p>
          )}
        </div>

        {/* Officer Behaviour */}
        <div>
          <label className="block font-medium text-gray-800 mb-2">
            Officer Behaviour (optional)
          </label>
          <select
            className="w-full border border-gray-300 rounded-lg p-3"
            value={behavior}
            onChange={(e) => setBehavior(e.target.value)}
          >
            <option value="">Select</option>
            <option>Very Professional</option>
            <option>Professional</option>
            <option>Neutral</option>
            <option>Unprofessional</option>
          </select>
        </div>

        {/* Upload */}
        <div>
          <label className="block font-medium text-gray-800 mb-2">
            Upload proof (optional)
          </label>
          <input className="border w-full rounded-lg p-3 border-gray-300 text-gray-500"
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        {/* Reopen */}
        {(rating <= 2 || resolution === "Not Resolved") && (
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={reopen}
              onChange={(e) => setReopen(e.target.checked)}
            />
            <span className="text-sm text-gray-700">
              I want to reopen this complaint
            </span>
          </div>
        )}

        {/* Submit */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-teal-500
                       text-white px-6 py-3 rounded-xl font-medium
                       hover:opacity-90"
          >
            Submit Feedback
          </button>

          <button
            type="button"
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

export default GiveFeedback;
