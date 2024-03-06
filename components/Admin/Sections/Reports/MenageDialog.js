import { useEffect } from "react";
import { useFormState } from "react-dom";

import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  createErrorReport,
  updateErrorReport,
} from "@/actions/menage/reportActions";

import { ErrorReportStatus as reportStatus } from "@prisma/client";

const MenageDialog = ({ isOpen, onClose, report = null }) => {
  const initialState = { message: null, errors: {} };
  const updateReportWithId = updateErrorReport.bind(null, report?.id);
  const [state, dispatch] = useFormState(
    report?.id ? updateReportWithId : createErrorReport,
    initialState
  );

  useEffect(() => {
    if (state.success === true) {
      toast.success(state.message);
      onClose();
    } else if (state.success === false) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {report ? "Edytuj zgłoszenie" : "Dodaj nowe zgłoszenie"}
          </DialogTitle>
        </DialogHeader>

        <form action={dispatch}>
          <div className="grid grid-cols-4 items-center gap-4 py-4">
            <Label htmlFor="content" id="content" name="content">
              Nazwa
            </Label>
            <Input
              id="content"
              name="content"
              className="col-span-3"
              defaultValue={report ? report?.content : ""}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4 py-4">
            <Label htmlFor="pageUrl" id="pageUrl" name="pageUrl">
              Udres URL
            </Label>
            <Input
              id="pageUrl"
              name="pageUrl"
              className="col-span-3"
              defaultValue={report ? report?.pageUrl : ""}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4 py-4">
            <Label htmlFor="status" id="status" name="status">
              Status
            </Label>
            <Select name="status" defaultValue={report ? report?.status : ""}>
              <SelectTrigger className="w-full col-span-3">
                <SelectValue placeholder="Wybierz status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {Object.keys(reportStatus).map((key) => (
                    <SelectItem key={key} value={reportStatus[key]}>
                      {reportStatus[key]}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button type="submit">{report ? "Aktualizuj" : "Dodaj"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MenageDialog;
