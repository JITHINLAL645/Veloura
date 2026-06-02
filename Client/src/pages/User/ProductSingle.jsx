import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../../components/User/Navbar";
import Footer from "../../components/User/Footer";

const API = "http://localhost:5000";

function ProductSingle() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("M");

  const [showZoom, setShowZoom] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({
    x: 50,
    y: 50,
  });

  useEffect(() => {
    fetch(`${API}/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.product);

        if (data.product.images?.length) {
          setSelectedImage(`${API}${data.product.images[0]}`);
        }
      })
      .catch(console.error);
  }, [id]);

  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();

    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomPosition({ x, y });
  };

  if (!product) {
    return (
      <div className="h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <section className="bg-[#f7f4f4] min-h-screen py-8">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid lg:grid-cols-[58%_42%] gap-10">
            {/* LEFT SIDE */}
            <div>
              {/* MAIN IMAGE + ZOOM */}
              <div className="relative bg-white overflow-hidden">
                <div
                  className="relative cursor-crosshair overflow-hidden"
                  onMouseEnter={() => setShowZoom(true)}
                  onMouseLeave={() => setShowZoom(false)}
                  onMouseMove={handleMouseMove}
                >
                  <img
                    src={selectedImage}
                    alt={product.name}
                    className="w-full object-cover"
                  />

                  {showZoom && (
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        backgroundImage: `url(${selectedImage})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "250%",
                        backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                      }}
                    />
                  )}
                </div>
              </div>

              {/* GALLERY */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                {product.images?.map((img, index) => (
                  <img
                    key={index}
                    src={`${API}${img}`}
                    alt=""
                    onClick={() =>
                      setSelectedImage(`${API}${img}`)
                    }
                    className={`cursor-pointer object-cover w-full h-[320px] border transition-all duration-300 ${
                      selectedImage === `${API}${img}`
                        ? "border-black"
                        : "border-transparent"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="lg:sticky lg:top-24 self-start">
              <h1 className="font-serif text-[34px] leading-tight text-[#3c2f2f]">
                {product.name}
              </h1>

              <div className="mt-6">
                <p className="text-[36px] font-light">
                  ₹
                  {Number(product.price).toLocaleString(
                    "en-IN"
                  )}
                </p>

                <p className="text-xs text-gray-500 mt-2">
                  Tax included. Shipping calculated at
                  checkout.
                </p>
              </div>

              {/* SIZE */}
              <div className="mt-10">
                <p className="uppercase text-xs tracking-[2px] mb-4">
                  Size
                </p>

                <div className="flex flex-wrap gap-2">
                  {[
                    "XS",
                    "S",
                    "M",
                    "L",
                    "XL",
                    "XXL",
                  ].map((size) => (
                    <button
                      key={size}
                      onClick={() =>
                        setSelectedSize(size)
                      }
                      className={`px-4 py-2 text-sm border transition-all duration-200 ${
                        selectedSize === size
                          ? "bg-black text-white border-black"
                          : "border-gray-300 hover:border-black"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>

                <p className="mt-3 text-sm text-gray-500">
                  Selected Size :{" "}
                  <span className="font-medium text-black">
                    {selectedSize}
                  </span>
                </p>
              </div>

              <p className="mt-6 text-sm text-gray-600">
                Only at Veloura Designs — Perks You Won't
                Find Anywhere Else!
              </p>

              {/* FEATURES */}
              <div className="space-y-4 mt-8 text-sm text-gray-700">
                <div className="flex gap-3">
                  <span>📦</span>
                  <p>
                    Shipped to store free of charge.
                  </p>
                </div>

                <div className="flex gap-3">
                  <span>🚚</span>
                  <p>
                    Fast and secure delivery service.
                  </p>
                </div>

                <div className="flex gap-3">
                  <span>🌍</span>
                  <p>
                    International shipping available.
                  </p>
                </div>

                <div className="flex gap-3">
                  <span>♡</span>
                  <p>
                    One-time basic alterations free of
                    charge.
                  </p>
                </div>
              </div>

              {/* BUTTONS */}
              <div className="mt-8 space-y-3">
                <button className="w-full border border-black py-3 text-sm uppercase tracking-wide hover:bg-black hover:text-white transition">
                  Add To Cart
                </button>

                <button className="w-full bg-[#4b2df6] text-white py-3 text-sm font-medium hover:opacity-90">
                  Buy Now
                </button>
              </div>

              {/* DESCRIPTION */}
              <div className="mt-12">
                <h3 className="text-sm font-semibold mb-4">
                  Item Description :
                </h3>

                <p className="text-sm leading-7 text-gray-600">
                  {product.description ||
                    "This lehenga set features heavily embroidered floral patterns with intricate craftsmanship. Designed with luxury fabrics and detailed embellishments for weddings and special occasions."}
                </p>
              </div>

              {/* COLOR */}
              <div className="mt-8">
                <h3 className="font-medium">
                  Color :
                </h3>

                <p className="text-sm text-gray-600 mt-1">
                  {product.color}
                </p>
              </div>

              {/* DELIVERY */}
              <div className="mt-8">
                <h3 className="font-medium">
                  Delivery Details :
                </h3>

                <p className="text-sm text-gray-600 mt-2">
                  Delivery time 4-8 business weeks
                </p>
              </div>

              {/* DETAILS */}
              <div className="mt-8">
                <h3 className="font-medium mb-3">
                  Details :
                </h3>

                <ul className="text-sm text-gray-600 space-y-2 list-disc pl-5">
                  <li>Premium quality fabric.</li>
                  <li>Dry clean only.</li>
                  <li>
                    Slight variation in color is possible
                    due to photography and screen
                    settings.
                  </li>
                </ul>
              </div>

              {/* SHARE */}
              <div className="flex gap-8 mt-10 text-sm text-gray-700">
                <button className="hover:text-black">
                  Share
                </button>

                <button className="hover:text-black">
                  Facebook
                </button>

                <button className="hover:text-black">
                  Pin it
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

export default ProductSingle;