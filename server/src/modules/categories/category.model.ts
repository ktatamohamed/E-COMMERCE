import { model, Schema, type InferSchemaType } from "mongoose";

const categorySchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 140,
    },
    description: { type: String, trim: true, maxlength: 2000 },
    image: {
      url: { type: String, trim: true },
      publicId: { type: String, trim: true },
    },
    isActive: { type: Boolean, default: true, required: true },
  },
  { timestamps: true },
);

categorySchema.index({ isActive: 1, name: 1 });

export type CategoryDocument = InferSchemaType<typeof categorySchema>;
export const Category = model("Category", categorySchema);
