import { useContext } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { WatchlistContext } from "@/contexts/WatchlistContext";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ReviewRating } from "@/components/Review/ReviewRating";
import { Camera, Heart, MapPin, Phone, ZoomIn } from "lucide-react";

function formatReviewWord(count) {
  if (count === 1) {
    return "opinia";
  } else if (count > 1 && count < 5) {
    return "opinie";
  } else if (count >= 5 || count === 0) {
    return "opinii";
  }
}
const Card = ({ place, onMouseEnter, onMouseLeave }) => {
  const router = useRouter();
  const watchlistCtx = useContext(WatchlistContext);

  const isOnWatchlist = watchlistCtx.isOnWatchlist(place.id);

  const handleToggleWatchlistItem = () => {
    watchlistCtx.toggleWatchlistItem(place.id);
  };

  const handleFlyToPlace = () => {
    router.push(`?id=${place.id}`, undefined, { shallow: true });
  };

  const formattedDate = new Date(place.createdAt).toLocaleDateString("pl-PL", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <article
      key={place.id}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="relative isolate flex flex-col gap-5 lg:flex-row mb-5 w-full border bg-white rounded-md"
    >
      <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">
        <Image
          fill
          src={
            place.mainPhotoPath ? place.mainPhotoPath : "/images/noImage.jpg"
          }
          alt={place.title}
          className="absolute inset-0 h-full w-full rounded-l-md bg-gray-50 object-cover"
        />
        <div className="absolute inset-0 rounded-l-md ring-1 ring-inset ring-gray-900/10" />
        <div className="absolute m-2">
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
      <div className="flex flex-col w-full py-3 px-3 lg:pl-0 lg:pr-3">
        <div className="flex items-center gap-x-4 text-xs">
          <span
            href={place.category.href}
            className="relative z-10 rounded-full bg-gray-100 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
          >
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
          <p className=" text-sm leading-6 text-gray-600 mb-5">
            {place.slogan}
          </p>

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

        <div className="mt-auto border-t border-gray-900/5 pt-6">
          <div className="flex justify-between items-center gap-x-4">
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
