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

const SubcategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    parent: {
      type: mongoose.Types.ObjectId,
      ref: "parentcategories",
    },
  },
  { timestamps: true }
);

export const ParentCategory =
  mongoose.models.parentcategories ||
  mongoose.model("parentcategories", parentCategorySchema);
export const SubCategory =
  mongoose.models.subcategories ||
  mongoose.model("subcategories", SubcategorySchema);
