import { model, Schema, type InferSchemaType } from "mongoose";

const productImageSchema = new Schema(
  {
    url: { type: String, required: true, trim: true },
    publicId: { type: String, trim: true },
    alt: { type: String, trim: true, maxlength: 200 },
  },
  { _id: false },
);

const productSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 200 },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 220,
    },
    description: { type: String, required: true, trim: true, maxlength: 20000 },
    price: {
      type: Number,
      required: true,
      min: 0,
      validate: {
        validator: Number.isSafeInteger,
        message: "Price must be an integer number of cents",
      },
    },
    currency: {
      type: String,
      required: true,
      default: "usd",
      lowercase: true,
      minlength: 3,
      maxlength: 3,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },
    images: { type: [productImageSchema], default: [] },
    stock: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
      validate: {
        validator: Number.isSafeInteger,
        message: "Stock must be a whole number",
      },
    },
    isFeatured: { type: Boolean, default: false, required: true },
    isActive: { type: Boolean, default: true, required: true },
    ratingAverage: { type: Number, min: 0, max: 5, default: 0, required: true },
    ratingCount: {
      type: Number,
      min: 0,
      default: 0,
      required: true,
      validate: {
        validator: Number.isSafeInteger,
        message: "Rating count must be a whole number",
      },
    },
  },
  { timestamps: true },
);

productSchema.index({ category: 1, isActive: 1, price: 1 });
productSchema.index({ isActive: 1, ratingAverage: -1 });
productSchema.index({ isActive: 1, isFeatured: 1 });

export type ProductDocument = InferSchemaType<typeof productSchema>;
export const Product = model("Product", productSchema);
