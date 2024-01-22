import { useEffect, useState } from "react";
import { parseLatLngFromUrl } from "@/utils/parseLatLngFromUrl";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/PlaceManagement/Map"), {
  loading: () => <p>loading...</p>,
  ssr: false,
});

import { Button } from "@/components/ui/button";
import Input from "@/components/Input";
import Label from "@/components/Label";
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
import InputError from "@/components/InputError";

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
        <Label htmlFor="googleMapUrl">Google Maps URL</Label>
        <Input
          id="googleMapUrl"
          name="googleMapUrl"
          type="text"
          placeholder="https://goo.gl/maps/zrJXGuiUeER7vcJ1A"
          {...form.register("googleMapUrl")}
        />
        {state?.errors?.googleMapUrl &&
          state.errors.googleMapUrl.map((error) => (
            <InputError key={error} error={error} />
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
          <Label htmlFor="latitude">Latitude</Label>
          <Input
            id="latitude"
            name="latitude"
            type="text"
            {...form.register("latitude")}
            placeholder="50.452781171479266"
          />
        </div>
        <div className="w-1/2 space-y-2">
          <Label htmlFor="longitude">Longitude</Label>
          <Input
            id="longitude"
            name="longitude"
            type="text"
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
        <Label htmlFor="address">Adres</Label>
        <Input
          id="address"
          name="address"
          type="text"
          placeholder="ul. Polna 23/4"
          {...form.register("address")}
        />
      </div>
    </>
  );
};

export default LocationSection;
