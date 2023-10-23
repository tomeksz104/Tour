"use client";

import { Fragment } from "react";

import PlaceForm from "@/components/PlaceManagement/PlaceForm";

// const MapWrapper = dynamic(() => import("@/components/Place/MapWrapper"), {
//   loading: () => <p>loading...</p>,
//   ssr: false,
// });

export default function CreatePlace() {
  return (
    <Fragment>
      {/* <MapWrapper /> */}

      <PlaceForm place={null} />
    </Fragment>
  );
}
