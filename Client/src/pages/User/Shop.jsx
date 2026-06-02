import { useState, useEffect, useCallback } from "react";
import Navbar from "../../components/User/Navbar";
import Footer from "../../components/User/Footer";
import FilterSidebar from "../../components/User/FilterSidebar";
import SortDropdown from "../../components/User/SortDropdown";
import ProductCard from "../../components/User/ProductCard";
import { Search } from "lucide-react";
import shop1 from "../../assets/shop1.png";

const API = "http://localhost:5000";

function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  // filter state lifted from FilterSidebar
  const [filters, setFilters] = useState({
    collections: [],
    colors: [],
    fabrics: [],
    minPrice: 0,
    maxPrice: null,
  });

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page, limit: 9 });

      if (search) params.append("search", search);
      if (sort) params.append("sort", sort);
      if (filters.collections.length) params.append("collections", filters.collections.join(","));
      if (filters.colors.length) params.append("colors", filters.colors.join(","));
      if (filters.fabrics.length) params.append("fabrics", filters.fabrics.join(","));
      if (filters.minPrice) params.append("minPrice", filters.minPrice);
      if (filters.maxPrice !== null) params.append("maxPrice", filters.maxPrice);

      const res = await fetch(`${API}/api/products?${params}`);
      const data = await res.json();

      setProducts(data.products || []);
      setTotalPages(data.totalPages || 1);
      setTotal(data.total || 0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [page, search, sort, filters]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // reset to page 1 whenever filters/sort/search change
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  const handleSearch = () => {
    setSearch(searchInput);
    setPage(1);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleSortChange = (val) => {
    setSort(val);
    setPage(1);
  };

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="relative">
        <img src={shop1} alt="banner" className="w-full h-[700px] object-cover" />
        <div className="absolute inset-0 bg-black/20" />
        <h1 className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[120px] font-serif text-transparent stroke-text tracking-widest uppercase hidden lg:block">
          LEHENGAS
        </h1>
      </section>

      {/* SHOP SECTION */}
      <section className="bg-[#f5f2f2] py-16">
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="grid lg:grid-cols-[280px_1fr] gap-12">

            {/* FILTER SIDEBAR */}
            <FilterSidebar onFilterChange={handleFilterChange} />

            {/* PRODUCTS COLUMN */}
            <div>

              {/* TOP BAR */}
              <div className="flex flex-col lg:flex-row justify-between gap-5 mb-10">
                <div className="flex items-center gap-3">
                  <div className="relative w-full lg:w-[400px]">
                    <Search
                      size={20}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                    />
                    <input
                      type="text"
                      placeholder="Search Product"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="w-full bg-white py-3 pl-12 pr-4 outline-none border"
                    />
                  </div>
                  {!loading && (
                    <span className="text-xs text-gray-400 whitespace-nowrap">
                      {total} result{total !== 1 ? "s" : ""}
                    </span>
                  )}
                </div>
                <SortDropdown value={sort} onChange={handleSortChange} />
              </div>

              {/* PRODUCT GRID */}
              {loading ? (
                <div className="flex items-center justify-center py-32">
                  <div className="w-10 h-10 border-4 border-[#b8860b] border-t-transparent rounded-full animate-spin" />
                </div>
              ) : products.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-32 text-gray-400">
                  <p className="text-lg font-serif">No products found</p>
                  <p className="text-sm mt-2">Try adjusting your filters</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              )}

              {/* PAGINATION */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-3 mt-12">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 border border-gray-300 text-sm text-gray-600 hover:bg-white disabled:opacity-40 transition"
                  >
                    Prev
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`w-9 h-9 text-sm transition ${
                        p === page
                          ? "bg-[#3d4f6e] text-white"
                          : "border border-gray-300 text-gray-600 hover:bg-white"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="px-4 py-2 border border-gray-300 text-sm text-gray-600 hover:bg-white disabled:opacity-40 transition"
                  >
                    Next
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Shop;