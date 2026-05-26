import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import API from "../../api/axios";

import loginImg from "../../assets/loginimg.png";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  // HANDLE CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,

      [e.target.name]: "",
    });
  };

  // VALIDATION
  const validateForm = () => {
    let newErrors = {};

    // NAME
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    // EMAIL
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Invalid email address";
    }

    // PASSWORD
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    // CONFIRM PASSWORD
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await API.post("/auth/signup", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      toast.success(response.data.message);

      localStorage.setItem(
        "signupData",
         JSON.stringify(formData)
        );

      navigate("/otp");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Signup Failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex justify-center items-center px-4">
      <div className="w-full max-w-5xl min-h-[650px] bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">
        {/* LEFT SIDE */}
        <div className="bg-[#fafafa] flex flex-col justify-between items-center py-10 px-8">
          {/* LOGO */}
          <div className="w-full">
            <h1 className="text-4xl font-bold">
              <span className="bg-orange-500 text-white px-2 rounded-lg">
                V
              </span>
              eloura
            </h1>
          </div>

          {/* IMAGE */}
          <div className="flex justify-center items-center flex-1">
            <img
              src={loginImg}
              alt="signup"
              className="w-[380px] object-contain"
            />
          </div>

          {/* SLIDER */}
          <div className="flex gap-2">
            <div className="w-10 h-2 bg-orange-500 rounded-full"></div>

            <div className="w-3 h-2 bg-orange-200 rounded-full"></div>

            <div className="w-3 h-2 bg-orange-200 rounded-full"></div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex justify-center items-center px-6 py-8">
          <form onSubmit={handleSubmit} className="w-full max-w-[380px]">
            <h1 className="text-4xl font-bold mb-2">Create Account</h1>

            <p className="text-gray-500 text-sm mb-8">
              Please enter your details to sign up
            </p>

            {/* NAME */}
            <div className="mb-4">
              <label className="block mb-2 text-base font-medium">Name</label>

              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none focus:border-orange-500"
              />

              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            {/* EMAIL */}
            <div className="mb-4">
              <label className="block mb-2 text-base font-medium">Email</label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none focus:border-orange-500"
              />

              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* PASSWORD */}
            <div className="mb-4">
              <label className="block mb-2 text-base font-medium">
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none focus:border-orange-500"
              />

              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="mb-6">
              <label className="block mb-2 text-base font-medium">
                Confirm Password
              </label>

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none focus:border-orange-500"
              />

              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-lg py-3 text-sm font-semibold transition mb-6"
            >
              Sign Up
            </button>

            {/* LOGIN */}
            <p className="text-center text-sm text-gray-700">
              Already have an account ?{" "}
              <Link to="/login" className="text-orange-500 font-medium">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
