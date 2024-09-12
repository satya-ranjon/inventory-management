import express from "express";
import productController from "./product.controller";

const router = express.Router();

router.post("/", productController.createProduct);
router.get("/", productController.getProducts);
router.get("/:productId", productController.getProductById);
router.put("/:productId", productController.updateProduct);
router.delete("/:productId", productController.deleteProduct);
router.get("/", productController.searchProductByName);

export const productRoutes = router;
