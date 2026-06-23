import bcrypt from "bcryptjs";

export async function createHash(password) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (error) {
        console.error("Hash creation error:", error);
        throw new Error(error.message || "Error creating hash");
    }
}

export async function compareHash(password, hash) {
    try {
        // safety check (VERY important)
        if (!password || !hash) {
            throw new Error("Missing password or hash");
        }

        const isMatch = await bcrypt.compare(password, hash);
        return isMatch;
    } catch (error) {
        console.error("Hash comparison error:", error);
        throw new Error(error.message || "Error comparing hash");
    }
}