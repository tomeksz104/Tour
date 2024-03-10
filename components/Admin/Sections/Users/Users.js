"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import useConfirm from "@/hooks/useConfirm";

import { DataTable } from "@/components/Admin/DataTable/DataTable";
import { columns } from "./columns";
import MenageDialog from "./MenageDialog";

import { deleteUser } from "@/actions/menage/userActions";

const Users = ({ users }) => {
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

  const handleDeleteUser = async (userId) => {
    const isConfirmed = await confirm(
      "Czy na pewno chcesz usunąć tego użytkownika?"
    );

    if (isConfirmed) {
      try {
        const result = await deleteUser(userId);
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
      {dialogContext !== null && (
        <MenageDialog
          key={dialogContext !== null ? dialogContext?.id : "new"}
          isOpen={dialogOpen}
          onClose={toggleMenageDialog}
          user={dialogContext}
        />
      )}

      <div className="flex justify-between items-center mb-10">
        <h2 class="text-center text-2xl font-bold text-gray-800 md:text-4xl">
          Zarządzaj użytkownikami
        </h2>
      </div>

      <DataTable
        columns={columns(openDialogWithRowData, handleDeleteUser)}
        data={users}
        filterColumn="email"
      />
    </>
  );
};

export default Users;
