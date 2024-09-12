import { NextFunction, Request, Response } from "express";
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
        message: "Products fetched successfully!",
        data: newProduct,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: "Product not created",
        error: JSON.parse(error.message),
      });
    }
  }

  async getProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const { searchTerm } = req.query;

      if (searchTerm) {
        return next();
      }
      // Call the service to get all products
      const products = await productService.getProducts();

      // Respond with the products
      res.status(200).json({
        success: true,
        message: "Products retrieved successfully",
        data: products,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: "Products not found",
        error: error.message,
      });
    }
  }

  async getProductById(req: Request, res: Response) {
    try {
      const { productId } = req.params;

      // Call the service to get the product by ID
      const product = await productService.getProductById(productId);

      // Respond with the product
      res.status(200).json({
        success: true,
        message: "Product fetched successfully!",
        data: product,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: "Product not found",
        error: error.message,
      });
    }
  }

  async updateProduct(req: Request, res: Response) {
    try {
      const { productId } = req.params;
      const productData = req.body;

      // Call the service to update the product
      const updatedProduct = await productService.updateProduct(
        productId,
        productData
      );

      // Respond with the updated product
      res.status(200).json({
        success: true,
        message: "Product updated successfully!",
        data: updatedProduct,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: "Product not updated",
        error: JSON.parse(error.message),
      });
    }
  }

  async deleteProduct(req: Request, res: Response) {
    try {
      const { productId } = req.params;

      await productService.deleteProduct(productId);

      // Respond with the deleted product
      res.status(200).json({
        success: true,
        message: "Product deleted successfully!",
        data: null,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: "Product not deleted",
        error: error.message,
      });
    }
  }

  async searchProductByName(req: Request, res: Response) {
    try {
      const { searchTerm } = req.query;

      if (!searchTerm) {
        return res
          .status(400)
          .json({ message: "searchTerm query parameter is required" });
      }

      // Call the service to search for products by name
      const products = await productService.searchProductByName(
        searchTerm as string
      );

      res.status(200).json({
        success: true,
        message: `Products matching search term '${searchTerm}' fetched successfully!`,
        data: products,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Error searching for products",
        error: error.message,
      });
    }
  }
}

export default new ProductController();
