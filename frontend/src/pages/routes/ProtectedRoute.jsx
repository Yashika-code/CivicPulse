import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const isTokenValid = (token) => {
  try {
    const decoded = jwtDecode(token);

    if (!decoded) return false;

    if (decoded.exp && decoded.exp < Date.now() / 1000) {
      console.warn("Token expired");
      return false;
    }

    return true;
  } catch (err) {
    console.error("Invalid token", err);
    return false;
  }
};

const ProtectedRoute = ({ children, role }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const validateAccess = () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsAuthorized(false);
        setIsLoading(false);
        return;
      }

      if (!isTokenValid(token)) {
        localStorage.clear();
        setIsAuthorized(false);
        setIsLoading(false);
        return;
      }

      const decoded = jwtDecode(token);

      if (role && decoded.role !== role) {
        console.warn(`Role mismatch: ${decoded.role} ≠ ${role}`);
        setIsAuthorized(false);
        setIsLoading(false);
        return;
      }

      setIsAuthorized(true);
      setIsLoading(false);
    };

    validateAccess();
  }, [role]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Verifying access...</p>
      </div>
    );
  }

  // ❗ Correct logic
  if (!isAuthorized) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
