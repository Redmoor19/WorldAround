"use client";

import { IUser } from "@/src/models/User";
import SearchBar from "./SearchBar";
import { useState } from "react";
import TravelersList from "./TravelersList";

type TravelersProps = {
  users: IUser[] | undefined;
};

function Travelers({ users }: TravelersProps) {
  const [query, setQuery] = useState("");

  function handleSearch(query: string) {
    setQuery(query);
  }

  const searchTerm = query.toLocaleLowerCase();

  const filteredUsers = users?.filter((user) => {
    const countryMatch = user?.country?.toLowerCase().includes(searchTerm);
    const cityMatch = user?.city?.toLowerCase().includes(searchTerm);
    const usernameMatch = user?.name.toLowerCase().includes(searchTerm);

    return countryMatch || cityMatch || usernameMatch;
  });

  return (
    <div className="w-full h-full bg-slate-400">
      <div className="w-3/4 mx-auto pt-20">
        <SearchBar query={query} handleSearch={handleSearch} />
        {!users ? (
          "No users were found"
        ) : (
          <TravelersList users={filteredUsers!} />
        )}
      </div>
    </div>
  );
}

export default Travelers;
