import express from "express";
import cors from "cors"
import { connectDB } from "./utils/db.js";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import productRoutes from "./routes/product.route.js";
import orderRoutes from "./routes/order.route.js";
const app = express();

// connect database
connectDB();

// middleware
app.use(cors())
app.use(express.json());

// routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

// test route
app.get("/", (req, res) => {
    res.json({
        message: "AgroLink running "
    });
});

// start server
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});