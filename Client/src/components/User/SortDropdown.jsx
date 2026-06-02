function SortDropdown({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border px-4 py-3 bg-white outline-none w-[220px]"
    >
      <option value="">Sort By</option>
      <option value="newest">Newest First</option>
      <option value="price_asc">Price Low To High</option>
      <option value="price_desc">Price High To Low</option>
    </select>
  );
}

export default SortDropdown;