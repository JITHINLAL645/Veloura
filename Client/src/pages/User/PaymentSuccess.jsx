import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle,
  Package,
  ArrowRight,
  Loader2,
  XCircle,
} from "lucide-react";
import Navbar from "../../components/User/Navbar";
import Footer from "../../components/User/Footer";

const API = "http://localhost:5000";

function PaymentSuccess() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("verifying"); // "verifying" | "success" | "error"
  const [orderId, setOrderId] = useState(null);
  const [order, setOrder] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const sessionId = new URLSearchParams(window.location.search).get(
      "session_id",
    );
    if (!sessionId) {
      navigate("/");
      return;
    }
    verifyAndSaveOrder(sessionId);
  }, []);

  const verifyAndSaveOrder = async (sessionId) => {
    try {
      const res = await fetch(`${API}/api/payment/verify-payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      });

      const data = await res.json();

      if (data.success) {
        setOrderId(data.orderId);
        setStatus("success");
        fetchOrderDetails(data.orderId);
      } else {
        setErrorMsg(data.message || "Payment verification failed.");
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Something went wrong verifying your payment.");
      setStatus("error");
    }
  };

  const fetchOrderDetails = async (id) => {
    try {
      const res = await fetch(`${API}/api/checkout/${id}`);
      const data = await res.json();
      if (data.success) setOrder(data.order);
    } catch (err) {
      console.error(err);
    }
  };

  // ── Loading state ──────────────────────────────────────────────────────────
  if (status === "verifying") {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#f4f1eb] flex items-center justify-center">
          <div className="text-center">
            <Loader2
              size={40}
              className="animate-spin text-[#1e293b] mx-auto mb-4"
            />
            <p className="text-gray-500 text-sm tracking-widest uppercase">
              Confirming your payment...
            </p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // ── Error state ────────────────────────────────────────────────────────────
  if (status === "error") {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#f4f1eb] flex items-center justify-center px-4">
          <div className="bg-white border border-gray-200 p-10 text-center max-w-md w-full">
            <XCircle
              size={56}
              className="text-red-400 mx-auto mb-5"
              strokeWidth={1.5}
            />
            <h1
              className="text-2xl text-[#1e293b] mb-2"
              style={{ fontFamily: "serif" }}
            >
              Payment Issue
            </h1>
            <p className="text-gray-500 text-sm mb-6">{errorMsg}</p>
            <button
              onClick={() => navigate("/checkout")}
              className="bg-[#1e293b] text-white px-6 py-3 text-xs tracking-[2px] uppercase hover:bg-[#334155] transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // ── Success state ──────────────────────────────────────────────────────────
  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-[#f4f1eb] flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-lg">
          <div className="bg-white border border-gray-200 p-10 text-center">
            <CheckCircle
              size={56}
              className="text-green-500 mx-auto mb-5"
              strokeWidth={1.5}
            />
            <h1
              className="text-[36px] text-[#1e293b] mb-2"
              style={{ fontFamily: "serif" }}
            >
              Payment Successful!
            </h1>
            <p className="text-gray-500 text-sm mb-8">
              Thank you for your order. We'll send a confirmation to your
              registered details.
            </p>

            {/* Order Details */}
            <div className="bg-[#f4f1eb] p-5 text-left space-y-3 mb-8">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Order ID</span>
                <span className="font-mono text-[#1e293b] text-xs break-all">
                  {orderId}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Amount Paid</span>
                <span className="font-semibold text-[#1e293b]">
                  ₹
                  {order
                    ? Number(order.totalAmount).toLocaleString("en-IN")
                    : "..."}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Payment</span>
                <span className="text-[#1e293b]">Card (Stripe)</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Status</span>
                <span className="text-green-600 font-medium">Confirmed</span>
              </div>
              {order?.shippingAddress && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Ship To</span>
                  <span className="text-[#1e293b] text-right">
                    {order.shippingAddress.firstName}{" "}
                    {order.shippingAddress.lastName},{" "}
                    {order.shippingAddress.city}
                  </span>
                </div>
              )}
            </div>

            {/* Items */}
            {order?.items?.length > 0 && (
              <div className="text-left mb-8">
                <p className="text-xs font-semibold tracking-[2px] uppercase text-[#1e293b] mb-4">
                  Items Ordered
                </p>
                <div className="space-y-3">
                  {order.items.map((item) => (
                    <div key={item._id} className="flex gap-3 items-center">
                      <img
                        src={`${API}${item.product.images?.[0]}`}
                        alt={item.product.name}
                        className="w-12 h-16 object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-[#1e293b] font-medium truncate">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          Size: {item.size} · Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-[#1e293b] flex-shrink-0">
                        ₹{Number(item.price).toLocaleString("en-IN")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => navigate("/orders")}
                className="flex-1 flex items-center justify-center gap-2 border border-[#1e293b] text-[#1e293b] py-3 text-xs tracking-[2px] uppercase hover:bg-[#1e293b] hover:text-white transition-colors duration-200"
              >
                <Package size={14} /> View Orders
              </button>
              <button
                onClick={() => navigate("/")}
                className="flex-1 flex items-center justify-center gap-2 bg-[#1e293b] text-white py-3 text-xs tracking-[2px] uppercase hover:bg-[#334155] transition-colors duration-200"
              >
                Continue Shopping <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default PaymentSuccess;
