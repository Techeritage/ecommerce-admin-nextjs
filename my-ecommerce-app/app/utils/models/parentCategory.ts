import mongoose, { Schema } from "mongoose";

const parentCategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    bgColor: {
      type: String,
    },
  },
  { timestamps: true }
);

export const ParentCategory =
  mongoose.models.parentcategories ||
  mongoose.model("parentcategories", parentCategorySchema);
