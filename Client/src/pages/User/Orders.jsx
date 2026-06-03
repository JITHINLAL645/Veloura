import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Package, ArrowRight, Loader2, ShoppingBag } from "lucide-react";
import Navbar from "../../components/User/Navbar";
import Footer from "../../components/User/Footer";

const API = "http://localhost:5000";

function Orders() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const hasFetched = useRef(false);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${API}/api/payment/orders/${user._id}`);

      if (!res.ok) {
        console.error("❌ HTTP error:", res.status);
        return;
      }

      const data = await res.json();
      if (data.success) {
        const unique = Array.from(
          new Map(data.orders.map((o) => [o._id, o])).values(),
        );
        setOrders(unique);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#f4f1eb] flex items-center justify-center">
          <div className="text-center">
            <Loader2
              size={40}
              className="animate-spin text-[#1e293b] mx-auto mb-4"
            />
            <p className="text-gray-500 tracking-widest text-sm uppercase">
              Loading Orders...
            </p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-[#f4f1eb] py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <div className="border border-[#1e293b] p-6 mb-8">
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">
              My Account
            </p>
            <h1
              className="text-[42px] text-[#1e293b]"
              style={{ fontFamily: "serif" }}
            >
              My Orders
            </h1>
          </div>

          {orders.length === 0 ? (
            <div className="bg-white border border-gray-200 p-12 text-center">
              <ShoppingBag size={50} className="mx-auto text-gray-400 mb-4" />
              <h2
                className="text-2xl text-[#1e293b] mb-3"
                style={{ fontFamily: "serif" }}
              >
                No Orders Found
              </h2>
              <p className="text-gray-500 mb-6">
                You haven't placed any orders yet.
              </p>
              <button
                onClick={() => navigate("/shop")}
                className="bg-[#1e293b] text-white px-6 py-3 text-xs tracking-[2px] uppercase"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white border border-gray-200 p-6"
                >
                  {/* Top Section */}
                  <div className="flex flex-col lg:flex-row lg:justify-between gap-4 mb-6">
                    <div>
                      <p className="text-xs uppercase tracking-[2px] text-gray-500 mb-2">
                        Order ID
                      </p>
                      <p className="font-mono text-xs break-all">{order._id}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[2px] text-gray-500 mb-2">
                        Order Date
                      </p>
                      <p>
                        {new Date(order.createdAt).toLocaleDateString("en-IN")}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[2px] text-gray-500 mb-2">
                        Status
                      </p>
                      <span className="text-green-600 font-medium capitalize">
                        {order.status || "Confirmed"}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[2px] text-gray-500 mb-2">
                        Total
                      </p>
                      <p className="font-semibold text-[#1e293b]">
                        ₹{Number(order.totalAmount).toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>

                  {/* Products */}
                  <div className="space-y-4 mb-6">
                    {order.items?.map((item) => (
                      <div key={item._id} className="flex gap-4 items-center">
                        <img
                          src={`${API}${item.product?.images?.[0]}`}
                          alt={item.product?.name}
                          className="w-20 h-24 object-cover border"
                        />
                        <div className="flex-1">
                          <p
                            className="font-medium text-[#1e293b]"
                            style={{ fontFamily: "serif" }}
                          >
                            {item.product?.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            Size: {item.size}
                          </p>
                          <p className="text-sm text-gray-500">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <p className="font-semibold text-[#1e293b]">
                          ₹{Number(item.price).toLocaleString("en-IN")}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Shipping */}
                  {order.shippingAddress && (
                    <div className="bg-[#f4f1eb] p-4 mb-6">
                      <p className="text-xs uppercase tracking-[2px] text-gray-500 mb-2">
                        Shipping Address
                      </p>
                      <p className="text-sm text-[#1e293b]">
                        {order.shippingAddress.firstName}{" "}
                        {order.shippingAddress.lastName}
                      </p>
                      <p className="text-sm text-gray-600">
                        {order.shippingAddress.address1}
                      </p>
                      <p className="text-sm text-gray-600">
                        {order.shippingAddress.city},{" "}
                        {order.shippingAddress.state}
                      </p>
                      <p className="text-sm text-gray-600">
                        {order.shippingAddress.zipCode}
                      </p>
                    </div>
                  )}

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => navigate(`/order/${order._id}`)}
                      className="flex-1 border border-[#1e293b] text-[#1e293b] py-3 text-xs tracking-[2px] uppercase hover:bg-[#1e293b] hover:text-white transition"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => navigate("/shop")}
                      className="flex-1 bg-[#1e293b] text-white py-3 text-xs tracking-[2px] uppercase hover:bg-[#334155] transition flex items-center justify-center gap-2"
                    >
                      Buy Again <ArrowRight size={14} />
                    </button>
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

export default Orders;
