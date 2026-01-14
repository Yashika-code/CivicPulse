import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./pages/routes/ProtectedRoute";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import AdminDashboard from "./pages/admin/adminDashboard"
import Departments from "./pages/admin/Departments"
import Reports from "./pages/admin/Reports"
import Users from "./pages/admin/Users"

import ComplaintDetails from "./pages/department/ComplaintDetails"
import Complaints from "./pages/department/DepartmentComplaints"
import OfficerDashboard from "./pages/department/OfficerDashboard"

import MyComplaints from "./pages/user/MyComplaints"
import NewComplaint from "./pages/user/NewComplaint"
import UserDashboard from "./pages/user/userDashboard"
import ComplaintDetailsUser from './pages/user/ComplaintDetailsUser';
import NotFound from "./pages/NotFound"
import GiveFeedback from './components/GiveFeedback';
import NewDepartment from './components/NewDepartment';
const App = () => {
    return (
        <Routes>
            {/* Public */}
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/giveFeedback" element={<GiveFeedback />} />

            {/* user */}
            <Route path="/user" element={ 
                <ProtectedRoute role="citizen">
                    <UserDashboard />
                </ProtectedRoute>} />
            <Route path="/user/new-Complaint" element={
                <ProtectedRoute role="citizen">
                    <NewComplaint />
                </ProtectedRoute>
                } />
            <Route path="/user/my-Complaints" element={
                <ProtectedRoute role="citizen">
                    <MyComplaints />
                </ProtectedRoute>
                } />
            <Route path="/user/complaint/:id" element={
                <ProtectedRoute role="citizen">
                    <ComplaintDetailsUser />
                </ProtectedRoute>
                }/>

            {/* officer */}
            <Route path="/officer" element={
                <ProtectedRoute role="officer">
                    <OfficerDashboard />
                </ProtectedRoute>
                } />
            <Route path="/officer/Complaints" element={
                <ProtectedRoute role="officer">
                    <Complaints />
                </ProtectedRoute>
                } />
            <Route path="/officer/complaint/:id" element={
                <ProtectedRoute role="officer">
                    <ComplaintDetails />
                </ProtectedRoute>
                } />

            {/* admin */}
            <Route path="/admin" element={
                <ProtectedRoute role="officer">
                    <AdminDashboard />
                </ProtectedRoute>
                } />
            <Route path="admin/department/addDepartment" element={
                <ProtectedRoute role="admin">
                    <NewDepartment />
                </ProtectedRoute>
                } />
            <Route path="/admin/departments" element={
                <ProtectedRoute role="admin">
                    <Departments />
                </ProtectedRoute>
                } />
            <Route path="/admin/reports" element={
                <ProtectedRoute role="admin">
                    <Reports />
                </ProtectedRoute>
                } />
            <Route path="/admin/users" element={
                <ProtectedRoute role="admin">
                    <Users />
                </ProtectedRoute>
                } />

            {/* 404 Not Found */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default App;