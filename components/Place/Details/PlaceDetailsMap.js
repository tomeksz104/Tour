"use client";

import MapWrapper from "@/components/MapWrapper/MapWrapper";
import { getIcon } from "@/components/Map/Places";
import { Marker } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

const PlaceDetailsMap = ({ place }) => {
  return (
    <MapWrapper
      className="h-48 rounded-md"
      center={[place.coordinates.lat, place.coordinates.lng]}
      zoom={12}
      scrollWheelZoom={true}
    >
      <Marker
        key={1}
        uniceid={1}
        position={[place.coordinates.lat, place.coordinates.lng]}
        icon={getIcon(place.category)}
      ></Marker>
    </MapWrapper>
  );
};

export default PlaceDetailsMap;
