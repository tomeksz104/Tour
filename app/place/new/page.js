"use client";

import dynamic from "next/dynamic";

import MapWrapper from "@/components/Place/Map";
import PlaceForm from "@/components/Place/PlaceForm";

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
