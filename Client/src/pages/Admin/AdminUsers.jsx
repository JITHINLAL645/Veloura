import { Search } from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

import API from "../../api/axios";

import AdminSidebar from "../../components/Admin/AdminSidebar";

function AdminUsers() {
  const [users, setUsers] = useState([]);

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  const fetchUsers = async () => {
    try {
      const response = await API.get(
        `/admin/users?search=${search}&page=${page}`
      );

      setUsers(response.data.users);

      setTotalPages(
        response.data.totalPages
      );
    } catch (error) {
      toast.error("Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [search, page]);

  const handleBlock = async (id) => {
    try {
      await API.patch(
        `/admin/block-user/${id}`
      );

      toast.success("User blocked");

      fetchUsers();
    } catch (error) {
      toast.error("Block failed");
    }
  };

  const handleUnblock = async (id) => {
    try {
      await API.patch(
        `/admin/unblock-user/${id}`
      );

      toast.success("User unblocked");

      fetchUsers();
    } catch (error) {
      toast.error("Unblock failed");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f5f5f5]">

      <AdminSidebar />

      <div className="flex-1 p-10 overflow-x-auto">

        <div className="flex flex-col md:flex-row justify-between md:items-center gap-5 mb-10">

          <h1 className="text-4xl font-bold">
            All Users
          </h1>

          <div className="relative w-full md:w-[320px]">
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full border border-gray-300 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-orange-500 bg-white"
            />

            <Search
              size={20}
              className="absolute top-3.5 left-4 text-gray-400"
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow overflow-hidden">

          <table className="w-full min-w-[700px]">

            <thead className="bg-[#f5f5f5]">
              <tr>
                <th className="text-left px-6 py-5 font-semibold">
                  Name
                </th>

                <th className="text-left px-6 py-5 font-semibold">
                  Email
                </th>

                <th className="text-left px-6 py-5 font-semibold">
                  Status
                </th>

                <th className="text-left px-6 py-5 font-semibold">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr
                    key={user._id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-5">
                      {user.name}
                    </td>

                    <td className="px-6 py-5">
                      {user.email}
                    </td>

                    <td className="px-6 py-5">

                      {user.isBlock ? (
                        <span className="text-red-500 font-medium">
                          Blocked
                        </span>
                      ) : (
                        <span className="text-green-600 font-medium">
                          Active
                        </span>
                      )}

                    </td>

                    <td className="px-6 py-5">

                      {user.isBlock ? (
                        <button
                          onClick={() =>
                            handleUnblock(
                              user._id
                            )
                          }
                          className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg transition"
                        >
                          Unblock
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            handleBlock(
                              user._id
                            )
                          }
                          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition"
                        >
                          Block
                        </button>
                      )}

                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-10 text-gray-500"
                  >
                    No users found
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>

        <div className="flex justify-center items-center gap-4 mt-10">

          <button
            disabled={page === 1}
            onClick={() =>
              setPage(page - 1)
            }
            className="px-5 py-2 border rounded-lg bg-white hover:bg-gray-100 disabled:opacity-50"
          >
            Prev
          </button>

          <span className="font-medium">
            {page} / {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() =>
              setPage(page + 1)
            }
            className="px-5 py-2 border rounded-lg bg-white hover:bg-gray-100 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminUsers;