"use client";

import React, { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/useToast";
import useConfirm from "@/hooks/useConfirm";

import Input from "../Input";
import Label from "../Label";
import InputError from "../InputError";
import Button from "../Button";

const Map = dynamic(() => import("@/components/Place/Map"), {
  loading: () => <p>loading...</p>,
  ssr: false,
});

import { categories_list } from "../Categories/Categories"; // categories array

const PlaceForm = ({ place }) => {
  const router = useRouter();
  const toast = useToast();
  const { confirm } = useConfirm();

  const placeId = place?._id ?? null;
  const [coordinates, setCoordinates] = useState({});
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [googleMapUrl, setGoogleMapUrl] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const url = placeId ? `/api/place/${placeId}` : "/api/place/new";
  const method = placeId ? "PATCH" : "POST";

  useEffect(() => {
    if (place) {
      const { lat, lng } = place.coordinates;

      setCoordinates({ lat, lng });
      setImage(place.image ?? "");
      setCategory(place.category ?? "");
      setTitle(place.title ?? "");
      setDescription(place.description ?? "");
      setGoogleMapUrl(place.googleMapUrl ?? "");
    }
  }, [place]);

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    setError(false);
    setIsLoading(true);

    const requestBody = {
      coordinates,
      image,
      category,
      title,
      description,
      googleMapUrl,
    };

    try {
      const response = await fetch(url, {
        method: method,
        body: JSON.stringify({
          requestBody,
        }),
      });

      if (response.ok) {
        const message = await response.json();
        toast.success(message);
        setCoordinates({});
        setImage("");
        setTitle("");
        setDescription("");
        setGoogleMapUrl("");
      } else {
        const { error } = await response.json();
        setError(error);
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkerPositionChange = (lat, lng) => {
    setCoordinates({ lat, lng });
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

  return (
    <div className="w-full sm:max-w-3xl m-auto py-20 ">
      <h2 className="mt-5 text-center text-2xl font-bold text-gray-800 dark:text-white md:text-4xl">
        {placeId ? "Update the place" : "Add a unique place"}
      </h2>

      <Map
        onMarkerPositionChange={handleMarkerPositionChange}
        onMarkerPositionMove={handleMarkerPositionChange}
        coordinates={coordinates}
        category={category}
        placeId={placeId}
      />

      <form onSubmit={handleSubmitForm} className="space-y-5 mt-5 m-auto ">
        <div className="flex items-center space-x-3">
          <div className="w-1/2">
            <Label htmlFor="latitude">Latitude</Label>
            <Input
              id="latitude"
              type="text"
              value={coordinates.lat ?? ""}
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
              value={coordinates.lng ?? ""}
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
          <Label htmlFor="description">Description</Label>
          <textarea
            className="outline-none w-full rounded-md border border-gray-200 py-2.5 px-4 text-sm text-gray-600 transition duration-300 focus:ring-1 focus:ring-green-500"
            id="description"
            name="description"
            rows="5"
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

        <InputError messages={[error?.global]} className="mt-2" />

        <div
          className={`flex items-center gap-5 ${placeId ? "float-right" : ""}`}
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
    </div>
  );
};

export default PlaceForm;
