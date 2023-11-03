import { MdPersonSearch } from "react-icons/md";

type SearchBarProps = {
  query: string;
  handleSearch: (query: string) => void;
};

function SearchBar({ query, handleSearch }: SearchBarProps) {
  return (
    <div className="relative">
      <input
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full ring-slate-500 ring-1 px-5 py-3 rounded-xl focus:ring-slate-600 focus:ring-2 outline-none pl-12 text-lg tracking-wider font-semibold"
      />
      <MdPersonSearch
        size={30}
        className="absolute left-3 top-0 bottom-0 my-auto text-slate-500"
      />
    </div>
  );
}

export default SearchBar;
