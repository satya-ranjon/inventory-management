import cors from "cors";
import express, { Application } from "express";
import { productRoutes } from "../modules/product/product.route";
import { orderRoutes } from "../modules/order/order.route";

const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

export default app;
