import { Product } from "../product/product.model";
import { TOrder } from "./order.interface";
import { Order } from "./order.model";

class OrderService {
  async createOrder(orderData: TOrder) {
    // Find the product by ID
    const product = await Product.findById(orderData.productId);

    if (!product) {
      throw new Error("Product not found");
    }

    // Check if ordered quantity exceeds available stock
    if (product.inventory.quantity < orderData.quantity) {
      throw new Error("Insufficient quantity available in inventory");
    }

    // Create the order
    const newOrder = await Order.create(orderData);

    // Reduce the product quantity in inventory
    product.inventory.quantity -= orderData.quantity;

    // Update the inStock status based on the remaining quantity
    if (product.inventory.quantity === 0) {
      product.inventory.inStock = false;
    } else {
      product.inventory.inStock = true;
    }

    // Save the updated product inventory
    await product.save();

    return newOrder;
  }

  async getAllOrders() {
    return await Order.find();
  }

  async getOrdersByEmail(email: string) {
    return await Order.find({ email });
  }
}

export default new OrderService();
