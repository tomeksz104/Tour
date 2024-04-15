import { db } from "@/lib/db";

import Topics from "@/components/Admin/Sections/Topics/Topics";

export const dynamic = "force-dynamic";

const TopicsPage = async () => {
  const topics = await db.topic.findMany({
    orderBy: {
      id: "asc",
    },
  });

  return (
    <>
      <main className="py-10 lg:pl-72">
        <div className="px-4 sm:px-6 lg:px-8">
          <Topics topics={topics} />
        </div>
      </main>
    </>
  );
};

export default TopicsPage;
