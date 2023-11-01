type SearchBarProps = {
  query: string;
  handleSearch: (query: string) => void;
};

function SearchBar({ query, handleSearch }: SearchBarProps) {
  return (
    <input
      value={query}
      onChange={(e) => handleSearch(e.target.value)}
      className="w-full ring-slate-500 ring-2 px-5 py-3 rounded-xl focus:ring-slate-600 focus:ring-4 outline-none"
    />
  );
}

export default SearchBar;
