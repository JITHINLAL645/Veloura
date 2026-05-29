import home12 from "../../../assets/home12.png";

function StoreSection() {
  return (
    <section className="w-screen relative left-1/2 right-1/2 -mx-[50vw] bg-[#f4efec] overflow-hidden">
      
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[750px]">

        <div className="flex items-center justify-center px-6 sm:px-10 md:px-16 lg:px-20 py-16 md:py-20">
          
          <div className="max-w-lg w-full">

            <p className="uppercase tracking-[4px] text-sm text-gray-500 mb-4">
              Visit Us
            </p>

            <h2 className="text-4xl md:text-5xl font-serif text-black leading-tight mb-14">
              FLAGSHIP STORES
            </h2>

            <div className="border-b border-gray-300 pb-10 mb-10">

              <h3 className="text-3xl font-serif text-black mb-4">
                Kochi
              </h3>

              <div className="space-y-2 text-gray-700 text-base md:text-lg leading-relaxed font-light">
                <p>MG Road</p>

                <p>Veloure House, 21 Fashion Avenue</p>

                <p>Kochi, Kerala 682016</p>
              </div>

              <div className="mt-8 space-y-2 text-gray-700 text-base md:text-lg leading-relaxed">
                <p>hello@veloure.com</p>

                <p>+91 98765 43210</p>
              </div>
            </div>

            <div>

              <h3 className="text-3xl font-serif text-black mb-4">
                Kasaragod
              </h3>

              <div className="space-y-2 text-gray-700 text-base md:text-lg leading-relaxed font-light">
                <p>City Center</p>

                <p>12 Premium Plaza</p>

                <p>Kasaragod, Kerala 671121</p>
              </div>

              <div className="mt-8 space-y-2 text-gray-700 text-base md:text-lg leading-relaxed">
                <p>support@veloure.com</p>

                <p>+91 98765 43211</p>
              </div>

            </div>

          </div>
        </div>

        <div className="relative h-[500px] lg:h-auto">

          <img
            src={home12}
            alt="Veloure Flagship Store"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/10"></div>

        </div>
      </div>
    </section>
  );
}

export default StoreSection;