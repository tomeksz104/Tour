"use client";

import { DataTable } from "@/components/Admin/DataTable/DataTable";
import { columns } from "./columns";
import { useState } from "react";
import MenageDialog from "./MenageDialog";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

import { deleteReport } from "@/actions/menage/reportActions";
import useConfirm from "@/hooks/useConfirm";

import { ErrorReportStatus } from "@prisma/client";

const Reports = ({ reports }) => {
  const { confirm } = useConfirm();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContext, setDialogContext] = useState(null);

  const newCount = reports.filter(
    (report) => report.status === ErrorReportStatus.NEW
  ).length;
  const inProgressCount = reports.filter(
    (report) => report.status === ErrorReportStatus.IN_PROGRESS
  ).length;
  const resolvedCount = reports.filter(
    (report) => report.status === ErrorReportStatus.RESOLVED
  ).length;

  const openDialogWithRowData = (rowData) => {
    setDialogContext(rowData);
    setDialogOpen(true);
  };

  const openDialogWithoutRowData = () => {
    setDialogContext(null);
    setDialogOpen(true);
  };

  const toggleMenageDialog = () => setDialogOpen((prevState) => !prevState);

  const handleDeleteReport = async (reportId) => {
    const isConfirmed = await confirm(
      "Czy na pewno chcesz usunąć te zgłoszenie?"
    );

    if (isConfirmed) {
      try {
        const result = await deleteReport(reportId);
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
        report={dialogContext}
      />
      <div className="flex justify-between items-center mb-10">
        <h2 class="text-center text-2xl font-bold text-gray-800 md:text-4xl">
          Zarządzaj zgłoszeniami
        </h2>
        <Button onClick={openDialogWithoutRowData}>Dodaj</Button>
      </div>

      <dl className="mt-5 mb-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">Nowe</dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            {newCount}
          </dd>
        </div>
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">
            W trakcje
          </dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            {inProgressCount}
          </dd>
        </div>
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">
            Zamknięte
          </dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            {resolvedCount}
          </dd>
        </div>
      </dl>

      <DataTable
        columns={columns(openDialogWithRowData, handleDeleteReport)}
        data={reports}
        filterColumn="content"
      />
    </>
  );
};

export default Reports;
