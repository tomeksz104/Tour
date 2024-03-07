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

import { updateUser } from "@/actions/menage/userActions";
import { CheckCircle2, PlusCircle, XCircle } from "lucide-react";

import { Role as userRole } from "@prisma/client";

const MenageDialog = ({ isOpen, onClose, user }) => {
  const initialState = { message: null, errors: {} };
  const updateUserWithId = updateUser.bind(null, user?.id);
  const [state, dispatch] = useFormState(updateUserWithId, initialState);

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
          <DialogTitle>Edytuj użytkownika</DialogTitle>
        </DialogHeader>

        <form action={dispatch}>
          <div className="items-center gap-4 py-4">
            <Label htmlFor="role">Rola użytkownika</Label>
            <Select name="role" defaultValue={user ? user?.role : ""}>
              <SelectTrigger className="w-full col-span-3">
                <SelectValue placeholder="Wybierz status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {Object.keys(userRole).map((key) => (
                    <SelectItem key={key} value={userRole[key]}>
                      {userRole[key]}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="gap-1.5 py-3">
            <Label htmlFor="username">Nazwa użytkownika</Label>
            <Input
              id="username"
              name="username"
              defaultValue={user ? user?.username : ""}
            />
          </div>

          <div className="gap-1.5 py-3">
            <div className="flex items-center justify-between mb-1.5">
              <Label htmlFor="email">Adres email</Label>
              {user.emailVerified ? (
                <span className="flex items-center gap-x-1 text-xs text-green-500">
                  <CheckCircle2 size={14} />
                  Zweryfikowany
                </span>
              ) : (
                <span className="flex items-center gap-x-1 text-xs text-red-500">
                  <XCircle size={14} />
                  Niezweryfikowany
                </span>
              )}
            </div>

            <Input
              id="email"
              name="email"
              defaultValue={user ? user?.email : ""}
            />
          </div>

          <div className="gap-1.5 py-3">
            <Label htmlFor="firstName">Imię</Label>
            <Input
              id="firstName"
              name="firstName"
              defaultValue={user ? user?.firstName : ""}
            />
          </div>

          <div className="gap-1.5 py-3">
            <Label htmlFor="lastName">Nazwisko</Label>
            <Input
              id="lastName"
              name="lastName"
              defaultValue={user ? user?.lastName : ""}
            />
          </div>

          <div className="gap-1.5 py-3">
            <Label htmlFor="aboutme">O mnie</Label>
            <Input
              id="aboutme"
              name="aboutme"
              defaultValue={user ? user?.aboutme : ""}
            />
          </div>

          <DialogFooter>
            <Button type="submit">Aktualizuj</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MenageDialog;
