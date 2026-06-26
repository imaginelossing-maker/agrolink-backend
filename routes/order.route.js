import express from "express";
import {
    getOrders,
    createOrder
} from "../controllers/ordercontroller.js";

import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getOrders);

router.post(
    "/",
    verifyToken,
    createOrder
);

export default router;