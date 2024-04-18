import mongoose, { Schema, model, models } from "mongoose";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    parent: {
      type: mongoose.Types.ObjectId,
      ref: "categories",
    },
    properties: { type: [String], default: [] },
  },
  { timestamps: true }
);

export const Category =
  models.categories || model("categories", categorySchema);
