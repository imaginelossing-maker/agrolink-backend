import jwt from "jsonwebtoken";

const SECRET = "mySecretKey123"; // later move to .env

export function generateToken(user) {
    return jwt.sign(
        {
            id: user._id,
            email: user.email,
            role: user.role
        },
        SECRET,
        { expiresIn: "1d" }
    );
}