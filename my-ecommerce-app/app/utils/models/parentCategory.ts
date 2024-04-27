import { Schema, model, models } from "mongoose";

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

export const ParentCategory = models.parentcategories || model("parentcategories", parentCategorySchema);
