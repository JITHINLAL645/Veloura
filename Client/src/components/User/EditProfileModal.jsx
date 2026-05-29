
function EditProfileModal({
  open,
  onClose,
  profileData,
  setProfileData,
  handleProfileUpdate,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[450px] rounded-3xl p-8 shadow-xl">

        <h2 className="text-2xl font-semibold mb-6">Edit Profile</h2>

        <div className="flex flex-col gap-5">

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-500 font-medium">Name</label>
            <input
              type="text"
              placeholder="Your name"
              value={profileData.name}
              onChange={(e) =>
                setProfileData({ ...profileData, name: e.target.value })
              }
              className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#f57c20] transition"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-500 font-medium">Email</label>
            <input
              type="email"
              placeholder="Your email"
              value={profileData.email}
              onChange={(e) =>
                setProfileData({ ...profileData, email: e.target.value })
              }
              className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#f57c20] transition"
            />
          </div>

        </div>

        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl border border-gray-300 hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleProfileUpdate}
            className="bg-[#f57c20] text-white px-6 py-2 rounded-xl hover:bg-[#e06d10] transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProfileModal;