"use client";

import Link from "next/link";
import WatchlistButton from "../WatchlistButton";
import Image from "next/image";

const Card = ({ place }) => {
  console.log(place.mainPhotoPath);
  return (
    <div className="h-full group p-4 relative bg-white border border-gray-300 rounded-lg shadow-outline hover:shadow-hover hover:outline hover:outline-1 hover:outline-green-500">
      <div className="absolute top-7 right-7  z-[1]">
        <WatchlistButton id={place.id} />
      </div>

      <Link
        href={`/place/${place.id}`}
        className="relative block w-full h-56 mb-4"
        aria-label={`Go to "${place.title}" details`}
      >
        {place.mainPhotoPath && (
          <Image
            src={place.mainPhotoPath}
            className="w-full h-56 rounded-lg object-cover"
            alt={place.title}
            fill
          />
        )}
      </Link>

      <Link
        href={`/place/${place.id}`}
        aria-label={`Go to "${place.title}" details`}
        className="text-xl font-medium text-gray-900 group-hover:text-green-500"
      >
        {place.title}
      </Link>
      <p className="text-gray-700 my-2 line-clamp-2">{place.description}</p>
    </div>
  );
};

export default Card;
