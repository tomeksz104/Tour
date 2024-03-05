import Categories from "@/components/Admin/Sections/Categories/Categories";
import { db } from "@/lib/db";

const CategoriesPage = async () => {
  const categories = await db.category.findMany({
    orderBy: {
      id: "asc",
    },
  });

  return (
    <>
      <main className="py-10 lg:pl-72">
        <div className="px-4 sm:px-6 lg:px-8">
          <Categories categories={categories} />
        </div>
      </main>
    </>
  );
};

export default CategoriesPage;
