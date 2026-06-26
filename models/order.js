import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    products:[{
        product:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product"
        },

        quantity:{
            type:Number,
            required:true
        }
    }],

    totalPrice:{
        type:Number,
        default:0
    }

},{timestamps:true});

export default mongoose.model("Order",orderSchema);