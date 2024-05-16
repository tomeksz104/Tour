import { db } from "@/lib/db";

import Tags from "@/components/Admin/Sections/Tags/Tags";

export const dynamic = "force-dynamic";

const TagsPage = async () => {
  const tags = await db.tag.findMany({
    orderBy: {
      id: "asc",
    },
  });

  return (
    <>
      <main className="py-10 lg:pl-72">
        <div className="px-4 sm:px-6 lg:px-8">
          <Tags tags={tags} />
        </div>
      </main>
    </>
  );
};

export default TagsPage;
