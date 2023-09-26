"use client";

import React, { createContext, useState, useEffect } from "react";

export const WatchlistContext = createContext({
  watchlist: [],
  toggleWatchlistItem: (id) => {},
  addToWatchlist: (id) => {},
  removeFromWatchlist: (id) => {},
  isOnWatchlist: (id) => {},
});

export const WatchlistContextProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const watchlistData = JSON.parse(localStorage.getItem("watchlist"));

    if (watchlistData) {
      setWatchlist(watchlistData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  const isOnWatchlist = (id) => {
    return watchlist.includes(id);
  };

  const toggleWatchlistItem = (id) => {
    if (watchlist.includes(id)) {
      removeFromWatchlist(id);
    } else {
      addToWatchlist(id);
    }
  };

  const addToWatchlist = (id) => {
    setWatchlist((prevWatchlist) => [...prevWatchlist, id]);
  };

  const removeFromWatchlist = (id) => {
    setWatchlist((prevWatchlist) =>
      prevWatchlist.filter((item) => item !== id)
    );
  };

  return (
    <WatchlistContext.Provider
      value={{
        watchlist,
        toggleWatchlistItem,
        addToWatchlist,
        removeFromWatchlist,
        isOnWatchlist,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
};
