"use client";

import { useState, useEffect, useRef } from "react";
import { Marker, MapContainer, TileLayer, Popup, useMap } from "react-leaflet";
import L from "leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

const center = [52.10650519075632, 19.281005859375004];

const ShowMarkers = ({ mapContainer, legend, marker }) => {
  return (
    <Marker
      key={1}
      uniceid={1}
      position={marker}
      draggable={true}
      eventHandlers={{
        moveend(e) {
          const { lat, lng } = e.target.getLatLng();
          legend.textContent = `change position: ${lat} ${lng}`;
        },
      }}
    >
      {/* <Popup>
        <button onClick={() => removeMarker(index, mapContainer, legend)}>
          delete marker 💔
        </button>
      </Popup> */}
    </Marker>
  );
};

const MyMarkers = ({ onMarkerPositionChange, coordinates }) => {
  const map = useMap();
  const [marker, setMarker] = useState([]);
  const [legend, setLegend] = useState();

  useEffect(() => {
    if (!map) return;

    const legend = L.control({ position: "bottomleft" });

    const info = L.DomUtil.create("div", "legend");

    legend.onAdd = () => {
      info.textContent = `click on the map, move the marker, click on the marker`;
      return info;
    };

    legend.addTo(map);

    map.on("click", (e) => {
      const { lat, lng } = e.latlng;
      setMarker([lat, lng]);

      info.textContent = `${e.latlng}`;
      setLegend(info);

      if (onMarkerPositionChange) {
        onMarkerPositionChange(lat, lng);
      }
    });
  }, [map]);

  useEffect(() => {
    setMarker([coordinates.lat, coordinates.lng]);
  }, [coordinates]);

  return marker.length > 0 && legend !== undefined ? (
    <ShowMarkers mapContainer={map} legend={legend} marker={marker} />
  ) : null;
};

const MapWrapper = ({ onMarkerPositionChange, coordinates }) => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (map) {
      const legend = L.control({ position: "bottomleft" });

      const info = L.DomUtil.create("div", "legend");

      legend.onAdd = () => {
        info.textContent = `click on the map, move the marker, click on the marker`;
        return info;
      };

      legend.addTo(map);
    }
  }, [map]);

  return (
    <MapContainer
      whenCreated={setMap}
      className="mt-12 h-96 rounded-md"
      center={center}
      zoom={6}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=S5C6vNCfw7EkBYlmw0xf"
      />

      <MyMarkers
        onMarkerPositionChange={onMarkerPositionChange}
        coordinates={coordinates}
      />
    </MapContainer>
  );
};

export default MapWrapper;
