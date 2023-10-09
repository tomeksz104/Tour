import { LazyLoadImage } from "react-lazy-load-image-component";

const PlacePopup = ({ place, router }) => {
  const handleShowPlaceDetails = () => {
    router.push(`/place/${place._id}`);
  };

  return (
    <div className="group rounded-3xl">
      <div className="relative overflow-hidden rounded-t-xl">
        <LazyLoadImage
          className="h-32 w-full object-cover object-top"
          src={place.image}
          alt={place.title}
        />
      </div>
      <div className="py-2 px-3 relative">
        <button
          onClick={handleShowPlaceDetails}
          className="text-md font-semibold hover:underline"
          style={{ color: "#000000" }}
        >
          {place.title}
        </button>
        <p className="pt-1 text-gray-600 hidden md:line-clamp-2">
          {place.description}
        </p>
      </div>
    </div>
  );
};

export default PlacePopup;
