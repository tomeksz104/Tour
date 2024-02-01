// import { CopyIcon } from "@radix-ui/react-icons";

import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy } from "lucide-react";

const ShareDialog = ({ isOpen, onClose }) => {
  const [value, copy] = useCopyToClipboard();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Udostępnij link</DialogTitle>
          <DialogDescription>
            Możesz podzielić się miejscem ze znajomymi.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input id="link" defaultValue={window.location.href} readOnly />
          </div>
          <Button
            onClick={() => copy(window.location.href)}
            type="submit"
            size="sm"
            className="px-3"
          >
            <span className="sr-only">Kopiuj</span>
            <Copy size={16} />
          </Button>
        </div>

        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button">Zamknij</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShareDialog;
