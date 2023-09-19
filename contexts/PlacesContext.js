"use client";

import React, { createContext, useState } from "react";

export const PlacesContext = createContext({
  places: [],
  filteredPlaces: [],
  sortfield: "",
  replacePlacesList: (places) => {},
});

export const PlacesContextProvider = ({ children }) => {
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [sortfield, sortField] = useState([]);

  const replacePlacesList = (places) => {
    setPlaces(places);
  };

  const filterPlacesByName = (name) => {
    const filtered = places.filter((place) =>
      place.title.toLowerCase().includes(name.toLowerCase())
    );
    setFilteredPlaces(filtered);
  };

  return (
    <PlacesContext.Provider
      value={{ places, filteredPlaces, sortfield, replacePlacesList }}
    >
      {children}
    </PlacesContext.Provider>
  );
};
