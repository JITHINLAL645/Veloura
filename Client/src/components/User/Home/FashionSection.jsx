import home11 from "../../../assets/home11.png";

function FashionSection() {
  return (
    <section className="w-screen bg-black relative left-1/2 right-1/2 -mx-[50vw] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14 py-16 md:py-24">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* LEFT IMAGE */}
          <div className="flex justify-center">
            <div className="overflow-hidden rounded-[15px] w-full max-w-[560px]">
              <img
                src={home11}
                alt="Luxury Fashion"
                className="w-full h-[500px] md:h-[700px] object-cover  transition duration-700"
              />
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="text-white">

            {/* SUB TITLE */}
            <p className="uppercase tracking-[4px] text-sm text-white/50 mb-4">
              Luxury Collection
            </p>

            {/* TITLE */}
            <h2 className="text-4xl md:text-6xl font-serif leading-tight mb-8">
              Dresses
            </h2>

            {/* DESCRIPTION */}
            <div className="space-y-5 text-white/70 text-base md:text-lg leading-[1.9] font-light max-w-xl">

              <p>
                For casual outings and special occasions, women deserve
                stylish comfort blended with timeless elegance.
              </p>

              <p>
                Choose graceful dresses with modern charm and chic co-ords
                designed to elevate confidence every day.
              </p>

              <p>
                Explore trendy essentials inspired by luxury fashion and
                sophisticated ethnic aesthetics.
              </p>

              <p>
                Feel graceful in every step and radiant in every moment with
                styles crafted for modern women.
              </p>

            </div>

            {/* SMALL FEATURES */}
            <div className="grid grid-cols-2 gap-y-5 gap-x-8 mt-12">

              <div>
                <h3 className="text-2xl font-serif mb-1">
                  Premium
                </h3>

                <p className="text-white/50 text-sm">
                  Elegant quality fabrics
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-serif mb-1">
                  Modern
                </h3>

                <p className="text-white/50 text-sm">
                  Contemporary fashion styles
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-serif mb-1">
                  Comfort
                </h3>

                <p className="text-white/50 text-sm">
                  Crafted for daily elegance
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-serif mb-1">
                  Since 2026
                </h3>

                <p className="text-white/50 text-sm">
                  Luxury fashion experience
                </p>
              </div>

            </div>

            {/* BUTTON */}
            <div className="mt-14">
              <button className="bg-[#f3e9e7] text-black px-10 md:px-12 py-3.5 rounded-full text-base md:text-lg font-medium hover:bg-white transition-all duration-300">
                Explore Collection
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default FashionSection;