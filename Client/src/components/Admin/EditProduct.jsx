import { useState, useRef, useEffect } from "react";
import { X, Upload, ImagePlus } from "lucide-react";

const API = "http://localhost:5000";
const MAX_IMAGES = 5;

function EditProduct({ product, onClose, onProductUpdated }) {
  const [form, setForm] = useState({
    name: product.name || "",
    description: product.description || "",
    stock: product.stock ?? "",
    price: product.price ?? "",
    collections: product.collections || "",
    color: product.color || "",
    fabric: product.fabric || "",
  });

  const [existingImages, setExistingImages] = useState(product.images || []);
  const [removedImages, setRemovedImages] = useState([]);
  const [newImageFiles, setNewImageFiles] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef();

  useEffect(() => {
    return () => {
      newImageFiles.forEach(({ preview }) => URL.revokeObjectURL(preview));
    };
  }, [newImageFiles]);

  const totalImages = existingImages.length + newImageFiles.length;
  const slotsLeft = MAX_IMAGES - totalImages;

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    const selected = Array.from(e.target.files);
    if (slotsLeft <= 0) return;

    const toAdd = selected.slice(0, slotsLeft).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setNewImageFiles((prev) => [...prev, ...toAdd]);
    e.target.value = "";
  };

  const handleRemoveExisting = (imgPath) => {
    setExistingImages((prev) => prev.filter((p) => p !== imgPath));
    setRemovedImages((prev) => [...prev, imgPath]);
  };

  const handleRemoveNew = (index) => {
    setNewImageFiles((prev) => {
      URL.revokeObjectURL(prev[index].preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.description || !form.stock || !form.price) {
      setError("Please fill all required fields.");
      return;
    }

    setLoading(true);
    try {
      const data = new FormData();

      Object.entries(form).forEach(([k, v]) => data.append(k, v));

      removedImages.forEach((img) => data.append("removedImages", img));

      newImageFiles.forEach(({ file }) => data.append("images", file));

      const res = await fetch(`${API}/api/products/${product._id}`, {
        method: "PUT",
        body: data,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to update product");
      }

      const json = await res.json();
      onProductUpdated(json.product);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const allImageSlots = [
    ...existingImages.map((path) => ({ type: "existing", path })),
    ...newImageFiles.map((f, i) => ({ type: "new", preview: f.preview, index: i })),
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800">Edit Product</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={18} className="text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          {[
            { label: "Product Name *", name: "name", placeholder: "Lehenga set" },
            { label: "Description *", name: "description", placeholder: "Seema Gujral - Multi-Coloured Lehenga Set" },
            { label: "Stock *", name: "stock", placeholder: "20", type: "number" },
            { label: "Price *", name: "price", placeholder: "195000", type: "number" },
            { label: "Collections", name: "collections", placeholder: "Mehtab Womenswear" },
            { label: "Color", name: "color", placeholder: "Multi color" },
            { label: "Fabric", name: "fabric", placeholder: "Velvet" },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
              </label>
              <input
                type={field.type || "text"}
                name={field.name}
                value={form[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
              />
            </div>
          ))}

          {/* Image Management */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Images
              <span className="ml-2 text-xs text-gray-400 font-normal">
                ({totalImages}/{MAX_IMAGES})
              </span>
            </label>

            {allImageSlots.length > 0 && (
              <div className="grid grid-cols-5 gap-2 mb-3">
                {allImageSlots.map((slot, i) => (
                  <div key={i} className="relative group aspect-square">
                    <img
                      src={slot.type === "existing" ? `${API}${slot.path}` : slot.preview}
                      alt={`Product ${i + 1}`}
                      className="w-full h-full object-cover rounded-lg border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        slot.type === "existing"
                          ? handleRemoveExisting(slot.path)
                          : handleRemoveNew(slot.index)
                      }
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow"
                    >
                      <X size={10} />
                    </button>
                    {i === 0 && (
                      <span className="absolute bottom-0 left-0 right-0 text-center text-[9px] bg-orange-500 text-white rounded-b-lg py-0.5 font-medium">
                        Main
                      </span>
                    )}
                    {slot.type === "new" && (
                      <span className="absolute top-0 left-0 right-0 text-center text-[9px] bg-blue-500 text-white rounded-t-lg py-0.5 font-medium">
                        New
                      </span>
                    )}
                  </div>
                ))}

                {/* Empty slots */}
                {Array.from({ length: slotsLeft }).map((_, i) => (
                  <button
                    key={`empty-${i}`}
                    type="button"
                    onClick={() => fileRef.current.click()}
                    className="aspect-square border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center hover:border-orange-300 hover:bg-orange-50 transition-colors"
                  >
                    <ImagePlus size={16} className="text-gray-300" />
                  </button>
                ))}
              </div>
            )}

            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="hidden"
            />

            {allImageSlots.length === 0 && (
              <button
                type="button"
                onClick={() => fileRef.current.click()}
                className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
              >
                <ImagePlus size={16} />
                Add Images
              </button>
            )}

            {allImageSlots.length > 0 && slotsLeft > 0 && (
              <button
                type="button"
                onClick={() => fileRef.current.click()}
                className="flex items-center gap-2 bg-gray-800 hover:bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
              >
                <Upload size={14} />
                Add More ({slotsLeft} left)
              </button>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-gray-200 text-gray-600 text-sm font-medium py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gray-900 hover:bg-black text-white text-sm font-medium py-2.5 rounded-lg transition-colors disabled:opacity-60"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProduct;