import { TProduct } from "./product.interface";
import { z } from "zod";
import ProductSchemaValidation from "./product.validation";
import { Product } from "./product.model";

class ProductService {
  async createProduct(productData: z.infer<typeof ProductSchemaValidation>) {
    // Validate the product data with Zod
    const validationResult = ProductSchemaValidation.safeParse(productData);

    if (!validationResult.success) {
      throw new Error(JSON.stringify(validationResult.error.issues));
    }
    const product = new Product(validationResult.data);
    return await product.save();
  }

  async getProducts() {
    return await Product.find();
  }

  async getProductById(productId: string) {
    const product = await Product.findById(productId);

    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  }

  async updateProduct(
    productId: string,
    productData: z.infer<typeof ProductSchemaValidation>
  ) {
    const validationResult = ProductSchemaValidation.safeParse(productData);

    if (!validationResult.success) {
      throw new Error(JSON.stringify(validationResult.error.issues));
    }
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      productData,
      {
        new: true,
      }
    );
    if (!updatedProduct) {
      throw new Error("Product not found");
    }
    return updatedProduct;
  }

  async deleteProduct(productId: string) {
    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
      throw new Error("Product not found");
    }

    return product;
  }

  async searchProductByName(name: string) {
    // Using MongoDB regular expressions for case-insensitive search
    const products = await Product.find({
      name: { $regex: name, $options: "i" },
    });

    if (products.length === 0) {
      throw new Error("No products found");
    }

    return products;
  }
}

export default new ProductService();
