
import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

import Navbar from "../../components/User/Navbar";
import Footer from "../../components/User/Footer";
import EditProfileModal from "../../components/User/EditProfileModal";
import EditAboutModal from "../../components/User/EditAboutModal";

const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

function Profile() {
  const [user, setUser] = useState(null);
  const [editProfile, setEditProfile] = useState(false);
  const [editAbout, setEditAbout] = useState(false);
  const [profileData, setProfileData] = useState({ name: "", email: "" });
  const [about, setAbout] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/api/user/profile");
      setUser(data.user);
      setProfileData({ name: data.user.name, email: data.user.email });
      setAbout(data.user.about || "");
    } catch (error) {
      console.error("fetchUser error:", error?.response?.data || error.message);
      toast.error(error?.response?.data?.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleProfileUpdate = async () => {
    try {
      const { data } = await api.put("/api/user/update-profile", profileData);
      toast.success(data.message);
      setEditProfile(false);
      fetchUser();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Update failed");
    }
  };

  const handleAboutUpdate = async () => {
    try {
      const { data } = await api.put("/api/user/update-about", { about });
      toast.success(data.message);
      setEditAbout(false);
      fetchUser();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Update failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#f5f1ef] p-6">
  <div className="w-full px-6 lg:px-10 flex flex-col gap-6">

    <div className="w-full bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-200">

      <div className="h-[170px] bg-gradient-to-r from-[#efe9e5] to-[#f57c20] relative">
        <button
          onClick={() => setEditProfile(true)}
          className="absolute top-5 right-5 bg-white p-2 rounded-full shadow hover:shadow-md transition"
        >
          <Pencil size={18} />
        </button>
      </div>

      <div className="px-10 pb-10 relative">
              <div className="absolute -top-12">
                <img
                  src={
                    user?.profileImage ||
                    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  }
                  alt="Profile"
                  className="w-24 h-24 rounded-full border-4 border-white object-cover shadow"
                />
              </div>

              <div className="pt-16">
                {loading ? (
                  <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-48 mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-64"></div>
                  </div>
                ) : (
                  <>
                    <h2 className="text-4xl font-semibold text-black">
                      {user?.name || "—"}
                    </h2>
                    <p className="text-gray-500 mt-2">{user?.email || "—"}</p>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="w-full bg-white rounded-3xl shadow-sm border border-gray-200 p-8 relative">
            <button
              onClick={() => setEditAbout(true)}
              className="absolute top-5 right-5 text-gray-400 hover:text-[#f57c20] transition"
            >
              <Pencil size={18} />
            </button>

            <h3 className="text-3xl font-semibold mb-5">About</h3>

            {loading ? (
              <div className="animate-pulse space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                <div className="h-4 bg-gray-200 rounded w-3/5"></div>
              </div>
            ) : (
              <p className="text-gray-700 leading-8 whitespace-pre-wrap">
                {user?.about || "No about added yet."}
              </p>
            )}
          </div>
        </div>
      </div>

      <EditProfileModal
        open={editProfile}
        onClose={() => setEditProfile(false)}
        profileData={profileData}
        setProfileData={setProfileData}
        handleProfileUpdate={handleProfileUpdate}
      />

      <EditAboutModal
        open={editAbout}
        onClose={() => setEditAbout(false)}
        about={about}
        setAbout={setAbout}
        handleAboutUpdate={handleAboutUpdate}
      />

      <Footer />
    </>
  );
}

export default Profile;