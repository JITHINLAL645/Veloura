import { useEffect, useState } from "react";
import Navbar from "../../components/User/Navbar";
import Footer from "../../components/User/Footer";
import { Trash2, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const API = "http://localhost:5000";

function Wishlist() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const response = await fetch(
        `${API}/api/wishlist/${user._id}`
      );

      const data = await response.json();

      if (data.success) {
        setProducts(data.wishlist?.products || []);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (productId) => {
    try {
      await fetch(
        `${API}/api/wishlist/remove`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user._id,
            productId,
          }),
        }
      );

      fetchWishlist();
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center text-xl">
        Loading...
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-[#f7f4f4] py-12">
        <div className="max-w-5xl mx-auto px-6">

          {/* HEADER */}

          <div className="mb-10">
            <h1
              className="text-5xl text-[#1e293b]"
              style={{ fontFamily: "serif" }}
            >
              My Wishlist
            </h1>

            <p className="mt-2 text-gray-600">
              {products.length} saved item
              {products.length !== 1 ? "s" : ""}
            </p>
          </div>

          {/* EMPTY STATE */}

          {products.length === 0 ? (
            <div className="bg-white rounded-xl p-16 text-center shadow-sm">

              <Heart
                size={60}
                className="mx-auto text-gray-400"
              />

              <h2 className="text-3xl mt-6 font-semibold">
                Your Wishlist is Empty
              </h2>

              <p className="text-gray-500 mt-3">
                Save your favourite products and shop later.
              </p>

              <Link
                to="/shop"
                className="inline-block mt-8 bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition"
              >
                Continue Shopping
              </Link>

            </div>
          ) : (
            <div className="space-y-6">

              {products.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row">

                    {/* IMAGE */}

                    <div className="md:w-[240px] flex-shrink-0 self-stretch">
                      <img
                        src={`${API}${product.images[0]}`}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* DETAILS */}

                    <div className="flex-1 p-6">

                      <div className="flex items-center gap-2 mb-3">
                        <Heart
                          size={18}
                          fill="black"
                          className="text-black"
                        />

                        <span className="text-sm text-gray-500">
                          Saved Item
                        </span>
                      </div>

                      <h2
                        className="text-2xl text-[#1e293b]"
                        style={{ fontFamily: "serif" }}
                      >
                        {product.name}
                      </h2>

                      <p className="text-gray-500 text-sm mt-3 leading-6">
                        {product.description ||
                          "Premium quality fashion wear crafted with elegance and comfort."}
                      </p>

                      <div className="mt-5">

                        <p className="text-2xl font-semibold">
                          ₹
                          {Number(
                            product.price
                          ).toLocaleString("en-IN")}
                        </p>

                        {product.color && (
                          <p className="text-gray-600 mt-2">
                            Color: {product.color}
                          </p>
                        )}

                      </div>

                      {/* BUTTONS */}

                      <div className="flex gap-3 mt-6 flex-wrap">

                        <Link
                          to={`/product/${product._id}`}
                          className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
                        >
                          View Product
                        </Link>

                        <button
                          onClick={() =>
                            removeItem(product._id)
                          }
                          className="border border-red-200 text-red-500 px-6 py-3 rounded-lg hover:bg-red-50 transition flex items-center gap-2"
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>

                      </div>

                    </div>

                  </div>
                </div>
              ))}

            </div>
          )}

        </div>
      </section>

      <Footer />
    </>
  );
}

export default Wishlist;