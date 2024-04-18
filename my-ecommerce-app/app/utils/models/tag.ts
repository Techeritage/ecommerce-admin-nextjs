import { Schema, model, models } from "mongoose";

const tagScchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Tag = models.tags || model("tags", tagScchema);
