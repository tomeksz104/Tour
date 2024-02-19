"use client";

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
import { useEffect, useState } from "react";

const ShareDialog = ({ isOpen, onClose }) => {
  const [link, setLink] = useState("");
  const [value, copy] = useCopyToClipboard();

  useEffect(() => {
    setLink(window.location.href);
  }, []);

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
            <Input id="link" defaultValue={link} readOnly />
          </div>
          <Button
            onClick={() => copy(link)}
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
