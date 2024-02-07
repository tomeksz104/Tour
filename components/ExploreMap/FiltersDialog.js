import { use, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

import {
  Baby,
  Bed,
  Check,
  ChevronsUpDown,
  FerrisWheel,
  PersonStanding,
  Soup,
} from "lucide-react";

import { PlaceType as placeTypes } from "@prisma/client";
import { cn } from "@/lib/utils";

const placeTypeIcons = {
  Atrakcja: <FerrisWheel size={16} />,
  Nocleg: <Bed size={16} />,
  Jedzenie: <Soup size={16} />,
};

const FiltersDialog = ({ isOpen, onClose }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [locationTab, setLocationTab] = useState("region");
  const [citiesComboboxOpen, setCitiesComboboxOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [topics, setTopics] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [citiesOfProvince, setCitiesOfProvince] = useState([]);
  const [childAmenities, setChildAmenities] = useState([]);

  const placeTypesParamsValue = searchParams.getAll("placeType");
  const categoryParamsValue = searchParams.getAll("category");
  const provinceParamsValue = searchParams.get("province");
  const cityParamsValue = searchParams.get("city");
  const nearMeParamsValue = searchParams.get("nearMe");
  const nearMeDistanceParamsValue = searchParams.get("nearMeDistance");
  const familyFriendlyParamsValue = searchParams.get("familyFriendly");
  const tagParamsValue = searchParams.getAll("tag");
  const topicParamsValue = searchParams.getAll("topic");
  const childAmienityParamsValue = searchParams.getAll("childAmenity");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/filters", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const filtersData = await response.json();

        setCategories(filtersData.categories);
        setTags(filtersData.tags);
        setTopics(filtersData.topics);
        setProvinces(filtersData.provinces);
        setCities(filtersData.cities);
        setChildAmenities(filtersData.childAmenities);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChangeNearMe = (value) => {
    const currentParams = new URLSearchParams(searchParams);

    if (nearMeParamsValue === "true") {
      currentParams.set("nearMe", false);
    } else {
      currentParams.set("nearMe", true);
    }

    if (!currentParams.has("nearMeDistance")) {
      currentParams.set("nearMeDistance", 30);
    }

    router.replace(`${pathname}?${currentParams.toString()}`, undefined, {
      shallow: true,
    });
  };

  const handleChangeNearMeDistance = (distance) => {
    const currentParams = new URLSearchParams(searchParams);

    currentParams.set("nearMeDistance", distance);

    router.replace(`${pathname}?${currentParams.toString()}`, undefined, {
      shallow: true,
    });
  };

  const handleChangeFamilyFriendly = (value) => {
    const currentParams = new URLSearchParams(searchParams);

    if (familyFriendlyParamsValue === value.toString()) {
      currentParams.delete("familyFriendly");
    } else {
      currentParams.set("familyFriendly", value);
    }

    router.replace(`${pathname}?${currentParams.toString()}`, undefined, {
      shallow: true,
    });
  };

  const handleChangePlaceType = (type) => {
    const currentParams = new URLSearchParams(searchParams);

    if (placeTypesParamsValue.includes(type)) {
      const filteredCategories = placeTypesParamsValue.filter(
        (cat) => cat !== type
      );

      currentParams.delete("placeType");
      filteredCategories.forEach((type) => {
        currentParams.append("placeType", type);
      });
    } else {
      currentParams.append("placeType", type);
    }

    router.replace(`${pathname}?${currentParams.toString()}`, undefined, {
      shallow: true,
    });
  };

  const handleChangeCategory = (category) => {
    const currentParams = new URLSearchParams(searchParams);

    if (categoryParamsValue.includes(category.toString())) {
      const filteredCategories = categoryParamsValue.filter(
        (cat) => cat !== category.toString()
      );

      currentParams.delete("category");
      filteredCategories.forEach((category) => {
        currentParams.append("category", category);
      });
    } else {
      currentParams.append("category", category);
    }

    router.replace(`${pathname}?${currentParams.toString()}`, undefined, {
      shallow: true,
    });
  };

  const handleChangeTag = (tag) => {
    const currentParams = new URLSearchParams(searchParams);

    if (tagParamsValue.includes(tag.toString())) {
      const filteredTags = tagParamsValue.filter(
        (val) => val !== tag.toString()
      );

      currentParams.delete("tag");
      filteredTags.forEach((tag) => {
        currentParams.append("tag", tag);
      });
    } else {
      currentParams.append("tag", tag);
    }

    router.replace(`${pathname}?${currentParams.toString()}`, undefined, {
      shallow: true,
    });
  };

  const handleChangeTopic = (topic) => {
    const currentParams = new URLSearchParams(searchParams);

    if (topicParamsValue.includes(topic.toString())) {
      const filteredTopics = topicParamsValue.filter(
        (val) => val !== topic.toString()
      );

      currentParams.delete("topic");
      filteredTopics.forEach((topic) => {
        currentParams.append("topic", topic);
      });
    } else {
      currentParams.append("topic", topic);
    }

    router.replace(`${pathname}?${currentParams.toString()}`, undefined, {
      shallow: true,
    });
  };

  const handleChangeChildAmenity = (amenity) => {
    const currentParams = new URLSearchParams(searchParams);

    if (childAmienityParamsValue.includes(amenity.toString())) {
      const filteredAmenities = childAmienityParamsValue.filter(
        (val) => val !== amenity.toString()
      );

      currentParams.delete("childAmenity");
      filteredAmenities.forEach((amenity) => {
        currentParams.append("childAmenity", amenity);
      });
    } else {
      currentParams.append("childAmenity", amenity);
    }

    router.replace(`${pathname}?${currentParams.toString()}`, undefined, {
      shallow: true,
    });
  };

  const handleChangeProvince = (province) => {
    const currentParams = new URLSearchParams(searchParams);

    currentParams.set("province", province);

    if (province) {
      const filteredCities = cities.filter(
        (city) => city.provinceId === +province
      );
      setCitiesOfProvince(filteredCities);
    } else {
      setCitiesOfProvince([]);
    }

    if (selectedCity) setSelectedCity("");

    router.replace(`${pathname}?${currentParams.toString()}`, undefined, {
      shallow: true,
    });
  };

  const handleChangeCity = (city) => {
    const currentParams = new URLSearchParams(searchParams);

    currentParams.set("city", city);
    setSelectedCity(city);
    setCitiesComboboxOpen(false);

    router.replace(`${pathname}?${currentParams.toString()}`, undefined, {
      shallow: true,
    });
  };

  const removeNearMeParams = () => {
    const currentParams = new URLSearchParams(searchParams);

    if (nearMeParamsValue) currentParams.delete("nearMe");
    if (nearMeDistanceParamsValue) currentParams.delete("nearMeDistance");

    router.replace(`${pathname}?${currentParams.toString()}`, undefined, {
      shallow: true,
    });
  };

  const removeRegionParams = () => {
    const currentParams = new URLSearchParams(searchParams);

    if (provinceParamsValue) currentParams.delete("province");
    if (cityParamsValue) currentParams.delete("city");
    setSelectedCity("");
    setCitiesOfProvince([]);

    router.replace(`${pathname}?${currentParams.toString()}`, undefined, {
      shallow: true,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90%] overflow-hidden px-0">
        <DialogHeader className="px-6">
          <DialogTitle className="text-xl tracking-normal">
            Filtruj swoje wyniki
          </DialogTitle>
          <DialogDescription>
            Dostosuj swoje wyszukiwanie, korzystając z dostępnych filtrów, aby
            znaleźć miejsca idealnie odpowiadające Twoim potrzebom.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-scroll px-6 py-6 space-y-10">
          <div className="space-y-3">
            <RadioGroup
              defaultValue="comfortable"
              className="grid grid-cols-3 gap-2"
            >
              {Object.keys(placeTypes).map((key) => (
                <Label
                  key={key}
                  onClick={() => {
                    handleChangePlaceType(placeTypes[key]);
                  }}
                  htmlFor={placeTypes[key]}
                  className={`relative flex items-center border rounded-md p-3 space-x-2 cursor-pointer ${
                    placeTypesParamsValue.includes(placeTypes[key])
                      ? "border-green-600"
                      : "hover:border-gray-500"
                  }`}
                >
                  {placeTypeIcons[key]}
                  <div className="flex-1 flex justify-center">
                    <span htmlFor={placeTypes[key]} className="text-center">
                      {placeTypes[key]}
                    </span>
                  </div>
                </Label>
              ))}
            </RadioGroup>
            <div className="flex flex-wrap justify-center mx-auto gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  onClick={() => {
                    handleChangeCategory(category.id);
                  }}
                  variant="outline"
                  className={`h-8 rounded-full hover:bg-white hover:border-gray-500 text-xs px-3 ${
                    categoryParamsValue.includes(category.id.toString()) &&
                    "border-gray-500"
                  }`}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>

          <Tabs
            onValueChange={(tab) => {
              setLocationTab(tab);
              if (tab === "locally") removeRegionParams();
              if (tab === "region") removeNearMeParams();
            }}
            defaultValue={locationTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 p-0 bg-white space-x-2">
              <TabsTrigger
                value="region"
                className={`relative flex items-center border rounded-md p-3 space-x-2 ${
                  locationTab === "region" && "border-gray-500"
                }`}
              >
                Wybór Regionu
              </TabsTrigger>
              <TabsTrigger
                value="locally"
                className={`relative flex items-center border rounded-md p-3 space-x-2 ${
                  locationTab === "locally" && "border-gray-500"
                }`}
              >
                Wyszukiwanie Lokalne
              </TabsTrigger>
            </TabsList>
            <TabsContent value="region">
              <Card>
                <CardHeader>
                  <CardTitle>Wybór Regionu</CardTitle>
                  <CardDescription>
                    Wybierz województwo oraz miasto w którym chciałbyś znaleźć
                    miejsca
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="grid grid-cols-2 items-center space-x-3">
                    <div className="space-y-2">
                      <Label
                        htmlFor="province"
                        className="font-normal text-gray-500"
                      >
                        Województwo
                      </Label>
                      <Select onValueChange={handleChangeProvince}>
                        <SelectTrigger id="province" className="w-full">
                          <SelectValue placeholder="Wybierz województwo" />
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
                      <div className="space-y-2">
                        <Label
                          htmlFor="city"
                          className="font-normal text-gray-500"
                        >
                          Miasto
                        </Label>
                        <Popover
                          open={citiesComboboxOpen}
                          onOpenChange={setCitiesComboboxOpen}
                        >
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={open}
                              className="w-full justify-between"
                            >
                              {selectedCity
                                ? citiesOfProvince.find(
                                    (city) => city.id === selectedCity
                                  )?.name
                                : "+ Wybierz miasto"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-full p-0">
                            <Command>
                              <CommandInput placeholder="Szukaj miasta..." />
                              <CommandList>
                                <CommandEmpty>Brak wyników.</CommandEmpty>
                                <CommandGroup>
                                  {citiesOfProvince.map((city) => (
                                    <CommandItem
                                      key={city.id}
                                      value={city.id}
                                      onSelect={() => {
                                        handleChangeCity(city.id);
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          selectedCity === city.id
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                      {city.name}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="locally">
              <Card>
                <CardHeader>
                  <CardTitle className="flex">
                    Wyszukiwanie Lokalne{" "}
                    <span className="text-sm text-green-600 font-semibold ml-auto">
                      {nearMeDistanceParamsValue &&
                        `${nearMeDistanceParamsValue} km`}
                    </span>
                  </CardTitle>
                  <CardDescription>
                    Dostosuj odległość od swojej lokalizacji w której chciałbyś
                    znaleźć miejsca
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-2">
                    <Slider
                      onValueChange={handleChangeNearMeDistance}
                      defaultValue={[nearMeDistanceParamsValue]}
                      max={250}
                      step={1}
                    />
                    <div className="flex justify-between text-gray-500">
                      <span className="text-xs tracking-tight">0 km</span>
                      <span className="text-xs tracking-tight">250 km</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <RadioGroup
            defaultValue="comfortable"
            className="grid grid-cols-2 gap-2"
          >
            <Label
              onClick={() => {
                handleChangeFamilyFriendly(true);
              }}
              htmlFor="r1"
              className={`relative flex items-center border rounded-md p-3 space-x-2 cursor-pointer ${
                familyFriendlyParamsValue === "true"
                  ? "border-green-600"
                  : "hover:border-gray-500"
              }`}
            >
              <RadioGroupItem value="true" id="r1" className="peer hidden" />
              <div className="flex-1 flex justify-center">
                <span htmlFor="r1" className="text-center">
                  Z dziećmi
                </span>
              </div>
              <Baby size={16} className="absolute left-8" />
            </Label>

            <Label
              onClick={() => {
                handleChangeFamilyFriendly(false);
              }}
              htmlFor="r2"
              className={`relative flex items-center border rounded-md p-3 space-x-2 cursor-pointer ${
                familyFriendlyParamsValue === "false"
                  ? "border-green-600"
                  : "hover:border-gray-500"
              }`}
            >
              <RadioGroupItem value="false" id="r2" className="peer hidden" />
              <div className="flex-1 flex justify-center">
                <span htmlFor="r2" className="text-center">
                  Bez dzieci
                </span>
              </div>
              <PersonStanding size={16} className="absolute left-8" />
            </Label>
          </RadioGroup>

          <div className="space-y-2">
            <Label className="text-xl">Tagi</Label>
            <div className="flex flex-wrap text-gray-500">
              {tags.map((tag) => (
                <div
                  key={tag.id}
                  className="flex flex-row items-start space-x-3 space-y-0 py-2 w-1/2"
                >
                  <Checkbox
                    id={tag.name}
                    checked={tagParamsValue.includes(tag.id.toString())}
                    onCheckedChange={() => {
                      handleChangeTag(tag.id);
                    }}
                  />
                  <Label htmlFor={tag.name}>{tag.name}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-xl">Tematyka</Label>
            <div className="flex flex-wrap text-gray-500">
              {topics.map((topic) => (
                <div
                  key={topic.id}
                  className="flex flex-row items-start space-x-3 space-y-0 py-2 w-1/2"
                >
                  <Checkbox
                    id={topic.name}
                    checked={topicParamsValue.includes(topic.id.toString())}
                    onCheckedChange={() => {
                      handleChangeTopic(topic.id);
                    }}
                  />
                  <Label htmlFor={topic.name}>{topic.name}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-xl">Udogodnienia dla dzieci</Label>
            <div className="flex flex-wrap text-gray-500">
              {childAmenities.map((amenity) => (
                <div
                  key={amenity.id}
                  className="flex flex-row items-start space-x-3 space-y-0 py-2 w-1/2"
                >
                  <Checkbox
                    id={amenity.name}
                    checked={childAmienityParamsValue.includes(
                      amenity.id.toString()
                    )}
                    onCheckedChange={() => {
                      handleChangeChildAmenity(amenity.id);
                    }}
                  />
                  <Label htmlFor={amenity.name}>{amenity.name}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="px-6">
          <Button
            onClick={() => {
              router.replace("/map", undefined, { shallow: true });
            }}
            variant="link"
          >
            Zresetuj filtry
          </Button>
          <Button>Zakończ</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FiltersDialog;
