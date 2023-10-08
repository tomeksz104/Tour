"use client";

import React, { createContext, useEffect, useState } from "react";

export const PlacesContext = createContext({
  places: [],
  replacePlacesList: (places) => {},
});

export const PlacesContextProvider = ({ children }) => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/place", { method: "GET" });
        if (response.ok) {
          const data = await response.json();

          setPlaces(data);
        } else {
          console.error("Failed to fetch placess:", response.status);
        }
      } catch (error) {
        console.error("Failed to fetch places:", error);
      }
    };
    if (places.length === 0) {
      fetchData();
    }
  }, []);

  const replacePlacesList = (places) => {
    setPlaces(places);
  };

  return (
    <PlacesContext.Provider
      value={{
        places,
        replacePlacesList,
      }}
    >
      {children}
    </PlacesContext.Provider>
  );
};
