import mongoose, { Schema, model, models } from "mongoose";

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

export const ParentCategory = models.parentcategories || model("parentcategories", parentCategorySchema);
export const SubCategory = models.subcategories || model("subcategories", SubcategorySchema);
