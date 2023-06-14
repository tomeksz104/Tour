"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-easybutton/src/easy-button.js";
import "leaflet-easybutton/src/easy-button.css";
// import "font-awesome/css/font-awesome.min.css";

import "./Map.css";
import UserLocate from "./UserLocate";
// import { getCities, db } from "@/firebase/firebase";
import GetCoordinates from "./GetCoordinates";

const Map = () => {
  const [map, setMap] = useState(null);
  const [position, setPosition] = useState(null);
  const [cities, setCities] = useState([]);
  const mapRef = useRef();

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const cityList = await getCities();
        setCities(cityList);
        console.log(cityList);
      } catch (error) {
        console.log("Error fetching cities:", error);
      }
    };

    // fetchCities();
  }, []);

  const svgIcon = L.divIcon({
    html: `<div class="pin flex items-center justify-center w-full h-full">
     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-white">
    <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
  </svg> </div>
`,
    className: "rounded-full",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    //labelAnchor: [-6, 0],
    //popupAnchor: [0, -15],
  });

  return (
    <MapContainer
      ref={mapRef}
      center={[51.9713, 16.0]}
      zoom={7}
      scrollWheelZoom={true}
      zoomControl={false}
      whenCreated={setMap}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=S5C6vNCfw7EkBYlmw0xf"
      />
      {position && (
        <>
          <Marker position={position}>
            <Popup>
              <span>
                A pretty CSS3 popup. <br /> Easily customizable.
              </span>
            </Popup>
          </Marker>
        </>
      )}
      {/* <Marker position={[51.9713, 15]} icon={svgIcon}>
        <Popup>
          <span>
            A pretty CSS3 popup. <br /> Easily customizable.
          </span>
        </Popup>
      </Marker> */}
      <ZoomControl position="bottomright" />
      <UserLocate />
      <GetCoordinates />
    </MapContainer>
  );
};

export default Map;
