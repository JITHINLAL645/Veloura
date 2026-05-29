import { User, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

function ProfileDropdown({ isOpen, onLogout }) {
  return (
    <div
      className={`
        absolute right-0 top-14 w-52 bg-white rounded-2xl shadow-2xl
        border border-gray-100 overflow-hidden z-50
        transition-all duration-300
        ${isOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"}
      `}
    >
      <Link
        to="/profile"
        className="flex items-center gap-3 px-5 py-4 hover:bg-gray-50 transition"
      >
        <div className="w-9 h-9 rounded-full bg-[#f6e3ba] flex items-center justify-center">
          <User size={18} className="text-black" />
        </div>

        <div>
          <p className="text-sm font-semibold text-gray-800">Profile</p>
          <p className="text-xs text-gray-500">Manage account</p>
        </div>
      </Link>

      <div className="border-t border-gray-100"></div>

      <button
        onClick={onLogout}
        className="w-full flex items-center gap-3 px-5 py-4 hover:bg-red-50 transition text-left"
      >
        <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center">
          <LogOut size={18} className="text-red-500" />
        </div>

        <div>
          <p className="text-sm font-semibold text-red-500">Logout</p>
          <p className="text-xs text-gray-500">Sign out account</p>
        </div>
      </button>
    </div>
  );
}

export default ProfileDropdown;