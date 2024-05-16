import useInfiniteScroll from "@/hooks/useInfiniteScroll";

import SearchResult from "./SearchResult";

const SeatchResultList = ({ results, hideSuggestions, searchWordLength }) => {
  const { itemsList: visiblePlaces, observerRef } = useInfiniteScroll(
    results,
    10
  );

  return (
    <div
      className={`absolute z-50 mt-2 w-full overflow-auto max-h-96 rounded-md bg-white shadow-md ${
        hideSuggestions && "hidden"
      }`}
    >
      {results.length === 0 && searchWordLength >= 3 && (
        <h3 className="flex h-full w-full items-center justify-center py-10 font-semibold text-gray-400">
          Nie znaleziono miejsc
        </h3>
      )}
      {searchWordLength < 3 && (
        <h3 className="flex h-full w-full items-center justify-center py-10 font-semibold text-gray-400">
          Wpisz min. 3 znaki
        </h3>
      )}
      {results.length > 0 &&
        visiblePlaces.map((place, id) => {
          return <SearchResult place={place} key={id} />;
        })}
      <div ref={observerRef} />
    </div>
  );
};

export default SeatchResultList;
