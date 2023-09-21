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

  const handleFlyToPlace = (place) => {
    router.push(`?id=${place._id}`, undefined, { shallow: true });
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
            <article
              className="box-border p-1 flex-[0_0_50%]"
              onMouseEnter={() => handleMouseEnter(place)}
              onMouseLeave={handleMouseLeave}
              key={index}
            >
              <div className="relative pb-[100%]">
                <div className="flex flex-col h-full left-0 absolute top-0 w-full">
                  <div
                    // onClick={handleGoToPlace}
                    href={`/place/${place._id}`}
                    className="rounded-md text-white overflow-hidden relative flex-[1_1_100%] group hover:opacity-90"
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
                      onClick={() => {
                        router.push(`/place/${place._id}`);
                      }}
                    />
                    <div className="absolute top-2 right-2 hidden group-hover:flex space-x-2  z-[1]">
                      <button
                        href="/place/update/649c2cd3350ba3ee5435c52a"
                        class="bg-white rounded-full p-1.5 shadow-sm duration-300 hover:bg-red-50 hover:scale-110"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-5 h-5 text-red-500"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => {
                          handleFlyToPlace(place);
                        }}
                        href="/place/update/649c2cd3350ba3ee5435c52a"
                        class="bg-white rounded-full p-1.5 shadow-sm duration-300 hover:bg-blue-50 hover:scale-110 pointer-events-auto"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-5 h-5 text-blue-500"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                          />
                        </svg>
                      </button>
                    </div>

                    <Link
                      href={`/place/${place._id}`}
                      className="bottom-0 box-border left-0 p-3 absolute w-full bg-gradient-to-b from-transparent to-black/80 to-90%"
                    >
                      <div className="line-clamp-3 hover:underline">
                        {place.title}
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
};

export default Sidebar;
