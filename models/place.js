import mongoose from "mongoose";
import validator from "validator";

import { categories_list } from "../components/Categories/Categories";

const validateCategory = function (value) {
  console.log(categories_list);
  const categoryTitles = categories_list.map((category) => category.title);
  return categoryTitles.includes(value);
};

const placeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  category: {
    type: String,
    validate: [
      {
        validator: validateCategory,
        message: "Please enter a valid category.",
      },
    ],
  },
  coordinates: {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    // validate: [validator.isLatLong, "Please enter a valid coordinates"],
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  googleMapUrl: {
    type: String,
    validate: [validator.isURL, "Please enter a valid email"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Place || mongoose.model("Place", placeSchema);
