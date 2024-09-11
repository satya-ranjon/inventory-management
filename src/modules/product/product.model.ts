import { model, Schema } from "mongoose";
import {
  TProduct,
  TProductInventory,
  TProductVariant,
} from "./product.interface";

const ProductVariantSchema = new Schema<TProductVariant>({
  type: { type: String, required: true },
  value: { type: String, required: true },
});

const ProductInventorySchema = new Schema<TProductInventory>({
  quantity: { type: Number, required: true },
  inStock: { type: Boolean, required: true },
});

const ProductSchema = new Schema<TProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  tags: { type: [String], required: true },
  variants: { type: [ProductVariantSchema], required: true },
  inventory: { type: ProductInventorySchema, required: true },
});

export const Product = model<TProduct>("Product", ProductSchema);
