"use client";

import dynamic from "next/dynamic";

import MapWrapper from "@/components/PlaceManagement/Map";
import PlaceForm from "@/components/PlaceManagement/PlaceForm";

// const MapWrapper = dynamic(() => import("@/components/Place/MapWrapper"), {
//   loading: () => <p>loading...</p>,
//   ssr: false,
// });

export default function CreatePlace() {
  return (
    <>
      {/* <MapWrapper /> */}

      <PlaceForm />
    </>
  );
}
