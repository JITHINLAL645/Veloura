import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Trash2, ExternalLink, Loader2 } from "lucide-react";

const API = "http://localhost:5000";

function WishlistSection() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removing, setRemoving] = useState(null);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API}/api/wishlist/${user._id}`);
      const data = await res.json();
      if (data.success) {
        setProducts(data.wishlist?.products || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (productId) => {
    try {
      setRemoving(productId);
      await fetch(`${API}/api/wishlist/remove`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user._id, productId }),
      });
      setProducts((prev) => prev.filter((p) => p._id !== productId));
    } catch (err) {
      console.error(err);
    } finally {
      setRemoving(null);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#e8e0da] p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Wishlist</h2>
          <p className="text-xs text-gray-400 mt-0.5">
            {products.length} saved item{products.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="w-9 h-9 rounded-full bg-[#fff3eb] flex items-center justify-center">
          <Heart size={16} className="text-[#f57c20]" fill="#f57c20" />
        </div>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex flex-col items-center py-16 gap-3">
          <Loader2 size={28} className="animate-spin text-[#f57c20]" />
          <p className="text-xs text-gray-400 tracking-wider uppercase">Loading wishlist...</p>
        </div>
      ) : products.length === 0 ? (
        /* Empty State */
        <div className="flex flex-col items-center py-14 text-center">
          <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-4">
            <Heart size={28} className="text-gray-200" />
          </div>
          <p className="font-medium text-gray-700 mb-1">Your wishlist is empty</p>
          <p className="text-sm text-gray-400 mb-6">
            Save your favourite products and shop them later.
          </p>
          <button
            onClick={() => navigate("/shop")}
            className="bg-[#1e293b] text-white px-6 py-2.5 text-xs rounded-lg tracking-wider uppercase hover:bg-[#f57c20] transition-colors"
          >
            Browse Products
          </button>
        </div>
      ) : (
        /* Product List */
        <div className="space-y-3">
          {products.map((product) => (
            <div
              key={product._id}
              className="flex gap-4 items-center p-3 rounded-xl border border-gray-100 hover:border-[#f0e0d0] hover:bg-[#fffaf7] transition-all group"
            >
              {/* Image */}
              <div className="shrink-0">
                <img
                  src={`${API}${product.images?.[0]}`}
                  alt={product.name}
                  className="w-16 h-20 object-cover rounded-lg border border-gray-100"
                  onError={(e) => { e.target.src = "https://via.placeholder.com/64x80/f5f1ef/ccc?text=—"; }}
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{product.name}</p>

                {product.color && (
                  <p className="text-xs text-gray-400 mt-0.5">Colour: {product.color}</p>
                )}

                <p className="text-sm font-semibold text-gray-900 mt-1">
                  ₹{Number(product.price).toLocaleString("en-IN")}
                </p>

                {/* Action buttons */}
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => navigate(`/product/${product._id}`)}
                    className="flex items-center gap-1.5 text-xs bg-[#1e293b] text-white px-3 py-1.5 rounded-lg hover:bg-[#f57c20] transition-colors"
                  >
                    <ExternalLink size={11} />
                    View
                  </button>
                  <button
                    onClick={() => removeItem(product._id)}
                    disabled={removing === product._id}
                    className="flex items-center gap-1.5 text-xs border border-red-200 text-red-400 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50"
                  >
                    {removing === product._id ? (
                      <Loader2 size={11} className="animate-spin" />
                    ) : (
                      <Trash2 size={11} />
                    )}
                    Remove
                  </button>
                </div>
              </div>

              {/* Saved heart badge */}
              <div className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <Heart size={14} className="text-[#f57c20]" fill="#f57c20" />
              </div>
            </div>
          ))}

          {/* Footer link */}
          <div className="pt-4 border-t border-gray-100 text-center">
            <button
              onClick={() => navigate("/wishlist")}
              className="text-xs text-gray-400 hover:text-[#f57c20] transition-colors underline underline-offset-2"
            >
              View full wishlist page
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default WishlistSection;