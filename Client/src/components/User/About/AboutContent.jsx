const AboutContent = () => {
  return (
    <section className="bg-white py-20 md:py-28 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <p className="uppercase tracking-[5px] text-sm text-gray-500 mb-5">
          About Veloura
        </p>

        <h2 className="text-4xl md:text-6xl font-serif text-gray-900 mb-12 leading-tight">
          Where Heritage Meets Haute Couture
        </h2>

        <div className="space-y-8 text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
          <p>
            At VELOURA Designs, we don't just design bridal wear — we craft
            heirlooms. Founded in the heart of the fashion world, VELOURA
            blends timeless Indian elegance with modern luxury couture.
          </p>

          <p>
            Every collection tells a story of artistry, culture,
            craftsmanship, and refined femininity — woven carefully into
            garments that celebrate every bride's individuality.
          </p>

          <p>
            From bridal lehengas and couture sarees to fusion gowns, luxury
            occasion wear, and handcrafted accessories, VELOURA offers an
            elevated destination for wedding fashion.
          </p>

          <p>
            From the first sketch to the final fitting, your dream bridal
            journey begins here.
          </p>
        </div>

        <div className="mt-14">
          <button
            onClick={() => (window.location.href = "/contact")}
            className="bg-[#9C2A2A] hover:bg-[#7E1F1F] transition-all duration-300 
            text-white px-14 py-4 text-lg tracking-wider rounded-sm"
          >
            PLAN YOUR VISIT
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutContent;