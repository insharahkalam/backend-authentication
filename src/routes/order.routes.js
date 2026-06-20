import express from "express";
import { createOrder, getMyOrders, getAllOrders, getOneOrder, updateOrderStatus } from "../controllers/order.controller.js";
import { userCheck } from "../middleware/productMiddleware.js";
import { adminCheck } from "../middleware/authMiddleware.js";

const orderRouter = express.Router();

orderRouter.post("/create", userCheck, createOrder);
orderRouter.get("/my-orders", userCheck, getMyOrders);
orderRouter.get("/all", adminCheck, getAllOrders);
orderRouter.get("/:id", userCheck, getOneOrder);
orderRouter.put("/:id/status", adminCheck, updateOrderStatus);

export default orderRouter;