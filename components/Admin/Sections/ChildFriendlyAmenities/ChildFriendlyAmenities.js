"use client";

import { DataTable } from "@/components/Admin/DataTable/DataTable";
import { columns } from "./columns";
import { useState } from "react";
import MenageDialog from "./MenageDialog";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

import { deleteChildFriendlyAmenity } from "@/actions/childFriendlyAmenityActions";
import useConfirm from "@/hooks/useConfirm";

const ChildFriendlyAmenities = ({ childFriendlyAmenities }) => {
  const { confirm } = useConfirm();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContext, setDialogContext] = useState(null);

  const openDialogWithRowData = (rowData) => {
    setDialogContext(rowData);
    setDialogOpen(true);
  };

  const openDialogWithoutRowData = () => {
    setDialogContext(null);
    setDialogOpen(true);
  };

  const toggleMenageDialog = () => setDialogOpen((prevState) => !prevState);

  const handleDeleteChildFriendlyAmenity = async (id) => {
    const isConfirmed = await confirm(
      "Czy na pewno chcesz usunąć te udogodnienie dla dziecka?"
    );

    if (isConfirmed) {
      try {
        const result = await deleteChildFriendlyAmenity(id);
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

  return (
    <>
      <MenageDialog
        key={dialogContext !== null ? dialogContext?.id : "new"}
        isOpen={dialogOpen}
        onClose={toggleMenageDialog}
        childFriendlyAmenity={dialogContext}
      />
      <div className="flex justify-between items-center mb-10">
        <h2 class="text-center text-2xl font-bold text-gray-800 md:text-4xl">
          Zarządzaj udogodnieniami dla dzieci
        </h2>
        <Button onClick={openDialogWithoutRowData}>Dodaj</Button>
      </div>

      <DataTable
        columns={columns(
          openDialogWithRowData,
          handleDeleteChildFriendlyAmenity
        )}
        data={childFriendlyAmenities}
        filterColumn="name"
      />
    </>
  );
};

export default ChildFriendlyAmenities;
