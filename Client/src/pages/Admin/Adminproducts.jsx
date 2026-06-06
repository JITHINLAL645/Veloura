import { useState, useEffect, useCallback, useRef } from "react";
import { Search, Trash2, Plus, ChevronLeft, ChevronRight, Package, Pencil, X } from "lucide-react";
import AdminSidebar from "../../components/Admin/AdminSidebar";
import AddProduct from "../../components/Admin/AddProduct";
import EditProduct from "../../components/Admin/EditProduct";

const API = "http://localhost:5000";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [togglingId, setTogglingId] = useState(null);

  const debounceRef = useRef(null);

  const fetchProducts = useCallback(async (searchTerm, pageNum) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: pageNum, limit: 5 });
      if (searchTerm) params.append("search", searchTerm);
      const res = await fetch(`${API}/api/products?${params}`);
      const data = await res.json();
      setProducts(data.products || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts(search, page);
  }, [search, page, fetchProducts]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setSearch(value);
      setPage(1);
    }, 500);
  };

  const triggerSearch = () => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setSearch(searchInput);
    setPage(1);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") triggerSearch();
  };

  const handleClear = () => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setSearchInput("");
    setSearch("");
    setPage(1);
  };

  const handleToggleListed = async (id) => {
    setTogglingId(id);
    try {
      const res = await fetch(`${API}/api/products/${id}/toggle`, { method: "PATCH" });
      const json = await res.json();
      setProducts((prev) =>
        prev.map((p) => (p._id === json.product._id ? json.product : p))
      );
    } catch (err) {
      console.error(err);
    } finally {
      setTogglingId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    setDeletingId(id);
    try {
      await fetch(`${API}/api/products/${id}`, { method: "DELETE" });
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
    } finally {
      setDeletingId(null);
    }
  };

  const handleProductAdded = (newProduct) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  const handleProductUpdated = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) => (p._id === updatedProduct._id ? updatedProduct : p))
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />

      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <button className="text-gray-400 hover:text-gray-600">
              <ChevronLeft size={22} />
            </button>
            <h1 className="text-2xl font-bold text-gray-800">Products</h1>
          </div>
          <div className="w-9 h-9 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-500">
            <Package size={18} />
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex gap-3 mb-6">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search products"
              value={searchInput}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="w-full border border-gray-200 rounded-xl pl-4 pr-10 py-2.5 text-sm text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-orange-300 transition"
            />
            {searchInput ? (
              <button
                onClick={handleClear}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={16} />
              </button>
            ) : (
              <Search size={16} className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
            )}
          </div>
          <button
            onClick={triggerSearch}
            className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors"
          >
            Search
          </button>
        </div>

        {/* Active search indicator */}
        {search && (
          <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
            <span>
              Showing results for{" "}
              <span className="font-semibold text-gray-700">"{search}"</span>
            </span>
            <button
              onClick={handleClear}
              className="text-orange-500 hover:text-orange-600 font-medium transition-colors"
            >
              Clear
            </button>
          </div>
        )}

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-[2fr_3fr_1fr_1.5fr_1fr_1.5fr] px-6 py-3 border-b border-gray-100 bg-gray-50/60">
            {["Full Name", "Description", "Stock", "Price", "Image", "Action"].map((h) => (
              <span key={h} className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                {h}
              </span>
            ))}
          </div>

          {/* Table Body */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <Package size={40} className="mb-3 opacity-40" />
              <p className="text-sm">
                {search ? `No products found for "${search}"` : "No products found"}
              </p>
              {search && (
                <button
                  onClick={handleClear}
                  className="mt-3 text-orange-500 hover:text-orange-600 text-sm font-medium"
                >
                  Clear search
                </button>
              )}
            </div>
          ) : (
            products.map((product) => (
              <div
                key={product._id}
                className="grid grid-cols-[2fr_3fr_1fr_1.5fr_1fr_1.5fr] px-6 py-4 border-b border-gray-50 hover:bg-orange-50/30 transition-colors items-center"
              >
                <span className="text-sm font-medium text-gray-700">{product.name}</span>

                <span className="text-xs text-gray-500 leading-relaxed pr-4 line-clamp-3">
                  {product.description}
                </span>

                <span className="text-sm text-gray-600">{product.stock} pcs</span>

                <span className="text-sm text-gray-600">
                  ₹{Number(product.price).toLocaleString("en-IN")}
                </span>

                <div className="relative w-fit">
                  {product.images && product.images.length > 0 ? (
                    <>
                      <img
                        src={`${API}${product.images[0]}`}
                        alt={product.name}
                        className="w-12 h-14 object-cover rounded-lg border border-gray-100"
                      />
                      {product.images.length > 1 && (
                        <span className="absolute -top-1.5 -right-1.5 bg-orange-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                          {product.images.length}
                        </span>
                      )}
                    </>
                  ) : (
                    <div className="w-12 h-14 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Package size={18} className="text-gray-300" />
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleListed(product._id)}
                    disabled={togglingId === product._id}
                    className={`text-xs font-semibold px-4 py-2 rounded-lg transition-colors disabled:opacity-60 ${
                      product.listed
                        ? "bg-orange-500 hover:bg-orange-600 text-white"
                        : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                    }`}
                  >
                    {product.listed ? "Unlist" : "List"}
                  </button>

                  <button
                    onClick={() => setEditingProduct(product)}
                    className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit product"
                  >
                    <Pencil size={15} />
                  </button>

                  <button
                    onClick={() => handleDelete(product._id)}
                    disabled={deletingId === product._id}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-40"
                    title="Delete product"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Bottom Row: Add Product + Pagination */}
        <div className="flex items-center justify-between mt-6">

          {/* Add Product Button */}
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-gray-900 hover:bg-black text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-md"
          >
            <Plus size={16} />
            Add Product
          </button>

          {/* Pagination — Prev / 1 / 2 / Next */}
          {totalPages > 1 && (
            <div className="flex items-center gap-3">
              {/* Prev */}
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-5 py-2 text-sm font-medium rounded-xl border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Prev
              </button>

              {/* Page indicator */}
              <span className="text-sm font-semibold text-gray-700 min-w-[40px] text-center">
                {page} / {totalPages}
              </span>

              {/* Next */}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-5 py-2 text-sm font-medium rounded-xl border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </main>

      {showAddModal && (
        <AddProduct
          onClose={() => setShowAddModal(false)}
          onProductAdded={handleProductAdded}
        />
      )}

      {editingProduct && (
        <EditProduct
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onProductUpdated={handleProductUpdated}
        />
      )}
    </div>
  );
}

export default AdminProducts;