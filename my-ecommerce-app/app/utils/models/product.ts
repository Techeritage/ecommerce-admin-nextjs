import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      minlength: 3,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    images: {
      type: [String], // Array of strings representing image URLs
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "categories",
    },
    properties: {
      type: [Object],
    },

    tag: {
      type: mongoose.Types.ObjectId,
      ref: "tags",
    },
  },
  { timestamps: true }
);

const Product =
  mongoose.models.products || mongoose.model("products", productSchema);
export default Product;
