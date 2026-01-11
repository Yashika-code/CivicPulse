import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { ArrowLeft, FileText, Clock, CheckCircle } from "lucide-react";

const ComplaintDetails = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Back */}
        <button
          onClick={() => navigate("/complaints")}
          className="flex items-center gap-2 text-gray-600 mb-6"
        >
          <ArrowLeft size={18} />
          Back to My Complaints
        </button>

        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">
              Pothole near community center
            </h1>
            <p className="text-gray-500 mt-2">Complaint ID: #2</p>
          </div>

          <button
          onClick={()=>navigate("/giveFeedback")}
            className="flex items-center gap-2
                       bg-gradient-to-r from-blue-600 to-teal-500
                       text-white px-6 py-3 rounded-xl
                       font-medium shadow-md hover:opacity-90"
          >
            Give Feedback
          </button>
        </div>

        {/* Timeline Card */}
        <div className="bg-white rounded-2xl shadow-sm p-8 w-full">
          <h2 className="text-lg font-semibold text-gray-800 mb-8">
            Status Timeline
          </h2>

          <div className="relative pl-10">
            {/* vertical line */}
            <div className="absolute left-[60px] top-0 h-full w-[2px] bg-teal-500" />

            {/* item 1 */}
            <TimelineItem
              icon={<FileText size={18} />}
              title="Complaint Submitted"
              time="Dec 22, 2025, 05:30 AM"
              color="bg-blue-600"
            />

            {/* item 2 */}
            <TimelineItem
              icon={<Clock size={18} />}
              title="Under Review"
              time="Dec 23, 2025, 05:30 AM"
              extra="Assigned to: John Smith"
              color="bg-blue-600"
            />

            {/* item 3 */}
            <TimelineItem
              icon={<CheckCircle size={18} />}
              title="Resolved"
              time="Dec 26, 2025, 05:30 AM"
              color="bg-teal-600"
              last
            />
          </div>
        </div>
      </div>

      {/* div A */}
      {/* CONTENT SECTION */}
      <div className="max-w-6xl mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-6">

            {/* Description */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">
                Description
              </h2>
              <p className="text-gray-600 leading-relaxed">
                There is a large pothole on the main road near the community center
                entrance. It has been causing issues for vehicles and poses a safety
                risk, especially during rainy weather.
              </p>
            </div>

            {/* Images */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Attached Images
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="h-40 rounded-xl bg-gray-100"></div>
                <div className="h-40 rounded-xl bg-gray-100"></div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-6">

            {/* Details */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-5">
                Details
              </h2>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <FileText className="text-blue-600" size={18} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Category</p>
                    <p className="text-gray-800 font-medium">Road</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-teal-50 rounded-lg">
                    <Clock className="text-teal-600" size={18} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="text-gray-800 font-medium">
                      123 Main Street, Near Community Center
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-yellow-50 rounded-lg">
                    <CheckCircle className="text-yellow-600" size={18} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Submitted</p>
                    <p className="text-gray-800 font-medium">
                      Dec 22, 2025, 05:30 AM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Priority */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">
                Priority Level
              </h2>
              <span className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-red-100 text-red-600">
                High
              </span>
            </div>
          </div>
        </div>

        {/* HELP BOX */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-4 text-blue-700 text-sm">
          <strong>Need Assistance?</strong> If you have questions about this complaint,
          please contact our support team at support@civicpulse.gov
        </div>
      </div>
    </div>
  );
};

const TimelineItem = ({ icon, title, time, extra, color, last }) => (
  <div className={`flex gap-6 ${!last && "mb-10"}`}>
    <div
      className={`z-10 flex items-center justify-center
                  w-11 h-11 rounded-full text-white ${color}`}
    >
      {icon}
    </div>

    <div>
      <h3 className="text-gray-900 font-medium">{title}</h3>
      <p className="text-gray-500 text-sm mt-1">{time}</p>
      {extra && (
        <p className="text-gray-500 text-sm mt-1">{extra}</p>
      )}
    </div>
  </div>
);

export default ComplaintDetails;
