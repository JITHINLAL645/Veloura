
function EditAboutModal({ open, onClose, about, setAbout, handleAboutUpdate }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[500px] rounded-3xl p-8 shadow-xl">

        <h2 className="text-2xl font-semibold mb-6">Edit About</h2>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-500 font-medium">
            About you <span className="text-xs">({about.length}/500)</span>
          </label>
          <textarea
            rows={6}
            maxLength={500}
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="Tell others about yourself..."
            className="w-full border border-gray-300 rounded-2xl p-4 outline-none focus:border-[#f57c20] transition resize-none"
          />
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl border border-gray-300 hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleAboutUpdate}
            className="bg-[#f57c20] text-white px-6 py-2 rounded-xl hover:bg-[#e06d10] transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditAboutModal;