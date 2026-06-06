import { useState, useEffect } from "react";
import { Users, UserCheck, UserX, Package, ChevronLeft } from "lucide-react"; // ← add Package
import axiosInstance from "../../api/axios";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    blockedUsers: 0,
    activeUsers: 0,
    totalProducts: 0,   // ← add this
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axiosInstance.get("/admin/dashboard-stats");
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const cards = [
    { label: "Users",          value: stats.totalUsers,    icon: Users     },
    { label: "Blocked Users",  value: stats.blockedUsers,  icon: UserX     },
    { label: "Active Users",   value: stats.activeUsers,   icon: UserCheck },
    { label: "Total Products", value: stats.totalProducts, icon: Package   }, // ← add this
  ];

  return (
    <div className="min-h-screen">
      <div className="h-[90px] bg-[#f5f5f5] flex items-center justify-between px-10">
        <div className="flex items-center gap-3">
          <ChevronLeft size={28} />
          <h1 className="text-4xl font-semibold">Dashboard</h1>
        </div>
        <div className="w-14 h-14 rounded-full flex justify-center items-center" />
      </div>

      <div className="p-10">
        <div className="mb-12">
          {/* <h2 className="text-3xl font-semibold mb-2">Good Morning</h2> */}
          {/* <p className="text-gray-500 text-lg">Here is the Shop dashboard</p> */}
        </div>

        {/* 4 cards — switch to grid-cols-4 on large screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
            >
              <div className="flex justify-between items-center px-6 py-5 border-b border-gray-200">
                <h3 className="text-xl font-semibold">{label}</h3>
                <Icon size={20} />
              </div>
              <div className="flex justify-center items-center py-12">
                {loading ? (
                  <div className="w-10 h-10 border-4 border-gray-200 border-t-black rounded-full animate-spin" />
                ) : (
                  <h1 className="text-5xl font-bold">{value}</h1>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;