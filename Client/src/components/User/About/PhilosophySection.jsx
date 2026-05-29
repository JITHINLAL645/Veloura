import about2 from "../../../assets/about2.png";

const PhilosophySection = () => {
  return (
    <section className="py-20 md:py-28 px-6 md:px-12 bg-[#f7f3f0]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        <div className="flex justify-center md:justify-start">
          <div className="overflow-hidden rounded-[30px] w-full max-w-[520px] h-[700px] shadow-xl">
            <img
              src={about2}
              alt="Our Philosophy"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <p className="uppercase tracking-[5px] text-sm text-gray-500 mb-5">
            Our Philosophy
          </p>

          <h2 className="text-4xl md:text-5xl font-serif text-gray-900 leading-tight mb-8">
            Your Story,
            <br />
            Stitched in Silk
          </h2>

          <div className="space-y-6 text-gray-600 text-base md:text-lg leading-relaxed">
            <p>
              Every bride carries a universe of memories, emotions,
              traditions, and dreams.
            </p>

            <p>
              At VELOURA, we believe bridal couture should reflect all of that
              beautifully — through luxurious fabrics, detailed craftsmanship,
              and timeless silhouettes.
            </p>

            <p>
              Every hand-embroidered detail and every flowing silhouette is
              designed to make a bride feel graceful, confident, and
              unforgettable.
            </p>

            <p>
              More than fashion, VELOURA creations become cherished memories
              woven into a bride's story forever.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;