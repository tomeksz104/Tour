"use client";

import { useContext } from "react";
import { WatchlistContext } from "@/contexts/WatchlistContext";
import CircleButton from "./CircleButton";

const WatchlistButton = ({ id }) => {
  const watchlistCtx = useContext(WatchlistContext);

  const isOnWatchlist = watchlistCtx.isOnWatchlist(id);

  const handleToggleWatchlistItem = () => {
    watchlistCtx.toggleWatchlistItem(id);
  };

  return (
    <CircleButton
      onClick={handleToggleWatchlistItem}
      className="hover:bg-red-50"
      ariaLabel="Toggle Watchlist"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className={`w-5 h-5 text-red-500 ${
          isOnWatchlist ? "fill-red-500" : ""
        }`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
    </CircleButton>
  );
};
export default WatchlistButton;
