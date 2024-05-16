import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import { Button } from "@/components/ui/button";
import Input from "@/components/Input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Map = dynamic(() => import("@/components/PlaceManagement/Map"), {
  loading: () => <p>loading...</p>,
  ssr: false,
});

import { parseLatLngFromUrl } from "@/utils/parseLatLngFromUrl";

import { Siren } from "lucide-react";

const LocationSection = ({
  form,
  state,
  provinces,
  cities,
  placeId,
  categories,
}) => {
  const [citiesOfProvince, setCitiesOfProvince] = useState([]);

  const watchCategoryIdField = form.watch("categoryId");
  const watchProvinceIdField = form.watch("provinceId");
  const watchGoogleMapUrlField = form.watch("googleMapUrl");
  const watchLatitudeField = form.watch("latitude");
  const watchLongitudeField = form.watch("longitude");

  const coordinates = {
    lat: watchLatitudeField,
    lng: watchLongitudeField,
  };

  useEffect(() => {
    if (watchProvinceIdField) {
      const filteredCities = cities.filter(
        (city) => city.provinceId === +watchProvinceIdField
      );
      setCitiesOfProvince(filteredCities);
      form.setValue("cityId", undefined);
    } else {
      setCitiesOfProvince([]);
    }
  }, [watchProvinceIdField]);

  useEffect(() => {
    if (watchGoogleMapUrlField) {
      const coordinates = parseLatLngFromUrl(watchGoogleMapUrlField);
      if (coordinates) {
        form.setValue("latitude", coordinates.lat);
        form.setValue("longitude", coordinates.lng);
      }
    }
  }, [watchGoogleMapUrlField]);

  const handleMarkerPositionChange = (latitude, longitude) => {
    form.setValue("latitude", latitude);
    form.setValue("longitude", longitude);
  };

  return (
    <>
      <div className="space-y-2 px-5 pt-4">
        <p className="flex items-center font-semibold text-gray-600">
          <svg
            className="w-4 h-4 mr-3 fill-yellow-500"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="100"
            height="100"
            viewBox="0 0 24 24"
          >
            <path d="M 11 0 L 11 3 L 13 3 L 13 0 L 11 0 z M 4.2226562 2.8085938 L 2.8085938 4.2226562 L 4.9296875 6.34375 L 6.34375 4.9296875 L 4.2226562 2.8085938 z M 19.777344 2.8085938 L 17.65625 4.9296875 L 19.070312 6.34375 L 21.191406 4.2226562 L 19.777344 2.8085938 z M 12 5 C 8.1456661 5 5 8.1456661 5 12 C 5 14.767788 6.6561188 17.102239 9 18.234375 L 9 21 C 9 22.093063 9.9069372 23 11 23 L 13 23 C 14.093063 23 15 22.093063 15 21 L 15 18.234375 C 17.343881 17.102239 19 14.767788 19 12 C 19 8.1456661 15.854334 5 12 5 z M 12 7 C 14.773666 7 17 9.2263339 17 12 C 17 14.184344 15.605334 16.022854 13.666016 16.708984 L 13 16.943359 L 13 21 L 11 21 L 11 16.943359 L 10.333984 16.708984 C 8.3946664 16.022854 7 14.184344 7 12 C 7 9.2263339 9.2263339 7 12 7 z M 0 11 L 0 13 L 3 13 L 3 11 L 0 11 z M 21 11 L 21 13 L 24 13 L 24 11 L 21 11 z M 4.9296875 17.65625 L 2.8085938 19.777344 L 4.2226562 21.191406 L 6.34375 19.070312 L 4.9296875 17.65625 z M 19.070312 17.65625 L 17.65625 19.070312 L 19.777344 21.191406 L 21.191406 19.777344 L 19.070312 17.65625 z"></path>
          </svg>
          Wskazówka
        </p>
        <ul className="ml-6 list-disc text-xs">
          <li className="text-gray-500 italic text-justify">
            <b>Automatyczne uzupełnienie lokalizacji:</b> Lokalizacja jest
            niezbędna dla każdego miejsca, wymagając podania szerokości i
            długości geograficznej. Możesz łatwo uzupełnić te dane
            automatycznie, wklejając link do danej atrakcji w Google Maps.
          </li>
          <li className="text-gray-500 italic text-justify">
            <b> Ręczne ustawienie pinezki:</b> Jeśli wolisz, możesz również
            kliknąć bezpośrednio na mapę, aby umieścić pinezkę. Następnie
            przesuń ją do żądanego miejsca, dokładnie określając lokalizację.
          </li>
        </ul>
      </div>

      <div className="space-y-2 px-5 pt-4">
        <Label
          htmlFor="googleMapUrl"
          className="text-sm font-semibold text-gray-600"
        >
          Google Maps URL
        </Label>
        <Input
          id="googleMapUrl"
          name="googleMapUrl"
          type="text"
          className="bg-gray-50"
          placeholder="https://goo.gl/maps/zrJXGuiUeER7vcJ1A"
          {...form.register("googleMapUrl")}
        />

        {state?.errors?.googleMapUrl &&
          state.errors.googleMapUrl.map((error) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
      <div className="px-5">
        <Map
          onMarkerPositionChange={handleMarkerPositionChange}
          coordinates={{
            lat: watchLatitudeField,
            lng: watchLongitudeField,
          }}
          category={watchCategoryIdField || null}
          placeId={placeId}
          categories={categories}
        />
      </div>
      <div className="flex items-center space-x-3 px-5 py-4">
        <div className="w-1/2 space-y-2">
          <Label
            htmlFor="latitude"
            className="text-sm font-semibold text-gray-600"
          >
            Szerokość *
          </Label>
          <Input
            id="latitude"
            name="latitude"
            type="text"
            className="bg-gray-50"
            {...form.register("latitude")}
            placeholder="50.452781171479266"
          />
        </div>
        <div className="w-1/2 space-y-2">
          <Label
            htmlFor="longitude"
            className="text-sm font-semibold text-gray-600"
          >
            Długość *
          </Label>
          <Input
            id="longitude"
            name="longitude"
            type="text"
            className="bg-gray-50"
            {...form.register("longitude")}
            placeholder="19.526675280239367"
          />
        </div>
      </div>
      <div className="px-5 pb-4">
        {state?.errors?.latitude &&
          state.errors.latitude.map((error) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
        {state?.errors?.longitude &&
          state.errors.longitude.map((error) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
      <div className="flex items-center space-x-3 px-5 py-4 border-t">
        <div className="w-1/2 space-y-2">
          {/* <Select
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
          </Select> */}

          <FormField
            control={form.control}
            name="provinceId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-gray-600">
                  Województwo
                </FormLabel>

                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-gray-50 text-gray-600 transition duration-300 focus:ring-1 focus:ring-green-500 focus:ring-offset-0">
                      <SelectValue placeholder="Wybierz województwo...">
                        {field.value ? provinces[field.value - 1].name : null}
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
        {citiesOfProvince.length > 0 && (
          <div className="w-1/2 space-y-2">
            <FormField
              control={form.control}
              name="cityId"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-sm font-semibold text-gray-600">
                    Wybierz miasto
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger
                      asChild
                      className="w-full bg-gray-50 text-gray-600 transition duration-300 focus:ring-1 focus:ring-green-500 focus:ring-offset-0"
                    >
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={`justify-between ${
                            !field.value && "text-muted-foreground"
                          }`}
                          //   className={
                          //     ("w-[200px] justify-between",
                          //     !field.value && "text-muted-foreground")
                          //   }
                        >
                          {field.value
                            ? citiesOfProvince.find(
                                (city) => city.id === field.value
                              )?.name
                            : "+ Wybierz miasto"}
                          {/* <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" /> */}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                      <Command>
                        <CommandInput
                          placeholder="Szukaj miasta.."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>Brak wyników.</CommandEmpty>
                          <CommandGroup>
                            {citiesOfProvince.map((city) => (
                              <CommandItem
                                value={city.name}
                                key={city.id}
                                onSelect={() => {
                                  form.setValue("cityId", city.id);
                                }}
                              >
                                {city.name}
                                {/* <CheckIcon
                                className={`ml-auto h-4 w-4 ${
                                  province.id === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                }`}
                              /> */}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}
      </div>
      <div className="space-y-2 border-t px-5 py-4">
        <Label
          htmlFor="address"
          className="text-sm font-semibold text-gray-600"
        >
          Adres
        </Label>

        <Input
          id="address"
          name="address"
          type="text"
          className="bg-gray-50"
          placeholder="ul. Polna 23/4"
          {...form.register("address")}
        />
      </div>
    </>
  );
};

export default LocationSection;
