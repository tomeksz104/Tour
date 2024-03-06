"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
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
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { createErrorReport } from "@/actions/menage/reportActions";

const ErrorReportDialog = ({ isOpen, onClose }) => {
  const pathname = usePathname();

  const initialState = { message: null, errors: {} };

  const form = useForm({
    defaultValues: {
      content: undefined,
    },
  });

  const [state, dispatch] = useFormState(createErrorReport, initialState);

  async function handleSubmit(formData) {
    formData.append("pageUrl", pathname);

    dispatch(formData);
  }

  useEffect(() => {
    if (state.success === true) {
      form.setValue("content", "");
      toast.success(state.message);
      onClose();
    } else if (state.success === false) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Zgłoś błąd</DialogTitle>
          <DialogDescription>
            Tutaj możesz zgłosić napotkany błąd. Kliknij zapisz, kiedy
            skończysz.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form action={handleSubmit}>
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Informacje o napotkanym błędzie..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {state?.errors?.content &&
              state.errors.content.map((error) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}

            <DialogFooter className="mt-5">
              <Button type="submit">Wyślij zgłoszenie</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ErrorReportDialog;
