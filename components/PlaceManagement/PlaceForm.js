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

import { PlaceType as placeTypes } from "@prisma/client";

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
                <div className="space-y-2 px-5 py-4">
                  <Label htmlFor="type">Typ miejsca: </Label>
                  <span className="block text-xs text-gray-500 italic">
                    Na podstawie Twojego wyboru, pojawią się dodatkowe opcje i
                    pola do wypełnienia, dostosowane do charakterystyki wybranej
                    kategorii atrakcji.
                  </span>

                  <Select name="type">
                    <SelectTrigger
                      id="type"
                      name="type"
                      className="w-1/2 bg-gray-50 text-gray-600 transition duration-300
                    focus:ring-1 focus:ring-green-500 focus:ring-offset-0"
                    >
                      <SelectValue placeholder="Wybierz typ miejsca..." />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(placeTypes).map((key) => (
                        <SelectItem key={key} value={placeTypes[key]}>
                          {placeTypes[key]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {state.errors?.type &&
                    state.errors.type.map((error) => (
                      <InputError key={error} error={error} />
                    ))}

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a verified email to display" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="m@example.com">
                              m@example.com
                            </SelectItem>
                            <SelectItem value="m@google.com">
                              m@google.com
                            </SelectItem>
                            <SelectItem value="m@support.com">
                              m@support.com
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          You can manage email addresses in your{" "}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-2 border-t px-5 py-4">
                  <Label htmlFor="categoryId">Kategoria</Label>
                  <Select onValueChange={setCategory} value={category}>
                    <SelectTrigger
                      className="w-full bg-gray-50 text-gray-600 transition duration-300
                    focus:ring-1 focus:ring-green-500 focus:ring-offset-0"
                    >
                      <SelectValue
                        placeholder="Wybierz kategorię..."
                        aria-label={category}
                      >
                        {category && categories[category - 1].name}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {state.errors?.categoryId &&
                    state.errors.categoryId.map((error) => (
                      <InputError key={error} error={error} />
                    ))}
                </div>

                <div className="space-y-2 border-t px-5 py-4">
                  <Label htmlFor="title">Nazwa atrakcji</Label>
                  <span className="block text-xs text-gray-500 italic">
                    Podaj pełną nazwę atrakcji.
                  </span>
                  <Input
                    id="title"
                    name="title"
                    type="text"
                    placeholder="Zamek Ogrodzieniec"
                    {...form.register("title")}
                  />

                  {state.errors?.title &&
                    state.errors.title.map((error) => (
                      <InputError key={error} error={error} />
                    ))}
                </div>

                <div className="space-y-2 border-t px-5 py-4">
                  <Label htmlFor="slogan">Slogan</Label>
                  <span className="block text-xs text-gray-500 italic">
                    Dodaj slogan najlepiej opisujący atrakcję.
                  </span>

                  <Input
                    id="slogan"
                    name="slogan"
                    type="text"
                    placeholder="IX Wieków Tajemnic"
                  />
                </div>
                <div className="space-y-2 border-t px-5 py-4">
                  <Label htmlFor="description">Opis atrakcji</Label>
                  <span className="block text-xs text-gray-500 italic">
                    Wpisz unikalny opis atrakcji. Twoje osobiste spostrzeżenia i
                    oryginalne sformułowania pomogą wyróżnić to miejsce i
                    przyciągnąć większą uwagę odwiedzających. Wymień główne
                    udogodnienia i unikalne cechy, które wyróżniają to miejsce.
                  </span>
                  <span className="block text-xs italic text-red-500">
                    Pamiętaj, że skopiowane opisy z innych stron mogą naruszać
                    prawa autorskie i nie będą akceptowane.
                  </span>
                  <textarea
                    className="outline-none bg-gray-50 w-full rounded-md border border-gray-200 py-2.5 px-4 text-sm text-gray-600 transition duration-300 focus:ring-1 focus:ring-green-500"
                    id="description"
                    name="description"
                    rows="5"
                    placeholder="Odkryj niepowtarzalne piękno i historię Tajemniczego Zamku Królewskiego, perły architektonicznej w sercu malowniczego krajobrazu. Ten majestatyczny zamek z XI wieku oferuje fascynującą podróż przez wieki, ujawniając tajemnice dawnych władców."
                  ></textarea>
                </div>
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
