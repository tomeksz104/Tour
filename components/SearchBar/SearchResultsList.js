import { useEffect, useState } from "react";
import SearchResult from "./SearchResult";
import useLoadMore from "@/hooks/useLoadMore";

const SeatchResultList = ({ results, hideSuggestions, searchWordLength }) => {
  const { data: visiblePlaces, handleScroll } = useLoadMore(results, 10);
  //   const [visiblePlaces, setVisiblePlaces] = useState([]);
  //   const placesPerPage = 10;

  //   const handleScroll = (e) => {
  //     const container = e.target;

  //     if (
  //       container.scrollHeight - container.scrollTop ===
  //       container.clientHeight
  //     ) {
  //       loadMorePlaces(visiblePlaces.length);
  //     }
  //   };

  //   const loadMorePlaces = (startId) => {
  //     const newVisiblePlaces = results.slice(startId, startId + placesPerPage);

  //     if (startId === 0) {
  //       setVisiblePlaces(newVisiblePlaces);
  //     } else {
  //       setVisiblePlaces((prevVisiblePlaces) => [
  //         ...prevVisiblePlaces,
  //         ...newVisiblePlaces,
  //       ]);
  //     }
  //   };

  //   useEffect(() => {
  //     if (results.length > 0) {
  //       loadMorePlaces(0);
  //     }
  //   }, [results]);

  return (
    <div
      onScroll={handleScroll}
      className={`absolute z-50 mt-2 w-full overflow-auto max-h-96 rounded-md bg-white shadow-md ${
        hideSuggestions && "hidden"
      }`}
    >
      {results.length === 0 && searchWordLength >= 3 && (
        <h3 className="flex h-full w-full items-center justify-center py-10 font-semibold text-gray-400">
          No places found
        </h3>
      )}
      {searchWordLength < 3 && (
        <h3 className="flex h-full w-full items-center justify-center py-10 font-semibold text-gray-400">
          Type min. 3 characters
        </h3>
      )}
      {results.length > 0 &&
        visiblePlaces.map((place, id) => {
          return <SearchResult place={place} key={id} />;
        })}
    </div>
  );
};

export default SeatchResultList;
