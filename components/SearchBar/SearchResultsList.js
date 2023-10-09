import { useEffect, useState } from "react";
import SearchResult from "./SearchResult";
import useLoadMore from "@/hooks/useLoadMore";

const SeatchResultList = ({ results, hideSuggestions, searchWordLength }) => {
  const { data: visiblePlaces, handleScroll } = useLoadMore(results, 10);

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
