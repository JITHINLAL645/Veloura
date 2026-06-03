import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/User/Navbar";
import Footer from "../../components/User/Footer";
import {
  ArrowLeft,
  ChevronDown,
  Check,
  MessageCircle,
  Loader2,
} from "lucide-react";

const API = "http://localhost:5000";

const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Lakshadweep",
  "Puducherry",
  "Ladakh",
  "Jammu and Kashmir",
];

function Checkout() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [redirecting, setRedirecting] = useState(false);
  const [verifyError, setVerifyError] = useState("");
  const [phoneVerified, setPhoneVerified] = useState(false);

  const [form, setForm] = useState({
    phone: "",
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    country: "India",
    zipCode: "",
    city: "",
    state: "",
    recipientPhone: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  //   const user = JSON.parse(localStorage.getItem("user"));
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await fetch(`${API}/api/cart/${user._id}`);
      const data = await response.json();
      if (data.success) setCart(data.cart);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const subtotal =
    cart?.items?.reduce((t, i) => t + i.product.price * i.quantity, 0) || 0;
  const totalItems = cart?.items?.reduce((t, i) => t + i.quantity, 0) || 0;

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleVerifyPhone = () => {
    if (!form.phone || form.phone.length !== 10 || !/^\d+$/.test(form.phone)) {
      setVerifyError("The mobile number entered is invalid. Try again!");
      setPhoneVerified(false);
      return;
    }
    setVerifyError("");
    setPhoneVerified(true);
  };

  const validateShipping = () => {
    const newErrors = {};
    if (!form.phone) newErrors.phone = "Phone is required";
    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!form.address1.trim()) newErrors.address1 = "Address is required";
    if (!form.zipCode.trim()) newErrors.zipCode = "ZIP code is required";
    if (!form.city.trim()) newErrors.city = "City is required";
    if (!form.state) newErrors.state = "State is required";
    if (!form.recipientPhone)
      newErrors.recipientPhone = "Recipient phone is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextPayment = async () => {
    if (!validateShipping()) return;
    if (!cart?.items?.length) return;

    setRedirecting(true);

    try {
      const response = await fetch(`${API}/api/payment/create-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user._id,
          shippingAddress: {
            phone: form.phone,
            firstName: form.firstName,
            lastName: form.lastName,
            address1: form.address1,
            address2: form.address2,
            city: form.city,
            state: form.state,
            zipCode: form.zipCode,
            country: form.country,
            recipientPhone: form.recipientPhone,
          },
          items: cart.items,
          totalAmount: subtotal,
        }),
      });

      const data = await response.json();

      if (data.success) {
        window.location.href = data.url;
      } else {
        alert(data.message || "Failed to create payment session. Try again.");
        setRedirecting(false);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
      setRedirecting(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#f4f1eb]">
        <div className="text-gray-500 tracking-widest text-sm uppercase animate-pulse">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-[#f4f1eb]">
        {/* Top bar */}
        <div className="border-b border-gray-200 bg-[#f4f1eb]">
          <div className="max-w-[1350px] mx-auto px-6 py-4 flex items-center justify-between">
            <button
              onClick={() => navigate("/cart")}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#1e293b] transition-colors"
            >
              <ArrowLeft size={16} />
              Back to Shopping
            </button>

            <a
              href="https://wa.me/919999313366"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#1e293b] transition-colors"
            >
              <span>Need Help? Whatsapp Us +91 99993 13366</span>
              <MessageCircle size={16} className="text-green-600" />
            </a>
          </div>
        </div>

        <div className="max-w-[1350px] mx-auto px-6 py-10">
          <div className="grid lg:grid-cols-[58%_42%] gap-12">
            {/* LEFT — SHIPPING FORM */}
            <div>
              <div className="border border-[#1e293b] p-6 mb-8">
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">
                  Step 1 of 2
                </p>
                <h1
                  className="text-[42px] text-[#1e293b]"
                  style={{ fontFamily: "serif" }}
                >
                  Shipping
                </h1>
              </div>

              <div className="space-y-6">
                {/* Phone */}
                <div>
                  <div className="flex border-b border-gray-300 bg-white">
                    <div className="flex items-center px-3 border-r border-gray-300 text-sm text-gray-600 gap-1 flex-shrink-0">
                      +91 (IN) <ChevronDown size={14} />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleFormChange}
                      placeholder="Phone Number *"
                      maxLength={10}
                      className="flex-1 px-4 py-3 text-sm bg-transparent outline-none placeholder-gray-400"
                    />
                    <button
                      onClick={handleVerifyPhone}
                      className="px-4 text-xs tracking-widest uppercase text-gray-500 hover:text-[#1e293b] transition-colors flex-shrink-0"
                    >
                      Verify
                    </button>
                  </div>
                  {verifyError && (
                    <p className="text-red-500 text-xs mt-1">{verifyError}</p>
                  )}
                  {phoneVerified && !verifyError && (
                    <p className="text-green-600 text-xs mt-1 flex items-center gap-1">
                      <Check size={12} /> Phone verified
                    </p>
                  )}
                  {errors.phone && !verifyError && (
                    <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                  )}
                </div>

                {/* Shipping Address */}
                <div>
                  <h3 className="text-xs font-semibold tracking-[2px] uppercase text-[#1e293b] mb-4">
                    Shipping Address
                  </h3>
                  <div className="space-y-4">
                    {/* First + Last Name */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <input
                          type="text"
                          name="firstName"
                          value={form.firstName}
                          onChange={handleFormChange}
                          placeholder="First Name *"
                          className="w-full border-b border-gray-300 bg-transparent py-3 text-sm outline-none placeholder-gray-400 focus:border-[#1e293b] transition-colors"
                        />
                        {errors.firstName && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.firstName}
                          </p>
                        )}
                      </div>
                      <div>
                        <input
                          type="text"
                          name="lastName"
                          value={form.lastName}
                          onChange={handleFormChange}
                          placeholder="Last Name *"
                          className="w-full border-b border-gray-300 bg-transparent py-3 text-sm outline-none placeholder-gray-400 focus:border-[#1e293b] transition-colors"
                        />
                        {errors.lastName && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.lastName}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Address 1 */}
                    <div>
                      <input
                        type="text"
                        name="address1"
                        value={form.address1}
                        onChange={handleFormChange}
                        placeholder="Address 1 *"
                        className="w-full border-b border-gray-300 bg-transparent py-3 text-sm outline-none placeholder-gray-400 focus:border-[#1e293b] transition-colors"
                      />
                      {errors.address1 && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.address1}
                        </p>
                      )}
                    </div>

                    {/* Address 2 */}
                    <input
                      type="text"
                      name="address2"
                      value={form.address2}
                      onChange={handleFormChange}
                      placeholder="Address 2"
                      className="w-full border-b border-gray-300 bg-transparent py-3 text-sm outline-none placeholder-gray-400 focus:border-[#1e293b] transition-colors"
                    />

                    {/* Country + ZIP */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative">
                        <select
                          name="country"
                          value={form.country}
                          onChange={handleFormChange}
                          className="w-full border border-gray-300 bg-white py-3 px-3 text-sm outline-none appearance-none focus:border-[#1e293b] transition-colors pr-8"
                        >
                          <option value="India">India</option>
                        </select>
                        <ChevronDown
                          size={14}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          name="zipCode"
                          value={form.zipCode}
                          onChange={handleFormChange}
                          placeholder="ZIP Code *"
                          maxLength={6}
                          className="w-full border-b border-gray-300 bg-transparent py-3 text-sm outline-none placeholder-gray-400 focus:border-[#1e293b] transition-colors"
                        />
                        {errors.zipCode && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.zipCode}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* City + State */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <input
                          type="text"
                          name="city"
                          value={form.city}
                          onChange={handleFormChange}
                          placeholder="City *"
                          className="w-full border-b border-gray-300 bg-transparent py-3 text-sm outline-none placeholder-gray-400 focus:border-[#1e293b] transition-colors"
                        />
                        {errors.city && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.city}
                          </p>
                        )}
                      </div>
                      <div className="relative">
                        <select
                          name="state"
                          value={form.state}
                          onChange={handleFormChange}
                          className="w-full border-b border-gray-300 bg-transparent py-3 text-sm outline-none appearance-none focus:border-[#1e293b] transition-colors pr-8"
                        >
                          <option value="">State *</option>
                          {INDIAN_STATES.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          size={14}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                        />
                        {errors.state && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.state}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Recipient Phone */}
                    <div>
                      <div className="flex border-b border-gray-300">
                        <div className="flex items-center pr-3 text-sm text-gray-600 gap-1 flex-shrink-0">
                          +91 (IN) <ChevronDown size={14} />
                        </div>
                        <input
                          type="tel"
                          name="recipientPhone"
                          value={form.recipientPhone}
                          onChange={handleFormChange}
                          placeholder="Recipient Phone Number *"
                          maxLength={10}
                          className="flex-1 py-3 text-sm bg-transparent outline-none placeholder-gray-400"
                        />
                      </div>
                      {errors.recipientPhone && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.recipientPhone}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={handleNextPayment}
                  disabled={redirecting}
                  className="w-full bg-[#1e293b] text-white py-4 text-sm tracking-[2px] uppercase hover:bg-[#334155] transition-colors duration-200 mt-4 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {redirecting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Redirecting
                      to Payment...
                    </>
                  ) : (
                    "Proceed to Payment"
                  )}
                </button>
              </div>
            </div>

            {/* RIGHT — ORDER SUMMARY */}
            <div>
              <div className="border border-gray-200 bg-white p-8 sticky top-6">
                <h3 className="text-xs font-semibold tracking-[2px] uppercase text-[#1e293b] mb-6">
                  Order Summary
                </h3>
                <div className="space-y-6">
                  {cart?.items?.map((item) => (
                    <div key={item._id}>
                      <div className="flex gap-4">
                        <img
                          src={`${API}${item.product.images[0]}`}
                          alt={item.product.name}
                          className="w-[80px] h-[100px] object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p
                            className="text-[#1e293b] font-medium text-sm leading-snug mb-1"
                            style={{ fontFamily: "serif" }}
                          >
                            {item.product.name}
                          </p>
                          <p className="text-sm font-semibold text-[#1e293b]">
                            ₹
                            {Number(item.product.price).toLocaleString("en-IN")}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Qty: {item.quantity}
                          </p>
                          {item.product.color && (
                            <p className="text-xs text-gray-500">
                              Colour: {item.product.color}
                            </p>
                          )}
                          <p className="text-xs text-gray-500">
                            Size: {item.size}
                          </p>
                        </div>
                      </div>
                      <div className="border-t border-gray-100 mt-4" />
                    </div>
                  ))}
                </div>

                <div className="mt-4 space-y-3">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>
                      Subtotal ({totalItems}{" "}
                      {totalItems === 1 ? "item" : "items"})
                    </span>
                    <span>₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Shipping</span>
                    <span className="text-green-700 font-medium">Free</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 flex justify-between font-semibold text-[#1e293b]">
                    <span>Payable Amount</span>
                    <span>₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                <button
                  onClick={handleNextPayment}
                  disabled={redirecting}
                  className="w-full mt-6 bg-[#1e293b] text-white py-4 text-sm tracking-[2px] uppercase hover:bg-[#334155] transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {redirecting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />{" "}
                      Redirecting...
                    </>
                  ) : (
                    "Proceed to Payment"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Checkout;
