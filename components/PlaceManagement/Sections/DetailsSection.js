"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect } from "react";

export function DetailsSection({ form, topics, tags, childAmenites }) {
  const watchChildFriendlyField = form.watch("childFriendly");

  return (
    <>
      <div className="space-y-2 px-5 py-4">
        <FormField
          control={form.control}
          name="childFriendly"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Miejsce przyjazne dla rodzin z dziećmi?</FormLabel>
              <FormDescription className="block text-xs text-gray-500 italic">
                Zaznaczyć opcję "nie", jeśli uważasz, że dane miejsce nie jest
                odpowiednie dla dzieci lub rodzin z dziećmi. Opcja ta powinna
                być wybrana w przypadkach, gdy charakter miejsca lub rodzaj
                atrakcji jest wyraźnie przeznaczony tylko dla dorosłych, na
                przykład ze względu na tematykę.
              </FormDescription>

              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="1" />
                    </FormControl>
                    <FormLabel className="font-normal">Tak</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="0" />
                    </FormControl>
                    <FormLabel className="font-normal">Nie</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      {+watchChildFriendlyField === 1 && (
        <div className="space-y-2 border-t px-5 py-4">
          <FormField
            control={form.control}
            name="topics"
            render={() => (
              <FormItem className="space-y-2">
                <FormLabel className="text-sm font-semibold text-gray-600">
                  Udogodnienia dla dzieci
                </FormLabel>
                <FormDescription className="block text-xs text-gray-500 italic">
                  Wybierz tematykę pasującą do atrakcji.
                </FormDescription>

                <div className="flex flex-wrap">
                  {childAmenites.map((topic) => (
                    <FormField
                      key={topic.id}
                      control={form.control}
                      name="childAmenites"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={topic.id}
                            className="flex flex-row items-start space-x-3 space-y-0 py-2 w-1/2"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(topic.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, topic.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== topic.id
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {topic.name}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}

      <div className="space-y-2 border-t px-5 py-4">
        <FormField
          control={form.control}
          name="topics"
          render={() => (
            <FormItem className="space-y-2">
              <FormLabel className="text-sm font-semibold text-gray-600">
                Tematyka
              </FormLabel>
              <FormDescription className="block text-xs text-gray-500 italic">
                Wybierz tematykę pasującą do atrakcji.
              </FormDescription>

              <div className="flex flex-wrap">
                {topics.map((topic) => (
                  <FormField
                    key={topic.id}
                    control={form.control}
                    name="topics"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={topic.id}
                          className="flex flex-row items-start space-x-3 space-y-0 py-2 w-1/2"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(topic.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, topic.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== topic.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {topic.name}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="space-y-2 border-t px-5 py-4">
        <FormField
          control={form.control}
          name="tags"
          render={() => (
            <FormItem className="space-y-2">
              <FormLabel className="text-sm font-semibold text-gray-600">
                Tagi
              </FormLabel>
              <FormDescription className="block text-xs text-gray-500 italic">
                Wybierz dodatkowe tagi opisujące i pasujące do atrakcji.
              </FormDescription>

              <div className="flex flex-wrap">
                {tags.map((tag) => (
                  <FormField
                    key={tag.id}
                    control={form.control}
                    name="tags"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={tag.id}
                          className="flex flex-row items-start space-x-3 space-y-0 py-2 w-1/2"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(tag.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, tag.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== tag.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {tag.name}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
}
