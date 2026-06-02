import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const API = "http://localhost:5000";

function FilterSection({ label, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-300">
      <div
        className="flex justify-between items-center py-4 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <span className="text-[#3d4f6e] text-xs font-semibold tracking-widest">
          {label}
        </span>
        <ChevronDown
          size={16}
          className={`text-gray-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </div>
      {open && <div className="pb-3">{children}</div>}
    </div>
  );
}

function CheckList({ items, selected, onToggle }) {
  if (!items || items.length === 0)
    return <p className="text-xs text-gray-400 pb-2">No options available</p>;

  return items.map((item) => (
    <label key={item} className="flex items-center gap-2.5 py-1.5 cursor-pointer">
      <input
        type="checkbox"
        checked={selected.includes(item)}
        onChange={() => onToggle(item)}
        className="w-3.5 h-3.5 accent-[#3d4f6e] flex-shrink-0"
      />
      <span className="text-[#3d4f6e] text-xs">{item}</span>
    </label>
  ));
}

function FilterSidebar({ onFilterChange }) {
  const [options, setOptions] = useState({
    collections: [],
    colors: [],
    fabrics: [],
    priceRange: { min: 0, max: 500000 },
  });

  const [selectedCollections, setSelectedCollections] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedFabrics, setSelectedFabrics] = useState([]);
  const [maxPrice, setMaxPrice] = useState(null); // null = no filter applied yet

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const res = await fetch(`${API}/api/products/filter-options`);
        const data = await res.json();
        if (data.success) {
          setOptions(data);
          // initialise price slider to max
          setMaxPrice(data.priceRange.max);
        }
      } catch (err) {
        console.error("Failed to load filter options", err);
      }
    };
    fetchOptions();
  }, []);

  // emit changes upward whenever any filter changes
  useEffect(() => {
    if (maxPrice === null) return; // wait until options are loaded
    onFilterChange({
      collections: selectedCollections,
      colors: selectedColors,
      fabrics: selectedFabrics,
      maxPrice,
      minPrice: options.priceRange.min,
    });
  }, [selectedCollections, selectedColors, selectedFabrics, maxPrice]);

  const toggle = (setter) => (value) =>
    setter((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );

  const handleClearAll = () => {
    setSelectedCollections([]);
    setSelectedColors([]);
    setSelectedFabrics([]);
    setMaxPrice(options.priceRange.max);
  };

  const hasActiveFilters =
    selectedCollections.length > 0 ||
    selectedColors.length > 0 ||
    selectedFabrics.length > 0 ||
    (maxPrice !== null && maxPrice < options.priceRange.max);

  return (
    <div className="bg-[#f5f2f2] p-8 min-h-full">

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[#b8860b] text-3xl font-serif">FILTER BY</h2>
        {hasActiveFilters && (
          <button
            onClick={handleClearAll}
            className="text-xs text-[#3d4f6e] underline hover:text-[#b8860b] transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {/* COLLECTIONS */}
      <FilterSection label="COLLECTIONS">
        <CheckList
          items={options.collections}
          selected={selectedCollections}
          onToggle={toggle(setSelectedCollections)}
        />
      </FilterSection>

      {/* COLOR */}
      <FilterSection label="COLOR">
        {options.colors.length === 0 ? (
          <p className="text-xs text-gray-400 pb-2">No options available</p>
        ) : (
          options.colors.map((color) => (
            <label key={color} className="flex items-center gap-2.5 py-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedColors.includes(color)}
                onChange={() => toggle(setSelectedColors)(color)}
                className="w-3.5 h-3.5 accent-[#3d4f6e] flex-shrink-0"
              />
              <span className="text-[#3d4f6e] text-xs">{color}</span>
            </label>
          ))
        )}
      </FilterSection>

      {/* FABRIC */}
      <FilterSection label="FABRIC">
        <CheckList
          items={options.fabrics}
          selected={selectedFabrics}
          onToggle={toggle(setSelectedFabrics)}
        />
      </FilterSection>

      {/* PRICE */}
      <FilterSection label="PRICE">
        {maxPrice !== null && (
          <div className="space-y-2 pt-1">
            <p className="text-xs text-[#3d4f6e]">Up to price</p>
            <input
              type="range"
              min={options.priceRange.min}
              max={options.priceRange.max}
              step={1000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#3d4f6e]"
            />
            <div className="flex justify-between text-xs text-[#3d4f6e]">
              <span>₹{Number(options.priceRange.min).toLocaleString("en-IN")}</span>
              <span className="font-semibold">₹{Number(maxPrice).toLocaleString("en-IN")}</span>
              <span>₹{Number(options.priceRange.max).toLocaleString("en-IN")}</span>
            </div>
          </div>
        )}
      </FilterSection>

    </div>
  );
}

export default FilterSidebar;