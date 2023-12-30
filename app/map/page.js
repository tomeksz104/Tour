import ScrollableTabsSlider from "@/components/ExploreMap/ScrollableTabsSlider";
import Map from "@/components/ExploreMap/Map/Map";

// const Map = dynamic(() => import("@/components/ExploreMap/Map/Map"), {
//   ssr: false,
// });

export default function Home() {
  return (
    <>
      <ScrollableTabsSlider />
      <div className="relative flex flex-1 h-full overflow-hidden">
        <Map />
      </div>
    </>
  );
}
