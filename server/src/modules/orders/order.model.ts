import { model, Schema, type InferSchemaType } from "mongoose";

const orderAddressSchema = new Schema(
  {
    fullName: { type: String, required: true, trim: true, maxlength: 100 },
    line1: { type: String, required: true, trim: true, maxlength: 200 },
    line2: { type: String, trim: true, maxlength: 200 },
    city: { type: String, required: true, trim: true, maxlength: 100 },
    region: { type: String, trim: true, maxlength: 100 },
    postalCode: { type: String, required: true, trim: true, maxlength: 20 },
    country: { type: String, required: true, trim: true, maxlength: 2 },
    phone: { type: String, trim: true, maxlength: 30 },
  },
  { _id: false },
);

const orderItemSchema = new Schema(
  {
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    name: { type: String, required: true, trim: true, maxlength: 200 },
    slug: { type: String, required: true, trim: true, maxlength: 220 },
    imageUrl: { type: String, trim: true },
    unitPrice: {
      type: Number,
      required: true,
      min: 0,
      validate: {
        validator: Number.isSafeInteger,
        message: "Unit price must be an integer number of cents",
      },
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      validate: {
        validator: Number.isSafeInteger,
        message: "Quantity must be a whole number",
      },
    },
  },
  { _id: false },
);

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    items: {
      type: [orderItemSchema],
      required: true,
      validate: [(items: unknown[]) => items.length > 0, "Order must contain an item"],
    },
    shippingAddress: { type: orderAddressSchema, required: true },
    subtotal: { type: Number, required: true, min: 0 },
    shippingTotal: { type: Number, required: true, min: 0 },
    taxTotal: { type: Number, required: true, min: 0 },
    total: { type: Number, required: true, min: 0 },
    currency: {
      type: String,
      required: true,
      default: "usd",
      lowercase: true,
      minlength: 3,
      maxlength: 3,
    },
    paymentMethod: {
      type: String,
      enum: ["stripe", "cod"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
      required: true,
    },
    stripePaymentIntentId: { type: String, trim: true, sparse: true },
    status: {
      type: String,
      enum: ["pending", "shipped", "delivered", "cancelled"],
      default: "pending",
      required: true,
    },
  },
  { timestamps: true },
);

orderSchema.index({ user: 1, createdAt: -1 });
orderSchema.index({ status: 1, createdAt: -1 });
orderSchema.index({ paymentStatus: 1, createdAt: -1 });

export type OrderDocument = InferSchemaType<typeof orderSchema>;
export const Order = model("Order", orderSchema);
