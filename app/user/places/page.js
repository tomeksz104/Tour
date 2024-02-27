import {
  Payment,
  columns,
} from "@/components/User/Sections/UserPlaces/columns";
import { DataTable } from "@/components/User/Sections/UserPlaces/DataTable";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { getPlacesByUserId } from "@/actions/getPlacesByUserId";

export default async function DemoPage() {
  const session = await getServerSession(authOptions);
  const places = await getPlacesByUserId(session.user.id);

  const publishedCount = places.filter(
    (place) => place.status === "PUBLISHED"
  ).length;
  const inModerationCount = places.filter(
    (place) => place.status === "IN_MODERATION"
  ).length;
  const rejectedCount = places.filter(
    (place) => place.status === "REJECTED"
  ).length;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h2 className="text-center text-2xl font-bold text-gray-800 md:text-4xl mb-10">
        Twoje miejsca
      </h2>

      <dl className="mt-5 mb-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">
            Opublikowane
          </dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            {publishedCount}
          </dd>
        </div>
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">
            W moderacji
          </dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            {inModerationCount}
          </dd>
        </div>
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">
            Odrzucone
          </dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            {rejectedCount}
          </dd>
        </div>
      </dl>

      <DataTable columns={columns} data={places} />
    </div>
  );
}
