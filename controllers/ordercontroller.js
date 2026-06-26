import Order from "../models/order.js";
import Product from "../models/product.js";
/* GET ALL ORDERS */

export const getOrders = async (req, res) => {
    try {

        const orders = await Order.find()
            .populate("user", "fullname email")
            .populate("products");

        res.status(200).json({
            orders
        });

    } catch(error) {

        res.status(500).json({
            msg: error.message
        });

    }
};

/* CREATE ORDER */
export const createOrder = async (req,res)=>{
    try{

        const { products } = req.body;

        let totalPrice = 0;

        const orderProducts = [];

        for(const item of products){

            const product = await Product.findById(
                item.product
            );

            if(!product){
                return res.status(404).json({
                    msg:"Product not found"
                });
            }

            // Calculate total
            totalPrice +=
                product.price * item.quantity;

            orderProducts.push({
                product:item.product,
                quantity:item.quantity
            });

        }

        const order = await Order.create({
            user:req.user.id,
            products:orderProducts,
            totalPrice
        });

        return res.status(201).json({
            msg:"Order created successfully",
            order
        });

    }catch(error){

        return res.status(500).json({
            msg:error.message
        });

    }
};