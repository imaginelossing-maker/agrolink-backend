import express from "express";
import Product from "../models/product.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { createProduct, getProducts } from "../controllers/productcontroller.js";

const router = express.Router();

/* CREATE PRODUCT */
router.post("/", verifyToken, createProduct);

/* GET PRODUCTS */
router.get("/", getProducts);

/* DELETE PRODUCT */
router.delete("/:id", verifyToken, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ msg: "Product not found" });
        }

        if (req.user.role === "admin") {
            await product.deleteOne();
            return res.json({ msg: "Deleted by admin" });
        }

        if (product.seller.toString() !== req.user.id) {
            return res.status(403).json({ msg: "Not allowed" });
        }

        await product.deleteOne();
        return res.json({ msg: "Product deleted by owner" });

    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
});

export default router;