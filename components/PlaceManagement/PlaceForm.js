"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/useToast";
import useConfirm from "@/hooks/useConfirm";
import { useFormState } from "react-dom";

import Input from "../Input";
import Label from "../Label";
import Button from "../Button";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useSession } from "next-auth/react";
import { upsertPlace } from "@/actions/upsertPlace";
import InputError from "../InputError";
import { parseLatLngFromUrl } from "@/utils/parseLatLngFromUrl";

import { DetailsSection, FormSchema } from "./Sections/DetailsSection";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "../ui/form";
import BasicSection from "./Sections/BasicSection";
import ContactSection from "./Sections/ContactSection";
import LocationSection from "./Sections/LocationSection";
import OpeningHours from "./Sections/OpeningHours";

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
  const { session } = useSession({
    required: true,
  });

  const form = useForm({
    defaultValues: {
      childAmenites: [],
      topics: [],
      tags: [],
    },
  });

  const router = useRouter();
  const toast = useToast();
  const { confirm } = useConfirm();

  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [citiesOfProvince, setCitiesOfProvince] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [category, setCategory] = useState("");
  const [googleMapUrl, setGoogleMapUrl] = useState("");

  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const upsertPlaceWithData = upsertPlace.bind(null, city, category, province);
  const [state, dispatch] = useFormState(upsertPlace, initialState);

  const placeId = place?._id || null;

  useEffect(() => {
    if (province) {
      const filteredCities = cities.filter(
        (city) => city.provinceId === +province
      );
      setCitiesOfProvince(filteredCities);
    } else {
      setCitiesOfProvince([]);
    }
  }, [province]);

  useEffect(() => {
    const coordinates = parseLatLngFromUrl(googleMapUrl);
    if (coordinates) {
      setCoordinates({
        latitude: coordinates.lat,
        longitude: coordinates.lng,
      });
    }
  }, [googleMapUrl]);

  const handleMarkerPositionChange = (latitude, longitude) => {
    setCoordinates({ latitude, longitude });
  };

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

  const handleChangeCity = (cityId) => {
    setCity(cityId);
  };

  function onSubmit(data) {
    console.log(data);
    dispatch(data);
    //upsertPlaceWithData(data);
  }

  return (
    <div className="w-full sm:max-w-3xl m-auto py-20 px-6">
      <h2 className="mb-5 text-center text-2xl font-semibold text-gray-800 md:text-4xl">
        {placeId ? "Update the place" : "Dodaj atrakcję"}
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
                <ContactSection form={form} />
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

          <div className="space-y-1">
            <Label htmlFor="image">Image</Label>
            <Input
              id="mainPhotoPath"
              name="mainPhotoPath"
              type="text"
              placeholder="https://URL-to-best-photo.com"
            />
          </div>

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
              {placeId ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PlaceForm;
