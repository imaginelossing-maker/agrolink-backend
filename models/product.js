import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productName:{
        type:String,
        required:true
    },

    price:{
        type:Number,
        required:true
    },

    quantity:{
        type:Number,
        required:true
    },

    image:{
        type:String
    },

    seller:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }

},{timestamps:true});

export default mongoose.model("Product",productSchema);