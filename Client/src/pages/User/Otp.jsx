import { useState } from "react";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import API from "../../api/axios";

import loginImg from "../../assets/loginimg.png";

function Otp() {
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");

  const [error, setError] = useState("");

  const signupData = JSON.parse(
  localStorage.getItem("signupData")
);

const email = signupData?.email;

  // VALIDATION
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

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateOtp()) return;

    try {
      const response = await API.post(
        "/auth/verify-otp",
        {
          email,
          otp,
        }
      );

      toast.success(response.data.message);

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      navigate("/");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "OTP Verification Failed"
      );
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
              alt="otp"
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
        <div className="flex justify-center items-center px-6 py-10">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-[380px]"
          >
            <h1 className="text-4xl font-bold mb-2">
              Verify OTP
            </h1>

            <p className="text-gray-500 text-sm mb-10">
              Enter the 6 digit OTP sent to your email
            </p>

            {/* OTP INPUT */}
            <div className="mb-6">
              <label className="block mb-2 text-base font-medium">
                OTP
              </label>

              <input
                type="text"
                placeholder="Enter your OTP"
                value={otp}
                maxLength={6}
                onChange={(e) => {
                  setOtp(e.target.value);

                  setError("");
                }}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none focus:border-orange-500"
              />

              {error && (
                <p className="text-red-500 text-xs mt-1">
                  {error}
                </p>
              )}
            </div>

            {/* VERIFY BUTTON */}
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-lg py-3 text-sm font-semibold transition mb-6"
            >
              Verify OTP
            </button>

            {/* EMAIL TEXT */}
            <p className="text-center text-sm text-gray-600 leading-6">
              OTP sent to <br />

              <span className="font-medium text-black">
                {email}
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Otp;