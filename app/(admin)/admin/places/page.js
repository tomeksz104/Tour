import Places from "@/components/Admin/Sections/Places/Places";
import { db } from "@/lib/db";

const PlacesPage = async () => {
  const places = await db.place.findMany({
    include: {
      user: true,
      category: true,
    },
  });

  return (
    <>
      <main className="py-10 lg:pl-72">
        <div className="px-4 sm:px-6 lg:px-8">
          <Places places={places} />
        </div>
      </main>
    </>
  );
};

export default PlacesPage;
