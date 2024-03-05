"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import useConfirm from "@/hooks/useConfirm";

import { DataTable } from "@/components/Admin/DataTable/DataTable";
import { columns } from "./columns";
import MenageDialog from "./MenageDialog";
import { Button } from "@/components/ui/button";

import { deleteTopic } from "@/actions/topicActions";

const Topics = ({ topics }) => {
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

  const handleDeleteTopic = async (topicId) => {
    const isConfirmed = await confirm("Czy na pewno chcesz usunąć ten temat?");

    if (isConfirmed) {
      try {
        const result = await deleteTopic(topicId);
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
        topic={dialogContext}
      />
      <div className="flex justify-between items-center mb-10">
        <h2 class="text-center text-2xl font-bold text-gray-800 md:text-4xl">
          Zarządzaj tematami
        </h2>
        <Button onClick={openDialogWithoutRowData}>Dodaj</Button>
      </div>

      <DataTable
        columns={columns(openDialogWithRowData, handleDeleteTopic)}
        data={topics}
        filterColumn="name"
      />
    </>
  );
};

export default Topics;