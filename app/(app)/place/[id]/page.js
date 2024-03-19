import Link from "next/link";
import dynamic from "next/dynamic";
import { getPlaceById } from "@/actions/getPlaceById";

import ReviewCard from "@/components/Review/ReviewCard";
import Slideshow from "@/components/Slideshow/Slideshow";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { Button } from "@/components/ui/button";

import { AtSign, Check, Phone, Link as LinkIcon } from "lucide-react";

import OpeningHours from "@/components/PlaceDetails/OpeningHours";
import QuickListingActions from "@/components/PlaceDetails/QuickListingActions";

const PlaceDetailsMap = dynamic(() => import("@/components/PlaceDetails/Map"), {
  loading: () => <p>loading...</p>,
  ssr: false,
});

export default async function PlaceDetailsPage({ params }) {
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  const place = await getPlaceById(params?.id);
  const session = await getServerSession(authOptions);

  const isUserAdmin = session?.user?.role === "admin";
  const isCreator = session?.user?.id === place.userId;
  const hasPermission = isUserAdmin || isCreator;

  let gallery = [{ url: place.mainPhotoPath, accepted: true }, ...place.photos];
  gallery = gallery.filter((item) => item.accepted !== false);

  return (
    <>
      <div className="w-full h-56 sm:h-[480px]">
        <div
          className="absolute w-full h-56 sm:h-[480px] bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${place.mainPhotoPath})`,
          }}
        >
          <div className="w-full h-full backdrop-blur-md"></div>
        </div>
        <div className="mx-auto max-w-7xl w-full h-56 sm:h-[480px]">
          <div className="relative flex flex-col group z-0 max-w-7xl h-56 sm:h-[480px]">
            <div className="flex items-start relative w-full h-full">
              <div className="absolute inset-0 z-0 select-none">
                <Slideshow
                  placeId={place.id}
                  hasPermission={hasPermission}
                  images={gallery}
                  placeTitle={place.title}
                />
              </div>
            </div>
            {/* <div className="absolute w-full content-[''] bg-gradient-to-b from-[rgba(0,0,0,0.75)] to-transparent h-[200px] pointer-events-none"></div> */}
            <div className="absolute flex justify-between items-start sm:items-center top-2 inset-x-4 sm:inset-x-5 pointer-events-none">
              <h3 className="block text-xl sm:text-2xl font-semibold text-white line-clamp-2">
                {place.title}
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full mx-auto mt-12">
        <QuickListingActions
          phone={place.phone || null}
          googleMapUrl={place.googleMapUrl || null}
        />
      </div>

      <div className="relative mx-auto max-w-7xl w-full px-3 xl:px-0">
        <div className="mt-5 grid grid-cols-1 gap-y-6 lg:gap-x-3 lg:w-full lg:grid-cols-6">
          <div className="col-span-4 space-y-5">
            <div className="space-y-3 bg-white rounded-md p-5">
              <h2 className="text-xl font-semibold text-gray-700 md:text-2xl">
                Opis
              </h2>

              <div
                className="prose text-gray-700"
                dangerouslySetInnerHTML={{ __html: place.description }}
              ></div>
            </div>
            {place.topics.length > 0 && (
              <div className="space-y-3 bg-white rounded-md p-5">
                <h2 className="text-xl font-semibold text-gray-700 md:text-2xl">
                  Tematyka
                </h2>
                <div className="grid grid-cols-2 gap-y-3">
                  {place.topics.map((tag) => (
                    <div key={tag.id} className="flex items-center space-x-3">
                      <Check size={16} />
                      <div>{tag.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {place.tags.length > 0 && (
              <div className="space-y-3 bg-white rounded-md p-5">
                <h2 className="text-xl font-semibold text-gray-700 md:text-2xl">
                  Tagi
                </h2>
                <div className="grid grid-cols-2 gap-y-3">
                  {place.tags.map((tag) => (
                    <div key={tag.id} className="flex items-center space-x-3">
                      <Check size={16} />
                      <div>{tag.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <ReviewCard place={place} />
          </div>
          <div className="col-span-2 space-y-3">
            <OpeningHours openingHours={place.openingHours} />

            <div className=" space-y-3 bg-white rounded-md p-5">
              <h2 className="text-xl font-semibold text-gray-700 md:text-2xl">
                Dojazd
              </h2>
              <PlaceDetailsMap place={place} />
              <div className="flex items-center justify-between">
                <p className="text-gray-700">{place.address}</p>
                {place.googleMapUrl && (
                  <Button asChild variant="link">
                    <Link href={place.googleMapUrl} target="_blank">
                      Nawiguj
                    </Link>
                  </Button>
                )}
              </div>
            </div>

            {(place.website || place.phone || place.email) && (
              <div className="space-y-3 bg-white rounded-md p-5 overflow-hidden">
                <h2 className="text-xl font-semibold text-gray-700 md:text-2xl">
                  Dane kontaktowe
                </h2>
                {place.website !== null && (
                  <div className="flex items-center space-x-3">
                    <LinkIcon size={16} className="shrink-0 text-green-600" />
                    <Link href={place.website} className="hover:underline">
                      {place.website}
                    </Link>
                  </div>
                )}
                {place.phone !== null && (
                  <div className="flex items-center space-x-3">
                    <Phone size={16} className="text-green-600" />
                    <p>{place.phone}</p>
                  </div>
                )}
                {place.email !== null && (
                  <div className="flex items-center space-x-3">
                    <AtSign size={16} className="text-green-600" />
                    <p>{place.email}</p>
                  </div>
                )}
              </div>
            )}
            <div className="flex flex-col items-end text-xs text-gray-600 space-y-2">
              <div>
                Data ostatniej aktualizacji:{" "}
                {new Date(place.updatedAt).toLocaleDateString()}
              </div>
              <div>
                Autor:{" "}
                {place.user.username ? place.user.username : place.user.email}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
