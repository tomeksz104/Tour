"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import useConfirm from "@/hooks/useConfirm";
import { useForm } from "react-hook-form";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";

import { Button as ButtonShadcn } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DetailsSection } from "./Sections/DetailsSection";
import { Form } from "../ui/form";
import BasicSection from "./Sections/BasicSection";
import ContactSection from "./Sections/ContactSection";
import LocationSection from "./Sections/LocationSection";
import OpeningHours from "./Sections/OpeningHours";
import ImagesSection from "./Sections/ImagesSection";
import SocialMediaSection from "./Sections/SocialMediaSection";

import { transformOpeningHoursToObject } from "@/utils/transformOpeningHoursToObject";
import { initializeWeekDays } from "@/utils/openingHours";

import {
  createPlace,
  deletePlace,
  updatePlace,
} from "@/actions/menage/placeActions";

import { RotateCw } from "lucide-react";

const initialState = { message: null, errors: {} };

const PlaceForm = ({
  place = null,
  categories,
  topics,
  tags,
  provinces,
  cities,
  childAmenites,
  amenities,
  socialMediaPlatforms,
}) => {
  const { confirm } = useConfirm();
  useSession({
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
      amenities: place?.amenities
        ? Object.values(place?.amenities).map((item) => item.id)
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
      socialMediaLinks:
        place?.socialMedia?.map((social) => ({
          link: social.link,
          platformId: social.platformId,
        })) || [],
    },
  });

  const [mainPhotoPath, setMainPhotoPath] = useState(
    place?.mainPhotoPath ? place.mainPhotoPath : null
  );
  const [galleryImages, setGalleryImages] = useState(
    place?.photos ? place.photos : []
  );
  const [isLoading, setIsLoading] = useState(false);

  const upsertPlace = place?.id
    ? updatePlace.bind(null, place.id)
    : createPlace;
  const [state, dispatch] = useFormState(upsertPlace, initialState);

  const placeId = place?.id || null;

  useEffect(() => {
    if (state.success === true) {
      setIsLoading(false);
      toast.success(state.message);
    } else if (state.success === false) {
      setIsLoading(false);

      toast.error(state.message);
    }
  }, [state]);

  const handleDeletePlace = async () => {
    const isConfirmed = await confirm("Czy na pewno chcesz usunąć te miejsce?");

    if (isConfirmed) {
      try {
        const result = await deletePlace(placeId);
        if (result.success === true) {
          toast.success(result.message);
        } else if (result.success === false) {
          toast.error(result.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  async function handleSubmit(data) {
    setIsLoading(true);
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
    console.log(data);

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
      {state?.errors && Object.keys(state.errors).length > 0 && (
        <div className="pb-5">
          <p>Popraw następujące błedy:</p>
          <ul className="list-disc">
            {Object.keys(state.errors).map(function (key) {
              return (
                <li value={key} className="ml-8 mt-2 text-sm text-red-500">
                  {state.errors[key]}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
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
              <AccordionTrigger className="px-5 hover:no-underline group">
                <div className="flex items-center space-x-2">
                  <div className="group-hover:underline">
                    Informacje kontaktowe
                  </div>
                  <span className="text-gray-500 text-xs italic font-normal hover:no-underline">
                    (Opcjonalne)
                  </span>
                </div>
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
              <AccordionTrigger className="px-5 hover:no-underline group">
                <div className="flex items-center space-x-2">
                  <div className="group-hover:underline">
                    Szczegóły atrakcjia
                  </div>
                  <span className="text-gray-500 text-xs italic font-normal hover:no-underline">
                    (Opcjonalne)
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="border-t">
                <DetailsSection
                  form={form}
                  topics={topics}
                  tags={tags}
                  childAmenites={childAmenites}
                  amenities={amenities}
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
              <AccordionTrigger className="px-5 hover:no-underline group">
                <div className="flex items-center space-x-2">
                  <div className="group-hover:underline">Godziny otwarcia</div>
                  <span className="text-gray-500 text-xs italic font-normal hover:no-underline">
                    (Opcjonalne)
                  </span>
                </div>
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

          <Accordion
            type="single"
            collapsible
            defaultValue="item-6"
            className="my-5"
          >
            <AccordionItem value="item-1" className="bg-white rounded-md">
              <AccordionTrigger className="px-5 hover:no-underline group">
                <div className="flex items-center space-x-2">
                  <div className="group-hover:underline">Social Media</div>
                  <span className="text-gray-500 text-xs italic font-normal hover:no-underline">
                    (Opcjonalne)
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="border-t">
                <SocialMediaSection
                  form={form}
                  socialMediaPlatforms={socialMediaPlatforms}
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
              <ButtonShadcn
                onClick={handleDeletePlace}
                variant="link"
                type="button"
                className="text-red-500 hover:text-red-600 font-semibold"
              >
                Usuń to miejsce
              </ButtonShadcn>
            )}
            <ButtonShadcn
              disabled={isLoading}
              className={`text-center bg-green-500 rounded-full w-auto text-base font-semibold relative 
              flex h-11 items-center justify-center before:absolute before:inset-0 before:rounded-full before:bg-green-500 before:transition before:duration-300 hover:bg-green-500 hover:before:scale-105 active:duration-75 active:before:scale-95
              ${placeId ? "px-10" : "w-full"}
              `}
            >
              {isLoading && (
                <RotateCw className="absolute mr-2 h-4 w-4 animate-spin" />
              )}
              <span
                class={`relative px-10 font-semibold ${
                  isLoading && "invisible"
                }`}
              >
                {placeId ? "Aktualizuj" : "Utwórz"}
              </span>
            </ButtonShadcn>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PlaceForm;
