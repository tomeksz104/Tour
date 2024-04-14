import React from "react";
import { db } from "@/lib/db";
import { default as dynamicImport } from "next/dynamic";

const MapContainer = dynamicImport(
  () => import("@/components/MapBox/MapContainer"),
  {
    ssr: false,
  }
);

export const dynamic = "force-dynamic";

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
