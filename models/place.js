import mongoose from "mongoose";
import validator from "validator";

import { categories_list } from "@/utils/categories";

// const validateCategory = function (value) {
//   const categoryTitles = categories_list.map((category) => category.title);
//   return categoryTitles.includes(value);
// };

const placeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  image: {
    type: String,
    validate: [validator.isURL, "Please enter a valid link"],
    required: true,
  },
  images: [
    {
      url: {
        type: String,
        validate: [validator.isURL, "Please enter a valid link"],
      },
      accepted: {
        type: Boolean,
        default: false,
      },
    },
  ],
  category: {
    type: String,
    // validate: [
    //   {
    //     validator: validateCategory,
    //     message: "Please enter a valid category.",
    //   },
    // ],
    required: true,
  },
  coordinates: {
    lat: {
      type: Number,
      required: true,
    },
    lng: {
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
    validate: [validator.isURL, "Please enter a valid Google Map URL"],
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
