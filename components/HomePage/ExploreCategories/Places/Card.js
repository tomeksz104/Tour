import Image from "next/image";
import Link from "next/link";

import { ReviewRating } from "@/components/Review/ReviewRating";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Camera, Heart, ZoomIn } from "lucide-react";

import { getPlaceUrl } from "@/utils/apiPaths";
import formatReviewWord from "@/utils/formatWord";

const Card = ({ place, category, province, onOpenLightbox }) => {
  return (
    <article className="h-full relative isolate flex flex-col justify-end overflow-hidden rounded-md bg-gray-900 px-5 pb-3 pt-36 group">
      <Image
        width="0"
        height="0"
        sizes="100vw"
        src={place.mainPhotoPath ? place.mainPhotoPath : "/images/noImage.jpg"}
        alt={place.title}
        className="absolute inset-0 -z-10 h-full w-full object-cover transition duration-300 group-hover:scale-105"
      />

      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/90 via-gray-900/40"></div>
      <div className="absolute inset-0 -z-10 rounded-nd ring-1 ring-inset ring-gray-900/10"></div>
      <div className="absolute left-0 top-0 m-2 flex items-center">
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

      <div className="flex items-center gap-x-4 text-xs">
        <span className="z-10 rounded-full bg-white/10 backdrop-blur-sm px-3 py-1 font-bold text-white">
          {category}
        </span>

        {place.reviewsCount > 0 && (
          <>
            <ReviewRating
              rating={place.averageRating}
              variant="yellow"
              size={14}
            />
            <span className="font-bold text-gray-300">
              ({place.reviewsCount} {formatReviewWord(place.reviewsCount)})
            </span>
          </>
        )}
      </div>
      <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
        <Link
          href={getPlaceUrl(place.slug)}
          className="group-hover:text-green-600"
        >
          {place.title}
        </Link>
      </h3>
      <span className="text-sm text-gray-300 line-clamp-1	">{place.slogan}</span>
      <div className="flex items-center justify-between text-xs text-white border-t border-white/20 pt-1 mt-2">
        <span>woj. {province}</span>
        <div className="space-x-2 mt-2">
          <Button
            variant="secondary"
            className="bg-transparent group-hover:bg-white/10 group-hover:hover:bg-green-600 backdrop-blur-md rounded-full h-8 w-8 p-1 text-gray-300 hover:text-white "
            aria-label="Pokaż na mapie"
          >
            <ZoomIn strokeWidth={1.75} size={14} />
          </Button>
          <Button
            onClick={onOpenLightbox}
            variant="secondary"
            className="bg-transparent group-hover:bg-white/10 group-hover:hover:bg-green-600 backdrop-blur-md rounded-full h-8 w-8 p-1 text-gray-300 hover:text-white"
            aria-label="Galeria zdjęć"
          >
            <Camera strokeWidth={1.75} size={14} />
          </Button>
          <Button
            variant="secondary"
            className={`bg-transparent group-hover:bg-white/10 backdrop-blur-md rounded-full h-8 w-8 p-1 text-gray-300 hover:text-red-500 `}
            aria-label="Dodaj do ulubionych"
          >
            <Heart strokeWidth={1.75} size={14} />
          </Button>
        </div>
      </div>
    </article>
  );
};

export default Card;
