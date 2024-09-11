import { TProduct } from "./product.interface";
import { z } from "zod";
import ProductSchemaValidation from "./product.validation";
import { Product } from "./product.model";

class ProductService {
  async createProduct(productData: z.infer<typeof ProductSchemaValidation>) {
    // Validate the product data with Zod
    const validationResult = ProductSchemaValidation.safeParse(productData);

    // If the validation fails, throw an error with the issues
    if (!validationResult.success) {
      throw new Error(JSON.stringify(validationResult.error.issues));
    }
    // Save the validated data to the database
    const product = new Product(validationResult.data);
    return await product.save();
  }

  async getProducts() {
    return await Product.find();
  }

  async getProductById(productId: string) {
    return await Product.findById(productId);
  }

  async updateProduct(
    productId: string,
    productData: z.infer<typeof ProductSchemaValidation>
  ) {
    // Validate the product data with Zod
    const validationResult = ProductSchemaValidation.safeParse(productData);

    // If the validation fails, throw an error with the issues
    if (!validationResult.success) {
      throw new Error(JSON.stringify(validationResult.error.issues));
    }
    // Update the product in the database
    return await Product.findByIdAndUpdate(productId, productData, {
      new: true,
    });
  }

  async deleteProduct(productId: string) {
    return await Product.findByIdAndUpdate(productId, { deleted: true });
  }
}

export default new ProductService();
