import { useContext, useEffect, useRef, useState } from "react";

import { PlacesContext } from "@/contexts/PlacesContext";
import SearchResultList from "./SearchResultsList";
import useMediaQuery from "@/hooks/useMediaQuery";

const SearchBar = ({ onHideLogo }) => {
  const placesCtx = useContext(PlacesContext);
  const searchInputRef = useRef(null);
  const [searchWord, setSearchWord] = useState("");
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [hideSuggestions, setHideSuggestions] = useState(true);
  const [isShowSearchBar, setIsShowSearchBar] = useState(false);
  const isMobile = useMediaQuery();

  useEffect(() => {
    onHideLogo(hideSuggestions);
  }, [hideSuggestions]);

  useEffect(() => {
    if (searchWord.length >= 3) {
      const newFilter = placesCtx.places.filter((place) =>
        place.title.toLowerCase().includes(searchWord.toLowerCase())
      );

      setFilteredPlaces(newFilter);
    } else {
      setFilteredPlaces([]);
    }
  }, [searchWord]);

  useEffect(() => {
    if (isShowSearchBar) searchInputRef.current.focus();
  }, [isShowSearchBar]);

  const handleFocus = () => {
    setHideSuggestions(false);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setHideSuggestions(true);
      setIsShowSearchBar(false);
    }, 200);
  };

  return (
    <>
      {isShowSearchBar || isMobile ? (
        <div className="flex w-full max-w-lg justify-center ">
          <div className="relative w-full">
            <form>
              <div className="flex items-center text-gray-400 focus-within:text-green-400">
                <span className="absolute left-4 flex h-6 items-center border-r border-gray-300 pr-3 dark:border-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                </span>
                <input
                  ref={searchInputRef}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  type="search"
                  placeholder="What are you looking..."
                  onChange={(e) => setSearchWord(e.target.value)}
                  className="mr-2 outline-none w-full rounded-md bg-slate-100 border border-gray-200 py-2.5 pl-16 text-sm text-gray-600  transition-all duration-300 focus:bg-white focus:ring-1 focus:ring-green-500"
                />
              </div>
            </form>
            <SearchResultList
              results={filteredPlaces}
              hideSuggestions={hideSuggestions}
              searchWordLength={searchWord.length}
            />
          </div>
        </div>
      ) : (
        <div className="w-full flex justify-end">
          <button
            onClick={() => {
              setIsShowSearchBar(true);
            }}
            type="button"
            className="text-gray-400 hover:ring-gray-200 inline-flex h-9 w-9 items-center justify-center rounded-full ring-1 ring-transparent transition-all duration-300 hover:ring-offset-4"
          >
            <span className="border-gray-200 flex h-9 w-9 items-center justify-center rounded-full border bg-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="img"
                className="w-5 h-5"
                width="1em"
                height="1em"
                viewBox="0 0 256 256"
              >
                <g fill="currentColor">
                  <path
                    d="M192 112a80 80 0 1 1-80-80a80 80 0 0 1 80 80Z"
                    opacity=".2"
                  ></path>
                  <path d="m229.66 218.34l-50.06-50.06a88.21 88.21 0 1 0-11.32 11.31l50.06 50.07a8 8 0 0 0 11.32-11.32ZM40 112a72 72 0 1 1 72 72a72.08 72.08 0 0 1-72-72Z"></path>
                </g>
              </svg>
            </span>
          </button>
        </div>
      )}
    </>
  );
};

export default SearchBar;
