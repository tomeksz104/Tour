import { useState, useEffect } from "react";

const mobileMediaQuery = "(min-width: 768px)";

const useMediaQuery = () => {
  const [matches, setMatches] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQueryList = window.matchMedia(mobileMediaQuery);
    setMatches(mediaQueryList.matches);

    function handleQueryChange(e) {
      setMatches(e.matches);
    }

    mediaQueryList.addEventListener("change", handleQueryChange);

    return () => {
      mediaQueryList.removeEventListener("change", handleQueryChange);
    };
  }, []);

  return matches;
};

export default useMediaQuery;

// "use client";

// import { useState, useEffect } from "react";

// const mobileMediaQuery = "(min-width: 768px)";

// const useMediaQuery = () => {
//   //const isClient = typeof window === "object";
//   const isClient = typeof window !== "undefined";

//   const [matches, setMatches] = useState(
//     isClient ? window.matchMedia(mobileMediaQuery).matches : false
//   );

//   useEffect(() => {
//     const query = window?.matchMedia(mobileMediaQuery);

//     function handleQueryChange(queryEvent) {
//       setMatches(queryEvent.matches);
//     }

//     query.addEventListener("change", handleQueryChange);

//     return () => {
//       query.removeEventListener("change", handleQueryChange);
//     };
//   }, []);

//   console.log(matches);
//   return matches;
// };

// export default useMediaQuery;
