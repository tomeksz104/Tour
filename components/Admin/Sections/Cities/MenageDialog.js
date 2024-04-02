import { useEffect } from "react";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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

import { createCity, updateCity } from "@/actions/menage/cityActions";

const MenageDialog = ({ isOpen, onClose, city = null, provinces }) => {
  const initialState = { message: null, errors: {} };
  const form = useForm({
    defaultValues: {
      name: city?.name,
      provinceId: city?.provinceId,
    },
  });

  const updateCityWithId = updateCity.bind(null, city?.id);
  const [state, dispatch] = useFormState(
    city?.id ? updateCityWithId : createCity,
    initialState
  );

  const handleSubmit = async (data) => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    dispatch(formData);
  };

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
      <DialogContent className="sm:maqx-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {city ? "Edytuj miasto" : "Dodaj nowe miasto"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="space-y-1.5 py-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nazwa miasta</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="py-3">
              <FormField
                control={form.control}
                name="provinceId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Województwo</FormLabel>

                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="transition duration-300 focus:ring-1 focus:ring-green-500 focus:ring-offset-0">
                          <SelectValue placeholder="Wybierz województwo...">
                            {field.value
                              ? provinces[field.value - 1].name
                              : null}
                          </SelectValue>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {provinces.map((province) => (
                          <SelectItem key={province.id} value={province.id}>
                            {province.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit">{city ? "Aktualizuj" : "Dodaj"}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default MenageDialog;
