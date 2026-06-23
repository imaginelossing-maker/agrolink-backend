import Product from "../models/product.js";

/* GET ALL PRODUCTS */
export async function getProducts(req, res) {
    try {
        const products = await Product.find();
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

/* CREATE PRODUCT */
export async function createProduct(req, res) {
    try {
        const product = await Product.create(req.body);
        return res.status(201).json(product);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}