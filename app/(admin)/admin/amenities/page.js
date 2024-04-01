import { db } from "@/lib/db";

import Amenities from "@/components/Admin/Sections/Amenities/Amenities";

const AmenitiesPage = async () => {
  const amenities = await db.amenity.findMany({
    orderBy: {
      id: "asc",
    },
  });

  return (
    <>
      <main className="py-10 lg:pl-72">
        <div className="px-4 sm:px-6 lg:px-8">
          <Amenities amenities={amenities} />
        </div>
      </main>
    </>
  );
};

export default AmenitiesPage;
