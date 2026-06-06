import { useState } from "react";
import { Eye, EyeOff, Lock, CheckCircle2 } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

function PasswordSection() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [show, setShow] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const [loading, setLoading] = useState(false);

  const toggleShow = (field) =>
    setShow((prev) => ({ ...prev, [field]: !prev[field] }));

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const getStrength = (pwd) => {
    if (!pwd) return { score: 0, label: "", color: "" };
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    const map = [
      { label: "", color: "" },
      { label: "Weak", color: "bg-red-400" },
      { label: "Fair", color: "bg-yellow-400" },
      { label: "Good", color: "bg-blue-400" },
      { label: "Strong", color: "bg-green-500" },
    ];
    return { score, ...map[score] };
  };

  const strength = getStrength(form.newPassword);

  const handleSubmit = async () => {
    if (!form.currentPassword || !form.newPassword || !form.confirmPassword) {
      return toast.error("Please fill all fields");
    }
    if (form.newPassword !== form.confirmPassword) {
      return toast.error("New passwords do not match");
    }
    if (form.newPassword.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }
    try {
      setLoading(true);
      const { data } = await api.put("/api/user/change-password", {
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });
      toast.success(data.message || "Password updated successfully");
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name: "currentPassword", label: "Current Password" },
    { name: "newPassword", label: "New Password" },
    { name: "confirmPassword", label: "Confirm New Password" },
  ];

  return (
    <div className="bg-white rounded-2xl border border-[#e8e0da] p-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-full bg-[#fff3eb] flex items-center justify-center">
          <Lock size={18} className="text-[#f57c20]" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Change Password</h2>
          <p className="text-xs text-gray-400 mt-0.5">Update your account password</p>
        </div>
      </div>

      <div className="max-w-md flex flex-col gap-5">
        {fields.map(({ name, label }) => (
          <div key={name}>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
              {label}
            </label>
            <div className="relative">
              <input
                type={show[name] ? "text" : "password"}
                name={name}
                value={form[name]}
                onChange={handleChange}
                placeholder={`Enter ${label.toLowerCase()}`}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 pr-10 text-sm text-gray-800 focus:outline-none focus:border-[#f57c20] transition-colors placeholder-gray-300"
              />
              <button
                type="button"
                onClick={() => toggleShow(name)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition"
              >
                {show[name] ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {/* Strength bar only under new password */}
            {name === "newPassword" && form.newPassword && (
              <div className="mt-2">
                <div className="flex gap-1 h-1 mb-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-full transition-all ${
                        i <= strength.score ? strength.color : "bg-gray-100"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-400">
                  Strength:{" "}
                  <span
                    className={`font-medium ${
                      strength.score <= 1
                        ? "text-red-400"
                        : strength.score === 2
                        ? "text-yellow-500"
                        : strength.score === 3
                        ? "text-blue-500"
                        : "text-green-500"
                    }`}
                  >
                    {strength.label}
                  </span>
                </p>
              </div>
            )}

            {/* Match indicator under confirm */}
            {name === "confirmPassword" && form.confirmPassword && (
              <p
                className={`text-xs mt-1.5 flex items-center gap-1 ${
                  form.newPassword === form.confirmPassword
                    ? "text-green-500"
                    : "text-red-400"
                }`}
              >
                {form.newPassword === form.confirmPassword ? (
                  <><CheckCircle2 size={12} /> Passwords match</>
                ) : (
                  "Passwords do not match"
                )}
              </p>
            )}
          </div>
        ))}

        <div className="flex gap-3 pt-2">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 bg-[#1e293b] text-white py-3 rounded-lg text-sm font-medium hover:bg-[#f57c20] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
          <button
            onClick={() => setForm({ currentPassword: "", newPassword: "", confirmPassword: "" })}
            className="px-5 border border-gray-200 text-gray-500 rounded-lg text-sm hover:border-gray-400 transition-colors"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}

export default PasswordSection;