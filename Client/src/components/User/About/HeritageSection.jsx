import about4 from "../../../assets/about4.png";

const HeritageSection = () => {
  return (
    <section className="bg-[#f7f4f2] py-24 px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
        
        {/* LEFT IMAGE */}
        <div className="flex justify-center md:justify-start">
          <div className="relative w-full max-w-[560px] h-[780px]">
            <div className="absolute inset-0 overflow-hidden shadow-xl">
              <img
                src={about4}
                alt="Bridal Heritage"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="max-w-[600px]">
          <h2 className="font-serif text-[42px] md:text-[40px] leading-[1.08] text-black mb-10">
            Where Heritage Meets
            <br />
            Modern Elegance
          </h2>

          <p className="text-[#4b4b4b] text-[15px] leading-[1.8] mb-10">
            From the classic red lehenga to fusion silhouettes for today's
            global bride, our couture celebrates:
          </p>

          {/* FEATURES */}
          <div className="space-y-10">
            
            {/* ITEM 1 */}
            <div className="flex items-start gap-5">
              <div className="w-2 h-2 rounded-full bg-black mt-3 shrink-0"></div>

              <p className="text-[#4b4b4b] text-[15px] leading-[1.8]">
                Rich Indian craftsmanship — zardozi, gotta patti, chikankari &
                more
              </p>
            </div>

            {/* ITEM 2 */}
            <div className="flex items-start gap-5">
              <div className="w-2 h-2 rounded-full bg-black mt-3 shrink-0"></div>

              <p className="text-[#4b4b4b] text-[15px] leading-[1.8]">
                Premium fabrics sourced for beauty and comfort
              </p>
            </div>

            {/* ITEM 3 */}
            <div className="flex items-start gap-5">
              <div className="w-2 h-2 rounded-full bg-black mt-3 shrink-0"></div>

              <p className="text-[#4b4b4b] text-[15px] leading-[1.8]">
                Contemporary cuts that flatter every figure and vision
              </p>
            </div>
          </div>

          <p className="mt-14 text-[#4b4b4b] text-[18px] leading-[1.9]">
            Each piece is a work of art — tailored not just for fit, but for
            legacy.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeritageSection;