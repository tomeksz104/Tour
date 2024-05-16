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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { createTag, updateTag } from "@/actions/menage/tagActions";

const MenageDialog = ({ isOpen, onClose, tag = null }) => {
  const initialState = { message: null, errors: {} };
  const updateTagWithId = updateTag.bind(null, tag?.id);
  const [state, dispatch] = useFormState(
    tag?.id ? updateTagWithId : createTag,
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
          <DialogTitle>{tag ? "Edytuj tag" : "Dodaj nowy tag"}</DialogTitle>
        </DialogHeader>

        <form action={dispatch}>
          <div className="grid grid-cols-4 items-center gap-4 py-4">
            <Label htmlFor="name" className="text-right" id="name" name="name">
              Nazwa
            </Label>
            <Input
              id="name"
              name="name"
              className="col-span-3"
              defaultValue={tag ? tag?.name : ""}
            />
          </div>

          <DialogFooter>
            <Button type="submit">{tag ? "Aktualizuj" : "Dodaj"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MenageDialog;
