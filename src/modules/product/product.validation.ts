import { z } from "zod";

// Define ProductVariant validation schema
const ProductVariantSchemaValidation = z.object({
  type: z.string().min(1, "Type is required"),
  value: z.string().min(1, "Value is required"),
});

// Define ProductInventory validation schema
const ProductInventorySchemaValidation = z.object({
  quantity: z.number().nonnegative("Quantity must be a non-negative number"),
  inStock: z.boolean(),
});

// Define Product validation schema
const ProductSchemaValidation = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().positive("Price must be a positive number"),
  category: z.string().min(1, "Category is required"),
  tags: z.array(z.string().min(1, "Tag cannot be empty")),
  variants: z
    .array(ProductVariantSchemaValidation)
    .nonempty("At least one variant is required"),
  inventory: ProductInventorySchemaValidation,
});

export default ProductSchemaValidation;
