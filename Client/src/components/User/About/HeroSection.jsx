import aboutHero from "../../../assets/about1.png";

function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center bg-black overflow-hidden">
      <img
        src={aboutHero}
        alt="Indian Bridal Couture"
        className="absolute inset-0 w-full h-full object-cover opacity-90"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80"></div>

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-serif text-white tracking-wide leading-tight">
          Indian Bridal Couture
        </h1>

        <p className="mt-6 text-xl md:text-3xl text-white/90 font-light leading-relaxed">
          A Timeless Journey of Bridal Elegance, Passion & Purpose
        </p>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/70 text-xs md:text-sm tracking-[5px] uppercase">
        Veloura Designs
      </div>
    </section>
  );
}

export default HeroSection;