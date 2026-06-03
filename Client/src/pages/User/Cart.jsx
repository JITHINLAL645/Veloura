import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/User/Navbar";
import Footer from "../../components/User/Footer";
import { Trash2, Heart, Minus, Plus, ShoppingBag } from "lucide-react";

const API = "http://localhost:5000";

// Empty Cart Illustration
function EmptyCartIllustration() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6">
      <div className="relative mb-8">
        <svg
          width="160"
          height="160"
          viewBox="0 0 160 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <ellipse cx="80" cy="148" rx="48" ry="8" fill="#d6cfc4" />
          <rect x="28" y="72" width="104" height="70" rx="4" fill="#e8e0d4" stroke="#c5bdb0" strokeWidth="1.5" />
          <path d="M28 72 L80 88 L80 72 Z" fill="#d4ccc0" stroke="#c5bdb0" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M132 72 L80 88 L80 72 Z" fill="#ccc4b8" stroke="#c5bdb0" strokeWidth="1.5" strokeLinejoin="round" />
          <rect x="28" y="68" width="104" height="8" rx="2" fill="#c5bdb0" stroke="#b8b0a4" strokeWidth="1" />
          <rect x="70" y="68" width="20" height="74" rx="1" fill="#f0e8d8" stroke="#d4ccc0" strokeWidth="1" />
          <path d="M58 68 C58 48 72 38 80 38 C88 38 102 48 102 68" stroke="#b8b0a4" strokeWidth="3" strokeLinecap="round" fill="none" />
          <circle cx="22" cy="55" r="3" fill="#c5bdb0" opacity="0.6" />
          <circle cx="138" cy="60" r="2" fill="#c5bdb0" opacity="0.5" />
          <circle cx="130" cy="48" r="3.5" fill="#d4ccc0" opacity="0.5" />
          <circle cx="30" cy="44" r="2.5" fill="#c5bdb0" opacity="0.4" />
          <line x1="18" y1="70" x2="24" y2="76" stroke="#b8b0a4" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="24" y1="70" x2="18" y2="76" stroke="#b8b0a4" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="136" y1="74" x2="142" y2="80" stroke="#b8b0a4" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="142" y1="74" x2="136" y2="80" stroke="#b8b0a4" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="68" cy="104" r="3" fill="#a09890" />
          <circle cx="92" cy="104" r="3" fill="#a09890" />
          <path d="M68 118 Q80 112 92 118" stroke="#a09890" strokeWidth="2" strokeLinecap="round" fill="none" />
        </svg>
      </div>

      <h2 className="text-[32px] text-[#1e293b] mb-3 text-center" style={{ fontFamily: "serif" }}>
        Your cart is empty
      </h2>
      <p className="text-gray-500 text-center max-w-[300px] mb-8 leading-relaxed">
        Looks like you haven't added anything yet. Explore our collection and find something you love.
      </p>
      <a
        href="/"
        className="inline-block bg-[#1e293b] text-white px-10 py-4 text-sm tracking-[2px] uppercase hover:bg-[#334155] transition-colors duration-200"
      >
        Continue Shopping
      </a>
    </div>
  );
}

function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [wishlistIds, setWishlistIds] = useState(new Set());
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchCart();
    fetchWishlist();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await fetch(`${API}/api/cart/${user._id}`);
      const data = await response.json();
      if (data.success) {
        setCart(data.cart);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchWishlist = async () => {
    try {
      const response = await fetch(`${API}/api/wishlist/${user._id}`);
      const data = await response.json();
      if (data.success && data.wishlist?.items) {
        const ids = new Set(data.wishlist.items.map((i) => i.product._id || i.product));
        setWishlistIds(ids);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeItem = async (itemId) => {
    try {
      const response = await fetch(`${API}/api/cart/remove`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user._id, itemId }),
      });
      const data = await response.json();
      if (data.success) fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  const increaseQty = async (itemId) => {
    try {
      const response = await fetch(`${API}/api/cart/increase`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user._id, itemId }),
      });
      const data = await response.json();
      if (data.success) fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  const decreaseQty = async (itemId) => {
    try {
      const response = await fetch(`${API}/api/cart/decrease`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user._id, itemId }),
      });
      const data = await response.json();
      if (data.success) fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  const toggleWishlist = async (item) => {
    const productId = item.product._id;
    const isWishlisted = wishlistIds.has(productId);

    try {
      if (isWishlisted) {
        const response = await fetch(`${API}/api/wishlist/remove`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user._id, productId }),
        });
        const data = await response.json();
        if (data.success) {
          setWishlistIds((prev) => {
            const next = new Set(prev);
            next.delete(productId);
            return next;
          });
        }
      } else {
        const response = await fetch(`${API}/api/wishlist/add`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user._id, productId }),
        });
        const data = await response.json();
        if (data.success) {
          setWishlistIds((prev) => new Set([...prev, productId]));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const subtotal =
    cart?.items?.reduce((total, item) => total + item.product.price * item.quantity, 0) || 0;

  const totalItems =
    cart?.items?.reduce((total, item) => total + item.quantity, 0) || 0;

  const isEmpty = !cart?.items || cart.items.length === 0;

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center bg-[#f4f1eb]">
        <div className="flex flex-col items-center gap-3">
          <ShoppingBag size={36} className="text-gray-400 animate-pulse" />
          <span className="text-gray-500 tracking-widest text-sm uppercase">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-[#f4f1eb] py-12">
        <div className="max-w-[1350px] mx-auto px-6">
          {isEmpty ? (
            <div>
              <h1 className="text-[46px] mb-2 text-[#1e293b]" style={{ fontFamily: "serif" }}>
                Your Cart
              </h1>
              <div className="border-t border-gray-300 mt-4">
                <EmptyCartIllustration />
              </div>
            </div>
          ) : (
            <div className="grid lg:grid-cols-[65%_35%] gap-16">
              {/* LEFT SIDE */}
              <div>
                <h1 className="text-[46px] mb-8 text-[#1e293b]" style={{ fontFamily: "serif" }}>
                  Your Cart
                </h1>

                <div className="border-t border-gray-300">
                  {cart.items.map((item) => (
                    <div key={item._id} className="py-8 border-b border-gray-200">
                      <div className="flex gap-6">
                        <img
                          src={`${API}${item.product.images[0]}`}
                          alt={item.product.name}
                          className="w-[130px] h-[170px] object-cover flex-shrink-0"
                        />

                        <div className="flex-1 min-w-0">
                          <h2
                            className="text-[22px] sm:text-[28px] text-[#1e293b] leading-tight"
                            style={{ fontFamily: "serif" }}
                          >
                            {item.product.name}
                          </h2>

                          <p className="mt-3 text-xl text-[#1e293b] font-medium">
                            ₹{Number(item.product.price).toLocaleString("en-IN")}
                          </p>

                          <div className="mt-4 flex items-center gap-4">
                            <span className="text-gray-600 text-sm">Quantity</span>
                            <div className="flex items-center border border-gray-300 bg-white">
                              <button
                                onClick={() => decreaseQty(item._id)}
                                className="px-3 py-2 hover:bg-gray-100 transition-colors"
                                aria-label="Decrease quantity"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="px-5 text-sm font-medium min-w-[40px] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => increaseQty(item._id)}
                                className="px-3 py-2 hover:bg-gray-100 transition-colors"
                                aria-label="Increase quantity"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                          </div>

                          <div className="mt-3 space-y-1">
                            {item.product.color && (
                              <p className="text-gray-600 text-sm">Colour: {item.product.color}</p>
                            )}
                            <p className="text-gray-600 text-sm">Size: {item.size}</p>
                          </div>

                          {/* Line total */}
                          <p className="mt-3 text-sm text-gray-500">
                            Item Total: ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                          </p>

                          <div className="flex items-center gap-6 mt-5">
                            <button
                              onClick={() => removeItem(item._id)}
                              className="text-gray-500 hover:text-red-500 transition-colors"
                              title="Remove item"
                            >
                              <Trash2 size={18} />
                            </button>

                            <button
                              onClick={() => toggleWishlist(item)}
                              className={`transition-colors ${
                                wishlistIds.has(item.product._id)
                                  ? "text-red-500"
                                  : "text-gray-500 hover:text-red-400"
                              }`}
                              title={wishlistIds.has(item.product._id) ? "Remove from wishlist" : "Add to wishlist"}
                            >
                              <Heart
                                size={18}
                                fill={wishlistIds.has(item.product._id) ? "currentColor" : "none"}
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="lg:pt-[88px]">
                <div className="bg-[#efebe2] p-8 sticky top-6">
                  <h3 className="font-semibold text-lg mb-6 tracking-wide uppercase text-[#1e293b]">
                    Order Summary
                  </h3>

                  <div className="space-y-3 mb-6">
                    {cart.items.map((item) => (
                      <div key={item._id} className="flex justify-between text-sm text-gray-600">
                        <span className="truncate pr-4">
                          {item.product.name} × {item.quantity}
                        </span>
                        <span className="flex-shrink-0">
                          ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-300 pt-4 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal ({totalItems} {totalItems === 1 ? "item" : "items"})</span>
                      <span>₹{subtotal.toLocaleString("en-IN")}</span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span>Shipping</span>
                      <span className="text-green-700 font-medium">Free</span>
                    </div>

                    <div className="border-t border-gray-300 pt-3 flex justify-between font-semibold text-base">
                      <span>Payable Amount</span>
                      <span>₹{subtotal.toLocaleString("en-IN")}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="w-full mt-8 bg-[#1e293b] text-white py-4 text-sm tracking-[2px] uppercase hover:bg-[#334155] transition-colors duration-200"
                  >
                    Checkout
                  </button>

                  <a
                    href="/"
                    className="block text-center mt-4 text-sm text-gray-500 underline underline-offset-2 hover:text-gray-700 transition-colors"
                  >
                    Continue Shopping
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Cart;