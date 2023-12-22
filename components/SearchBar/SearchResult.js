import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import CircleButton from "../CircleButton";

const SearchResult = ({ place }) => {
  const router = useRouter();

  const handleFlyToPlace = () => {
    router.push(`/map?id=${place._id}`);
  };

  return (
    <div className="flex justify-between w-full cursor-pointer items-center border-b border-border-100 px-5 py-2 transition-colors last:border-b-0 hover:bg-slate-100 group">
      <div className="flex items-center">
        <div className="relative h-8 w-8 overflow-hidden rounded">
          <Image
            layout="fill"
            objectFit="cover"
            className="h-full w-full object-cover"
            src={place.image}
            alt={place.title}
          />
        </div>
        <Link
          href={`/place/${place._id}`}
          className="text-sm font-semibold text-heading ml-3"
        >
          {place.title}
        </Link>
      </div>

      <CircleButton onClick={handleFlyToPlace} className="hover:bg-blue-200">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5 text-blue-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
          />
        </svg>
      </CircleButton>
    </div>
  );
};

export default SearchResult;
