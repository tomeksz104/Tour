import { useState, useEffect } from "react";

const mobileMediaQuery = "(min-width: 768px)";

const useMediaQuery = () => {
  const [matches, setMatches] = useState(
    window.matchMedia(mobileMediaQuery).matches
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
