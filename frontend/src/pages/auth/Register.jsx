import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email";
    if (!password || password.length < 6)
      newErrors.password = "Password must be 6+ chars";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    setTimeout(() => {
      console.log("Registered:", name, email);
      setLoading(false);
      navigate("/");
    }, 1000);
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-20 flex items-center justify-center px-4'>
      <div className='w-full max-w-md bg-white p-8 rounded-lg shadow'>
        <h1 className='text-xl font-semibold mb-6'>Citizen Registration</h1>

        <form onSubmit={handleSubmit}>
            
            <div className='mb-4'>
            <label>Full Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='John Doe'
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            {errors.name && <p className='text-red-500 text-sm'>{errors.name}</p>}
          </div>

            <div className='mb-4'>
            <label>Email Address</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='you@example.com'
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            {errors.email && <p className='text-red-500 text-sm'>{errors.email}</p>}
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
            {errors.password && <p className='text-red-500 text-sm'>{errors.password}</p>}
          </div>

          <button
            disabled={loading}
            className={`w-full py-2 cursor-pointer text-white rounded-md ${
              loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Registering in..." : "Register"}
          </button>
          <p className='text-sm text-center mt-3'>
          Already have an account?
          <button onClick={() => navigate("/")} className='text-blue-600 cursor-pointer ml-1'>
            Login here
          </button>
        </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
