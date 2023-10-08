import { LazyLoadImage } from "react-lazy-load-image-component";

const PlacePopup = ({ place, router }) => {
  const handleEditPlace = () => {
    router.push(`/place/update/${place._id}`);
  };

  const handleShowPlaceDetails = () => {
    router.push(`/place/${place._id}`);
  };

  return (
    <div className="group rounded-3xl">
      <div className="relative overflow-hidden rounded-t-xl">
        <button
          onClick={handleEditPlace}
          href={`/place/update/${place._id}`}
          className="absolute top-2 right-2 z-[1] bg-white rounded-full p-1 shadow-sm duration-300 hover:scale-110"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-3 h-3 text-blue-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
            />
          </svg>
        </button>
        <LazyLoadImage
          className="h-32 w-full object-cover object-top"
          src={place.image}
          alt={place.title}
        />
      </div>
      <div class="py-2 px-3 relative">
        <button
          onClick={handleShowPlaceDetails}
          className="text-md font-semibold hover:underline"
          style={{ color: "#000000" }}
        >
          {place.title}
        </button>
        <p class="pt-1 text-gray-600 hidden md:line-clamp-2">
          {place.description}
        </p>
      </div>
    </div>
  );
};

export default PlacePopup;
