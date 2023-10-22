"use client";

import Link from "next/link";
import WatchlistButton from "../WatchlistButton";

const Card = ({ place }) => {
  return (
    <div className="h-full group p-4 relative bg-white dark:bg-dark border border-gray-300 dark:border-gray-800 rounded-lg shadow-outline hover:shadow-hover hover:outline hover:outline-1 hover:outline-green-500">
      <div className="absolute top-7 right-7  z-[1]">
        <WatchlistButton id={place._id} />
      </div>

      <Link href={`/place/${place._id}`}>
        <div
          className="w-full h-56 bg-cover bg-center relative rounded-lg mb-4 flex items-end justify-center"
          style={{
            backgroundImage: `url(${place.image})`,
          }}
        ></div>
      </Link>

      <Link
        href={`/place/${place._id}`}
        className="text-xl font-medium text-gray-900 dark:text-white group-hover:text-green-500"
      >
        {place.title}
      </Link>
      <p className="text-gray-700 dark:text-gray-400 my-2 line-clamp-2">
        {place.description}
      </p>
    </div>
  );
};

export default Card;
