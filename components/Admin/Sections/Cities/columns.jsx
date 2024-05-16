"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatWord } from "@/utils/formatWord";

import { MoreHorizontal, Trash2 } from "lucide-react";

export const columns = (openDialogWithRowData, handleDeleteCity) => [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Nazwa",
  },
  {
    accessorKey: "_count.places",
    header: "Ilość miejsc",
    cell: ({ row }) => {
      return (
        <>
          {row.original._count.places > 0 && (
            <Badge variant="outline">
              {row.original._count.places}{" "}
              {formatWord(row.original._count.places, [
                "atrakcja",
                "atrakcje",
                "atrakcji",
              ])}
            </Badge>
          )}
        </>
      );
    },
  },
  {
    accessorKey: "province.name",
    header: "Województwo",
  },

  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Otwórz menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => openDialogWithRowData(row.original)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-4 w-4"
              >
                <path d="m18 5-3-3H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2" />
                <path d="M8 18h1" />
                <path d="M18.4 9.6a2 2 0 1 1 3 3L17 17l-4 1 1-4Z" />
              </svg>
              Edytuj
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => handleDeleteCity(row.original.id)}>
              <Trash2 className="mr-2 h-4 w-4" /> <span>Usuń</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
