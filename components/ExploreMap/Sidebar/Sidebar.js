import Link from "next/link";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useRouter } from "next/navigation";
import { useSidebar } from "@/hooks/useSidebar";

import SidebarImageSkeleton from "../../Skeletons/SidebarImageSkeleton";
import Card from "./Card";

const Sidebar = ({ places, onMarkerHover }) => {
  const router = useRouter();
  const {
    showSidebar,
    visiblePlaces,
    placesPerPage,
    handleToggleSidebar,
    handleMouseEnter,
    handleMouseLeave,
    handleScroll,
  } = useSidebar(places, onMarkerHover);

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
            {/* <button class="flex items-center px-3 py-2 space-x-2 bg-slate-400/10 hover:bg-slate-400/20 rounded-md text-neutral-800 dark:text-neutral-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-4 h-4  text-neutral-500"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                ></path>
              </svg>
              <span class="text-xs font-medium">Watchlist</span>
            </button> */}
            {/* <button
              aria-label="chat"
              class="h-10 w-10 rounded-xl border bg-gray-100 active:bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:active:bg-gray-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="m-auto h-5 w-5 text-gray-600 dark:text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                ></path>
              </svg>
            </button> */}
            <button class="flex px-3 items-center py-1  border-b-2 border-red-200 gap-1 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="m-auto h-4 w-4 text-gray-600 dark:text-gray-300"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                ></path>
              </svg>
              <span class="text-xs font-medium">Watchlist</span>
            </button>
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
          {places.length === 0 && (
            <SidebarImageSkeleton count={placesPerPage} />
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
