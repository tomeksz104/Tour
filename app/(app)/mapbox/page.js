import { db } from "@/lib/db";
import dynamic from "next/dynamic";

const MapContainer = dynamic(() => import("@/components/MapBox/MapContainer"), {
  ssr: false,
});
import React from "react";

export default async function Home() {
  const categories = await db.category.findMany({
    select: {
      iconPath: true,
    },
  });

  return (
    <div className="relative flex flex-1 h-full overflow-hidden">
      <MapContainer categories={categories} />
    </div>
  );
}
