"use client";

import { useEffect, useState } from "react";
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
import { RotateCw } from "lucide-react";

const ErrorReportDialog = ({ isOpen, onClose }) => {
  const pathname = usePathname();

  const initialState = { message: null, errors: {} };

  const form = useForm({
    defaultValues: {
      content: undefined,
    },
  });

  const [state, dispatch] = useFormState(createErrorReport, initialState);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data) => {
    setIsLoading(true);

    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    formData.append("pageUrl", pathname);

    dispatch(formData);
  };

  useEffect(() => {
    if (state.success === true) {
      form.setValue("content", "");
      setIsLoading(false);
      toast.success(state.message);
      onClose();
    } else if (state.success === false) {
      setIsLoading(false);
      toast.error(state?.message);
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
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            // action={handleSubmit}
          >
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
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-green-600 hover:bg-green-500"
              >
                {isLoading ? (
                  <RotateCw className="absolute mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Wyślij zgłoszenie"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ErrorReportDialog;
