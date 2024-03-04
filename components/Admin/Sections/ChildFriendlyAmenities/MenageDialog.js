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

import {
  createChildFriendlyAmenity,
  updateChildFriendlyAmenity,
} from "@/actions/childFriendlyAmenityActions";

const MenageDialog = ({ isOpen, onClose, childFriendlyAmenity = null }) => {
  const initialState = { message: null, errors: {} };
  const updateChildFrienlyAmenityWithId = updateChildFriendlyAmenity.bind(
    null,
    childFriendlyAmenity?.id
  );
  const [state, dispatch] = useFormState(
    childFriendlyAmenity?.id
      ? updateChildFrienlyAmenityWithId
      : createChildFriendlyAmenity,
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
            {childFriendlyAmenity
              ? "Edytuj udogodnienie"
              : "Dodaj nowy udogodnienie"}
          </DialogTitle>
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
              defaultValue={
                childFriendlyAmenity ? childFriendlyAmenity?.name : ""
              }
            />
          </div>

          <DialogFooter>
            <Button type="submit">
              {childFriendlyAmenity ? "Aktualizuj" : "Dodaj"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MenageDialog;
