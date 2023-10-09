"use client";

import { useState, useEffect } from "react";

const mobileMediaQuery = "(min-width: 768px)";

const useMediaQuery = () => {
  const isClient = typeof window === "object";

  const [matches, setMatches] = useState(
    isClient ? window.matchMedia(mobileMediaQuery).matches : false
  );

  useEffect(() => {
    const query = window?.matchMedia(mobileMediaQuery);

    function handleQueryChange(queryEvent) {
      setMatches(queryEvent.matches);
    }

    query.addEventListener("change", handleQueryChange);

    return () => {
      query.removeEventListener("change", handleQueryChange);
    };
  }, [mobileMediaQuery]);

  return matches;
};

export default useMediaQuery;
