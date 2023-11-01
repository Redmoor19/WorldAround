"use client";

import { useContext, createContext, useState } from "react";

type ShowContextType = {
  opened: string;
  openJourney: (id: string) => void;
  closeJourney: () => void;
};

const ShowContext = createContext({} as ShowContextType);

export function useShowContex() {
  return useContext(ShowContext);
}

export function ShowProvider({ children }: { children: React.ReactNode }) {
  const [opened, setOpened] = useState("");

  function openJourney(id: string) {
    setOpened(id);
  }

  function closeJourney() {
    setOpened("");
  }

  return (
    <ShowContext.Provider value={{ opened, openJourney, closeJourney }}>
      {children}
    </ShowContext.Provider>
  );
}
