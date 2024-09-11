import { Request, Response } from "express";
import productService from "./product.service";

class ProductController {
  async createProduct(req: Request, res: Response) {
    try {
      const productData = req.body;

      // Call the service to create the product
      const newProduct = await productService.createProduct(productData);

      // Respond with the created product
      res.status(201).json({
        success: true,
        message: "Product created successfully",
        product: newProduct,
      });
    } catch (error: any) {
      // Handle validation and other errors
      res.status(400).json({ error: JSON.parse(error.message) });
    }
  }

  async getProducts(req: Request, res: Response) {
    // Call the service to get all products
    const products = await productService.getProducts();

    // Respond with the products
    res.status(200).json({
      success: true,
      message: "Products retrieved successfully",
      products,
    });
  }

  async getProductById(req: Request, res: Response) {
    const productId = req.params.id;

    // Call the service to get the product by ID
    const product = await productService.getProductById(productId);

    // Respond with the product
    res.status(200).json({
      success: true,
      message: "Product retrieved successfully",
      product,
    });
  }

  async updateProduct(req: Request, res: Response) {
    const productId = req.params.id;
    const productData = req.body;

    // Call the service to update the product
    const updatedProduct = await productService.updateProduct(
      productId,
      productData
    );

    // Respond with the updated product
    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  }

  async deleteProduct(req: Request, res: Response) {
    const productId = req.params.id;

    // Call the service to delete the product
    const deletedProduct = await productService.deleteProduct(productId);

    // Respond with the deleted product
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      product: deletedProduct,
    });
  }
}

export default new ProductController();
