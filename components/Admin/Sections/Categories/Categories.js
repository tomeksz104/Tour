"use client";

import { DataTable } from "@/components/Admin/DataTable/DataTable";
import { columns } from "./columns";
import { useState } from "react";
import MenageDialog from "./MenageDialog";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

import { deleteCategory } from "@/actions/menage/categoryActions";
import useConfirm from "@/hooks/useConfirm";

const Categories = ({ categories }) => {
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

  const handleDeleteCategory = async (id) => {
    const isConfirmed = await confirm(
      "Czy na pewno chcesz usunąć tę kategorię?"
    );

    if (isConfirmed) {
      try {
        const result = await deleteCategory(id);
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
        category={dialogContext}
      />
      <div className="flex justify-between items-center mb-10">
        <h2 class="text-center text-2xl font-bold text-gray-800 md:text-4xl">
          Zarządzaj kategoriami
        </h2>
        <Button onClick={openDialogWithoutRowData}>Dodaj</Button>
      </div>

      <DataTable
        columns={columns(openDialogWithRowData, handleDeleteCategory)}
        data={categories}
        filterColumn="name"
      />
    </>
  );
};

export default Categories;
