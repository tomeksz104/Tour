import { useContext } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { WatchlistContext } from "@/contexts/WatchlistContext";

import { LazyLoadImage } from "react-lazy-load-image-component";

const Card = ({ place, onMouseEnter, onMouseLeave }) => {
  const router = useRouter();
  const watchlistCtx = useContext(WatchlistContext);

  const handleFlyToPlace = () => {
    router.push(`?id=${place._id}`, undefined, { shallow: true });
  };

  const isOnWatchlist = watchlistCtx.isOnWatchlist(place._id);

  return (
    <article
      className="box-border p-1 flex-[0_0_50%]"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="relative pb-[100%]">
        <div className="flex flex-col h-full left-0 absolute top-0 w-full">
          <div className="rounded-md text-white overflow-hidden relative flex-[1_1_100%] group hover:opacity-90">
            <LazyLoadImage
              src={place.image}
              className="bg-gray-400 block h-full object-cover w-full"
              alt={place.title}
            />
            <div className="absolute top-2 right-2 hidden group-hover:flex space-x-2 z-[1]">
              <button
                onClick={() => {
                  watchlistCtx.toggleWatchlistItem(place._id);
                }}
                clas
                className={`bg-white rounded-full p-1.5 shadow-sm duration-300 hover:bg-red-50 hover:scale-110 `}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class={`w-5 h-5 text-red-500 ${
                    isOnWatchlist ? "fill-red-500" : ""
                  }`}
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
              </button>
              <button
                onClick={handleFlyToPlace}
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
              <div className="line-clamp-3 hover:underline">{place.title}</div>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};
export default Card;
