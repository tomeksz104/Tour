"use client";

import useConfirm from "@/hooks/useConfirm";
import { DataTable } from "./DataTable";
import { columns } from "./columns";
import toast from "react-hot-toast";

import { deletePlace, changePlaceStatus } from "@/actions/menage/placeActions";

const Places = ({ places }) => {
  const { confirm } = useConfirm();

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
    <DataTable
      columns={columns(handleChangePlaceStatus, handleDeletePlace)}
      data={places}
      filterColumn="title"
    />
  );
};

export default Places;
