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
        {/* <div className="absolute h-full  z-10">
          <ScrollableTabsSlider />
          <div className="m-3 w-64 bg-red-500 overflow-auto">
            <div className="h-full">sdadsa</div>
          </div>
        </div> */}
        <Map />
      </div>
    </>
  );
}
