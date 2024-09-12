import mongoose, { Schema } from "mongoose";
import { TOrder } from "./order.interface";

const OrderSchema = new Schema<TOrder>({
  email: {
    type: String,
    required: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"], // Simple email regex for validation
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: [0, "Price cannot be less than zero"],
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, "Quantity cannot be less than one"],
  },
});

export const Order = mongoose.model<TOrder>("Order", OrderSchema);
