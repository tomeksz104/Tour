import { ReviewRating } from "@/components/Review/ReviewRating";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import formatReviewWord from "@/utils/formatWord";
import { Camera, Heart, ZoomIn } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Card = ({ place, category, province }) => {
  return (
    <article class="h-full relative isolate flex flex-col justify-end overflow-hidden rounded-md bg-gray-900 px-8 pb-3 pt-36 group">
      <Image
        fill
        src={place.mainPhotoPath ? place.mainPhotoPath : "/images/noImage.jpg"}
        alt={place.title}
        class="absolute inset-0 -z-10 h-full w-full object-cover transition duration-300 group-hover:scale-105"
      />

      <div class="absolute inset-0 -z-10 bg-gradient-to-t from-black/90 via-gray-900/40"></div>
      <div class="absolute inset-0 -z-10 rounded-nd ring-1 ring-inset ring-gray-900/10"></div>
      <div class="absolute left-0 top-0 m-2 flex items-center">
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
      <h3 class="mt-3 text-lg font-semibold leading-6 text-white">
        <Link href={`place/${place.id}`} className="group-hover:text-green-500">
          {place.title}
        </Link>
      </h3>
      <span className="text-sm text-gray-300 line-clamp-1	">{place.slogan}</span>
      <div className="flex items-center justify-between text-xs text-white">
        <span>woj. {province}</span>
        <div className="space-x-2 mt-2">
          <Button
            variant="secondary"
            className="bg-white/10 backdrop-blur-md rounded-full h-8 w-8 p-1 hover:bg-green-500 text-gray-100 hover:text-white "
          >
            <ZoomIn strokeWidth={2.5} size={14} />
          </Button>
          <Button
            variant="secondary"
            className="bg-white/10 backdrop-blur-md rounded-full h-8 w-8 p-1 hover:bg-green-500 text-gray-100 hover:text-white"
          >
            <Camera strokeWidth={2.5} size={14} />
          </Button>
          <Button
            variant="secondary"
            className={`bg-white/10 backdrop-blur-md rounded-full h-8 w-8 p-1 text-gray-100 hover:text-red-500 `}
          >
            <Heart strokeWidth={2.5} size={14} />
          </Button>
        </div>
      </div>
    </article>
  );
};

export default Card;
