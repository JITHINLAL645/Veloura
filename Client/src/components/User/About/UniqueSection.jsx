import about5 from "../../../assets/about5.png";
import about6 from "../../../assets/about6.png";
import about7 from "../../../assets/about7.png";
import about8 from "../../../assets/about8.png";

const UniqueSection = () => {
  return (
    <section className="bg-[#f7f4f2] py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-20">
          <h2 className="font-serif text-[42px] md:text-[45px] leading-tight text-black">
            What Makes VELOURA Unique?
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-x-10 gap-y-20">
          
          <div>
            <div className="overflow-hidden shadow-sm">
              <img
                src={about5}
                alt="Authenticity & Artistry"
                className="w-full h-[420px] object-cover"
              />
            </div>

            <div className="pt-8 text-center">
              <h3 className="font-serif text-[34px] leading-tight text-black mb-5">
                Authenticity & Artistry
              </h3>

              <p className="text-[#4b4b4b] text-[18px] leading-[1.8] max-w-[520px] mx-auto">
                We preserve Indian traditions through expert artisan work
              </p>
            </div>
          </div>

          <div>
            <div className="overflow-hidden shadow-sm">
              <img
                src={about6}
                alt="Custom Tailoring"
                className="w-full h-[420px] object-cover"
              />
            </div>

            <div className="pt-8 text-center">
              <h3 className="font-serif text-[34px] leading-tight text-black mb-5">
                Custom Tailoring
              </h3>

              <p className="text-[#4b4b4b] text-[18px] leading-[1.8] max-w-[520px] mx-auto">
                Each outfit is made-to-measure and deeply personalized
              </p>
            </div>
          </div>

          <div>
            <div className="overflow-hidden shadow-sm">
              <img
                src={about7}
                alt="Bridal-First Approach"
                className="w-full h-[420px] object-cover"
              />
            </div>

            <div className="pt-8 text-center">
              <h3 className="font-serif text-[34px] leading-tight text-black mb-5">
                Bridal-First Approach
              </h3>

              <p className="text-[#4b4b4b] text-[18px] leading-[1.8] max-w-[520px] mx-auto">
                We treat every bride as family — with warmth, patience, and
                passion
              </p>
            </div>
          </div>

          <div>
            <div className="overflow-hidden shadow-sm">
              <img
                src={about8}
                alt="One-Stop Bridal Studio"
                className="w-full h-[420px] object-cover"
              />
            </div>

            <div className="pt-8 text-center">
              <h3 className="font-serif text-[34px] leading-tight text-black mb-5">
                One-Stop Bridal Studio
              </h3>

              <p className="text-[#4b4b4b] text-[18px] leading-[1.8] max-w-[520px] mx-auto">
                Brides, grooms, and bridal parties can find coordinated looks
                under one roof.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default UniqueSection;