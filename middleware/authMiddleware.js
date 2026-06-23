import jwt from "jsonwebtoken";

const SECRET = "mySecretKey123";

export function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ msg: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, SECRET);
        req.user = decoded; // contains id, email, role
        next();
    } catch (error) {
        return res.status(401).json({ msg: "Invalid token" });
    }
}