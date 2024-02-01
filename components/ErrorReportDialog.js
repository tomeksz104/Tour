"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import { useFormState } from "react-dom";
import { useToast } from "@/hooks/useToast";

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

import { insertErrorReport } from "@/actions/errorReportManager";

const ErrorReportDialog = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const toast = useToast();
  const initialState = { message: null, errors: {} };

  const form = useForm({
    defaultValues: {
      content: undefined,
    },
  });

  const [state, dispatch] = useFormState(insertErrorReport, initialState);

  async function onSubmit(data) {
    const formData = new FormData();

    formData.append("pageUrl", pathname);

    dispatch({ ...data, pageUrl: pathname });
  }

  useEffect(() => {
    if (state.errors && state.message) {
      toast.error(state.message);
    } else if (state.message) {
      form.setValue("content", "");
      toast.success(state.message);
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
          <form onSubmit={form.handleSubmit(onSubmit)}>
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
