import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { LazyLoadImage } from "react-lazy-load-image-component";
import SidebarImageSkeleton from "../Skeletons/SidebarImageSkeleton";
import { useRouter } from "next/navigation";

const mobileMediaQuery = "(min-width: 768px)";

const Sidebar = ({ places, onMarkerHover }) => {
  const router = useRouter();
  const [showSidebar, setShowSidebar] = useState(
    window.matchMedia(mobileMediaQuery).matches
  );
  const [visiblePlaces, setVisiblePlaces] = useState([]);
  const [hoverTimeout, setHoverTimeout] = useState(null);
  const [page, setPage] = useState(0);
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

  const handleScroll = (e) => {
    const container = e.target;

    if (
      container.scrollHeight - container.scrollTop ===
      container.clientHeight
    ) {
      loadMorePlaces();
    }
  };

  const loadMorePlaces = () => {
    const startIndex = (page - 1) * placesPerPage;
    const endIndex = startIndex + placesPerPage;
    const newVisiblePlaces = places.slice(startIndex, endIndex);

    setVisiblePlaces((prevVisiblePlaces) => [
      ...prevVisiblePlaces,
      ...newVisiblePlaces,
    ]);

    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    setVisiblePlaces([]);
    setPage(0);
    loadMorePlaces();
  }, [places]);

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

  const handleGoToPlace = () => {
    router.push("?id=123456", undefined, { shallow: true });
  };

  return (
    <>
      <button
        onClick={handleToggleSidebar}
        className={` ${
          showSidebar ? "hidden" : "fixed"
        } z-10 focus:outline-none p-2 ml-5 mt-5 bg-white rounded-full shadow-md border
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
          <div className="flex justify-end text-slate-500 text-xs gap-1">
            <span className="font-semibold">{places.length}</span>
            <span>places on the map</span>
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

        <div
          onScroll={handleScroll}
          className="flex flex-wrap p-1 overflow-y-auto overflow-x-hidden"
        >
          {places.length === 0 && (
            <SidebarImageSkeleton count={placesPerPage} />
          )}

          {visiblePlaces.map((place, index) => (
            <div
              className="box-border p-1 flex-[0_0_50%]"
              onMouseEnter={() => handleMouseEnter(place)}
              onMouseLeave={handleMouseLeave}
              key={index}
            >
              <div className="relative pb-[100%]">
                <div className="flex flex-col h-full left-0 absolute top-0 w-full">
                  <Link
                    // onClick={handleGoToPlace}
                    href={`/place/${place._id}`}
                    className="rounded-md text-white overflow-hidden relative flex-[1_1_100%] hover:opacity-90"
                  >
                    {/* <img
                      alt="Babylon Tours Paris"
                      className="bg-gray-400 block h-full object-cover w-full"
                      loading="lazy"
                      src={place.image}
                    /> */}
                    <LazyLoadImage
                      src={place.image}
                      className="bg-gray-400 block h-full object-cover w-full"
                      alt={place.title}
                    />

                    <div className="bottom-0 box-border left-0 p-3 absolute w-full bg-gradient-to-b from-transparent to-black/80 to-90%">
                      <div className="line-clamp-3 hover:underline">
                        {place.title}
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Sidebar;
