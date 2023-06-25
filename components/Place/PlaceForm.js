"use client";

import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";

import Input from "../Input";
import Label from "../Label";
import InputError from "../InputError";

const MapWrapper = dynamic(() => import("@/components/Place/MapWrapper"), {
  loading: () => <p>loading...</p>,
  ssr: false,
});

import { categories_list } from "../Categories/Categories"; // categories aray
import { useToast } from "@/hooks/useToast";

const PlaceForm = () => {
  const toast = useToast();
  const [coordinates, setCoordinates] = useState({});
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [googleMapUrl, setGoogleMapUrl] = useState("");

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const requestBody = {
      coordinates,
      category,
      title,
      description,
      googleMapUrl,
    };

    try {
      const response = await fetch(`/api/place/new`, {
        method: "POST",
        body: JSON.stringify({
          requestBody,
        }),
      });

      if (response.ok) {
        const message = await response.json();
        toast.success("Successfully added a pla");
      } else {
        const { error } = await response.json();
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }

    console.log("FORM SUBMITTED");
  };

  const handleMarkerPositionChange = (lat, lng) => {
    setCoordinates({ latitude: lat, longitude: lng });
  };

  return (
    <div className="w-full sm:max-w-4xl m-auto py-20 ">
      <h2 className="mt-5 text-center text-2xl font-bold text-gray-800 dark:text-white md:text-4xl">
        Add a unique place
      </h2>

      <MapWrapper onMarkerPositionChange={handleMarkerPositionChange} />
      <form
        onSubmit={handleSubmitForm}
        className="space-y-5 mt-5 m-auto sm:max-w-xl"
      >
        <div className="space-y-1">
          <Label htmlFor="category">Category</Label>
          <select
            className="outline-none w-full rounded-md border border-gray-200 py-2.5 px-4 text-sm text-gray-600 transition duration-300 focus:ring-1 focus:ring-green-500"
            id="category"
            name="category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            {categories_list.map((category, index) => (
              <option key={index} value={category.title}>
                {category.title}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Zamek Ogrodzieniec"
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="description">Description</Label>
          <textarea
            className="outline-none w-full rounded-md border border-gray-200 py-2.5 px-4 text-sm text-gray-600 transition duration-300 focus:ring-1 focus:ring-green-500"
            id="description"
            name="description"
            rows="10"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Description of the place"
          ></textarea>
        </div>

        <div className="space-y-1">
          <Label htmlFor="google-maps-url">Google Maps URL</Label>
          <Input
            id="google-maps-url"
            type="text"
            value={googleMapUrl}
            onChange={(event) => setGoogleMapUrl(event.target.value)}
            placeholder="https://goo.gl/maps/zrJXGuiUeER7vcJ1A"
          />
        </div>

        <button
          type="submit"
          className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-green-500 before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95"
        >
          <span className="relative text-base font-semibold text-white dark:text-dark">
            Update
          </span>
        </button>
      </form>
    </div>
  );
};

export default PlaceForm;
