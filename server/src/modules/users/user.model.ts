import bcrypt from "bcryptjs";
import { model, Schema, type InferSchemaType } from "mongoose";

const addressSchema = new Schema(
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
  { _id: true },
);

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 254,
    },
    passwordHash: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
      required: true,
    },
    addresses: { type: [addressSchema], default: [] },
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  if (!this.isModified("passwordHash")) {
    return;
  }

  this.passwordHash = await bcrypt.hash(this.passwordHash, 12);
});

export type UserDocument = InferSchemaType<typeof userSchema>;
export const User = model("User", userSchema);
