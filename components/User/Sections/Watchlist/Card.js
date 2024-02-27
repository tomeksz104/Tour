"use client";

import { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ReviewRating } from "@/components/Review/ReviewRating";

import { WatchlistContext } from "@/contexts/WatchlistContext";

import { Camera, Heart, MapPin, Phone, ZoomIn } from "lucide-react";

import formatReviewWord from "@/utils/formatWord";

const Card = ({ place, onOpenLightbox }) => {
  const router = useRouter();
  const watchlistCtx = useContext(WatchlistContext);

  const isOnWatchlist = watchlistCtx.isOnWatchlist(place.id);

  const handleToggleWatchlistItem = () => {
    watchlistCtx.toggleWatchlistItem(place.id);
  };

  const handleFlyToPlace = () => {
    router.push(`/map?id=${place.id}`, undefined, { shallow: true });
  };

  const formattedDate = new Date(place.createdAt).toLocaleDateString("pl-PL", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // return (
  //   <div className="h-full group p-4 relative bg-white border border-gray-300 rounded-lg shadow-outline hover:shadow-hover hover:outline hover:outline-1 hover:outline-green-500">
  //     <div className="absolute top-7 right-7  z-[1]">
  //       <WatchlistButton id={place.id} />
  //     </div>

  //     <Link
  //       href={`/place/${place.id}`}
  //       className="relative block w-full h-56 mb-4"
  //       aria-label={`Go to "${place.title}" details`}
  //     >
  //       {place.mainPhotoPath && (
  //         <Image
  //           src={place.mainPhotoPath}
  //           className="w-full h-56 rounded-lg object-cover"
  //           alt={place.title}
  //           fill
  //         />
  //       )}
  //     </Link>

  //     <Link
  //       href={`/place/${place.id}`}
  //       aria-label={`Go to "${place.title}" details`}
  //       className="text-xl font-medium text-gray-900 group-hover:text-green-500"
  //     >
  //       {place.title}
  //     </Link>
  //     <p className="text-gray-700 my-2 line-clamp-2">{place.description}</p>
  //   </div>
  // );
  return (
    <article
      key={place.id}
      className="relative isolate flex flex-col w-full h-full border bg-white rounded-md"
    >
      <div className="relative h-48 aspect-[16/9] sm:aspect-[2/1]">
        <Image
          src={
            place.mainPhotoPath ? place.mainPhotoPath : "/images/noImage.jpg"
          }
          width="0"
          height="0"
          sizes="100vw"
          alt={place.title}
          style={{ objectFit: "cover" }}
          className="h-full w-full rounded-t-md bg-gray-50 object-cover"
        />
        <div className="absolute inset-0 rounded-t-md ring-1 ring-inset ring-gray-900/10" />
        <div className="absolute left-0 top-0 m-2">
          <Badge
            className={`${
              place.isOpen
                ? "bg-green-600 hover:bg-green-600"
                : "bg-red-500 hover:bg-red-500"
            }`}
          >
            {place.isOpen ? "Otwarte" : "Zamknięte"}
          </Badge>
        </div>
      </div>
      <div className="flex flex-col w-full h-full py-3 px-3">
        <div className="flex items-center gap-x-4 text-xs">
          <span className="relative z-10 rounded-full bg-gray-100 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
            {place.category.name}
          </span>
          {place.reviewsCount > 0 && (
            <>
              <ReviewRating
                rating={place.averageRating}
                variant="yellow"
                size={14}
              />
              <span className="font-medium text-gray-500">
                ({place.reviewsCount} {formatReviewWord(place.reviewsCount)})
              </span>
            </>
          )}
        </div>
        <div className="group relative w-full">
          <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-green-600">
            <Link href={`place/${place.id}`}>
              <span className="absolute inset-0" />
              {place.title}
            </Link>
          </h3>
          <p className="text-sm leading-6 text-gray-600 mb-5">{place.slogan}</p>

          {place.address !== null && (
            <div className="flex items-center space-x-3 text-sm">
              <MapPin size={16} strokeWidth={2.2} className="text-green-600" />
              <p>{place.address}</p>
            </div>
          )}
          {place.phone !== null && (
            <div className="flex items-center space-x-3 text-sm mt-2">
              <Phone size={16} strokeWidth={2.2} className="text-green-600" />
              <p>{place.phone}</p>
            </div>
          )}
        </div>

        <div className="flex-1 flex items-end pt-3">
          <div className="w-full flex justify-between items-center pt-3 border-t">
            <time dateTime={formattedDate} className="text-gray-500 text-xs">
              {formattedDate}
            </time>

            <div className="space-x-2">
              <Button
                onClick={handleFlyToPlace}
                variant="secondary"
                className="rounded-full h-8 w-8 p-1 hover:bg-green-500 hover:text-white"
              >
                <ZoomIn strokeWidth={2.5} size={16} />
              </Button>
              <Button
                onClick={onOpenLightbox}
                variant="secondary"
                className="rounded-full h-8 w-8 p-1 hover:bg-green-500 hover:text-white"
              >
                <Camera strokeWidth={2.5} size={16} />
              </Button>
              <Button
                onClick={handleToggleWatchlistItem}
                variant="secondary"
                className={`rounded-full h-8 w-8 p-1 hover:text-red-500 ${
                  isOnWatchlist ? "text-red-500" : ""
                }`}
              >
                <Heart
                  className={`${isOnWatchlist && "fill-red-500"} `}
                  strokeWidth={2.5}
                  size={16}
                />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Card;
