
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import axios from "axios";
import loginImg from "../../assets/loginimg.png";

const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const { data } = await api.post("/api/auth/login", formData);

      toast.success(data.message);

  
      localStorage.setItem("user", JSON.stringify(data.user));

      if (data.user.isBlock) {
        toast.error("User is blocked");
        localStorage.removeItem("user");
        return;
      }

      if (data.user.isAdmin) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex justify-center items-center px-4">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

        <div className="bg-[#ffffff] flex flex-col justify-between items-center py-10 px-8">
          <div className="w-full">
            <h1 className="text-4xl font-bold">
              <span className="bg-orange-500 mr-1 text-white px-2 rounded-lg">V</span>
              eloura
            </h1>
          </div>

          <div className="flex justify-center items-center">
            <img src={loginImg} alt="login" className="w-[380px] object-contain" />
          </div>

          <div className="flex gap-2">
            <div className="w-10 h-2 bg-orange-500 rounded-full"></div>
            <div className="w-3 h-2 bg-orange-200 rounded-full"></div>
            <div className="w-3 h-2 bg-orange-200 rounded-full"></div>
          </div>
        </div>

        <div className="flex justify-center items-center px-8 py-10">
          <form onSubmit={handleSubmit} className="w-full max-w-md">
            <h1 className="text-4xl font-bold mb-3">Welcome Back</h1>
            <p className="text-gray-500 mb-10">Welcome Back! Please enter your details</p>

            <div className="mb-5">
              <label className="block mb-2 text-lg font-medium">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email here"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-4 outline-none focus:border-orange-500"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div className="mb-2">
              <label className="block mb-2 text-lg font-medium">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password here"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-4 outline-none focus:border-orange-500"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            <div className="text-right mb-10">
              <button type="button" className="text-gray-700 hover:text-orange-500">
                Forgot Password ?
              </button>
            </div>

            <div className="flex gap-4 mb-10">
              <button
                type="button"
                className="flex-1 border border-gray-300 rounded-xl py-3 flex justify-center items-center gap-3 hover:bg-gray-100 transition"
              >
                <FcGoogle size={24} />
                <span className="font-medium">Google</span>
              </button>

              <button
                type="submit"
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white rounded-xl py-3 font-semibold transition"
              >
                Login
              </button>
            </div>

            <p className="text-center text-gray-700">
              Don't have an account?{" "}
              <Link to="/signup" className="text-orange-500 font-medium">Sign up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;