"use client";

import useConfirm from "@/hooks/useConfirm";
import { DataTable } from "./DataTable";
import { columns } from "./columns";
import toast from "react-hot-toast";
import { buttonVariants } from "@/components/ui/button";

import { deletePlace, changePlaceStatus } from "@/actions/menage/placeActions";
import Link from "next/link";

import { PlaceStatus } from "@prisma/client";

const Places = ({ places }) => {
  const { confirm } = useConfirm();

  const publishedCount = places.filter(
    (place) => place.status === PlaceStatus.PUBLISHED
  ).length;
  const inModerationCount = places.filter(
    (place) => place.status === PlaceStatus.IN_MODERATION
  ).length;
  const rejectedCount = places.filter(
    (place) => place.status === PlaceStatus.REJECTED
  ).length;

  const handleDeletePlace = async (placeId) => {
    const isConfirmed = await confirm("Czy na pewno chcesz usunąć te miejsce?");

    if (isConfirmed) {
      try {
        const result = await deletePlace(placeId);
        if (result.success === true) {
          toast.success(result.message);
        } else if (result.success === false) {
          toast.error(result.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const handleChangePlaceStatus = async (placeId, status) => {
    try {
      const result = await changePlaceStatus(placeId, status);
      if (result.success === true) {
        toast.success(result.message);
      } else if (result.success === false) {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-10">
        <h2 class="text-center text-2xl font-bold text-gray-800 md:text-4xl">
          Zarządzaj miejscami
        </h2>

        <Link
          href="/place/new"
          className={buttonVariants({ variant: "default" })}
        >
          Dodaj
        </Link>
      </div>

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
      <DataTable
        columns={columns(handleChangePlaceStatus, handleDeletePlace)}
        data={places}
        filterColumn="title"
      />
    </>
  );
};

export default Places;
