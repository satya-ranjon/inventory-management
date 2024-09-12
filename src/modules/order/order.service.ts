import { TOrder } from "./order.interface";
import { Order } from "./order.model";

class OrderService {
  async createOrder(orderData: TOrder) {
    const newOrder = new Order(orderData);
    await newOrder.save();
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
