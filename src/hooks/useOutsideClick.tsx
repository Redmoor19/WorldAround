"use client";

import { useRef, useEffect } from "react";

type useOutsideClickProps = () => void;

function useOutsideClick(closeFunction: useOutsideClickProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node))
        closeFunction();
    }

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [closeFunction]);

  return ref;
}

export default useOutsideClick;
