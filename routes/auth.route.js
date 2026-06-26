import express from "express";
import { register, login, profile, changePassword, forgotPassword, resetPassword} from "../controllers/authcontroller.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", verifyToken, profile);
router.put(
    "/change-password",
    verifyToken,
    changePassword
);
router.post(
    "/forgot-password",
    forgotPassword
);
router.put("/reset-password/:token", resetPassword);
router.get(  "/admin", verifyToken, authorizeRoles("admin"),
    (req, res) => {
        res.status(200).json({
            msg: "Welcome Admin",
            user: req.user
        });
    }
);


export default router;