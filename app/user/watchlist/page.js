"use client";

import Watchlist from "@/components/User/Sections/Watchlist/Watchlist";
import { WatchlistContext } from "@/contexts/WatchlistContext";
import { useContext } from "react";

const UserSettings = () => {
  const watchlistCtx = useContext(WatchlistContext);

  return <Watchlist placesIds={watchlistCtx.watchlist} />;
};

export default UserSettings;
