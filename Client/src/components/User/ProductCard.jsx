import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useState } from "react";

const API = "http://localhost:5000";

function ProductCard({ product }) {
  const [wishlisted, setWishlisted] =
    useState(false);

  const thumbnail =
    product.images?.length > 0
      ? `${API}${product.images[0]}`
      : null;

  const handleWishlist = async (e) => {
    e.preventDefault();

    const user = JSON.parse(
      localStorage.getItem("user")
    );

    if (!user) {
      alert("Please Login");
      return;
    }

    try {
      const response = await fetch(
        `${API}/api/wishlist/add`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            userId: user._id,
            productId: product._id,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setWishlisted(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Link to={`/product/${product._id}`}>
      <div className="group cursor-pointer relative">

        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 z-10 bg-white w-10 h-10 rounded-full flex items-center justify-center shadow"
        >
          <Heart
            size={18}
            fill={
              wishlisted ? "black" : "white"
            }
            className="text-black"
          />
        </button>

        <div className="overflow-hidden bg-gray-100">

          {thumbnail ? (
            <img
              src={thumbnail}
              alt={product.name}
              className="w-full h-[450px] object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-[450px] flex items-center justify-center bg-gray-100">
              No Image
            </div>
          )}

        </div>

        <div className="pt-3">

          <h3 className="text-sm text-gray-700">
            {product.name}
          </h3>

          <p className="font-semibold mt-1">
            ₹
            {Number(
              product.price
            ).toLocaleString("en-IN")}
          </p>

        </div>

      </div>
    </Link>
  );
}

export default ProductCard;