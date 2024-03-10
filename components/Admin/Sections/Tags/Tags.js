"use client";

import { DataTable } from "@/components/Admin/DataTable/DataTable";
import { columns } from "./columns";
import { useState } from "react";
import MenageDialog from "./MenageDialog";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

import { deleteTag } from "@/actions/menage/tagActions";
import useConfirm from "@/hooks/useConfirm";

const Tags = ({ tags }) => {
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

  const handleDeleteTag = async (tagId) => {
    const isConfirmed = await confirm("Czy na pewno chcesz usunąć ten tag?");

    if (isConfirmed) {
      try {
        const result = await deleteTag(tagId);
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
        tag={dialogContext}
      />
      <div className="flex justify-between items-center mb-10">
        <h2 class="text-center text-2xl font-bold text-gray-800 md:text-4xl">
          Zarządzaj tagami
        </h2>
        <Button onClick={openDialogWithoutRowData}>Dodaj</Button>
      </div>

      <DataTable
        columns={columns(openDialogWithRowData, handleDeleteTag)}
        data={tags}
        filterColumn="name"
      />
    </>
  );
};

export default Tags;
