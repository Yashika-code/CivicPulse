import React, { useEffect, useState } from 'react'
import { Navigate } from "react-router-dom"

const decodeJwt = (token) => {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      console.warn("Invalid JWT Format : expected 3 parts");
      return null;
    }

    const payload = parts[1];
    const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));

    return JSON.parse(decoded);

  } catch (error) {
    console.error("JWT decoded error : ", error);
    return null;
  }
}

const isTokenValid = (token) => {
  const decoded = decodedJwt(token);

  if (!decoded) {
    console.warn("Failed to decoded token");
    return false;
  }

  if (decoded.exp && decoded.exp < Date.now() / 1000) {
    console.warn("Token has expired");
    return false;
  }
  return true;
}
const ProtectedRoute = ({ children, role }) => {
  const [isLoading,setIsLoading]=useState(true);
  const [isAuthorized,setIsAuthorized]=useState(false);

  useEffect(()=>{
    const validateAddress=()=>{
      const token=localStorage.getItem("token");
      if(!token){
        console.log("No token found");
        setIsAuthorized(false);
        setIsLoading(false);
        return;
      }

      if(!isTokenValid(token)){
        console.log("Token invalid or expired");
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("userId");
        setIsAuthorized(false);
        setIsLoading(false);
      }

      const decoded=decodeJwt(token);
      if(!decoded || !decoded.role){
        console.log("No role found in token");
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setIsAuthorized(false);
        setIsLoading(false);
        return;
      }

      if(rolw && decoded.role!==role){
        console.log(`Role mismatch : user has "${decoded.role}", route required "${role}"`);
        setIsAuthorized(false);
        setIsLoading(false);
        return;
      }

      console.log(`Access granted for role: ${decoded.role}`);
      setIsAuthorized(true);
      setIsLoading(false);
    }
    validateAddress();
  },[role]);

  if(isLoading){
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Verifying access...</p>
        </div>
      </div>
    );
  }

  if(isAuthorized){
    return <Navigate to="/" replace />;
  }

  return <>{children}</>
}

export default ProtectedRoute