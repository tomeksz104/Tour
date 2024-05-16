import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

import { PlaceStatus } from "@prisma/client";
import { Circle } from "lucide-react";
import { statusEnglishToPolish, statusToColor } from "./columns";

export function DataTablePerPage({ table, filterColumn }) {
  return (
    <div className="flex items-center justify-between px-2 mb-5">
      <div className="flex items-center py-4">
        <Input
          placeholder="Wyszukuj ..."
          value={table.getColumn(filterColumn)?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn(filterColumn)?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>

      <div className="flex items-center gap-x-5">
        <div className="flex items-center gap-x-3">
          <span>Status:</span>
          <Select
            defaultValue="all"
            onValueChange={(status) => {
              if (status === "all") {
                table.getColumn("status").setFilterValue(undefined);
              } else {
                table.getColumn("status").setFilterValue(status);
              }
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Wszystkie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Wszystkie</SelectItem>
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
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Wierszy na strone</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
