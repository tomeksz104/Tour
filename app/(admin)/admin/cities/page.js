import { db } from "@/lib/db";

import Cities from "@/components/Admin/Sections/Cities/Cities";

export const dynamic = "force-dynamic";

const CitiesPage = async () => {
  const cities = await db.city.findMany({
    orderBy: {
      id: "asc",
    },
    include: {
      province: true,
      _count: {
        select: { places: true },
      },
    },
  });
  const provinces = await db.province.findMany({
    orderBy: {
      id: "asc",
    },
  });

  return (
    <>
      <main className="py-10 lg:pl-72">
        <div className="px-4 sm:px-6 lg:px-8">
          <Cities cities={cities} provinces={provinces} />
        </div>
      </main>
    </>
  );
};

export default CitiesPage;
