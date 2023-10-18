"use client";

import Link from "next/link";
import WatchlistButton from "../WatchlistButton";

const Card = ({ place }) => {
  return (
    <div class="h-full group p-4 relative bg-white dark:bg-dark border border-gray-300 dark:border-gray-800 rounded-lg shadow-outline hover:shadow-hover hover:outline hover:outline-1 hover:outline-green-500">
      {/* <button class="w-9 h-9 p-2 absolute top-7 right-7 flex items-center justify-center bg-gray-700/5 hover:bg-gray-700/10 rounded-full z-10">
        <svg width="18" height="18" viewBox="0 0 18 18">
          <path
            d="M0 6.71134V6.50744C0 4.05002 1.77609 1.954 4.19766 1.55041C5.76914 1.28357 7.43203 1.80599 8.57812 2.95384L9 3.37502L9.39023 2.95384C10.568 1.80599 12.1992 1.28357 13.8023 1.55041C16.2246 1.954 18 4.05002 18 6.50744V6.71134C18 8.17033 17.3953 9.56603 16.3266 10.561L9.97383 16.4918C9.71016 16.7379 9.36211 16.875 9 16.875C8.63789 16.875 8.28984 16.7379 8.02617 16.4918L1.67309 10.561C0.605742 9.56603 1.05469e-05 8.17033 1.05469e-05 6.71134H0Z"
            fill="#585C7B"
          ></path>
        </svg>
      </button> */}
      <div className="absolute top-7 right-7  z-[1]">
        <WatchlistButton id={place._id} />
      </div>

      <Link href={`/place/${place._id}`}>
        <div
          class="w-full h-56 bg-cover bg-center relative rounded-lg mb-4 flex items-end justify-center"
          style={{
            backgroundImage: `url(${place.image})`,
          }}
        ></div>
      </Link>

      <Link
        href={`/place/${place._id}`}
        class="text-xl font-medium text-gray-900 dark:text-white group-hover:text-green-500"
      >
        {place.title}
      </Link>
      <p class="text-gray-700 dark:text-gray-400 my-2 line-clamp-2">
        {place.description}
      </p>
    </div>
  );
};

export default Card;
