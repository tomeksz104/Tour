import { useEffect, useState } from "react";
import useLoadMore from "@/hooks/useLoadMore";

import SidebarImageSkeleton from "../../Skeletons/SidebarImageSkeleton";
import Card from "./Card";

const mobileMediaQuery = "(min-width: 768px)";

const Sidebar = ({
  places,
  onMarkerHover,
  isShowWatchlist,
  onToggleWatchlist,
  isLoading,
}) => {
  const { data: visiblePlaces, handleScroll } = useLoadMore(places, 10);
  const [showSidebar, setShowSidebar] = useState(
    window.matchMedia(mobileMediaQuery).matches
  );
  const [hoverTimeout, setHoverTimeout] = useState(null);
  const placesPerPage = 10;

  const handleToggleSidebar = () => {
    setShowSidebar((current) => !current);
  };

  const handleMouseEnter = (markerId) => {
    clearTimeout(hoverTimeout);

    const timeoutId = setTimeout(() => {
      onMarkerHover(markerId);
    }, 1000);

    setHoverTimeout(timeoutId);
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimeout);
    onMarkerHover(null);
  };

  useEffect(() => {
    const query = window.matchMedia(mobileMediaQuery);

    function handleQueryChange(queryEvent) {
      setShowSidebar(queryEvent.matches);
    }

    query.addEventListener("change", handleQueryChange);

    return () => {
      query.removeEventListener("change", handleQueryChange);
    };
  }, []);

  return (
    <>
      <button
        onClick={handleToggleSidebar}
        className={` ${
          showSidebar ? "hidden" : "fixed"
        } z-10 focus:outline-none p-2 ml-5 mt-5 bg-white rounded-full shadow-md border border-gray-200
       `}
      >
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
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>

      <section
        className={`flex flex-col z-20 w-full max-w-xl bg-white focus:outline-none ease-in-out duration-300
            ${showSidebar ? "translate-x-0 " : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-5 py-3">
          <div className="flex text-slate-500 text-xs gap-1">
            <span className="font-semibold">{places.length}</span>
            <span>places on the map</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="inline-flex rounded-md shadow-sm" role="group">
              <button
                onClick={onToggleWatchlist}
                type="button"
                className={`inline-flex items-center px-4 py-1.5 text-sm font-medium border border-gray-900 rounded-l-full hover:bg-gray-900 hover:text-white ${
                  !isShowWatchlist
                    ? "bg-gray-900 text-white"
                    : "text-gray-900 bg-transparent"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z"
                  />
                </svg>
                <span className="text-xs font-medium">All</span>
              </button>
              <button
                onClick={onToggleWatchlist}
                type="button"
                className={`inline-flex items-center px-4 py-1.5 text-sm font-medium border-t border-b border-r border-gray-900 rounded-r-full hover:bg-gray-900 hover:text-white focus:z-10  ${
                  isShowWatchlist
                    ? "bg-gray-900 text-white"
                    : "text-gray-900 bg-transparent"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="h-4 w-4 mr-2"
                >
                  <path
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
                <span className="text-xs font-medium">Watchlist</span>
              </button>
            </div>

            <button
              onClick={handleToggleSidebar}
              className="p-2 text-slate-500 hover:text-slate-400 hover:bg-slate-400/10 rounded-full"
            >
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        <div
          onScroll={handleScroll}
          className="flex flex-wrap p-1 overflow-y-auto overflow-x-hidden"
        >
          {isLoading && <SidebarImageSkeleton count={placesPerPage} />}

          {visiblePlaces.length === 0 && (
            <h3 className="flex h-full w-full items-center justify-center py-10 font-semibold text-gray-400">
              No places found
            </h3>
          )}

          {visiblePlaces.map((place, index) => (
            <Card
              key={index}
              place={place}
              onMouseEnter={() => handleMouseEnter(place)}
              onMouseLeave={handleMouseLeave}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default Sidebar;
