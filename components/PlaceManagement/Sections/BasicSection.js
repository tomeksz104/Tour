import Input from "@/components/Input";
import InputError from "@/components/InputError";
import Label from "@/components/Label";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { PlaceType as placeTypes } from "@prisma/client";

const BasicSection = ({ form, state, categories }) => {
  return (
    <>
      <div className="space-y-2 px-5 py-4">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-semibold text-gray-600">
                Typ miejsca
              </FormLabel>
              <FormDescription className="block text-xs text-gray-500 italic">
                Na podstawie Twojego wyboru, pojawią się dodatkowe opcje i pola
                do wypełnienia, dostosowane do charakterystyki wybranej
                kategorii atrakcji.
              </FormDescription>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger
                    className="w-1/2 bg-gray-50 text-gray-600 transition duration-300
                    focus:ring-1 focus:ring-green-500 focus:ring-offset-0"
                  >
                    <SelectValue placeholder="Wybierz typ miejsca..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.keys(placeTypes).map((key) => (
                    <SelectItem key={key} value={placeTypes[key]}>
                      {placeTypes[key]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {state?.errors?.type &&
                state.errors.type.map((error) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-2 border-t px-5 py-4">
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-semibold text-gray-600">
                Kategoria
              </FormLabel>
              <FormDescription className="block text-xs text-gray-500 italic">
                Na podstawie Twojego wyboru, pojawią się dodatkowe opcje i pola
                do wypełnienia, dostosowane do charakterystyki wybranej
                kategorii atrakcji.
              </FormDescription>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger
                    className="w-1/2 bg-gray-50 text-gray-600 transition duration-300
                    focus:ring-1 focus:ring-green-500 focus:ring-offset-0"
                  >
                    <SelectValue placeholder="Wybierz kategorię...">
                      {field.value ? categories[field.value - 1].name : null}
                    </SelectValue>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {state?.errors?.categoryId &&
                state.errors.categoryId.map((error) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
              <FormMessage />
            </FormItem>
          )}
        />
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

        {state?.errors?.title &&
          state.errors.title.map((error) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
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
          {...form.register("slogan")}
        />
      </div>
      <div className="space-y-2 border-t px-5 py-4">
        <Label htmlFor="description">Opis atrakcji</Label>
        <span className="block text-xs text-gray-500 italic">
          Wpisz unikalny opis atrakcji. Twoje osobiste spostrzeżenia i
          oryginalne sformułowania pomogą wyróżnić to miejsce i przyciągnąć
          większą uwagę odwiedzających. Wymień główne udogodnienia i unikalne
          cechy, które wyróżniają to miejsce.
        </span>
        <span className="block text-xs italic text-red-500">
          Pamiętaj, że skopiowane opisy z innych stron mogą naruszać prawa
          autorskie i nie będą akceptowane.
        </span>
        <textarea
          {...form.register("description")}
          className="outline-none bg-gray-50 w-full rounded-md border border-gray-200 py-2.5 px-4 text-sm text-gray-600 transition duration-300 focus:ring-1 focus:ring-green-500"
          id="description"
          name="description"
          rows="5"
          placeholder="Odkryj niepowtarzalne piękno i historię Tajemniczego Zamku Królewskiego, perły architektonicznej w sercu malowniczego krajobrazu. Ten majestatyczny zamek z XI wieku oferuje fascynującą podróż przez wieki, ujawniając tajemnice dawnych władców."
        ></textarea>
      </div>
    </>
  );
};

export default BasicSection;