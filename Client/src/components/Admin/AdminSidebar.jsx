import {
  LayoutDashboard,
  Users,
  Package,
} from "lucide-react";

import { NavLink } from "react-router-dom";

import SettingsDropdown from "../../components/Admin/SettingsDropdown";

function AdminSidebar() {
  return (
    <div className="w-[260px] min-h-screen bg-[#f3e5da] border-r border-gray-300 flex flex-col justify-between">

      <div>

        <div className="px-8 py-8 border-b border-gray-300">
          <h1 className="text-4xl font-bold">
            <span className="bg-orange-500 text-white px-2 rounded-lg mr-1">
              V
            </span>
            eloura
          </h1>
        </div>

        <div className="px-5 py-8 flex flex-col gap-3">

          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-5 py-4 rounded-xl transition font-medium ${
                isActive
                  ? "bg-[#efc9ab]"
                  : "hover:bg-[#ead8ca]"
              }`
            }
          >
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>

          <NavLink
            to="/adminUsers"
            className={({ isActive }) =>
              `flex items-center gap-3 px-5 py-4 rounded-xl transition font-medium ${
                isActive
                  ? "bg-[#efc9ab]"
                  : "hover:bg-[#ead8ca]"
              }`
            }
          >
            <Users size={20} />
            All Users
          </NavLink>

          <NavLink
            to="/admin/products"
            className={({ isActive }) =>
              `flex items-center gap-3 px-5 py-4 rounded-xl transition font-medium ${
                isActive
                  ? "bg-[#efc9ab]"
                  : "hover:bg-[#ead8ca]"
              }`
            }
          >
            <Package size={20} />
            Products
          </NavLink>
        </div>
      </div>

      <div className="border-t border-gray-300 px-5 py-6">
        <SettingsDropdown />
      </div>
    </div>
  );
}

export default AdminSidebar;