import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";
import { motion } from "framer-motion";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register({ name, email, password });
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="flex min-h-screen items-center justify-center bg-gray-100 p-6"
    >
      <div className="flex bg-white rounded-lg shadow-xl w-full max-w-4xl overflow-hidden">
        {/* Video Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="hidden md:block w-1/2"
        >
          <video autoPlay loop muted className="w-full h-full object-cover">
            <source
              src="https://cdn.pixabay.com/video/2022/12/30/144779-785282852_large.mp4"
              type="video/mp4"
            />
          </video>
        </motion.div>

        {/* Register Form Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full md:w-1/2 p-8 flex flex-col justify-center"
        >
          <div className="text-center">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
              className="w-24 mx-auto"
              alt="logo"
            />
            <h4 className="text-xl font-semibold mt-2">Join The Energy Team</h4>
          </div>
          <p className="text-center text-gray-600 mt-4">Create a new account</p>
          <form onSubmit={handleRegister} className="mt-6">
            <div className="mb-4">
              <label className="block text-gray-700">Full Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 transition-all duration-300"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email address</label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 transition-all duration-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 transition-all duration-300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
            >
              Register
            </button>
          </form>
          <div className="text-center mt-4">
            <p className="text-gray-600">Already have an account?</p>
            <button
              onClick={() => navigate("/login")}
              className="ml-2 text-blue-500 hover:underline"
            >
              Login
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Register;
