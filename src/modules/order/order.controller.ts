import { NextFunction, Request, Response } from "express";
import OrderSchemaValidation from "./order.validation";
import orderService from "./order.service";
import { Types } from "mongoose";
import productService from "../product/product.service";

class OrderController {
  async createOrder(req: Request, res: Response) {
    const validation = OrderSchemaValidation.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validation.error.issues,
      });
    }

    try {
      const newOrder = await orderService.createOrder({
        ...validation.data,
        productId: new Types.ObjectId(validation.data.productId),
      });

      return res.status(201).json({
        success: true,
        message: "Order created successfully!",
        data: newOrder,
      });
    } catch (error: any) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getAllOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.query;
      if (email) {
        return next();
      }

      const orders = await orderService.getAllOrders();
      return res.status(200).json({
        success: true,
        message: "Orders fetched successfully!",
        data: orders,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch orders",
        error: error.message,
      });
    }
  }

  async getOrdersByEmail(req: Request, res: Response) {
    try {
      const { email } = req.query;
      if (!email) {
        return res.status(400).json({
          success: false,
          message: "Email query parameter is required",
        });
      }

      const orders = await orderService.getOrdersByEmail(email as string);

      if (orders.length === 0) {
        return res.status(404).json({
          success: false,
          message: `No orders found for email: ${email}`,
        });
      }

      return res.status(200).json({
        success: true,
        message: "Orders fetched successfully for user email!",
        data: orders,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch orders by email",
        error: error.message,
      });
    }
  }
}

export default new OrderController();
