"use client";

import MapWrapper from "@/components/MapWrapper/MapWrapper";
import { getIcon } from "@/utils/mapUtils";
import { Marker } from "react-leaflet";
import { useRouter } from "next/navigation";

const PlaceDetailsMap = ({ place }) => {
  const router = useRouter();

  return (
    <div className="relative">
      <MapWrapper
        className="h-48 rounded-3xl"
        center={[place.coordinates.lat, place.coordinates.lng]}
        zoom={12}
        scrollWheelZoom={true}
        zoomControl={false}
        attributionControl={false}
      >
        <Marker
          key={1}
          uniceid={1}
          position={[place.coordinates.lat, place.coordinates.lng]}
          icon={getIcon(place.category)}
        ></Marker>
      </MapWrapper>
      <a
        className="absolute right-6 -bottom-5"
        target="_blank"
        href="https://goo.gl/maps/SjpTxHtfDhH7bxcV8"
      >
        <button class="flex items-center justify-center w-10 h-10 duration-300 text-white bg-blue-500 hover:shadow-lg hover:shadow-blue-600/20 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5 -rotate-45 -mt-1"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            ></path>
          </svg>
        </button>
      </a>
      <button
        onClick={() => {
          router.push(`/?id=${place._id}`);
        }}
        class="absolute bottom-12 bottom-3 left-1/2 transform -translate-x-1/2 flex items-center justify-center bg-white rounded-md px-3 py-2 text-sm font-semibold border border-neutral-300 whitespace-nowrap	"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-5 h-5 mr-3"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
          ></path>
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
          ></path>
        </svg>
        SEE ON THE MAP
      </button>
    </div>
  );
};

export default PlaceDetailsMap;
