import Image from "next/image";
import Link from "next/link";

const PlacePopup = ({ place }) => {
  return (
    <div className="group rounded-3xl">
      <div className="relative overflow-hidden rounded-t-xl">
        <Image
          src={
            place.mainPhotoPath ? place.mainPhotoPath : "/images/noImage.jpg"
          }
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
        <Link
          href={`/place/${place.id}`}
          className="text-md font-semibold hover:underline"
          style={{ color: "#000000" }}
        >
          {place.title}
        </Link>
        <p className="pt-1 text-gray-600 hidden md:line-clamp-2">
          {place.slogan}
        </p>
      </div>
    </div>
  );
};

export default PlacePopup;
