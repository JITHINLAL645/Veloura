import home6 from "../../../assets/home6.png";
import home7 from "../../../assets/home7.png";
import home8 from "../../../assets/home8.png";
import home9 from "../../../assets/home9.png";
import home10 from "../../../assets/home10.png";

function BridalCollection() {
  return (
    <div className="pb-20">

      <div className="text-center mb-12">
        <p className="uppercase tracking-[5px] text-sm text-gray-500 mb-3">
          Exclusive Collection
        </p>

        <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900">
          Bridal Luxury Edit
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">

        <div className="md:col-span-6 relative overflow-hidden rounded-3xl group h-[320px]">
          <img
            src={home6}
            alt="Princess Lace Ball Gown"
            className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

          <div className="absolute top-6 left-6">
            <h3 className="text-black text-3xl font-serif">
            </h3>

            <p className="text-white/80 mt-2 text-sm max-w-sm">
            </p>
             <button className="mt-4 bg-white text-black px-5 py-2 mt-60  rounded-full text-sm font-medium hover:bg-gray-200 transition">
              Explore
            </button>
          </div>
        </div>

        <div className="md:col-span-6 relative overflow-hidden rounded-3xl group h-[320px]">
          <img
            src={home7}
            alt="Classic White Cathedral Bridal Dress"
            className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

          <div className="absolute top-6 left-6">
            <h3 className="text-black text-2xl font-serif max-w-md">
            </h3>

            <p className="text-white/80 mt-2 text-sm max-w-sm">
            </p>
             <button className="mt-4 bg-white text-black px-5 py-2 mt-60  rounded-full text-sm font-medium hover:bg-gray-200 transition">
              Explore
            </button>
            
          </div>
          
        </div>

        <div className="md:col-span-4 relative overflow-hidden rounded-3xl group h-[500px]">
          <img
            src={home8}
            alt="Royal Blue"
            className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

          <div className="absolute bottom-6 left-6">
            <h3 className="text-white text-3xl font-serif">
              Royal Blue
            </h3>

            <button className="mt-4 bg-white text-black px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition">
              Explore
            </button>
          </div>
        </div>

        <div className="md:col-span-4 relative overflow-hidden rounded-3xl group h-[500px]">
          <img
            src={home9}
            alt="Golden Glow"
            className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

          <div className="absolute bottom-6 left-6">
            <h3 className="text-white text-3xl font-serif">
              Golden Glow
            </h3>

            <button className="mt-4 bg-white text-black px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition">
              Explore
            </button>
          </div>
        </div>

        <div className="md:col-span-4 relative overflow-hidden rounded-3xl group h-[500px]">
          <img
            src={home10}
            alt="Ruby Queen"
            className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

          <div className="absolute bottom-6 left-6">
            <h3 className="text-white text-3xl font-serif">
              Ruby Queen
            </h3>

            <button className="mt-4 bg-white text-black px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition">
              Explore
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default BridalCollection;