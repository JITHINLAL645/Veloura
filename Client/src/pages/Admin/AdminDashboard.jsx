import {
  Users,
  UserCheck,
  UserX,
  ChevronLeft,
  CalendarDays,
} from "lucide-react";

function AdminDashboard() {
  return (
    <div className="min-h-screen">

      <div className="h-[90px]   bg-[#f5f5f5] flex items-center justify-between px-10">

        <div className="flex items-center gap-3">
          <ChevronLeft size={28} />

          <h1 className="text-4xl font-semibold">
            Dashboard
          </h1>
        </div>

        <div className="w-14 h-14  rounded-full flex justify-center items-center">
        </div>
      </div>

      <div className="p-10">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-12">

          <div>
            <h2 className="text-3xl font-semibold mb-2">
              Good Morning
            </h2>

            <p className="text-gray-500 text-lg">
              Here is the Shop dashboard
            </p>
          </div>

          
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

            <div className="flex justify-between items-center px-6 py-5 border-b border-gray-200">
              <h3 className="text-xl font-semibold">
                Users
              </h3>

              <Users size={20} />
            </div>

            <div className="flex justify-center items-center py-12">
              <h1 className="text-5xl font-bold">
                120
              </h1>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

            <div className="flex justify-between items-center px-6 py-5 border-b border-gray-200">
              <h3 className="text-xl font-semibold">
                Blocked Users
              </h3>

              <UserX size={20} />
            </div>

            <div className="flex justify-center items-center py-12">
              <h1 className="text-5xl font-bold">
                20
              </h1>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

            <div className="flex justify-between items-center px-6 py-5 border-b border-gray-200">
              <h3 className="text-xl font-semibold">
                Active Users
              </h3>

              <UserCheck size={20} />
            </div>

            <div className="flex justify-center items-center py-12">
              <h1 className="text-5xl font-bold">
                100
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;