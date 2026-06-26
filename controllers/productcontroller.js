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

export const createProduct = async (req, res) => {
    try {

        const {
            productName,
            price,
            quantity,
            image
        } = req.body;

        // Validate required fields
        if (!productName || !price || !quantity) {
            return res.status(400).json({
                msg: "All required fields must be provided"
            });
        }

        const product = await Product.create({
            productName,
            price,
            quantity,
            image,

            // save logged-in farmer id
            seller: req.user.id
        });

        return res.status(201).json({
            msg: "Product created successfully",
            product
        });

    } catch (error) {

        return res.status(500).json({
            msg: error.message
        });

    }
};
/* GET PRODUCTS CREATED BY FARMER */

export const getFarmerProducts = async (req, res) => {
    try {

        const products = await Product.find({
            seller: req.user.id
        });

        return res.status(200).json({
            products
        });

    } catch(error) {

        return res.status(500).json({
            msg: error.message
        });

    }
};