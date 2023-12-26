"use client";

import Link from "next/link";
import WatchlistButton from "../WatchlistButton";
import Image from "next/image";

const Card = ({ place }) => {
  return (
    <div className="h-full group p-4 relative bg-white border border-gray-300 rounded-lg shadow-outline hover:shadow-hover hover:outline hover:outline-1 hover:outline-green-500">
      <div className="absolute top-7 right-7  z-[1]">
        <WatchlistButton id={place._id} />
      </div>

      <Link
        href={`/place/${place._id}`}
        className="relative block w-full h-56 mb-4"
        aria-label={`Go to "${place.title}" details`}
      >
        {/*  <div
          className="w-full h-56 bg-cover bg-center relative rounded-lg mb-4 flex items-end justify-center"
          style={{
            backgroundImage: `url(${place.image})`,
          }}
        ></div> */}

        <Image
          src={place.image}
          className="w-full h-56 rounded-lg"
          alt={place.title}
          fill
        />
      </Link>

      <Link
        href={`/place/${place._id}`}
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
