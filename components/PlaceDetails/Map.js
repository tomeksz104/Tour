"use client";

import { useRouter } from "next/navigation";
import { Marker } from "react-leaflet";
import MapWrapper from "@/components/MapWrapper/MapWrapper";

import { getIcon } from "@/utils/mapUtils";

const PlaceDetailsMap = ({ place }) => {
  const router = useRouter();

  return (
    <div className="relative">
      <MapWrapper
        className="h-48 rounded-md"
        center={[place.latitude, place.longitude]}
        zoom={12}
        scrollWheelZoom={true}
        zoomControl={false}
        attributionControl={false}
      >
        <Marker
          key={1}
          uniceid={1}
          position={[place.latitude, place.longitude]}
          icon={getIcon(place.category)}
        ></Marker>
      </MapWrapper>

      <button
        onClick={() => {
          router.push(`/map?id=${place.id}`);
        }}
        className="absolute bottom-12 bottom-3 left-1/2 transform -translate-x-1/2 flex items-center justify-center bg-white rounded-md px-3 py-2 text-sm font-semibold border border-neutral-300 whitespace-nowrap	"
      >
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5 mr-3"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
          ></path>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
          ></path>
        </svg> */}
        Zobacz na mapie
      </button>
    </div>
  );
};

export default PlaceDetailsMap;
