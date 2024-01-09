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

const Map = dynamic(() => import("@/components/PlaceManagement/Map"), {
  loading: () => <p>loading...</p>,
  ssr: false,
});

import { useSession } from "next-auth/react";
import { upsertPlace } from "@/actions/upsertPlace";
import InputError from "../InputError";
import { CitiesCombobox } from "./Sections/CitiesCombobox";
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

const initialState = { message: null, errors: {} };

const PlaceForm = ({ place = null, categories, topics, provinces, cities }) => {
  const { session } = useSession({
    required: true,
  });

  const form = useForm({
    defaultValues: {
      items: ["recents", "home"],
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
                <div className="space-y-2 px-5 pt-4">
                  <Label htmlFor="googleMapUrl">Google Maps URL</Label>
                  <Input
                    id="googleMapUrl"
                    name="googleMapUrl"
                    type="text"
                    placeholder="https://goo.gl/maps/zrJXGuiUeER7vcJ1A"
                    onChange={(event) => setGoogleMapUrl(event.target.value)}
                  />
                  {state.errors?.googleMapUrl &&
                    state.errors.googleMapUrl.map((error) => (
                      <InputError key={error} error={error} />
                    ))}
                </div>
                <div className="px-5">
                  <Map
                    onMarkerPositionChange={handleMarkerPositionChange}
                    onMarkerPositionMove={handleMarkerPositionChange}
                    coordinates={coordinates}
                    category={category}
                    placeId={placeId}
                  />
                </div>

                <div className="flex items-center space-x-3 px-5 py-4">
                  <div className="w-1/2 space-y-2">
                    <Label htmlFor="latitude">Latitude</Label>
                    <Input
                      id="latitude"
                      name="latitude"
                      type="number"
                      value={coordinates.latitude ?? ""}
                      onChange={(event) =>
                        setCoordinates({
                          ...coordinates,
                          latitude: event.target.value,
                        })
                      }
                      placeholder="50.452781171479266"
                    />
                  </div>
                  <div className="w-1/2 space-y-2">
                    <Label htmlFor="longitude">Longitude</Label>
                    <Input
                      id="longitude"
                      name="longitude"
                      type="number"
                      value={coordinates.longitude ?? ""}
                      onChange={(event) =>
                        setCoordinates({
                          ...coordinates,
                          longitude: event.target.value,
                        })
                      }
                      placeholder="19.526675280239367"
                    />
                  </div>
                </div>
                <div className="px-5 pb-4">
                  {state.errors?.latitude &&
                    state.errors.latitude.map((error) => (
                      <InputError key={error} error={error} />
                    ))}
                  {state.errors?.longitude &&
                    state.errors.longitude.map((error) => (
                      <InputError key={error} error={error} />
                    ))}
                </div>

                <div className="flex items-center space-x-3 px-5 py-4 border-t">
                  <div className="w-1/2 space-y-2">
                    <Label htmlFor="category">Województwo</Label>

                    <Select
                      name="provinceId"
                      value={province}
                      onValueChange={setProvince}
                    >
                      <SelectTrigger
                        id="provinceId"
                        name="provinceId"
                        className="w-full bg-gray-50 text-gray-600 transition duration-300
                    focus:ring-1 focus:ring-green-500 focus:ring-offset-0"
                      >
                        <SelectValue
                          placeholder="Wybierz województwo..."
                          aria-label={province}
                        >
                          {province && provinces[province - 1].name}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {provinces.map((province) => (
                          <SelectItem key={province.id} value={province.id}>
                            {province.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {citiesOfProvince.length > 0 && (
                    <div className="w-1/2 space-y-2">
                      <Label htmlFor="category">Wybierz miasto</Label>

                      <CitiesCombobox
                        cities={citiesOfProvince}
                        onChangeCity={handleChangeCity}
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-2 border-t px-5 py-4">
                  <Label htmlFor="address">Adres</Label>
                  <Input
                    id="address"
                    name="address"
                    type="text"
                    placeholder="ul. Polna 23/4"
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion type="single" collapsible className="mt-5">
            <AccordionItem value="item-3" className="bg-white rounded-md">
              <AccordionTrigger className="px-5">
                Informacje kontaktowe
              </AccordionTrigger>
              <AccordionContent className="border-t">
                <div className="space-y-2 border-t px-5 py-4">
                  <Label htmlFor="phone">Numer telefonu</Label>
                  <span className="block text-xs text-gray-500 italic">
                    Podaj numer telefonu bezpośrednio do atrakcji.
                  </span>
                  <Input
                    id="phone"
                    name="phone"
                    type="text"
                    placeholder="+48 601 123 123"
                  />
                </div>

                <div className="space-y-2 border-t px-5 py-4">
                  <Label htmlFor="email">Email</Label>
                  <span className="block text-xs text-gray-500 italic">
                    Podaj adres email do atrakcji.
                  </span>

                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="jan.kowalski@email.com"
                  />
                </div>

                <div className="space-y-2 border-t px-5 py-4">
                  <Label htmlFor="website">Strona internetowa</Label>
                  <span className="block text-xs text-gray-500 italic">
                    Podaj stronę internetową do atrakcji.
                  </span>
                  <Input
                    id="website"
                    name="website"
                    type="text"
                    placeholder="www.adres-strony.pl"
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion
            type="single"
            collapsible
            defaultValue="item-1"
            className="mt-5"
          >
            <AccordionItem value="item-1" className="bg-white rounded-md">
              <AccordionTrigger className="px-5">
                Szczegóły atrakcji
              </AccordionTrigger>
              <AccordionContent className="border-t">
                <div className="space-y-2 px-5 py-4">
                  <Label htmlFor="type">Typ miejsca: </Label>
                  <span className="block text-xs text-gray-500 italic">
                    Na podstawie Twojego wyboru, pojawią się dodatkowe opcje i
                    pola do wypełnienia, dostosowane do charakterystyki wybranej
                    kategorii atrakcji.
                  </span>
                </div>
                <DetailsSection form={form} />
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
