"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/useToast";
import useConfirm from "@/hooks/useConfirm";
import { useForm } from "react-hook-form";
import { useFormState } from "react-dom";

import Button from "../Button";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { useSession } from "next-auth/react";
import { insertPlace, updatePlace } from "@/actions/upsertPlace";

import { DetailsSection } from "./Sections/DetailsSection";

import { Form } from "../ui/form";
import BasicSection from "./Sections/BasicSection";
import ContactSection from "./Sections/ContactSection";
import LocationSection from "./Sections/LocationSection";
import OpeningHours from "./Sections/OpeningHours";
import ImagesSection from "./Sections/ImagesSection";
import { transformOpeningHoursToObject } from "@/utils/transformOpeningHoursToObject";
import { initializeWeekDays } from "@/utils/openingHours";

const initialState = { message: null, errors: {} };

const PlaceForm = ({
  place = null,
  categories,
  topics,
  tags,
  provinces,
  cities,
  childAmenites,
}) => {
  const { confirm } = useConfirm();
  const { session } = useSession({
    required: true,
  });
  const form = useForm({
    defaultValues: {
      type: place?.type,
      categoryId: place?.categoryId,
      title: place?.title,
      slogan: place?.slogan,
      description: place?.description,
      googleMapUrl: place?.googleMapUrl,
      latitude: place?.latitude,
      longitude: place?.longitude,
      provinceId: place?.provinceId,
      cityId: place?.cityId,
      address: place?.address,
      phone: place?.phone,
      email: place?.email,
      website: place?.website,
      childFriendly: place?.childFriendly
        ? Number(place?.childFriendly).toString()
        : null,
      childAmenites: place?.childFriendlyAmenities
        ? Object.values(place?.childFriendlyAmenities).map((item) => item.id)
        : [],
      topics: place?.topics
        ? Object.values(place?.topics).map((item) => item.id)
        : [],
      tags: place?.tags
        ? Object.values(place?.tags).map((item) => item.id)
        : [],
      openingHours: place?.openingHours
        ? transformOpeningHoursToObject(place.openingHours)
        : initializeWeekDays(),
    },
  });

  const router = useRouter();
  const toast = useToast();

  const [mainPhotoPath, setMainPhotoPath] = useState(
    place?.mainPhotoPath ? place.mainPhotoPath : null
  );
  const [galleryImages, setGalleryImages] = useState(
    place?.photos ? place.photos : []
  );
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  //console.log(place.mainPhotoPath);

  useEffect(() => {
    console.log(mainPhotoPath);
  }, [mainPhotoPath]);

  const upsertPlace = place?.id
    ? updatePlace.bind(null, place.id)
    : insertPlace;
  const [state, dispatch] = useFormState(upsertPlace, initialState);

  const placeId = place?.id || null;

  const handleDelete = async () => {
    const isConfirmed = await confirm(
      "Are you sure you want to remove this attraction?"
    );

    if (isConfirmed) {
      setError(false);
      setIsLoading(true);

      try {
        const response = await fetch(`/api/place/${placeId}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error(`Server responded with status: ${response.status}`);
        }

        if (response.ok) {
          const message = await response.json();
          toast.success(message);
          router.replace("/");
        } else {
          const { error } = await response.json();
          setError(error);
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (state?.errors && state?.message) {
      toast.error(state.message);
    } else if (state?.message) {
      toast.success(state.message);
    }
  }, [state]);

  async function onSubmit(data) {
    const fileData = new FormData();

    if (mainPhotoPath) {
      fileData.append("file", mainPhotoPath);
    }

    if (galleryImages.length > 0) {
      galleryImages.forEach((image, index) => {
        fileData.append(
          `galleryImage${index}`,
          image.file ? image.file : image.url
        );
      });
    }

    dispatch({ ...data, fileData });
  }

  const handleGalleryImageChange = (event) => {
    const selectedFiles = event.target.files;

    if (selectedFiles) {
      const imagesArray = Array.from(selectedFiles).map((file) => ({
        url: URL.createObjectURL(file),
        file,
      }));

      setGalleryImages((prevImages) => [...prevImages, ...imagesArray]);
    }
  };

  const handleRemoveGalleryImage = (index) => {
    const updatedGallery = [...galleryImages];
    updatedGallery.splice(index, 1);
    setGalleryImages(updatedGallery);
  };

  return (
    <div className="w-full sm:max-w-3xl m-auto py-20 px-6">
      <h2 className="mb-5 text-center text-2xl font-semibold text-gray-800 md:text-4xl">
        {placeId ? "Aktualizuj atrakcję" : "Dodaj atrakcję"}
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Accordion type="single" collapsible defaultValue="item-1">
            <AccordionItem value="item-1" className="bg-white rounded-md">
              <AccordionTrigger className="px-5">
                Podstawowe informacje
              </AccordionTrigger>
              <AccordionContent className="border-t">
                <BasicSection
                  form={form}
                  state={state}
                  categories={categories}
                  placeDescription={place?.description}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion type="single" collapsible className="mt-5">
            <AccordionItem value="item-2" className="bg-white rounded-md">
              <AccordionTrigger className="px-5">Lokalizacja</AccordionTrigger>
              <AccordionContent className="border-t">
                <LocationSection
                  form={form}
                  state={state}
                  provinces={provinces}
                  cities={cities}
                  placeId={placeId}
                  categories={categories}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible className="mt-5">
            <AccordionItem value="item-3" className="bg-white rounded-md">
              <AccordionTrigger className="px-5">
                Informacje kontaktowe
              </AccordionTrigger>
              <AccordionContent className="border-t">
                <ContactSection form={form} state={state} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion
            type="single"
            collapsible
            defaultValue="item-4"
            className="mt-5"
          >
            <AccordionItem value="item-1" className="bg-white rounded-md">
              <AccordionTrigger className="px-5">
                Szczegóły atrakcji
              </AccordionTrigger>
              <AccordionContent className="border-t">
                <DetailsSection
                  form={form}
                  topics={topics}
                  tags={tags}
                  childAmenites={childAmenites}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion
            type="single"
            collapsible
            defaultValue="item-5"
            className="mt-5"
          >
            <AccordionItem value="item-1" className="bg-white rounded-md">
              <AccordionTrigger className="px-5">
                Godziny otwarcia
              </AccordionTrigger>
              <AccordionContent className="border-t">
                <OpeningHours form={form} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion
            type="single"
            collapsible
            defaultValue="item-6"
            className="my-5"
          >
            <AccordionItem value="item-1" className="bg-white rounded-md">
              <AccordionTrigger className="px-5 hover:no-underline group">
                <div className="flex items-center space-x-2">
                  <div className="group-hover:underline">Zdjęcia</div>
                  <span className="text-gray-500 text-xs italic font-normal hover:no-underline">
                    (Opcjonalne)
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="border-t">
                <ImagesSection
                  mainPhotoPath={mainPhotoPath}
                  onChangeMainPhotoPath={setMainPhotoPath}
                  galleryImages={galleryImages}
                  handleGalleryImageChange={handleGalleryImageChange}
                  handleRemoveGalleryImage={handleRemoveGalleryImage}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          {/* <div className="space-y-1">
            <Label htmlFor="image">Image</Label>
            <Input
              id="mainPhotoPath"
              name="mainPhotoPath"
              type="text"
              placeholder="https://URL-to-best-photo.com"
            />
          </div> */}
          <div
            className={`flex items-center gap-5 ${
              placeId ? "float-right" : ""
            }`}
          >
            {placeId && (
              <button
                onClick={handleDelete}
                type="button"
                className="text-red-500 font-bold text-xs uppercase"
              >
                Delete
              </button>
            )}
            <Button
              isLoading={isLoading}
              className={`${placeId ? "px-10" : "w-full"}`}
            >
              {placeId ? "Aktualizuj" : "Utwórz"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PlaceForm;
