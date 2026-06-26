import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    password: {
        type: String,
        required: true,
        minlength: [8, "Password has to be at least 8 characters long"]
    },
    email: {
        type: String,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address'],
        unique: true,
        required: true
    },

    role:{
        type:String,
        enum:["buyer", "farmer","admin"],
        default:"buyer"
    },

     resetToken:{
        type:String
    },

    resetTokenExpiry:{
        type:Date
    }

},{timestamps:true});

export default mongoose.model("User",userSchema);