"use client";

import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { useToast } from "@/hooks/useToast";

import Input from "../Input";
import Label from "../Label";
import InputError from "../InputError";

const MapWrapper = dynamic(() => import("@/components/Place/MapWrapper"), {
  loading: () => <p>loading...</p>,
  ssr: false,
});

import { categories_list } from "../Categories/Categories"; // categories array

const PlaceForm = () => {
  const toast = useToast();
  const [coordinates, setCoordinates] = useState({});
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [googleMapUrl, setGoogleMapUrl] = useState("");

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const requestBody = {
      coordinates,
      image,
      category,
      title,
      shortDescription,
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
    setCoordinates({ lat, lng });
  };

  return (
    <div className="w-full sm:max-w-4xl m-auto py-20 ">
      <h2 className="mt-5 text-center text-2xl font-bold text-gray-800 dark:text-white md:text-4xl">
        Add a unique place
      </h2>

      <MapWrapper
        onMarkerPositionChange={handleMarkerPositionChange}
        coordinates={coordinates}
      />

      <form
        onSubmit={handleSubmitForm}
        className="space-y-5 mt-5 m-auto sm:max-w-xl"
      >
        <div className="flex items-center space-x-3">
          <div className="w-1/2">
            <Label htmlFor="latitude">Latitude</Label>
            <Input
              id="latitude"
              type="text"
              value={coordinates.lat}
              onChange={(event) =>
                setCoordinates({ ...coordinates, lat: event.target.value })
              }
              placeholder="50.452781171479266"
            />
          </div>
          <div className="w-1/2">
            <Label htmlFor="longitude">Longitude</Label>
            <Input
              id="longitude"
              type="text"
              value={coordinates.lng}
              onChange={(event) =>
                setCoordinates({ ...coordinates, lng: event.target.value })
              }
              placeholder="19.526675280239367"
            />
          </div>
        </div>

        <div className="space-y-1">
          <Label htmlFor="image">Image</Label>
          <Input
            id="image"
            type="text"
            value={image}
            onChange={(event) => setImage(event.target.value)}
            placeholder="https://URL-to-best-photo.com"
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="category">Category</Label>
          <select
            className="outline-none w-full rounded-md border border-gray-200 py-2.5 px-4 text-sm text-gray-600 transition duration-300 focus:ring-1 focus:ring-green-500"
            id="category"
            name="category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="">Select category...</option>
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
          <Label htmlFor="description">Short Description</Label>
          <textarea
            className="outline-none w-full rounded-md border border-gray-200 py-2.5 px-4 text-sm text-gray-600 transition duration-300 focus:ring-1 focus:ring-green-500"
            id="shortDescription"
            name="shortDescription"
            rows="3"
            value={shortDescription}
            onChange={(event) => setShortDescription(event.target.value)}
            placeholder="Short description"
          ></textarea>
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
          <Label htmlFor="googleMapUrl">Google Maps URL</Label>
          <Input
            id="googleMapUrl"
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
