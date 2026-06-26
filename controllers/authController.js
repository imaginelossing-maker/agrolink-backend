import User from "../models/user.js";
import { createHash, compareHash } from "../utils/encrypt.js";
import { generateToken } from "../utils/jwt.js";

/* ---------------- LOGIN ---------------- */

export async function login(req, res) {
    try {
        const currentUser = await User.findOne({ email: req.body.email });

        if (!currentUser) {
            return res.status(404).json({
                msg: "User does not exist",
            });
        }

        const isMatch = await compareHash(
            req.body.password,
            currentUser.password
        );

        if (!isMatch) {
            return res.status(401).json({
                msg: "Wrong password",
            });
        }

        const token = generateToken(currentUser);

        return res.status(200).json({
            token,
        });

    } catch (error) {
        return res.status(500).json({
            msg: error.message,
        });
    }
}

/* ---------------- REGISTER ---------------- */

export async function register(req, res) {
    try {
        const { fullname, email, password, role } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                msg: "Email already exists",
            });
        }

        const hashedPassword = await createHash(password);

        const newUser = await User.create({
            fullname,
            email,
            password: hashedPassword,
            role,
        });

        const token = generateToken(newUser);

        return res.status(201).json({
            token,
        });

    } catch (error) {
        return res.status(500).json({
            msg: error.message,
        });
    }
}

/* ---------------- PROFILE ---------------- */

export async function profile(req, res) {
    try {
        const user = await User.findById(req.user.id)
            .select("-password");

        if (!user) {
            return res.status(404).json({
                msg: "User not found",
            });
        }

        return res.status(200).json({
            user,
        });

    } catch (error) {
        return res.status(500).json({
            msg: error.message,
        });
    }
}

/* ---------------- CHANGE PASSWORD ---------------- */

export async function changePassword(req, res) {
    try {
        const { currentPassword, newPassword } = req.body;

        // Check empty fields
        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                msg: "All fields are required",
            });
        }

        // Find current user
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                msg: "User not found",
            });
        }

        // Verify old password
        const isMatch = await compareHash(
            currentPassword,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                msg: "Current password is incorrect",
            });
        }

        // Prevent same password reuse
        if (currentPassword === newPassword) {
            return res.status(400).json({
                msg: "New password cannot be same as current password",
            });
        }

        // Optional password length validation
        if (newPassword.length < 6) {
            return res.status(400).json({
                msg: "Password must be at least 6 characters",
            });
        }

        // Hash new password
        const hashedPassword = await createHash(
            newPassword
        );

        // Save new password
        user.password = hashedPassword;

        await user.save();

        return res.status(200).json({
            msg: "Password changed successfully",
        });

    } catch (error) {
        return res.status(500).json({
            msg: error.message,
        });
    }
}