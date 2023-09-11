import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    trim: true,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  // each comment can only relates to one blog, so it's not in array
  place: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Place",
  },
});

export default mongoose.models.Comment ||
  mongoose.model("Comment", commentSchema);
