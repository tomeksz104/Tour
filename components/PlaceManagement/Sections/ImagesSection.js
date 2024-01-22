import { Label } from "@/components/ui/label";
import { useState } from "react";

import { Trash2 } from "lucide-react";

const ImagesSection = ({
  mainPhotoPath,
  onChangeMainPhotoPath,
  galleryImages,
  handleGalleryImageChange,
  handleRemoveGalleryImage,
}) => {
  return (
    <>
      <div className="space-y-2 border-t px-5 py-4">
        <Label htmlFor="slogan">Zdjęcie główne</Label>
        <span className="block text-xs text-gray-500 italic">
          Jeśli zdjęcie główne nie zostanie dodane, zastosujemy domyślny obraz z
          naszym brandingiem.
        </span>

        {mainPhotoPath && (
          <div className="relative w-1/2 h-48">
            <img
              src={`${
                typeof mainPhotoPath === "object"
                  ? URL.createObjectURL(mainPhotoPath)
                  : mainPhotoPath
              }`}
              className="rounded-lg object-cover h-48 w-full"
            />
            <div class="absolute top-2 right-2 group-hover:flex space-x-2 z-[1]">
              <button
                type="button"
                onClick={() => {
                  onChangeMainPhotoPath(null);
                }}
                className="bg-white rounded-full p-1.5 shadow-sm duration-300 hover:scale-110 pointer-events-auto hover:bg-blue-50"
              >
                <Trash2 className="w-5 h-5 text-red-500" />
              </button>
            </div>
          </div>
        )}

        {!mainPhotoPath && (
          <div class="flex items-center justify-center w-1/2">
            <label
              for="dropzone-file"
              class="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
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
                //onChange={(e) => setFile(e.target.files?.[0])}
                onChange={(e) => onChangeMainPhotoPath(e.target.files?.[0])}
              />
            </label>
          </div>
        )}
      </div>

      <div className="space-y-2 border-t px-5 py-4">
        <Label htmlFor="slogan">Galeria zdjęć</Label>
        <span className="block text-xs text-gray-500 italic">
          Jeśli zdjęcie główne nie zostanie dodane, zastosujemy domyślny obraz z
          naszym brandingiem.
        </span>
        <div className="grid grid-cols-3 w-full items-center space-y-2">
          {galleryImages.map((image, index) => (
            <div key={index} className="relative h-48 p-2">
              <img
                src={image.url}
                className="rounded-lg object-cover h-48 w-full"
              />
              <div className="absolute top-4 right-4 z-[1]">
                <button
                  type="button"
                  onClick={() => handleRemoveGalleryImage(index)}
                  className="bg-white rounded-full p-1.5 shadow-sm duration-300 hover:scale-110 pointer-events-auto hover:bg-red-50"
                >
                  <Trash2 className="w-5 h-5 text-red-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div class="flex items-center justify-center w-1/2 px-5 pt-5">
        <label
          for="gallery-dropzone"
          class="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
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
            id="gallery-dropzone"
            type="file"
            class="hidden"
            multiple
            onChange={handleGalleryImageChange}
          />
        </label>
      </div>
    </>
  );
};

export default ImagesSection;
