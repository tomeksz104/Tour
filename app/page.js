"use client";

import dynamic from "next/dynamic";

import Categories from "@/components/Categories/Categories";
import ScrollableTabsSlider from "@/components/Tabs/ScrollableTabsSlider";

const Map = dynamic(() => import("@/components/Map/Map"), {
  loading: () => <p>loading...</p>,
  ssr: false,
});

export default function Home() {
  return (
    <>
      <div className="relative h-full">
        <ScrollableTabsSlider />
        <Map />
      </div>
    </>
  );
}
