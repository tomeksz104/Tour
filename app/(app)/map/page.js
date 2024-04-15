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

export const metadata = {
  title: "Przeglądaj Mapę Atrakcji - WeekendowaWycieczka",
  description:
    "Odkrywaj i planuj swoje wizyty w najciekawszych miejscach dzięki naszej interaktywnej mapie atrakcji. Znajdź lokalizacje, godziny otwarcia i wiele więcej.",
  keywords:
    "mapa atrakcji, mapa turystyczna, punkty turystyczne, lokalizacje turystyczne, planowanie podróży, odkrywanie miejsc",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Przeglądaj Mapę Atrakcji - WeekendowaWycieczka",
    description:
      "Odkrywaj i planuj swoje wizyty w najciekawszych miejscach dzięki naszej interaktywnej mapie atrakcji. Znajdź lokalizacje, godziny otwarcia i wiele więcej.",
    images: [
      {
        url: "https://tour-tomeksz104.vercel.app/map-view.webp",
      },
    ],
    type: "website",
    url: "https://tour-tomeksz104.vercel.app/map",
    siteName: "WeekendowaWycieczka",
  },
};

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
