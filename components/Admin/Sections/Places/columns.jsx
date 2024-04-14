"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Circle, MoreHorizontal, Trash2, FilePenLine } from "lucide-react";
import Link from "next/link";

import { getPlaceUrl } from "@/utils/apiPaths";
import { PlaceStatus } from "@prisma/client";

export const statusEnglishToPolish = {
  PUBLISHED: "Opublikowane",
  IN_MODERATION: "W moderacji",
  REJECTED: "Odrzucone",
  PENDING_PAYMENT: "Oczekiwanie na płatność",
};

const statusToColor = {
  PUBLISHED: "#17d33d", // Green
  IN_MODERATION: "#f7b731", // Yellow
  REJECTED: "#eb3b5a", // Red
  PENDING_PAYMENT: "#45aaf2", // Blue
};

export const columns = (handleChangePlaceStatus, handleDeletePlace) => [
  {
    accessorKey: "title",
    header: "Tytuł",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-5">
        <div className="h-16 w-16">
          <Image
            width="0"
            height="0"
            sizes="100vw"
            src={
              row.original.mainPhotoPath
                ? row.original.mainPhotoPath
                : "/images/noImage.jpg"
            }
            alt="Zdjęcie"
            className="rounded-md h-16 w-16 object-cover"
          />
        </div>
        <Link
          href={getPlaceUrl(row.original.slug)}
          className="flex items-center gap-x-2 hover:underline"
        >
          {row.original.title}
        </Link>
      </div>
    ),
  },
  {
    accessorKey: "category.name",
    header: "Kategoria",
  },
  {
    accessorKey: "status",
    header: "Status",

    cell: ({ row }) => (
      <Select
        onValueChange={(status) =>
          handleChangePlaceStatus(row.original.id, status)
        }
        className="w-[180px]"
        name="status"
        defaultValue={row.original.status}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Wybierz status" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {Object.keys(PlaceStatus).map((key) => (
              <SelectItem key={key} value={PlaceStatus[key]}>
                <div className="flex items-center gap-x-2">
                  <Circle
                    fill={statusToColor[PlaceStatus[key]]}
                    color={statusToColor[PlaceStatus[key]]}
                    size={10}
                  />
                  {statusEnglishToPolish[PlaceStatus[key]]}
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    ),
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
            <DropdownMenuItem asChild>
              <Link href={`/place/update/${row.original.id}`}>
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
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => handleDeletePlace(row.original.id)}
            >
              <Trash2 className="mr-2 h-4 w-4" /> <span>Usuń</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
