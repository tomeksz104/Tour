import { db } from "@/lib/db";

import Users from "@/components/Admin/Sections/Users/Users";

const UsersPage = async () => {
  const users = await db.user.findMany({
    orderBy: {
      id: "asc",
    },
  });

  return (
    <>
      <main className="py-10 lg:pl-72">
        <div className="px-4 sm:px-6 lg:px-8">
          <Users users={users} />
        </div>
      </main>
    </>
  );
};

export default UsersPage;
