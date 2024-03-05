import { useEffect, useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import { createCategory, updateCategory } from "@/actions/categoryActions";
import { Trash2 } from "lucide-react";

const MenageDialog = ({ isOpen, onClose, category = null }) => {
  const initialState = { message: null, errors: {} };
  const updateCategoryWithId = updateCategory.bind(null, category?.id);
  const [state, dispatch] = useFormState(
    category?.id ? updateCategoryWithId : createCategory,
    initialState
  );
  const [iconPath, setIconPath] = useState(
    category?.iconPath ? category.iconPath : null
  );

  useEffect(() => {
    if (state.success === true) {
      toast.success(state.message);
      onClose();
    } else if (state.success === false) {
      toast.error(state.message);
    }
  }, [state]);

  async function handleSubmit(formData) {
    if (iconPath) {
      formData.append("file", iconPath);
    }

    dispatch(formData);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {category ? "Edytuj kategorię" : "Dodaj nową kategorie"}
          </DialogTitle>
        </DialogHeader>

        <form action={handleSubmit}>
          <div className="grid w-full gap-1.5 py-3">
            <Label htmlFor="name">Nazwa</Label>
            <Input
              id="name"
              name="name"
              defaultValue={category ? category?.name : ""}
            />
          </div>
          <div className="grid w-full gap-1.5 py-3">
            <Label htmlFor="description">Opis</Label>
            <Input
              id="description"
              name="description"
              defaultValue={category ? category?.description : ""}
            />
          </div>

          <div className="space-y-2 py-4">
            <Label
              htmlFor="iconPath"
              className="text-sm font-semibold text-gray-600"
            >
              Ikona kategorii
            </Label>

            {iconPath && (
              <div className="relative flex items-center w-full h-24 border rounded-md">
                <img
                  src={`${
                    typeof iconPath === "object"
                      ? URL.createObjectURL(iconPath)
                      : iconPath
                  }`}
                  className="rounded-lg object-contain h-12 w-full"
                />
                <div class="absolute top-2 right-2 group-hover:flex space-x-2 z-[1]">
                  <button
                    type="button"
                    onClick={() => {
                      setIconPath(null);
                    }}
                    className="bg-white rounded-full p-1.5 shadow-sm duration-300 hover:scale-110 pointer-events-auto hover:bg-blue-50"
                  >
                    <Trash2 className="w-5 h-5 text-red-500" />
                  </button>
                </div>
              </div>
            )}

            {!iconPath && (
              <div class="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  class="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div class="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span class="font-semibold">Kliknij, aby przesłać</span>
                    </p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">
                      PNG, JPG lub GIF
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    class="hidden"
                    onChange={(e) => setIconPath(e.target.files?.[0])}
                  />
                </label>
              </div>
            )}
          </div>

          <div className="grid w-full gap-1.5 py-3">
            <Label htmlFor="svgIconPath">Ikona svg</Label>
            <Textarea
              id="svgIconPath"
              name="svgIconPath"
              placeholder={`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-castle"><path d="M22 20v-9H2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2Z"/><path d="M18 11V4H6v7"/><path d="M15 22v-4a3 3 0 0 0-3-3v0a3 3 0 0 0-3 3v4"/><path d="M22 11V9"/><path d="M2 11V9"/><path d="M6 4V2"/><path d="M18 4V2"/><path d="M10 4V2"/><path d="M14 4V2"/></svg>`}
              defaultValue={category ? category?.svgIconPath : ""}
            />
          </div>

          <DialogFooter>
            <Button type="submit">{category ? "Aktualizuj" : "Dodaj"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MenageDialog;
