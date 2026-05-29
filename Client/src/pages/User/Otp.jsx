
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import loginImg from "../../assets/loginimg.png";

const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

function Otp() {
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const email = localStorage.getItem("signupEmail");

  const validateOtp = () => {
    if (!otp.trim()) {
      setError("OTP is required");
      return false;
    }
    if (!/^\d{6}$/.test(otp)) {
      setError("OTP must be 6 digits");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateOtp()) return;

    if (!email) {
      toast.error("Session expired. Please sign up again.");
      navigate("/signup");
      return;
    }

    try {
      setLoading(true);

      const { data } = await api.post("/api/auth/verify-otp", { email, otp });

      toast.success(data.message);

      localStorage.setItem("user", JSON.stringify(data.user));

      localStorage.removeItem("signupEmail");

      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message || "OTP Verification Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex justify-center items-center px-4">
      <div className="w-full max-w-5xl min-h-[650px] bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

        <div className="bg-[#fafafa] flex flex-col justify-between items-center py-10 px-8">

          <div className="w-full">
            <h1 className="text-4xl font-bold">
              <span className="bg-orange-500 text-white px-2 rounded-lg">V</span>
              eloura
            </h1>
          </div>

          <div className="flex justify-center items-center flex-1">
            <img src={loginImg} alt="otp" className="w-[380px] object-contain" />
          </div>

          <div className="flex gap-2">
            <div className="w-10 h-2 bg-orange-500 rounded-full"></div>
            <div className="w-3 h-2 bg-orange-200 rounded-full"></div>
            <div className="w-3 h-2 bg-orange-200 rounded-full"></div>
          </div>
        </div>

        <div className="flex justify-center items-center px-6 py-10">
          <form onSubmit={handleSubmit} className="w-full max-w-[380px]">

            <h1 className="text-4xl font-bold mb-2">Verify OTP</h1>

            <p className="text-gray-500 text-sm mb-10">
              Enter the 6 digit OTP sent to your email
            </p>

            <div className="mb-6">
              <label className="block mb-2 text-base font-medium">OTP</label>
              <input
                type="text"
                placeholder="Enter your OTP"
                value={otp}
                maxLength={6}
                onChange={(e) => {
                  setOtp(e.target.value.replace(/\D/g, ""));
                  setError("");
                }}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none focus:border-orange-500"
              />
              {error && (
                <p className="text-red-500 text-xs mt-1">{error}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white rounded-lg py-3 text-sm font-semibold transition mb-6"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

            <p className="text-center text-sm text-gray-600 leading-6">
              OTP sent to <br />
              <span className="font-medium text-black">{email}</span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Otp;