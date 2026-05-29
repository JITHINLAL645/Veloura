import { LogOut, Settings } from "lucide-react";

import { useState, useRef, useEffect } from "react";

import { useNavigate } from "react-router-dom";

function SettingsDropdown() {
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");

    navigate("/login");
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-5 py-4 rounded-xl hover:bg-[#ead8ca] transition font-medium"
      >
        <Settings size={20} />
        Settings
      </button>

      {open && (
        <div className="absolute bottom-16 left-0 w-full bg-white border border-gray-200 rounded-2xl shadow-xl p-3">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 text-red-500 transition font-medium"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default SettingsDropdown;