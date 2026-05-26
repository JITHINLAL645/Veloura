import homeImage from "../../../assets/home1.jpeg";

function HeroSection() {
  return (
    <div className="relative w-full h-[80vh] rounded-b-[80px] overflow-hidden">
      <img
        src={homeImage}
        className="w-full h-full object-cover"
        alt="hero"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10"></div>

      <div className="absolute inset-0 flex flex-col justify-center px-10 md:px-20">
        <h1 className="text-white text-5xl md:text-6xl font-bold font-serif">
          The Great Escape
        </h1>

        <p className="text-white/90 text-lg md:text-xl mt-4 max-w-xl">
          Warm-weather styles that take you in and out of the city with
          comfort and elegance.
        </p>

        <div className="flex gap-4 mt-6">
          <button className="bg-[#e5a93b] hover:bg-[#d4982c] text-black px-8 py-3 rounded-full text-sm font-medium transition">
            Shop Collections
          </button>

          <button className="border border-white text-white px-8 py-3 rounded-full text-sm hover:bg-white/10 transition">
            Explore More
          </button>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;