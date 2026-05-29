import { Outlet } from "react-router-dom";

import AdminSidebar from "../components/Admin/AdminSidebar";

function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-[#f5f5f5]">
      
      <AdminSidebar />

      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;