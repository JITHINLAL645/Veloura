import { Link } from "react-router-dom";

const API = "http://localhost:5000";

function ProductCard({ product }) {
  const thumbnail =
    product.images?.length > 0
      ? `${API}${product.images[0]}`
      : null;

  return (
    <Link to={`/product/${product._id}`}>
      <div className="group cursor-pointer">

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
            ₹{Number(product.price).toLocaleString("en-IN")}
          </p>
        </div>

      </div>
    </Link>
  );
}

export default ProductCard;