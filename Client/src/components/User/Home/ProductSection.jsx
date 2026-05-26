import home2 from "../../../assets/home2.png";
import home3 from "../../../assets/home3.png";
import home4 from "../../../assets/home4.png";
import home5 from "../../../assets/home5.png";

function ProductSection() {
  const products = [
    {
      image: home2,
      title: "Royal Wine Red Lehenga",
      price: "Rs. 1,49,999.99",
      oldPrice: "Rs. 2,79,999.99",
      offer: "Save 45%",
    },
    {
      image: home3,
      title: "Elegant Bridal Wear",
      price: "Rs. 1,99,999.99",
      oldPrice: "Rs. 3,19,999.99",
      offer: "Save 35%",
    },
    {
      image: home4,
      title: "Golden Traditional Outfit",
      price: "Rs. 2,49,999.99",
      oldPrice: "Rs. 4,49,999.99",
      offer: "Save 50%",
    },
    {
      image: home5,
      title: "Luxury Wedding Collection",
      price: "Rs. 1,89,999.99",
      oldPrice: "Rs. 2,99,999.99",
      offer: "Save 40%",
    },
  ];

  return (
    <div className="mt-16 pb-16">
      <div className="text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tight">
          Spring Summer 26
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-2">
        {products.map((item, index) => (
          <div
            key={index}
            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
          >
            <div className="relative overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-500"
              />

              <div className="absolute top-3 left-3 bg-red-800 text-white text-xs px-3 py-1 rounded-full">
                {item.offer}
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-medium text-lg text-gray-900">
                {item.title}
              </h3>

              <p className="text-red-800 font-semibold mt-1">
                {item.price}

                <span className="text-gray-400 line-through text-sm ml-2">
                  {item.oldPrice}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <button className="bg-black text-white px-10 py-3.5 rounded-full font-medium hover:bg-gray-800 transition text-sm tracking-wider">
          VIEW ALL
        </button>
      </div>
    </div>
  );
}

export default ProductSection;