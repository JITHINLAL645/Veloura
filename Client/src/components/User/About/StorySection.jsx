import about3 from "../../../assets/about3.png";

const StorySection = () => {
  return (
    <section className="bg-[#f7f4f2] py-20 px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
        
        <div className="max-w-[560px]">
          <h2 className="font-serif text-[42px] md:text-[56px] leading-[1.08] text-black mb-8">
            The Story Behind the
            <br />
            Seams
          </h2>

          <div className="space-y-8 text-[#4b4b4b] text-[18px] leading-[1.75]">
            <p>
              Vaijayanti opened VELOURA Designs in 2012 with a mission to
              empower every bride with confidence, beauty, and authenticity.
              The journey wasn't easy — from building trust to doing 14
              fashion shows in her first year just to create awareness. But
              with determination and digital savvy, she built a loyal
              clientele and a beloved brand.
            </p>

            <p>
              Today, VELOURA Designs is not just a boutique — it's a bridal
              destination known for exceptional service, deep cultural
              understanding, and stunning craftsmanship.
            </p>

            <p className="italic">
              “When a bride tells me she feels relaxed after walking in,
              that's success.”
            </p>
          </div>

          <div className="mt-12">
            <button
              onClick={() => (window.location.href = "/contact")}
              className="
                bg-[#A51515]
                hover:bg-[#861111]
                text-white
                uppercase
                tracking-[2px]
                px-10
                py-4
                rounded-md
                text-sm
                font-medium
                transition
              "
            >
              Visit Our Showroom
            </button>
          </div>
        </div>

        <div className="flex justify-center md:justify-end">
          <div className="relative w-[560px] h-[760px]">
            
            <div
              className="
                absolute
                top-[40px]
                right-0
                w-[74%]
                h-[92%]
                bg-gradient-to-r
                from-[#c99512]
                via-[#f0cd56]
                to-[#dba514]
              "
            />

            <div
              className="
                absolute
                left-[2%]
                top-1/2
                -translate-y-1/2
                w-[76%]
                h-[82%]
                overflow-hidden
                shadow-2xl
              "
            >
              <img
                src={about3}
                alt="The Story Behind the Seams"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;