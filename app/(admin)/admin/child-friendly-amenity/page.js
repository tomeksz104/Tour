import { db } from "@/lib/db";

import ChildFriendlyAmenities from "@/components/Admin/Sections/ChildFriendlyAmenities/ChildFriendlyAmenities";

export const dynamic = "force-dynamic";

const ChildFriendlyAmenitiesPage = async () => {
  const childFriendlyAmenities = await db.ChildFriendlyAmenity.findMany({
    orderBy: {
      id: "asc",
    },
  });

  return (
    <>
      <main className="py-10 lg:pl-72">
        <div className="px-4 sm:px-6 lg:px-8">
          <ChildFriendlyAmenities
            childFriendlyAmenities={childFriendlyAmenities}
          />
        </div>
      </main>
    </>
  );
};

export default ChildFriendlyAmenitiesPage;
