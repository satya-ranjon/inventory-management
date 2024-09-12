import { Types } from "mongoose";

export interface TOrder {
  email: string;
  productId: Types.ObjectId;
  price: number;
  quantity: number;
}
