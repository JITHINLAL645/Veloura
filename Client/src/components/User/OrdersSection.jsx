import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, ArrowRight, Loader2, ChevronDown, MapPin, Package } from "lucide-react";

const API = "http://localhost:5000";

const STATUS_STYLES = {
  confirmed: "bg-green-50 text-green-600 border-green-200",
  shipped: "bg-blue-50 text-blue-600 border-blue-200",
  delivered: "bg-purple-50 text-purple-600 border-purple-200",
  cancelled: "bg-red-50 text-red-500 border-red-200",
  pending: "bg-yellow-50 text-yellow-600 border-yellow-200",
};

function OrdersSection() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("6");
  const [expanded, setExpanded] = useState(null);
  const hasFetched = useRef(false);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API}/api/payment/orders/${user._id}`);
      const data = await res.json();
      if (data.success) {
        const unique = Array.from(
          new Map(data.orders.map((o) => [o._id, o])).values()
        );
        setOrders(unique);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filterMonths = parseInt(filter);
  const filteredOrders = orders.filter((o) => {
    const diff =
      (Date.now() - new Date(o.createdAt).getTime()) / (1000 * 60 * 60 * 24 * 30);
    return diff <= filterMonths;
  });

  const toggleExpand = (id) => setExpanded((prev) => (prev === id ? null : id));

  return (
    <div className="bg-white rounded-2xl border border-[#e8e0da] p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Order History</h2>
          <p className="text-xs text-gray-400 mt-0.5">
            {filteredOrders.length} order{filteredOrders.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Filter Dropdown */}
        <div className="relative">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="appearance-none border border-gray-200 rounded-lg pl-3 pr-8 py-2 text-xs text-gray-600 focus:outline-none focus:border-[#f57c20] cursor-pointer bg-white"
          >
            <option value="3">Last 3 months</option>
            <option value="6">Last 6 months</option>
            <option value="12">Last 12 months</option>
            <option value="120">All time</option>
          </select>
          <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex flex-col items-center py-16 gap-3">
          <Loader2 size={28} className="animate-spin text-[#f57c20]" />
          <p className="text-xs text-gray-400 tracking-wider uppercase">Loading orders...</p>
        </div>
      ) : filteredOrders.length === 0 ? (
        /* Empty State */
        <div className="flex flex-col items-center py-14 text-center">
          <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-4">
            <ShoppingBag size={28} className="text-gray-300" />
          </div>
          <p className="font-medium text-gray-700 mb-1">No orders found</p>
          <p className="text-sm text-gray-400 mb-6">
            You haven't placed any orders in this period.
          </p>
          <button
            onClick={() => navigate("/shop")}
            className="bg-[#1e293b] text-white px-6 py-2.5 text-xs rounded-lg tracking-wider uppercase hover:bg-[#f57c20] transition-colors"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        /* Orders List */
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const isOpen = expanded === order._id;
            const statusKey = (order.status || "confirmed").toLowerCase();
            const statusClass = STATUS_STYLES[statusKey] || STATUS_STYLES.confirmed;

            return (
              <div
                key={order._id}
                className="border border-gray-100 rounded-xl overflow-hidden"
              >
                {/* Order Row — always visible */}
                <div
                  className="flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => toggleExpand(order._id)}
                >
                  {/* First product thumb */}
                  <img
                    src={`${API}${order.items?.[0]?.product?.images?.[0]}`}
                    alt=""
                    className="w-14 h-16 object-cover rounded-lg border border-gray-100 shrink-0"
                    onError={(e) => { e.target.src = "https://via.placeholder.com/56x64/f5f1ef/ccc?text=—"; }}
                  />

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">
                      {order.items?.[0]?.product?.name}
                      {order.items?.length > 1 && (
                        <span className="text-xs text-gray-400 ml-1">
                          +{order.items.length - 1} more
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric", month: "short", year: "numeric",
                      })}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className={`text-xs px-2.5 py-1 rounded-full border capitalize ${statusClass}`}>
                      {order.status || "Confirmed"}
                    </span>
                    <p className="text-sm font-semibold text-gray-800">
                      ₹{Number(order.totalAmount).toLocaleString("en-IN")}
                    </p>
                    <ChevronDown
                      size={16}
                      className={`text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                  </div>
                </div>

                {/* Expanded Detail */}
                {isOpen && (
                  <div className="border-t border-gray-100 bg-[#fdfcfb] px-4 py-5">
                    {/* Order ID */}
                    <p className="text-xs text-gray-400 mb-4 font-mono break-all">
                      Order ID: {order._id}
                    </p>

                    {/* All items */}
                    <div className="space-y-3 mb-5">
                      {order.items?.map((item) => (
                        <div key={item._id} className="flex gap-3 items-center">
                          <img
                            src={`${API}${item.product?.images?.[0]}`}
                            alt={item.product?.name}
                            className="w-12 h-14 object-cover rounded-lg border border-gray-100"
                            onError={(e) => { e.target.src = "https://via.placeholder.com/48x56/f5f1ef/ccc?text=—"; }}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-800 truncate">
                              {item.product?.name}
                            </p>
                            <p className="text-xs text-gray-400">
                              Size: {item.size} &nbsp;·&nbsp; Qty: {item.quantity}
                            </p>
                          </div>
                          <p className="text-sm font-semibold text-gray-700 shrink-0">
                            ₹{Number(item.price).toLocaleString("en-IN")}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Shipping address */}
                    {order.shippingAddress && (
                      <div className="flex gap-2 bg-white rounded-lg border border-gray-100 p-3 mb-5">
                        <MapPin size={14} className="text-[#f57c20] mt-0.5 shrink-0" />
                        <div>
                          <p className="text-xs font-medium text-gray-600 mb-0.5">Shipping to</p>
                          <p className="text-xs text-gray-500">
                            {order.shippingAddress.firstName} {order.shippingAddress.lastName},&nbsp;
                            {order.shippingAddress.address1},&nbsp;
                            {order.shippingAddress.city}, {order.shippingAddress.state}&nbsp;
                            {order.shippingAddress.zipCode}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`/order/${order._id}`)}
                        className="flex-1 border border-[#1e293b] text-[#1e293b] text-xs py-2.5 rounded-lg tracking-wider uppercase hover:bg-[#1e293b] hover:text-white transition-colors flex items-center justify-center gap-2"
                      >
                        <Package size={13} /> View Details
                      </button>
                      <button
                        onClick={() => navigate("/shop")}
                        className="flex-1 bg-[#1e293b] text-white text-xs py-2.5 rounded-lg tracking-wider uppercase hover:bg-[#f57c20] transition-colors flex items-center justify-center gap-2"
                      >
                        Buy Again <ArrowRight size={13} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default OrdersSection;