import { Star, Gift, Building2, BadgeCheck } from "lucide-react";

function StatsSection() {
  return (
    <div className="border-t border-gray-300 py-16 mb-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">

        <div className="flex flex-col items-center">
          <div className="w-14 h-14 rounded-full border border-gray-300 flex items-center justify-center mb-5">
            <Star size={26} className="text-black" />
          </div>

          <h3 className="text-2xl font-serif font-semibold text-gray-900">
            2.5M+
          </h3>

          <p className="text-gray-600 mt-2">
            households reached
          </p>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-14 h-14 rounded-full border border-gray-300 flex items-center justify-center mb-5">
            <Gift size={26} className="text-black" />
          </div>

          <h3 className="text-2xl font-serif font-semibold text-gray-900">
            7.5M+
          </h3>

          <p className="text-gray-600 mt-2">
            outfits sold
          </p>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-14 h-14 rounded-full border border-gray-300 flex items-center justify-center mb-5">
            <Building2 size={26} className="text-black" />
          </div>

          <h3 className="text-2xl font-serif font-semibold text-gray-900">
            150+
          </h3>

          <p className="text-gray-600 mt-2">
            stores spanning 5 countries
          </p>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-14 h-14 rounded-full border border-gray-300 flex items-center justify-center mb-5">
            <BadgeCheck size={26} className="text-black" />
          </div>

          <h3 className="text-2xl font-serif font-semibold text-gray-900">
            Trusted
          </h3>

          <p className="text-gray-600 mt-2">
            On Myntra, Nykaa Fashion & more
          </p>
        </div>

      </div>
    </div>
  );
}

export default StatsSection;