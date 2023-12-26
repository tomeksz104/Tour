import Image from "next/image";

const PlacePopup = ({ place, router }) => {
  const handleShowPlaceDetails = () => {
    router.push(`/place/${place._id}`);
  };

  return (
    <div className="group rounded-3xl">
      <div className="relative overflow-hidden rounded-t-xl">
        <Image
          src={place.image}
          alt={place.title}
          width={16}
          height={9}
          sizes="100vw"
          className="h-32 w-full"
          style={{
            objectFit: "cover",
          }}
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
