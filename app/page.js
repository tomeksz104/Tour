"use client";

import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/ExploreMap/Map/Map"), {
  loading: () => <p>loading...</p>,
  ssr: false,
});

export default function Home() {
  return <Map />;
}
