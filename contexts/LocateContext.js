"use client";

import React, { createContext, useState, useEffect } from "react";

export const LocateContext = createContext({
  getLocation: () => {},
  coordinates: null,
});

export const LocateContextProvider = ({ children }) => {
  const [coordinates, setCoordinates] = useState([]);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(setUserPosition, showError);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  const setUserPosition = (position) => {
    const coordinates = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };

    setCoordinates(coordinates);
  };

  const showError = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        console.log("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        console.log("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        console.log("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        console.log("An unknown error occurred.");
        break;
    }
  };

  return (
    <LocateContext.Provider
      value={{
        getLocation,
        coordinates,
      }}
    >
      {children}
    </LocateContext.Provider>
  );
};
