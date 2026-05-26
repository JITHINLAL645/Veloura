function NewsletterSection() {
  return (
    <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw] bg-black py-16 md:py-20">
      <div className="max-w-5xl mx-auto px-6 text-center">

        <p className="text-white/70 uppercase tracking-[4px] text-sm mb-5">
          Keep Me Updated
        </p>

        <h2 className="text-white text-5xl font-serif mb-6">
          NEWSLETTER
        </h2>

        <p className="text-white/60 text-base md:text-xl max-w-3xl mx-auto leading-relaxed">
          Get exclusive offers, latest collections, and style tips
          straight to your inbox!
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-5 mt-12">

          <input
            type="email"
            placeholder="E-mail"
            className="w-full md:w-[420px] bg-transparent border border-white/20 text-white placeholder:text-white/40 px-6 py-4 text-lg outline-none"
          />

          <button className="bg-[#f3efed] text-black px-12 py-4 text-2xl font-serif hover:bg-white transition-all duration-300">
            Send
          </button>

        </div>
      </div>
    </div>
  );
}

export default NewsletterSection;