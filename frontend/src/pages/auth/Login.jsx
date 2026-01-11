import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");

    let hasError = false;

    if (!email.trim()) {
      setEmailError("Email is required");
      hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Enter a valid email address");
      hasError = true;
    }

    if (!password) {
      setPasswordError("Password is required");
      hasError = true;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      hasError = true;
    }

    if (hasError) return;

    setLoading(true);

    setTimeout(() => {
      console.log("Login Success:", email);
      setLoading(false);
      navigate("/user");
    }, 1000);
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-20 flex items-center justify-center px-4'>
      <div className='w-full max-w-md bg-white rounded-lg shadow-lg p-8'>
        <h1 className='text-xl font-semibold mb-6'>Citizen Login</h1>

        <form onSubmit={handleSubmit}>
          <div className='mb-`  4'>
            <label>Email Address</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='you@example.com'
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            {emailError && <p className='text-red-500 text-sm'>{emailError}</p>}
          </div>

          <div className='mb-5'>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Min. 6 characters'
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            {passwordError && <p className='text-red-500 text-sm'>{passwordError}</p>}
          </div>

          <button
            disabled={loading}
            className={`w-full py-2 cursor-pointer text-white rounded-md ${
              loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className='text-sm text-center mt-3'>
          Don't have an account?
          <button onClick={() => navigate("/register")} className='text-blue-600 cursor-pointer ml-1'>
            Register here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
