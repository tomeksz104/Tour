import { db } from "@/lib/db";

import Reports from "@/components/Admin/Sections/Reports/Reports";

const ReportsPage = async () => {
  const reports = await db.ErrorReport.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <>
      <main className="py-10 lg:pl-72">
        <div className="px-4 sm:px-6 lg:px-8">
          <Reports reports={reports} />
        </div>
      </main>
    </>
  );
};

export default ReportsPage;
