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

        // Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                msg: "Email already exists",
            });
        }

        // Hash password
        const hashedPassword = await createHash(password);

        // Create user
        const newUser = await User.create({
            fullname,
            email,
            password: hashedPassword,
            role,
        });

        // Generate JWT
        const token = generateToken(newUser);

        // Return token only
        return res.status(201).json({
            token,
        });

    } catch (error) {
        return res.status(500).json({
            msg: error.message,
        });
    }
}