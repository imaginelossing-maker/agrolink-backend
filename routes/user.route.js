import express from "express";
import { getUsers } from "../controllers/usercontroller.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get(
    "/",
    verifyToken,
    authorizeRoles("admin"),
    getUsers
);

export default router;