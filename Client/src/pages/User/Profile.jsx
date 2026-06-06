import { useEffect, useState } from "react";
import { Pencil, User, Lock, ShoppingBag, RotateCcw, Heart,  } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

import Navbar from "../../components/User/Navbar";
import Footer from "../../components/User/Footer";
import EditProfileModal from "../../components/User/EditProfileModal";
import EditAboutModal from "../../components/User/EditAboutModal";

import PasswordSection from "../../components/User/PasswordSection";
import OrdersSection from "../../components/User/OrdersSection";
import WishlistSection from "../../components/User/WishlistSection";

const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

const NAV_ITEMS = [
  { key: "profile",   label: "Profile",       icon: User },
  { key: "password",  label: "Password",      icon: Lock },
  // { key: "address",   label: "Address Book",  icon: BookOpen },
  { key: "orders",    label: "My Orders",     icon: ShoppingBag },
  { key: "returns",   label: "My Returns",    icon: RotateCcw },
  { key: "wishlist",  label: "Wishlist",      icon: Heart },
  // { key: "giftcards", label: "Gift Cards",    icon: Gift },
];

function ProfileSection({ user, loading, setEditProfile, setEditAbout }) {
  return (
    <div className="flex flex-col gap-6">
      {/* Cover + Avatar card */}
      <div className="bg-white rounded-2xl overflow-hidden border border-[#e8e0da]">
        <div className="h-36 bg-gradient-to-r from-[#efe9e5] to-[#f57c20] relative">
          <button
            onClick={() => setEditProfile(true)}
            className="absolute top-4 right-4 bg-white p-2 rounded-full shadow hover:shadow-md transition"
          >
            <Pencil size={16} />
          </button>
        </div>
        <div className="px-8 pb-8 relative">
          <div className="absolute -top-10">
            <img
              src={user?.profileImage || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
              alt="Profile"
              className="w-20 h-20 rounded-full border-4 border-white object-cover shadow"
            />
          </div>
          <div className="pt-12">
            {loading ? (
              <div className="animate-pulse">
                <div className="h-7 bg-gray-200 rounded w-40 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-56" />
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-semibold text-gray-900">{user?.name || "—"}</h2>
                <p className="text-sm text-gray-500 mt-1">{user?.email || "—"}</p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* About card */}
      <div className="bg-white rounded-2xl border border-[#e8e0da] p-7 relative">
        <button
          onClick={() => setEditAbout(true)}
          className="absolute top-5 right-5 text-gray-400 hover:text-[#f57c20] transition"
        >
          <Pencil size={16} />
        </button>
        <h3 className="text-lg font-semibold mb-3 text-gray-900">About</h3>
        {loading ? (
          <div className="animate-pulse space-y-2">
            <div className="h-3 bg-gray-200 rounded w-full" />
            <div className="h-3 bg-gray-200 rounded w-4/5" />
            <div className="h-3 bg-gray-200 rounded w-3/5" />
          </div>
        ) : (
          <p className="text-gray-600 leading-7 text-sm whitespace-pre-wrap">
            {user?.about || "No about added yet."}
          </p>
        )}
      </div>
    </div>
  );
}

function PlaceholderSection({ title }) {
  return (
    <div className="bg-white rounded-2xl border border-[#e8e0da] p-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">{title}</h2>
      <p className="text-sm text-gray-400">This section is coming soon.</p>
    </div>
  );
}

function Profile() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");
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
      toast.error(error?.response?.data?.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUser(); }, []);

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

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <ProfileSection
            user={user}
            loading={loading}
            setEditProfile={setEditProfile}
            setEditAbout={setEditAbout}
          />
        );
      case "password":  return <PasswordSection />;
      case "orders":    return <OrdersSection />;
      case "wishlist":  return <WishlistSection />;
      // case "address":   return <PlaceholderSection title="Address Book" />;
      case "returns":   return <PlaceholderSection title="My Returns" />;
      // case "giftcards": return <PlaceholderSection title="Gift Cards" />;
      default:          return null;
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#f5f1ef]">
        <div className="max-w-6xl mx-auto px-4 py-10 flex gap-8 items-start">

          <aside className="w-52 shrink-0 sticky top-6">
            <nav className="flex flex-col gap-1">
              {NAV_ITEMS.map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`flex items-center gap-3 px-4 py-2.5 text-sm rounded-lg text-left transition-all ${
                    activeTab === key
                      ? "bg-white shadow-sm font-semibold text-gray-900 border-l-2 border-[#f57c20]"
                      : "text-gray-500 hover:text-gray-800 hover:bg-white/60"
                  }`}
                >
                  <Icon
                    size={15}
                    className={activeTab === key ? "text-[#f57c20]" : "text-gray-400"}
                  />
                  {label}
                </button>
              ))}

              <div className="mt-4 border-t border-gray-200 pt-4">
                {/* <button
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:text-red-600 hover:bg-white/60 rounded-lg w-full transition-colors"
                  onClick={() => {
                    localStorage.removeItem("user");
                    window.location.href = "/login";
                  }}
                >
                  <LogOut size={15} />
                  Logout
                </button> */}
              </div>
            </nav>
          </aside>

          <main className="flex-1 min-w-0">
            {renderContent()}
          </main>
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