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

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";

const FiltersDialog = ({ isOpen, onClose }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [visibleCategoriesCount, setVisibleCategoriesCount] = useState(8);
  const [citiesComboboxOpen, setCitiesComboboxOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const [categories, setCategories] = useState([]);

  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [citiesOfProvince, setCitiesOfProvince] = useState([]);

  const categoryParamsValue = searchParams.getAll("category");
  const provinceParamsValue = searchParams.get("province");
  const cityParamsValue = searchParams.get("city");

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

        setProvinces(filtersData.provinces);
        setCities(filtersData.cities);

        if (provinceParamsValue !== null) {
          const filteredCities = filtersData.cities.filter(
            (city) => city.provinceId === +provinceParamsValue
          );

          setCitiesOfProvince(filteredCities);
        }
        if (cityParamsValue !== null) setSelectedCity(+cityParamsValue);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

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

  const handleChangeProvince = (province) => {
    const currentParams = new URLSearchParams(searchParams);

    currentParams.set("province", province);

    if (province) {
      const filteredCities = cities.filter(
        (city) => city.provinceId === +province
      );
      currentParams.delete("city");

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90%] overflow-hidden px-0">
        <DialogHeader className="px-6">
          <DialogTitle className="text-2xl tracking-normal">
            Filtruj swoje wyniki
          </DialogTitle>
          <DialogDescription>
            Dostosuj swoje wyszukiwanie, korzystając z dostępnych filtrów, aby
            znaleźć miejsca idealnie odpowiadające Twoim potrzebom.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-scroll px-6 py-6 space-y-10">
          <div className="space-y-3">
            <Label className="text-xl">Wybór kategorii</Label>
            <div className="relative flex flex-wrap gap-2">
              {categories.slice(0, visibleCategoriesCount).map((category) => (
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
              {categories.length > visibleCategoriesCount && (
                <Button
                  onClick={() => setVisibleCategoriesCount(categories.length)}
                  variant="link"
                  className="h-8 text-xs px-3 ml-auto"
                >
                  Pokaż więcej...
                </Button>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-xl">Lokalizacja atrakcji</Label>

            <div className="grid grid-cols-2 items-center space-x-3">
              <div className="space-y-2">
                <Label htmlFor="province" className="font-normal text-gray-500">
                  Województwo
                </Label>
                <Select
                  value={provinceParamsValue ? +provinceParamsValue : ""}
                  onValueChange={handleChangeProvince}
                >
                  <SelectTrigger
                    id="province"
                    className="w-full transition duration-300
                    focus:ring-1 focus:ring-green-500 focus:ring-offset-0"
                  >
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
                  <Label htmlFor="city" className="font-normal text-gray-500">
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
                        className="w-full justify-between transition duration-300
                        focus:ring-1 focus:ring-green-500 focus:ring-offset-0"
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
          </div>
        </div>

        <DialogFooter className="px-6">
          <Button
            onClick={() => {
              setSelectedCity(null);
              router.replace("/map", undefined, { shallow: true });
            }}
            variant="link"
          >
            Zresetuj filtry
          </Button>
          <Button onClick={onClose} className="bg-green-600 hover:bg-green-500">
            Zakończ
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FiltersDialog;
