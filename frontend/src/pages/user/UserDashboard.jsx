import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  Plus, 
  List, 
  Shield, 
  TrendingUp,
  MessageSquare,
  ArrowRight,
  Calendar,
  MapPin,
  AlertTriangle
} from 'lucide-react'
import Navbar from '../../components/Navbar'
import CountUp from 'react-countup';
import { complaintApi } from '../../services/api';

const UserDashboard = () => {
  const navigate = useNavigate()
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    resolved: 0,
    inProgress: 0
  });
  const [recentComplaints, setRecentComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const { data } = await complaintApi.getMy();
        
        const total = data.length;
        const resolved = data.filter((c) => c.status === 'resolved').length;
        const pending = data.filter((c) => c.status === 'pending').length;
        const inProgress = data.filter((c) => c.status === 'in_progress').length;
        
        setStats({ total, pending, resolved, inProgress });
        
        // Get recent complaints for the activity feed
        const sorted = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setRecentComplaints(sorted.slice(0, 3));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const getStatusColor = (status) => {
    switch(status) {
      case 'resolved': return 'text-green-600 bg-green-100';
      case 'in_progress': return 'text-blue-600 bg-blue-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'resolved': return <CheckCircle className="w-4 h-4" />;
      case 'in_progress': return <Clock className="w-4 h-4" />;
      case 'pending': return <AlertTriangle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navbar />

      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 animate-pulse"></div>
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"></div>
      <div className="absolute top-40 right-20 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"></div>

      {/* Main Container */}
      <div className="relative max-w-7xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                Welcome back!
              </h1>
              <p className="text-gray-600 mt-2 text-lg">
                Track and manage your civic complaints with ease
              </p>
            </div>
            <div className="hidden lg:flex items-center gap-4 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-xl border border-white/50">
              <Shield className="w-6 h-6 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Secure Platform</p>
                <p className="text-xs text-gray-500">Your data is protected</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
                  <FileText className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Complaints</p>
                  <h3 className="text-3xl font-bold text-gray-900">
                    <CountUp end={stats.total} duration={2} />
                  </h3>
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-xl flex items-center justify-center">
                  <Clock className="w-8 h-8 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <h3 className="text-3xl font-bold text-gray-900">
                    <CountUp end={stats.pending} duration={2} />
                  </h3>
                </div>
              </div>
              <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center">
                  <Clock className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">In Progress</p>
                  <h3 className="text-3xl font-bold text-gray-900">
                    <CountUp end={stats.inProgress} duration={2} />
                  </h3>
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <ArrowRight className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Resolved</p>
                  <h3 className="text-3xl font-bold text-gray-900">
                    <CountUp end={stats.resolved} duration={2} />
                  </h3>
                </div>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Quick Actions */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Plus className="w-6 h-6 text-blue-600" />
              Quick Actions
            </h2>

            <div className="grid grid-cols-1 gap-4">
              <button
                onClick={() => navigate('/user/new-complaint')}
                className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-colors">
                      <Plus className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg font-semibold">Raise New Complaint</h3>
                      <p className="text-blue-100 text-sm">Report an issue in your community</p>
                    </div>
                  </div>
                  <ArrowRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </button>

              <button
                onClick={() => navigate('/user/my-complaints')}
                className="group border-2 border-gray-200 hover:border-blue-300 p-6 rounded-xl transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                      <List className="w-6 h-6 text-gray-600 group-hover:text-blue-600" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg font-semibold text-gray-900">My Complaints</h3>
                      <p className="text-gray-600 text-sm">View all your submitted complaints</p>
                    </div>
                  </div>
                  <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </div>
              </button>

              <button
                onClick={() => navigate('/giveFeedback')}
                className="group border-2 border-gray-200 hover:border-purple-300 p-6 rounded-xl transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-purple-100 transition-colors">
                      <MessageSquare className="w-6 h-6 text-gray-600 group-hover:text-purple-600" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg font-semibold text-gray-900">Give Feedback</h3>
                      <p className="text-gray-600 text-sm">Share your experience with us</p>
                    </div>
                  </div>
                  <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-purple-600 transition-colors" />
                </div>
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
            
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : recentComplaints.length > 0 ? (
              <div className="space-y-4">
                {recentComplaints.map((complaint) => (
                  <div key={complaint._id} className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-sm mb-1">
                          {complaint.title}
                        </h3>
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(complaint.status)}`}>
                            {getStatusIcon(complaint.status)}
                            {complaint.status.replace('_', ' ')}
                          </span>
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {complaint.location}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600">
                          {new Date(complaint.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <button
                        onClick={() => navigate(`/user/complaint/${complaint._id}`)}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        View
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => navigate('/user/my-complaints')}
                  className="w-full text-center text-blue-600 hover:text-blue-700 text-sm font-medium py-2"
                >
                  View All Complaints →
                </button>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-600">No complaints yet. Start by raising your first complaint!</p>
              </div>
            )}
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2">Need Help?</h3>
              <p className="text-blue-100 mb-4">
                Our team reviews all complaints within 24–48 hours.
                You'll receive updates via email and can track progress in real-time.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => navigate("/contact-support")}
                  className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  Contact Support
                </button>
                <button
                  onClick={() => navigate("/giveFeedback")}
                  className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300"
                >
                  Give Feedback
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Shield className="w-5 h-5" />
                  <span className="font-semibold">Secure</span>
                </div>
                <p className="text-sm text-blue-100">Your data is protected with industry-leading security</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="w-5 h-5" />
                  <span className="font-semibold">Fast</span>
                </div>
                <p className="text-sm text-blue-100">Average response time of 24 hours</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-semibold">Tracked</span>
                </div>
                <p className="text-sm text-blue-100">Real-time updates on your complaint status</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <MessageSquare className="w-5 h-5" />
                  <span className="font-semibold">Connected</span>
                </div>
                <p className="text-sm text-blue-100">Direct communication with departments</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default UserDashboard;
